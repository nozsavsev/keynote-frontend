import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import CModal from "@/components/misc/CModal";
import { KEYNOTE_API } from "@/API/KEYNOTE/API";
import { KeynoteDTO, CreateKeynoteDTO, KeynoteType, KeynoteTransitionType } from "@/API/KEYNOTE/KeynoteApi_gen/models";
import useKeynoteUser from "@/hooks/keynote/useKeynoteUser";
import { Plus, Trash2, FileText, Calendar, User, Play, Upload, RefreshCw, File, Smartphone, Eye, AlertCircle, Link2 } from "lucide-react";
import Link from "next/link";

interface KeynoteManagerState {
  selectedKeynote: KeynoteDTO | null;
  createForm: CreateKeynoteDTO & {
    keynoteFile?: File;
    mobileKeynoteFile?: File;
    presentorNotesFile?: File;
  };
  uploading: boolean;
  parsingPDF: boolean;
  pageMismatchWarning: string | null;
}

export default function KeynoteManager() {
  const router = useRouter();
  const { user, isLoading, refresh } = useKeynoteUser();
  const createModalRef = useRef<{ closeModal: () => void; openModal: () => void }>(null);
  const deleteModalRef = useRef<{ closeModal: () => void; openModal: () => void }>(null);

  const [state, setState] = useState<KeynoteManagerState>({
    selectedKeynote: null,
    createForm: {
      name: "",
      description: "",
      type: KeynoteType.Pdf,
      transitionType: KeynoteTransitionType.None,
      totalFrames: 0,
    },
    uploading: false,
    parsingPDF: false,
    pageMismatchWarning: null,
  });

  const handleCreateKeynote = async () => {
    try {
      setState((prev) => ({ ...prev, uploading: true }));

      // Use the API call with file upload support
      const response = await KEYNOTE_API.Client.Keynote.CreateKeynote({
        name: state.createForm.name || undefined,
        description: state.createForm.description || undefined,
        type: state.createForm.type,
        transitionType: state.createForm.transitionType,
        totalFrames: state.createForm.totalFrames,
        keynote: state.createForm.keynoteFile || undefined,
        mobileKeynote: state.createForm.mobileKeynoteFile || undefined,
        presentorNotes: state.createForm.presentorNotesFile || undefined,
      });

      if (response.status === "Ok") {
        createModalRef.current?.closeModal();
        setState((prev) => ({
          ...prev,
          createForm: {
            name: "",
            description: "",
            type: KeynoteType.Pdf,
            transitionType: KeynoteTransitionType.None,
            totalFrames: 0,
          },
        }));
        await refresh(); // Refresh the keynote list
      } else {
        console.error("Failed to create keynote:", response);
      }
    } catch (error) {
      console.error("Error creating keynote:", error);
    } finally {
      setState((prev) => ({ ...prev, uploading: false }));
    }
  };

  const handleDeleteKeynote = async () => {
    if (!state.selectedKeynote?.id) return;

    try {
      const response = await KEYNOTE_API.Client.Keynote.DeleteKeynote({
        keynoteId: state.selectedKeynote.id,
      });

      if (response.status === "Ok") {
        deleteModalRef.current?.closeModal();
        setState((prev) => ({
          ...prev,
          selectedKeynote: null,
        }));
        await refresh(); // Refresh the keynote list
      } else {
        console.error("Failed to delete keynote:", response);
      }
    } catch (error) {
      console.error("Error deleting keynote:", error);
    }
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return "Unknown";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const openCreateModal = () => {
    setState((prev) => ({
      ...prev,
      createForm: {
        name: "",
        description: "",
        type: KeynoteType.Pdf,
        transitionType: KeynoteTransitionType.None,
        totalFrames: 0,
      },
    }));
    createModalRef.current?.openModal();
  };

  const openDeleteModal = (keynote: KeynoteDTO) => {
    setState((prev) => ({
      ...prev,
      selectedKeynote: keynote,
    }));
    deleteModalRef.current?.openModal();
  };

  const closeModals = () => {
    createModalRef.current?.closeModal();
    deleteModalRef.current?.closeModal();
    setState((prev) => ({
      ...prev,
      selectedKeynote: null,
    }));
  };

  const parsePDFPages = async (file: File): Promise<number> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const arrayBuffer = reader.result as ArrayBuffer;
          const uint8Array = new Uint8Array(arrayBuffer);

          // Convert to string to search for page count patterns
          const text = new TextDecoder("latin1").decode(uint8Array);

          // Look for common PDF page count patterns
          const patterns = [/\/Count\s+(\d+)/g, /\/N\s+(\d+)/g, /\/Pages\s+(\d+)/g, /\/PageCount\s+(\d+)/g];

          let maxPages = 0;
          for (const pattern of patterns) {
            let match;
            while ((match = pattern.exec(text)) !== null) {
              const pageCount = parseInt(match[1], 10);
              if (pageCount > maxPages) {
                maxPages = pageCount;
              }
            }
          }

          // If no patterns found, try to count page objects
          if (maxPages === 0) {
            const pageObjectPattern = /\/Type\s*\/Page[^s]/g;
            const pageMatches = text.match(pageObjectPattern);
            maxPages = pageMatches ? pageMatches.length : 0;
          }

          resolve(maxPages);
        } catch (error) {
          console.warn("Error parsing PDF:", error);
          resolve(0);
        }
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsArrayBuffer(file);
    });
  };

  const checkPageMismatch = async (file: File, expectedPages: number) => {
    try {
      const actualPages = await parsePDFPages(file);
      if (actualPages > 0 && actualPages !== expectedPages) {
        return `Warning: This PDF has ${actualPages} pages, but the keynote is set to ${expectedPages} slides.`;
      }
    } catch (error) {
      console.warn("Failed to check page count:", error);
    }
    return null;
  };

  const handleFileChange = async (field: "keynoteFile" | "mobileKeynoteFile" | "presentorNotesFile", file: File | undefined) => {
    setState((prev) => ({
      ...prev,
      createForm: {
        ...prev.createForm,
        [field]: file,
      },
      pageMismatchWarning: null,
    }));

    // If it's the main keynote file, try to parse the page count
    if (field === "keynoteFile" && file) {
      setState((prev) => ({ ...prev, parsingPDF: true }));
      try {
        const pageCount = await parsePDFPages(file);
        if (pageCount > 0) {
          setState((prev) => ({
            ...prev,
            createForm: {
              ...prev.createForm,
              totalFrames: pageCount,
            },
          }));
        }
      } catch (error) {
        console.warn("Failed to parse PDF page count:", error);
      } finally {
        setState((prev) => ({ ...prev, parsingPDF: false }));
      }
    }

    // Check for page mismatches in other PDFs
    if (file && field !== "keynoteFile" && (state.createForm.totalFrames || 0) > 0) {
      const warning = await checkPageMismatch(file, state.createForm.totalFrames || 0);
      if (warning) {
        setState((prev) => ({ ...prev, pageMismatchWarning: warning }));
      }
    }
  };

  if (isLoading) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="border-primary mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2"></div>
          <p className="text-muted-foreground">Loading keynotes...</p>
        </div>
      </div>
    );
  }

  const keynotes = user?.keynotes || [];

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-foreground text-3xl font-bold">My Keynotes</h1>
            <p className="text-muted-foreground mt-2">Manage your presentations and create new ones</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => refresh()} className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
            <Button onClick={openCreateModal} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Keynote
            </Button>
          </div>
        </div>

        {/* Keynotes Grid */}
        {keynotes.length === 0 ? (
          <div className="py-12 text-center">
            <FileText className="text-muted-foreground mx-auto mb-4 h-16 w-16" />
            <h3 className="mb-2 text-xl font-semibold">No keynotes found</h3>
            <p className="text-muted-foreground mb-6">Create your first keynote to get started with presentations</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {keynotes.map((keynote) => (
              <Card key={keynote.id} className="group transition-all duration-300 hover:shadow-lg">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="line-clamp-1 text-lg font-semibold">{keynote.name || "Untitled Keynote"}</CardTitle>
                      <CardDescription className="mt-1 line-clamp-2">{keynote.description || "No description provided"}</CardDescription>
                    </div>
                    <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openDeleteModal(keynote)}
                        className="text-destructive hover:text-destructive h-8 w-8 p-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-muted-foreground space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Created {formatDate(keynote.createdAt)}</span>
                    </div>
                    {keynote.totalFrames && (
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        <span>{keynote.totalFrames} slides</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>Type: {keynote.type || "PDF"}</span>
                    </div>
                  </div>

                  {/* File Status Indicators */}
                  <div className="mt-3 space-y-1">
                    <button
                      type="button"
                      disabled={!keynote.keynoteUrl}
                      onClick={() => window.open(keynote.keynoteUrl || "", "_blank")}
                      className="flex items-center gap-2 text-xs"
                    >
                      <File className="h-3 w-3" />
                      <span className={keynote.keynoteUrl ? "text-green-600" : "text-muted-foreground"}>
                        {keynote.keynoteUrl ? (
                          <span className="flex items-center gap-2">
                            Main file uploaded
                            <Link2 className="h-3 w-3" />
                          </span>
                        ) : (
                          "No main file"
                        )}
                      </span>
                    </button>
                    <button type="button" disabled={!keynote.mobileKeynoteUrl} onClick={() => window.open(keynote.mobileKeynoteUrl || "", "_blank")} className="flex items-center gap-2 text-xs" >
                      <Smartphone className="h-3 w-3" />
                      <span className={keynote.mobileKeynoteUrl ? "text-green-600" : "text-muted-foreground"}>
                        {keynote.mobileKeynoteUrl ?
                         <span className="flex items-center gap-2">
                          Mobile file uploaded
                          <Link2 className="h-3 w-3" />
                         </span> : "No mobile file"}
                      </span>
                    </button>
                    <button type="button" disabled={!keynote.presentorNotesUrl} onClick={() => window.open(keynote.presentorNotesUrl || "", "_blank")} className="flex items-center gap-2 text-xs" >
                      <Eye className="h-3 w-3" />
                      <span className={keynote.presentorNotesUrl ? "text-green-600" : "text-muted-foreground"}>
                        {keynote.presentorNotesUrl ? (
                          <span className="flex items-center gap-2">
                            Presenter notes uploaded
                            <Link2 className="h-3 w-3" />
                          </span>
                        ) : (
                          "No presenter notes"
                        )}
                      </span>
                    </button>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => router.push(`/present?keynote=${keynote.id}`)}>
                      <Play className="mr-2 h-4 w-4" />
                      Present
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Create Keynote Modal */}
        <CModal ref={createModalRef} title="Create New Keynote" button={<></>} className="w-96">
          <div className="w-96 space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={state.createForm.name || ""}
                onChange={(e) =>
                  setState((prev) => ({
                    ...prev,
                    createForm: { ...prev.createForm, name: e.target.value },
                  }))
                }
                placeholder="Enter keynote name"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={state.createForm.description || ""}
                onChange={(e) =>
                  setState((prev) => ({
                    ...prev,
                    createForm: { ...prev.createForm, description: e.target.value },
                  }))
                }
                placeholder="Enter keynote description"
                rows={3}
              />
            </div>

            <div>
              <Label>Total Slides</Label>
              <div className="mt-1">
                {state.parsingPDF ? (
                  <div className="bg-muted flex items-center gap-2 rounded-md p-3">
                    <div className=" h-4 w-4 animate-spin rounded-full border-b-2"></div>
                    <span className="text-muted-foreground text-sm">Analyzing PDF...</span>
                  </div>
                ) : state.createForm.keynoteFile && (state.createForm.totalFrames || 0) > 0 ? (
                  <div className="flex items-center gap-2 rounded-md p-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full">
                      <span className="text-sm font-semibold text-green-600">{state.createForm.totalFrames || 0}</span>
                    </div>
                    <span className="text-sm text-green-600 font-semibold">slides detected from {state.createForm.keynoteFile.name}</span>
                  </div>
                ) : (
                  <div className="bg-muted flex items-center gap-2 rounded-md p-3">
                    <div className="bg-muted-foreground/20 flex h-6 w-6 items-center justify-center rounded-full">
                      <span className="text-muted-foreground text-sm">?</span>
                    </div>
                    <span className="text-muted-foreground text-sm">Upload a main keynote PDF to auto-detect slide count</span>
                  </div>
                )}
              </div>
            </div>

            {/* File Upload Sections */}
            <div className="space-y-4 pt-4">
              <h4 className="font-medium">Upload Files</h4>

              <div>
                <Label htmlFor="keynoteFile">Main Keynote File (PDF) *</Label>
                <Input
                  id="keynoteFile"
                  type="file"
                  accept=".pdf"
                  onChange={(e) => handleFileChange("keynoteFile", e.target.files?.[0])}
                  className="mt-1"
                  required
                />
                {state.createForm.keynoteFile && <p className="mt-1 text-sm text-green-600">Selected: {state.createForm.keynoteFile.name}</p>}
              </div>

              <div>
                <Label htmlFor="mobileKeynoteFile">Mobile Keynote File (PDF) - Optional</Label>
                <Input
                  id="mobileKeynoteFile"
                  type="file"
                  accept=".pdf"
                  onChange={(e) => handleFileChange("mobileKeynoteFile", e.target.files?.[0])}
                  className="mt-1"
                />
                {state.createForm.mobileKeynoteFile && (
                  <p className="mt-1 text-sm text-green-600">Selected: {state.createForm.mobileKeynoteFile.name}</p>
                )}
              </div>

              <div>
                <Label htmlFor="presentorNotesFile">Presenter Notes File (PDF) - Optional</Label>
                <Input
                  id="presentorNotesFile"
                  type="file"
                  accept=".pdf"
                  onChange={(e) => handleFileChange("presentorNotesFile", e.target.files?.[0])}
                  className="mt-1"
                />
                {state.createForm.presentorNotesFile && (
                  <p className="mt-1 text-sm text-green-600">Selected: {state.createForm.presentorNotesFile.name}</p>
                )}
              </div>

              {/* Page Mismatch Warning */}
              {state.pageMismatchWarning && (
                <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-yellow-600" />
                    <p className="text-sm text-yellow-800">{state.pageMismatchWarning}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={closeModals}>
                Cancel
              </Button>
              <Button onClick={handleCreateKeynote} disabled={!state.createForm.name || !state.createForm.keynoteFile || state.uploading}>
                {state.uploading ? "Creating..." : "Create Keynote"}
              </Button>
            </div>
          </div>
        </CModal>

        {/* Delete Confirmation Modal */}
        <CModal ref={deleteModalRef} title="Delete Keynote" button={<></>}>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Are you sure you want to delete "{state.selectedKeynote?.name || "this keynote"}"? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={closeModals}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteKeynote}>
                Delete
              </Button>
            </div>
          </div>
        </CModal>
      </div>
    </div>
  );
}

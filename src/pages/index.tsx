import {
  Upload,
  Presentation,
  Users,
  Smartphone,
  Hand,
  Wifi,
  Play,
  ArrowRight,
  CheckCircle,
  Star,
  Zap,
  Globe,
  Shield,
  Clock,
  Monitor,
  Eye,
  Mic,
} from "lucide-react";
import React from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Action Buttons Section */}
      <section className="bg-background py-12">
        <div className="container mx-auto px-6">
          <div className="mb-8 text-center">
            <h2 className="mb-3 text-2xl font-bold lg:text-3xl">
              Choose Your <span className="text-primary">Role</span>
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-base">
              Get started by selecting how you want to participate in the presentation
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
            {/* Presenter Button */}
            <Link href="/present">
              <Card className="group border-border/50 hover:border-primary/50 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <CardHeader className="pb-3 text-center">
                  <div className="group-hover:bg-primary/20 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full transition-colors">
                    <Mic className="text-primary h-16 w-16" />
                  </div>
                  <CardTitle className="text-xl font-bold">Presenter</CardTitle>
                  <CardDescription className="text-sm">Upload PDFs and control presentations remotely</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button variant="ghost" size="sm" className="group-hover:bg-primary/10 w-full transition-colors">
                    Start Presenting
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>

            {/* Screen Button */}
            <Link href="/screen">
              <Card className="group border-border/50 hover:border-primary/50 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <CardHeader className="pb-3 text-center">
                  <div className="group-hover:bg-primary/20 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full transition-colors">
                    <Monitor className="text-primary h-16 w-16" />
                  </div>
                  <CardTitle className="text-xl font-bold">Screen</CardTitle>
                  <CardDescription className="text-sm">Connect your projector or display screen</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button variant="ghost" size="sm" className="group-hover:bg-primary/10 w-full transition-colors">
                    Connect Screen
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>

            {/* Spectator Button */}
            <Link href="/spectate">
              <Card className="group border-border/50 hover:border-primary/50 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <CardHeader className="pb-3 text-center">
                  <div className="group-hover:bg-primary/20 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full transition-colors">
                    <Eye className="text-primary h-16 w-16" />
                  </div>
                  <CardTitle className="text-xl font-bold">Spectator</CardTitle>
                  <CardDescription className="text-sm">Join as audience member on your mobile device</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button variant="ghost" size="sm" className="group-hover:bg-primary/10 w-full transition-colors">
                    Join Audience
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-6 py-20 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="text-primary mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
              <Zap className="h-4 w-4" />
              Real-time PDF Presentations
            </div>

            <h1 className="from-foreground to-muted-foreground mb-6 bg-gradient-to-r bg-clip-text text-5xl font-bold text-transparent lg:text-7xl">
              Transform Your
              <span className="text-primary block">Presentations</span>
            </h1>

            <p className="text-muted-foreground mx-auto mb-8 max-w-3xl text-xl leading-relaxed lg:text-2xl">
              Upload PDFs, present in real-time, and engage your audience like never before. Remote control, mobile viewing, and interactive features
              that boost engagement.
            </p>

            <div className="text-muted-foreground flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-success h-4 w-4" />
                No software installation
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-success h-4 w-4" />
                Works on any device
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-success h-4 w-4" />
                Real-time synchronization
              </div>
            </div>

            <div className="bg-secondary/20 border-border/50 mt-8 rounded-lg border p-4">
              <p className="text-muted-foreground text-sm">
                <strong>Note:</strong> A Nauth account is required to use Keynote. Sign in with your existing Nauth credentials or create a new
                account to get started.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold lg:text-4xl">
              Everything You Need for
              <span className="text-primary"> Engaging Presentations</span>
            </h2>
            <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
              From PDF upload to real-time control, our platform provides all the tools you need to create interactive and engaging presentations.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="group border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="pb-3">
                <div className="group-hover:bg-primary/20 mb-3 flex h-10 w-10 items-center justify-center rounded-lg transition-colors">
                  <Upload className="text-primary h-5 w-5" />
                </div>
                <CardTitle className="text-lg">Easy PDF Upload</CardTitle>
                <CardDescription className="text-sm">
                  Simply drag and drop your PDF files. The upload process is quick and easy, getting your presentation ready in seconds.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="pb-3">
                <div className="group-hover:bg-primary/20 mb-3 flex h-10 w-10 items-center justify-center rounded-lg transition-colors">
                  <Presentation className="text-primary h-5 w-5" />
                </div>
                <CardTitle className="text-lg">Real-time Control</CardTitle>
                <CardDescription className="text-sm">
                  Control your presentation remotely from any device. Navigate slides, zoom, and annotate in real-time with perfect synchronization.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="pb-3">
                <div className="group-hover:bg-primary/20 mb-3 flex h-10 w-10 items-center justify-center rounded-lg transition-colors">
                  <Smartphone className="text-primary h-5 w-5" />
                </div>
                <CardTitle className="text-lg">Mobile Viewing</CardTitle>
                <CardDescription className="text-sm">
                  Audience members can view presentations on their mobile devices with optimized layouts and smooth navigation.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="pb-3">
                <div className="group-hover:bg-primary/20 mb-3 flex h-10 w-10 items-center justify-center rounded-lg transition-colors">
                  <Hand className="text-primary h-5 w-5" />
                </div>
                <CardTitle className="text-lg">Raise Hand Feature</CardTitle>
                <CardDescription className="text-sm">
                  Audience members can raise their hands to ask questions or request temporary control of the presentation for interactive sessions.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="pb-3">
                <div className="group-hover:bg-primary/20 mb-3 flex h-10 w-10 items-center justify-center rounded-lg transition-colors">
                  <Wifi className="text-primary h-5 w-5" />
                </div>
                <CardTitle className="text-lg">Live Synchronization</CardTitle>
                <CardDescription className="text-sm">
                  All devices stay perfectly synchronized. Changes made by the presenter are instantly reflected across all connected screens and
                  devices.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="pb-3">
                <div className="group-hover:bg-primary/20 mb-3 flex h-10 w-10 items-center justify-center rounded-lg transition-colors">
                  <Users className="text-primary h-5 w-5" />
                </div>
                <CardTitle className="text-lg">Unlimited Audience</CardTitle>
                <CardDescription className="text-sm">
                  Support for unlimited audience members. Perfect for conferences, meetings, and educational sessions.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="pb-3">
                <div className="group-hover:bg-primary/20 mb-3 flex h-10 w-10 items-center justify-center rounded-lg transition-colors">
                  <Presentation className="text-primary h-5 w-5" />
                </div>
                <CardTitle className="text-lg">Presenter Notes</CardTitle>
                <CardDescription className="text-sm">
                  View your private notes on the presenter display while the audience sees only the main presentation content.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold lg:text-5xl">
              How It <span className="text-primary">Works</span>
            </h2>
            <p className="text-muted-foreground mx-auto max-w-3xl text-xl">
              Three simple steps to transform your presentations into interactive experiences
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full">
                <span className="text-primary text-2xl font-bold">1</span>
              </div>
              <h3 className="mb-4 text-2xl font-semibold">Upload & Connect</h3>
              <p className="text-muted-foreground text-lg">
                Upload your PDF presentation and connect your screen or projector. Generate a unique session code for your audience.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full">
                <span className="text-primary text-2xl font-bold">2</span>
              </div>
              <h3 className="mb-4 text-2xl font-semibold">Present & Control</h3>
              <p className="text-muted-foreground text-lg">
                Control your presentation remotely from any device. Navigate slides, zoom, and annotate while your audience follows along.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full">
                <span className="text-primary text-2xl font-bold">3</span>
              </div>
              <h3 className="mb-4 text-2xl font-semibold">Engage & Interact</h3>
              <p className="text-muted-foreground text-lg">
                Audience members join on their devices, raise hands for questions, and can request temporary control for interactive sessions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mb-9 py-20">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold lg:text-5xl">
              Why Choose <span className="text-primary">Keynote</span>
            </h2>
            <p className="text-muted-foreground mx-auto max-w-3xl text-xl">
              Experience the future of presentations with features designed to maximize engagement
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="bg-success/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg">
                <Clock className="text-success h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Instant Setup</h3>
              <p className="text-muted-foreground">Get started in seconds. No software installation or complex setup required.</p>
            </div>

            <div className="text-center">
              <div className="bg-info/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg">
                <Globe className="text-info h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Universal Access</h3>
              <p className="text-muted-foreground">Works on any device, anywhere. Perfect for remote and hybrid presentations.</p>
            </div>

            <div className="text-center">
              <div className="bg-warning/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg">
                <Users className="text-warning h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Scalable</h3>
              <p className="text-muted-foreground">Handle large audiences with unlimited spectator connections.</p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg">
                <Zap className="text-primary h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Real-time Sync</h3>
              <p className="text-muted-foreground">Perfect synchronization across all devices with minimal latency.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

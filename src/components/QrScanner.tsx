import { useEffect, useState } from "react";
import { LuCameraOff } from "react-icons/lu";
import { Button } from "./ui/button";
import { Scanner } from "@yudiel/react-qr-scanner";

export default function QrScanner({ onValue }: { onValue: (value: string) => void }) {
  const [permissionStatus, setPermissionStatus] = useState<"granted" | "denied" | "prompt">("prompt");

  useEffect(() => {
    navigator.permissions.query({ name: "camera" }).then((result) => {
      setPermissionStatus(result.state);
    });
  }, []);

  return (
    <div className="border-border flex h-full w-full items-center justify-center rounded-xl border-2">
      {permissionStatus === "granted" && <Scanning onValue={onValue} />}
      {permissionStatus === "denied" && <PermissionsDenied />}
      {permissionStatus === "prompt" && (
        <RequestPermissions onSuccess={() => setPermissionStatus("granted")} onDeny={() => setPermissionStatus("denied")} />
      )}
    </div>
  );
}

const PermissionsDenied = () => {
  return (
    <div className="border-border flex h-full w-full flex-col items-center justify-center rounded-xl border-2 text-center">
      <LuCameraOff className="text-destructive text-7xl" />

      <div className="text-muted-foreground mt-8 flex w-50 items-center justify-center text-sm font-semibold">Camera access denied</div>
    </div>
  );
};

const RequestPermissions = ({ onSuccess, onDeny }: { onSuccess: () => void; onDeny: () => void }) => {
  return (
    <div className="border-border flex h-full w-full flex-col items-center justify-center rounded-xl border-2">
      <LuCameraOff className="text-destructive text-7xl" />

      <div className="mt-4 flex flex-col items-center justify-center gap-2 text-center">
        <Button
          onClick={async () => {
            try {
              const stream = await navigator.mediaDevices.getUserMedia({ video: true });
              const video = document.querySelector("video");
              if (video) {
                onSuccess();
              }
            } catch (err) {
              onDeny();
            }
          }}
          variant="ghost"
          className="text-lg font-semibold"
        >
          Allow
        </Button>
        <div className="text-muted-foreground w-50 text-sm">In order to use this feature, you need to allow access to your camera.</div>
      </div>
    </div>
  );
};

const Scanning = ({ onValue }: { onValue: (value: string) => void }) => {
  const [isActive, setIsActive] = useState(true);

  const handleScan = (result: any) => {
    const value = result[0].rawValue.substring(result[0].rawValue.length - 19);
    onValue(value);
    
    // Reset scanner to allow reading the same QR code again
    setIsActive(false);
    setTimeout(() => {
      setIsActive(true);
    }, 100); // Brief pause to reset the scanner's internal state
  };

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-xl">
        <Scanner
          onScan={handleScan}
          sound={true}
          components={{
            finder: false,
          }}
        />
    </div>
  );
};
// 1421498364146483200

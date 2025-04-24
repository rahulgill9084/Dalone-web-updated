"use client";
import { useEffect, useState } from "react";

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      console.log("👍 beforeinstallprompt fired");
      setDeferredPrompt(e);
      setShowInstall(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("✅ User accepted the install prompt");
        } else {
          console.log("❌ User dismissed the install prompt");
        }
        setDeferredPrompt(null);
        setShowInstall(false);
      });
    }
  };

  if (!showInstall) return null;

  return (
    <button
      onClick={handleInstallClick}
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        backgroundColor: "#0070f3",
        color: "#fff",
        padding: "10px 20px",
        borderRadius: "8px",
        border: "none",
        zIndex: 9999,
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        cursor: "pointer",
      }}
    >
      Install App
    </button>
  );
}

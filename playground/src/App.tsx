import { useState, useEffect, useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SignIn, SignUp } from "@clerk/clerk-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => {
  const [showIntro, setShowIntro] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const done = () => setShowIntro(false);

  useEffect(() => {
    // Fallback: if video fails to load or play, skip after 2s
    const t = setTimeout(done, 2500);
    return () => clearTimeout(t);
  }, []);

  if (showIntro) {
    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "#000", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          onEnded={done}
          onError={done}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        >
          {/* Place your intro video at public/intro.mp4 */}
          <source src="/intro.mp4" type="video/mp4" />
        </video>
        <button
          onClick={done}
          style={{
            position: "absolute", bottom: 32, right: 32,
            background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.3)", borderRadius: 8,
            color: "#fff", padding: "8px 20px", fontSize: "0.85rem",
            fontWeight: 600, cursor: "pointer",
          }}
        >
          Skip
        </button>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route
              path="/sign-in/*"
              element={
                <div className="clerk-auth-page">
                  <SignIn
                    path="/sign-in"
                    routing="path"
                    signUpUrl="/sign-up"
                    fallbackRedirectUrl="/"
                  />
                </div>
              }
            />
            <Route
              path="/sign-up/*"
              element={
                <div className="clerk-auth-page">
                  <SignUp
                    path="/sign-up"
                    routing="path"
                    signInUrl="/sign-in"
                    fallbackRedirectUrl="/"
                  />
                </div>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

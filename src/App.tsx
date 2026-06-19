import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { LoadingScreen } from "@/components/LoadingScreen";
import { SocialDock } from "@/components/SocialDock";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { Toaster } from "@/components/ui/sonner";

// Import pages
import Home from "./routes/index";
import About from "./routes/about";
import Certificates from "./routes/certificates";
import Contact from "./routes/contact";
import Github from "./routes/github";
import Leetcode from "./routes/leetcode";
import Projects from "./routes/projects";
import Resume from "./routes/resume";
import Skills from "./routes/skills";
import Work from "./routes/work";
import Youtube from "./routes/youtube";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-semibold text-gradient">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">The page you're looking for doesn't exist.</p>
        <div className="mt-6">
          <a href="/" className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground glow">Go home</a>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LoadingScreen />
      <CustomCursor />
      <Navbar />
      <SocialDock />
      <main className="relative">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/github" element={<Github />} />
          <Route path="/leetcode" element={<Leetcode />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/work" element={<Work />} />
          <Route path="/youtube" element={<Youtube />} />
          <Route path="*" element={<NotFoundComponent />} />
        </Routes>
      </main>
      <Footer />
      <ChatbotWidget />
      <Toaster richColors closeButton position="top-center" />
    </BrowserRouter>
  );
}

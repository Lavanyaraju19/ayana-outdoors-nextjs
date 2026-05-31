import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VideoBackground from "./components/VideoBackground";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import Index from "./pages/Index";
import SummerCamp from "./pages/SummerCamp";
import WeekendTreks from "./pages/WeekendTreks";
import TrekDetail from "./pages/TrekDetail";
import BookingFlow from "./pages/BookingFlow";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Programs from "./pages/Programs";
import Gallery from "./pages/Gallery";
import Safety from "./pages/Safety";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <VideoBackground />
        <CustomCursor />
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/summer-camp" element={<SummerCamp />} />
          <Route path="/summer-camp/:id" element={<TrekDetail />} />
          <Route path="/weekend-treks" element={<WeekendTreks />} />
          <Route path="/weekend-treks/:id" element={<TrekDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/safety" element={<Safety />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booking" element={<BookingFlow />} />
          <Route path="/booking/:trekId" element={<BookingFlow />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <WhatsAppButton />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

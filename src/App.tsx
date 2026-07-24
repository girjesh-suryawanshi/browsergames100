import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "next-themes";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import GamePage from "./pages/GamePage";
import TrendingPage from "./pages/TrendingPage";
import LandingPage from "./pages/LandingPage";
import { landingPages } from "./data/seo-content";
import CategoryPage from "./pages/CategoryPage";
import CategoriesPage from "./pages/CategoriesPage";
import SearchPage from "./pages/SearchPage";
import FavoritesPage from "./pages/FavoritesPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Disclaimer from "./pages/Disclaimer";
import DMCAPolicy from "./pages/DMCAPolicy";
import NotFound from "./pages/NotFound";
import StickyBottomAd from "@/components/StickyBottomAd";
import CookieConsent from "@/components/CookieConsent";
import BlogList from "./pages/BlogList";
import BlogPost from "./pages/BlogPost";
import AdminBlogList from "./pages/admin/AdminBlogList";
import AdminBlogEditor from "./pages/admin/AdminBlogEditor";
import AdminLogin from "./pages/admin/AdminLogin";
import { AdminRoute } from "./components/admin/AdminRoute";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/game/:slug" element={<GamePage />} />
              <Route path="/trending" element={<TrendingPage />} />
              <Route path="/category/:slug" element={<CategoryPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/play-html5-games" element={<LandingPage {...landingPages['play-html5-games']} />} />
              <Route path="/free-browser-games" element={<LandingPage {...landingPages['free-browser-games']} />} />
              <Route path="/cloud-gaming-unblocked" element={<LandingPage {...landingPages['cloud-gaming-unblocked']} />} />
              <Route path="/poki-alternative" element={<LandingPage {...landingPages['poki-alternative']} />} />
              <Route path="/unblocked-racing-games" element={<LandingPage {...landingPages['unblocked-racing-games']} />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/disclaimer" element={<Disclaimer />} />
              <Route path="/dmca" element={<DMCAPolicy />} />
              <Route path="/blog" element={<BlogList />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/blog" element={<AdminRoute><AdminBlogList /></AdminRoute>} />
              <Route path="/admin/blog/new" element={<AdminRoute><AdminBlogEditor /></AdminRoute>} />
              <Route path="/admin/blog/edit/:slug" element={<AdminRoute><AdminBlogEditor /></AdminRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
            <StickyBottomAd />
            <CookieConsent />
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;

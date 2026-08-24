import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "next-themes";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import { landingPages } from "./data/seo-content";
import StickyBottomAd from "@/components/StickyBottomAd";
import CookieConsent from "@/components/CookieConsent";
import { AdminRoute } from "./components/admin/AdminRoute";

// Lazy-loaded routes for 60%+ smaller initial JS bundle
const GamePage = lazy(() => import("./pages/GamePage"));
const TrendingPage = lazy(() => import("./pages/TrendingPage"));
const LandingPage = lazy(() => import("./pages/LandingPage"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const CategoriesPage = lazy(() => import("./pages/CategoriesPage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const FavoritesPage = lazy(() => import("./pages/FavoritesPage"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const Disclaimer = lazy(() => import("./pages/Disclaimer"));
const DMCAPolicy = lazy(() => import("./pages/DMCAPolicy"));
const BlogList = lazy(() => import("./pages/BlogList"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminBlogList = lazy(() => import("./pages/admin/AdminBlogList"));
const AdminBlogEditor = lazy(() => import("./pages/admin/AdminBlogEditor"));
const NotFound = lazy(() => import("./pages/NotFound"));

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
            <Suspense fallback={
              <div className="min-h-[60vh] flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            }>
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
            </Suspense>
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

import { lazy, Suspense, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "./pages/Home.tsx";
import Work from "./pages/Work.tsx";
import Journey from "./pages/Journey.tsx";
import Lens from "./pages/Lens.tsx";
import NotFound from "./pages/NotFound.tsx";
import Blogs from "./pages/Blogs.tsx";
import { ThemeProvider } from "@/hooks/useTheme";
import { ChapterLayout } from "@/components/portfolio/ChapterLayout";
import { prefetchBlogList } from "@/hooks/useBlogs";

const BlogPost = lazy(() => import("./pages/BlogPost.tsx"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => {
  useEffect(() => {
    const ric =
      typeof requestIdleCallback === "function"
        ? requestIdleCallback
        : (cb: () => void) => setTimeout(cb, 1500);
    const id = ric(() => prefetchBlogList(queryClient));
    return () => {
      if (typeof cancelIdleCallback === "function") cancelIdleCallback(id as number);
      else clearTimeout(id as ReturnType<typeof setTimeout>);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route element={<ChapterLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/work" element={<Work />} />
                <Route path="/journey" element={<Journey />} />
                <Route path="/lens" element={<Lens />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/blogs/:category" element={<Blogs />} />
              </Route>
              <Route
                path="/blogs/:category/:slug"
                element={
                  <Suspense fallback={null}>
                    <BlogPost />
                  </Suspense>
                }
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;

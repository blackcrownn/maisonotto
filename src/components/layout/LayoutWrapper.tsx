import { Header } from "./Header";
import { Footer } from "./Footer";
import { ToastContainer } from "@/components/ui/ToastContainer";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

/**
 * Global layout shell.
 * Header handles its own transparency / scroll-to-solid logic
 * based on pathname — so we always render it here.
 */
export function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <ToastContainer />
    </>
  );
}

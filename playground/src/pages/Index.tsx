import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import SubscribePage from "@/pages/SubscribePage";
import FeaturedPage from "@/pages/FeaturedPage";

const Index = () => {
  const [page, setPage] = useState("home");

  const nav = (p: string) => {
    setPage(p);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Navbar page={page} onNavigate={nav} />
      {page === "about" ? (
        <AboutPage />
      ) : page === "contact" ? (
        <ContactPage />
      ) : page === "subscribe" ? (
        <SubscribePage />
      ) : page === "featured" ? (
        <FeaturedPage />
      ) : (
        <HomePage />
      )}
      <Footer onNavigate={nav} />
    </>
  );
};

export default Index;

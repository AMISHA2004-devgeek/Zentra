import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroIllustration from "@/assets/hero-illustration.png";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-background">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display leading-tight tracking-tight">
            Plan less.{" "}
            <span className="text-primary">Experience more.</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-md">
            AI-powered travel planner for smart itineraries. Optimize routes,
            manage budgets, and discover unforgettable experiences.
          </p>
          <Button
            size="lg"
            className="mt-8 rounded-full px-8 text-base"
            onClick={() =>
              document
                .getElementById("planner-section")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Start Planning
          </Button>
        </motion.div>

        <motion.div
          className="relative flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="animate-float-slow">
            <img
              src={heroIllustration}
              alt="Travel illustration with hot air balloons and beach"
              width={1024}
              height={768}
              className="w-full max-w-lg drop-shadow-2xl"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

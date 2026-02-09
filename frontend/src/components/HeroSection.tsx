import { ShieldCheck } from "lucide-react";

const HeroSection = () => (
  <section className="py-16 text-center">
    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
      <ShieldCheck className="w-8 h-8 text-primary" />
    </div>
    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
      Credit Card Fraud Detection
    </h1>
    <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
      Upload a transaction dataset and leverage machine learning to identify
      fraudulent transactions instantly. Built with Random Forest classification.
    </p>
  </section>
);

export default HeroSection;

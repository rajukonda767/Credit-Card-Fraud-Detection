import { useState, useCallback } from "react";
import HeroSection from "@/components/HeroSection";
import UploadSection from "@/components/UploadSection";
import ResultsSection, { Results } from "@/components/ResultsSection";
import ModelPerformance from "@/components/ModelPerformance";
import Footer from "@/components/Footer";

const MODEL_METRICS = {
  precision: 0.95,
  recall: 0.75,
  f1: 0.84,
};

const CONFUSION_MATRIX = [
  [85289, 6],
  [37, 111],
];

const Index = () => {
  const [results, setResults] = useState<Results | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpload = useCallback(async (file: File) => {
  setIsProcessing(true);

  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    setResults({
      total: data.total_transactions,
      fraudulent: data.fraud_transactions,
      legitimate: data.total_transactions - data.fraud_transactions,
    });
  } catch (error) {
    console.error("Error during prediction:", error);
    alert("Prediction failed. Check backend.");
  } finally {
    setIsProcessing(false);
  }
  }, []);


  const handleDownload = useCallback(() => {
    const csv = "transaction_id,prediction\n1,0\n2,1\n3,0";
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "predictions.csv";
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  return (
  <div className="min-h-screen flex flex-col">
    <div className="container mx-auto px-4 max-w-4xl flex-1">
      <HeroSection />

      {/* Upload + Prediction */}
      <UploadSection onUpload={handleUpload} isProcessing={isProcessing} />

      {/* Results from backend */}
      {results && (
  <>
    <ResultsSection results={results} onDownload={handleDownload} />

    <ModelPerformance
      metrics={MODEL_METRICS}
      confusionMatrix={CONFUSION_MATRIX}
    />
  </>
)}

    </div>

    <Footer />
  </div>
);

};

export default Index;

import { useState, useCallback } from "react";
import HeroSection from "@/components/HeroSection";
import UploadSection from "@/components/UploadSection";
import ResultsSection, { Results } from "@/components/ResultsSection";
import ModelPerformance from "@/components/ModelPerformance";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";


const MODEL_METRICS = {
  precision: 0.95,
  recall: 0.75,
  f1: 0.84,
};

const CONFUSION_MATRIX = [
  [85289, 6],
  [37, 111],
];
const SAMPLE_FRAUD_DATASET = `Time,Amount,V1,V2,V3,V4,V5,V6,V7,V8,V9,V10,V11,V12,V13,V14,V15,V16,V17,V18,V19,V20,V21,V22,V23,V24,V25,V26,V27,V28
100,12.99,0.245,0.132,-0.221,0.045,0.112,-0.031,0.084,0.002,-0.015,0.021,0.033,-0.012,0.055,0.021,-0.009,0.011,0.004,0.002,0.009,0.014,0.008,-0.006,0.003,0.007,0.004,0.002,0.001
250,45.10,-0.332,0.221,-0.441,0.098,-0.115,0.045,-0.102,0.015,-0.054,-0.061,0.087,-0.072,0.133,-0.095,0.064,-0.081,0.092,-0.044,0.021,-0.018,-0.041,0.055,-0.023,0.017,-0.039,0.044,-0.021,0.015
36000,2500,-6.221,-4.882,-1.774,3.991,-3.112,1.882,-3.551,0.215,-2.991,-4.115,2.884,-3.667,0.112,-5.433,1.992,-4.882,3.774,-1.233,0.882,-2.115,-1.992,-0.881,-0.554,-0.932,1.882,-0.443,0.112
480,89.60,0.181,-0.112,0.091,-0.032,0.074,0.015,-0.018,0.006,-0.011,0.008,0.022,0.019,0.014,-0.006,0.009,0.013,0.017,0.004,0.003,0.006,0.011,0.005,-0.002,0.001,0.004,0.003,0.002,0.001
900,22.50,-0.091,0.041,-0.062,0.018,-0.025,0.009,-0.014,0.004,-0.007,-0.006,0.011,-0.009,0.016,-0.012,0.008,-0.011,0.013,-0.006,0.004,-0.003,-0.005,0.007,-0.003,0.002,-0.004,0.005,-0.002,0.001`;


const Index = () => {
  const [results, setResults] = useState<Results | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpload = useCallback(async (file: File) => {
  setIsProcessing(true);

  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("https://fraud-detection-backend-i8k2.onrender.com/predict", {
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
      <div className="flex justify-center mt-6 mb-8">
  <ThemeToggle />
</div>
      {/* SAMPLE DATASET SECTION */}
      <div className="mb-8 rounded-lg border p-4 bg-muted/40">
        <h3 className="text-base font-semibold mb-2">
          Try with Sample Fraud Dataset
        </h3>

        <p className="text-sm text-muted-foreground mb-3">
          Download a small sample CSV and upload it to test fraud detection.
        </p>

        <button
          onClick={() => {
            const blob = new Blob([SAMPLE_FRAUD_DATASET], { type: "text/csv" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "sample_transactions.csv";
            a.click();
            URL.revokeObjectURL(url);
          }}
          className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm"
        >
          Download Sample CSV
        </button>
      </div>

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

import { useCallback, useState } from "react";
import { Upload, FileText, FileUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface UploadSectionProps {
  onUpload: (file: File) => void;
  isProcessing: boolean;
}

const UploadSection = ({ onUpload, isProcessing }: UploadSectionProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFile = useCallback(
    (file: File) => {
      if (file.name.endsWith(".csv")) {
        setFileName(file.name);
        onUpload(file);
      }
    },
    [onUpload]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
    },
    [handleFile]
  );

  return (
    <section className="mb-12">
      <Card className="shadow-lg border-2 border-primary/15 overflow-hidden">
        <CardHeader className="bg-primary/5 border-b border-primary/10 pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <FileUp className="w-5 h-5 text-primary" />
            Upload Transaction Dataset
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <label
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            className={`flex flex-col items-center justify-center gap-4 py-20 px-6 cursor-pointer transition-all duration-200 ${
              dragActive
                ? "bg-primary/10"
                : "hover:bg-primary/[0.03]"
            }`}
          >
            {fileName ? (
              <>
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <div className="text-center">
                  <span className="font-semibold text-lg">{fileName}</span>
                  <p className="text-sm text-muted-foreground mt-1">File uploaded successfully</p>
                </div>
              </>
            ) : (
              <>
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors ${dragActive ? "bg-primary/20" : "bg-primary/10"}`}>
                  <Upload className={`w-8 h-8 transition-colors ${dragActive ? "text-primary" : "text-primary/70"}`} />
                </div>
                <div className="text-center">
                  <p className="text-base">
                    Drag & drop your CSV file here, or{" "}
                    <span className="text-primary font-semibold underline underline-offset-2">browse</span>
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">Supports .csv transaction datasets</p>
                </div>
              </>
            )}
            <input
              type="file"
              accept=".csv"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) handleFile(e.target.files[0]);
              }}
            />
          </label>
          {isProcessing && (
            <div className="flex items-center justify-center gap-2 py-4 border-t text-sm text-muted-foreground">
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              Analyzing transactions…
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default UploadSection;

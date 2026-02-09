import { Download, CreditCard, AlertTriangle, CheckCircle, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface Results {
  total: number;
  fraudulent: number;
  legitimate: number;
}

interface ResultsSectionProps {
  results: Results;
  onDownload: () => void;
}

const StatCard = ({
  icon: Icon,
  label,
  value,
  variant = "default",
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  variant?: "default" | "danger" | "success";
}) => {
  const colors = {
    default: "text-primary bg-primary/10",
    danger: "text-warning bg-warning/10",
    success: "text-success bg-success/10",
  };

  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-6">
        <div className={`p-3 rounded-xl ${colors[variant]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold font-mono">{value.toLocaleString()}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const ResultsSection = ({ results, onDownload }: ResultsSectionProps) => (
  <section className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <Card className="shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          Prediction Results
        </CardTitle>
        <Button onClick={onDownload} size="sm" className="gap-2">
          <Download className="w-4 h-4" />
          Download CSV
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard icon={CreditCard} label="Total Transactions" value={results.total} />
          <StatCard icon={AlertTriangle} label="Fraudulent" value={results.fraudulent} variant="danger" />
          <StatCard icon={CheckCircle} label="Legitimate" value={results.legitimate} variant="success" />
        </div>
      </CardContent>
    </Card>
  </section>
);

export default ResultsSection;

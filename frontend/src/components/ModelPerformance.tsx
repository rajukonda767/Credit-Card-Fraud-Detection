import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Metrics {
  precision: number;
  recall: number;
  f1: number;
}

interface ModelPerformanceProps {
  metrics: Metrics;
  confusionMatrix: number[][];
}


const MetricBar = ({ label, value, description }: { label: string; value: number; description: string }) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium">{label}</span>
      <span className="text-sm font-mono font-semibold">{(value * 100).toFixed(1)}%</span>
    </div>
    <div className="h-2 rounded-full bg-secondary overflow-hidden">
      <div
        className="h-full rounded-full bg-primary transition-all duration-700 ease-out"
        style={{ width: `${value * 100}%` }}
      />
    </div>
    <p className="text-xs text-muted-foreground">{description}</p>
  </div>
);

const ConfusionMatrix = ({ matrix }: { matrix: number[][] }) => {
  const labels = ["Legitimate", "Fraud"];
  const max = Math.max(...matrix.flat());

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-center">Confusion Matrix</p>
      <div className="grid grid-cols-3 gap-1 max-w-xs mx-auto text-center text-sm">
        <div />
        <div className="text-xs text-muted-foreground py-1">Pred: Legit</div>
        <div className="text-xs text-muted-foreground py-1">Pred: Fraud</div>
        {matrix.map((row, i) => (
          <>
            <div key={`label-${i}`} className="text-xs text-muted-foreground flex items-center justify-end pr-2">
              Actual: {labels[i]}
            </div>
            {row.map((val, j) => {
              const intensity = max > 0 ? val / max : 0;
              const isCorrect = i === j;
              return (
                <div
                  key={`${i}-${j}`}
                  className="rounded-lg py-4 font-mono font-semibold transition-colors"
                  style={{
                    backgroundColor: isCorrect
                      ? `hsl(var(--success) / ${0.15 + intensity * 0.5})`
                      : `hsl(var(--destructive) / ${0.1 + intensity * 0.4})`,
                  }}
                >
                  {val.toLocaleString()}
                </div>
              );
            })}
          </>
        ))}
      </div>
    </div>
  );
};

const ModelPerformance = ({ metrics, confusionMatrix }: ModelPerformanceProps) => (
  <section className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <h2 className="text-xl font-semibold mb-4">Model Performance</h2>
    <p className="text-sm text-muted-foreground mb-4">
  These performance metrics are obtained on the test dataset during model evaluation (offline), not on uploaded user data.
  </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Classification Metrics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <MetricBar label="Precision" value={metrics.precision} description="Proportion of fraud predictions that were correct" />
          <MetricBar label="Recall" value={metrics.recall} description="Proportion of actual frauds that were detected" />
          <MetricBar label="F1-Score" value={metrics.f1} description="Harmonic mean of precision and recall" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Prediction Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <ConfusionMatrix matrix={confusionMatrix} />
        </CardContent>
      </Card>
    </div>
  </section>
);

export default ModelPerformance;

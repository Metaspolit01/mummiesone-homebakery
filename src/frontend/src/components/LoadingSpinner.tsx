import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
}

export function LoadingSpinner({
  size = "md",
  className,
  label = "Loading...",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-2",
    lg: "w-12 h-12 border-3",
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3",
        className,
      )}
      data-ocid="loading_state"
      aria-label={label}
      aria-live="polite"
    >
      <div
        className={cn(
          "rounded-full border-primary/20 border-t-primary animate-spin",
          sizeClasses[size],
        )}
      />
      {size !== "sm" && (
        <p className="text-muted-foreground text-sm font-body">{label}</p>
      )}
      <span className="sr-only">{label}</span>
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[40vh]">
      <LoadingSpinner size="lg" label="Loading bakery items..." />
    </div>
  );
}

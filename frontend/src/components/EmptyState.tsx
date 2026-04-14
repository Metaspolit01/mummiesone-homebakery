import { Link } from "react-router-dom";

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: { label: string; to: string };
}

export default function EmptyState({ icon = "🧁", title, description, action }: EmptyStateProps) {
  return (
    <div
      data-ocid="empty_state"
      className="flex flex-col items-center justify-center py-20 px-4 text-center gap-3"
    >
      <div className="text-6xl mb-2">{icon}</div>
      <h3
        className="text-xl font-semibold"
        style={{ fontFamily: "Fraunces, serif", color: "oklch(0.22 0.04 130)" }}
      >
        {title}
      </h3>
      {description && (
        <p className="text-sm max-w-sm" style={{ color: "oklch(0.45 0.04 130)" }}>
          {description}
        </p>
      )}
      {action && (
        <Link
          to={action.to}
          className="mt-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
          style={{
            backgroundColor: "oklch(0.72 0.15 130)",
            color: "oklch(0.15 0.03 130)",
            textDecoration: "none",
          }}
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}

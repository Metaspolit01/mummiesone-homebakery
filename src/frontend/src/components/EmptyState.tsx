import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 py-16 px-6 text-center",
        className,
      )}
      data-ocid="empty_state"
    >
      {icon ? (
        <div className="text-5xl mb-2">{icon}</div>
      ) : (
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-2">
          <span className="text-3xl">🎂</span>
        </div>
      )}
      <h3 className="font-display text-foreground text-xl font-semibold">
        {title}
      </h3>
      {description && (
        <p className="text-muted-foreground text-sm font-body max-w-xs leading-relaxed">
          {description}
        </p>
      )}
      {action &&
        (action.href ? (
          <Link to={action.href as "/"}>
            <Button
              className="gradient-accent text-primary-foreground border-0 mt-2 font-body"
              data-ocid="empty_state.action_button"
            >
              {action.label}
            </Button>
          </Link>
        ) : (
          <Button
            onClick={action.onClick}
            className="gradient-accent text-primary-foreground border-0 mt-2 font-body"
            data-ocid="empty_state.action_button"
          >
            {action.label}
          </Button>
        ))}
    </div>
  );
}

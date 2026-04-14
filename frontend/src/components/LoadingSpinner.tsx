export default function LoadingSpinner({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div
        className="w-10 h-10 rounded-full border-4 border-t-transparent animate-spin"
        style={{
          borderColor: "oklch(0.88 0.06 130)",
          borderTopColor: "oklch(0.72 0.15 130)",
        }}
        role="status"
        aria-label="Loading"
      />
      <p className="text-sm" style={{ color: "oklch(0.45 0.04 130)" }}>
        {message}
      </p>
    </div>
  );
}

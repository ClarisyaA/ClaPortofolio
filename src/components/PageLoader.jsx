export const PageLoader = ({ label = "Loading portfolio", fullScreen = false }) => {
  return (
    <div
      className={`page-loader ${fullScreen ? "min-h-screen pt-28" : "min-h-40"} flex items-center justify-center px-4`}
      role="status"
      aria-live="polite"
    >
      <div className="page-loader-panel">
        <div className="page-loader-orbit" aria-hidden="true">
          <span />
          <span />
        </div>
        <p className="text-sm font-semibold text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">Preparing something nice...</p>
      </div>
    </div>
  );
};

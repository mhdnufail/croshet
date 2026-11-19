function Loader({ message = "Loading...", fullScreen = false }) {
  if (fullScreen) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-background px-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-secondary"></div>
          <div className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
        </div>
        {message && (
          <p className="text-muted text-xs font-medium tracking-[0.2em] uppercase mt-5">
            {message}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 rounded-full border-2 border-secondary"></div>
        <div className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
      </div>
      {message && (
        <p className="text-muted text-xs font-medium tracking-[0.2em] uppercase mt-4">
          {message}
        </p>
      )}
    </div>
  );
}

export default Loader;

import { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2800);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Floating Toast Notification Container */}
      <div className="fixed bottom-6 right-6 z-[300] flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`
              pointer-events-auto
              flex items-center justify-between gap-3
              px-4 py-3.5
              rounded-xl
              shadow-lg
              border
              text-sm
              font-medium
              transition-all
              duration-300
              animate-in fade-in slide-in-from-bottom-2
              ${
                toast.type === "error"
                  ? "bg-[#FFF5F5] border-red-200 text-red-800"
                  : toast.type === "info"
                  ? "bg-secondary border-text/10 text-text"
                  : "bg-white border-[#8B5E3C]/20 text-[#2F241F]"
              }
            `}
          >
            <div className="flex items-center gap-2.5">
              {toast.type === "error" ? (
                <AlertCircle size={18} className="text-red-500 shrink-0" />
              ) : toast.type === "info" ? (
                <Info size={18} className="text-primary shrink-0" />
              ) : (
                <CheckCircle2 size={18} className="text-primary shrink-0" />
              )}
              <span className="leading-snug">{toast.message}</span>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-muted hover:text-text transition p-1"
              aria-label="Close notification"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    // Return safe fallback if used outside provider
    return { showToast: (msg) => console.log(msg) };
  }
  return context;
}

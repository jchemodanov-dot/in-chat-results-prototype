interface ToastProps {
  message: string | null;
}

export function Toast({ message }: ToastProps) {
  if (!message) return null;
  return (
    <div className="absolute bottom-[152px] left-0 right-0 flex justify-center px-6 z-40 pointer-events-none">
      <div className="toast-in bg-ink text-white text-[15px] font-medium px-5 py-3 rounded-2xl shadow-[0_10px_30px_-8px_rgba(0,0,0,0.4)] text-center">
        {message}
      </div>
    </div>
  );
}

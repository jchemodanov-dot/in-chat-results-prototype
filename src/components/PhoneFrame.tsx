import { ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
  bottomFixed?: ReactNode;
}

export function PhoneFrame({ children, bottomFixed }: PhoneFrameProps) {
  return (
    <div className="phone-outer min-h-screen w-full flex items-center justify-center sm:p-6 p-0">
      <div
        className="
          phone-shell
          relative
          w-full sm:w-[390px]
          h-[100dvh] sm:h-[844px]
          sm:max-h-[calc(100dvh-48px)]
          bg-background
          sm:rounded-[44px]
          overflow-hidden
          sm:shadow-phone
          sm:ring-1 sm:ring-black/5
        "
      >
        <div className="phone-scroll absolute inset-0 overflow-y-auto overscroll-contain">
          {children}
        </div>
        {bottomFixed && (
          <div className="phone-bottom absolute bottom-0 left-0 right-0 z-30">
            {bottomFixed}
          </div>
        )}
      </div>
    </div>
  );
}

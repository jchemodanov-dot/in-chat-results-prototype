import { useCallback, useRef, useState } from "react";
import { PhoneFrame } from "./components/PhoneFrame";
import { ChatHeader } from "./components/ChatHeader";
import { AssistantIntro } from "./components/AssistantIntro";
import { ResultSheet } from "./components/ResultSheet";
import { LockedTeaser } from "./components/LockedTeaser";
import { StickyCTA } from "./components/StickyCTA";
import { Toast } from "./components/Toast";

export default function App() {
  const [toast, setToast] = useState<string | null>(null);
  const timer = useRef<number | undefined>(undefined);

  const showToast = useCallback((message: string) => {
    window.clearTimeout(timer.current);
    setToast(message);
    timer.current = window.setTimeout(() => setToast(null), 2000);
  }, []);

  return (
    <PhoneFrame
      bottomFixed={
        <>
          <Toast message={toast} />
          <StickyCTA
            onAction={() => showToast("Переход к персональному плану")}
          />
        </>
      }
    >
      <ChatHeader />
      <AssistantIntro />
      <ResultSheet />
      <LockedTeaser
        onLockedTap={() => showToast("Доступно в персональном плане")}
      />
      <div className="h-[180px]" aria-hidden />
    </PhoneFrame>
  );
}

import { PhoneFrame } from "./components/PhoneFrame";
import { ChatHeader } from "./components/ChatHeader";
import { AssistantIntro } from "./components/AssistantIntro";
import { ResultSheet } from "./components/ResultSheet";
import { LockedTeaser } from "./components/LockedTeaser";
import { StickyCTA } from "./components/StickyCTA";

export default function App() {
  return (
    <PhoneFrame bottomFixed={<StickyCTA />}>
      <ChatHeader />
      <AssistantIntro />
      <ResultSheet />
      <LockedTeaser />
      <div className="h-[160px]" aria-hidden />
    </PhoneFrame>
  );
}

import { StatusBar } from "./StatusBar";

export function ChatHeader() {
  return (
    <div className="sticky top-0 z-20 bg-app/85 backdrop-blur-md">
      <StatusBar />
      <div className="px-5 pt-1.5 pb-2.5">
        <h1 className="text-[34px] font-bold text-ink tracking-tight leading-none">
          Чат
        </h1>
      </div>
    </div>
  );
}

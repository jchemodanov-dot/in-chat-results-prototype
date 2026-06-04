import { useState, type CSSProperties } from "react";
import { PhoneFrame } from "./components/PhoneFrame";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { ChatResults } from "./flow/ChatResults";
import { ChatCTA } from "./flow/ChatCTA";
import { THEMES } from "./content/themes";

function initialTheme() {
  if (typeof window === "undefined") return THEMES[0];
  const id = new URLSearchParams(window.location.search).get("theme");
  return THEMES.find((t) => t.id === id) ?? THEMES[0];
}

export default function App() {
  const [theme, setTheme] = useState(initialTheme);
  const accentStyle = { "--accent": theme.accent } as CSSProperties;

  // ?shot — reveal the whole chat at once + expand the phone (for screenshots)
  const shot =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).has("shot");

  return (
    <div className={`themed ${shot ? "shot" : ""}`} style={accentStyle}>
      <ThemeSwitcher active={theme} onSelect={setTheme} />
      <PhoneFrame bottomFixed={<ChatCTA label={theme.cta} />}>
        {/* re-key on theme change so the chat replays from the top */}
        <ChatResults key={theme.id} theme={theme} instant={shot} />
      </PhoneFrame>
    </div>
  );
}

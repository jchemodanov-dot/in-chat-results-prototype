import { useState, type CSSProperties } from "react";
import { PhoneFrame } from "./components/PhoneFrame";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { RevealFlow } from "./flow/RevealFlow";
import { THEMES } from "./content/themes";

function initialTheme() {
  if (typeof window === "undefined") return THEMES[0];
  const id = new URLSearchParams(window.location.search).get("theme");
  return THEMES.find((t) => t.id === id) ?? THEMES[0];
}

export default function App() {
  const [theme, setTheme] = useState(initialTheme);

  // Drive the whole accent system from one CSS variable.
  const accentStyle = { "--accent": theme.accent } as CSSProperties;

  return (
    <div className="themed" style={accentStyle}>
      <ThemeSwitcher active={theme} onSelect={setTheme} />
      <PhoneFrame>
        {/* re-key on theme change so the flow restarts from the scan screen */}
        <RevealFlow key={theme.id} theme={theme} />
      </PhoneFrame>
    </div>
  );
}

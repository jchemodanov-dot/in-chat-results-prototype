import { THEMES, type ThemeContent } from "../content/themes";

interface ThemeSwitcherProps {
  active: ThemeContent;
  onSelect: (theme: ThemeContent) => void;
}

/**
 * Demo-only control (hidden on real mobile widths). Lets you flip the session
 * theme to prove the card is one adaptive system, not a static screen built
 * for "relationships".
 */
export function ThemeSwitcher({ active, onSelect }: ThemeSwitcherProps) {
  return (
    <div className="hidden md:block fixed top-5 left-5 z-50 w-[208px]">
      <div className="rounded-2xl bg-white/90 backdrop-blur-md border border-black/5 shadow-[0_10px_30px_-12px_rgba(40,50,90,0.3)] p-3.5">
        <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-text-secondary">
          Тема сессии · демо
        </p>
        <p className="text-[11.5px] text-text-secondary/80 mt-0.5 mb-2.5 leading-snug">
          Переключите — карточка адаптируется
        </p>
        <div className="flex flex-wrap gap-1.5">
          {THEMES.map((theme) => {
            const isActive = theme.id === active.id;
            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => onSelect(theme)}
                className={`rounded-full px-3 py-1.5 text-[12.5px] font-medium border transition-colors ${
                  isActive
                    ? "accent-chip accent-border"
                    : "bg-white text-text-secondary border-black/8 hover:border-black/15"
                }`}
              >
                {theme.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

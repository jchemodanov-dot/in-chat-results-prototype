import { InsightSection } from "./InsightSection";
import { InfoSection } from "./InfoSection";

export function ResultSheet() {
  return (
    <section
      className="
        mx-5 mt-3
        fade-up-delay-1
        rounded-[28px]
        bg-surface
        p-6
        shadow-sheet
        border border-white
      "
    >
      <header className="mb-5">
        <h2 className="text-[26px] font-bold text-text-primary tracking-tight leading-[1.1]">
          Твои результаты
        </h2>
        <p className="text-[15px] text-text-secondary mt-1">первичной диагностики</p>
      </header>

      <InsightSection title="Твой инсайт">
        Твоё настроение слишком зависит от него. Ты хочешь вернуть себе устойчивость,
        чтобы отношения не качали тебя каждый день.
      </InsightSection>

      <InfoSection
        title="Твой паттерн"
        icon={
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M3 12C3 12 6 5 12 5C18 5 21 12 21 12C21 12 18 19 12 19C6 19 3 12 3 12Z"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <circle cx="12" cy="12" r="3" fill="currentColor" />
          </svg>
        }
      >
        Ты отдаёшь ему право задавать тон твоему дню — и из-за этого часто
        подстраиваешься, вместо того чтобы опираться на себя.
      </InfoSection>

      <InfoSection
        title="Что ты получишь после сессий"
        icon={
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M12 3L13.8 8.5L19.5 8.7L14.95 12.15L16.6 17.7L12 14.4L7.4 17.7L9.05 12.15L4.5 8.7L10.2 8.5L12 3Z"
              fill="currentColor"
            />
          </svg>
        }
      >
        Ты начнёшь держать свой курс даже рядом с ним и выбирать то, что подходит
        тебе, без попыток заслужить спокойствие.
      </InfoSection>
    </section>
  );
}

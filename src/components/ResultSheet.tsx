import { InsightBlock } from "./InsightBlock";
import { InfoSection } from "./InfoSection";

function LightbulbIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 17.5h6M10 20.5h4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M12 3.5a6 6 0 0 0-3.8 10.6c.5.4.8 1 .8 1.7v.2h6v-.2c0-.7.3-1.3.8-1.7A6 6 0 0 0 12 3.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function WaveIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 13.5c1.8-4 3.6-4 5.4 0M9.3 13.5c1.8-4 3.6-4 5.4 0M15.6 13.5c1.8-4 3.6-4 5.4 0"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3l1.9 5.6 5.6 1.9-5.6 1.9L12 18l-1.9-5.6L4.5 10.5l5.6-1.9L12 3Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ResultSheet() {
  return (
    <section className="mx-5 mt-2 fade-up-delay-1 rounded-[30px] bg-surface border border-line-soft p-6 shadow-sheet">
      <header className="mb-5">
        <h2 className="text-[34px] font-bold text-ink tracking-tight leading-[1.05]">
          Твои результаты
        </h2>
        <p className="text-[19px] text-ink-faint mt-1.5 font-medium">
          первичной диагностики
        </p>
        <span className="inline-flex items-center mt-3.5 px-3 py-1 rounded-full bg-primary-soft text-primary text-[13px] font-semibold">
          3 ключевых вывода
        </span>
      </header>

      <InsightBlock title="Твой инсайт" icon={<LightbulbIcon />}>
        Твоё настроение слишком зависит от него. Ты хочешь вернуть себе
        устойчивость, чтобы отношения не качали тебя каждый день.
      </InsightBlock>

      <InfoSection title="Твой паттерн" accent="primary" icon={<WaveIcon />}>
        Ты отдаёшь ему право задавать тон твоему дню — и из-за этого часто
        подстраиваешься, вместо того чтобы опираться на себя.
      </InfoSection>

      <InfoSection
        title="Что ты получишь после сессий"
        accent="default"
        icon={<SparkleIcon />}
      >
        Ты начнёшь держать свой курс даже рядом с ним и выбирать то, что подходит
        тебе, без попыток заслужить спокойствие.
      </InfoSection>
    </section>
  );
}

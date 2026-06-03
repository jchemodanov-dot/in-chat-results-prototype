// Adaptive content system for the post-session reveal flow.
//
// ONE universal cinematic flow (scan → reveal → insight → journey →
// transformation → plan). Only the words and the accent hue change per session
// theme — the structure and motion stay constant.
//
// Tone rules baked into the copy: gentle, warm, confident, never clinical.
// We say "похоже / мы заметили / разберём", never "диагноз / расстройство".

export interface ThemeContent {
  /** stable id — also the illustration filename and re-animation key */
  id: string;
  /** short label for the demo theme switcher */
  label: string;
  /** the user's own words that opened the session */
  userMessage: string;
  /** themed middle line shown while "scanning" the session */
  scanLine: string;
  /** small emotional state-shift badge above the headline */
  badge: string;
  /** the hero line — the "we found the thread" hook, personalized */
  headline: string;
  /** 1–2 warm sentences reflecting state + the pattern behind it */
  summary: string;
  /** exactly 3 "what we'll explore next" steps — the visible journey */
  steps: [string, string, string];
  /** the desired direction of movement, shown as the journey's endpoint */
  outcome: string;
  /** transformation poles: from the painful state → to the outcome */
  from: string;
  to: string;
  /** reframed plan title — value is already prepared, not hidden */
  lockedTitle: string;
  /** concrete value items that wait inside the plan */
  lockedItems: string[];
  /** one line naming exactly what opens next */
  lockedSubline: string;
  /** primary CTA, tuned to the emotional state */
  cta: string;
  /** muted emotional accent, kept inside the lavender product family */
  accent: string;
}

export const THEMES: ThemeContent[] = [
  {
    id: "relationships",
    label: "Отношения",
    userMessage:
      "Меня постоянно потряхивает от ревности. Кажется, что я ему не нужна, и я не могу это контролировать.",
    scanLine: "Вижу, как много ты вкладываешь в эти отношения",
    badge: "Появилась первая ясность",
    headline: "Мы нашли важную нить",
    summary:
      "Похоже, рядом с ним твоё спокойствие держится на тонкой нити — и ты часто отдаёшь ему право задавать тон всему дню.",
    steps: [
      "Откуда берётся страх стать ненужной и всё потерять",
      "Почему ты подстраиваешься, чтобы заслужить спокойствие",
      "Как возвращать опору на себя, даже когда он рядом",
    ],
    outcome: "больше опоры на себя",
    from: "Тревога рядом с ним",
    to: "Опора на себя",
    lockedTitle: "Твой персональный разбор уже собран",
    lockedItems: [
      "Что именно запускает ревность у тебя",
      "Сценарий, который повторяется в твоих отношениях",
      "Первые фразы и шаги на ближайшую неделю",
      "Что делать, когда снова накрывает",
    ],
    lockedSubline: "Дальше — причины, паттерн и первые шаги.",
    cta: "Открыть мой план",
    accent: "#A86BCB",
  },
  {
    id: "anxiety",
    label: "Тревога",
    userMessage:
      "Внутри постоянное напряжение. Будто всё время чего-то жду и не могу выдохнуть.",
    scanLine: "Вижу, как трудно тебе выдохнуть",
    badge: "Стало чуть понятнее",
    headline: "За тревогой есть понятная нить",
    summary:
      "Похоже, ты подолгу живёшь в режиме ожидания угрозы — и тело почти не получает сигнала, что прямо сейчас можно выдохнуть.",
    steps: [
      "Что держит тебя в постоянном напряжении",
      "Как тревога заставляет всё контролировать заранее",
      "Как мягко возвращать себе ощущение безопасности",
    ],
    outcome: "больше спокойствия",
    from: "Постоянное напряжение",
    to: "Спокойствие и опора",
    lockedTitle: "Твой персональный разбор уже собран",
    lockedItems: [
      "Что чаще всего запускает твою тревогу",
      "Мысли-крючки, которые её разгоняют",
      "Способ выдохнуть за пару минут",
      "Первые шаги на ближайшую неделю",
    ],
    lockedSubline: "Дальше — причины, паттерн и первые шаги.",
    cta: "Открыть мой план",
    accent: "#5784D8",
  },
  {
    id: "burnout",
    label: "Выгорание",
    userMessage:
      "Я как будто на нуле. Сил нет даже на простое, ничего не радует, и я виню себя за это.",
    scanLine: "Вижу, как давно ты держишься на себе",
    badge: "Видно, где уходят силы",
    headline: "Мы нашли, где утекают силы",
    summary:
      "Похоже, ты долго держалась на себе и почти не пополняла ресурс — и сейчас усталость говорит не о слабости, а о пределе.",
    steps: [
      "Куда на самом деле уходит твоя энергия",
      "Почему отдых сейчас не восстанавливает",
      "С чего начать возвращать силы без вины",
    ],
    outcome: "вернуть силы",
    from: "Истощение и вина",
    to: "Силы возвращаются",
    lockedTitle: "Твой персональный разбор уже собран",
    lockedItems: [
      "Что истощает тебя сильнее всего",
      "Привычка, которая держит тебя на пределе",
      "Мягкий план восстановления",
      "Первый шаг уже на завтра",
    ],
    lockedSubline: "Дальше — причины, паттерн и первые шаги.",
    cta: "Вернуть силы",
    accent: "#CC8A45",
  },
  {
    id: "self-esteem",
    label: "Самооценка",
    userMessage:
      "Мне кажется, я недостаточно хороша. Постоянно сравниваю себя с другими и ругаю за любую мелочь.",
    scanLine: "Вижу, как строго ты к себе",
    badge: "Появилась первая ясность",
    headline: "Откуда эта строгость к себе",
    summary:
      "Похоже, внутри есть очень требовательный голос, который замечает только промахи — и из-за него твоя ценность всё время под вопросом.",
    steps: [
      "Откуда взялся этот внутренний критик",
      "Почему чужая оценка решает, как ты себя чувствуешь",
      "Как опираться на себя, а не на сравнение",
    ],
    outcome: "больше уверенности",
    from: "Строгость к себе",
    to: "Спокойная уверенность",
    lockedTitle: "Твой персональный разбор уже собран",
    lockedItems: [
      "Что включает твою самокритику",
      "Сценарий, в котором ты обесцениваешь себя",
      "Как говорить с собой иначе",
      "Первые шаги на ближайшую неделю",
    ],
    lockedSubline: "Дальше — причины, паттерн и первые шаги.",
    cta: "Открыть мой план",
    accent: "#7A6BE3",
  },
  {
    id: "loneliness",
    label: "Одиночество",
    userMessage:
      "Даже среди людей я чувствую себя одинокой. Будто меня по-настоящему никто не понимает.",
    scanLine: "Вижу, как тебе не хватает близости",
    badge: "Стало чуть теплее",
    headline: "За одиночеством есть нить",
    summary:
      "Похоже, ты часто остаёшься наедине с собой даже рядом с людьми — и тебе не хватает ощущения, что тебя по-настоящему видят.",
    steps: [
      "Что мешает чувствовать близость с другими",
      "Как ты привычно закрываешься, чтобы не ранили",
      "Как создавать связь, в которой тебя видят",
    ],
    outcome: "больше близости",
    from: "Одиночество внутри",
    to: "Тёплая близость",
    lockedTitle: "Твой персональный разбор уже собран",
    lockedItems: [
      "Что отдаляет тебя от людей",
      "Сценарий, который повторяется в общении",
      "С чего начать сближение без страха",
      "Первый шаг уже на этой неделе",
    ],
    lockedSubline: "Дальше — причины, паттерн и первые шаги.",
    cta: "Открыть мой план",
    accent: "#3FA396",
  },
  {
    id: "boundaries",
    label: "Границы",
    userMessage:
      "Мне трудно отказывать. Соглашаюсь на всё, а потом виню себя и чувствую, что обо мне вытирают ноги.",
    scanLine: "Вижу, как часто ты уступаешь себе во вред",
    badge: "Появилась первая ясность",
    headline: "Где теряются твои границы",
    summary:
      "Похоже, тебе сложно сказать «нет» без чувства вины — и ты часто выбираешь чужой комфорт вместо своего.",
    steps: [
      "Почему отказ вызывает столько вины",
      "Где ты привычно отдаёшь свои границы",
      "Как говорить «нет» спокойно и без вины",
    ],
    outcome: "крепче границы",
    from: "Вина за каждое «нет»",
    to: "Крепкие границы",
    lockedTitle: "Твой персональный разбор уже собран",
    lockedItems: [
      "Что мешает тебе отстаивать своё",
      "Сценарий, в котором ты уступаешь во вред себе",
      "Фразы, чтобы отказывать мягко",
      "Первые шаги на ближайшую неделю",
    ],
    lockedSubline: "Дальше — причины, паттерн и первые шаги.",
    cta: "Открыть мой план",
    accent: "#5C63CC",
  },
];

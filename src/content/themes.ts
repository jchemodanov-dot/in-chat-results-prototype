// Adaptive content + data system for the post-session result report.
//
// ONE universal flow (analyzing → emotional profile → balance score →
// trajectory → plan). Only the words, numbers and accent hue change per theme.
//
// The numbers are a reflective snapshot of what the AI "heard" in the session —
// framed softly ("похоже / я заметила"), never as a clinical diagnosis.
//
// Tone rules: gentle, warm, confident, never clinical. We say
// "похоже / мы заметили / разберём", never "диагноз / расстройство".

export interface ProfileDim {
  /** short label that fits around a radar axis */
  label: string;
  /** 0–100 intensity */
  value: number;
}

export interface ThemeContent {
  id: string;
  label: string;
  userMessage: string;
  scanLine: string;
  badge: string;
  headline: string;
  summary: string;
  steps: [string, string, string];
  outcome: string;
  from: string;
  to: string;
  lockedTitle: string;
  lockedItems: string[];
  lockedSubline: string;
  cta: string;
  accent: string;

  // --- data for the charts -------------------------------------------------
  /** 5 emotional-profile dimensions (radar). High = more present right now. */
  profile: [ProfileDim, ProfileDim, ProfileDim, ProfileDim, ProfileDim];
  /** current emotional-balance score (0–100, gauge) */
  balanceNow: number;
  /** where the plan can take it (0–100) */
  balanceTarget: number;
  /** what tends to set the state off (horizontal bars) */
  triggers: [
    { label: string; value: number },
    { label: string; value: number },
    { label: string; value: number },
  ];
  /** a 3-step self-reinforcing loop (cycle diagram) */
  loop: [string, string, string];
  /** emotion composition (donut) — values roughly sum to 100 */
  composition: { label: string; value: number }[];
  /** strengths / resources the AI noticed (positive counterbalance) */
  strengths: [string, string, string];
  /** % of people who describe something similar (normalization) */
  normPct: number;
  /** one short anonymized line of encouragement */
  story: string;
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
    profile: [
      { label: "Тревога", value: 74 },
      { label: "Отвержение", value: 68 },
      { label: "Контроль", value: 60 },
      { label: "Самокритика", value: 52 },
      { label: "Опора", value: 30 },
    ],
    balanceNow: 34,
    balanceTarget: 78,
    triggers: [
      { label: "Его холодность", value: 80 },
      { label: "Долгое молчание", value: 64 },
      { label: "Сравнение с другими", value: 50 },
    ],
    loop: ["Появляется тревога", "Начинаешь контролировать", "Напряжение растёт"],
    composition: [
      { label: "Тревога", value: 38 },
      { label: "Страх потерять", value: 27 },
      { label: "Обида", value: 20 },
      { label: "Надежда", value: 15 },
    ],
    strengths: [
      "Ты честно смотришь на свои чувства",
      "Ты готова разбираться, а не убегать",
      "Ты способна на глубокую привязанность",
    ],
    normPct: 71,
    story: "«Думала, со мной что-то не так. Оказалось — это понятный паттерн». — Аня",
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
    profile: [
      { label: "Тревога", value: 78 },
      { label: "Напряжение", value: 70 },
      { label: "Контроль", value: 64 },
      { label: "Руминация", value: 58 },
      { label: "Опора", value: 28 },
    ],
    balanceNow: 30,
    balanceTarget: 80,
    triggers: [
      { label: "Неопределённость", value: 78 },
      { label: "Спешка и дедлайны", value: 62 },
      { label: "Конфликты", value: 50 },
    ],
    loop: ["Ловишь сигнал угрозы", "Прокручиваешь сценарии", "Тело не расслабляется"],
    composition: [
      { label: "Тревога", value: 42 },
      { label: "Напряжение", value: 28 },
      { label: "Беспомощность", value: 18 },
      { label: "Усталость", value: 12 },
    ],
    strengths: [
      "Ты внимательна к себе и сигналам тела",
      "Ты ищешь опору, а не сдаёшься",
      "Ты уже сделала первый шаг сегодня",
    ],
    normPct: 74,
    story: "«Впервые поняла, что не обязана всё контролировать». — Лена",
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
    profile: [
      { label: "Истощение", value: 80 },
      { label: "Переработка", value: 72 },
      { label: "Самокритика", value: 56 },
      { label: "Отдых", value: 26 },
      { label: "Ресурс", value: 22 },
    ],
    balanceNow: 26,
    balanceTarget: 76,
    triggers: [
      { label: "Бесконечные задачи", value: 82 },
      { label: "Чужие ожидания", value: 66 },
      { label: "Нет паузы на себя", value: 58 },
    ],
    loop: ["Берёшь ещё задачи", "Игноришь усталость", "Сил всё меньше"],
    composition: [
      { label: "Усталость", value: 40 },
      { label: "Опустошённость", value: 26 },
      { label: "Вина", value: 20 },
      { label: "Раздражение", value: 14 },
    ],
    strengths: [
      "Ты долго держалась ради важного",
      "Ты честно признаёшь, что устала",
      "У тебя есть, ради чего восстановиться",
    ],
    normPct: 69,
    story: "«Разрешила себе паузу — и силы начали возвращаться». — Марина",
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
    profile: [
      { label: "Критик", value: 76 },
      { label: "Оценка других", value: 70 },
      { label: "Сравнение", value: 64 },
      { label: "Самоценность", value: 28 },
      { label: "Поддержка", value: 24 },
    ],
    balanceNow: 28,
    balanceTarget: 78,
    triggers: [
      { label: "Чужая оценка", value: 76 },
      { label: "Ошибки и промахи", value: 64 },
      { label: "Сравнение в соцсетях", value: 56 },
    ],
    loop: ["Сравниваешь себя", "Замечаешь только минусы", "Ценность падает"],
    composition: [
      { label: "Самокритика", value: 38 },
      { label: "Стыд", value: 26 },
      { label: "Тревога", value: 22 },
      { label: "Надежда", value: 14 },
    ],
    strengths: [
      "Ты требовательна, потому что хочешь лучшего",
      "Ты способна честно смотреть на себя",
      "Ты ищешь опору внутри, а не только снаружи",
    ],
    normPct: 72,
    story: "«Перестала сравнивать себя с лентой в телефоне». — Катя",
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
    profile: [
      { label: "Одиночество", value: 75 },
      { label: "Закрытость", value: 66 },
      { label: "Отвержение", value: 60 },
      { label: "Близость", value: 26 },
      { label: "Доверие", value: 30 },
    ],
    balanceNow: 30,
    balanceTarget: 76,
    triggers: [
      { label: "Вечера в одиночестве", value: 74 },
      { label: "Шумные компании", value: 58 },
      { label: "Молчание близких", value: 54 },
    ],
    loop: ["Ждёшь, что поймут", "Закрываешься первой", "Связь не случается"],
    composition: [
      { label: "Грусть", value: 36 },
      { label: "Пустота", value: 28 },
      { label: "Тревога", value: 20 },
      { label: "Тепло", value: 16 },
    ],
    strengths: [
      "Ты ценишь настоящую близость",
      "Ты готова открываться, несмотря на страх",
      "Ты сделала шаг — пришла поговорить",
    ],
    normPct: 67,
    story: "«Оказалось, нас таких много — и это уже теплее». — Соня",
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
    profile: [
      { label: "Вина", value: 72 },
      { label: "«Нет»", value: 76 },
      { label: "Угождение", value: 68 },
      { label: "Границы", value: 24 },
      { label: "Опора", value: 30 },
    ],
    balanceNow: 31,
    balanceTarget: 79,
    triggers: [
      { label: "Трудные просьбы", value: 78 },
      { label: "Страх обидеть", value: 64 },
      { label: "Чужое недовольство", value: 56 },
    ],
    loop: ["Соглашаешься через силу", "Копится обида", "Винишь себя"],
    composition: [
      { label: "Вина", value: 36 },
      { label: "Обида", value: 28 },
      { label: "Тревога", value: 20 },
      { label: "Решимость", value: 16 },
    ],
    strengths: [
      "Ты чуткая к чувствам других",
      "Ты начала замечать, где теряешь себя",
      "Ты готова учиться говорить «нет»",
    ],
    normPct: 70,
    story: "«Научилась говорить „нет“ без чувства вины». — Даша",
  },
];

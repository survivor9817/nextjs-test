// data/questionsData.ts
import { getQuizById } from "./quizSessionsData";

export type DbReactionId =
  | "isCorrect"
  | "isIncorrect"
  | "isNull"
  | "isLike"
  | "isStar"
  | "isReport";

export type ReactionType = "answer" | "feedback";

export type DbReaction = {
  quizId: string;
  userId: string;
  questionId: string;
  reactionId: DbReactionId;
  reactionType: ReactionType;
  createdAt: string;
};

export type UiReaction = {
  isCorrect: boolean;
  isIncorrect: boolean;
  isLike: boolean;
  isStar: boolean;
  isReport: boolean;
};

export type QuizResults = {
  correctsCount: number;
  incorrectsCount: number;
  nullsCount: number;
  questionsCount: number;
};

export type QuestionType = {
  id: string;
  bookId: string;
  fehrestSectionId: string;
  levelId: string;
  source: string;
  hasImg: boolean;
  questionContent: string;
  answerContent: string;
  author: string;
  date: string;
  score: number;
  tags: string[];
  reactions?: UiReaction;
  refPages?: number[];
  suggestedDuratuion?: number;
};

const STORAGE_KEY = "mock_quiz_reactions";

const INITIAL_REACTIONS: DbReaction[] = [
  {
    quizId: "1",
    userId: "123",
    questionId: "1",
    reactionId: "isLike",
    reactionType: "feedback",
    createdAt: new Date().toISOString(),
  },
];

// دریافت واکنش‌ها با پشتیبانی از رفرش و localStorage
const getStoredReactions = (): DbReaction[] => {
  if (typeof window === "undefined") return INITIAL_REACTIONS;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_REACTIONS));
    return INITIAL_REACTIONS;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return INITIAL_REACTIONS;
  }
};

const saveStoredReactions = (reactions: DbReaction[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reactions));
  }
};

export const getReactions = (
  userId?: string,
  questionId?: string,
  quizId?: string,
): DbReaction[] => {
  const all = getStoredReactions();
  return all.filter((r) => {
    const matchUser = userId ? r.userId === userId : true;
    const matchQuestion = questionId ? r.questionId === questionId : true;
    const matchQuiz = quizId ? r.quizId === quizId : true;
    return matchUser && matchQuestion && matchQuiz;
  });
};

export const getReactionsByQuizId = (quizId: string): DbReaction[] => {
  return getStoredReactions().filter((r) => r.quizId === quizId);
};

export const createUiReactionsObject = (dbReactions: DbReaction[]): UiReaction => {
  const result: UiReaction = {
    isCorrect: false,
    isIncorrect: false,
    isLike: false,
    isStar: false,
    isReport: false,
  };

  if (!dbReactions?.length) return result;

  const present = new Set<DbReactionId>(dbReactions.map((r) => r.reactionId));

  result.isCorrect = present.has("isCorrect");
  result.isIncorrect = present.has("isIncorrect");
  result.isLike = present.has("isLike");
  result.isStar = present.has("isStar");
  result.isReport = present.has("isReport");

  if (result.isCorrect) result.isIncorrect = false;

  return result;
};

export const getUiReactionObjectForQuiz = (
  questionId: string,
  quizId: string,
  userId = "123",
): UiReaction => {
  const reactions = getReactions(userId, questionId, quizId);
  return createUiReactionsObject(reactions);
};

export const saveReactionToDB = (newReaction: DbReaction) => {
  let all = getStoredReactions();
  const { quizId, userId, questionId } = newReaction;

  const matchTarget = (r: DbReaction) =>
    r.quizId === quizId && r.userId === userId && r.questionId === questionId;

  if (newReaction.reactionType === "answer") {
    const existing = all.find((r) => matchTarget(r) && r.reactionType === "answer");

    if (!existing) {
      all.push(newReaction);
    } else if (newReaction.reactionId === existing.reactionId) {
      all = all.filter((r) => r !== existing);
      all.push({
        quizId,
        userId,
        questionId,
        reactionId: "isNull",
        reactionType: "answer",
        createdAt: new Date().toISOString(),
      });
    } else {
      all = all.filter((r) => r !== existing);
      all.push(newReaction);
    }
  } else {
    const existing = all.find((r) => matchTarget(r) && r.reactionId === newReaction.reactionId);

    if (existing) {
      all = all.filter((r) => r !== existing);
    } else {
      all.push(newReaction);
    }
  }

  saveStoredReactions(all);
};

export const getResultsByQuizId = (quizId: string): QuizResults => {
  const quiz = getQuizById(quizId);
  const questionsCount = quiz?.questionsCount || quiz?.questionIds?.length || 10;
  const answers = getReactionsByQuizId(quizId).filter((r) => r.reactionType === "answer");

  const correctsCount = answers.filter((r) => r.reactionId === "isCorrect").length;
  const incorrectsCount = answers.filter((r) => r.reactionId === "isIncorrect").length;
  const nullsCount = Math.max(0, questionsCount - (correctsCount + incorrectsCount));

  return { correctsCount, incorrectsCount, nullsCount, questionsCount };
};

export const requestedQuestionsIDs = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

export const getQuestionIds = () => requestedQuestionsIDs;

export const questionsData: QuestionType[] = [
  {
    id: "1",
    bookId: "زیست‌شناسی ۱",
    fehrestSectionId: "۶. گوارش و جذب مواد",
    levelId: "2",
    source: "کنکور سراسری",
    hasImg: false,
    questionContent: `
    <div class="question">
      <p>در انسان، به منظور عبور مولکول‌های گلوکز از غشای یاخته‌ی پوششی پرز روده، به‌طور حتم لازم است تا ..........</p>
    </div>
    <ul class="options">
      <li>۱) مولکول‌های ویژة پروتئینی، در امر جابهجا نمودن گلوکز دخالت نمایند.</li>
      <li>۲) یون‌های پتاسیم همواره بدون صرف انرژی به درون یاخته منتقل گردند.</li>
      <li>۳) گلوکز با کمک کیسه‌های غشایی جابهجا شود.</li>
      <li>۴) گلوکز همراه با سدیم از یاخته خارج گردد.</li>
    </ul>
    `,
    answerContent: `
    <h2>پاسخ: گزینه ۱</h2>
    <p>
      گلوکز از طریق انتقال فعال ثانویه و با کمک پروتئین‌های ناقل مخصوص (SGLT1) وارد یاخته‌های پوششی روده می‌شود. این انتقال وابسته به شیب غلظت سدیم است و نیاز به پروتئین‌های ویژه دارد.
      <span class="ref-page" data-ref-page="82" data-ref-id="ref1">۸۲</span>
    </p>
    <h2>بررسی سایر گزینه‌ها:</h2>
    <div class="option">
      <strong>گزینه ۲:</strong> نادرست. انتقال پتاسیم ارتباط مستقیمی با انتقال گلوکز ندارد.
    </div>
    <div class="option">
      <strong>گزینه ۳:</strong> نادرست. گلوکز از طریق ناقل‌های غشایی منتقل می‌شود، نه کیسه‌های غشایی.
    </div>
    <div class="option">
      <strong>گزینه ۴:</strong> نادرست. گلوکز به داخل یاخته وارد می‌شود، نه خارج.
    </div>
    `,
    author: "رضا قزلسفلو",
    date: "اردیبهشت ۱۴۰۱",
    score: 1,
    tags: ["چهار گزینه ای", "جای خالی", "مفهومی", "آسان"],
  },
  {
    id: "2",
    bookId: "زیست‌شناسی ۱",
    fehrestSectionId: "۶. گوارش و جذب مواد",
    levelId: "2",
    source: "کنکور سراسری",
    hasImg: false,
    questionContent: `
    <div class="question">
      <p>کدام گزینه، عبارت زیر را به طور مناسب کامل میکند؟</p>
      <p>«در .................. ، ساختاری که به ذخیرۀ غذا کمک می‌کند و به جانور امکان می‌دهد تا با دفعات کمتر تغذیه، انرژی مورد نیاز خود را تأمین کند، .....................»</p>
    </div>
    <ul class="options">
      <li>۱) ملخ – در بالای غدد ترشح کنندة آمیلاز قرار دارد.</li>
      <li>۲) گوسفند – تا حدود زیادی به آبگیری مواد غذایی می‌پردازد.</li>
      <li>۳) کرم خاکی – دندانه‌هایی برای خرد کردن بیشتر مواد غذایی دارد.</li>
      <li>۴) پرندة دانه‌خوار – مواد غذایی را ابتدا به بخش عقبی معده وارد می‌نماید.</li>
    </ul>
    `,
    answerContent: `
    <h2>پاسخ: گزینه ۴</h2>
    <p>
      در پرندگان دانه‌خوار، چینه‌دان به ذخیره غذا کمک می‌کند. مواد غذایی از چینه‌دان ابتدا به پیش معده (قسمت عقبی معده) وارد می‌شود.
      <span class="ref-page" data-ref-page="46" data-ref-id="ref1">۴۶</span>
    </p>
    <h2>بررسی سایر گزینه‌ها:</h2>
    <div class="option">
      <strong>گزینه ۱:</strong> نادرست. چینه‌دان ملخ بالای غدد آمیلاز قرار ندارد.
    </div>
    <div class="option">
      <strong>گزینه ۲:</strong> نادرست. سیرابی گوسفند عمدتاً محل تخمیر است نه آبگیری.
    </div>
    <div class="option">
      <strong>گزینه ۳:</strong> نادرست. چینه‌دان کرم خاکی فاقد دندانه است.
    </div>
    `,
    author: "رضا قزلسفلو",
    date: "اردیبهشت ۱۳۹۸",
    score: 2,
    tags: ["چهار گزینه ای", "جای خالی", "صورت مبهم", "مقایسه ای", "مفهومی", "متوسط"],
  },
  {
    id: "3",
    bookId: "زیست‌شناسی ۱",
    fehrestSectionId: "۶. گوارش و جذب مواد",
    levelId: "3",
    source: "کنکور سراسری",
    hasImg: false,
    questionContent: `
    <div class="question">
      <p>کدام گزینه، عبارت زیر را به‌طور مناسب کامل می‌کند؟</p>
      <p>«در ........... ساختاری که به ذخیرۀ غذا کمک میکند و به جانور امکان میدهد تا با دفعات کمتر تغذیه، انرژی مورد نیاز خود را تأمین کند، ............»</p>
    </div>
    <ul class="options">
      <li>۱) گوسفند - توانایی تولید آنزیم گوارشدهندة سلولز را دارد.</li>
      <li>۲) کرم خاکی - فرایند آسیاب کردن غذا را به انجام می‌رساند.</li>
      <li>۳) ملخ - ابتدا مواد غذایی را به بخش حجیم انتهای مری وارد می‌نماید.</li>
      <li>۴) پرندة دانه‌خوار - ابتدا مواد غذایی را به بخشی در جلوی سنگدان منتقل می‌کند.</li>
    </ul>
    `,
    answerContent: `
    <h2>پاسخ: گزینه ۴</h2>
    <p>
      در پرنده دانه‌خوار، چینه‌دان (ساختار ذخیره غذا) مواد غذایی را ابتدا به پیش‌معده (بخشی در جلوی سنگدان) منتقل می‌کند.
      <span class="ref-page" data-ref-page="47" data-ref-id="ref1">۴۷</span>
    </p>
    <h2>بررسی سایر گزینه‌ها:</h2>
    <div class="option">
      <strong>گزینه ۱:</strong> نادرست. گوسفند خودش آنزیم سلولاز تولید نمی‌کند.
    </div>
    <div class="option">
      <strong>گزینه ۲:</strong> نادرست. چینه‌دان کرم خاکی غذا را آسیاب نمی‌کند.
    </div>
    <div class="option">
      <strong>گزینه ۳:</strong> نادرست. در ملخ، چینه‌دان خودش بخش حجیم انتهای مری است.
    </div>
    `,
    author: "محمد حسنی",
    date: "اسفند ۱۴۰۰",
    score: 2,
    tags: ["چهار گزینه ای", "جای خالی", "مقایسه ای", "سخت"],
  },
  {
    id: "4",
    bookId: "زیست‌شناسی ۱",
    fehrestSectionId: "۳. ساختار گیاهان",
    levelId: "3",
    source: "کنکور سراسری",
    hasImg: false,
    questionContent: `
    <div class="question">
      <p>کدام مورد، برای تکمیل عبارت زیر مناسب است؟</p>
      <p>«در نوعی گیاه، ............... قرار دارند، در این گیاه به طور حتم، ..............»</p>
    </div>
    <ul class="options">
      <li>۱) بر روی ریشة قطور، ریشه‌های فرعی فراوان – پوست ریشه کاملا مشخص است.</li>
      <li>۲) یاخته‌هایی حاوی چوب پنبه در مجاورت لایة ریشه‌زای ریشه – پوست ریشه کاملا نازک است.</li>
      <li>۳) دسته آوندهای چوبی و آبکش ساقه، بر روی دایره‌های هم‌مرکز – آوندهای چوبی کم‌قطر در مرکز ریشه قرار دارند.</li>
      <li>۴) دسته آوندهای چوبی و آبکش ساقه، بر روی یک دایره – فقط یاخته‌هایی با دیوارة نخستین نازک در مرکز ریشه قرار دارند.</li>
    </ul>
    `,
    answerContent: `
    <h2>پاسخ: گزینه ۴</h2>
    <p>
      گیاه مورد بحث گیاه دو لپه است که ساختار ساقه آن از نوع دسته های آوندی باز است. در این گیاهان دسته های آوندی چوب و آبکش روی یک دایره قرار دارند.
      <span class="ref-page" data-ref-page="68" data-ref-id="ref1">۶۸</span>
    </p>
    <h2>بررسی سایر گزینه‌ها:</h2>
    <div class="option">
      <strong>گزینه ۱:</strong> نادرست. وجود ریشه‌های فرعی فراوان لزوماً به معنای مشخص بودن پوست ریشه نیست.
    </div>
    <div class="option">
      <strong>گزینه ۲:</strong> نادرست. وجود چوب پنبه در مجاورت لایه ریشه‌زا با نازک بودن پوست ریشه در تضاد است.
    </div>
    <div class="option">
      <strong>گزینه ۳:</strong> نادرست. قرارگیری دسته های آوندی روی دایره‌های هم‌مرکز مربوط به ساختار ریشه است نه ساقه.
    </div>
    `,
    author: "سید حسین قاضوی",
    date: "خرداد ۱۴۰۲",
    score: 3,
    tags: ["چهار گزینه ای", "جای خالی", "مقایسه ای", "مفهومی", "سخت"],
  },
  {
    id: "5",
    bookId: "زیست‌شناسی ۲",
    fehrestSectionId: "۴. گردش مواد در بدن",
    levelId: "2",
    source: "کنکور سراسری",
    hasImg: false,
    questionContent: `
    <div class="question">
      <p>در یک فرد بالغ، آهن آزاد شده از هموگلوبین، در داخل اندامی از بدن که خون لولۀ گوارش ابتدا به آن وارد می‌شود، ذخیره می‌گردد. کدام عبارت، دربارۀ این اندام نادرست است؟</p>
    </div>
    <ul class="options">
      <li>۱) در تولید و دفع کلسترول نقش دارد.</li>
      <li>۲) بر سرعت تولید یاخته‌های قرمز خون تأثیرگذار است.</li>
      <li>۳) به کمک یاخته‌های خود، گویچه‌های قرمز را تولید می‌کند.</li>
      <li>۴) فاصلة یاخته‌های بافت پوششی مویرگ‌های آن بسیار زیاد است.</li>
    </ul>
    `,
    answerContent: `
    <h2>پاسخ: گزینه ۳</h2>
    <p>
      اندام مورد بحث کبد است. گزینه ۳ نادرست است زیرا گلبول‌های قرمز در مغز استخوان تولید می‌شوند، نه در کبد.
      <span class="ref-page" data-ref-page="116" data-ref-id="ref1">۱۱۶</span>
    </p>
    <h2>بررسی سایر گزینه‌ها:</h2>
    <div class="option">
      <strong>گزینه ۱:</strong> درست. کبد در تولید و دفع کلسترول نقش دارد.
    </div>
    <div class="option">
      <strong>گزینه ۲:</strong> درست. کبد در ترشح اریتروپویتین مؤثر است.
    </div>
    <div class="option">
      <strong>گزینه ۴:</strong> درست. مویرگ‌های سینوزوئیدی کبد دارای فاصله بین یاخته‌ای زیاد هستند.
    </div>
    `,
    author: "حمید رضایی",
    date: "دی ۱۴۰۱",
    score: 2,
    tags: ["چهار گزینه ای", "مفهومی", "متوسط"],
  },
  {
    id: "6",
    bookId: "زیست‌شناسی ۱",
    fehrestSectionId: "۶. گوارش و جذب مواد",
    levelId: "2",
    source: "کنکور سراسری",
    hasImg: false,
    questionContent: `
    <div class="question">
      <p>کدام مورد برای تکمیل عبارت زیر نامناسب است؟</p>
      <p>« در انسان، ............ ماهیچه‌های حلقوی (اسفنکترهای) لولۀ گوارش، فقط ...........»</p>
    </div>
    <ul class="options">
      <li>۱) بعضی از – یاخته‌های تک هستهای دارند.</li>
      <li>۲) همة – هنگام عبور مواد از انقباض رها می‌شوند.</li>
      <li>۳) همة – تحت تأثیر بخش خودمختار دستگاه عصبی قرار دارند.</li>
      <li>۴) بعضی از – در شرایط خاصی، مواد غذایی را با سرعت به سمت دهان میرانند.</li>
    </ul>
    `,
    answerContent: `
    <h2>پاسخ: گزینه ۲</h2>
    <p>
      گزینه ۲ نامناسب است زیرا همه اسفنکترهای لوله گوارش هنگام عبور مواد رها نمی‌شوند. برای مثال، اسفنکتر تحتانی مری فقط هنگام عبور غذا باز می‌شود.
      <span class="ref-page" data-ref-page="89" data-ref-id="ref1">۸۹</span>
    </p>
    <h2>بررسی سایر گزینه‌ها:</h2>
    <div class="option">
      <strong>گزینه ۱:</strong> مناسب. بعضی اسفنکترها مثل اسفنکتر مقعد خارجی، عضلات مخطط دارند.
    </div>
    <div class="option">
      <strong>گزینه ۳:</strong> مناسب. همه اسفنکترها تحت تأثیر سیستم عصبی خودمختار هستند.
    </div>
    <div class="option">
      <strong>گزینه ۴:</strong> مناسب. بعضی اسفنکترها در استفراغ نقش دارند.
    </div>
    `,
    author: "سعید کریمی",
    date: "بهمن ۱۳۹۹",
    score: 1,
    tags: ["چهار گزینه ای", "جای خالی", "مفهومی", "آسان"],
  },
  {
    id: "7",
    bookId: "زیست‌شناسی ۱",
    fehrestSectionId: "۶. گوارش و جذب مواد",
    levelId: "3",
    source: "کنکور سراسری",
    hasImg: false,
    questionContent: `
    <div class="question">
      <p>کدام گزینه، عبارت زیر به‌طور مناسب کامل می‌کند؟</p>
      <p>«به‌طور معمول در انسان، .......... ماهیچه‌های حلقوی که بخش‌های مختلف لولۀ گوارش را از هم جدا میکنند، فقط .............»</p>
    </div>
    <ul class="options">
      <li>۱) همة - هنگام عبور مواد از انقباض خارج می‌شوند.</li>
      <li>۲) همة - تحت تأثیر بخش خودمختار دستگاه عصبی قرار دارند.</li>
      <li>۳) بعضی از - تارهای عضلانی تک‌هستهای و چند‌هستهای دارند.</li>
      <li>۴) بعضی از - به هنگام حرکات رو به عقب مواد غذایی باز می‌شوند.</li>
    </ul>
    `,
    answerContent: `
    <h2>پاسخ: گزینه ۳</h2>
    <p>
      بعضی از اسفنکترها مانند اسفنکتر مقعد خارجی دارای تارهای عضلانی مخطط (چند هسته‌ای) و بعضی مانند اسفنکتر تحتانی مری دارای تارهای صاف (تک هسته‌ای) هستند.
      <span class="ref-page" data-ref-page="91" data-ref-id="ref1">۹۱</span>
    </p>
    <h2>بررسی سایر گزینه‌ها:</h2>
    <div class="option">
      <strong>گزینه ۱:</strong> نادرست. همه اسفنکترها اینگونه نیستند.
    </div>
    <div class="option">
      <strong>گزینه ۲:</strong> نادرست. برخی تحت کنترل ارادی هستند.
    </div>
    <div class="option">
      <strong>گزینه ۴:</strong> نادرست. باز شدن اسفنکترها در استفراغ اتفاق می‌افتد.
    </div>
    `,
    author: "مهدی احمدی",
    date: "فروردین ۱۴۰۲",
    score: 2,
    tags: ["چهار گزینه ای", "جای خالی", "مفهومی", "متوسط"],
  },
  {
    id: "8",
    bookId: "زیست‌شناسی ۱",
    fehrestSectionId: "۶. گوارش و جذب مواد",
    levelId: "2",
    source: "کنکور سراسری",
    hasImg: false,
    questionContent: `
    <div class="question">
      <p>کدام گزینه عبارت زیر را به طور مناسب کامل می‌کند؟</p>
      <p>«قبل از ورود کیموس به بخشی از لولۀ گوارش انسان که مراحل پایانی گوارش مواد غذایی در آن آغاز می‌شود، .............»</p>
    </div>
    <ul class="options">
      <li>۱) کربوهیدرات‌ها به مونوساکاریدها تبدیل می‌گردند.</li>
      <li>۲) تحت تأثیر پروتئازها، پروتئین‌ها به آمینواسیدها تجزیه می‌گردند.</li>
      <li>۳) فراوان‌ترین لیپیدهای رژیم غذایی، به طور کامل گوارش می‌یابند.</li>
      <li>۴) یاخته‌های پوششی سطحی و بعضی یاخته‌های غدد، مادة مخاطی زیادی ترشح می‌کنند.</li>
    </ul>
    `,
    answerContent: `
    <h2>پاسخ: گزینه ۴</h2>
    <p>
      بخش مورد بحث روده باریک است. قبل از ورود کیموس به روده باریک، سلول‌های پوششی معده و غدد آن مخاط ترشح می‌کنند تا از دیواره معده محافظت شود.
      <span class="ref-page" data-ref-page="75" data-ref-id="ref1">۷۵</span>
    </p>
    <h2>بررسی سایر گزینه‌ها:</h2>
    <div class="option">
      <strong>گزینه ۱:</strong> نادرست. تبدیل کامل در روده انجام می‌شود.
    </div>
    <div class="option">
      <strong>گزینه ۲:</strong> نادرست. پروتئین‌ها به پپتیدهای کوچک تجزیه می‌شوند.
    </div>
    <div class="option">
      <strong>گزینه ۳:</strong> نادرست. لیپیدها به طور کامل در روده گوارش می‌یابند.
    </div>
    `,
    author: "حسین میرزایی",
    date: "آبان ۱۴۰۱",
    score: 1,
    tags: ["چهار گزینه ای", "جای خالی", "مفهومی", "آسان"],
  },
  {
    id: "9",
    bookId: "زیست‌شناسی ۱",
    fehrestSectionId: "۶. گوارش و جذب مواد",
    levelId: "3",
    source: "کنکور سراسری",
    hasImg: false,
    questionContent: `
    <div class="question">
      <p>کدام گزینه، برای تکمیل عبارت زیر مناسب است؟</p>
      <p>«قبل از ورود کیموس به بخشی از لولۀ گوارش انسان که مراحل پایانی گوارش مواد غذایی در آن آغاز می‌شود، .............»</p>
    </div>
    <ul class="options">
      <li>۱) گوارش پروتئین‌ها آغاز شده و تا مرحلة تولید کوچک‌ترین واحدهای سازندة آنها پیش رفته است.</li>
      <li>۲) یاخته‌های پوششی سطحی، با فرو رفتن در بافت زیرین خود، حفره‌هایی را به‌وجود آورده‌اند.</li>
      <li>۳) مولکول‌های دی و پلی‌ساکاریدی، با تبدیل به مولکول‌های مونوساکاریدی جذب گردیده‌اند.</li>
      <li>۴) با حضور ترکیبی فاقد آنزیم، چربی‌ها گوارش یافته و به محیط داخلی وارد شده‌اند.</li>
    </ul>
    `,
    answerContent: `
    <h2>پاسخ: گزینه ۲</h2>
    <p>
      قبل از ورود به روده باریک، در معده، سلول‌های پوششی سطحی برای افزایش سطح ترشح، به داخل بافت زیرین فرو رفته و حفره‌های معدی را ایجاد می‌کنند.
      <span class="ref-page" data-ref-page="78" data-ref-id="ref1">۷۸</span>
    </p>
    <h2>بررسی سایر گزینه‌ها:</h2>
    <div class="option">
      <strong>گزینه ۱:</strong> نادرست. پروتئین‌ها به آمینواسیدها تبدیل نشده‌اند.
    </div>
    <div class="option">
      <strong>گزینه ۳:</strong> نادرست. جذب مونوساکاریدها در روده است.
    </div>
    <div class="option">
      <strong>گزینه ۴:</strong> نادرست. گوارش چربی‌ها نیاز به آنزیم دارد.
    </div>
    `,
    author: "امیرحسین نجفی",
    date: "مهر ۱۴۰۲",
    score: 2,
    tags: ["چهار گزینه ای", "جای خالی", "مفهومی", "متوسط"],
  },
  {
    id: "10",
    bookId: "زیست‌شناسی ۱",
    fehrestSectionId: "۶. گوارش و جذب مواد",
    levelId: "4",
    source: "کنکور سراسری",
    hasImg: false,
    questionContent: `
    <div class="question">
      <p>در ارتباط با کمبود ترشح کلریدریک‌اسید بدن انسان، کدام مورد غیرممکن است؟</p>
    </div>
    <ul class="options">
      <li>۱) میزان خونبَهر (هماتوکریت) فرد تغییر یابد.</li>
      <li>۲) هضم پروتئین‌های غذایی فرد دستخوش اختلال شود.</li>
      <li>۳) اختلالی در عملکرد شبکه‌های یاخته‌های عصبی رخ داده باشد.</li>
      <li>۴) همة ترشحات برون‌ریز در طول لولة گوارش فرد کاهش یابد.</li>
    </ul>
    `,
    answerContent: `
    <h2>پاسخ: گزینه ۴</h2>
    <p>
      کمبود HCl فقط روی ترشحات معده تأثیر می‌گذارد، نه روی تمام ترشحات برون‌ریز در طول لوله گوارش. سایر غدد مانند غدد بزاقی، لوزالمعده و روده مستقل عمل می‌کنند.
      <span class="ref-page" data-ref-page="85" data-ref-id="ref1">۸۵</span>
    </p>
    <h2>بررسی سایر گزینه‌ها:</h2>
    <div class="option">
      <strong>گزینه ۱:</strong> ممکن است. کمبود HCl می‌تواند باعث کم‌خونی و تغییر هماتوکریت شود.
    </div>
    <div class="option">
      <strong>گزینه ۲:</strong> ممکن است. HCl برای فعال کردن پپسینوژن لازم است.
    </div>
    <div class="option">
      <strong>گزینه ۳:</strong> ممکن است. HCl در جذب ویتامین B12 نقش دارد که برای سیستم عصبی ضروری است.
    </div>
    `,
    author: "محمد جوادی",
    date: "تیر ۱۴۰۲",
    score: 3,
    tags: ["چهار گزینه ای", "مفهومی", "تحلیلی", "سخت"],
  },
];

export const getQuestionById = (qId: string): QuestionType | null => {
  return questionsData.find((q) => q.id === qId) || null;
};

export const getQuestionFromDB = (questionId: string): QuestionType | null => {
  const q = getQuestionById(questionId);
  if (q) {
    q.reactions = createUiReactionsObject(getReactions("123", questionId));
  }
  return q;
};

export const getQuestionForQuiz = (questionId: string, quizId: string): QuestionType | null => {
  const q = getQuestionById(questionId);
  if (q) {
    q.reactions = getUiReactionObjectForQuiz(questionId, quizId, "123");
  }
  return q;
};

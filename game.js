const heroEyebrow = document.getElementById("heroEyebrow");
const gameTitle = document.getElementById("gameTitle");
const gameIntro = document.getElementById("gameIntro");
const heroTagOne = document.getElementById("heroTagOne");
const heroTagTwo = document.getElementById("heroTagTwo");
const heroTagThree = document.getElementById("heroTagThree");

const starCount = document.getElementById("starCount");
const streakCount = document.getElementById("streakCount");
const levelLabel = document.getElementById("levelLabel");
const questionCountLabel = document.getElementById("questionCountLabel");
const stageName = document.getElementById("stageName");
const stagePrompt = document.getElementById("stagePrompt");
const rewardChip = document.getElementById("rewardChip");
const characterChip = document.getElementById("characterChip");
const missionTitle = document.getElementById("missionTitle");
const missionText = document.getElementById("missionText");
const rewardShelf = document.getElementById("rewardShelf");
const mapEyebrow = document.getElementById("mapEyebrow");
const mapTitle = document.getElementById("mapTitle");
const mapText = document.getElementById("mapText");
const questionTag = document.getElementById("questionTag");
const questionPrompt = document.getElementById("questionPrompt");
const questionHelp = document.getElementById("questionHelp");
const pictureCard = document.getElementById("pictureCard");
const pictureArt = document.getElementById("pictureArt");
const pictureWord = document.getElementById("pictureWord");
const pictureHint = document.getElementById("pictureHint");
const firstGroupText = document.getElementById("firstGroupText");
const secondGroupText = document.getElementById("secondGroupText");
const answerDisplay = document.getElementById("answerDisplay");
const inputGrid = document.getElementById("inputGrid");
const feedbackCard = document.getElementById("feedbackCard");
const surpriseEmoji = document.getElementById("surpriseEmoji");
const surpriseTitle = document.getElementById("surpriseTitle");
const surpriseText = document.getElementById("surpriseText");
const pathMarks = document.getElementById("pathMarks");
const goalCarrot = document.getElementById("goalCarrot");
const runnerRabbit = document.getElementById("runnerRabbit");
const progressLabel = document.getElementById("progressLabel");
const progressSubtext = document.getElementById("progressSubtext");

const checkAnswerButton = document.getElementById("checkAnswerButton");
const newQuestionButton = document.getElementById("newQuestionButton");
const clearAnswerButton = document.getElementById("clearAnswerButton");
const additionModeButton = document.getElementById("additionModeButton");
const wordModeButton = document.getElementById("wordModeButton");

const QUESTIONS_PER_LEVEL = 10;
const LEVEL_MILESTONES = [3, 6, 9];
const LETTER_KEYS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const additionScenes = [
  { first: "pink flowers", second: "yellow flowers" },
  { first: "sparkly stars", second: "moon pebbles" },
  { first: "berry cupcakes", second: "apple cupcakes" },
  { first: "rainbow balloons", second: "sun balloons" },
  { first: "shell treasures", second: "pearl treasures" },
  { first: "garden bugs", second: "leaf bugs" },
  { first: "tiny kites", second: "striped kites" },
  { first: "magic gems", second: "river gems" },
];

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomItem(items) {
  return items[randomInt(0, items.length - 1)];
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = randomInt(0, i);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function makeWordQuestion(entry) {
  const missingIndex = randomInt(0, entry.word.length - 1);
  const slotNames = ["first", "middle", "last"];
  const letters = entry.word.toUpperCase().split("");
  const answer = letters[missingIndex];
  letters[missingIndex] = "_";

  return {
    word: entry.word.toUpperCase(),
    image: entry.image,
    clue: entry.clue,
    hint: entry.hint,
    answer,
    promptWord: letters.join(""),
    missingIndex,
    slotName: slotNames[missingIndex],
  };
}

function buildAdditionQuestionPool(level) {
  const pool = [];

  for (let a = level.minA; a <= level.maxA; a += 1) {
    for (let b = level.minB; b <= level.maxB; b += 1) {
      const answer = a + b;
      if (answer < level.minSum || answer > level.maxSum) {
        continue;
      }

      pool.push({
        a,
        b,
        total: answer,
        answer,
        scene: randomItem(additionScenes),
        kind: "total",
      });

      pool.push({
        a,
        b,
        total: answer,
        answer: b,
        scene: randomItem(additionScenes),
        kind: "missing-second",
      });
    }
  }

  return shuffle(pool);
}

const additionLevels = [
  {
    name: "Level 1: Bunny Meadow",
    prompt: "Very easy sums from 0 to 4.",
    character: "Chick Pip",
    reward: "Berry Badge",
    mapEyebrow: "Chick path",
    mapTitle: "Chick to Egg",
    mapText: "Pip climbs from the grass to the shiny egg.",
    runnerEmoji: "🐥",
    goalEmoji: "🥚",
    minSum: 0,
    maxSum: 4,
    minA: 0,
    maxA: 3,
    minB: 0,
    maxB: 3,
    surprise: {
      emoji: "🐥",
      title: "Chick Pip is cheering!",
      text: "Pip chirps for every right answer in Bunny Meadow.",
    },
  },
  {
    name: "Level 2: Butterfly Brook",
    prompt: "Now the sums grow to 5, 6, and 7.",
    character: "Bella Butterfly",
    reward: "Flower Crown",
    mapEyebrow: "Butterfly path",
    mapTitle: "Butterfly to Flower",
    mapText: "Bella flutters upward to the bright flower crown.",
    runnerEmoji: "🦋",
    goalEmoji: "🌼",
    minSum: 5,
    maxSum: 7,
    minA: 1,
    maxA: 5,
    minB: 1,
    maxB: 5,
    surprise: {
      emoji: "🦋",
      title: "Bella Butterfly danced!",
      text: "Bella flutters in loops to celebrate a correct answer.",
    },
  },
  {
    name: "Level 3: Turtle Trail",
    prompt: "These sums land between 8 and 10.",
    character: "Toby Turtle",
    reward: "Leaf Medal",
    mapEyebrow: "Turtle path",
    mapTitle: "Turtle to Pond",
    mapText: "Toby walks up the trail toward the pond lily prize.",
    runnerEmoji: "🐢",
    goalEmoji: "🪷",
    minSum: 8,
    maxSum: 10,
    minA: 2,
    maxA: 7,
    minB: 2,
    maxB: 7,
    surprise: {
      emoji: "🐢",
      title: "Toby Turtle nodded!",
      text: "Slow and steady counting is working beautifully.",
    },
  },
  {
    name: "Level 4: Fox Forest",
    prompt: "These harder sums reach 11 to 13.",
    character: "Fiona Fox",
    reward: "Sparkle Lantern",
    mapEyebrow: "Fox path",
    mapTitle: "Fox to Lantern",
    mapText: "Fiona dashes through the forest toward the sparkle lantern.",
    runnerEmoji: "🦊",
    goalEmoji: "🏮",
    minSum: 11,
    maxSum: 13,
    minA: 3,
    maxA: 9,
    minB: 3,
    maxB: 8,
    surprise: {
      emoji: "🦊",
      title: "Fiona Fox twirled!",
      text: "That was a sharp answer. Fiona noticed right away.",
    },
  },
  {
    name: "Level 5: Moon Carrot Mountain",
    prompt: "Final stage: sums from 14 to 17.",
    character: "Luna Lamb",
    reward: "Golden Carrot Cup",
    mapEyebrow: "Lamb path",
    mapTitle: "Lamb to Trophy",
    mapText: "Luna climbs the moon path to the golden carrot trophy.",
    runnerEmoji: "🐑",
    goalEmoji: "🏆",
    minSum: 14,
    maxSum: 17,
    minA: 5,
    maxA: 10,
    minB: 4,
    maxB: 9,
    surprise: {
      emoji: "🐑",
      title: "Luna Lamb sparkled!",
      text: "Only a strong little mathematician reaches this high.",
    },
  },
];

const wordLevels = [
  {
    name: "Level 1: Animal Trail",
    prompt: "Start with simple animal words and their first letters.",
    character: "Rory Raccoon",
    reward: "Paw Print Ribbon",
    mapEyebrow: "Safari path",
    mapTitle: "Raccoon to Treehouse",
    mapText: "Rory climbs branch by branch with each right letter.",
    runnerEmoji: "🦝",
    goalEmoji: "🌳",
    surprise: {
      emoji: "🦝",
      title: "Rory found the clue!",
      text: "Picture clues make letter sounds easier to spot.",
    },
    words: [
      { word: "rat", image: "🐀", clue: "Small gray animal", hint: "Say the word slowly: rat." },
      { word: "cat", image: "🐱", clue: "Soft pet with whiskers", hint: "Listen for the first sound in cat." },
      { word: "dog", image: "🐶", clue: "Happy pet that barks", hint: "Which letter starts dog?" },
      { word: "pig", image: "🐷", clue: "Pink farm animal", hint: "The missing letter is the first sound." },
      { word: "hen", image: "🐔", clue: "Farm bird with feathers", hint: "Say hen. What do you hear first?" },
      { word: "cow", image: "🐮", clue: "Farm animal that says moo", hint: "Listen for the first sound in cow." },
      { word: "ant", image: "🐜", clue: "Tiny bug", hint: "Which letter starts ant?" },
      { word: "owl", image: "🦉", clue: "Bird awake at night", hint: "Say owl. What sound comes first?" },
      { word: "bat", image: "🦇", clue: "Animal that flies at night", hint: "Listen to the start of bat." },
      { word: "ram", image: "🐏", clue: "Animal with curly horns", hint: "Which letter begins ram?" },
    ],
  },
  {
    name: "Level 2: Sky and Nature",
    prompt: "Now match first letters with bright things from nature.",
    character: "Sunny Sparrow",
    reward: "Cloud Sticker",
    mapEyebrow: "Sky path",
    mapTitle: "Sparrow to Rainbow",
    mapText: "Sunny flaps through the clouds toward a rainbow ribbon.",
    runnerEmoji: "🐦",
    goalEmoji: "🌈",
    surprise: {
      emoji: "🌤️",
      title: "Sunny Sparrow swooped!",
      text: "The picture and the word shape are working together.",
    },
    words: [
      { word: "sun", image: "☀️", clue: "Bright in the sky", hint: "Sun starts with a hissing sound." },
      { word: "sky", image: "🌤️", clue: "Blue space above us", hint: "What letter starts sky?" },
      { word: "web", image: "🕸️", clue: "Spider home", hint: "Say web and find the first sound." },
      { word: "mud", image: "🟫", clue: "Wet brown ground", hint: "Which letter begins mud?" },
      { word: "log", image: "🪵", clue: "Piece of a tree trunk", hint: "Listen to the first sound in log." },
      { word: "fog", image: "🌫️", clue: "Cloud close to the ground", hint: "Say fog and choose the first letter." },
      { word: "dew", image: "💧", clue: "Tiny drops on grass", hint: "Which letter begins dew?" },
      { word: "oak", image: "🌳", clue: "A big strong tree", hint: "Listen to the first sound in oak." },
      { word: "bud", image: "🌷", clue: "Flower before it opens", hint: "What letter starts bud?" },
      { word: "ice", image: "🧊", clue: "Frozen water", hint: "Listen to the first sound in ice." },
    ],
  },
  {
    name: "Level 3: Home and Play",
    prompt: "These picture words are still short, but the sounds mix more.",
    character: "Mimi Mouse",
    reward: "Story Lamp",
    mapEyebrow: "House path",
    mapTitle: "Mouse to Window",
    mapText: "Mimi tiptoes across the house to the glowing window star.",
    runnerEmoji: "🐭",
    goalEmoji: "🪟",
    surprise: {
      emoji: "✨",
      title: "Mimi Mouse clapped!",
      text: "Isha is spotting starting letters very quickly now.",
    },
    words: [
      { word: "bed", image: "🛏️", clue: "Where you sleep", hint: "Bed begins with a bouncing sound." },
      { word: "box", image: "📦", clue: "Square package", hint: "What letter starts box?" },
      { word: "toy", image: "🧸", clue: "Something fun to play with", hint: "Listen to the first sound in toy." },
      { word: "jam", image: "🍓", clue: "Sweet spread", hint: "Say jam and guess the first letter." },
      { word: "van", image: "🚐", clue: "Big family car", hint: "Van starts with a gentle buzzing sound." },
      { word: "cup", image: "🥤", clue: "Something you drink from", hint: "Which letter begins cup?" },
      { word: "rug", image: "🧶", clue: "Soft mat on the floor", hint: "Say rug and listen to the first sound." },
      { word: "key", image: "🔑", clue: "It opens a lock", hint: "What letter starts key?" },
      { word: "pan", image: "🍳", clue: "You cook with it", hint: "Listen to the first sound in pan." },
      { word: "lid", image: "🥫", clue: "Top of a jar or cup", hint: "Which letter begins lid?" },
    ],
  },
  {
    name: "Level 4: Clever Mix",
    prompt: "Final stage: mixed picture words with fast first-letter choices.",
    character: "Zara Zebra",
    reward: "Alphabet Crown",
    mapEyebrow: "Zebra path",
    mapTitle: "Zebra to Crown",
    mapText: "Zara trots to the alphabet crown at the finish line.",
    runnerEmoji: "🦓",
    goalEmoji: "👑",
    surprise: {
      emoji: "👑",
      title: "Zara Zebra beamed!",
      text: "Those first letters were quick, clear, and correct.",
    },
    words: [
      { word: "yak", image: "🐂", clue: "Big furry animal", hint: "Yak starts with the y sound." },
      { word: "zip", image: "🤐", clue: "Close a jacket", hint: "Which letter begins zip?" },
      { word: "nut", image: "🥜", clue: "Small crunchy snack", hint: "Listen to the start of nut." },
      { word: "cap", image: "🧢", clue: "Hat for your head", hint: "Cap begins with a hard c sound." },
      { word: "run", image: "🏃", clue: "Move fast with your feet", hint: "Say run and pick the first letter." },
      { word: "bus", image: "🚌", clue: "Big road vehicle", hint: "What letter starts bus?" },
      { word: "pen", image: "🖊️", clue: "Tool for writing", hint: "Listen to the first sound in pen." },
      { word: "map", image: "🗺️", clue: "Helps you find a place", hint: "Which letter begins map?" },
      { word: "jet", image: "✈️", clue: "Fast plane", hint: "What letter begins jet?" },
      { word: "fox", image: "🦊", clue: "Clever forest animal", hint: "Listen to the first sound in fox." },
    ],
  },
];

const modes = {
  addition: {
    theme: {
      title: "Happy Addition Garden",
      intro: "Five levels. Ten questions each. One screen. Keyboard only.",
      eyebrow: "Ages 5 and up",
      tags: ["Playful", "Keyboard-first", "5 stages"],
      questionTag: "Addition time",
      placeholder: "Type the answer",
      clearMessage: "Answer cleared.",
      emptyMessage: "Press number keys first.",
      readyMessage: "Mission time. Solve the sum with the keyboard.",
      retryMessage: "Nice try. Count both groups again and type the total.",
      finishedMessage: "Amazing work. All five levels are complete.",
      progressFinal: "Answer all 10 correctly to win the final trophy.",
      progressDefault: "Answer all 10 correctly to unlock the next stage.",
    },
    levels: additionLevels,
    inputType: "digits",
    maxInputLength: 2,
    createQueue(level) {
      return buildAdditionQuestionPool(level);
    },
    createQuestion(level, queue) {
      if (queue.length === 0) {
        return buildAdditionQuestionPool(level).pop();
      }
      return queue.pop();
    },
    renderQuestion(current, typedAnswer) {
      pictureCard.classList.add("is-hidden");
      questionPrompt.textContent = `${current.a} + ${current.b} = ?`;
      questionHelp.textContent = "Type the answer with number keys, then press Enter.";
      firstGroupText.textContent = `${current.a} ${current.scene.first}`;
      secondGroupText.textContent = `${current.b} ${current.scene.second}`;
      if (current.kind === "missing-second") {
        questionPrompt.textContent = `${current.a} + ? = ${current.total}`;
        questionHelp.textContent = "Type the missing number that completes the sum.";
      }
      answerDisplay.textContent = typedAnswer === "" ? this.theme.placeholder : typedAnswer;
    },
    isCorrect(current, typedAnswer) {
      return Number(typedAnswer) === current.answer;
    },
    successMessage(current) {
      if (current.kind === "missing-second") {
        return `Yes! ${current.a} + ${current.answer} = ${current.total}.`;
      }
      return `Great job, Isha! ${current.a} + ${current.b} = ${current.answer}.`;
    },
  },
  word: {
    theme: {
      title: "Missing Letter Safari",
      intro: "Picture clues, short words, and one missing first letter to guess.",
      eyebrow: "Early reading game",
      tags: ["Picture-first", "Phonics play", "4 stages"],
      questionTag: "Guess the letter",
      placeholder: "Type one letter",
      clearMessage: "Letter cleared.",
      emptyMessage: "Press one letter key first.",
      readyMessage: "Picture mission. Say the word and catch the missing first letter.",
      retryMessage: "Close one. Look at the picture again and listen for the first sound.",
      finishedMessage: "Excellent reading. Every picture level is complete.",
      progressFinal: "Finish all 10 picture words to earn the alphabet crown.",
      progressDefault: "Answer all 10 picture words correctly to unlock the next stage.",
    },
    levels: wordLevels,
    inputType: "letters",
    maxInputLength: 1,
    createQueue(level) {
      return shuffle(level.words);
    },
    createQuestion(level, queue) {
      if (queue.length === 0) {
        return makeWordQuestion(randomItem(level.words));
      }
      return makeWordQuestion(queue.pop());
    },
    renderQuestion(current, typedAnswer) {
      pictureCard.classList.remove("is-hidden");
      pictureArt.textContent = current.image;
      pictureWord.textContent = current.promptWord;
      pictureHint.textContent = current.hint;
      questionPrompt.textContent = `Which ${current.slotName} letter makes ${current.promptWord}?`;
      questionHelp.textContent = `Type the missing ${current.slotName} letter, then press Enter.`;
      firstGroupText.textContent = `Word puzzle: ${current.promptWord}`;
      secondGroupText.textContent = `Clue: ${current.clue}`;
      answerDisplay.textContent = typedAnswer === "" ? this.theme.placeholder : typedAnswer;
    },
    isCorrect(current, typedAnswer) {
      return typedAnswer.toUpperCase() === current.answer;
    },
    successMessage(current) {
      return `Yes! ${current.word} has ${current.answer} in the ${current.slotName} spot.`;
    },
  },
};

const game = {
  activeMode: "addition",
  levelIndex: 0,
  current: null,
  questionQueue: [],
  typedAnswer: "",
  stars: 0,
  streak: 0,
  correctInLevel: 0,
  totalCorrect: 0,
  autoAdvanceId: null,
  finished: false,
};

function currentMode() {
  return modes[game.activeMode];
}

function currentLevel() {
  return currentMode().levels[game.levelIndex];
}

function clearAutoAdvance() {
  if (game.autoAdvanceId !== null) {
    window.clearTimeout(game.autoAdvanceId);
    game.autoAdvanceId = null;
  }
}

function setFeedback(message, tone = "") {
  feedbackCard.textContent = message;
  feedbackCard.className = "feedback-card";
  if (tone) {
    feedbackCard.classList.add(tone);
  }
}

function renderRewardShelf() {
  rewardShelf.textContent = "";
  LEVEL_MILESTONES.forEach((milestone, index) => {
    const orb = document.createElement("div");
    orb.className = "reward-orb";
    if (game.correctInLevel >= milestone) {
      orb.classList.add("is-on");
    }
    orb.textContent = ["🎁", "🏅", "👑"][index];
    rewardShelf.appendChild(orb);
  });
}

function renderMission() {
  const nextMilestone = LEVEL_MILESTONES.find((milestone) => game.correctInLevel < milestone);
  if (!nextMilestone) {
    missionTitle.textContent = "Prize shelf complete";
    missionText.textContent = "All three mini rewards are glowing. Finish the level to unlock the big prize.";
    renderRewardShelf();
    return;
  }

  missionTitle.textContent = `Reach ${nextMilestone} correct answers`;
  missionText.textContent = `Current streak: ${game.streak}. The next shelf reward lights up at ${nextMilestone}.`;
  renderRewardShelf();
}

function showSurprise(type) {
  const level = currentLevel();
  if (type === "level-complete") {
    surpriseEmoji.textContent = "🏆";
    surpriseTitle.textContent = `${level.reward} unlocked!`;
    surpriseText.textContent = `${level.character} brought ${level.reward} for finishing ${level.name}.`;
  } else if (type === "game-complete") {
    surpriseEmoji.textContent = "🌟";
    surpriseTitle.textContent =
      game.activeMode === "addition" ? "All five stages are complete!" : "All picture stages are complete!";
    surpriseText.textContent =
      game.activeMode === "addition"
        ? "Isha finished every addition level and collected every stage reward."
        : "Isha finished every missing-letter stage and collected every reading reward.";
  } else {
    surpriseEmoji.textContent = level.surprise.emoji;
    surpriseTitle.textContent = level.surprise.title;
    surpriseText.textContent = level.surprise.text;
  }

  document.body.classList.remove("celebrate");
  window.setTimeout(() => {
    document.body.classList.add("celebrate");
  }, 0);
}

function updatePathMarks() {
  pathMarks.textContent = "";
  for (let i = 0; i < QUESTIONS_PER_LEVEL; i += 1) {
    const mark = document.createElement("div");
    mark.className = "path-mark";
    if (i < game.correctInLevel) {
      mark.classList.add("is-done");
    }
    pathMarks.appendChild(mark);
  }
}

function updateRunnerPosition() {
  const progress = game.correctInLevel / QUESTIONS_PER_LEVEL;
  runnerRabbit.style.setProperty("--rabbit-progress", String(progress));
}

function renderTopCopy() {
  const mode = currentMode();
  const theme = mode.theme;
  document.body.dataset.mode = game.activeMode;
  heroEyebrow.textContent = theme.eyebrow;
  gameTitle.textContent = theme.title;
  gameIntro.textContent = theme.intro;
  heroTagOne.textContent = theme.tags[0];
  heroTagTwo.textContent = theme.tags[1];
  heroTagThree.textContent = theme.tags[2];
  questionTag.textContent = theme.questionTag;

  additionModeButton.classList.toggle("is-active", game.activeMode === "addition");
  wordModeButton.classList.toggle("is-active", game.activeMode === "word");
}

function renderTopCards() {
  const mode = currentMode();
  const level = currentLevel();
  stageName.textContent = level.name;
  stagePrompt.textContent = level.prompt;
  rewardChip.textContent = `Reward: ${level.reward}`;
  characterChip.textContent = `Character: ${level.character}`;
  mapEyebrow.textContent = level.mapEyebrow;
  mapTitle.textContent = level.mapTitle;
  mapText.textContent = level.mapText;
  runnerRabbit.textContent = level.runnerEmoji;
  goalCarrot.textContent = level.goalEmoji;
  levelLabel.textContent = String(game.levelIndex + 1);
  questionCountLabel.textContent = `${Math.min(game.correctInLevel + 1, QUESTIONS_PER_LEVEL)}/${QUESTIONS_PER_LEVEL}`;
  if (game.finished) {
    questionCountLabel.textContent = `${QUESTIONS_PER_LEVEL}/${QUESTIONS_PER_LEVEL}`;
  }
  starCount.textContent = String(game.stars);
  streakCount.textContent = String(game.streak);
  progressLabel.textContent = `${game.correctInLevel} of ${QUESTIONS_PER_LEVEL} right`;
  progressSubtext.textContent =
    game.levelIndex === mode.levels.length - 1 ? mode.theme.progressFinal : mode.theme.progressDefault;
}

function buildInputGrid() {
  const mode = currentMode();
  inputGrid.textContent = "";
  inputGrid.className = "digit-grid";

  if (mode.inputType === "digits") {
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].forEach((key) => {
      const keyEl = document.createElement("div");
      keyEl.className = "digit-key";
      if (key === "0") {
        keyEl.classList.add("digit-key-wide");
      }
      keyEl.textContent = key;
      inputGrid.appendChild(keyEl);
    });
    return;
  }

  inputGrid.classList.add("is-letter-grid");
  LETTER_KEYS.forEach((key) => {
    const keyEl = document.createElement("div");
    keyEl.className = "digit-key";
    keyEl.textContent = key;
    inputGrid.appendChild(keyEl);
  });
}

function renderQuestion() {
  currentMode().renderQuestion(game.current, game.typedAnswer);
}

function renderAll() {
  renderTopCopy();
  renderTopCards();
  renderQuestion();
  buildInputGrid();
  updatePathMarks();
  updateRunnerPosition();
  renderMission();
}

function makeLevelQuestion() {
  const mode = currentMode();
  return mode.createQuestion(currentLevel(), game.questionQueue);
}

function nextQuestion() {
  clearAutoAdvance();
  if (game.finished) {
    return;
  }
  if (game.questionQueue.length === 0) {
    game.questionQueue = currentMode().createQueue(currentLevel());
  }
  game.current = makeLevelQuestion();
  game.typedAnswer = "";
  setFeedback(currentMode().theme.readyMessage);
  renderAll();
}

function clearAnswer() {
  if (game.finished) {
    return;
  }
  game.typedAnswer = "";
  answerDisplay.textContent = currentMode().theme.placeholder;
  setFeedback(currentMode().theme.clearMessage);
}

function appendInput(value) {
  const mode = currentMode();
  if (game.finished || game.typedAnswer.length >= mode.maxInputLength) {
    return;
  }

  if (mode.inputType === "digits") {
    if (game.typedAnswer === "0") {
      game.typedAnswer = value;
    } else {
      game.typedAnswer += value;
    }
  } else {
    game.typedAnswer = value.toUpperCase();
  }

  answerDisplay.textContent = game.typedAnswer;
}

function goToNextLevel() {
  const mode = currentMode();
  if (game.levelIndex === mode.levels.length - 1) {
    game.finished = true;
    showSurprise("game-complete");
    setFeedback(mode.theme.finishedMessage, "is-success");
    renderAll();
    return;
  }

  game.levelIndex += 1;
  game.correctInLevel = 0;
  game.questionQueue = currentMode().createQueue(currentLevel());
  showSurprise("level-complete");
  setFeedback(`Level ${game.levelIndex} finished. Now starting level ${game.levelIndex + 1}.`, "is-success");
  game.autoAdvanceId = window.setTimeout(() => {
    nextQuestion();
  }, 1700);
  renderAll();
}

function checkAnswer() {
  if (game.finished) {
    return;
  }

  if (game.typedAnswer === "") {
    setFeedback(currentMode().theme.emptyMessage, "is-try");
    return;
  }

  if (currentMode().isCorrect(game.current, game.typedAnswer)) {
    clearAutoAdvance();
    game.stars += 1;
    game.streak += 1;
    game.correctInLevel += 1;
    game.totalCorrect += 1;
    showSurprise("correct");
    setFeedback(currentMode().successMessage(game.current), "is-success");
    renderAll();

    if (game.correctInLevel >= QUESTIONS_PER_LEVEL) {
      game.autoAdvanceId = window.setTimeout(() => {
        goToNextLevel();
      }, 1500);
      return;
    }

    game.autoAdvanceId = window.setTimeout(() => {
      nextQuestion();
    }, 1400);
    return;
  }

  game.streak = 0;
  setFeedback(currentMode().theme.retryMessage, "is-try");
  renderMission();
}

function resetMode(modeName) {
  clearAutoAdvance();
  game.activeMode = modeName;
  game.levelIndex = 0;
  game.current = null;
  game.questionQueue = currentMode().createQueue(currentLevel());
  game.typedAnswer = "";
  game.stars = 0;
  game.streak = 0;
  game.correctInLevel = 0;
  game.totalCorrect = 0;
  game.finished = false;
  nextQuestion();
}

function handleKeydown(event) {
  const mode = currentMode();

  if (mode.inputType === "digits" && event.key >= "0" && event.key <= "9") {
    appendInput(event.key);
    return;
  }

  if (mode.inputType === "letters" && /^[a-zA-Z]$/.test(event.key)) {
    appendInput(event.key);
    return;
  }

  if (event.key === "Enter") {
    event.preventDefault();
    checkAnswer();
    return;
  }

  if (event.key === "Backspace") {
    event.preventDefault();
    if (game.finished) {
      return;
    }
    if (mode.inputType === "digits") {
      game.typedAnswer = game.typedAnswer.slice(0, -1);
    } else {
      game.typedAnswer = "";
    }
    answerDisplay.textContent = game.typedAnswer === "" ? mode.theme.placeholder : game.typedAnswer;
    return;
  }

  if (event.key === "n" || event.key === "N") {
    nextQuestion();
  }
}

checkAnswerButton.addEventListener("click", checkAnswer);
newQuestionButton.addEventListener("click", nextQuestion);
clearAnswerButton.addEventListener("click", clearAnswer);
additionModeButton.addEventListener("click", () => resetMode("addition"));
wordModeButton.addEventListener("click", () => resetMode("word"));
inputGrid.addEventListener("click", (event) => {
  const key = event.target.closest(".digit-key");
  if (!key) {
    return;
  }
  appendInput(key.textContent.trim());
});
window.addEventListener("keydown", handleKeydown);

nextQuestion();

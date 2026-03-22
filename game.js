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
const progressLabel = document.getElementById("progressLabel");
const progressSubtext = document.getElementById("progressSubtext");
const pathMarks = document.getElementById("pathMarks");
const goalCarrot = document.getElementById("goalCarrot");
const runnerRabbit = document.getElementById("runnerRabbit");

const homeView = document.getElementById("homeView");
const homeViewText = document.getElementById("homeViewText");
const worldGrid = document.getElementById("worldGrid");
const playView = document.getElementById("playView");

const questionTag = document.getElementById("questionTag");
const questionPrompt = document.getElementById("questionPrompt");
const questionHelp = document.getElementById("questionHelp");
const pictureCard = document.getElementById("pictureCard");
const pictureArt = document.getElementById("pictureArt");
const pictureWord = document.getElementById("pictureWord");
const pictureHint = document.getElementById("pictureHint");
const firstGroupText = document.getElementById("firstGroupText");
const secondGroupText = document.getElementById("secondGroupText");
const dragBoard = document.getElementById("dragBoard");
const dragSource = document.getElementById("dragSource");
const dropZone = document.getElementById("dropZone");
const dropZoneLabel = document.getElementById("dropZoneLabel");
const dropZoneCount = document.getElementById("dropZoneCount");
const answerDisplay = document.getElementById("answerDisplay");
const inputGrid = document.getElementById("inputGrid");
const feedbackCard = document.getElementById("feedbackCard");

const surpriseEmoji = document.getElementById("surpriseEmoji");
const surpriseTitle = document.getElementById("surpriseTitle");
const surpriseText = document.getElementById("surpriseText");

const additionModeButton = document.getElementById("additionModeButton");
const wordModeButton = document.getElementById("wordModeButton");
const homeButton = document.getElementById("homeButton");
const checkAnswerButton = document.getElementById("checkAnswerButton");
const newQuestionButton = document.getElementById("newQuestionButton");
const clearAnswerButton = document.getElementById("clearAnswerButton");

const QUESTIONS_PER_WORLD = 10;
const QUEST_STEPS = [3, 6, 9];
const LETTER_KEYS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const SOUND_SET = [
  { word: "cat", image: "🐱", clue: "Soft pet with whiskers" },
  { word: "dog", image: "🐶", clue: "Happy pet that barks" },
  { word: "sun", image: "☀️", clue: "Bright in the sky" },
  { word: "log", image: "🪵", clue: "Piece of a tree trunk" },
  { word: "bed", image: "🛏️", clue: "Where you sleep" },
  { word: "van", image: "🚐", clue: "Big family car" },
  { word: "fox", image: "🦊", clue: "Clever forest animal" },
  { word: "jet", image: "✈️", clue: "Fast plane" },
  { word: "map", image: "🗺️", clue: "Helps you find a place" },
  { word: "pen", image: "🖊️", clue: "Tool for writing" },
];
const MISSING_SET = [
  { word: "rat", image: "🐀", clue: "Small gray animal", hint: "Look and say the whole word slowly." },
  { word: "pig", image: "🐷", clue: "Pink farm animal", hint: "Listen for the missing sound." },
  { word: "owl", image: "🦉", clue: "Bird awake at night", hint: "One letter is hiding." },
  { word: "mud", image: "🟫", clue: "Wet brown ground", hint: "Find the missing letter spot." },
  { word: "key", image: "🔑", clue: "It opens a lock", hint: "Say the word and fill the gap." },
  { word: "cup", image: "🥤", clue: "Something you drink from", hint: "The missing letter completes the word." },
  { word: "yak", image: "🐂", clue: "Big furry animal", hint: "Listen to the whole word." },
  { word: "zip", image: "🤐", clue: "Close a jacket", hint: "One letter belongs in the blank." },
  { word: "pan", image: "🍳", clue: "You cook with it", hint: "Which letter fits?" },
  { word: "ice", image: "🧊", clue: "Frozen water", hint: "Fill the missing sound." },
];
const MIX_SET = [
  { word: "hen", image: "🐔", clue: "Farm bird with feathers", hint: "Find the hidden letter." },
  { word: "oak", image: "🌳", clue: "A big strong tree", hint: "Say the word and spot the gap." },
  { word: "box", image: "📦", clue: "Square package", hint: "One letter is missing." },
  { word: "jam", image: "🍓", clue: "Sweet spread", hint: "Fill the blank." },
  { word: "run", image: "🏃", clue: "Move fast with your feet", hint: "Say it out loud." },
  { word: "bus", image: "🚌", clue: "Big road vehicle", hint: "Which sound is hiding?" },
  { word: "web", image: "🕸️", clue: "Spider home", hint: "Listen carefully." },
  { word: "lid", image: "🥫", clue: "Top of a jar or cup", hint: "One letter completes it." },
  { word: "nut", image: "🥜", clue: "Crunchy snack", hint: "Spot the missing sound." },
  { word: "ram", image: "🐏", clue: "Animal with curly horns", hint: "Guess the hidden letter." },
];
const ADDITION_SCENES = [
  { first: "pink flowers", second: "yellow flowers", tokenA: "🌸", tokenB: "🌼", container: "Garden basket" },
  { first: "sparkly stars", second: "moon pebbles", tokenA: "⭐", tokenB: "🌙", container: "Night jar" },
  { first: "berry cupcakes", second: "apple cupcakes", tokenA: "🧁", tokenB: "🍎", container: "Party tray" },
  { first: "rainbow balloons", second: "sun balloons", tokenA: "🎈", tokenB: "☀️", container: "Sky bundle" },
  { first: "shell treasures", second: "pearl treasures", tokenA: "🐚", tokenB: "🫧", container: "Treasure chest" },
];

const modeThemes = {
  math: {
    title: "Math Quest",
    intro: "Three mini-games, quick rewards, and brighter math worlds for Isha.",
    eyebrow: "Fast playful math",
    tags: ["3 worlds", "Count and drag", "Unlock prizes"],
    homeText: "Start with Flower Sums, then unlock missing-number and drag-count worlds.",
  },
  reading: {
    title: "Reading Safari",
    intro: "Picture words, sound matching, and little reading quests that change each round.",
    eyebrow: "Early reading play",
    tags: ["3 worlds", "Sound match", "Word puzzles"],
    homeText: "Start with missing letters, then unlock sound matching and a mixed challenge trail.",
  },
};

const worlds = {
  math: [
    {
      id: "flower-sums",
      index: 1,
      unlockStars: 0,
      title: "Flower Sums",
      subtitle: "Classic addition with bright story objects.",
      icon: "🌸",
      reward: "Berry Badge",
      character: "Chick Pip",
      mapEyebrow: "Sum path",
      mapTitle: "Garden to Egg",
      mapText: "Each right answer moves Pip one step higher.",
      runnerEmoji: "🐥",
      goalEmoji: "🥚",
      questionTag: "Quick sums",
      promptText: "Type the total with the keyboard.",
      makeQueue() {
        return buildMathQueue("total", 0, 9, 0, 6, 0, 5);
      },
    },
    {
      id: "missing-number",
      index: 2,
      unlockStars: 8,
      title: "Find the Missing Number",
      subtitle: "Work backward and complete the sum.",
      icon: "🔎",
      reward: "Lantern Ribbon",
      character: "Fiona Fox",
      mapEyebrow: "Puzzle path",
      mapTitle: "Forest to Lantern",
      mapText: "Fiona lights a new lantern for each smart guess.",
      runnerEmoji: "🦊",
      goalEmoji: "🏮",
      questionTag: "Missing number",
      promptText: "Type the number that completes the sum.",
      makeQueue() {
        return buildMathQueue("missing", 4, 14, 1, 9, 1, 8);
      },
    },
    {
      id: "drag-count",
      index: 3,
      unlockStars: 18,
      title: "Treasure Drag Count",
      subtitle: "Drag every item into the chest to count the full group.",
      icon: "🧺",
      reward: "Golden Scoop",
      character: "Luna Lamb",
      mapEyebrow: "Treasure path",
      mapTitle: "Chest to Trophy",
      mapText: "Luna collects every treasure token on the climb.",
      runnerEmoji: "🐑",
      goalEmoji: "🏆",
      questionTag: "Drag and count",
      promptText: "Drag every treasure into the chest, then check the count.",
      makeQueue() {
        return buildDragQueue();
      },
    },
  ],
  reading: [
    {
      id: "missing-letter",
      index: 1,
      unlockStars: 0,
      title: "Missing Letter Trail",
      subtitle: "Fill the missing first, middle, or last letter.",
      icon: "🔤",
      reward: "Paw Print Ribbon",
      character: "Rory Raccoon",
      mapEyebrow: "Letter path",
      mapTitle: "Trail to Treehouse",
      mapText: "Rory climbs with every finished word.",
      runnerEmoji: "🦝",
      goalEmoji: "🌳",
      questionTag: "Word puzzle",
      promptText: "Type the missing letter.",
      makeQueue() {
        return buildMissingLetterQueue(MISSING_SET);
      },
    },
    {
      id: "sound-match",
      index: 2,
      unlockStars: 8,
      title: "Sound Match",
      subtitle: "Hear the start sound in your head and tap the right letter.",
      icon: "🎧",
      reward: "Cloud Sticker",
      character: "Sunny Sparrow",
      mapEyebrow: "Sound path",
      mapTitle: "Sky to Rainbow",
      mapText: "Sunny swoops to the rainbow with each sound match.",
      runnerEmoji: "🐦",
      goalEmoji: "🌈",
      questionTag: "Sound match",
      promptText: "Tap the letter that matches the starting sound.",
      makeQueue() {
        return buildSoundQueue(SOUND_SET);
      },
    },
    {
      id: "mixed-safari",
      index: 3,
      unlockStars: 18,
      title: "Mixed Safari",
      subtitle: "A changing trail with missing letters and sound matching together.",
      icon: "🗺️",
      reward: "Alphabet Crown",
      character: "Zara Zebra",
      mapEyebrow: "Safari path",
      mapTitle: "Savanna to Crown",
      mapText: "Zara races through every reading challenge to the crown.",
      runnerEmoji: "🦓",
      goalEmoji: "👑",
      questionTag: "Mixed reading",
      promptText: "Watch for the puzzle type and solve it fast.",
      makeQueue() {
        return buildMixedReadingQueue(MIX_SET);
      },
    },
  ],
};

const game = {
  mode: "math",
  currentWorldId: null,
  currentQuestion: null,
  queue: [],
  typedAnswer: "",
  stars: 0,
  streak: 0,
  correct: 0,
  finished: false,
  autoAdvanceId: null,
  movedTokenIds: new Set(),
  worldStats: {},
  audioContext: null,
};

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

function getModeWorlds() {
  return worlds[game.mode];
}

function getCurrentWorld() {
  return getModeWorlds().find((world) => world.id === game.currentWorldId) || null;
}

function ensureWorldStats(worldId) {
  if (!game.worldStats[worldId]) {
    game.worldStats[worldId] = { completed: false, best: 0 };
  }
  return game.worldStats[worldId];
}

function clearAutoAdvance() {
  if (game.autoAdvanceId !== null) {
    window.clearTimeout(game.autoAdvanceId);
    game.autoAdvanceId = null;
  }
}

function audioCtx() {
  if (!game.audioContext) {
    const AudioCtor = window.AudioContext || window.webkitAudioContext;
    if (AudioCtor) {
      game.audioContext = new AudioCtor();
    }
  }
  return game.audioContext;
}

function playTones(notes) {
  const ctx = audioCtx();
  if (!ctx) {
    return;
  }
  if (ctx.state === "suspended") {
    ctx.resume();
  }
  const now = ctx.currentTime;
  notes.forEach((note, index) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = note.freq;
    gain.gain.setValueAtTime(0.0001, now + index * note.len);
    gain.gain.exponentialRampToValueAtTime(note.gain || 0.06, now + index * note.len + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + index * note.len + note.len);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now + index * note.len);
    osc.stop(now + index * note.len + note.len);
  });
}

function playSound(type) {
  if (type === "correct") {
    playTones([
      { freq: 523, len: 0.12 },
      { freq: 659, len: 0.12 },
      { freq: 784, len: 0.18, gain: 0.08 },
    ]);
  } else if (type === "wrong") {
    playTones([
      { freq: 330, len: 0.14, gain: 0.05 },
      { freq: 262, len: 0.18, gain: 0.05 },
    ]);
  } else if (type === "unlock") {
    playTones([
      { freq: 440, len: 0.1 },
      { freq: 587, len: 0.1 },
      { freq: 784, len: 0.2, gain: 0.08 },
    ]);
  } else if (type === "tap") {
    playTones([{ freq: 660, len: 0.08, gain: 0.04 }]);
  }
}

function buildMathQueue(kind, minSum, maxSum, minA, maxA, minB, maxB) {
  const queue = [];
  for (let a = minA; a <= maxA; a += 1) {
    for (let b = minB; b <= maxB; b += 1) {
      const total = a + b;
      if (total < minSum || total > maxSum) {
        continue;
      }
      const scene = randomItem(ADDITION_SCENES);
      queue.push({
        type: kind,
        a,
        b,
        total,
        answer: kind === "missing" ? b : total,
        scene,
      });
    }
  }
  return shuffle(queue).slice(0, QUESTIONS_PER_WORLD);
}

function buildDragQueue() {
  const queue = [];
  for (let i = 0; i < QUESTIONS_PER_WORLD; i += 1) {
    const firstCount = randomInt(1, 4);
    const secondCount = randomInt(1, 4);
    const scene = randomItem(ADDITION_SCENES);
    const tokens = [];
    for (let n = 0; n < firstCount; n += 1) {
      tokens.push({ id: `a-${i}-${n}`, emoji: scene.tokenA });
    }
    for (let n = 0; n < secondCount; n += 1) {
      tokens.push({ id: `b-${i}-${n}`, emoji: scene.tokenB });
    }
    queue.push({
      type: "drag",
      firstCount,
      secondCount,
      total: firstCount + secondCount,
      answer: firstCount + secondCount,
      scene,
      tokens: shuffle(tokens),
    });
  }
  return queue;
}

function buildMissingLetterQueue(words) {
  return shuffle(words).slice(0, QUESTIONS_PER_WORLD).map((entry) => {
    const missingIndex = randomInt(0, entry.word.length - 1);
    const letters = entry.word.toUpperCase().split("");
    const answer = letters[missingIndex];
    letters[missingIndex] = "_";
    const slotName = ["first", "middle", "last"][missingIndex];
    return {
      type: "missing-letter",
      word: entry.word.toUpperCase(),
      promptWord: letters.join(""),
      answer,
      image: entry.image,
      clue: entry.clue,
      hint: entry.hint,
      slotName,
    };
  });
}

function buildChoiceLetters(answer) {
  const options = new Set([answer]);
  while (options.size < 3) {
    options.add(randomItem(LETTER_KEYS));
  }
  return shuffle([...options]);
}

function buildSoundQueue(words) {
  return shuffle(words).slice(0, QUESTIONS_PER_WORLD).map((entry) => ({
    type: "sound-match",
    word: entry.word.toUpperCase(),
    image: entry.image,
    clue: entry.clue,
    answer: entry.word[0].toUpperCase(),
    choices: buildChoiceLetters(entry.word[0].toUpperCase()),
  }));
}

function buildMixedReadingQueue(words) {
  const shuffled = shuffle(words).slice(0, QUESTIONS_PER_WORLD);
  return shuffled.map((entry, index) => {
    if (index % 2 === 0) {
      return buildMissingLetterQueue([entry])[0];
    }
    return buildSoundQueue([entry])[0];
  });
}

function isWorldUnlocked(world) {
  return game.stars >= world.unlockStars;
}

function setFeedback(message, tone = "") {
  feedbackCard.textContent = message;
  feedbackCard.className = "feedback-card";
  if (tone) {
    feedbackCard.classList.add(tone);
  }
}

function updatePathMarks() {
  pathMarks.textContent = "";
  for (let i = 0; i < QUESTIONS_PER_WORLD; i += 1) {
    const mark = document.createElement("div");
    mark.className = "path-mark";
    if (i < game.correct) {
      mark.classList.add("is-done");
    }
    pathMarks.appendChild(mark);
  }
}

function updateRunnerPosition() {
  runnerRabbit.style.setProperty("--rabbit-progress", String(game.correct / QUESTIONS_PER_WORLD));
}

function renderRewardShelf() {
  rewardShelf.textContent = "";
  QUEST_STEPS.forEach((milestone, index) => {
    const orb = document.createElement("div");
    orb.className = "reward-orb";
    if (game.correct >= milestone) {
      orb.classList.add("is-on");
    }
    orb.textContent = ["🎁", "🏅", "👑"][index];
    rewardShelf.appendChild(orb);
  });
}

function renderMission() {
  const nextGoal = QUEST_STEPS.find((milestone) => game.correct < milestone);
  if (!game.currentWorldId) {
    missionTitle.textContent = "World rewards";
    missionText.textContent = "Each finished world unlocks stars, prizes, and a new adventure.";
    renderRewardShelf();
    return;
  }
  if (!nextGoal) {
    missionTitle.textContent = "Quest shelf complete";
    missionText.textContent = "All mini rewards are glowing. Finish the world for the big prize.";
    renderRewardShelf();
    return;
  }
  missionTitle.textContent = `Reach ${nextGoal} correct answers`;
  missionText.textContent = `Current streak: ${game.streak}. Keep going to light the next reward tile.`;
  renderRewardShelf();
}

function renderTopCopy() {
  const theme = modeThemes[game.mode];
  document.body.dataset.mode = game.mode;
  heroEyebrow.textContent = theme.eyebrow;
  gameTitle.textContent = theme.title;
  gameIntro.textContent = theme.intro;
  heroTagOne.textContent = theme.tags[0];
  heroTagTwo.textContent = theme.tags[1];
  heroTagThree.textContent = theme.tags[2];
  homeViewText.textContent = theme.homeText;

  additionModeButton.classList.toggle("is-active", game.mode === "math");
  wordModeButton.classList.toggle("is-active", game.mode === "reading");
}

function renderMapAndStatus() {
  const world = getCurrentWorld();
  if (world) {
    stageName.textContent = world.title;
    stagePrompt.textContent = world.subtitle;
    rewardChip.textContent = `Reward: ${world.reward}`;
    characterChip.textContent = `Guide: ${world.character}`;
    mapEyebrow.textContent = world.mapEyebrow;
    mapTitle.textContent = world.mapTitle;
    mapText.textContent = world.mapText;
    runnerRabbit.textContent = world.runnerEmoji;
    goalCarrot.textContent = world.goalEmoji;
    levelLabel.textContent = String(world.index);
    questionCountLabel.textContent = `${Math.min(game.correct + 1, QUESTIONS_PER_WORLD)}/${QUESTIONS_PER_WORLD}`;
    progressLabel.textContent = `${game.correct} of ${QUESTIONS_PER_WORLD} right`;
    progressSubtext.textContent = "Finish 10 rounds to complete this world and unlock more stars.";
  } else {
    stageName.textContent = game.mode === "math" ? "Math Quest Worlds" : "Reading Safari Worlds";
    stagePrompt.textContent = "Choose a world from the map to start playing.";
    rewardChip.textContent = "Reward: New world unlock";
    characterChip.textContent = "Guide: Isha";
    mapEyebrow.textContent = "World map";
    mapTitle.textContent = game.mode === "math" ? "Math worlds" : "Reading worlds";
    mapText.textContent = "Pick a world, earn stars, and unlock the next challenge.";
    runnerRabbit.textContent = game.mode === "math" ? "🚀" : "🦓";
    goalCarrot.textContent = game.mode === "math" ? "🏆" : "👑";
    levelLabel.textContent = "-";
    questionCountLabel.textContent = "0/10";
    progressLabel.textContent = "Choose a world";
    progressSubtext.textContent = "Stars open locked worlds.";
  }

  starCount.textContent = String(game.stars);
  streakCount.textContent = String(game.streak);
  updatePathMarks();
  updateRunnerPosition();
}

function renderHome() {
  homeView.classList.remove("is-hidden");
  playView.classList.add("is-hidden");
  worldGrid.textContent = "";

  getModeWorlds().forEach((world) => {
    const stats = ensureWorldStats(world.id);
    const unlocked = isWorldUnlocked(world);
    const card = document.createElement("button");
    card.type = "button";
    card.className = "world-card";
    if (!unlocked) {
      card.classList.add("is-locked");
    }
    card.dataset.worldId = world.id;
    card.innerHTML = `
      <div class="world-card-top">
        <span class="world-icon">${world.icon}</span>
        <span class="world-lock">${unlocked ? "Open" : `${world.unlockStars}⭐`}</span>
      </div>
      <div>
        <h3>${world.title}</h3>
        <p>${world.subtitle}</p>
      </div>
      <div class="world-card-bottom">
        <span class="world-stars">${stats.completed ? "Completed" : `Best ${stats.best}/10`}</span>
        <span>${world.reward}</span>
      </div>
    `;
    worldGrid.appendChild(card);
  });

  renderTopCopy();
  renderMapAndStatus();
  renderMission();
}

function renderPicture(question) {
  if (question.image) {
    pictureCard.classList.remove("is-hidden");
    pictureArt.textContent = question.image;
    pictureWord.textContent = question.promptWord || question.word || "";
    pictureHint.textContent = question.hint || question.clue || "";
    return;
  }
  pictureCard.classList.add("is-hidden");
}

function renderDragBoard(question) {
  if (question.type !== "drag") {
    dragBoard.classList.add("is-hidden");
    return;
  }

  dragBoard.classList.remove("is-hidden");
  dragSource.textContent = "";
  question.tokens.forEach((token) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "drag-token";
    button.draggable = true;
    button.dataset.tokenId = token.id;
    button.textContent = token.emoji;
    if (game.movedTokenIds.has(token.id)) {
      button.classList.add("is-moved");
    }
    dragSource.appendChild(button);
  });
  dropZoneLabel.textContent = question.scene.container;
  dropZoneCount.textContent = String(game.movedTokenIds.size);
}

function buildInputGrid(question) {
  inputGrid.textContent = "";
  inputGrid.className = "digit-grid";

  if (question.type === "sound-match") {
    inputGrid.classList.add("is-choice-grid");
    question.choices.forEach((choice) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "digit-key";
      button.textContent = choice;
      button.dataset.choice = choice;
      inputGrid.appendChild(button);
    });
    return;
  }

  if (question.type === "drag") {
    inputGrid.classList.add("is-hidden");
    return;
  }

  if (question.type === "missing-letter") {
    inputGrid.classList.add("is-letter-grid");
    LETTER_KEYS.forEach((key) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "digit-key";
      button.textContent = key;
      inputGrid.appendChild(button);
    });
    return;
  }

  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].forEach((key) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "digit-key";
    if (key === "0") {
      button.classList.add("digit-key-wide");
    }
    button.textContent = key;
    inputGrid.appendChild(button);
  });
}

function renderQuestion() {
  const world = getCurrentWorld();
  const question = game.currentQuestion;
  if (!world || !question) {
    return;
  }

  questionTag.textContent = world.questionTag;
  questionHelp.textContent = world.promptText;
  renderPicture(question);

  if (question.type === "total") {
    questionPrompt.textContent = `${question.a} + ${question.b} = ?`;
    firstGroupText.textContent = `${question.a} ${question.scene.first}`;
    secondGroupText.textContent = `${question.b} ${question.scene.second}`;
    answerDisplay.textContent = game.typedAnswer === "" ? "Type the answer" : game.typedAnswer;
  } else if (question.type === "missing") {
    questionPrompt.textContent = `${question.a} + ? = ${question.total}`;
    firstGroupText.textContent = `${question.a} ${question.scene.first}`;
    secondGroupText.textContent = `Find the missing ${question.scene.second}`;
    answerDisplay.textContent = game.typedAnswer === "" ? "Type the answer" : game.typedAnswer;
  } else if (question.type === "drag") {
    questionPrompt.textContent = `Drag ${question.firstCount} ${question.scene.first} and ${question.secondCount} ${question.scene.second}`;
    firstGroupText.textContent = `Count all the treasures together`;
    secondGroupText.textContent = `Move every token into the ${question.scene.container.toLowerCase()}`;
    answerDisplay.textContent = `${game.movedTokenIds.size} moved`;
  } else if (question.type === "missing-letter") {
    questionPrompt.textContent = `Which ${question.slotName} letter makes ${question.promptWord}?`;
    firstGroupText.textContent = `Word puzzle: ${question.promptWord}`;
    secondGroupText.textContent = `Clue: ${question.clue}`;
    answerDisplay.textContent = game.typedAnswer === "" ? "Type one letter" : game.typedAnswer;
  } else if (question.type === "sound-match") {
    questionPrompt.textContent = `Which letter starts ${question.word}?`;
    firstGroupText.textContent = `Picture word: ${question.word}`;
    secondGroupText.textContent = `Clue: ${question.clue}`;
    answerDisplay.textContent = game.typedAnswer === "" ? "Tap a letter" : game.typedAnswer;
  }

  renderDragBoard(question);
  buildInputGrid(question);
}

function renderPlay() {
  homeView.classList.add("is-hidden");
  playView.classList.remove("is-hidden");
  renderTopCopy();
  renderMapAndStatus();
  renderQuestion();
  renderMission();
  renderControls();
}

function renderControls() {
  const question = game.currentQuestion;
  if (!question) {
    checkAnswerButton.disabled = true;
    clearAnswerButton.disabled = true;
    newQuestionButton.textContent = "Start";
    return;
  }

  checkAnswerButton.disabled = false;
  clearAnswerButton.disabled = false;
  newQuestionButton.textContent = game.finished ? "Play Again" : "New Question";

  if (question.type === "sound-match") {
    checkAnswerButton.textContent = "Check Choice";
    clearAnswerButton.textContent = "Clear Choice";
  } else if (question.type === "drag") {
    checkAnswerButton.textContent = "Count It";
    clearAnswerButton.textContent = "Reset Drag";
  } else {
    checkAnswerButton.textContent = "Check";
    clearAnswerButton.textContent = "Clear";
  }
}

function showSurprise(type) {
  const world = getCurrentWorld();
  if (type === "correct" && world) {
    surpriseEmoji.textContent = world.icon;
    surpriseTitle.textContent = `${world.character} cheered!`;
    surpriseText.textContent = `That answer moved Isha one step closer to ${world.reward}.`;
  } else if (type === "world-complete" && world) {
    surpriseEmoji.textContent = "🏆";
    surpriseTitle.textContent = `${world.reward} unlocked!`;
    surpriseText.textContent = `${world.character} brought a new reward for finishing ${world.title}.`;
  } else {
    surpriseEmoji.textContent = "🌟";
    surpriseTitle.textContent = "A shiny star is waiting.";
    surpriseText.textContent = "Every right answer moves the guide up the path.";
  }

  document.body.classList.remove("celebrate");
  window.setTimeout(() => document.body.classList.add("celebrate"), 0);
}

function nextQuestion() {
  clearAutoAdvance();
  if (!game.currentWorldId || game.finished) {
    return;
  }
  if (game.queue.length === 0) {
    game.finished = true;
    const world = getCurrentWorld();
    ensureWorldStats(world.id).completed = true;
    showSurprise("world-complete");
    playSound("unlock");
    setFeedback(`World complete. ${world.reward} is unlocked.`, "is-success");
    renderPlay();
    game.autoAdvanceId = window.setTimeout(() => {
      goHome();
    }, 1800);
    return;
  }

  game.currentQuestion = game.queue.shift();
  game.typedAnswer = "";
  game.movedTokenIds = new Set();
  setFeedback("New round ready.");
  renderPlay();
}

function startWorld(worldId) {
  const world = getModeWorlds().find((entry) => entry.id === worldId);
  if (!world || !isWorldUnlocked(world)) {
    setFeedback(`Earn ${world ? world.unlockStars : 0} stars to unlock that world.`, "is-try");
    renderHome();
    return;
  }

  clearAutoAdvance();
  game.currentWorldId = worldId;
  game.currentQuestion = null;
  game.queue = world.makeQueue();
  game.typedAnswer = "";
  game.streak = 0;
  game.correct = 0;
  game.finished = false;
  nextQuestion();
}

function goHome() {
  clearAutoAdvance();
  game.currentWorldId = null;
  game.currentQuestion = null;
  game.queue = [];
  game.typedAnswer = "";
  game.streak = 0;
  game.correct = 0;
  game.finished = false;
  showSurprise("idle");
  renderHome();
}

function switchMode(mode) {
  game.mode = mode;
  goHome();
}

function clearAnswer() {
  if (!game.currentQuestion) {
    return;
  }
  game.typedAnswer = "";
  if (game.currentQuestion.type === "drag") {
    game.movedTokenIds = new Set();
  }
  renderPlay();
  setFeedback("Cleared.");
}

function appendInput(value) {
  const question = game.currentQuestion;
  if (!question) {
    return;
  }

  if (question.type === "missing-letter" || question.type === "sound-match") {
    game.typedAnswer = value.toUpperCase();
  } else if (question.type === "total" || question.type === "missing") {
    if (game.typedAnswer.length >= 2) {
      return;
    }
    game.typedAnswer += value;
  }
  playSound("tap");
  renderQuestion();
  renderControls();

  if (question.type === "sound-match") {
    window.setTimeout(() => {
      checkAnswer();
    }, 120);
  }
}

function isCorrectAnswer() {
  const question = game.currentQuestion;
  if (!question) {
    return false;
  }

  if (question.type === "drag") {
    return game.movedTokenIds.size === question.answer;
  }
  if (question.type === "missing-letter" || question.type === "sound-match") {
    return game.typedAnswer.toUpperCase() === question.answer;
  }
  return Number(game.typedAnswer) === question.answer;
}

function successMessage(question) {
  if (question.type === "total") {
    return `Yes! ${question.a} + ${question.b} = ${question.total}.`;
  }
  if (question.type === "missing") {
    return `Yes! ${question.a} + ${question.answer} = ${question.total}.`;
  }
  if (question.type === "drag") {
    return `Great counting. ${question.firstCount} plus ${question.secondCount} makes ${question.total}.`;
  }
  if (question.type === "missing-letter") {
    return `Yes! ${question.word} uses ${question.answer} in the ${question.slotName} spot.`;
  }
  return `Yes! ${question.word} starts with ${question.answer}.`;
}

function checkAnswer() {
  const question = game.currentQuestion;
  if (!question || game.finished) {
    return;
  }

  if (question.type !== "drag" && game.typedAnswer === "") {
    setFeedback("Pick an answer first.", "is-try");
    return;
  }

  if (isCorrectAnswer()) {
    game.correct += 1;
    game.streak += 1;
    game.stars += 1;
    ensureWorldStats(game.currentWorldId).best = Math.max(
      ensureWorldStats(game.currentWorldId).best,
      game.correct
    );
    playSound("correct");
    showSurprise("correct");
    setFeedback(successMessage(question), "is-success");
    renderPlay();
    game.autoAdvanceId = window.setTimeout(nextQuestion, 1200);
    return;
  }

  game.streak = 0;
  playSound("wrong");
  setFeedback("Close one. Try again.", "is-try");
  renderPlay();
}

function moveToken(tokenId) {
  if (!game.currentQuestion || game.currentQuestion.type !== "drag") {
    return;
  }
  game.movedTokenIds.add(tokenId);
  playSound("tap");
  renderQuestion();
  if (game.movedTokenIds.size === game.currentQuestion.answer) {
    setFeedback("All treasures moved. Tap Count It.", "is-success");
  }
}

function handleKeydown(event) {
  const question = game.currentQuestion;
  if (!question || homeView.classList.contains("is-hidden") === false) {
    return;
  }

  if ((question.type === "total" || question.type === "missing") && event.key >= "0" && event.key <= "9") {
    appendInput(event.key);
    return;
  }

  if ((question.type === "missing-letter" || question.type === "sound-match") && /^[a-zA-Z]$/.test(event.key)) {
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
    if (question.type === "total" || question.type === "missing") {
      game.typedAnswer = game.typedAnswer.slice(0, -1);
    } else {
      game.typedAnswer = "";
    }
    renderQuestion();
    return;
  }
}

worldGrid.addEventListener("click", (event) => {
  const card = event.target.closest(".world-card");
  if (!card) {
    return;
  }
  startWorld(card.dataset.worldId);
});

inputGrid.addEventListener("click", (event) => {
  const key = event.target.closest(".digit-key");
  if (!key) {
    return;
  }
  appendInput((key.dataset.choice || key.textContent).trim());
});

dragSource.addEventListener("click", (event) => {
  const token = event.target.closest(".drag-token");
  if (!token) {
    return;
  }
  moveToken(token.dataset.tokenId);
});

dragSource.addEventListener("dragstart", (event) => {
  const token = event.target.closest(".drag-token");
  if (!token) {
    return;
  }
  event.dataTransfer.setData("text/plain", token.dataset.tokenId);
});

dropZone.addEventListener("dragover", (event) => {
  event.preventDefault();
});

dropZone.addEventListener("drop", (event) => {
  event.preventDefault();
  moveToken(event.dataTransfer.getData("text/plain"));
});

checkAnswerButton.addEventListener("click", checkAnswer);
newQuestionButton.addEventListener("click", () => {
  if (game.finished && game.currentWorldId) {
    startWorld(game.currentWorldId);
    return;
  }
  nextQuestion();
});
clearAnswerButton.addEventListener("click", clearAnswer);
additionModeButton.addEventListener("click", () => switchMode("math"));
wordModeButton.addEventListener("click", () => switchMode("reading"));
homeButton.addEventListener("click", goHome);
window.addEventListener("keydown", handleKeydown);
window.addEventListener("pointerdown", () => audioCtx(), { once: true });

renderHome();
renderControls();

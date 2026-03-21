const starCount = document.getElementById("starCount");
const levelLabel = document.getElementById("levelLabel");
const questionCountLabel = document.getElementById("questionCountLabel");
const stageName = document.getElementById("stageName");
const stagePrompt = document.getElementById("stagePrompt");
const rewardChip = document.getElementById("rewardChip");
const characterChip = document.getElementById("characterChip");
const mapEyebrow = document.getElementById("mapEyebrow");
const mapTitle = document.getElementById("mapTitle");
const questionPrompt = document.getElementById("questionPrompt");
const questionHelp = document.getElementById("questionHelp");
const firstGroupText = document.getElementById("firstGroupText");
const secondGroupText = document.getElementById("secondGroupText");
const answerDisplay = document.getElementById("answerDisplay");
const feedbackCard = document.getElementById("feedbackCard");
const surpriseEmoji = document.getElementById("surpriseEmoji");
const surpriseTitle = document.getElementById("surpriseTitle");
const surpriseText = document.getElementById("surpriseText");
const mapText = document.getElementById("mapText");
const pathMarks = document.getElementById("pathMarks");
const goalCarrot = document.getElementById("goalCarrot");
const runnerRabbit = document.getElementById("runnerRabbit");
const progressLabel = document.getElementById("progressLabel");
const progressSubtext = document.getElementById("progressSubtext");

const checkAnswerButton = document.getElementById("checkAnswerButton");
const newQuestionButton = document.getElementById("newQuestionButton");
const clearAnswerButton = document.getElementById("clearAnswerButton");

const levels = [
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
    surprise: {
      emoji: "🐥",
      title: "Chick Pip is cheering!",
      text: "Pip chirps for every right answer in Bunny Meadow.",
    },
    makeQuestion() {
      return questionFromRange(0, 4, 0, 2, 0, 2);
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
    surprise: {
      emoji: "🦋",
      title: "Bella Butterfly danced!",
      text: "Bella flutters in loops to celebrate a correct answer.",
    },
    makeQuestion() {
      return questionFromRange(5, 7, 1, 4, 1, 4);
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
    surprise: {
      emoji: "🐢",
      title: "Toby Turtle nodded!",
      text: "Slow and steady counting is working beautifully.",
    },
    makeQuestion() {
      return questionFromRange(8, 10, 3, 6, 2, 5);
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
    surprise: {
      emoji: "🦊",
      title: "Fiona Fox twirled!",
      text: "That was a sharp answer. Fiona noticed right away.",
    },
    makeQuestion() {
      return questionFromRange(11, 13, 4, 8, 3, 6);
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
    surprise: {
      emoji: "🐑",
      title: "Luna Lamb sparkled!",
      text: "Only a strong little mathematician reaches this high.",
    },
    makeQuestion() {
      return questionFromRange(14, 17, 6, 9, 5, 8);
    },
  },
];

const QUESTIONS_PER_LEVEL = 10;

const game = {
  levelIndex: 0,
  current: { a: 0, b: 0, answer: 0 },
  typedAnswer: "",
  stars: 0,
  correctInLevel: 0,
  totalCorrect: 0,
  autoAdvanceId: null,
  finished: false,
};

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function questionFromRange(minSum, maxSum, minA, maxA, minB, maxB) {
  let a = 0;
  let b = 0;
  let answer = 0;

  do {
    a = randomInt(minA, maxA);
    b = randomInt(minB, maxB);
    answer = a + b;
  } while (answer < minSum || answer > maxSum);

  return { a, b, answer };
}

function currentLevel() {
  return levels[game.levelIndex];
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
  for (let i = 0; i < QUESTIONS_PER_LEVEL; i += 1) {
    const mark = document.createElement("div");
    mark.className = "path-mark";
    if (i < game.correctInLevel) {
      mark.classList.add("is-done");
    }
    pathMarks.appendChild(mark);
  }
}

function updateRabbitPosition() {
  const progress = game.correctInLevel / QUESTIONS_PER_LEVEL;
  runnerRabbit.style.setProperty("--rabbit-progress", String(progress));
}

function renderTopCards() {
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
  questionCountLabel.textContent = `${game.correctInLevel + 1}/${QUESTIONS_PER_LEVEL}`;
  if (game.finished) {
    questionCountLabel.textContent = `${QUESTIONS_PER_LEVEL}/${QUESTIONS_PER_LEVEL}`;
  }
  starCount.textContent = String(game.stars);
  progressLabel.textContent = `${game.correctInLevel} of ${QUESTIONS_PER_LEVEL} right`;
  progressSubtext.textContent =
    game.levelIndex === levels.length - 1
      ? "Answer all 10 correctly to win the final trophy."
      : "Answer all 10 correctly to unlock the next stage.";
}

function renderQuestion() {
  questionPrompt.textContent = `${game.current.a} + ${game.current.b} = ?`;
  questionHelp.textContent = "Type the answer with number keys, then press Enter.";
  firstGroupText.textContent = `${game.current.a} pink flowers`;
  secondGroupText.textContent = `${game.current.b} yellow flowers`;
  answerDisplay.textContent = game.typedAnswer === "" ? "Type the answer" : game.typedAnswer;
}

function renderAll() {
  renderTopCards();
  renderQuestion();
  updatePathMarks();
  updateRabbitPosition();
}

function showSurprise(type) {
  const level = currentLevel();
  if (type === "level-complete") {
    surpriseEmoji.textContent = "🏆";
    surpriseTitle.textContent = `${level.reward} unlocked!`;
    surpriseText.textContent = `${level.character} brought ${level.reward} for finishing ${level.name}.`;
  } else if (type === "game-complete") {
    surpriseEmoji.textContent = "🌟";
    surpriseTitle.textContent = "All five stages are complete!";
    surpriseText.textContent = "Isha finished every level and collected every stage reward.";
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

function clearAutoAdvance() {
  if (game.autoAdvanceId !== null) {
    window.clearTimeout(game.autoAdvanceId);
    game.autoAdvanceId = null;
  }
}

function makeLevelQuestion() {
  return currentLevel().makeQuestion();
}

function nextQuestion() {
  clearAutoAdvance();
  if (game.finished) {
    return;
  }
  game.current = makeLevelQuestion();
  game.typedAnswer = "";
  setFeedback("Pick the answer with the keyboard.");
  renderAll();
}

function clearAnswer() {
  if (game.finished) {
    return;
  }
  game.typedAnswer = "";
  answerDisplay.textContent = "Type the answer";
  setFeedback("Answer cleared.");
}

function appendDigit(digit) {
  if (game.finished || game.typedAnswer.length >= 2) {
    return;
  }
  if (game.typedAnswer === "0") {
    game.typedAnswer = digit;
  } else {
    game.typedAnswer += digit;
  }
  answerDisplay.textContent = game.typedAnswer;
}

function goToNextLevel() {
  if (game.levelIndex === levels.length - 1) {
    game.finished = true;
    showSurprise("game-complete");
    setFeedback("Amazing work. All five levels are complete.", "is-success");
    renderAll();
    return;
  }

  game.levelIndex += 1;
  game.correctInLevel = 0;
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
    setFeedback("Press number keys first.", "is-try");
    return;
  }

  const typedValue = Number(game.typedAnswer);
  if (typedValue === game.current.answer) {
    clearAutoAdvance();
    game.stars += 1;
    game.correctInLevel += 1;
    game.totalCorrect += 1;
    showSurprise("correct");
    setFeedback(
      `Great job, Isha! ${game.current.a} + ${game.current.b} = ${game.current.answer}.`,
      "is-success"
    );
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

  setFeedback("Nice try. Count both groups again and type the total.", "is-try");
}

function handleKeydown(event) {
  if (event.key >= "0" && event.key <= "9") {
    appendDigit(event.key);
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
    game.typedAnswer = game.typedAnswer.slice(0, -1);
    answerDisplay.textContent = game.typedAnswer === "" ? "Type the answer" : game.typedAnswer;
    return;
  }

  if (event.key === "n" || event.key === "N") {
    nextQuestion();
  }
}

checkAnswerButton.addEventListener("click", checkAnswer);
newQuestionButton.addEventListener("click", nextQuestion);
clearAnswerButton.addEventListener("click", clearAnswer);
window.addEventListener("keydown", handleKeydown);

nextQuestion();

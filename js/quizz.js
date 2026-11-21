// BLIND SPOT INSIGHTS
// MODULE 4 - QUIZ AND RESULT
// Complete quiz.js

function q(text, options, answer, explanation) {
  return { text, options, answer, explanation };
}

const quizBank = {
  "computer-science": {
    "programming-basics": [
      q("What is a variable?", ["Storage location for data", "Computer virus", "Network device", "Printer"], 0, "A variable stores data."),
      q("Which statement is used for decisions?", ["for", "if", "print", "return"], 1, "An if statement checks a condition."),
      q("What is a loop used for?", ["Deleting files", "Storing passwords", "Repeating instructions", "Connecting Wi-Fi"], 2, "Loops repeat instructions."),
      q("Which data type stores text?", ["Boolean", "Integer", "Float", "String"], 3, "A string stores text."),
      q("What is a function?", ["Reusable block of code", "Hardware device", "Network", "Database"], 0, "Functions contain reusable instructions.")
    ],

    "database-fundamentals": [
      q("What does DBMS stand for?", ["Data Backup Management", "Database Management System", "Digital Basic Memory", "Database Machine Software"], 1, "DBMS means Database Management System."),
      q("How is relational data organised?", ["Pictures", "Folders", "Tables", "Slides"], 2, "Relational databases use tables."),
      q("What uniquely identifies a record?", ["Foreign key", "Table name", "Column heading", "Primary key"], 3, "A primary key uniquely identifies a row."),
      q("Which language manages relational databases?", ["SQL", "HTML", "CSS", "XML"], 0, "SQL manages relational database data."),
      q("What does a database row represent?", ["Column", "Record", "Server", "Query"], 1, "A row represents a record.")
    ],

    "computer-networks": [
      q("What does LAN stand for?", ["Long Access Network", "Linked Area Node", "Local Area Network", "Large Access Number"], 2, "LAN means Local Area Network."),
      q("Which device connects different networks?", ["Keyboard", "Monitor", "Mouse", "Router"], 3, "A router forwards data between networks."),
      q("What identifies a device on an IP network?", ["IP address", "Printer", "Program", "Laptop charger"], 0, "An IP address identifies a network interface."),
      q("Which network covers a large geographical area?", ["LAN", "WAN", "PAN", "None"], 1, "WAN means Wide Area Network."),
      q("What is a network protocol?", ["Cable", "Computer brand", "Communication rules", "Storage device"], 2, "Protocols define communication rules.")
    ]
  },

  "machine-learning": {
    "ml-introduction": [
      q("What is Machine Learning?", ["Keyboard type", "Repair method", "Web language", "Learning patterns from data"], 3, "Machine Learning learns patterns from data."),
      q("What is training data used for?", ["Teaching a model", "Printing reports", "Connecting networks", "Formatting disks"], 0, "Training data teaches models."),
      q("What is a feature?", ["Final score", "Input variable", "Website theme", "Processor"], 1, "Features are model input variables."),
      q("What is a label?", ["File extension", "Programming loop", "Target output", "Network address"], 2, "A label is the target output."),
      q("Why is test data used?", ["Rename algorithms", "Delete data", "Increase brightness", "Evaluate performance"], 3, "Test data evaluates unseen examples.")
    ],

    "types-of-ml": [
      q("Which learning uses labelled data?", ["Supervised", "Unsupervised", "Reinforcement", "None"], 0, "Supervised learning uses labelled data."),
      q("Which learning finds patterns in unlabelled data?", ["Supervised", "Unsupervised", "Manual", "Rule-based"], 1, "Unsupervised learning finds hidden patterns."),
      q("Which learning uses rewards?", ["Regression", "Clustering", "Reinforcement", "Classification"], 2, "Reinforcement learning uses rewards."),
      q("Grouping similar customers is called?", ["Image editing", "Formatting", "Classification", "Clustering"], 3, "Clustering groups similar data."),
      q("Predicting house prices is an example of?", ["Supervised learning", "Unsupervised", "Reinforcement", "Random grouping"], 0, "Regression is supervised learning.")
    ],

    "ml-algorithms": [
      q("Which algorithm predicts numerical values?", ["K-Means", "Linear Regression", "Apriori", "BFS"], 1, "Linear Regression predicts numerical values."),
      q("Which algorithm uses decision branches?", ["K-Means", "Regression", "Decision Tree", "Bubble Sort"], 2, "Decision Trees use decision rules."),
      q("What does KNN use?", ["Random values", "Time", "Database keys", "Nearby examples"], 3, "KNN uses nearby examples."),
      q("Which algorithm performs clustering?", ["K-Means", "Regression", "Binary Search", "Merge Sort"], 0, "K-Means groups observations."),
      q("Predicting spam or not spam is?", ["Clustering", "Classification", "Sorting", "Compression"], 1, "Classification predicts categories.")
    ]
  },

  "english": {
    "english-grammar": [
      q("Which word is a noun?", ["Quickly", "Beautiful", "Teacher", "Run"], 2, "Teacher names a person."),
      q("Which word is a pronoun?", ["School", "Write", "Happy", "She"], 3, "She is a pronoun."),
      q("Which word is a verb?", ["Read", "Blue", "Table", "Soft"], 0, "Read describes an action."),
      q("What does an adjective describe?", ["Numbers only", "Noun or pronoun", "Punctuation", "Network"], 1, "Adjectives describe nouns or pronouns."),
      q("What is beautifully in 'She sings beautifully'?", ["Noun", "Pronoun", "Adverb", "Article"], 2, "Beautifully is an adverb.")
    ],

    "english-vocabulary": [
      q("What is a synonym of happy?", ["Angry", "Tired", "Sad", "Joyful"], 3, "Joyful means happy."),
      q("What is the opposite of hot?", ["Cold", "Warm", "Heated", "Boiling"], 0, "Cold is the opposite of hot."),
      q("What are context clues?", ["Page numbers", "Hints in surrounding text", "Spelling mistakes", "Punctuation"], 1, "Context clues help understand words."),
      q("Where does a prefix appear?", ["Sentence end", "Paragraph middle", "Beginning of a word", "After punctuation"], 2, "A prefix comes before a word."),
      q("Where does a suffix appear?", ["Before a paragraph", "Word beginning", "Before a noun", "Word ending"], 3, "A suffix comes at the end of a word.")
    ],

    "english-communication": [
      q("What is active listening?", ["Paying attention", "Interrupting", "Ignoring", "Speaking continuously"], 0, "Active listening means listening carefully."),
      q("What improves spoken communication?", ["Speaking without pauses", "Clear pronunciation", "Avoiding eye contact", "Unfamiliar words"], 1, "Clear pronunciation improves understanding."),
      q("What improves reading comprehension?", ["Skipping paragraphs", "Memorising punctuation", "Identifying main ideas", "Avoiding new words"], 2, "Finding main ideas improves comprehension."),
      q("What is an important benefit of writing?", ["Internet speed", "Replacing communication", "Avoiding vocabulary", "Organising ideas"], 3, "Writing helps organise ideas."),
      q("Why is feedback useful?", ["Identifies improvements", "Removes listening", "Prevents questions", "Replaces practice"], 0, "Feedback helps improve communication.")
    ]
  }
};

// APPLICATION STATE

const TOTAL_SECONDS = 30;
const LETTERS = ["A", "B", "C", "D"];

let currentUser = null;
let subjectId = null;
let topicId = null;
let questions = [];
let questionIndex = 0;
let selectedAnswer = null;
let secondsLeft = TOTAL_SECONDS;
let timerId = null;
let answers = [];
let quizFinished = false;
let questionLocked = false;

// DOM HELPER

function getElement(id) {
  return document.getElementById(id);
}

function setText(id, value) {
  const element = getElement(id);
  if (element) element.textContent = value;
}

// INITIALISE

function initQuiz() {
  try {
    const currentUserData = JSON.parse(
  localStorage.getItem("bsi_currentUser") || "null"
);

if (!currentUserData) {
  window.location.replace("quizz.html");
  return;
}

currentUser = currentUserData;

    currentUser = Storage.getCurrentUser();

    if (!currentUser) {
      window.location.replace("quizz.html");
      return;
    }

    const users = Storage.getUsers();
    const savedUser = Array.isArray(users)
      ? users.find(user => user.id === currentUser.id)
      : null;

    if (!savedUser) {
      window.location.replace("quizz.html");
      return;
    }

    currentUser = savedUser;

    subjectId = localStorage.getItem("bsi_activeSubject");
    topicId = localStorage.getItem("bsi_activeTopic");
    console.log("Subject ID:", subjectId);
console.log("Topic ID:", topicId);
console.log("Quiz Bank:", quizBank[subjectId]);

    if (!subjectId || !topicId ||
        !quizBank[subjectId] ||
        !quizBank[subjectId][topicId]) {
      showSetupError("Topic not found. Please select a topic from Subject Learning.");
      return;
    }

    questions = quizBank[subjectId][topicId];

    const subjectNames = {
      "computer-science": "Computer Science",
      "machine-learning": "Machine Learning",
      "english": "English"
    };

    const topicNames = {
      "programming-basics": "Programming Basics",
      "database-fundamentals": "Database Fundamentals",
      "computer-networks": "Computer Networks",
      "ml-introduction": "Introduction to Machine Learning",
      "types-of-ml": "Types of Machine Learning",
      "ml-algorithms": "Machine Learning Algorithms",
      "english-grammar": "English Grammar",
      "english-vocabulary": "Vocabulary Development",
      "english-communication": "Communication Skills"
    };

    setText("headerName", currentUser.name || "Student");
    setText("userAvatar", (currentUser.name || "S").charAt(0).toUpperCase());
    setText("subjectTitle", subjectNames[subjectId]);
    setText("topicTitle", topicNames[topicId]);
    setText("topicSubtitle", topicNames[topicId] + " · 5 Questions");

    getElement("nextBtn").addEventListener("click", submitAnswer);
    getElement("skipBtn").addEventListener("click", skipQuestion);

    getElement("learningBtn").addEventListener("click", () => {
      window.location.href = "learning.html";
    });

    getElement("explanationBtn").addEventListener("click", () => {
      window.location.href = "explanation.html";
    });

    getElement("logoutBtn").addEventListener("click", () => {
      stopTimer();
      Storage.logout();
      localStorage.removeItem("bsi_activeSubject");
      localStorage.removeItem("bsi_activeTopic");
      window.location.replace("quizz.html");
    });

    showQuestion();

  } catch (error) {
    console.error("Quiz initialisation error:", error);
    showSetupError("Unable to load quiz. Check browser console and storage.js.");
  }
}

function showSetupError(message) {
  setText("questionText", message);
  setText("selectionHint", "Please return to Subject Learning and try again.");
  getElement("nextBtn").disabled = true;
  getElement("skipBtn").disabled = true;
}

// DISPLAY QUESTION

function showQuestion() {
  stopTimer();

  if (questionIndex >= questions.length) {
    finishQuiz();
    return;
  }

  questionLocked = false;
  selectedAnswer = null;
  secondsLeft = TOTAL_SECONDS;

  const question = questions[questionIndex];

  setText("questionCounter",
    `Question ${questionIndex + 1} of ${questions.length}`);

  setText("questionLabel",
    `QUESTION ${String(questionIndex + 1).padStart(2, "0")}`);

  setText("questionText", question.text);

  const percent = Math.round(
    questionIndex / questions.length * 100
  );

  setText("progressPercent", percent + "%");
  getElement("progressFill").style.width = percent + "%";

  setText("selectionHint", "Select an answer or skip this question.");

  const nextButton = getElement("nextBtn");
  nextButton.disabled = true;
  nextButton.textContent =
    questionIndex === questions.length - 1
      ? "Finish Quiz →"
      : "Next Question →";

  const container = getElement("optionsContainer");
  container.replaceChildren();

  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-btn";

    const letter = document.createElement("span");
    letter.className = "option-letter";
    letter.textContent = LETTERS[index];

    const optionText = document.createElement("span");
    optionText.textContent = option;

    button.append(letter, optionText);

    button.addEventListener("click", () => {
      selectAnswer(index);
    });

    container.appendChild(button);
  });

  updateTimerDisplay();
  startTimer();
}

// SELECT ANSWER

function selectAnswer(index) {
  if (questionLocked || quizFinished) return;

  selectedAnswer = index;

  document.querySelectorAll(".option-btn").forEach((button, i) => {
    button.classList.toggle("selected", i === index);
  });

  getElement("nextBtn").disabled = false;
  setText("selectionHint", "Answer selected. Click Next to continue.");
}

// TIMER

function updateTimerDisplay() {
  setText("timeLeft", secondsLeft);
  getElement("timer").classList.toggle(
    "warning",
    secondsLeft <= 10
  );
}

function startTimer() {
  stopTimer();

  const deadline = Date.now() + TOTAL_SECONDS * 1000;

  timerId = setInterval(() => {
    if (questionLocked || quizFinished) return;

    secondsLeft = Math.max(
      0,
      Math.ceil((deadline - Date.now()) / 1000)
    );

    updateTimerDisplay();

    if (secondsLeft === 0) {
      recordAnswer("timeout");
    }
  }, 250);
}

function stopTimer() {
  if (timerId !== null) {
    clearInterval(timerId);
    timerId = null;
  }
}

// ANSWERS

function submitAnswer() {
  if (selectedAnswer === null) return;
  recordAnswer("answered");
}

function skipQuestion() {
  recordAnswer("skipped");
}

function recordAnswer(status) {
  if (questionLocked || quizFinished) return;

  questionLocked = true;
  stopTimer();

  const question = questions[questionIndex];

  const selectedIndex =
    status === "answered" ? selectedAnswer : null;

  const isCorrect =
    status === "answered" &&
    selectedIndex === question.answer;

  answers.push({
    questionId: `${topicId}-q${questionIndex + 1}`,
    topicId,
    question: question.text,
    options: [...question.options],
    selectedAnswer: selectedIndex === null
      ? null
      : question.options[selectedIndex],
    selectedIndex,
    correctAnswer: question.options[question.answer],
    correctIndex: question.answer,
    explanation: question.explanation,
    status,
    isCorrect
  });

  questionIndex++;

  if (questionIndex >= questions.length) {
    finishQuiz();
  } else {
    showQuestion();
  }
}

// SAVE RESULT

function finishQuiz() {
  if (quizFinished) return;

  quizFinished = true;
  stopTimer();

  const correctCount = answers.filter(a => a.isCorrect).length;
  const wrongCount = answers.filter(
    a => a.status === "answered" && !a.isCorrect
  ).length;
  const skippedCount = answers.filter(a => a.status === "skipped").length;
  const timeoutCount = answers.filter(a => a.status === "timeout").length;

  const accuracy = Math.round(
    correctCount / questions.length * 100
  );

  const attempt = {
    id: "attempt-" + Date.now(),
    userId: currentUser.id,
    subjectId,
    topicId,
    correctCount,
    wrongCount,
    skippedCount,
    timeoutCount,
    totalQuestions: questions.length,
    accuracy,
    answers,
    mistakes: answers.filter(a => !a.isCorrect),
    completedAt: new Date().toISOString()
  };

  try {
    const previous = JSON.parse(
      localStorage.getItem("bsi_quizAttempts") || "[]"
    );

    const attempts = Array.isArray(previous) ? previous : [];
    attempts.push(attempt);

    localStorage.setItem("bsi_quizAttempts", JSON.stringify(attempts));
    localStorage.setItem("bsi_latestQuizAttempt", JSON.stringify(attempt));

  } catch (error) {
    console.error("Unable to save quiz:", error);
    alert("Quiz completed, but saving failed. Check browser storage.");
  }

  displayResult(attempt);
}

// RESULT SCREEN

function displayResult(attempt) {
  getElement("quizScreen").hidden = true;
  getElement("resultScreen").hidden = false;

  setText("resultSubtitle",
    `${attempt.correctCount} out of ${attempt.totalQuestions} correct`);

  setText("scorePercent", attempt.accuracy + "%");

  getElement("scoreCircle").style.background =
    `conic-gradient(#54258c ${attempt.accuracy}%, #eee7fa ${attempt.accuracy}%)`;

  setText("correctStat", attempt.correctCount);
  setText("wrongStat", attempt.wrongCount);
  setText("skippedStat", attempt.skippedCount);
  setText("timeoutStat", attempt.timeoutCount);

  let message;

  if (attempt.accuracy === 100) {
    message = "Excellent! You answered every question correctly.";
  } else if (attempt.accuracy >= 60) {
    message = "Good progress! Review your mistakes to improve.";
  } else {
    message = "Keep learning! Review the explanations and try again.";
  }

  setText("resultMessage", message);

  getElement("explanationBtn").hidden =
    attempt.mistakes.length === 0;

  window.scrollTo(0, 0);
}

// START APPLICATION

document.addEventListener("DOMContentLoaded", initQuiz);
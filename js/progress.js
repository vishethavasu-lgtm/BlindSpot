// BLIND SPOT INSIGHTS
// MODULE 6 - PROGRESS REPORT

const subjects = [
  {
    id: "computer-science",
    name: "Computer Science",
    icon: "⌘"
  },
  {
    id: "machine-learning",
    name: "Machine Learning",
    icon: "✦"
  },
  {
    id: "english",
    name: "English",
    icon: "Aa"
  }
];

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

let currentUser = null;
let userAttempts = [];

// INITIALISE
function initProgress() {
  if (typeof Storage === "undefined") {
    console.error("Shared storage.js is missing.");
    return;
  }

  currentUser = Storage.getCurrentUser();

  if (!currentUser) {
    window.location.replace("index.html");
    return;
  }

  const users = Storage.getUsers();

  const savedUser = users.find(
    user => user.id === currentUser.id
  );

  if (!savedUser) {
    Storage.logout();
    window.location.replace("index.html");
    return;
  }

  currentUser = savedUser;

  document.getElementById("headerName").textContent =
    currentUser.name;

  document.getElementById("userAvatar").textContent =
    currentUser.name.charAt(0).toUpperCase();

  document.getElementById("logoutBtn")
    .addEventListener("click", function() {
      Storage.logout();
      localStorage.removeItem("bsi_activeSubject");
      localStorage.removeItem("bsi_activeTopic");
      window.location.replace("index.html");
    });

  loadQuizAttempts();

  renderOverview();
  renderSubjectPerformance();
  renderWeakTopics();
  renderQuizHistory();
}

// LOAD STUDENT-SPECIFIC QUIZ ATTEMPTS
function loadQuizAttempts() {
  let allAttempts = [];

  try {
    const stored = JSON.parse(
      localStorage.getItem("bsi_quizAttempts") || "[]"
    );

    allAttempts = Array.isArray(stored) ? stored : [];
  } catch (error) {
    console.error("Invalid quiz history:", error);
    allAttempts = [];
  }

  userAttempts = allAttempts.filter(
    attempt =>
      attempt &&
      attempt.userId === currentUser.id &&
      Number.isFinite(attempt.correctCount) &&
      Number.isFinite(attempt.totalQuestions) &&
      attempt.totalQuestions > 0
  );
}

// CALCULATE ACCURACY
function calculateAccuracy(correct, total) {
  if (total === 0) return 0;

  return Math.round((correct / total) * 100);
}

// OVERALL PERFORMANCE
function renderOverview() {
  const totalQuizzes = userAttempts.length;

  const totalCorrect = userAttempts.reduce(
    (sum, attempt) => sum + attempt.correctCount,
    0
  );

  const totalQuestions = userAttempts.reduce(
    (sum, attempt) => sum + attempt.totalQuestions,
    0
  );

  const accuracy = calculateAccuracy(
    totalCorrect,
    totalQuestions
  );

  document.getElementById("totalQuizzes").textContent =
    totalQuizzes;

  document.getElementById("totalCorrect").textContent =
    totalCorrect;

  document.getElementById("totalQuestions").textContent =
    totalQuestions;

  document.getElementById("overallAccuracy").textContent =
    accuracy + "%";

  document.getElementById("accuracyCircle").style.background =
    `conic-gradient(
      #54258c ${accuracy}%,
      #eee7fa ${accuracy}%
    )`;
}

// SUBJECT PERFORMANCE
function renderSubjectPerformance() {
  const container =
    document.getElementById("subjectPerformance");

  container.innerHTML = "";

  subjects.forEach(function(subject) {
    const attempts = userAttempts.filter(
      attempt => attempt.subjectId === subject.id
    );

    const correct = attempts.reduce(
      (sum, attempt) => sum + attempt.correctCount,
      0
    );

    const total = attempts.reduce(
      (sum, attempt) => sum + attempt.totalQuestions,
      0
    );

    const accuracy = calculateAccuracy(correct, total);

    const card = document.createElement("article");
    card.className = "subject-card";

    const header = document.createElement("div");
    header.className = "subject-card-header";

    const icon = document.createElement("div");
    icon.className = "subject-icon";
    icon.textContent = subject.icon;

    const titleBox = document.createElement("div");

    const title = document.createElement("h3");
    title.textContent = subject.name;

    const subtitle = document.createElement("small");
    subtitle.textContent =
      attempts.length +
      (attempts.length === 1 ? " Quiz" : " Quizzes");

    titleBox.append(title, subtitle);
    header.append(icon, titleBox);

    const score = document.createElement("div");
    score.className = "subject-score";

    const scoreLabel = document.createElement("span");
    scoreLabel.textContent = "Accuracy";

    const scoreValue = document.createElement("strong");
    scoreValue.textContent = accuracy + "%";

    score.append(scoreLabel, scoreValue);

    const track = document.createElement("div");
    track.className = "subject-track";

    const fill = document.createElement("div");
    fill.className = "subject-fill";
    fill.style.width = accuracy + "%";

    track.appendChild(fill);

    const footer = document.createElement("p");
    footer.className = "subject-footer";
    footer.textContent =
      total === 0
        ? "No quizzes completed yet"
        : `${correct} correct out of ${total} questions`;

    card.append(header, score, track, footer);
    container.appendChild(card);
  });
}

// WEAK TOPICS
function getWeakTopics() {
  const topicStats = {};

  userAttempts.forEach(function(attempt) {
    if (!attempt.subjectId || !attempt.topicId) return;

    const key = attempt.subjectId + "::" + attempt.topicId;

    if (!topicStats[key]) {
      topicStats[key] = {
        subjectId: attempt.subjectId,
        topicId: attempt.topicId,
        attempts: 0,
        correct: 0,
        total: 0
      };
    }

    topicStats[key].attempts++;
    topicStats[key].correct += attempt.correctCount;
    topicStats[key].total += attempt.totalQuestions;
  });

  return Object.values(topicStats)
    .map(function(topic) {
      return {
        ...topic,
        accuracy: calculateAccuracy(
          topic.correct,
          topic.total
        )
      };
    })
    .filter(function(topic) {
      // A topic becomes weak only after 3 quiz attempts.
      // Compare the unrounded ratio with 50%.
      return (
        topic.attempts >= 3 &&
        topic.total > 0 &&
        topic.correct / topic.total < 0.5
      );
    })
    .sort(function(a, b) {
      return a.accuracy - b.accuracy;
    });
}

// DISPLAY WEAK TOPICS
function renderWeakTopics() {
  const container =
    document.getElementById("weakTopicsContainer");

  container.innerHTML = "";

  const weakTopics = getWeakTopics();

  document.getElementById("weakTopicsCount").textContent =
    weakTopics.length;

  if (weakTopics.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-message";

    empty.textContent =
      "No weak topics identified yet. A topic is evaluated " +
      "after at least 3 completed quiz attempts.";

    container.appendChild(empty);
    return;
  }

  weakTopics.forEach(function(topic) {
    const subject = subjects.find(
      item => item.id === topic.subjectId
    );

    const card = document.createElement("article");
    card.className = "weak-card";

    const header = document.createElement("div");
    header.className = "weak-card-header";

    const title = document.createElement("h3");
    title.textContent =
      topicNames[topic.topicId] || topic.topicId;

    const badge = document.createElement("span");
    badge.className = "weak-badge";
    badge.textContent = topic.accuracy + "% Accuracy";

    header.append(title, badge);

    const description = document.createElement("p");
    description.textContent =
      (subject ? subject.name : "Subject") +
      " · " +
      topic.attempts +
      " completed quiz attempts";

    const track = document.createElement("div");
    track.className = "weak-track";

    const fill = document.createElement("div");
    fill.className = "weak-fill";
    fill.style.width = topic.accuracy + "%";

    track.appendChild(fill);

    card.append(header, description, track);
    container.appendChild(card);
  });
}

// QUIZ HISTORY
function renderQuizHistory() {
  const tbody = document.getElementById("historyBody");
  const empty = document.getElementById("historyEmpty");

  tbody.innerHTML = "";

  if (userAttempts.length === 0) {
    empty.hidden = false;
    return;
  }

  empty.hidden = true;

  const sortedAttempts = [...userAttempts].sort(
    (a, b) =>
      new Date(b.completedAt || 0) -
      new Date(a.completedAt || 0)
  );

  sortedAttempts.forEach(function(attempt) {
    const subject = subjects.find(
      item => item.id === attempt.subjectId
    );

    const subjectName = subject
      ? subject.name
      : "Unknown Subject";

    const topicName =
      topicNames[attempt.topicId] || "Unknown Topic";

    const date = attempt.completedAt
      ? new Date(attempt.completedAt)
      : null;

    const dateText =
      date && !Number.isNaN(date.getTime())
        ? date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
          })
        : "Unknown";

    const accuracy = calculateAccuracy(
      attempt.correctCount,
      attempt.totalQuestions
    );

    const row = document.createElement("tr");

    const subjectCell = document.createElement("td");
    subjectCell.textContent = subjectName;

    const topicCell = document.createElement("td");
    topicCell.textContent = topicName;

    const dateCell = document.createElement("td");
    dateCell.textContent = dateText;

    const scoreCell = document.createElement("td");
    scoreCell.className = "score-text";
    scoreCell.textContent =
      `${attempt.correctCount}/${attempt.totalQuestions}`;

    const accuracyCell = document.createElement("td");

    const pill = document.createElement("span");
    pill.className = "accuracy-pill";
    pill.textContent = accuracy + "%";

    accuracyCell.appendChild(pill);

    row.append(
      subjectCell,
      topicCell,
      dateCell,
      scoreCell,
      accuracyCell
    );

    tbody.appendChild(row);
  });
}

// START
document.addEventListener("DOMContentLoaded", initProgress);
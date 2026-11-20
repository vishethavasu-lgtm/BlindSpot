// BLIND SPOT INSIGHTS
// MODULE 5 - EXPLANATION

let currentUser = null;
let latestAttempt = null;

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

// INITIALISE MODULE
function initExplanation() {
  if (typeof Storage === "undefined") {
    showEmpty(
      "The shared storage file is missing. Please check storage.js."
    );
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

  document.getElementById("learningBtn")
    .addEventListener("click", function() {
      window.location.href = "learning.html";
    });

  document.getElementById("dashboardBtn")
    .addEventListener("click", function() {
      window.location.href = "dashboard.html";
    });

  document.getElementById("logoutBtn")
    .addEventListener("click", function() {
      Storage.logout();
      localStorage.removeItem("bsi_activeSubject");
      localStorage.removeItem("bsi_activeTopic");
      window.location.replace("index.html");
    });

  loadLatestAttempt();
}

// LOAD QUIZ RESULT FROM MODULE 4
function loadLatestAttempt() {
  let savedAttempt = null;

  try {
    savedAttempt = JSON.parse(
      localStorage.getItem("bsi_latestQuizAttempt") || "null"
    );
  } catch (error) {
    console.error("Invalid quiz data:", error);
  }

  // Never display another student's result.
  if (
    !savedAttempt ||
    savedAttempt.userId !== currentUser.id ||
    !Array.isArray(savedAttempt.answers)
  ) {
    showEmpty(
      "No recent quiz result is available. Complete a quiz first."
    );
    return;
  }

  latestAttempt = savedAttempt;

  // Preserve the subject and topic for Back to Learning.
  localStorage.setItem(
    "bsi_activeSubject",
    latestAttempt.subjectId
  );

  localStorage.setItem(
    "bsi_activeTopic",
    latestAttempt.topicId
  );

  displaySummary();
  displayMistakes();
}

// DISPLAY QUIZ SUMMARY
function displaySummary() {
  const subject =
    subjectNames[latestAttempt.subjectId] || "Subject";

  const topic =
    topicNames[latestAttempt.topicId] || "Topic";

  document.getElementById("subjectTopic").textContent =
    subject + " · " + topic;

  document.getElementById("totalQuestions").textContent =
    latestAttempt.totalQuestions;

  document.getElementById("correctCount").textContent =
    latestAttempt.correctCount;

  const mistakes = latestAttempt.answers.filter(
    answer => !answer.isCorrect
  );

  document.getElementById("mistakeCount").textContent =
    mistakes.length;

  document.getElementById("reviewCount").textContent =
    mistakes.length +
    (mistakes.length === 1 ? " Mistake" : " Mistakes");
}

// DISPLAY ONLY INCORRECT ANSWERS
function displayMistakes() {
  const container =
    document.getElementById("mistakesContainer");

  container.innerHTML = "";

  const mistakes = latestAttempt.answers.filter(
    answer => !answer.isCorrect
  );

  if (mistakes.length === 0) {
    showEmpty(
      "Excellent! You answered all five questions correctly."
    );
    return;
  }

  document.getElementById("emptyState").hidden = true;

  mistakes.forEach(function(mistake, index) {
    const card = document.createElement("article");
    card.className = "mistake-card";

    // HEADER
    const header = document.createElement("div");
    header.className = "mistake-header";

    const number = document.createElement("span");
    number.className = "mistake-number";
    number.textContent =
      "MISTAKE " + String(index + 1).padStart(2, "0");

    const status = document.createElement("span");
    status.className = "mistake-status";

    if (mistake.status === "skipped") {
      status.classList.add("skipped");
      status.textContent = "Skipped";
    } else if (mistake.status === "timeout") {
      status.classList.add("timeout");
      status.textContent = "Time Out";
    } else {
      status.textContent = "Incorrect";
    }

    header.append(number, status);

    // QUESTION
    const question = document.createElement("h3");
    question.className = "mistake-question";
    question.textContent = mistake.question;

    // ANSWER COMPARISON
    const comparison = document.createElement("div");
    comparison.className = "answer-comparison";

    const yourAnswer = createAnswerBox(
      "YOUR ANSWER",
      mistake.status === "skipped"
        ? "Question skipped"
        : mistake.status === "timeout"
          ? "Time expired"
          : mistake.selectedAnswer || "No answer",
      "incorrect"
    );

    const correctAnswer = createAnswerBox(
      "CORRECT ANSWER",
      mistake.correctAnswer,
      "correct"
    );

    comparison.append(yourAnswer, correctAnswer);

    // EXPLANATION
    const explanation = document.createElement("div");
    explanation.className = "explanation-box";

    const explanationTitle = document.createElement("h4");
    explanationTitle.textContent = "Why is this correct?";

    const explanationText = document.createElement("p");
    explanationText.textContent =
      mistake.explanation ||
      "Review the correct answer and revisit the learning notes.";

    explanation.append(explanationTitle, explanationText);

    // ADDITIONAL GUIDANCE
    if (mistake.status === "skipped") {
      const hint = document.createElement("p");
      hint.textContent =
        "You skipped this question. Review the concept " +
        "before your next attempt.";
      explanation.appendChild(hint);
    } else if (mistake.status === "timeout") {
      const hint = document.createElement("p");
      hint.textContent =
        "The time limit ended before you submitted an answer. " +
        "Practise this concept to answer more confidently.";
      explanation.appendChild(hint);
    } else {
      const hint = document.createElement("p");
      hint.textContent =
        "Your selected answer was not correct. " +
        "Compare it with the correct answer and the explanation above.";
      explanation.appendChild(hint);
    }

    card.append(
      header,
      question,
      comparison,
      explanation
    );

    container.appendChild(card);
  });
}

// REUSABLE ANSWER BOX
function createAnswerBox(label, value, type) {
  const box = document.createElement("div");
  box.className = "answer-box " + type;

  const labelElement = document.createElement("span");
  labelElement.textContent = label;

  const valueElement = document.createElement("strong");
  valueElement.textContent = value;

  box.append(labelElement, valueElement);

  return box;
}

// EMPTY STATE
function showEmpty(message) {
  document.getElementById("mistakesContainer").innerHTML = "";

  document.getElementById("emptyState").hidden = false;
  document.getElementById("emptyMessage").textContent =
    message;

  if (!latestAttempt) {
    document.getElementById("subjectTopic").textContent =
      "No completed quiz available";

    document.getElementById("reviewCount").textContent =
      "0 Mistakes";
  }
}

// START
document.addEventListener("DOMContentLoaded", initExplanation);
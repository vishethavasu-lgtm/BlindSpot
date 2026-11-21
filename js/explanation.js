(function () {
  "use strict";

  // =====================================
  // EXPLANATIONS FOR 30 QUESTIONS
  // =====================================

  const BANK = [];

  function add(question, options, reasons) {
    const map = {};

    options.forEach((option, index) => {
      map[normalize(option)] = reasons[index];
    });

    BANK.push({
      question: normalize(question),
      reasons: map
    });
  }

  function normalize(text) {
    return String(text ?? "")
      .toLowerCase()
      .replace(/[?.!,]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  // COMPUTER SCIENCE

  add(
    "Who is known as the Father of the Computer?",
    ["Alan Turing", "Charles Babbage", "Bill Gates", "Steve Jobs"],
    [
      "Alan Turing helped develop computer science, but Charles Babbage is traditionally called the Father of the Computer.",
      "Charles Babbage designed early mechanical computing machines and is known as the Father of the Computer.",
      "Bill Gates co-founded Microsoft. He is not known as the Father of the Computer.",
      "Steve Jobs co-founded Apple and helped popularize personal computers."
    ]
  );

  add(
    "What does CPU stand for?",
    ["Central Processing Unit", "Computer Power Unit", "Central Program Unit", "Control Processing Utility"],
    [
      "Central Processing Unit is the correct expansion of CPU. It executes instructions.",
      "Computer Power Unit is not the full form of CPU.",
      "Central Program Unit is not the correct expansion.",
      "Control Processing Utility is not the correct expansion."
    ]
  );

  add(
    "What is RAM?",
    ["Permanent storage", "Temporary working memory", "An output device", "An operating system"],
    [
      "RAM is volatile and does not provide permanent storage.",
      "RAM temporarily holds programs and data being used by the computer.",
      "RAM is memory, not an output device.",
      "RAM is hardware memory, not an operating system."
    ]
  );

  add(
    "Which device is used to enter data into a computer?",
    ["Monitor", "Speaker", "Keyboard", "Printer"],
    [
      "A monitor displays output rather than entering data.",
      "A speaker produces sound output.",
      "A keyboard allows users to enter text and commands.",
      "A printer produces physical output on paper."
    ]
  );

  add(
    "Which of these is an operating system?",
    ["Python", "Windows", "HTML", "Google Chrome"],
    [
      "Python is a programming language, not an operating system.",
      "Windows is an operating system that manages hardware and software.",
      "HTML is a markup language used to structure web pages.",
      "Google Chrome is a web browser, not an operating system."
    ]
  );

  add(
    "What does HTML stand for?",
    ["HyperText Markup Language", "HighText Machine Language", "Hyper Transfer Main Link", "Home Tool Markup Language"],
    [
      "HTML stands for HyperText Markup Language and structures web content.",
      "HTML is not a machine language.",
      "Hyper Transfer Main Link is not the full form of HTML.",
      "Home Tool Markup Language is not the correct expansion."
    ]
  );

  add(
    "Which of these is a programming language?",
    ["Mouse", "Python", "Monitor", "Printer"],
    [
      "A mouse is an input device, not a programming language.",
      "Python is a programming language used to create applications.",
      "A monitor is an output device.",
      "A printer is an output device."
    ]
  );

  add(
    "What is computer hardware?",
    ["Physical computer components", "Software instructions", "Internet websites", "Computer files"],
    [
      "Hardware includes physical components such as the keyboard and processor.",
      "Software instructions are programs, not hardware.",
      "Websites are digital content, not physical computer components.",
      "Computer files contain information stored digitally."
    ]
  );

  add(
    "What is software?",
    ["A computer screen", "Programs and instructions", "A keyboard", "A power cable"],
    [
      "A screen is hardware because it is a physical device.",
      "Software consists of programs and instructions executed by computers.",
      "A keyboard is physical hardware.",
      "A power cable is a physical component."
    ]
  );

  add(
    "What is the main function of a computer?",
    ["Playing games", "Processing data", "Printing", "Browsing websites"],
    [
      "Playing games is only one possible computer activity.",
      "A computer processes data and produces useful information.",
      "Printing is one specific output activity.",
      "Browsing websites is one application of a computer."
    ]
  );

  // MACHINE LEARNING

  add(
    "What is Machine Learning?",
    ["A branch of AI that learns from data", "Computer repair", "A programming language", "A hardware device"],
    [
      "Machine learning is a field of AI in which models learn patterns from data.",
      "Computer repair deals with maintaining computer hardware and software.",
      "Machine learning is a field of study, not a programming language.",
      "Machine learning is not a physical hardware device."
    ]
  );

  add(
    "What does AI stand for?",
    ["Automated Internet", "Artificial Intelligence", "Advanced Input", "Automatic Information"],
    [
      "Automated Internet is not the full form of AI.",
      "Artificial Intelligence refers to systems that perform tasks associated with intelligence.",
      "Advanced Input is not the expansion of AI.",
      "Automatic Information is not the full form of AI."
    ]
  );

  add(
    "What is supervised learning?",
    ["Learning from labeled data", "Learning without any data", "Learning only from rewards", "Learning from hardware"],
    [
      "Supervised learning trains models using examples with known labels.",
      "Supervised learning requires training examples.",
      "Learning through rewards is associated with reinforcement learning.",
      "Supervised learning uses labeled examples rather than learning from hardware."
    ]
  );

  add(
    "What is unsupervised learning?",
    ["Learning only with labels", "Finding patterns in unlabeled data", "Learning without computers", "Predicting prices"],
    [
      "Learning with labels is associated with supervised learning.",
      "Unsupervised learning finds patterns or groups in unlabeled data.",
      "Unsupervised learning uses computational methods.",
      "Predicting numerical prices is generally a regression task."
    ]
  );

  add(
    "What is reinforcement learning based on?",
    ["Rewards and penalties", "Only labeled images", "Keyboard input", "Website design"],
    [
      "Reinforcement learning uses rewards and feedback to improve decisions.",
      "Labeled images are often used in supervised learning.",
      "Keyboard input does not define reinforcement learning.",
      "Website design is not the learning mechanism."
    ]
  );

  add(
    "What is a dataset?",
    ["A collection of data", "A computer monitor", "A keyboard", "An operating system"],
    [
      "A dataset is an organized collection of data used for analysis or training.",
      "A monitor displays information.",
      "A keyboard is an input device.",
      "An operating system manages computer resources."
    ]
  );

  add(
    "What is training data used for?",
    ["Teaching a model patterns", "Printing documents", "Changing screen brightness", "Installing hardware"],
    [
      "Training data helps machine learning models learn patterns.",
      "Printing documents is unrelated to model training.",
      "Changing screen brightness is a display setting.",
      "Installing hardware is not the purpose of training data."
    ]
  );

  add(
    "Which is an example of classification?",
    ["Predicting a house price", "Identifying spam emails", "Predicting temperature", "Calculating distance"],
    [
      "Predicting a house price is generally regression because the output is numerical.",
      "Identifying spam emails is classification because it predicts categories.",
      "Predicting a numerical temperature is regression.",
      "Calculating distance produces a numerical measurement."
    ]
  );

  add(
    "What does regression predict?",
    ["Numerical values", "Only categories", "Only images", "Only file names"],
    [
      "Regression predicts numerical quantities such as prices or temperatures.",
      "Predicting categories is classification.",
      "Regression is not limited to images.",
      "Predicting file names does not define regression."
    ]
  );

  add(
    "What is overfitting?",
    ["Learning training data too closely", "Deleting training data", "Improving every prediction", "Stopping model training"],
    [
      "Overfitting occurs when a model fits training data too closely and generalizes poorly.",
      "Deleting training data does not define overfitting.",
      "Overfitting often reduces performance on unseen data.",
      "Stopping training is not the definition of overfitting."
    ]
  );

  // ENGLISH

  add(
    "Which word is a noun?",
    ["Quickly", "School", "Beautiful", "Under"],
    [
      "Quickly is an adverb because it describes how something happens.",
      "School is a noun because it names a place or institution.",
      "Beautiful is an adjective because it describes a noun.",
      "Under is generally a preposition indicating position."
    ]
  );

  add(
    "Which word is a pronoun?",
    ["They", "Running", "Tall", "Because"],
    [
      "They is a pronoun used in place of a noun or noun phrase.",
      "Running is commonly a verb form or noun.",
      "Tall is an adjective describing height.",
      "Because is a conjunction that introduces a reason."
    ]
  );

  add(
    "Which word is a verb?",
    ["Happy", "Teacher", "Write", "Slowly"],
    [
      "Happy is an adjective describing a feeling.",
      "Teacher is a noun naming a person.",
      "Write is a verb expressing an action.",
      "Slowly is an adverb describing how an action happens."
    ]
  );

  add(
    "Which word is an adjective?",
    ["Beautiful", "Run", "He", "Before"],
    [
      "Beautiful is an adjective describing a noun.",
      "Run is commonly a verb or noun.",
      "He is a personal pronoun.",
      "Before is commonly used as a preposition, conjunction or adverb."
    ]
  );

  add(
    "Which word is an adverb?",
    ["School", "She", "Quickly", "Book"],
    [
      "School is a noun.",
      "She is a pronoun.",
      "Quickly is an adverb describing how an action occurs.",
      "Book is commonly a noun or verb."
    ]
  );

  add(
    "Which word is a preposition?",
    ["Write", "Under", "Happy", "They"],
    [
      "Write is an action verb.",
      "Under is a preposition indicating position or location.",
      "Happy is an adjective.",
      "They is a pronoun."
    ]
  );

  add(
    "Which word is a conjunction?",
    ["But", "Tall", "Teacher", "Quickly"],
    [
      "But is a conjunction that joins contrasting ideas.",
      "Tall is an adjective.",
      "Teacher is a noun.",
      "Quickly is an adverb."
    ]
  );

  add(
    "Which is a complete sentence?",
    ["Running in the", "Very beautiful", "She is reading a book.", "Under the"],
    [
      "Running in the is incomplete and does not express a full thought.",
      "Very beautiful is a phrase, not a complete sentence.",
      "She is reading a book is a complete sentence with a subject and predicate.",
      "Under the is an incomplete phrase."
    ]
  );

  add(
    "Which sentence is in simple present tense?",
    ["She visited yesterday.", "She goes to school.", "She was sleeping.", "She will go tomorrow."],
    [
      "She visited yesterday uses simple past tense.",
      "She goes to school uses simple present tense.",
      "She was sleeping uses past continuous tense.",
      "She will go tomorrow expresses future time."
    ]
  );

  add(
    "Which sentence is in simple past tense?",
    ["She visits her grandmother.", "She is visiting her grandmother.", "She will visit her grandmother.", "She visited her grandmother yesterday."],
    [
      "She visits her grandmother uses simple present tense.",
      "She is visiting her grandmother uses present continuous tense.",
      "She will visit her grandmother expresses future time.",
      "She visited her grandmother yesterday uses simple past tense."
    ]
  );

  // =====================================
  // HTML ELEMENT HELPERS
  // =====================================

  function create(tag, text, className) {
    const element = document.createElement(tag);

    if (text !== undefined && text !== null) {
      element.textContent = String(text);
    }

    if (className) {
      element.className = className;
    }

    return element;
  }

  function getReason(answer, option, index) {
    const found = BANK.find(
      item => item.question === normalize(answer.question)
    );

    if (found) {
      const reason = found.reasons[normalize(option)];

      if (reason) {
        return reason;
      }
    }

    const saved = answer.optionExplanations;

    if (Array.isArray(saved) && saved[index]) {
      return saved[index];
    }

    if (saved && !Array.isArray(saved)) {
      const reason = saved[option];

      if (reason) {
        return reason;
      }
    }

    if (index === answer.correctAnswer) {
      return answer.explanation ||
        "This is the correct answer to the question.";
    }

    return (
      "This option is incorrect. The correct answer is " +
      answer.options[answer.correctAnswer] + "."
    );
  }

  // =====================================
  // VOICE EXPLANATION
  // =====================================

  function speak(text) {
    if (!("speechSynthesis" in window)) {
      alert("Voice reading is not supported.");
      return;
    }

    speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speech.rate = 0.9;

    speechSynthesis.speak(speech);
  }

  function stopSpeaking() {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel();
    }
  }

  // =====================================
  // CREATE INCORRECT QUESTION CARD
  // =====================================

  function createQuestionCard(answer) {
    const card = create("section", null, "question-card");

    card.appendChild(
      create(
        "div",
        "QUESTION " + answer.originalNumber,
        "question-number"
      )
    );

    card.appendChild(
      create("h3", answer.question)
    );

    const selected =
      answer.selectedAnswer === null
        ? "Not Answered"
        : answer.options[answer.selectedAnswer];

    const correct =
      answer.options[answer.correctAnswer];

    const answerBox = create(
      "div",
      null,
      "answer-summary"
    );

    answerBox.appendChild(
      create("p", "Your Answer: " + selected)
    );

    answerBox.appendChild(
      create("p", "Correct Answer: " + correct)
    );

    card.appendChild(answerBox);

    const optionList = create(
      "ul",
      null,
      "option-list"
    );

    answer.options.forEach((option, index) => {
      const isCorrect = index === answer.correctAnswer;
      const isSelected = index === answer.selectedAnswer;

      const item = create(
        "li",
        null,
        "option-card" +
        (isCorrect ? " correct" : "") +
        (isSelected && !isCorrect ? " selected" : "")
      );

      const letter = String.fromCharCode(65 + index);

      let heading = letter + ". " + option;

      if (isCorrect) {
        heading += " ✓ Correct Answer";
      } else if (isSelected) {
        heading += " ✗ Your Wrong Answer";
      } else {
        heading += " — Incorrect Option";
      }

      item.appendChild(
        create("div", heading, "option-heading")
      );

      const reasonList = create(
        "ul",
        null,
        "reason-list"
      );

      reasonList.appendChild(
        create(
          "li",
          getReason(answer, option, index)
        )
      );

      item.appendChild(reasonList);
      optionList.appendChild(item);
    });

    card.appendChild(optionList);

    const listen = create(
      "button",
      "🔊 Listen to Explanation",
      "voice-btn"
    );

    listen.type = "button";
    listen.onclick = () => speak(card.innerText);

    const stop = create(
      "button",
      "⏹ Stop",
      "voice-btn"
    );

    stop.type = "button";
    stop.onclick = stopSpeaking;

    card.appendChild(listen);
    card.appendChild(stop);

    return card;
  }

  // =====================================
  // DISPLAY QUIZ RESULTS
  // =====================================

  function render() {
    const storage = window.Storage;

    const summary = document.getElementById("summary");
    const container = document.getElementById(
      "explanationContainer"
    );

    if (!summary || !container) {
      console.error("Required HTML elements are missing.");
      return;
    }

    summary.innerHTML = "";
    container.innerHTML = "";

    if (!storage) {
      summary.appendChild(
        create("h2", "Storage Connection Error")
      );

      summary.appendChild(
        create(
          "p",
          "Check the path to js/storage.js."
        )
      );

      return;
    }

    const attempt = storage.getLatestAttempt();

    if (!attempt) {
      summary.appendChild(
        create("h2", "No Quiz Result Found")
      );

      summary.appendChild(
        create(
          "p",
          "Complete a quiz first to see your explanations."
        )
      );

      return;
    }

    const incorrect = storage.getIncorrectAnswers(attempt);
    const skipped = storage.getSkippedAnswers(attempt);

    const subjects = {
      "computer-science": "Computer Science",
      "machine-learning": "Machine Learning",
      english: "English"
    };

    const subject =
      subjects[attempt.subjectId] ||
      attempt.subject ||
      "Subject";

    const total = attempt.total ?? attempt.answers.length;

    const score = attempt.score ??
      storage.getAnswers(attempt).filter(
        answer =>
          answer.selectedAnswer === answer.correctAnswer
      ).length;

    summary.appendChild(
      create("h2", subject + " — Quiz Review")
    );

    summary.appendChild(
      create("p", "Your Score: " + score + "/" + total)
    );

    summary.appendChild(
      create(
        "p",
        "Incorrect Answers: " + incorrect.length
      )
    );

    summary.appendChild(
      create(
        "p",
        "Skipped Questions: " + skipped.length
      )
    );

    if (incorrect.length > 0) {
      container.appendChild(
        create(
          "h2",
          "Incorrect Questions",
          "section-title"
        )
      );

      incorrect.forEach(answer => {
        container.appendChild(
          createQuestionCard(answer)
        );
      });
    }

    if (skipped.length > 0) {
      container.appendChild(
        create(
          "h2",
          "Skipped Questions",
          "section-title"
        )
      );

      skipped.forEach(answer => {
        container.appendChild(
          createQuestionCard(answer)
        );
      });
    }

    if (
      incorrect.length === 0 &&
      skipped.length === 0
    ) {
      container.appendChild(
        create(
          "div",
          "🎉 Excellent! All your answers are correct.",
          "empty-state"
        )
      );
    }

    const retry = document.getElementById("retryBtn");

    if (retry) {
      retry.onclick = () => {
        const subjectId =
          attempt.subjectId ||
          attempt.subject ||
          "computer-science";

        location.href =
          "quiz.html?subject=" +
          encodeURIComponent(subjectId);
      };
    }

    const user = storage.getCurrentUser();
    const studentName = document.getElementById(
      "studentName"
    );

    if (studentName && user) {
      studentName.textContent =
        typeof user === "object"
          ? user.name || user.username || "Student"
          : String(user);
    }

    const logout = document.getElementById("logoutBtn");

    if (logout) {
      logout.onclick = () => {
        stopSpeaking();
        localStorage.removeItem("bsi_currentUser");
        location.href = "index.html";
      };
    }
  }

  window.addEventListener(
    "beforeunload",
    stopSpeaking
  );

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
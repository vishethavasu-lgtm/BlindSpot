console.log("Learning JavaScript loaded successfully!");
(() => {
  "use strict";

  // ============================================
  // CONFIGURATION
  // ============================================
  // Change this path after confirming the quiz
  // module's actual filename and folder.
  const QUIZ_PAGE = "quiz2/quizz.html";

  const DASHBOARD_PAGE = "dashboard.html";
  const LOGIN_PAGE = "index.html";
  const PROGRESS_KEY_PREFIX = "bsi_learning_progress_";
  const ACTIVE_SUBJECT_KEY = "bsi_activeSubject";

  // ============================================
  // ALL 30 STUDY NOTES
  // ============================================
  const SUBJECTS = {
    "computer-science": {
      name: "Computer Science",
      icon: "💻",
      theme: "cs",
      description:
        "Understand computers, hardware, software and programming.",
      topics: [
        {
          id: "computer",
          title: "Computer",
          question: "What is a computer?",
          explanation:
            "A computer is an electronic device that accepts data, processes it, stores information, and produces output.",
          examples:
            "Input, processing, storage and output."
        },
        {
          id: "father-of-computer",
          title: "Father of Computer",
          question:
            "Who is known as the Father of the Computer?",
          explanation:
            "Charles Babbage is known as the Father of the Computer because he designed the Analytical Engine.",
          examples:
            "Charles Babbage; Analytical Engine."
        },
        {
          id: "computer-science",
          title: "Computer Science",
          question: "What is computer science?",
          explanation:
            "Computer science is the study of computers, algorithms, programming, and information processing.",
          examples:
            "Algorithms, programming and information processing."
        },
        {
          id: "cpu",
          title: "CPU",
          question: "What is the CPU?",
          explanation:
            "CPU stands for Central Processing Unit. It executes instructions and processes data.",
          examples: "Central Processing Unit."
        },
        {
          id: "ram",
          title: "RAM",
          question: "What is RAM?",
          explanation:
            "RAM stands for Random Access Memory. It temporarily stores data and programs while the computer is running.",
          examples:
            "Random Access Memory; temporary working memory."
        },
        {
          id: "hardware",
          title: "Hardware",
          question: "What is hardware?",
          explanation:
            "Hardware refers to the physical parts of a computer, such as the keyboard, monitor, mouse, and processor.",
          examples:
            "Keyboard, monitor, mouse and processor."
        },
        {
          id: "software",
          title: "Software",
          question: "What is software?",
          explanation:
            "Software is a collection of programs and instructions that tell a computer what to do.",
          examples:
            "Operating systems and applications."
        },
        {
          id: "input-devices",
          title: "Input Devices",
          question: "What is an input device?",
          explanation:
            "An input device is used to enter data into a computer. Examples include a keyboard, mouse, and scanner.",
          examples:
            "Keyboard, mouse and scanner."
        },
        {
          id: "operating-system",
          title: "Operating System",
          question: "What is an operating system?",
          explanation:
            "An operating system manages computer hardware, software resources, and applications. Examples include Windows and Linux.",
          examples: "Windows and Linux."
        },
        {
          id: "programming",
          title: "Programming",
          question: "What is a programming language?",
          explanation:
            "A programming language is used to write instructions for computers. Examples include Python, Java, and C.",
          examples: "Python, Java and C."
        }
      ]
    },

    "machine-learning": {
      name: "Machine Learning",
      icon: "🧠",
      theme: "ml",
      description:
        "Learn how intelligent systems discover patterns from data.",
      topics: [
        {
          id: "machine-learning",
          title: "Machine Learning",
          question: "What is machine learning?",
          explanation:
            "Machine learning is a branch of artificial intelligence that enables computers to learn patterns from data.",
          examples: "Learning patterns from data."
        },
        {
          id: "artificial-intelligence",
          title: "Artificial Intelligence",
          question: "What is artificial intelligence?",
          explanation:
            "Artificial intelligence is the field of creating systems that perform tasks requiring human-like intelligence.",
          examples:
            "Systems that perform intelligent tasks."
        },
        {
          id: "supervised-learning",
          title: "Supervised Learning",
          question: "What is supervised learning?",
          explanation:
            "Supervised learning trains a model using labeled examples with known target outputs.",
          examples:
            "Training with labeled examples."
        },
        {
          id: "unsupervised-learning",
          title: "Unsupervised Learning",
          question: "What is unsupervised learning?",
          explanation:
            "Unsupervised learning identifies patterns or groups in data without labeled target outputs.",
          examples:
            "Finding groups in unlabeled data."
        },
        {
          id: "reinforcement-learning",
          title: "Reinforcement Learning",
          question: "What is reinforcement learning?",
          explanation:
            "Reinforcement learning involves an agent learning actions through rewards and penalties.",
          examples:
            "An agent learning through rewards and penalties."
        },
        {
          id: "dataset",
          title: "Dataset",
          question: "What is a dataset?",
          explanation:
            "A dataset is an organized collection of data used for analysis or training machine learning models.",
          examples:
            "A collection of records used for training."
        },
        {
          id: "training-data",
          title: "Training Data",
          question: "What is training data?",
          explanation:
            "Training data is the information used to teach a machine learning model to recognize patterns.",
          examples:
            "Examples used to train a model."
        },
        {
          id: "classification",
          title: "Classification",
          question: "What is classification?",
          explanation:
            "Classification predicts categories or labels, such as identifying whether an email is spam or not spam.",
          examples: "Spam or not spam."
        },
        {
          id: "regression",
          title: "Regression",
          question: "What is regression?",
          explanation:
            "Regression predicts numerical values, such as house prices or temperatures.",
          examples:
            "House prices and temperatures."
        },
        {
          id: "overfitting",
          title: "Overfitting",
          question: "What is overfitting?",
          explanation:
            "Overfitting happens when a model learns training data too closely and performs poorly on new data.",
          examples:
            "Good training performance but poor performance on new data."
        }
      ]
    },

    "english": {
      name: "English",
      icon: "📚",
      theme: "en",
      description:
        "Improve grammar, vocabulary and everyday English fundamentals.",
      topics: [
        {
          id: "noun",
          title: "Noun",
          question: "What is a noun?",
          explanation:
            "A noun is a word that names a person, place, animal, thing, or idea. Examples include teacher, school, and happiness.",
          examples:
            "Teacher, school, happiness."
        },
        {
          id: "pronoun",
          title: "Pronoun",
          question: "What is a pronoun?",
          explanation:
            "A pronoun replaces a noun in a sentence. Examples include he, she, it, and they.",
          examples: "He, she, it, they."
        },
        {
          id: "verb",
          title: "Verb",
          question: "What is a verb?",
          explanation:
            "A verb expresses an action or a state of being. Examples include run, write, is, and are.",
          examples: "Run, write, is, are."
        },
        {
          id: "adjective",
          title: "Adjective",
          question: "What is an adjective?",
          explanation:
            "An adjective describes a noun or pronoun. Examples include beautiful, tall, and happy.",
          examples:
            "Beautiful, tall, happy."
        },
        {
          id: "adverb",
          title: "Adverb",
          question: "What is an adverb?",
          explanation:
            "An adverb can modify a verb, adjective, or another adverb. Examples include quickly, very, and slowly.",
          examples:
            "Quickly, very, slowly."
        },
        {
          id: "preposition",
          title: "Preposition",
          question: "What is a preposition?",
          explanation:
            "A preposition shows relationships involving place, time, or direction. Examples include in, on, under, and before.",
          examples:
            "In, on, under, before."
        },
        {
          id: "conjunction",
          title: "Conjunction",
          question: "What is a conjunction?",
          explanation:
            "A conjunction connects words, phrases, or clauses. Examples include and, but, and because.",
          examples: "And, but, because."
        },
        {
          id: "sentence",
          title: "Sentence",
          question: "What is a sentence?",
          explanation:
            "A sentence is a group of words that expresses a complete thought. Example: She is reading a book.",
          examples: "She is reading a book."
        },
        {
          id: "present-tense",
          title: "Present Tense",
          question: "What is simple present tense?",
          explanation:
            "Simple present tense expresses habits, repeated actions, and general truths. Example: She goes to school.",
          examples: "She goes to school."
        },
        {
          id: "past-tense",
          title: "Past Tense",
          question: "What is simple past tense?",
          explanation:
            "Simple past tense describes actions completed in the past. Example: She visited her grandmother yesterday.",
          examples:
            "She visited her grandmother yesterday."
        }
      ]
    }
  };

  const SUBJECT_IDS = Object.keys(SUBJECTS);

  // ============================================
  // APPLICATION STATE
  // ============================================
  let currentUser = null;
  let activeSubjectId = null;
  let activeTopicIndex = -1;
  let learningProgress = {};

  const elements = {};

  function getElement(id) {
    return document.getElementById(id);
  }

  function cacheElements() {
    const ids = [
      "sidebarAvatar",
      "sidebarName",
      "topbarName",
      "topbarAvatar",
      "logoutBtn",
      "breadcrumbCurrent",
      "pageTitle",
      "pageSubtitle",
      "messageBox",
      "subjectScreen",
      "topicScreen",
      "readingScreen",
      "subjectGrid",
      "backToSubjects",
      "subjectKicker",
      "subjectHeading",
      "subjectDescription",
      "progressText",
      "progressPercentage",
      "progressTrack",
      "progressFill",
      "topicList",
      "quizIcon",
      "quizHeading",
      "quizMessage",
      "startQuizBtn",
      "backToTopics",
      "readingNumber",
      "readingStatus",
      "readingTitle",
      "readingQuestion",
      "readingExplanation",
      "examplesSection",
      "readingExamples",
      "completeBtn",
      "nextTopicBtn"
    ];

    ids.forEach((id) => {
      elements[id] = getElement(id);
    });
  }

  // ============================================
  // STORAGE
  // ============================================
  function readJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);

      if (raw === null) {
        return fallback;
      }

      return JSON.parse(raw);
    } catch (error) {
      console.warn("Unable to read:", key, error);
      return fallback;
    }
  }

  function getProgressKey() {
    return PROGRESS_KEY_PREFIX + String(currentUser.id);
  }

  function loadProgress() {
    const saved = readJSON(getProgressKey(), {});

    if (
      !saved ||
      typeof saved !== "object" ||
      Array.isArray(saved)
    ) {
      return createEmptyProgress();
    }

    const cleaned = {};

    SUBJECT_IDS.forEach((subjectId) => {
      const validIds = new Set(
        SUBJECTS[subjectId].topics.map((topic) => topic.id)
      );

      const stored = Array.isArray(saved[subjectId])
        ? saved[subjectId]
        : [];

      cleaned[subjectId] = [
        ...new Set(
          stored.filter(
            (id) =>
              typeof id === "string" &&
              validIds.has(id)
          )
        )
      ];
    });

    return cleaned;
  }

  function createEmptyProgress() {
    const progress = {};

    SUBJECT_IDS.forEach((subjectId) => {
      progress[subjectId] = [];
    });

    return progress;
  }

  function saveProgress() {
    try {
      localStorage.setItem(
        getProgressKey(),
        JSON.stringify(learningProgress)
      );
      return true;
    } catch (error) {
      console.error("Progress save failed:", error);

      showMessage(
        "Unable to save progress. Please check browser storage.",
        true
      );

      return false;
    }
  }

  function getCompletedTopicIds(subjectId) {
    return Array.isArray(learningProgress[subjectId])
      ? learningProgress[subjectId]
      : [];
  }

  function getCompletedCount(subjectId) {
    return getCompletedTopicIds(subjectId).length;
  }

  function isTopicCompleted(subjectId, topicId) {
    return getCompletedTopicIds(subjectId).includes(topicId);
  }

  function hasSubjectAccess(subjectId) {
    return Boolean(
      SUBJECTS[subjectId] &&
      currentUser &&
      Array.isArray(currentUser.selectedSubjects) &&
      currentUser.selectedSubjects.includes(subjectId)
    );
  }

  // ============================================
  // UI HELPERS
  // ============================================
  function showMessage(message, isError = false) {
    if (!elements.messageBox) return;

    elements.messageBox.textContent = message;
    elements.messageBox.classList.toggle(
      "error",
      isError
    );
    elements.messageBox.hidden = false;
  }

  function hideMessage() {
    if (!elements.messageBox) return;

    elements.messageBox.hidden = true;
    elements.messageBox.textContent = "";
  }

  function showScreen(screenName) {
    elements.subjectScreen.hidden =
      screenName !== "subjects";

    elements.topicScreen.hidden =
      screenName !== "topics";

    elements.readingScreen.hidden =
      screenName !== "reading";

    window.scrollTo(0, 0);
  }

  function setHeader(title, subtitle, breadcrumb) {
    elements.pageTitle.textContent = title;
    elements.pageSubtitle.textContent = subtitle;
    elements.breadcrumbCurrent.textContent = breadcrumb;
  }

  function makeElement(tag, className = "", text) {
    const element = document.createElement(tag);

    if (className) {
      element.className = className;
    }

    if (text !== undefined) {
      element.textContent = String(text);
    }

    return element;
  }

  function updateUserDisplay() {
    const name =
      typeof currentUser.name === "string" &&
      currentUser.name.trim()
        ? currentUser.name.trim()
        : "Student";

    const initial = name.charAt(0).toUpperCase();

    elements.sidebarName.textContent = name;
    elements.topbarName.textContent = name;
    elements.sidebarAvatar.textContent = initial;
    elements.topbarAvatar.textContent = initial;
  }

  // ============================================
  // SUBJECT SELECTION
  // ============================================
  function renderSubjectSelection() {
    activeSubjectId = null;
    activeTopicIndex = -1;

    try {
      localStorage.removeItem(ACTIVE_SUBJECT_KEY);
    } catch (error) {
      console.warn("Unable to clear active subject:", error);
    }

    hideMessage();

    setHeader(
      "Explore Your Subjects",
      "Choose a subject to begin learning.",
      "Subject Learning"
    );

    elements.subjectGrid.replaceChildren();

    SUBJECT_IDS.forEach((subjectId) => {
      const subject = SUBJECTS[subjectId];
      const allowed = hasSubjectAccess(subjectId);
      const completed = getCompletedCount(subjectId);

      const card = makeElement(
        "article",
        "subject-card " + subject.theme
      );

      const icon = makeElement(
        "div",
        "subject-icon",
        subject.icon
      );

      const heading = makeElement(
        "h3",
        "",
        subject.name
      );

      const description = makeElement(
        "p",
        "",
        subject.description
      );

      const footer = makeElement(
        "div",
        "subject-card-footer"
      );

      const stats = makeElement(
        "div",
        "subject-stats"
      );

      stats.append(
        makeElement("span", "", "10 Topics"),
        makeElement(
          "strong",
          "",
          completed + "/10 Completed"
        )
      );

      const button = makeElement(
        "button",
        "primary-btn",
        allowed
          ? "Explore Subject →"
          : "Add via Dashboard"
      );

      button.type = "button";

      if (allowed) {
        button.addEventListener("click", () => {
          openSubject(subjectId);
        });
      } else {
        button.addEventListener("click", () => {
          window.location.href = DASHBOARD_PAGE;
        });
      }

      footer.append(stats, button);

      card.append(
        icon,
        heading,
        description,
        footer
      );

      elements.subjectGrid.appendChild(card);
    });

    showScreen("subjects");
  }

  function openSubject(subjectId) {
    if (!SUBJECTS[subjectId]) {
      renderSubjectSelection();
      showMessage(
        "This subject is not available.",
        true
      );
      return;
    }

    if (!hasSubjectAccess(subjectId)) {
      renderSubjectSelection();

      showMessage(
        "Please add " +
          SUBJECTS[subjectId].name +
          " through your Dashboard first."
      );

      return;
    }

    activeSubjectId = subjectId;
    activeTopicIndex = -1;

    try {
      localStorage.setItem(
        ACTIVE_SUBJECT_KEY,
        subjectId
      );
    } catch (error) {
      console.warn("Unable to set active subject:", error);
    }

    renderTopicList();
  }

  // ============================================
  // TOPIC LIST
  // ============================================
  function renderTopicList() {
    if (
      !activeSubjectId ||
      !hasSubjectAccess(activeSubjectId)
    ) {
      renderSubjectSelection();
      return;
    }

    hideMessage();

    const subject = SUBJECTS[activeSubjectId];
    const completedCount =
      getCompletedCount(activeSubjectId);

    const percentage = Math.round(
      (completedCount / subject.topics.length) * 100
    );

    setHeader(
      subject.name + " Learning",
      "Read each study note and track your progress.",
      subject.name
    );

    elements.subjectKicker.textContent =
      subject.name.toUpperCase();

    elements.subjectHeading.textContent =
      subject.icon +
      " " +
      subject.name +
      " — 10 Study Notes";

    elements.subjectDescription.textContent =
      subject.description;

    elements.progressText.textContent =
      completedCount + "/10 Topics Completed";

    elements.progressPercentage.textContent =
      percentage + "%";

    elements.progressFill.style.width =
      percentage + "%";

    elements.progressTrack.setAttribute(
      "aria-valuenow",
      String(completedCount)
    );

    elements.topicList.replaceChildren();

    subject.topics.forEach((topic, index) => {
      const completed = isTopicCompleted(
        activeSubjectId,
        topic.id
      );

      const item = makeElement(
        "button",
        "topic-item" +
          (completed ? " completed" : "")
      );

      item.type = "button";

      const number = makeElement(
        "span",
        "topic-index",
        String(index + 1).padStart(2, "0")
      );

      const info = makeElement(
        "span",
        "topic-info"
      );

      info.append(
        makeElement(
          "strong",
          "",
          topic.title
        ),
        makeElement(
          "small",
          "",
          completed
            ? "Completed · Read again"
            : "Read study note"
        )
      );

      const check = makeElement(
        "span",
        "topic-check",
        completed ? "✓" : "○"
      );

      check.setAttribute(
        "aria-label",
        completed
          ? "Completed"
          : "Not completed"
      );

      item.append(number, info, check);

      item.addEventListener("click", () => {
        openTopic(index);
      });

      elements.topicList.appendChild(item);
    });

    renderQuizUnlock(completedCount);

    showScreen("topics");
  }

  // ============================================
  // QUIZ UNLOCKING
  // ============================================
  function renderQuizUnlock(completedCount) {
    const subject = SUBJECTS[activeSubjectId];

    const unlocked =
      completedCount === subject.topics.length;

    const quizCard =
      elements.startQuizBtn.closest(".quiz-card");

    if (quizCard) {
      quizCard.classList.toggle(
        "unlocked",
        unlocked
      );
    }

    elements.startQuizBtn.disabled = !unlocked;

    if (unlocked) {
      elements.quizIcon.textContent = "🎉";

      elements.quizHeading.textContent =
        "Congratulations! Quiz Unlocked";

      elements.quizMessage.textContent =
        "You have completed all " +
        subject.name +
        " study notes. You can now start your practice quiz.";

      elements.startQuizBtn.textContent =
        "Start Quiz →";
    } else {
      elements.quizIcon.textContent = "🔒";

      elements.quizHeading.textContent =
        "Quiz Locked";

      elements.quizMessage.textContent =
        "Complete all 10 topics to unlock your quiz. " +
        completedCount +
        "/10 completed so far.";

      elements.startQuizBtn.textContent =
        "Complete Notes First";
    }
  }

  // ============================================
  // READING SCREEN
  // ============================================
  function openTopic(index) {
    if (
      !activeSubjectId ||
      !hasSubjectAccess(activeSubjectId)
    ) {
      renderSubjectSelection();
      return;
    }

    const subject = SUBJECTS[activeSubjectId];

    if (
      !Number.isInteger(index) ||
      index < 0 ||
      index >= subject.topics.length
    ) {
      renderTopicList();
      return;
    }

    activeTopicIndex = index;

    const topic = subject.topics[index];

    const completed = isTopicCompleted(
      activeSubjectId,
      topic.id
    );

    hideMessage();

    setHeader(
      topic.title,
      "Read the explanation and mark this topic as completed.",
      topic.title
    );

    elements.readingNumber.textContent =
      "TOPIC " +
      String(index + 1).padStart(2, "0") +
      " / 10";

    elements.readingTitle.textContent =
      topic.title;

    elements.readingQuestion.textContent =
      topic.question;

    elements.readingExplanation.textContent =
      topic.explanation;

    elements.readingExamples.textContent =
      topic.examples || "";

    elements.examplesSection.hidden =
      !topic.examples;

    updateReadingCompletion(completed);

    elements.nextTopicBtn.textContent =
      index === subject.topics.length - 1
        ? "Back to Topic List →"
        : "Next Topic →";

    showScreen("reading");
  }

  function updateReadingCompletion(completed) {
    elements.readingStatus.textContent =
      completed
        ? "✓ Completed"
        : "Not Completed";

    elements.readingStatus.classList.toggle(
      "done",
      completed
    );

    elements.completeBtn.textContent =
      completed
        ? "✓ Already Completed"
        : "✓ Mark as Completed";

    elements.completeBtn.disabled = completed;
  }

  // ============================================
  // MARK TOPIC AS COMPLETED
  // ============================================
  function markCurrentTopicCompleted() {
    if (
      !activeSubjectId ||
      !hasSubjectAccess(activeSubjectId)
    ) {
      renderSubjectSelection();
      return;
    }

    const subject = SUBJECTS[activeSubjectId];

    const topic = subject.topics[activeTopicIndex];

    if (!topic) {
      renderTopicList();
      return;
    }

    if (
      isTopicCompleted(
        activeSubjectId,
        topic.id
      )
    ) {
      updateReadingCompletion(true);
      return;
    }

    const previousIds = [
      ...getCompletedTopicIds(activeSubjectId)
    ];

    learningProgress[activeSubjectId] = [
      ...new Set([
        ...previousIds,
        topic.id
      ])
    ];

    if (!saveProgress()) {
      learningProgress[activeSubjectId] =
        previousIds;

      return;
    }

    updateReadingCompletion(true);

    const completedCount =
      getCompletedCount(activeSubjectId);

    if (completedCount === 10) {
      showMessage(
        "🎉 Congratulations! All 10 " +
        subject.name +
        " topics are completed. Return to the topic list to start your quiz."
      );
    } else {
      showMessage(
        "✓ " +
        topic.title +
        " completed! Progress: " +
        completedCount +
        "/10 topics."
      );
    }
  }

  // ============================================
  // NEXT TOPIC
  // ============================================
  function goToNextTopic() {
    if (
      !activeSubjectId ||
      !hasSubjectAccess(activeSubjectId)
    ) {
      renderSubjectSelection();
      return;
    }

    const subject = SUBJECTS[activeSubjectId];

    if (
      activeTopicIndex >= 0 &&
      activeTopicIndex < subject.topics.length - 1
    ) {
      openTopic(activeTopicIndex + 1);
    } else {
      renderTopicList();
    }
  }

  // ============================================
  // START QUIZ
  // ============================================
  function startQuiz() {
    if (
      !activeSubjectId ||
      !hasSubjectAccess(activeSubjectId)
    ) {
      renderSubjectSelection();
      return;
    }

    const subject = SUBJECTS[activeSubjectId];

    if (
      getCompletedCount(activeSubjectId) !==
      subject.topics.length
    ) {
      renderTopicList();

      showMessage(
        "Complete all 10 topics before starting the quiz.",
        true
      );

      return;
    }

    try {
      localStorage.setItem(
        ACTIVE_SUBJECT_KEY,
        activeSubjectId
      );
    } catch (error) {
      showMessage(
        "Unable to prepare the quiz. Check browser storage.",
        true
      );

      return;
    }

    const separator =
      QUIZ_PAGE.includes("?") ? "&" : "?";

    const destination =
      QUIZ_PAGE +
      separator +
      "subject=" +
      encodeURIComponent(activeSubjectId);

    window.location.href = destination;
  }

  // ============================================
  // LOGOUT
  // ============================================
  function logout() {
    try {
      if (
        typeof Storage !== "undefined" &&
        typeof Storage.logout === "function"
      ) {
        Storage.logout();
      }

      localStorage.removeItem(
        ACTIVE_SUBJECT_KEY
      );

      localStorage.removeItem(
        "bsi_activeTopic"
      );
    } catch (error) {
      console.error("Logout error:", error);
    }

    window.location.replace(LOGIN_PAGE);
  }

  // ============================================
  // INITIALIZE
  // ============================================
  function initLearning() {
    cacheElements();

    const requiredElements = [
      "subjectScreen",
      "topicScreen",
      "readingScreen",
      "subjectGrid",
      "topicList",
      "startQuizBtn",
      "completeBtn",
      "nextTopicBtn",
      "logoutBtn"
    ];

    const missing = requiredElements.filter(
      (id) => !elements[id]
    );

    if (missing.length > 0) {
      console.error(
        "Missing HTML elements:",
        missing
      );

      return;
    }

    if (
      typeof Storage === "undefined" ||
      typeof Storage.getCurrentUser !== "function"
    ) {
      console.error(
        "Existing js/storage.js is missing or incompatible."
      );

      showMessage(
        "Unable to load your account. Please check js/storage.js.",
        true
      );

      return;
    }

    try {
      currentUser = Storage.getCurrentUser();
    } catch (error) {
      console.error(
        "Unable to load current user:",
        error
      );

      currentUser = null;
    }

    if (
      !currentUser ||
      currentUser.id === undefined ||
      currentUser.id === null
    ) {
      window.location.replace(LOGIN_PAGE);
      return;
    }

    // Use the most recent saved user record
    // so Dashboard subject changes are reflected.
    try {
      if (
        typeof Storage.getUsers === "function"
      ) {
        const users = Storage.getUsers();

        if (Array.isArray(users)) {
          const updatedUser = users.find(
            (user) =>
              user &&
              String(user.id) ===
                String(currentUser.id)
          );

          if (updatedUser) {
            currentUser = updatedUser;
          }
        }
      }
    } catch (error) {
      console.warn(
        "Unable to refresh user details:",
        error
      );
    }

    updateUserDisplay();

    learningProgress = loadProgress();

    // Navigation events
    elements.logoutBtn.addEventListener(
      "click",
      logout
    );

    elements.backToSubjects.addEventListener(
      "click",
      renderSubjectSelection
    );

    elements.backToTopics.addEventListener(
      "click",
      renderTopicList
    );

    elements.completeBtn.addEventListener(
      "click",
      markCurrentTopicCompleted
    );

    elements.nextTopicBtn.addEventListener(
      "click",
      goToNextTopic
    );

    elements.startQuizBtn.addEventListener(
      "click",
      startQuiz
    );

    // Dashboard passes this subject ID.
    let storedSubject = null;

    try {
      storedSubject = localStorage.getItem(
        ACTIVE_SUBJECT_KEY
      );
    } catch (error) {
      console.warn(
        "Unable to read active subject:",
        error
      );
    }

    if (
      storedSubject &&
      SUBJECTS[storedSubject] &&
      hasSubjectAccess(storedSubject)
    ) {
      openSubject(storedSubject);
    } else {
      renderSubjectSelection();

      if (
        storedSubject &&
        SUBJECTS[storedSubject] &&
        !hasSubjectAccess(storedSubject)
      ) {
        showMessage(
          "Please add " +
          SUBJECTS[storedSubject].name +
          " through your Dashboard before learning."
        );
      }
    }
  }

  // Start after HTML is loaded.
  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initLearning
    );
  } else {
    initLearning();
  }
})();
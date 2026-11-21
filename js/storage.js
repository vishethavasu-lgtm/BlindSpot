// BLIND SPOT INSIGHTS
 // SHARED STORAGE MANAGEMENT

const Storage = {

  // ---------- BASIC STORAGE ----------

  get(key, fallback = null) {
    try {
      const value = localStorage.getItem(key);
      return value === null ? fallback : JSON.parse(value);
    } catch (error) {
      console.error("Storage read error:", error);
      return fallback;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error("Storage write error:", error);
      return false;
    }
  },

  // ---------- REGISTRATION ----------

  getUsers() {
    const users = this.get("bsi_users", []);
    return Array.isArray(users) ? users : [];
  },

  saveUsers(users) {
    if (!Array.isArray(users)) {
      console.error("Invalid users data");
      return false;
    }

    return this.set("bsi_users", users);
  },

  // ---------- LOGIN ----------

  getCurrentUser() {
    return this.get("bsi_currentUser", null);
  },

  setCurrentUser(user) {
    if (!user || typeof user !== "object") {
      console.error("Invalid user");
      return false;
    }

    return this.set("bsi_currentUser", user);
  },

  logout() {
    localStorage.removeItem("bsi_currentUser");
  },

  clearAll() {
    localStorage.removeItem("bsi_users");
    localStorage.removeItem("bsi_currentUser");
  },

  // ---------- SUBJECT LEARNING ----------

  normalizeSubject(subject) {
    return String(subject || "")
      .trim()
      .toLowerCase()
      .replace(/[\s_]+/g, "-");
  },

  setActiveSubject(subject) {
    const subjectId = this.normalizeSubject(subject);
    return this.set("bsi_activeSubject", subjectId);
  },

  getActiveSubject() {
    return this.get("bsi_activeSubject", null);
  },

  getLearningProgress() {
    return this.get("bsi_learningProgress", {});
  },

  saveLearningProgress(progress) {
    return this.set("bsi_learningProgress", progress);
  },

  // ---------- QUIZ ----------

  getQuizAttempts() {
    const attempts = this.get("bsi_quizAttempts", []);
    return Array.isArray(attempts) ? attempts : [];
  },

  saveQuizAttempt(attempt) {
    if (!attempt || typeof attempt !== "object") {
      console.error("Invalid quiz attempt");
      return false;
    }

    const attempts = this.getQuizAttempts();

    attempts.push(attempt);

    const saved = this.set("bsi_quizAttempts", attempts);

    try {
      sessionStorage.setItem(
        "bsi_latestQuizResult",
        JSON.stringify(attempt)
      );
    } catch (error) {
      console.error("Session storage error:", error);
    }

    return saved;
  },

  // ---------- EXPLANATION ----------

  getLatestAttempt(subject = null) {
    const requestedSubject = subject
      ? this.normalizeSubject(subject)
      : null;

    let latest = null;

    try {
      const value = sessionStorage.getItem(
        "bsi_latestQuizResult"
      );

      latest = value ? JSON.parse(value) : null;
    } catch (error) {
      console.error("Latest result error:", error);
    }

    const matchesSubject = attempt => {
      if (!requestedSubject) return true;

      return this.normalizeSubject(
        attempt.subjectId || attempt.subject
      ) === requestedSubject;
    };

    if (
      latest &&
      Array.isArray(latest.answers) &&
      matchesSubject(latest)
    ) {
      return latest;
    }

    const attempts = this.getQuizAttempts();

    const user = this.getCurrentUser();

    const userId = user
      ? (user.id ?? user.userId ?? user.email)
      : null;

    const matching = attempts.filter(attempt => {
      if (!attempt || !Array.isArray(attempt.answers)) {
        return false;
      }

      const attemptUserId = attempt.userId;

      const matchesUser =
        !userId ||
        !attemptUserId ||
        String(userId) === String(attemptUserId);

      return matchesSubject(attempt) && matchesUser;
    });

    return matching.length
      ? matching[matching.length - 1]
      : null;
  },

  getLatestQuizAttempt(subject = null) {
    return this.getLatestAttempt(subject);
  },

  normalizeAnswer(answer) {
    if (!answer || typeof answer !== "object") {
      return null;
    }

    const options = Array.isArray(answer.options)
      ? answer.options
      : [];

    const getIndex = value => {
      if (
        value === null ||
        value === undefined ||
        value === "" ||
        value === -1
      ) {
        return null;
      }

      if (
        typeof value === "number" &&
        Number.isInteger(value)
      ) {
        return value >= 0 && value < options.length
          ? value
          : null;
      }

      const match = options.findIndex(option =>
        String(option).trim().toLowerCase() ===
        String(value).trim().toLowerCase()
      );

      if (match !== -1) return match;

      const numeric = Number(value);

      return Number.isInteger(numeric) &&
        numeric >= 0 &&
        numeric < options.length
        ? numeric
        : null;
    };

    return {
      question: String(
        answer.question ?? answer.questionText ?? ""
      ),
      options,
      selectedAnswer: getIndex(
        answer.selectedAnswer ??
        answer.selectedIndex ??
        answer.userAnswer
      ),
      correctAnswer: getIndex(
        answer.correctAnswer ?? answer.correctIndex
      ),
      explanation: answer.explanation || "",
      optionExplanations:
        answer.optionExplanations || null
    };
  },

  getAnswers(attempt) {
    if (!attempt || !Array.isArray(attempt.answers)) {
      return [];
    }

    return attempt.answers
      .map((answer, index) => {
        const normalized = this.normalizeAnswer(answer);

        if (
          !normalized ||
          normalized.options.length !== 4 ||
          normalized.correctAnswer === null
        ) {
          return null;
        }

        return {
          ...normalized,
          originalNumber: index + 1
        };
      })
      .filter(Boolean);
  },

  getIncorrectAnswers(attempt) {
    return this.getAnswers(attempt).filter(answer =>
      answer.selectedAnswer !== null &&
      answer.selectedAnswer !== answer.correctAnswer
    );
  },

  getSkippedAnswers(attempt) {
    return this.getAnswers(attempt).filter(answer =>
      answer.selectedAnswer === null
    );
  },

  // ---------- PROGRESS REPORT ----------

  getProgressReport() {
    const attempts = this.getQuizAttempts();
    const user = this.getCurrentUser();

    const userId = user
      ? (user.id ?? user.userId ?? user.email)
      : null;

    const userAttempts = attempts.filter(attempt =>
      !userId ||
      !attempt.userId ||
      String(attempt.userId) === String(userId)
    );

    const totalQuizzes = userAttempts.length;

    const totalScore = userAttempts.reduce(
      (sum, attempt) => sum + Number(attempt.score || 0),
      0
    );

    const totalQuestions = userAttempts.reduce(
      (sum, attempt) =>
        sum + Number(
          attempt.total ??
          attempt.answers?.length ??
          0
        ),
      0
    );

    return {
      totalQuizzes,
      totalScore,
      totalQuestions,
      averagePercentage: totalQuestions
        ? Math.round((totalScore / totalQuestions) * 100)
        : 0,
      attempts: userAttempts
    };
  }
};

window.Storage = Storage;

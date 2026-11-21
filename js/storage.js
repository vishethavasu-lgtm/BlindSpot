(function () {
  "use strict";

  function readJSON(store, key, fallback = null) {
    try {
      const value = store.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch (error) {
      console.error("Storage read error:", key, error);
      return fallback;
    }
  }

  function getCurrentUser() {
    return readJSON(localStorage, "bsi_currentUser");
  }

  function getLatestAttempt() {
    const subject = new URLSearchParams(
      location.search
    ).get("subject");

    const latest = readJSON(
      sessionStorage,
      "bsi_latestQuizResult"
    );

    if (
      latest &&
      Array.isArray(latest.answers) &&
      (!subject ||
        latest.subjectId === subject ||
        latest.subject === subject)
    ) {
      return latest;
    }

    const attempts = readJSON(
      localStorage,
      "bsi_quizAttempts",
      []
    );

    if (!Array.isArray(attempts)) {
      return null;
    }

    const currentUser = getCurrentUser();

    const userId = currentUser &&
      typeof currentUser === "object"
        ? currentUser.id ??
          currentUser.userId ??
          currentUser.email
        : null;

    const matching = attempts.filter(attempt => {
      if (!attempt || !Array.isArray(attempt.answers)) {
        return false;
      }

      const subjectMatches =
        !subject ||
        attempt.subjectId === subject ||
        attempt.subject === subject;

      const userMatches =
        !userId ||
        !attempt.userId ||
        String(attempt.userId) === String(userId);

      return subjectMatches && userMatches;
    });

    return matching.length
      ? matching[matching.length - 1]
      : null;
  }

  function normalizeAnswer(answer) {
    if (!answer || typeof answer !== "object") {
      return null;
    }

    const options = Array.isArray(answer.options)
      ? answer.options
      : [];

    function getIndex(value) {
      if (
        value === null ||
        value === undefined ||
        value === "" ||
        value === -1
      ) {
        return null;
      }

      if (typeof value === "number") {
        return Number.isInteger(value) &&
          value >= 0 &&
          value < options.length
            ? value
            : null;
      }

      const text = String(value).trim().toLowerCase();

      const match = options.findIndex(option =>
        String(option).trim().toLowerCase() === text
      );

      if (match !== -1) {
        return match;
      }

      const number = Number(value);

      return Number.isInteger(number) &&
        number >= 0 &&
        number < options.length
          ? number
          : null;
    }

    return {
      question: String(
        answer.question ??
        answer.questionText ??
        ""
      ),

      options,

      selectedAnswer: getIndex(
        answer.selectedAnswer ??
        answer.selectedIndex ??
        answer.userAnswer
      ),

      correctAnswer: getIndex(
        answer.correctAnswer ??
        answer.correctIndex
      ),

      explanation: answer.explanation || "",

      optionExplanations:
        answer.optionExplanations || null
    };
  }

  function getAnswers(attempt) {
    if (!attempt || !Array.isArray(attempt.answers)) {
      return [];
    }

    return attempt.answers
      .map((answer, index) => {
        const normalized = normalizeAnswer(answer);

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
  }

  function getIncorrectAnswers(attempt) {
    return getAnswers(attempt).filter(answer =>
      answer.selectedAnswer !== null &&
      answer.selectedAnswer !== answer.correctAnswer
    );
  }

  function getSkippedAnswers(attempt) {
    return getAnswers(attempt).filter(answer =>
      answer.selectedAnswer === null
    );
  }

  window.Storage = {
    getCurrentUser,
    getLatestAttempt,
    normalizeAnswer,
    getAnswers,
    getIncorrectAnswers,
    getSkippedAnswers
  };
})();
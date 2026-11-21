// BLIND SPOT INSIGHTS - DASHBOARD MODULE

// Available subjects
const subjects = [
    {
        id: "computer-science",
        name: "Computer Science",
        icon: "💻",
        className: "computer",
        description: "Explore programming, databases and computer fundamentals."
    },
    {
        id: "machine-learning",
        name: "Machine Learning",
        icon: "🧠",
        className: "machine",
        description: "Learn machine learning concepts, algorithms and applications."
    },
    {
        id: "english",
        name: "English",
        icon: "📖",
        className: "english",
        description: "Improve grammar, vocabulary and communication skills."
    }
];

// LOGIN PROTECTION
let currentUser = Storage.getCurrentUser();

if (!currentUser) {
    window.location.replace("index.html");
} else {
    initializeDashboard();
}

function initializeDashboard() {
    // Get latest student data from Module 1
    const users = Storage.getUsers();

    const savedUser = users.find(
        user => user.id === currentUser.id
    );

    if (!savedUser) {
        Storage.logout();
        window.location.replace("index.html");
        return;
    }

    currentUser = {
        id: savedUser.id,
        name: savedUser.name,
        phone: savedUser.phone,
        selectedSubjects: savedUser.selectedSubjects || []
    };

    Storage.setCurrentUser(currentUser);

    // Display student information
    document.getElementById("welcomeName").textContent =
        currentUser.name.split(" ")[0];

    document.getElementById("headerName").textContent =
        currentUser.name;

    document.getElementById("userAvatar").textContent =
        currentUser.name.charAt(0).toUpperCase();

    // Display saved subjects and statistics
    renderSubjects();
    updateStatistics();

    // Button events
    document.getElementById("addSubjectBtn")
        .addEventListener("click", openSubjectModal);

    document.getElementById("emptyAddBtn")
        .addEventListener("click", openSubjectModal);

    document.getElementById("closeModalBtn")
        .addEventListener("click", closeSubjectModal);

    document.getElementById("exploreBtn")
        .addEventListener("click", function() {
            document.getElementById("subjectsSection")
                .scrollIntoView({ behavior: "smooth" });
        });

    document.getElementById("logoutBtn")
        .addEventListener("click", logoutStudent);

    document.getElementById("subjectModal")
        .addEventListener("click", function(event) {
            if (event.target === this) {
                closeSubjectModal();
            }
        });

    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape") {
            closeSubjectModal();
        }
    });
}

// DISPLAY SUBJECT CARDS
function renderSubjects() {
    const container =
        document.getElementById("subjectsContainer");

    const emptyState =
        document.getElementById("emptyState");

    container.innerHTML = "";

    const selected = currentUser.selectedSubjects || [];

    if (selected.length === 0) {
        emptyState.classList.remove("hidden");
        return;
    }

    emptyState.classList.add("hidden");

    selected.forEach(function(subjectId) {
        const subject = subjects.find(
            item => item.id === subjectId
        );

        if (!subject) return;

        const card = document.createElement("article");
        card.className = "subject-card " + subject.className;

        const icon = document.createElement("div");
        icon.className = "subject-icon";
        icon.textContent = subject.icon;

        const title = document.createElement("h3");
        title.textContent = subject.name;

        const description = document.createElement("p");
        description.textContent = subject.description;

        const bottom = document.createElement("div");
        bottom.className = "subject-bottom";

        const label = document.createElement("span");
        label.className = "subject-label";
        label.textContent = "Ready to learn";

        const button = document.createElement("button");
        button.className = "explore-link";
        button.textContent = "Explore →";

        button.addEventListener("click", function() {
            openSubject(subject.id);
        });

        bottom.append(label, button);
        card.append(icon, title, description, bottom);
        container.appendChild(card);
    });
}

// OPEN SUBJECT LEARNING MODULE
function openSubject(subjectId) {
    localStorage.setItem("bsi_activeSubject", subjectId);

    // Module 3 will use this subject ID
    window.location.href = "learning.html";
}

// ADD SUBJECT MODAL
function openSubjectModal() {
    document.getElementById("subjectModal")
        .classList.remove("hidden");

    document.getElementById("modalMessage").textContent = "";

    renderAvailableSubjects();
}

function closeSubjectModal() {
    document.getElementById("subjectModal")
        .classList.add("hidden");
}

// SHOW SUBJECTS NOT YET SELECTED
function renderAvailableSubjects() {
    const container =
        document.getElementById("availableSubjects");

    container.innerHTML = "";

    const available = subjects.filter(function(subject) {
        return !currentUser.selectedSubjects.includes(subject.id);
    });

    if (available.length === 0) {
        const message = document.createElement("p");
        message.className = "all-added";
        message.textContent = "🎉 You've added all available subjects!";
        container.appendChild(message);
        return;
    }

    available.forEach(function(subject) {
        const item = document.createElement("div");
        item.className = "available-item";

        const info = document.createElement("div");
        info.className = "available-info";

        const icon = document.createElement("span");
        icon.textContent = subject.icon;

        const name = document.createElement("strong");
        name.textContent = subject.name;

        info.append(icon, name);

        const button = document.createElement("button");
        button.textContent = "+ Add";

        button.addEventListener("click", function() {
            addSubject(subject.id);
        });

        item.append(info, button);
        container.appendChild(item);
    });
}

// SAVE SUBJECT FOR CURRENT STUDENT
function addSubject(subjectId) {
    const validSubject = subjects.some(
        subject => subject.id === subjectId
    );

    if (!validSubject) return;

    if (currentUser.selectedSubjects.includes(subjectId)) {
        return;
    }

    currentUser.selectedSubjects.push(subjectId);

    // Update registered user record
    const users = Storage.getUsers();

    const userIndex = users.findIndex(
        user => user.id === currentUser.id
    );

    if (userIndex === -1) return;

    users[userIndex].selectedSubjects =
        [...currentUser.selectedSubjects];

    Storage.saveUsers(users);

    // Update current session
    Storage.setCurrentUser(currentUser);

    // Refresh dashboard
    renderSubjects();
    renderAvailableSubjects();
    updateStatistics();

    document.getElementById("modalMessage").textContent =
        "Subject added successfully!";
}

// DASHBOARD STATISTICS
function updateStatistics() {
    document.getElementById("totalSubjects").textContent =
        currentUser.selectedSubjects.length;

    // Module 4 will save quiz attempts using this key
    const allAttempts = JSON.parse(
        localStorage.getItem("bsi_quizAttempts") || "[]"
    );

    // Show attempts belonging to this student only
    const attempts = allAttempts.filter(
        attempt => attempt.userId === currentUser.id
    );

    document.getElementById("totalQuizzes").textContent =
        attempts.length;

    let totalCorrect = 0;
    let totalQuestions = 0;

    attempts.forEach(function(attempt) {
        totalCorrect += Number(attempt.correctCount) || 0;
        totalQuestions += Number(attempt.totalQuestions) || 0;
    });

    const accuracy = totalQuestions > 0
        ? Math.round((totalCorrect / totalQuestions) * 100)
        : 0;

    document.getElementById("overallAccuracy").textContent =
        accuracy + "%";
}

// LOGOUT - CONNECTED TO MODULE 1
function logoutStudent() {
    Storage.logout();
    localStorage.removeItem("bsi_activeSubject");
    window.location.replace("index.html");
}
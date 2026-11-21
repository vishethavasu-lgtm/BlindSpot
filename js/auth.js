const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const message = document.getElementById("message");

function showLogin() {
    loginForm.classList.remove("hidden");
    registerForm.classList.add("hidden");

    document.getElementById("loginTab").classList.add("active");
    document.getElementById("registerTab").classList.remove("active");

    message.textContent = "";
}

function showRegister() {
    registerForm.classList.remove("hidden");
    loginForm.classList.add("hidden");

    document.getElementById("registerTab").classList.add("active");
    document.getElementById("loginTab").classList.remove("active");

    message.textContent = "";
}

// Student Registration
registerForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("registerName").value.trim();
    const phone = document.getElementById("registerPhone").value.trim();
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!/^[0-9]{10}$/.test(phone)) {
        message.style.color = "red";
        message.textContent = "Enter a valid 10-digit phone number.";
        return;
    }

    if (password.length < 6) {
        message.style.color = "red";
        message.textContent = "Password must contain at least 6 characters.";
        return;
    }

    if (password !== confirmPassword) {
        message.style.color = "red";
        message.textContent = "Passwords do not match.";
        return;
    }

    const users = Storage.getUsers();

    if (users.some(user => user.phone === phone)) {
        message.style.color = "red";
        message.textContent = "Phone number already registered.";
        return;
    }

    const newUser = {
        id: Date.now(),
        name: name,
        phone: phone,
        password: password,
        selectedSubjects: []
    };

    users.push(newUser);
    Storage.saveUsers(users);

    message.style.color = "green";
    message.textContent = "Registration successful! Please login.";

    registerForm.reset();
    showLogin();
});

// Student Login
loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const phone = document.getElementById("loginPhone").value.trim();
    const password = document.getElementById("loginPassword").value;

    const users = Storage.getUsers();

    const user = users.find(function(item) {
        return item.phone === phone && item.password === password;
    });

    if (!user) {
        message.style.color = "red";
        message.textContent = "Invalid phone number or password.";
        return;
    }

    Storage.setCurrentUser({
        id: user.id,
        name: user.name,
        phone: user.phone,
        selectedSubjects: user.selectedSubjects || []
    });

    message.style.color = "green";
    message.textContent = "Login successful!";

    setTimeout(function() {
        window.location.href = "dashboard.html";
    }, 500);
});
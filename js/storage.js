const Storage = {
    getUsers() {
        return JSON.parse(localStorage.getItem("bsi_users")) || [];
    },

    saveUsers(users) {
        localStorage.setItem("bsi_users", JSON.stringify(users));
    },

    getCurrentUser() {
        return JSON.parse(localStorage.getItem("bsi_currentUser"));
    },

    setCurrentUser(user) {
        localStorage.setItem("bsi_currentUser", JSON.stringify(user));
    },

    logout() {
        localStorage.removeItem("bsi_currentUser");
    }
};

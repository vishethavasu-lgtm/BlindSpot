const Storage = {
    getUsers() {
        try {
            const users = localStorage.getItem("bsi_users");
            return users ? JSON.parse(users) : [];
        } catch (error) {
            console.error("Error getting users:", error);
            return [];
        }
    },

    saveUsers(users) {
        try {
            localStorage.setItem("bsi_users", JSON.stringify(users));
        } catch (error) {
            console.error("Error saving users:", error);
        }
    },

    getCurrentUser() {
        try {
            const user = localStorage.getItem("bsi_currentUser");
            return user ? JSON.parse(user) : null;
        } catch (error) {
            console.error("Error getting current user:", error);
            return null;
        }
    },

    setCurrentUser(user) {
        try {
            localStorage.setItem(
                "bsi_currentUser",
                JSON.stringify(user)
            );
        } catch (error) {
            console.error("Error setting current user:", error);
        }
    },

    logout() {
        localStorage.removeItem("bsi_currentUser");
    },

    clearAll() {
        localStorage.removeItem("bsi_users");
        localStorage.removeItem("bsi_currentUser");
    }
};

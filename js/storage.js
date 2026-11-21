// BLIND SPOT INSIGHTS
// MODULE 1 - STORAGE MANAGEMENT

const Storage = {

    // Get all registered users
    getUsers() {
        try {
            const users = localStorage.getItem("bsi_users");
            return users ? JSON.parse(users) : [];
        } catch (error) {
            console.error("Error getting users:", error);
            return [];
        }
    },

    // Save all registered users
    saveUsers(users) {
        try {
            if (!Array.isArray(users)) {
                console.error("Invalid users data");
                return;
            }

            localStorage.setItem(
                "bsi_users",
                JSON.stringify(users)
            );
        } catch (error) {
            console.error("Error saving users:", error);
        }
    },

    // Get currently logged-in user
    getCurrentUser() {
        try {
            const user = localStorage.getItem("bsi_currentUser");
            return user ? JSON.parse(user) : null;
        } catch (error) {
            console.error("Error getting current user:", error);
            return null;
        }
    },

    // Set currently logged-in user
    setCurrentUser(user) {
        try {
            if (!user || typeof user !== "object") {
                console.error("Invalid current user data");
                return;
            }

            localStorage.setItem(
                "bsi_currentUser",
                JSON.stringify(user)
            );
        } catch (error) {
            console.error("Error setting current user:", error);
        }
    },

    // Logout current user
    logout() {
        try {
            localStorage.removeItem("bsi_currentUser");
        } catch (error) {
            console.error("Error during logout:", error);
        }
    },

    // Clear all stored user data
    clearAll() {
        try {
            localStorage.removeItem("bsi_users");
            localStorage.removeItem("bsi_currentUser");
        } catch (error) {
            console.error("Error clearing storage:", error);
        }
    }
};
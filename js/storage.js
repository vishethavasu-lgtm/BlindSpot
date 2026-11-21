const Storage = {

  getUsers() {
    return JSON.parse(localStorage.getItem("bsi_users")) || [];
  },

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("bsi_currentUser")) || null;
  },

  setCurrentUser(user) {
    localStorage.setItem("bsi_currentUser", JSON.stringify(user));
  },

  logout() {
    localStorage.removeItem("bsi_currentUser");
  },

  saveUsers(users) {
    localStorage.setItem("bsi_users", JSON.stringify(users));
  }

};
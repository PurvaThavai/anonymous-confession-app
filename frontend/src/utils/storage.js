// src/utils/storage.js

// Initialize seed data
export function ensureSeedData() {
  if (!localStorage.getItem("users")) {
    localStorage.setItem(
      "users",
      JSON.stringify([
        {
          id: 1,
          name: "Admin",
          email: "admin@confess.com",
          username: "admin",
          contact: "0000000000",
          password: "admin123",
          role: "admin",
          blocked: false
        },
      ])
    );
    localStorage.setItem("confessions", JSON.stringify([]));
  }
}

// Register a new user
export function registerUser(user) {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  user.id = Date.now();
  user.role = "user";
  user.blocked = false;
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
}

// Login user by username/email & password
export function loginUser(usernameOrEmail, password) {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const found = users.find(
    u =>
      (u.username === usernameOrEmail || u.email === usernameOrEmail) &&
      u.password === password &&
      !u.blocked
  );
  if (found) {
    localStorage.setItem("currentUser", JSON.stringify(found));
    return found;
  }
  return null;
}

// Get logged-in user
export function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser") || "null");
}

// Logout
export function clearCurrentUser() {
  localStorage.removeItem("currentUser");
}

// Add a new confession
export function addConfession(conf) {
  const list = JSON.parse(localStorage.getItem("confessions") || "[]");
  conf.id = Date.now();
  conf.approved = false;
  list.push(conf);
  localStorage.setItem("confessions", JSON.stringify(list));
}

// Get approved confessions
export function getApprovedConfessions() {
  const list = JSON.parse(localStorage.getItem("confessions") || "[]");
  return list.filter(c => c.approved);
}

// Get pending confessions (for admin)
export function getPendingConfessions() {
  const list = JSON.parse(localStorage.getItem("confessions") || "[]");
  return list.filter(c => !c.approved);
}

// Approve confession
export function approveConfession(id) {
  const list = JSON.parse(localStorage.getItem("confessions") || "[]");
  const updated = list.map(c => (c.id === id ? { ...c, approved: true } : c));
  localStorage.setItem("confessions", JSON.stringify(updated));
}

// Delete confession
export function deleteConfession(id) {
  const list = JSON.parse(localStorage.getItem("confessions") || "[]");
  const filtered = list.filter(c => c.id !== id);
  localStorage.setItem("confessions", JSON.stringify(filtered));
}

// Get all users
export function getAllUsers() {
  return JSON.parse(localStorage.getItem("users") || "[]");
}

// Block a user
export function blockUser(username) {
  const list = JSON.parse(localStorage.getItem("users") || "[]");
  const updated = list.map(u => (u.username === username ? { ...u, blocked: true } : u));
  localStorage.setItem("users", JSON.stringify(updated));
}

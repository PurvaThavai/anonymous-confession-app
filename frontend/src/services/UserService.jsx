import axios from "axios";

const BASE_URL = "http://localhost:4900/users/confessions";
const BASE_URL_1 = "http://localhost:4900/confessions";

// Fetch all or filtered confessions
export async function getAllConfessions(category = "all") {
  try {
    let url = BASE_URL;
    if (category !== "all") {
      url += `?category=${encodeURIComponent(category)}`;
    }

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching confessions:", error);
    return [];
  }
}

// Add confession
export async function addConfession(confessionData, token) {
  try {
    const response = await axios.post(`${BASE_URL}/add`, confessionData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding confession:", error);
    throw error;
  }
}

// Fetch all confessions
export async function getAllConfessions1() {
  try {
    const response = await axios.get(BASE_URL_1);
    return response.data;
  } catch (error) {
    console.error("Error fetching confessions:", error);
    throw error;
  }
}

// Get pending confessions
export async function getPendingConfessions() {
  try {
    const response = await axios.get(`${BASE_URL_1}/pending`);
    return response.data;
  } catch (error) {
    console.error("Error fetching pending confessions:", error);
    throw error;
  }
}

// Update confession status
export async function updateConfessionStatus(confession_id, status) {
  try {
    const response = await axios.put(
      `${BASE_URL_1}/${confession_id}`,
      { status },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating confession status:", error);
    throw error;
  }
}

// Fetch all users
export async function getAllUsers() {
  try {
    const response = await axios.get("http://localhost:4900/users");
    return response.data;
  } catch (error) {
    console.error("Error in fetching users info:", error);
    throw error;
  }
}

// Register user
// // makes the function asynchronous, meaning it can perform tasks like fetching data from a server without blocking other code from running.
// registerUser → the function name.

// (userData) → the parameter, which will contain all the user’s registration details (like name, email, password, etc.) passed from the frontend form.
export async function registerUser(userData) {
  try {
    // await → pauses this function until the axios.post() request finishes (because we’re using async).
    const response = await axios.post( //axios.post() → makes a POST request to the given URL
      "http://localhost:4900/users/signup",
      userData
    );
    return response.data;
  } catch (error) {
    console.log("Error in registration process");
    console.log(error.data.message);
  }
}

// Get user's own confessions
export async function getOwnConfessions(token) {
  try {
    const response = await axios.get(
      "http://localhost:4900/users/confessions/own",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching own confessions:", error);
    throw error;
  }
}

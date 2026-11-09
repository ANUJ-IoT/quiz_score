const Base = "http://localhost:3001";

export async function getLeaderboard() {
  const data = await fetch(`${Base}/leaderboard`).then((r) => r.json());
  return data;
}

export async function saveScore({ username, score, category }) {
  const data = await fetch(`${Base}/leaderboard`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, score, category }),
  }).then((r) => r.json());
  return data;
}

export async function loginUser({ username, password }) {
  const data = await fetch(`${Base}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  }).then((r) => r.json());
  return data;
}

export async function registerUser({ username, password }) {
  const data = await fetch(`${Base}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  }).then((r) => r.json());
  return data;
}

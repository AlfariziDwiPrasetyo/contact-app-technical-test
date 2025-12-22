import type { User, AuthSession } from "./auth";

const USERS_KEY = "users";
const SESSION_KEY = "session";

const getUsers = (): User[] =>
  JSON.parse(localStorage.getItem(USERS_KEY) || "[]");

const saveUsers = (users: User[]) =>
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

// Service nya
export const authService = {
  register: async (email: string, password: string): Promise<void> => {
    await new Promise((r) => setTimeout(r, 800));

    const users = getUsers();

    const exists = users.find((u) => u.email === email);

    if (exists) {
      throw new Error("Email sudah terdaftar");
    }

    users.push({
      id: crypto.randomUUID(),
      email,
      password,
    });

    saveUsers(users);
  },

  login: async (email: string, password: string): Promise<AuthSession> => {
    await new Promise((r) => setTimeout(r, 800));

    const users = getUsers();
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      throw new Error("Email atau password salah");
    }

    const session: AuthSession = {
      token: crypto.randomUUID(),
      user: {
        id: user.id,
        email: user.email,
      },
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return session;
  },

  getSession: (): AuthSession | null =>
    JSON.parse(localStorage.getItem(SESSION_KEY) || "null"),

  logout: () => {
    localStorage.removeItem(SESSION_KEY);
  },
};

import { create } from "zustand";

interface userI {
  id: string;
  name: string;
  email: string;
  username: string;
  avatar: string;
}

interface cardI {
  question: string;
  response: string;
  group: string;
}

interface GlobalStoreI {
  initialized: boolean;
  isLoggedIn: boolean;
  user: null | userI;
  cards: cardI[];
  groups: string[];
  login: (user: userI) => void;
  logout: () => void;
  setCards: (cards: cardI[]) => void;
  setGroups: (groups: string[]) => void;
}

export const useGlobalStore = create<GlobalStoreI>((set) => ({
  initialized: false,
  isLoggedIn: false,
  user: null,
  cards: [],
  groups: [],
  login: (user) => set({ isLoggedIn: true, user, initialized: true }),
  logout: () => set({ isLoggedIn: false, user: null, initialized: true }),
  setCards: (cards) => set({ cards }),
  setGroups: (groups) => set({ groups }),
}));

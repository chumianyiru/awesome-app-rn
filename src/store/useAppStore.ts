import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppState {
  theme: 'light' | 'dark';
  notifications: boolean;
  language: 'zh' | 'en';
  counter: number;
  user: {
    name: string;
    email: string;
    avatar: string;
  } | null;
  setTheme: (theme: 'light' | 'dark') => void;
  setNotifications: (enabled: boolean) => void;
  setLanguage: (lang: 'zh' | 'en') => void;
  incrementCounter: () => void;
  decrementCounter: () => void;
  setUser: (user: AppState['user']) => void;
  loadSettings: () => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  theme: 'light',
  notifications: true,
  language: 'zh',
  counter: 0,
  user: null,

  setTheme: (theme) => {
    AsyncStorage.setItem('theme', theme);
    set({theme});
  },

  setNotifications: (notifications) => {
    AsyncStorage.setItem('notifications', String(notifications));
    set({notifications});
  },

  setLanguage: (language) => {
    AsyncStorage.setItem('language', language);
    set({language});
  },

  incrementCounter: () => set((state) => ({counter: state.counter + 1})),
  decrementCounter: () => set((state) => ({counter: state.counter - 1})),

  setUser: (user) => set({user}),

  loadSettings: async () => {
    try {
      const theme = await AsyncStorage.getItem('theme');
      const notifications = await AsyncStorage.getItem('notifications');
      const language = await AsyncStorage.getItem('language');

      set({
        theme: (theme as 'light' | 'dark') || 'light',
        notifications: notifications !== 'false',
        language: (language as 'zh' | 'en') || 'zh',
        user: {
          name: '用户名称',
          email: 'user@example.com',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user',
        },
      });
    } catch (e) {
      console.error('加载设置失败', e);
    }
  },
}));

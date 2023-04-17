import { create } from 'zustand'
import { combine, persist } from 'zustand/middleware'


interface UserState {
    user: any | null,
    setUser: (user: any) => void;
    removeUser: () => void;
    isAuthenticated: boolean;
}

const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            setUser: (user: string) => set({ user: user , isAuthenticated: true }),
            removeUser: () => set({ user: null , isAuthenticated: false }),
        }),
        { name: 'user-storage' }
    )
);



export default useUserStore;

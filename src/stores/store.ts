import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

// Example Counter Store
interface CounterState {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
}

export const useCounterStore = create<CounterState>()(
  devtools(
    persist(
      (set) => ({
        count: 0,
        increment: () => set((state) => ({ count: state.count + 1 })),
        decrement: () => set((state) => ({ count: state.count - 1 })),
        reset: () => set({ count: 0 }),
      }),
      {
        name: 'counter-storage',
      }
    )
  )
)

// Example User Store (template for authentication, etc.)
interface User {
  id: string
  name: string
  email: string
}

interface UserState {
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
  updateUser: (user: Partial<User>) => void
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,
        login: (user) => set({ user, isAuthenticated: true }),
        logout: () => set({ user: null, isAuthenticated: false }),
        updateUser: (updatedUser) =>
          set((state) => ({
            user: state.user ? { ...state.user, ...updatedUser } : null,
          })),
      }),
      {
        name: 'user-storage',
      }
    )
  )
)

// Example UI Store (for modals, sidebars, etc.)
interface UIState {
  sidebarOpen: boolean
  modalOpen: boolean
  toggleSidebar: () => void
  openModal: () => void
  closeModal: () => void
}

export const useUIStore = create<UIState>()(
  devtools((set) => ({
    sidebarOpen: false,
    modalOpen: false,
    toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    openModal: () => set({ modalOpen: true }),
    closeModal: () => set({ modalOpen: false }),
  }))
)

export interface User {
    _id: string;
    name: string;
    email: string;
    isPremium: boolean;
    role: "user" | "admin";
  }
  
  export interface UserContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    fetchUser: () => Promise<void>;
    loading: boolean;
  }
  
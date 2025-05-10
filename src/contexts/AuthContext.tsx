
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

type UserType = {
  uid: string;
  email?: string | null;
  phoneNumber?: string | null;
  displayName?: string | null;
  photoURL?: string | null;
} | null;

type AuthContextType = {
  currentUser: UserType;
  loading: boolean;
  registerWithEmail: (email: string, password: string) => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  loginWithPhone: (phoneNumber: string) => Promise<void>;
  verifyPhoneCode: (code: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (data: Partial<UserType>) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserType>(null);
  const [loading, setLoading] = useState(true);
  
  // Mock Firebase Auth for now
  useEffect(() => {
    // Check if user is stored in localStorage (simulating persistence)
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Register with email
  const registerWithEmail = async (email: string, password: string) => {
    try {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user creation
      const newUser = {
        uid: `user_${Date.now()}`,
        email: email,
        displayName: email.split('@')[0],
        photoURL: null,
      };
      
      setCurrentUser(newUser);
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      
      toast.success("Account created successfully!");
      return Promise.resolve();
    } catch (error) {
      console.error(error);
      toast.error("Failed to create an account.");
      return Promise.reject(error);
    } finally {
      setLoading(false);
    }
  };

  // Login with email
  const loginWithEmail = async (email: string, password: string) => {
    try {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      const user = {
        uid: `user_${Date.now()}`,
        email: email,
        displayName: email.split('@')[0],
        photoURL: null,
      };
      
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      toast.success("Logged in successfully!");
      return Promise.resolve();
    } catch (error) {
      console.error(error);
      toast.error("Failed to log in.");
      return Promise.reject(error);
    } finally {
      setLoading(false);
    }
  };

  // Login with phone
  const loginWithPhone = async (phoneNumber: string) => {
    try {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would trigger SMS verification
      toast.info("Verification code sent to your phone!");
      
      // Store phone number temporarily
      sessionStorage.setItem('pendingPhoneAuth', phoneNumber);
      return Promise.resolve();
    } catch (error) {
      console.error(error);
      toast.error("Failed to send verification code.");
      return Promise.reject(error);
    } finally {
      setLoading(false);
    }
  };

  // Verify phone code
  const verifyPhoneCode = async (code: string) => {
    try {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const phoneNumber = sessionStorage.getItem('pendingPhoneAuth');
      if (!phoneNumber) {
        throw new Error("No phone verification in progress");
      }
      
      // Mock successful verification
      if (code === '123456') { // In a real app, this would verify against Firebase
        const user = {
          uid: `user_${Date.now()}`,
          phoneNumber: phoneNumber,
          displayName: null,
          photoURL: null,
        };
        
        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        sessionStorage.removeItem('pendingPhoneAuth');
        
        toast.success("Phone verified successfully!");
        return Promise.resolve();
      } else {
        throw new Error("Invalid verification code");
      }
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Failed to verify code.");
      return Promise.reject(error);
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setCurrentUser(null);
      localStorage.removeItem('currentUser');
      
      toast.success("Logged out successfully!");
      return Promise.resolve();
    } catch (error) {
      console.error(error);
      toast.error("Failed to log out.");
      return Promise.reject(error);
    }
  };

  // Reset Password
  const resetPassword = async (email: string) => {
    try {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Password reset email sent!");
      return Promise.resolve();
    } catch (error) {
      console.error(error);
      toast.error("Failed to send password reset email.");
      return Promise.reject(error);
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateUserProfile = async (data: Partial<UserType>) => {
    try {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!currentUser) throw new Error("No user is logged in");
      
      const updatedUser = { ...currentUser, ...data };
      setCurrentUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      
      toast.success("Profile updated successfully!");
      return Promise.resolve();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile.");
      return Promise.reject(error);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentUser,
    loading,
    registerWithEmail,
    loginWithEmail,
    loginWithPhone,
    verifyPhoneCode,
    logout,
    resetPassword,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

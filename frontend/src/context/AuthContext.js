import { jsx as _jsx } from "react/jsx-runtime";
// /* eslint-disable react-refresh/only-export-components */
// import { createContext, useContext, useState, type ReactNode } from 'react';
// import axios from 'axios';
// interface User {
//   id: string;
//   email: string;
//   role: string;
// }
// interface AuthContextType {
//   user: User | null;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => void;
// }
// const AuthContext = createContext<AuthContextType | undefined>(undefined);
// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const login = async (email: string, password: string) => {
//     const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
//     localStorage.setItem('token', res.data.token);
//     setUser(res.data.user);
//     axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
//   };
//   const logout = () => {
//     localStorage.removeItem('token');
//     setUser(null);
//     delete axios.defaults.headers.common['Authorization'];
//   };
//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error('useAuth must be used within AuthProvider');
//   return context;
// };
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
const AuthContext = createContext(undefined);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // prevent flash of unprotected content
    // Check if user is already logged in on app load
    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setIsLoading(false);
                return;
            }
            try {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const res = await axios.get('http://localhost:5000/api/auth/me'); // endpoint to get current user
                setUser(res.data.user);
            }
            catch (err) {
                localStorage.removeItem('token');
                delete axios.defaults.headers.common['Authorization'];
            }
            finally {
                setIsLoading(false);
            }
        };
        loadUser();
    }, []);
    const login = async (email, password) => {
        const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
        const { token, user } = res.data;
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser(user);
        return user; // This is critical for role-based redirect!
    };
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        delete axios.defaults.headers.common['Authorization'];
    };
    return (_jsx(AuthContext.Provider, { value: { user, login, logout, isLoading }, children: children }));
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error('useAuth must be used within AuthProvider');
    return context;
};

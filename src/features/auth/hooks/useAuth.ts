import { useEffect, useState } from "react";
import type { AuthUser } from "../interface/authInterface";

const TOKEN_KEY = "auth-token";
const USER_KEY = "auth-user";

// hook untuk autentikasi

export const useAuth = () => {
	const [user, setUser] = useState<AuthUser | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	// inisial state dari localStorage saat pertama kali hook digunakan
	useEffect(() => {
		const storedToken = localStorage.getItem(TOKEN_KEY);
		const storedUser = localStorage.getItem(USER_KEY);

		if (storedToken && storedUser) {
			setToken(storedToken);
			setUser(JSON.parse(storedUser));
		}
		setIsLoading(false);
	}, []);

	// fungsi untuk login, menyimpan token dan user ke state dan localStorage
	const login = (newUser: AuthUser, newToken: string) => {
		setUser(newUser);
		setToken(newToken);
		localStorage.setItem(TOKEN_KEY, newToken);
		localStorage.setItem(USER_KEY, JSON.stringify(newUser));
	};

	// fungsi untuk logout, menghapus token dan user dari state dan localStorage
	const logout = () => {
		setUser(null);
		setToken(null);
		localStorage.removeItem(TOKEN_KEY);
		localStorage.removeItem(USER_KEY);
	};

	// menentukan apakah user sudah terautentikasi berdasarkan token dan user
	const isAuthenticated = !!token && !!user;

	return {
		user,
		token,
		isLoading,
		isAuthenticated,
		login,
		logout,
	};
};

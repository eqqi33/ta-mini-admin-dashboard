import { useEffect, useState } from "react";
import { verifyMockToken } from "@/features/auth/services/authService";
import type { AuthUser } from "../interface/authInterface";

const TOKEN_KEY = "authToken";
const USER_KEY = "authUser";

// hook untuk autentikasi

export const useAuth = () => {
	const [user, setUser] = useState<AuthUser | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	// inisial state dari localStorage saat pertama kali hook digunakan
	// verifikasi token untuk memastikan valid
	useEffect(() => {
		const storedToken = localStorage.getItem(TOKEN_KEY);
		const storedUser = localStorage.getItem(USER_KEY);

		if (storedToken && storedUser) {
			// Verifikasi token
			const verifiedPayload = verifyMockToken(storedToken);

			if (verifiedPayload) {
				// Token valid, set state
				setToken(storedToken);
				setUser(JSON.parse(storedUser));
			} else {
				// Token invalid atau expired, clear localStorage dan logout
				console.warn(
					"Token tidak valid atau sudah expired, silakan login kembali",
				);
				localStorage.removeItem(TOKEN_KEY);
				localStorage.removeItem(USER_KEY);
				setUser(null);
				setToken(null);
			}
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

import type {
	LoginRequest,
	LoginResponse,
} from "@/features/auth/interface/loginInterface";

// mocking api untuk simulasi login
export const loginAPI = async (
	credentials: LoginRequest,
): Promise<LoginResponse> => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (
				credentials.email === "admin@admin.com" &&
				credentials.password === "admin123"
			) {
				resolve({
					token: `mock-jwt-token-${Date.now()}`,
					user: {
						id: "1",
						email: credentials.email,
						name: "Admin User",
					},
				});
			} else {
				reject(new Error("Email atau password tidak sesuai"));
			}
		}, 1500); // simulasi dengan 1.5 detik delay untuk efek loading dari jaringan
	});
};

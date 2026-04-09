import type {
	LoginRequest,
	LoginResponse,
} from "@/features/auth/interface/loginInterface";

// Simple JWT token generator untuk mock
const generateMockToken = (email: string, userId: string): string => {
	const payload = {
		email,
		id: userId,
		iat: Date.now(), // issued at
		exp: Date.now() + 60 * 60 * 1000, // expires in 1 hour
	};

	// Encode payload ke base64 (bukan real JWT, ini hanya untuk simulasi)
	const encodedPayload = btoa(JSON.stringify(payload));

	// Simple signature (dalam real JWT ini pakai HMAC, tapi ini mock)
	const signature = btoa(`${email + userId}secret-key`);

	return `${encodedPayload}.${signature}`;
};

// verifikasi mock token
export const verifyMockToken = (
	token: string,
): { email: string; id: string } | null => {
	try {
		const parts = token.split(".");
		if (parts.length !== 2) return null;

		const [encodedPayload, signature] = parts;

		// Decode payload
		const payloadStr = atob(encodedPayload);
		const payload = JSON.parse(payloadStr);

		// Cek expired
		if (payload.exp < Date.now()) {
			console.warn("Token sudah expired");
			return null;
		}

		// Verifikasi signature
		const expectedSignature = btoa(`${payload.email + payload.id}secret-key`);
		if (signature !== expectedSignature) {
			console.warn("Token signature tidak valid");
			return null;
		}

		return { email: payload.email, id: payload.id };
	} catch (error) {
		console.warn("Token verification failed:", error);
		return null;
	}
};

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
				const token = generateMockToken("admin@admin.com", "1");

				// Simpan token ke localStorage
				localStorage.setItem("authToken", token);

				resolve({
					token,
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

// Logout function
export const logoutAPI = async (): Promise<void> => {
	localStorage.removeItem("authToken");
};

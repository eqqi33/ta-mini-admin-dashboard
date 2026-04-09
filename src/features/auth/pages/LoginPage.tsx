import { useNavigate } from "react-router-dom";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { useAuth } from "@/features/auth/hooks/useAuth";

export const LoginPage = () => {
	const navigate = useNavigate();
	const { login } = useAuth();

	const handleLoginSuccess = (token: string, email: string) => {
		login(
			{
				id: "1",
				email,
				name: email.split("@")[0],
			},
			token,
		);
		navigate("/dashboard");
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
			<div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
				<h1 className="mb-2 text-2xl font-bold text-gray-900">Login</h1>
				<p className="mb-6 text-gray-600">Masukkan email dan password Anda</p>

				<LoginForm onSuccess={handleLoginSuccess} />

				<div className="mt-6 rounded bg-blue-50 p-4 text-sm text-blue-900">
					<p className="font-semibold">Demo Credentials:</p>
					<p>Email: admin@admin.com</p>
					<p>Password: admin123</p>
				</div>
			</div>
		</div>
	);
};

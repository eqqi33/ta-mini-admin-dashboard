import { Navigate } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import type { ProtectedRouteProps } from "@/shared/interface/protectedInterface";

// Komponen untuk halaman publik (login, register, dll)
// Jika user sudah authenticated, redirect ke dashboard
export const PublicRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const { isAuthenticated, isLoading } = useAuth();

	if (isLoading) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<div className="text-gray-600">Proses...</div>
			</div>
		);
	}

	if (isAuthenticated) {
		return <Navigate to="/dashboard" replace />;
	}

	return <>{children}</>;
};

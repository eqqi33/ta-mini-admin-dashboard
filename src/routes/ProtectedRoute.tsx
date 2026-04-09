import { Navigate } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import type { ProtectedRouteProps } from "@/shared/interface/protectedInterface";

// komponen untuk menjaga routing yang hanya bisa diakses oleh pengguna yang sudah terautentikasi
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const { isAuthenticated, isLoading } = useAuth();

	if (isLoading) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<div className="text-gray-600">Proses...</div>
			</div>
		);
	}

	if (!isAuthenticated) {
		return <Navigate to="/login" replace />;
	}

	return <>{children}</>;
};

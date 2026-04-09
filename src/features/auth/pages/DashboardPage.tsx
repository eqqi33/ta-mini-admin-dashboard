import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { EmployeeDataTable } from "@/features/employees/components/EmployeeDataTable";
import { Button } from "@/shared/components/ui/button";

export const DashboardPage = () => {
	const navigate = useNavigate();
	const { user, logout } = useAuth();

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<nav className="border-b border-gray-200 bg-white shadow">
				<div className="mx-auto max-w-7xl px-4 py-4">
					<div className="flex items-center justify-between">
						<h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
						<div className="flex items-center gap-4">
							<span className="text-gray-700">
								Selamat Datang, {user?.name}
							</span>
							<Button onClick={handleLogout} variant="outline">
								Logout
							</Button>
						</div>
					</div>
				</div>
			</nav>

			<main className="mx-auto max-w-7xl px-4 py-8">
				{/* User Info Card */}
				<div className="mb-8 rounded-lg bg-white p-6 shadow">
					<h2 className="mb-4 text-xl font-semibold text-gray-900">Welcome</h2>
					<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
						<div className="rounded bg-blue-50 p-4">
							<h3 className="font-semibold text-blue-900">User Info</h3>
							<p className="text-sm text-blue-700">Email: {user?.email}</p>
							<p className="text-sm text-blue-700">ID: {user?.id}</p>
						</div>
					</div>
				</div>

				{/* Employees DataTable API */}
				<div className="rounded-lg bg-white p-6 shadow">
					<div className="mb-2 flex items-center gap-2">
						<h2 className="text-xl font-semibold text-gray-900">
							Employees dari Reqres API
						</h2>
						<span className="inline-block rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800">
							Real API
						</span>
					</div>
					<p className="mb-4 text-sm text-gray-500">
						Ambil real data dari Reqres -
						https://reqres.in/api/collections/employees/records
					</p>
					<EmployeeDataTable />
				</div>
			</main>
		</div>
	);
};

import type { EmployeeStatsCardProps } from "@/features/employees/interface/employeeInterface";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";

export const EmployeeStatsCard: React.FC<EmployeeStatsCardProps> = ({
	stats,
	isLoading,
}) => {
	if (isLoading) {
		return (
			<Card>
				<CardHeader>
					<div className="space-y-2">
						<div className="h-6 w-1/3 animate-pulse rounded bg-slate-200" />
						<div className="h-4 w-1/2 animate-pulse rounded bg-slate-200" />
					</div>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<div className="h-4 w-full animate-pulse rounded bg-slate-200" />
						<div className="h-4 w-full animate-pulse rounded bg-slate-200" />
					</div>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card>
			<CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
				<CardTitle>Statistik Karyawan</CardTitle>
				<CardDescription className="text-slate-700">
					Total Aktif:{" "}
					<span className="font-bold text-blue-600">{stats.active}</span> dari{" "}
					{stats.total} karyawan
				</CardDescription>
			</CardHeader>

			<CardContent>
				{/* Stats grid */}
				<div className="mb-6 grid grid-cols-3 gap-4 border-b border-slate-200 py-6">
					{/* Total */}
					<div className="space-y-1">
						<p className="text-xs uppercase tracking-wide text-slate-500">
							Total
						</p>
						<p className="text-2xl font-bold text-slate-900">{stats.total}</p>
					</div>

					{/* Active */}
					<div className="space-y-1">
						<p className="text-xs uppercase tracking-wide text-green-600">
							Aktif
						</p>
						<p className="text-2xl font-bold text-green-600">{stats.active}</p>
					</div>

					{/* Inactive */}
					<div className="space-y-1">
						<p className="text-xs uppercase tracking-wide text-red-600">
							Tidak Aktif
						</p>
						<p className="text-2xl font-bold text-red-600">{stats.inactive}</p>
					</div>
				</div>

				{/* Department breakdown */}
				<div>
					<h3 className="mb-4 text-sm font-semibold text-slate-900">
						Per Departemen
					</h3>

					{stats.byDepartment.length > 0 ? (
						<div className="space-y-3">
							{stats.byDepartment.map((dept) => (
								<div key={dept.department}>
									<div className="mb-1 flex justify-between text-sm">
										<span className="font-medium text-slate-700">
											{dept.department}
										</span>
										<span className="text-slate-600">
											{dept.count} ({dept.percentage}%)
										</span>
									</div>
									<div className="h-2 overflow-hidden rounded-full bg-slate-200">
										<div
											className="h-full bg-blue-500 transition-all"
											style={{ width: `${dept.percentage}%` }}
										/>
									</div>
								</div>
							))}
						</div>
					) : (
						<p className="text-center text-sm text-slate-500">
							Tidak ada data karyawan aktif
						</p>
					)}
				</div>
			</CardContent>
		</Card>
	);
};

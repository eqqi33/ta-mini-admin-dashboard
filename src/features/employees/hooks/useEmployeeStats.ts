import { useEffect, useState } from "react";
import type { EmployeeStats } from "@/features/employees/interface/employeeInterface";
import { getEmployeesAPI } from "@/features/employees/services/employeesService";
import { calculateEmployeeStats } from "@/features/employees/utils/employeeStats";

export const useEmployeeStats = () => {
	const [stats, setStats] = useState<EmployeeStats | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchStats = async () => {
			try {
				setIsLoading(true);
				setError(null);

				// Fetch all employees tanpa pagination untuk aggregation
				const response = await getEmployeesAPI({
					page: 1,
					pageSize: 1000, // fetch enough records
				});

				// Calculate stats
				const calculatedStats = calculateEmployeeStats(response.data);
				setStats(calculatedStats);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Gagal memuat statistik");
			} finally {
				setIsLoading(false);
			}
		};

		fetchStats();
	}, []);

	return { stats, isLoading, error };
};

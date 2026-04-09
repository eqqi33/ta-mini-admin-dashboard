import type {
	DepartmentStats,
	Employee,
	EmployeeStats,
} from "@/features/employees/interface/employeeInterface";

// Hitung statistik employee berdasarkan is_active dan grouping per department

export const calculateEmployeeStats = (
	employees: Employee[],
): EmployeeStats => {
	const total = employees.length;
	const activeEmployees = employees.filter((emp) => emp.is_active);
	const active = activeEmployees.length;
	const inactive = total - active;

	// Group active employees by department
	const departmentMap = new Map<string, number>();

	activeEmployees.forEach((emp) => {
		const dept = emp.department || "Unknown";
		departmentMap.set(dept, (departmentMap.get(dept) || 0) + 1);
	});

	// Convert to array dan sort by department name ascending
	const byDepartment: DepartmentStats[] = Array.from(departmentMap.entries())
		.map(([department, count]) => ({
			department,
			count,
			percentage: active > 0 ? Math.round((count / active) * 100) : 0,
		}))
		.sort((a, b) => a.department.localeCompare(b.department));

	return {
		total,
		active,
		inactive,
		byDepartment,
	};
};

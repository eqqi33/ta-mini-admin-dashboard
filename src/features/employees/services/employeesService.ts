import type {
	Employee,
	EmployeeApiItem,
} from "@/features/employees/interface/employeeInterface";
import type { EmployeeFilter } from "@/features/employees/type/employeeType";
import type {
	ApiQueryParams,
	ApiResponse,
} from "@/shared/interface/apiInterface";
import { ApiService } from "@/shared/lib/apiService";

// Service untuk fetching data employees dari Reqres dengan fitur pagination dan sorting
class EmployeesApiService extends ApiService<Employee> {
	private static readonly API_URL =
		"https://reqres.in/api/collections/employees/records";
	private static readonly API_KEY =
		"pub_2e0da52adf6613ab9fa60470e6875c6e15f6f6d730208ee30917134efc88700d";
	private static readonly ENV = "production";

	async fetch(params: ApiQueryParams): Promise<ApiResponse<Employee>> {
		try {
			// Build query string untuk Reqres
			const queryParams = new URLSearchParams({
				page: (params.page || 1).toString(),
				limit: (params.pageSize || 10).toString(),
			});

			// Build filter untuk hanya ambil is_active = true
			const filterData: EmployeeFilter = {
				is_active: true,
			};

			queryParams.append("data_contains", JSON.stringify(filterData));

			const url = `${EmployeesApiService.API_URL}?${queryParams.toString()}`;

			const response = await fetch(url, {
				headers: {
					"x-api-key": EmployeesApiService.API_KEY,
					"X-Reqres-Env": EmployeesApiService.ENV,
				},
			});

			if (!response.ok) {
				throw new Error("Gagal memuat data employees.");
			}

			const result = await response.json();
			// Flatten nested data structure from API
			let allEmployees: Employee[] = (result.data || []).map(
				(item: EmployeeApiItem) => ({
					id: item.id,
					...item.data,
				}),
			);

			// Apply search filter client-side across multiple fields
			if (params.search) {
				const searchLower = params.search.toLowerCase();
				allEmployees = allEmployees.filter(
					(employee) =>
						employee.name.toLowerCase().includes(searchLower) ||
						employee.email.toLowerCase().includes(searchLower) ||
						employee.role.toLowerCase().includes(searchLower) ||
						employee.department.toLowerCase().includes(searchLower),
				);
			}

			// Apply sorting client-side
			let filtered = [...allEmployees];
			if (
				params.sortBy &&
				allEmployees.length > 0 &&
				params.sortBy in allEmployees[0]
			) {
				filtered = this.sortData(
					filtered,
					params.sortBy as keyof Employee,
					params.sortOrder,
				);
			}

			// Return formatted response
			const meta = result.meta || {};
			return {
				data: filtered,
				page: meta.page || params.page || 1,
				pageSize: meta.limit || params.pageSize || 10,
				total: meta.total || 0,
				hasNextPage: meta.page < meta.pages,
				hasPreviousPage: meta.page > 1,
			};
		} catch (error) {
			throw new Error(
				error instanceof Error
					? error.message
					: "Terjadi kesalahan. Silakan coba lagi.",
			);
		}
	}
}

// Export singleton instance
export const employeesApiService = new EmployeesApiService({ delay: 0 });

// API function
export const getEmployeesAPI = (params: ApiQueryParams) =>
	employeesApiService.fetch(params);

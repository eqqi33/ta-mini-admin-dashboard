export interface Employee {
	id: string;
	name: string;
	role: string;
	email: string;
	status: string;
	is_active: boolean;
	department: string;
}

// Interface untuk API response item dari Reqres
export interface EmployeeApiItem {
	id: string;
	collection_id: string;
	project_id: number;
	app_user_id: string | null;
	created_by: number;
	created_at: string;
	updated_at: string;
	deleted_at: string | null;
	data: Employee;
}

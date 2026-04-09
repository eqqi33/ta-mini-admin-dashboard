import { useEmployeesDataTable } from "@/features/employees/hooks/useEmployeesDataTable";
import type { Employee } from "@/features/employees/interface/employeeInterface";
import { DataTable } from "@/shared/components/DataTable";
import type { DataTableColumn } from "@/shared/interface/dataTableInterface";

// Komponen DataTable untuk menampilkan employees dari Reqres API
export const EmployeeDataTable = () => {
	const table = useEmployeesDataTable();

	const handleSort = (column: keyof Employee) => {
		const newOrder =
			table.sortBy === column && table.sortOrder === "ASC" ? "DESC" : "ASC";
		table.setSorting(
			column as "name" | "email" | "role" | "department" | "is_active",
			newOrder,
		);
	};

	const handlePreviousPage = () => {
		table.setPage(table.page - 1);
	};

	const handleNextPage = () => {
		table.setPage(table.page + 1);
	};

	// Definisi kolom untuk employees
	const columns: DataTableColumn<Employee>[] = [
		{
			key: "id",
			label: "No",
			sortable: false,
			render: (_value, _row, index) => {
				const rowNumber = (table.page - 1) * table.pageSize + (index || 0) + 1;
				return <span className="font-medium text-gray-900">{rowNumber}</span>;
			},
		},
		{
			key: "name",
			label: "Nama",
			sortable: true,
			render: (value) => (
				<div className="font-medium text-gray-900">{value}</div>
			),
		},
		{
			key: "email",
			label: "Email",
			sortable: true,
			render: (value) => (
				<a href={`mailto:${value}`} className="text-blue-600 hover:underline">
					{value}
				</a>
			),
		},
		{
			key: "role",
			label: "Role",
			sortable: true,
		},
		{
			key: "department",
			label: "Departemen",
			sortable: true,
		},
		{
			key: "is_active",
			label: "Status",
			sortable: true,
			render: (value) => (
				<span
					className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
						value ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
					}`}
				>
					{value ? "Aktif" : "Tidak Aktif"}
				</span>
			),
		},
	];

	return (
		<DataTable<Employee>
			columns={columns}
			data={table.data}
			isLoading={table.isLoading}
			error={table.error}
			isEmpty={table.isEmpty}
			searchPlaceholder="Cari employee"
			searchValue={table.search}
			onSearch={table.setSearch}
			sortBy={table.sortBy as keyof Employee | undefined}
			sortOrder={table.sortOrder}
			onSort={handleSort}
			page={table.page}
			pageSize={table.pageSize}
			total={table.total}
			hasPreviousPage={table.hasPreviousPage}
			hasNextPage={table.hasNextPage}
			onPreviousPage={handlePreviousPage}
			onNextPage={handleNextPage}
		/>
	);
};

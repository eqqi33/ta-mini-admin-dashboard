import type { ReactNode } from "react";

// Interface untuk kolom di DataTable
export interface DataTableColumn<T> {
	key: keyof T;
	label: string;
	sortable?: boolean;
	render?: (value: T[keyof T], row: T, index?: number) => ReactNode;
	className?: string;
}

// Interface untuk props DataTable
export interface DataTableProps<T> {
	columns: DataTableColumn<T>[];
	data: T[];
	isLoading?: boolean;
	error?: string | null;
	isEmpty?: boolean;
	page?: number;
	total?: number;
	pageSize?: number;
	hasNextPage?: boolean;
	hasPreviousPage?: boolean;
	onSearch?: (search: string) => void;
	onSort?: (column: keyof T, order: "ASC" | "DESC") => void;
	onPreviousPage?: () => void;
	onNextPage?: () => void;
	searchPlaceholder?: string;
	searchValue?: string;
	sortBy?: keyof T;
	sortOrder?: "ASC" | "DESC";
	getRowKey?: (row: T, index: number) => string | number;
}

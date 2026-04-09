export interface TableState<T> {
	data: T[];
	page: number;
	pageSize: number;
	total: number;
	search: string;
	sortBy?: string;
	sortOrder: "ASC" | "DESC";
	isLoading: boolean;
	error: string | null;
}

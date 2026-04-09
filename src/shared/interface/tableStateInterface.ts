import type { sortEnum } from "@/shared/enums/commonEnum";

export interface TableState<T> {
	data: T[];
	page: number;
	pageSize: number;
	total: number;
	search: string;
	sortBy?: string;
	sortOrder: keyof typeof sortEnum;
	isLoading: boolean;
	error: string | null;
}

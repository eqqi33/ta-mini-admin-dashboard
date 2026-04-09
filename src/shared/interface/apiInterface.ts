import type { sortEnum } from "@/shared/enums/commonEnum";

export interface ApiResponse<T> {
	data: T[];
	page: number;
	pageSize: number;
	total: number;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
}

export interface ApiQueryParams {
	page?: number;
	pageSize?: number;
	search?: string;
	sortBy?: string;
	sortOrder?: keyof typeof sortEnum;
}

export interface ApiServiceConfig {
	delay?: number; // simulasi jeda pada jaringan (ms)
}

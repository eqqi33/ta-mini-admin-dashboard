import type {
	ApiQueryParams,
	ApiResponse,
	ApiServiceConfig,
} from "@/shared/interface/apiInterface";

// Class Abstrak service API untuk menangani fetching data dengan pagination, pencarian, dan sorting
export abstract class ApiService<T> {
	protected delay: number;

	constructor(config: ApiServiceConfig = {}) {
		this.delay = config.delay || 0;
	}

	// Method abstrak untuk fetching data, harus diimplementasikan oleh subclass
	abstract fetch(params: ApiQueryParams): Promise<ApiResponse<T>>;

	// Simulasi delay untuk memberikan efek loading pada UI
	protected simulateDelay(): Promise<void> {
		return new Promise((resolve) => setTimeout(resolve, this.delay));
	}

	// Filter array berdasarkan search term pada field tertentu
	protected filterBySearch<U extends object>(
		items: U[],
		searchTerm: string,
		searchFields: (keyof U)[],
	): U[] {
		if (!searchTerm) return items;

		const query = searchTerm.toLowerCase();
		return items.filter((item) =>
			searchFields.some((field) =>
				String(item[field]).toLowerCase().includes(query),
			),
		);
	}

	// Sort array
	protected sortData<U extends object>(
		items: U[],
		sortBy: keyof U | undefined,
		sortOrder: "ASC" | "DESC" = "ASC",
	): U[] {
		if (!sortBy) return items;

		const sorted = [...items].sort((a, b) => {
			const aValue = a[sortBy];
			const bValue = b[sortBy];

			if (typeof aValue === "string" && typeof bValue === "string") {
				return aValue.localeCompare(bValue);
			}

			return aValue > bValue ? 1 : -1;
		});

		return sortOrder === "DESC" ? sorted.reverse() : sorted;
	}

	// Paginate array
	protected paginateData<U>(items: U[], page: number, pageSize: number) {
		const total = items.length;
		const startIndex = (page - 1) * pageSize;
		const paginatedData = items.slice(startIndex, startIndex + pageSize);

		return {
			data: paginatedData,
			total,
			hasNextPage: startIndex + pageSize < total,
			hasPreviousPage: page > 1,
		};
	}
}

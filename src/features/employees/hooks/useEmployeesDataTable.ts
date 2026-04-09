import { useEffect, useRef, useState } from "react";
import type { fieldSortEnum } from "@/features/employees/enums/fieldSortEnum";
import type { Employee } from "@/features/employees/interface/employeeInterface";
import { getEmployeesAPI } from "@/features/employees/services/employeesService";
import { sortEnum } from "@/shared/enums/commonEnum";
import { useDebounce } from "@/shared/hooks/useDebounce";
import type { ApiQueryParams } from "@/shared/interface/apiInterface";
import type { TableState } from "@/shared/interface/tableStateInterface";

// Custom hook untuk mengelola state dan logika fetching data untuk Employee DataTable
export const useEmployeesDataTable = () => {
	const [state, setState] = useState<TableState<Employee>>({
		data: [],
		page: 1,
		pageSize: 10,
		total: 0,
		search: "",
		sortBy: undefined,
		sortOrder: sortEnum.ASC,
		isLoading: true,
		error: null,
	});

	const debouncedSearch = useDebounce(state.search, 500);
	const lastFetchedSearchRef = useRef<string | null>(null);

	// Fetch data ketika page, search, atau sort berubah
	useEffect(() => {
		const fetchData = async () => {
			setState((prev) => ({ ...prev, isLoading: true, error: null }));

			try {
				const response = await getEmployeesAPI({
					page: state.page,
					pageSize: state.pageSize,
					search: debouncedSearch,
					sortBy: state.sortBy,
					sortOrder: state.sortOrder,
				} as ApiQueryParams);

				lastFetchedSearchRef.current = debouncedSearch;

				setState((prev) => ({
					...prev,
					data: response.data,
					total: response.total,
					isLoading: false,
					error: null,
				}));
			} catch (_err) {
				setState((prev) => ({
					...prev,
					error: "Gagal memuat data. Silakan coba lagi.",
					isLoading: false,
				}));
			}
		};

		// Hanya fetch jika search value benar-benar berbeda dari yang terakhir di-fetch
		if (debouncedSearch !== lastFetchedSearchRef.current) {
			fetchData();
		}
	}, [
		state.page,
		debouncedSearch,
		state.sortBy,
		state.sortOrder,
		state.pageSize,
	]);

	// Reset ke halaman 1 ketika search berubah
	useEffect(() => {
		setState((prev) =>
			prev.search !== debouncedSearch ? { ...prev, page: 1 } : prev,
		);
	}, [debouncedSearch]);

	return {
		...state,
		setSearch: (search: string) => setState((prev) => ({ ...prev, search })),
		setPage: (page: number) => setState((prev) => ({ ...prev, page })),
		setSorting: (
			sortBy: (typeof fieldSortEnum)[keyof typeof fieldSortEnum],
			sortOrder: (typeof sortEnum)[keyof typeof sortEnum],
		) => setState((prev) => ({ ...prev, sortBy, sortOrder, page: 1 })),
		isEmpty: state.data.length === 0 && !state.isLoading,
		hasPreviousPage: state.page > 1,
		hasNextPage: state.page * state.pageSize < state.total,
	};
};

import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/shared/components/ui/table";
import { sortEnum } from "@/shared/enums/commonEnum";
import type {
	DataTableColumn,
	DataTableProps,
} from "@/shared/interface/dataTableInterface";

// Komponen DataTable yang bisa digunakan untuk menampilkan data dalam bentuk tabel dengan fitur pencarian, sorting, dan pagination
export const DataTable = <T extends object>({
	columns,
	data,
	isLoading = false,
	error = null,
	isEmpty = false,
	page = 1,
	total = 0,
	pageSize = 10,
	hasNextPage = false,
	hasPreviousPage = false,
	onSearch,
	onSort,
	onPreviousPage,
	onNextPage,
	searchPlaceholder = "Cari...",
	searchValue = "",
	sortBy,
	sortOrder = sortEnum.ASC,
	getRowKey,
}: DataTableProps<T>) => {
	const handleSort = (column: DataTableColumn<T>) => {
		if (!column.sortable || !onSort) return;

		const newOrder =
			sortBy === column.key && sortOrder === sortEnum.ASC
				? sortEnum.DESC
				: sortEnum.ASC;
		onSort(column.key, newOrder);
	};

	const handleSearchChange = (value: string) => {
		if (!isLoading && onSearch) {
			onSearch(value);
		}
	};

	const getSortIndicator = (column: DataTableColumn<T>) => {
		if (!column.sortable) return null;
		if (sortBy !== column.key)
			return <ArrowUpDown className="ml-1 inline h-4 w-4" />;
		return sortOrder === sortEnum.ASC ? (
			<ArrowUp className="ml-1 inline h-4 w-4" />
		) : (
			<ArrowDown className="ml-1 inline h-4 w-4" />
		);
	};

	return (
		<div className="space-y-4">
			{/* Search Input */}
			{onSearch && (
				<div>
					<Input
						type="text"
						placeholder={searchPlaceholder}
						value={searchValue}
						onChange={(e) => handleSearchChange(e.target.value)}
						className="max-w-sm"
					/>
				</div>
			)}

			{/* Error State */}
			{error && (
				<div className="rounded bg-red-50 p-4 text-red-800">{error}</div>
			)}

			{/* Loading State */}
			{isLoading && !data.length && (
				<div className="flex h-64 items-center justify-center rounded border border-gray-200 bg-gray-50">
					<div className="text-center">
						<div className="mb-2 text-gray-600">Loading data...</div>
						<div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
					</div>
				</div>
			)}

			{/* Empty State */}
			{isEmpty && (
				<div className="flex h-64 items-center justify-center rounded border border-gray-200 bg-gray-50">
					<div className="text-center text-gray-600">Data tidak ditemukan.</div>
				</div>
			)}

			{/* Table */}
			{!isEmpty && !isLoading && (
				<div className="overflow-x-auto rounded border border-gray-200 min-h-64">
					<Table>
						<TableHeader>
							<TableRow>
								{columns.map((column) => (
									<TableHead
										key={String(column.key)}
										className={`${
											column.sortable ? "cursor-pointer hover:bg-gray-100" : ""
										} ${column.className || ""}`}
										onClick={() => handleSort(column)}
									>
										{column.label}
										{getSortIndicator(column)}
									</TableHead>
								))}
							</TableRow>
						</TableHeader>
						<TableBody>
							{data.map((row, index) => {
								const rowKey = getRowKey
									? getRowKey(row, index)
									: String(index);
								return (
									<TableRow key={rowKey}>
										{columns.map((column) => (
											<TableCell
												key={String(column.key)}
												className={column.className || ""}
											>
												{column.render
													? column.render(row[column.key], row, index)
													: String(row[column.key] ?? "-")}
											</TableCell>
										))}
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</div>
			)}

			{/* Pagination */}
			{!isEmpty && !isLoading && (page || total) && (
				<div className="flex items-center justify-between">
					<div className="text-sm text-gray-600">
						Page {page} of {Math.ceil(total / pageSize)} ({total} total)
					</div>
					<div className="flex gap-2">
						<Button
							onClick={onPreviousPage}
							disabled={!hasPreviousPage || isLoading}
							variant="outline"
						>
							Previous
						</Button>
						<Button
							onClick={onNextPage}
							disabled={!hasNextPage || isLoading}
							variant="outline"
						>
							Next
						</Button>
					</div>
				</div>
			)}
		</div>
	);
};

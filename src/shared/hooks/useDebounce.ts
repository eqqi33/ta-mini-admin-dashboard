import { useEffect, useState } from "react";

// hooks untuk debounce, agar mencegah spam request saat pengguna mengetik di input pencarian atau filter
export const useDebounce = <T>(value: T, delay: number = 500): T => {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => clearTimeout(handler);
	}, [value, delay]);

	return debouncedValue;
};

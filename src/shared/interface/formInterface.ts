import type { UseFormRegisterReturn } from "react-hook-form";

export interface FormFieldProps {
	label: string;
	id: string;
	type?: "text" | "email" | "password" | "number" | "tel";
	placeholder?: string;
	error?: string;
	disabled?: boolean;
	register: UseFormRegisterReturn;
}

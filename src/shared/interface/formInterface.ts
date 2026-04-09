import type { UseFormRegisterReturn } from "react-hook-form";
import type { typeInputEnum } from "@/shared/enums/commonEnum";

export interface FormFieldProps {
	label: string;
	id: string;
	type?: (typeof typeInputEnum)[keyof typeof typeInputEnum];
	placeholder?: string;
	error?: string;
	disabled?: boolean;
	autocomplete?: string;
	register: UseFormRegisterReturn;
}

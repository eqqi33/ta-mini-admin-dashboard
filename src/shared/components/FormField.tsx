import { Input } from "@/shared/components/ui/input";
import type { FormFieldProps } from "@/shared/interface/formInterface";

// Komponen form field yang bisa digunakan lagi
export const FormField: React.FC<FormFieldProps> = ({
	label,
	id,
	type = "text",
	placeholder,
	error,
	disabled,
	register,
}) => {
	return (
		<div>
			<label htmlFor={id} className="block text-sm font-medium text-gray-700">
				{label}
			</label>
			<Input
				id={id}
				type={type}
				placeholder={placeholder}
				disabled={disabled}
				className="mt-1"
				{...register}
			/>
			{error && <p className="mt-1 text-sm text-red-600">{error}</p>}
		</div>
	);
};

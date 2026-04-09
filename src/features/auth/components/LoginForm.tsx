import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { LoginFormProps } from "@/features/auth/interface/loginInterface";
import {
	type LoginFormData,
	loginSchema,
} from "@/features/auth/schemas/loginSchema";
import { loginAPI } from "@/features/auth/services/authService";
import { FormField } from "@/shared/components/FormField";
import { Button } from "@/shared/components/ui/button";
import { typeInputEnum } from "@/shared/enums/commonEnum";

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
	const [apiError, setApiError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = async (data: LoginFormData) => {
		setIsSubmitting(true);
		setApiError(null);

		try {
			const response = await loginAPI(data);
			onSuccess(response.token, response.user.email);
		} catch (error) {
			setApiError(
				error instanceof Error
					? error.message
					: "Login gagal. Silakan coba lagi.",
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			<FormField
				label="Email"
				id="email"
				type={typeInputEnum.EMAIL}
				error={errors.email?.message}
				disabled={isSubmitting}
				register={register("email")}
			/>

			<FormField
				label="Password"
				id="password"
				type={typeInputEnum.PASSWORD}
				error={errors.password?.message}
				disabled={isSubmitting}
				register={register("password")}
			/>

			{apiError && (
				<div className="rounded bg-red-50 p-3 text-sm text-red-800">
					{apiError}
				</div>
			)}

			<Button type="submit" disabled={isSubmitting} className="w-full">
				{isSubmitting ? "Proses..." : "Login"}
			</Button>
		</form>
	);
};

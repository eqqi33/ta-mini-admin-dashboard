import { z } from "zod";

export const loginSchema = z.object({
	email: z.string().email({ message: "Email harus dalam format yang valid" }),
	password: z
		.string()
		.min(8, { message: "Password minimal terdiri dari 8 karakter" }),
});

export type LoginFormData = z.infer<typeof loginSchema>;

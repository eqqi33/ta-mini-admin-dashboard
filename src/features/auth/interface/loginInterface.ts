export interface LoginFormProps {
	onSuccess: (token: string, email: string) => void;
}

export interface LoginRequest {
	email: string;
	password: string;
}

export interface LoginResponse {
	token: string;
	user: {
		id: string;
		email: string;
		name: string;
	};
}

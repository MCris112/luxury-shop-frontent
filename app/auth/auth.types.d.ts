export interface AuthUser {
    id: number;
    name: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    user: AuthUser;
    token: string;
}
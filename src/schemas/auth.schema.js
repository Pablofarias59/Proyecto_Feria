import { z } from "zod";

export const registerSchema = z.object({
  username: z.string({required_error: "Name is requerido",}).min(5,{message: "Name minimo 5 caracteres",}),
  email: z.string({required_error: "Email is requerido",}).email({message: "Email no es valido",}),
  password: z.string({required_error: "Password is requerido",}).min(8,{message: "Password minimo 8 caracteres",}),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
});
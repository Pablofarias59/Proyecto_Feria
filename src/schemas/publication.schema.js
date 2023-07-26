import { z } from "zod";

export const createPublicationSchema = z.object({
  title: z.string({ required_error: "El título es requerido" }),
  content: z.string({ required_error: "El contenido es requerido" }),
});

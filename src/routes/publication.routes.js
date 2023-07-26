import { Router } from "express";
import {
  createPublication,
  deletePublication,
  getPublication,
  getAllPublication,
  updatePublication,
} from "../controllers/publication.controllers.js";

import authenticateToken from "../middlewares/auth.token.js";
import { createPublicationSchema } from "../schemas/publication.schema.js";
import { validateSchema } from "../middlewares/validator.middleware.js"; // Asegúrate de proporcionar la ruta correcta a validateSchema

const router = Router();

router.get("/", authenticateToken, getAllPublication);

router.post("/", authenticateToken, validateSchema(createPublicationSchema), createPublication); // Reemplaza "yourSchema" con el esquema adecuado

router.get("/:id", authenticateToken, getPublication);

router.put("/:id", authenticateToken, updatePublication);

router.delete("/:id", authenticateToken, deletePublication);

export default router;


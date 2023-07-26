import mongoose from "mongoose";

const publicationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  user: { type: String},
  // Otros campos de la publicación, si es necesario.
});

export default mongoose.model("Publication", publicationSchema);
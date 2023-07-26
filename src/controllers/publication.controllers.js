import Publication from "../models/publication.model.js";
import { getIdUsuario } from "./auth.controller.js";

export const getAllPublication = async (req, res) => {
  const publication = await Publication.find();
  res.status(200).json({ "Publication": publication });
};

export const createPublication = async (req, res) => {
  try {
    const Id_usuario = getIdUsuario();

    if (!Id_usuario) {
      return res.status(401).json({ message: 'Token no válido o no proporcionado.' });
    }

    const newPublication = new Publication({
      title: req.body.title,
      content: req.body.content,
      user: Id_usuario,
    });

    const savedPublication = await newPublication.save();
    res.status(201).json(savedPublication);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la publicación.' });
  }
};

export const deletePublication = async (req, res) => {
  try {
    const { id } = req.params;
    const publication = await Publication.findByIdAndDelete(id);
    if (!publication) {
      return res.status(404).json({ message: 'Publicación no encontrada' });
    }
    res.status(200).json({ "status": "Publicación eliminada correctamente", publication });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ha ocurrido un error al eliminar la publicación' });
  }
};

export const updatePublication = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const publication = await Publication.findById(id);
    if (!publication) {
      return res.status(404).json({ message: 'Publicación no encontrada' });
    }

    publication.title = title;
    publication.content = content;
    await publication.save();

    res.status(200).json({ "status": "Registro actualizado correctamente", publication });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ha ocurrido un error al actualizar la publicación' });
  }
};

export const getPublication = async (req, res) => {
  try {
    const { id } = req.params;
    const publication = await Publication.findById(id);
    if (!publication) {
      return res.status(404).json({ message: 'Publicación no encontrada' });
    }
    res.status(200).json({ publication });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ha ocurrido un error al obtener la publicación' });
  }
};

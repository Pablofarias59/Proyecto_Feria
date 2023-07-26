import Publication from "../models/publication.model.js";

export const getAllPublication = async (req, res) => {
    //res.send("todos los estudiantes")
    const publication = await Publication.find();
    res.status(200).json({"Publication":publication})

};

export const createPublication = async (req, res) => {
  try {
    // Obtener el ID del usuario actual desde el objeto req (asumiendo que está autenticado)
    const userId = req.user._id;

    // Crear una nueva instancia de la publicación con el ID del usuario
    const newPublication = new Publication({
      title: req.body.title,
      content: req.body.content,
      user: userId // Asignar el ID del usuario actual al campo 'user'
    });

    // Guardar la publicación en la base de datos
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
     // Busca un estudiante por su ID y sui lo encuebtra lo elimina
    const publication = await Publication.findByIdAndDelete(id) ;
    if (!publication) {
      return res.status(404).json({ message: 'publicacion no encontrada' });
    }
    res.status(200).json({"status":"publicacion eliminado ok",publication});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ha ocurrido un error al eliminar el estudiante' });
  }
};

export const updatePublication = async (req, res) => {
     try {
    const { id } = req.params;
    const { title, content } = req.body;

    // Buscar una Publicación por su ID en la base de datos
    const publication = await Publication.findById(id);
    if (!publication) {
      return res.status(404).json({ message: 'Publicación no encontrado' });
    }
    // Actualizar el los datos del estudiante
    publication.title = title;
    publication.content = content;
    await publication.save();

    // Enviar una respuesta al cliente
    res.status(200).json({"status":"registro actualizado ok",publication});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ha ocurrido un error al actualizar la Publicación' });
  }
};

export const getPublication = async (req, res) => {
    try {
    const { id } = req.params;
    // Buscar un usuario por su ID en la base de datos
    const publication = await Publication.findById(id);
    if (!publication) {
      return res.status(404).json({ message: 'publicacion no encontrado' });
    }
    // Enviar una respuesta al cliente
    res.status(200).json({publication});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al obtener la Publicacion' });
    }
};

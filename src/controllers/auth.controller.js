import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';
import User from '../models/user.model.js';

let Id_usuario = "Hola";

export const getIdUsuario = () => {
  return Id_usuario;
};

const setIdUsuario = (userId) => {
  Id_usuario = userId;
};

export const register = async (req, res) => {
  // ... Resto del código del controlador ...
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar si el correo electrónico y la contraseña son correctos
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Email inválido' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Password inválido' });
    }

    // Generar un token de acceso
    const accessToken = jwt.sign({ userId: user._id }, TOKEN_SECRET);

    res.cookie("token", accessToken);

    const decodedToken = jwt.verify(accessToken, TOKEN_SECRET);
    setIdUsuario(decodedToken.userId); // Actualizar el valor de Id_usuario
    console.log(getIdUsuario()); // Comprobación en consola

    // Enviar una respuesta al cliente
    res.status(200).json({ accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ha ocurrido un error al iniciar sesión' });
  }
};

export const logout = async (req, res) => {
  res.cookie("token", "", {
    secure: true,
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export default Id_usuario;

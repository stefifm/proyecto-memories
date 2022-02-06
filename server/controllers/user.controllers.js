import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFounded = await User.findOne({ email });
    if (!userFounded) {
      return res.status(404).json({ message: 'No se encuentro el usuario' });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      userFounded.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Contrasena incorrecta' });
    }

    const token = jwt.sign(
      { email: userFounded.email, id: userFounded._id },
      'test',
      { expiresIn: '1h' }
    );

    res.status(200).json({ result: userFounded, token });
  } catch (error) {
    res.status(500).json({ message: 'Algo salio mal' });
  }
};

export const signup = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name: `${firstName} ${lastName}`,
      email,
      password: hashPassword
    });

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Las contrasenas no coinciden' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    const newUser = await user.save();

    const token = jwt.sign({ email: newUser.email, id: newUser._id }, 'test', {
      expiresIn: '1h'
    });
    res.status(200).json({ result: newUser, token });
  } catch (error) {
    res.status(500).json({ message: 'Algo salio mal' });
    console.log(error);
  }
};

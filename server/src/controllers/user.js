import db from '../services/firebase';
import hasher from '../services/PasswordHasher';

const User = {
  register: async (req, res, next) => {
    const {
      email, firstName, lastName, specialty, clinic,
    } = req.body;

    const password = hasher.hash(req.body.password);

    const uniqueCheck = await db.collection('users').doc(email).get();
    if (uniqueCheck) return res.status(404).send({ message: 'Account with this email already exists.' });

    const addedUser = await db.collection('users').doc(email).set({
      password, firstName, lastName, specialty, clinic,
    });

    return res.status(201).send(addedUser);
  },

  login: async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(404).send({ message: 'No email and/or password given.' });

    const user = await db.collection('users').doc(email).get();

    if (!user) return res.status(404).send({ message: 'User could not be found.' });
    if (!hasher.validateHash(password, user.password)) {
      return res.status(404).send({ message: 'The specified password is not correct.' });
    }

    return res.status(200).send(user);
  },

  update: async (req, res, next) => {
    const { email, fieldsToUpdate } = req.body;

    if (!email) return res.status(404).send({ message: 'No email given.' });

    const user = await db.collection('users').doc(email).get();
    if (!user) return res.status(404).send({ message: 'Email does not represent a valid user' });

    user = user.update(fieldsToUpdate);

    return res.status(200).send(user);
  },
};

export default User;

const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllUsers = async (req, res) => {
	try {
		const users = await prisma.user.findMany()
		res.json(users);
	} catch (error) {
		console.error(error);
		res.status(500).send('Erro ao buscar todos os usuários');
	}
}

const createUser = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		const user = await prisma.user.create({
			data: {
				name,
				email,
				password,
			}
		})
		console.log("user", user);
		res.json(user);
	} catch (error) {
		console.error(error);
		res.status(500).send('Erro ao criar o usuário');
	}
}

const deleteUser = async (req, res) => {
	const userId = req.params.id

	try {
		const deleteUserId = await prisma.user.delete({
			where: {
				id: parseInt(userId)
			}
		});

		res.json(deleteUserId);
	} catch (error) {
		console.error(error);
		res.status(500).send('Erro ao excluir o usuário');
	}
}

const updateUser = async (req, res) => {
	const userId = req.params.userId;
	const { name, email } = req.body;

	try {
		const updateUser = await prisma.user.update({
			where: {
				id: parseInt(userId)
			},
			data:{
				name,
				email
			}
		});

		res.json(updateUser);
	} catch (error) {
		console.error(error);
		res.status(500).send('Erro ao atualizar o usuário');
	}
}

const login = async (req, res) => {
	try {
		const { email, password } = req.body

		const user = await prisma.user.findUnique({
			where: {
				email,
			}
		})

		if (!user || user.password !== password) {
			return res.status(401).json({error: "Invalid credentials"});
		}

    const token = jwt.sign({ userId: user.id }, 'mysecret', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
}

const logout = (req, res) => {
	res.json({ auth: false, token: null });
}

module.exports = {
	getAllUsers,
  createUser,
  deleteUser,
  updateUser,
	login,
	logout
}
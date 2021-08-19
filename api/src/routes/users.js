const { Router } = require('express');
const router = Router();
const { v4: uuidv4 } = require('uuid');
const { User, Institution, Rol, Article } = require('../db');
const { Op } = require('sequelize');
const { management, authorizeAccessToken } = require('../auth/index');
const { axios } = require('axios');

//se crea el usuario en la ruta auth cuando se autentifica, no lo borre porque no se alguien utiliza esta ruta
router.post('/', async (req, res, next) => {
	const {
		user_id_A0,
		user_name,
		user_email,
		user_img_profile,
		inst_id,
		biography,
		rol_id,
	} = req.body;
	let roles = [];
	if (!Array.isArray(inst_id)) {
		const err = new Error('inst_id must be an array');
		err.status = 400;
		return next(err);
	}
	try {
		const result = await User.findOne({
			where: {
				[Op.or]: [{ user_id_A0 }, { user_email }],
			},
			include: [
				{
					model: Institution,
					through: { attributes: [] },
				},
			],
		});

		if (result) {
			const userRoles = await management.getUserRoles({
				id: result.dataValues.user_id_A0,
			});
			for (let i in userRoles) {
				roles.push(userRoles[i].name);
			}
			return res.json({
				...result.dataValues,
				roles: roles,
				created: false,
			});
		}
	} catch (err) {
		return next(err);
	}

	const user_id = uuidv4();
	try {
		const user = await User.create({
			user_id,
			user_id_A0,
			user_name,
			user_email,
			user_img_profile,
			biography,
			rol_id,
		});
		inst_id.length > 0 && (await user.addInstitution(inst_id));
		User.findByPk(user_id, {
			include: {
				model: Institution,
				through: {
					attributes: [],
				},
			},
		}).then((found) => {
			res.json({ ...found.dataValues, roles: roles, created: true });
		});
	} catch (err) {
		return next(err);
	}
});

router.post('/get_role', async (req, res, next) => {
	const { user_id_A0 } = req.body;
	try {
		const role = await management.getUserRoles({ id: user_id_A0 });
		const roles = await management.roles.getAll();
		res.json({ role, roles });
	} catch (err) {
		next(err);
	}
});

router.put('/change_role', async (req, res, next) => {
	const { idUser, oldRoleId, newRolId } = req.body;
	// if (!user_id_A0 || !rol_id) return next(new Error('user_id_A0 or rol_id are missing'));
	var paramsDel = { id: idUser };
	var dataDel = { roles: [oldRoleId] };

	await management.users.removeRoles(paramsDel, dataDel, (err) => {
		err && next(err);
	});

	const paramsAssign = { id: idUser };
	const dataAssign = { roles: [newRolId] };
	await management.assignRolestoUser(paramsAssign, dataAssign, (err) => {
		err ? next(err) : res.json({ message: 'Role change succesful.' });
	});
});

router.get('/', authorizeAccessToken, async (req, res, next) => {
	try {
		const { rol } = req.query;
		let params = {
			id: rol,
		};
		if (rol) {
			const usersFound = await management.getUsersInRole(params);
			const mappedUsers = usersFound.map((u) => {
				return { user_id_A0: u.user_id };
			});

			const result = await User.findAll({
				where: {
					[Op.or]: mappedUsers,
				},
			});
			return res.json(result);
		}
		return User.findAll()
			.then((finded) => res.json(finded))
			.catch((err) => next(err));
	} catch (err) {
		console.error(err);
	}
});

router.get('/:user_id_A0', authorizeAccessToken, async (req, res, next) => {
	const { user_id_A0 } = req.params;
	try {
		const user = await User.findOne({
			where: { user_id_A0 },
			include: [
				{
					model: Institution,
					through: {
						attributes: [],
					},
				},
				{
					model: Article,
				},
			],
		});
		res.json({ message: 'successful', user: user.dataValues });
	} catch (err) {
		next(err);
	}
});
/*
router.post("/verifyemail", async (req, res) => {
  try {
    const user = req.body;
    const sendVerificationEmail = await management.sendEmailVerification(user);
    return res.send(sendVerificationEmail);
  } catch (err) {
    next(err);
  }
});*/

router.put('/add_inst', async (req, res, next) => {
	const { user_id_A0, inst_id } = req.query;
	try {
		const user = await User.findOne({
			where: { user_id_A0 },
			include: [
				{
					model: Institution,
					through: {
						attributes: [],
					},
				},
			],
		});
		await user.addInstitution(inst_id);
		const newSetUserInst = user.dataValues.institutions;
		const newInst = await Institution.findOne({ where: { inst_id } });
		res.json([...newSetUserInst, newInst.dataValues]);
	} catch (err) {
		err.message = 'No se pudo agregar la Institución.';
		next(err);
	}
});

router.delete('/delete_inst', async (req, res, next) => {
	const { user_id_A0, inst_id } = req.query;
	try {
		const user = await User.findOne({
			where: { user_id_A0 },
			include: [
				{
					model: Institution,
					through: {
						attributes: [],
					},
				},
			],
		});
		const newSetUserInst = user.dataValues.institutions.filter(
			(i) => i.inst_id !== inst_id
		);
		const newSetIds = newSetUserInst.map((i) => i.inst_id);
		await user.setInstitutions(newSetIds);
		res.json(newSetUserInst);
	} catch (err) {
		err.message = 'No se pudo borrar la Institución';
		next(err);
	}
});

module.exports = router;

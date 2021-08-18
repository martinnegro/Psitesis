const organizeRoles = (roles) => {
	const organizedRoles = [];
	if (roles) {
		for (let i in roles) {
			organizedRoles.push(roles[i].name);
		}
	}
	return organizedRoles;
};

module.exports = {
	organizeRoles,
};

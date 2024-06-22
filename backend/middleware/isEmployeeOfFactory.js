const EmployeeService = require("../services/employeeService");

const isEmployeeOfFactory = async (req, res, next) => {
	const userId = req.userId;
	const factoryId = req.body.factoryId;

	if (!userId || !factoryId) {
		return res.status(403).json({ message: "Unauthorized access" });
	}

	const employeeService = new EmployeeService();
	const employee = await employeeService.getEmployeeById(userId);

	if (employee.factoryId === factoryId) {
		next();
	} else {
		res.status(403).json({ message: "Forbidden: Employees only" });
	}
};

module.exports = isEmployeeOfFactory;

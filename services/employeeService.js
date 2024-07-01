const EmployeeModel = require('../models/employee');

module.exports = {
    getAll: (req, res) => {
        EmployeeModel.find({})
            .then(data => {
                res.json(data);
            })
            .catch(error => {
                res.json(error);
            });
    },
    getOne: async (req, res) => {
        try {
            const employee = await EmployeeModel.findById(req.params.id);
            res.json(employee);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    add: async (req, res) => {
        try {
            const savedEmployee = await new EmployeeModel(req.body).save();
            res.json(savedEmployee);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    update: async (req, res) => {
        try {
            const employee = await EmployeeModel.findByIdAndUpdate(req.params.id,
                { $set: req.body },
                {
                    new: true
                });
            res.json(employee);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    search: async (req, res) => {
        try {
            const { firstName, lastName, pid, paging, limit } = req.body;
            const query = {};

            const options = {
                paging: parseInt(paging, 10) || 1,
                limit: parseInt(limit, 10) || 10
            };

            query = await EmployeeModel.find({ $regex: new RegExp(firstName, 'i') });

            const result = await EmployeeModel.paginate(query, options);
            res.json(result);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}
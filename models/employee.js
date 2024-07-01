const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const employeeModel = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    pid: { type: String, required: true, unique: true },
    dateOfBirth: { type: Date },
    position: { type: String },
    salary: { type: Number }
}, {
    collection: 'employees',
    timestamps: true,
    writeConcern: {
        w: 'majority',
        j: true,
        wtimeoutMS: 30000
    },
    read: 'nearest'
});

employeeModel.plugin(mongoosePaginate);

const Model = mongoose.model('Employee', employeeModel);
module.exports = Model;
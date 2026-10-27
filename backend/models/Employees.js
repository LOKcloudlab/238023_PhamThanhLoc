const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  employeeId: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  gender: { type: String, default: 'Nam' },
  dateOfBirth: { type: String },
  department: { type: String, default: 'Chưa phân công' },
  position: { type: String, default: 'Nhân viên' },
  email: { type: String, required: true },
  phone: { type: String },
  hireDate: { type: String },
  status: { type: String, default: 'Đang làm việc' }
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema, 'employees');
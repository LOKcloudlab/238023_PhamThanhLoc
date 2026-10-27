import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/employees';

function App() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const [formData, setFormData] = useState({
    employeeId: '', fullName: '', gender: 'Nam', dateOfBirth: '',
    department: '', position: '', email: '', phone: '', hireDate: '', status: 'Đang làm việc'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchEmployees = async (keyword = '') => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}?search=${keyword}`);
      setEmployees(res.data);
    } catch (err) {
      showMessage('Không thể tải danh sách nhân viên', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 4000);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchEmployees(search);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.employeeId || !formData.fullName || !formData.email) {
      showMessage('Vui lòng điền đầy đủ Mã NV, Họ tên và Email!', 'error');
      return;
    }

    try {
      if (isEditing) {
        await axios.put(`${API_URL}/${editId}`, formData);
        showMessage('Cập nhật nhân viên thành công!', 'success');
      } else {
        await axios.post(API_URL, formData);
        showMessage('Thêm nhân viên thành công!', 'success');
      }
      resetForm();
      fetchEmployees();
    } catch (err) {
      showMessage(err.response?.data?.message || 'Có lỗi xảy ra', 'error');
    }
  };

  const handleEdit = (emp) => {
    setIsEditing(true);
    setEditId(emp._id);
    setFormData(emp);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa nhân viên này không?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        showMessage('Xóa nhân viên thành công!', 'success');
        fetchEmployees();
      } catch (err) {
        showMessage('Không thể xóa nhân viên', 'error');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      employeeId: '', fullName: '', gender: 'Nam', dateOfBirth: '',
      department: '', position: '', email: '', phone: '', hireDate: '', status: 'Đang làm việc'
    });
    setIsEditing(false);
    setEditId(null);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>HỆ THỐNG QUẢN LÝ NHÂN SỰ</h2>

      {message.text && (
        <div style={{
          padding: '10px',
          marginBottom: '15px',
          backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da',
          color: message.type === 'success' ? '#155724' : '#721c24'
        }}>
          {message.text}
        </div>
      )}

      {/* Form Tìm kiếm */}
      <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Tìm theo Mã NV hoặc Họ tên..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: '8px', width: '300px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '8px 15px' }}>Tìm kiếm</button>
      </form>

      {/* Form Thêm / Sửa */}
      <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '20px' }}>
        <h3>{isEditing ? 'Cập Nhật Nhân Viên' : 'Thêm Nhân Viên Mới'}</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <input name="employeeId" placeholder="Mã NV (*)" value={formData.employeeId} onChange={handleInputChange} disabled={isEditing} />
          <input name="fullName" placeholder="Họ tên (*)" value={formData.fullName} onChange={handleInputChange} />
          <input name="email" placeholder="Email (*)" value={formData.email} onChange={handleInputChange} />
          <input name="phone" placeholder="Số điện thoại" value={formData.phone} onChange={handleInputChange} />
          <input name="department" placeholder="Phòng ban" value={formData.department} onChange={handleInputChange} />
          <input name="position" placeholder="Chức vụ" value={formData.position} onChange={handleInputChange} />
          <select name="gender" value={formData.gender} onChange={handleInputChange}>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
          </select>
          <select name="status" value={formData.status} onChange={handleInputChange}>
            <option value="Đang làm việc">Đang làm việc</option>
            <option value="Đã nghỉ việc">Đã nghỉ việc</option>
          </select>
        </div>
        <div style={{ marginTop: '10px' }}>
          <button type="submit" style={{ padding: '8px 15px', marginRight: '10px' }}>{isEditing ? 'Cập nhật' : 'Thêm mới'}</button>
          {isEditing && <button type="button" onClick={resetForm} style={{ padding: '8px 15px' }}>Hủy</button>}
        </div>
      </form>

      {/* Bảng danh sách nhân viên */}
      {loading ? <p>Đang tải dữ liệu...</p> : (
        <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f2f2f2' }}>
              <th>Mã NV</th>
              <th>Họ tên</th>
              <th>Phòng ban</th>
              <th>Chức vụ</th>
              <th>Email</th>
              <th>SĐT</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? employees.map((emp) => (
              <tr key={emp._id}>
                <td>{emp.employeeId}</td>
                <td>{emp.fullName}</td>
                <td>{emp.department}</td>
                <td>{emp.position}</td>
                <td>{emp.email}</td>
                <td>{emp.phone}</td>
                <td>{emp.status}</td>
                <td>
                  <button onClick={() => handleEdit(emp)} style={{ marginRight: '5px' }}>Sửa</button>
                  <button onClick={() => handleDelete(emp._id)} style={{ color: 'red' }}>Xóa</button>
                </td>
              </tr>
            )) : (
              <tr><td colSpan="8" style={{ textAlign: 'center' }}>Không tìm thấy nhân viên</td></tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
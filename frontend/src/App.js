import React, { useState, useEffect } from 'react';


const API_URL = process.env.REACT_APP_API_URL || 'https://api-238023.onrender.com/api/employees';

function App() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    employeeId: '',
    fullName: '',
    email: '',
    phone: '',
    department: '',
    position: '',
    gender: 'Nam',
    status: 'Đang làm việc',
    dateOfBirth: '',
    hireDate: ''
  });

  const fetchEmployees = async (query = '') => {
    try {
      const res = await fetch(`${API_URL}?search=${query}`);
      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      console.error('Lỗi tải danh sách:', err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchEmployees(search);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.employeeId || !formData.fullName || !formData.email) {
      alert('Vui lòng điền đầy đủ Mã NV, Họ tên và Email');
      return;
    }

    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `${API_URL}/${editingId}` : API_URL;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        resetForm();
        fetchEmployees();
      } else {
        const errorData = await res.json();
        alert(errorData.message || 'Thao tác thất bại');
      }
    } catch (err) {
      alert('Lỗi kết nối máy chủ');
    }
  };

  const handleEdit = (emp) => {
    setEditingId(emp._id);
    setFormData({
      employeeId: emp.employeeId || '',
      fullName: emp.fullName || '',
      email: emp.email || '',
      phone: emp.phone || '',
      department: emp.department || '',
      position: emp.position || '',
      gender: emp.gender || 'Nam',
      status: emp.status || 'Đang làm việc',
      dateOfBirth: emp.dateOfBirth || '',
      hireDate: emp.hireDate || ''
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa nhân viên này?')) {
      try {
        const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (res.ok) fetchEmployees();
      } catch (err) {
        alert('Lỗi khi xóa nhân viên');
      }
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      employeeId: '',
      fullName: '',
      email: '',
      phone: '',
      department: '',
      position: '',
      gender: 'Nam',
      status: 'Đang làm việc',
      dateOfBirth: '',
      hireDate: ''
    });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>HỆ THỐNG QUẢN LÝ NHÂN SỰ</h2>

      <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Tìm theo Mã NV hoặc Họ tên..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: '8px', width: '250px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '8px 15px' }}>Tìm kiếm</button>
      </form>

      <fieldset style={{ marginBottom: '20px', padding: '15px' }}>
        <legend><h3>{editingId ? 'Cập Nhật Nhân Viên' : 'Thêm Nhân Viên Mới'}</h3></legend>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
            <input name="employeeId" placeholder="Mã NV (*)" value={formData.employeeId} onChange={handleChange} disabled={!!editingId} required />
            <input name="fullName" placeholder="Họ tên (*)" value={formData.fullName} onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email (*)" value={formData.email} onChange={handleChange} required />
            <input name="phone" placeholder="Số điện thoại" value={formData.phone} onChange={handleChange} />
            <input name="department" placeholder="Phòng ban" value={formData.department} onChange={handleChange} />
            <input name="position" placeholder="Chức vụ" value={formData.position} onChange={handleChange} />
            <div>
              <label style={{ fontSize: '12px', display: 'block' }}>Ngày sinh:</label>
              <input name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} style={{ width: '100%' }} />
            </div>
            <div>
              <label style={{ fontSize: '12px', display: 'block' }}>Ngày vào làm:</label>
              <input name="hireDate" type="date" value={formData.hireDate} onChange={handleChange} style={{ width: '100%' }} />
            </div>
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="Đang làm việc">Đang làm việc</option>
              <option value="Nghỉ việc">Nghỉ việc</option>
            </select>
          </div>
          <button type="submit" style={{ padding: '8px 15px', marginRight: '10px' }}>
            {editingId ? 'Cập nhật' : 'Thêm mới'}
          </button>
          {editingId && <button type="button" onClick={resetForm} style={{ padding: '8px 15px' }}>Hủy</button>}
        </form>
      </fieldset>

      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th>Mã NV</th>
            <th>Họ tên</th>
            <th>Giới tính</th>
            <th>Ngày sinh</th>
            <th>Phòng ban</th>
            <th>Chức vụ</th>
            <th>Email</th>
            <th>SĐT</th>
            <th>Ngày vào làm</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((emp) => (
              <tr key={emp._id}>
                <td>{emp.employeeId}</td>
                <td>{emp.fullName}</td>
                <td>{emp.gender}</td>
                <td>{emp.dateOfBirth}</td>
                <td>{emp.department}</td>
                <td>{emp.position}</td>
                <td>{emp.email}</td>
                <td>{emp.phone}</td>
                <td>{emp.hireDate}</td>
                <td>{emp.status}</td>
                <td>
                  <button onClick={() => handleEdit(emp)} style={{ marginRight: '5px' }}>Sửa</button>
                  <button onClick={() => handleDelete(emp._id)} style={{ color: 'red' }}>Xóa</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11">Không tìm thấy nhân viên</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
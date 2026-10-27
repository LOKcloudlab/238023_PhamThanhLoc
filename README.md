# HỆ THỐNG QUẢN LÝ NHÂN SỰ TRÊN NỀN TẢNG ĐÁM MÂY (CLOUD LAB)

## 1. Thông Tin Sinh Viên
- **Họ và tên:** Phạm Thành Lộc
- **Mã số sinh viên (MSSV):** 238023
- **Lớp:** Điện toán đám mây (Cloud Computing)

---

## 2. Mô Tả Ngắn Gọn Hệ Thống
Hệ thống Quản lý Nhân sự là một ứng dụng web full-stack hỗ trợ đầy đủ các thao tác quản lý nhân sự cơ bản và nâng cao (CRUD & Tìm kiếm). Ứng dụng cho phép quản lý chi tiết các thông tin nhân viên bao gồm: 
- Mã nhân viên (employeeId)
- Họ và tên (fullName)
- Giới tính (gender)
- Ngày sinh (dateOfBirth)
- Phòng ban (department)
- Chức vụ (position)
- Email (email)
- Số điện thoại (phone)
- Ngày vào làm (hireDate)
- Trạng thái làm việc (status)

Ứng dụng được đóng gói container hóa bằng Docker, lưu trữ Image trên Docker Hub và triển khai tự động trên nền tảng đám mây Render kết nối tới cơ sở dữ liệu MongoDB Atlas.

---

## 3. Công Nghệ Sử Dụng
- **Frontend:** React.js, HTML5, CSS3, JavaScript (ES6+), Nginx (Web Server phục vụ file tĩnh trong container).
- **Backend:** Node.js, Express.js, Mongoose ORM.
- **Database:** MongoDB Atlas (Cloud NoSQL Database).
- **Containerization & Deployment:** Docker, Docker Hub, Render Web Services, Git & GitHub.

---

## 4. Hướng Dẫn Chạy Ứng Dụng Ở Môi Trường Phát Triển (Local)

### Yêu cầu hệ thống:
- Đã cài đặt **Node.js** (v18 trở lên), **npm**, và **Git**.

### Các bước thực hiện:

#### Bước 1: Clone Repository về máy
```bash
git clone [https://github.com/LOKcloudlab/238023_PhamThanhLoc.git](https://github.com/LOKcloudlab/238023_PhamThanhLoc.git)
cd 238023_PhamThanhLoc

#### Bước 2: Khởi chạy Backend (API Server)
1. Mở terminal và di chuyển vào thư mục backend:
cd backend

2. Cài đặt các thư viện cần thiết:
npm install

3. Tạo file .env tại thư mục backend với nội dung:
PORT=5000
MONGO_URI=mongodb+srv://ptcptlst01edu_db_user:0168986380Cong@238023-phamthanhloc.6kmk7ye.mongodb.net/238023_PhamThanhLoc?retryWrites=true&w=majority

4. Khởi chạy server:
npm start

#### Bước 3: Khởi chạy Frontend (React App)
1. Mở một terminal mới và di chuyển vào thư mục frontend:
cd frontend

2. Cài đặt các thư viện cần thiết:
npm install

3. Tạo file .env tại thư mục frontend với nội dung:
REACT_APP_API_URL=http://localhost:5000/api/employees

4. Khởi chạy ứng dụng React:
npm start
(Frontend sẽ tự động mở trên trình duyệt tại http://localhost:3000)


5. Danh Sách Đường Link Dự Án
Link GitHub Repository: https://github.com/LOKcloudlab/238023_PhamThanhLoc
Link Docker Hub Backend: https://hub.docker.com/r/lokcloudlab/backend
Link Docker Hub Frontend: https://hub.docker.com/r/lokcloudlab/frontend
Link Render App (Frontend): https://web-238023.onrender.com
Link Render API (Backend): https://api-238023.onrender.com/api/employees
Link MongoDB Atlas: mongodb+srv://ptcptlst01edu_db_user:0168986380Cong@238023-phamthanhloc.6kmk7ye.mongodb.net/238023_PhamThanhLoc?retryWrites=true&w=majority
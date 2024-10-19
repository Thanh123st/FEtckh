const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Dữ liệu mẫu
const users = [
    { id: "1", username: "testUser", password: "testPassword",email:"test@gmail.com" },
    { id: "2", username: "admin", password: "adminpassword",email:"addmin@gmail.com" },
    { id: "3", username: "tao", password: "tao" ,email:"taotaotao@gmail.com"}
];

// Đường dẫn API
app.get('/api/users', (req, res) => {
    res.json(users);
});

// Đường dẫn API đăng nhập
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // Kiểm tra thông tin đăng nhập
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        // Nếu đăng nhập thành công, trả về email của người dùng
        res.json({
            success: true,
            email: user.email
        });
    } else {
        // Nếu đăng nhập thất bại
        res.json({
            success: false,
            message: 'Sai tên người dùng hoặc mật khẩu'
        });
    }
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



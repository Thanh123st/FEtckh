const express = require('express');
const cors = require('cors');
const app = express();

// Cấu hình CORS để chỉ cho phép domain cụ thể
app.use(cors({
    origin: 'http://localhost:3000',  // Địa chỉ của frontend ReactJS
    methods: 'GET, POST',            // Cho phép các phương thức GET và POST
    allowedHeaders: 'Content-Type, Authorization'  // Cho phép header Authorization
}));

// Các route khác của bạn
app.get('/api/detail', (req, res) => {
    res.json({ message: 'Dữ liệu từ API' });
});

const PORT = 3000;  // Hoặc port bạn đang sử dụng
app.listen(PORT, () => {
    console.log(`Server đang chạy trên http://localhost:${PORT}`);
});


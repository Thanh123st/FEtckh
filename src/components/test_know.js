import React, { useState } from 'react';

// Dữ liệu mẫu cho bảng
const sampleData = [
  { id: 1, name: 'John Doe', age: 28 },
  { id: 2, name: 'Jane Smith', age: 32 },
  { id: 3, name: 'Alice Johnson', age: 24 },
  { id: 4, name: 'Bob Brown', age: 40 },
];

const SearchTable = () => {
  const [searchTerm, setSearchTerm] = useState(''); // Trạng thái lưu giá trị tìm kiếm
  const [filteredData, setFilteredData] = useState(sampleData); // Trạng thái lưu kết quả tìm kiếm

  // Hàm xử lý khi thay đổi giá trị ô tìm kiếm
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Hàm thực hiện tìm kiếm khi người dùng nhấn nút
  const handleSearchClick = () => {
    const results = sampleData.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(results);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Tìm kiếm..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button onClick={handleSearchClick}>Tìm kiếm</button>
      
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Tuổi</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SearchTable;

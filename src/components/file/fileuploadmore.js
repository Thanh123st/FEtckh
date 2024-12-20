import axios from "axios";

// Hàm xử lý submit file
export const submitFile = async (apiUrl,file, articleId, token) => {
    try {
    if (!file || !articleId || !token) {
      throw new Error("Thiếu dữ liệu đầu vào: file, articleId, hoặc token.");
    }

    // Tạo FormData
    const formData = new FormData();
    formData.append("file[]", file); // Key là "file[]"
    formData.append("article_id", articleId); // Key là "article_id"

    // Gửi yêu cầu POST
    const response = await axios.post(`${apiUrl}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`, // Token kèm theo
      },
    });

    // Trả về kết quả từ server
    return response.data;
  } catch (error) {
    console.error("Lỗi khi submit file:", error.message);
    throw error; // Ném lỗi để xử lý trong component
  }
};

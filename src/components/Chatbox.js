import React, { useState } from 'react';
import '../Css/Wizard.css'; 

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [messageContent, setMessageContent] = useState('');
    const [fileObject, setFileObject] = useState(null);
  
    // Hàm để lấy ngày hiện tại
    const getCurrentDate = () => {
      const today = new Date();
      return today.toLocaleDateString();
    };
  
    // Hàm để lấy thời gian hiện tại
    const getCurrentTime = () => {
      const now = new Date();
      return now.toLocaleTimeString();
    };
  
    // Hàm để tạo tin nhắn mới
    const createMessage = (content, fileName = null, fileObject = null, isOutgoing = true) => {
      return {
        id: Date.now(),
        sender: isOutgoing ? 'Bạn' : 'Người gửi',
        content,
        fileName,
        fileObject,
        date: getCurrentDate(),
        time: getCurrentTime(),
      };
    };
  
    // Hàm xử lý sự kiện gửi tin nhắn
    const handleSendMessage = () => {
      if (messageContent.trim() || fileObject) {
        const newMessage = createMessage(messageContent, fileObject?.name, fileObject, true);
        setMessages([...messages, newMessage]);
        setMessageContent('');
        setFileObject(null);
      } else {
        alert('Vui lòng nhập tin nhắn hoặc chọn file để gửi.');
      }
    };
  
    // Hàm xử lý nhập nội dung tin nhắn
    const handleInputChange = (e) => {
      setMessageContent(e.target.value);
    };
  
    // Hàm xử lý khi chọn file
    const handleFileChange = (e) => {
      setFileObject(e.target.files[0]);
    };
  
    return (
      <div className="de-ar-tab-panel-pb">
        <div className="de-ar-pb-header">
          <h4>Khung trò chuyện</h4>
        </div>
        <div className="de-ar-pb-content">
          <ul className="de-ar-pb-chat" id="chat-list">
            {messages.map((msg) => (
              <li key={msg.id} className={msg.sender === 'Bạn' ? 'pb-chat-outgoing' : 'pb-chat-incoming'}>
                <label className="pb-chat-pb-name-acc"><strong>{msg.sender}</strong></label>
                <p className="pb-chat-content-message">{msg.content}</p>
                {msg.fileName && (
                  <a
                    href={URL.createObjectURL(msg.fileObject)}
                    download={msg.fileName} 
                    className="pb-chat-message-file"
                  >
                    <i className="fa-regular fa-file"></i> {msg.fileName}
                  </a>
                )}
                <p className="pb-chat-message-time">{`${msg.date} - ${msg.time}`}</p>
              </li>
            ))}
          </ul>
          <div className="de-ar-pb-chat-input">
            <textarea
              id="message-input"
              placeholder="Nhập nội dung"
              value={messageContent}
              onChange={handleInputChange}
              className='chatboxtextarea'
            ></textarea>
            <label htmlFor="file-upload" className="file-label">
              <i className="fa fa-paperclip"></i>
              <input
                type="file"
                id="file-upload"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </label>
            <span id="pb-send-message" onClick={handleSendMessage}>
              <i className="fa fa-paper-plane"></i>
            </span>
          </div>
        </div>
      </div>
    );
  };

export default Chat;

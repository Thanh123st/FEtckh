import React from 'react';
import { Link } from 'react-router-dom';
import Fooster from '../../../components/Fooster';
import Banner from '../../../components/Banner';
const Archiving = () => {
  return (
    <div>
    <Banner/>
    <div className="layout-shared">
      
      <nav className="cmp-breadcrumb">
        <ol className="breadcrumb">
          <li>
            <Link to="/">Trang chủ</Link> {/* Sử dụng Link thay vì thẻ a */}
          </li>
          <li>
            Lưu trữ
          </li>                    
        </ol>
      </nav>
      <div className="Content">
        <div className="issues media-list">
          <h3 className="media-list-heading">2024</h3>
          <div className="media-body">
            <h4 className="media-heading">
              <Link to="/layoutindex">Tập. 3 Số. 1 (2024)</Link> {/* Điều hướng đến Layoutindex */}
            </h4>
            <div className="description">
              {/* Bạn có thể thêm mô tả cho số này ở đây */}
            </div>
          </div>
          <div className="media-body">
            <h4 className="media-heading">
              <Link to="/layoutindex">Tập. 2 Số. 1 (2024)</Link> {/* Điều hướng đến Layoutindex */}
            </h4>
            <div className="description">
              {/* Bạn có thể thêm mô tả cho số này ở đây */}
            </div>
          </div>
          <div className="media-body">
            <h4 className="media-heading">
            <Link to="/layoutindex">Tập. 1 Số. 1 (2024)</Link>{/* Điều hướng đến Layoutindex */}
            </h4>
            <div className="description">
              {/* Bạn có thể thêm mô tả cho số này ở đây */}
            </div>
          </div>
        </div>
      </div>
      
    </div>
    <Fooster/>
    </div>
    
    
  );
};

export default Archiving;

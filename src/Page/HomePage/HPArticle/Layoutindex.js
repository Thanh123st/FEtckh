import React from 'react';
import { Link } from 'react-router-dom';
import Fooster from '../../../components/Fooster';
import Banner from '../../../components/Banner';

function Layoutindex() {
  return (
    <div>
    <Banner/>
    <div className="layout-shared">
      <nav className="cmp-breadcrumb">
        <ol className="breadcrumb">
          <li>
            <Link to="/">Trang chủ</Link>
          </li>
          <li>
            <Link to="/archiving">Lưu trữ</Link>
          </li>
          <li>
            Tập. 1 Số. 1 (2024)
          </li>                    
        </ol>
      </nav>
      <div className="content" style={{ display:"block" }}>
        <div className="issue">
          <div className="issue-heading">
            <div className="thumbnail">
              <a className="cover" href="">
                <img className="issue-img" src="/ass/img/thobaymau.jpg" alt="Bìa Tạp chí" />
              </a>
            </div>
            <div className="thumbnail-detai">
              <p className="published">
                <strong>
                  Ngày xuất bản:
                </strong>
                01/01/2000
              </p>
              <div className="galleys-section">
                <div className="galleys-group">
                  <a className="galley-link btn btn-borders btn-xs btn-outline pdf" role="button" href="">
                    <i className="far fa-file-pdf"></i> Tập. 1 Số. 1 (2024)
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="issue-sections">
            <section className="section">
              <h2>
                <small>Khoa học Công nghệ thông tin</small>
              </h2>
              <div className="media-list">
                <div className="media-body">
                  <div className="col-md-12 pl-0">
                    <Link className="article-title" to="/layoutview">
                      <span>Thực trạng quản lý hoạt động giáo dục địa phương cho học sinh ở các trường tiểu học huyện Tam Nông, tỉnh Đồng Tháp</span>
                    </Link>
                    <div className="meta">
                      <div className="authors pb-0">
                        Trần Đại Nghĩa, Nguyễn Ngọc Thiên Trung
                      </div>
                    </div>
                    <div className="doi">
                      <a href="https://doi.org/10.52714/dthu.13.01S.2024.1281">
                        https://doi.org/10.52714/dthu.13.01S.2024.1281
                      </a>
                    </div>
                    <div role="group" className="d-inline-block pt-3">
                      <a className="galley-link btn btn-borders btn-xs btn-outline pdf" role="button" href="https://dthujs.vn/index.php/dthujs/article/view/1594/1393">
                        <i className="far fa-file-pdf"></i> PDF
                      </a>
                      <a className="galley-link btn btn-borders btn-xs btn-outline" role="button" data-toggle="modal" data-target="#vojsCitation-1594">
                        <i className="fas fa-quote-right fa-xs"></i> Trích dẫn
                      </a>
                      <div className="modal fade" id="vojsCitation-1594" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                          <div className="panel panel-default how-to-cite modal-content">
                            <div className="modal-header panel-heading">
                              <h4>Cách trích dẫn</h4>
                            </div>
                            <div className="modal-body panel-body">
                              <div id="citationOutput-1594" role="region" aria-live="polite">
                                <div className="csl-bib-body">
                                  <div className="csl-entry">Trần, Đ. N., & Nguyễn, N. T. T. (2024). Thực trạng quản lý hoạt động giáo dục địa phương cho học sinh ở các trường tiểu học huyện Tam Nông, tỉnh Đồng Tháp. <i>Tạp chí Khoa học Đại học Đồng Tháp</i>, <i>13</i>(01S), 1-10. https://doi.org/10.52714/dthu.13.01S.2024.1281</div>
                                </div>
                              </div>
                            </div>
                            <div className="modal-footer">
                              <div className="btn-group">
                                <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                  Thêm định dạng trích dẫn
                                  <span className="caret"></span>
                                </button>
                                <ul className="dropdown-menu">
                                  <li><a href="https://dthujs.vn/index.php/dthujs/citationstylelanguage/get/apa?submissionId=1594&publicationId=1594">APA</a></li>
                                  <li><a href="https://dthujs.vn/index.php/dthujs/citationstylelanguage/get/chicago-author-date?submissionId=1594&publicationId=1594">Chicago</a></li>
                                  <li><a href="https://dthujs.vn/index.php/dthujs/citationstylelanguage/get/ieee?submissionId=1594&publicationId=1594">IEEE</a></li>
                                </ul>
                              </div>
                              <button type="button" className="btn btn-secondary mb-0 ml-5" id="copyBtn-1594">
                                <span className="icon-copy-btn fas fa-copy"></span> Sao chép
                              </button>
                              <button type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <a className="btn btn-borders btn-xs btn-outline float-right pointer-events-none">Trang: 1-10</a>
                  </div>
                </div>
                <div className="media-body">
                  <div className="col-md-12 pl-0">
                    <a className="article-title">
                      <span>Ứng dụng trí tuệ nhân tạo trong việc tối ưu hóa hệ thống quản lý dữ liệu tại Khoa Công nghệ Thông tin, Trường Đại học Kỹ thuật - Công nghệ Cần Thơ</span>
                    </a>
                    <div className="meta">
                      <div className="authors pb-0">
                        Nguyễn Văn A, Trần Thị B
                      </div>
                    </div>
                    <div className="doi">
                      <a>Không có DOI cho bài viết này</a>
                    </div>
                    <div role="group" className="d-inline-block pt-3">
                      <a className="galley-link btn btn-borders btn-xs btn-outline pdf" role="button">
                        <i className="far fa-file-pdf"></i> PDF
                      </a>
                      <a className="galley-link btn btn-borders btn-xs btn-outline" role="button" data-toggle="modal" data-target="#vojsCitation-1595">
                        <i className="fas fa-quote-right fa-xs"></i> Trích dẫn
                      </a>
                      <div className="modal fade" id="vojsCitation-1595" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                          <div className="panel panel-default how-to-cite modal-content">
                            <div className="modal-header panel-heading">
                              <h4>Cách trích dẫn</h4>
                            </div>
                            <div className="modal-body panel-body">
                              <div id="citationOutput-1595" role="region" aria-live="polite">
                                <div className="csl-bib-body">
                                  <div className="csl-entry">Nguyễn, V. A., & Trần, T. B. (2024). Ứng dụng trí tuệ nhân tạo trong việc tối ưu hóa hệ thống quản lý dữ liệu tại Khoa Công nghệ Thông tin, Trường Đại học Kỹ thuật - Công nghệ Cần Thơ. <i>Tạp chí Khoa học Công nghệ Thông tin</i>, <i>13</i>(01S), 1-10.</div>
                                </div>
                              </div>
                            </div>
                            <div className="modal-footer">
                              <div className="btn-group">
                                <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                  Thêm định dạng trích dẫn
                                  <span className="caret"></span>
                                </button>
                                <ul className="dropdown-menu">
                                  <li><a>APA</a></li>
                                  <li><a>Chicago</a></li>
                                  <li><a>IEEE</a></li>
                                </ul>
                              </div>
                              <button type="button" className="btn btn-secondary mb-0 ml-5" id="copyBtn-1595">
                                <span className="icon-copy-btn fas fa-copy"></span> Sao chép
                              </button>
                              <button type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <a className="btn btn-borders btn-xs btn-outline float-right pointer-events-none">Trang: 11-20</a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
    <Fooster/>
  </div>

  );
}

export default Layoutindex;

import React, { useState } from 'react';

const Step2 = () => {
  return (
    <div id="step2" className="context active">
      <form className="pkp_ui_content">
        <div>
          <h5>Tải tập tin</h5>
        </div>
        <div id="pkpUploaderDropZone" className="pkp_uploader_drop_zone" style={{ position: 'relative' }}>
          {/* Label for drag and drop upload area */}
          <div className="pkp_uploader_drop_zone_label">
            Kéo và thả tệp vào đây để bắt đầu tải lên
          </div>

          {/* Details about the upload progress */}
          <div className="pkp_uploader_details">
            <div className="pkp_uploader_progress_bar_wrapper">
            <div class="pkp_grid-container">
              <input id="picture" type="file" class="pkp_input-file"/>
            </div>

            </div>
            <span className="pkpUploaderFilename"></span>
          </div>


          {/* Hidden file input for HTML5 file upload */}
          <div
            id="html5_1i6mdk1udt1ic5582tjqh7602h_container"
            className="moxie-shim moxie-shim-html5"
            style={{ position: 'absolute', top: '11px', left: '637px', width: '112px', height: '32px', overflow: 'hidden', zIndex: 0 }}
          >
            <input
              id="html5_1i6mdk1udt1ic5582tjqh7602h"
              type="file"
              style={{ fontSize: '999px', opacity: 0, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              accept=".pdf, .doc, .docx" // Add appropriate file types here
              tabIndex="-1"
            />
          </div>

          <div className="section formButtons form_buttons">
            <button className="pkp_button submitFormButton" type="submit">
              Lưu và tiếp tục
            </button>

            <span></span>

            <a href="#" className="cancelButton">
              Hủy bỏ
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Step2;

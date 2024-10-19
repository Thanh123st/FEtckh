import React, { useState } from 'react';
import Step1 from './wizard/step1';
import Step2 from './wizard/step2';
import Step3 from './wizard/step3';
import Step4 from './wizard/step4';
import Step5 from './wizard/step5';
import Sub from './Subs';
import HeaderSub, { SlideBar } from './HeaderSub';

const Wizard = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <Step1 />;
            case 2:
                return <Step2 />;
            case 3:
                return <Step3 />;
            case 4:
                return <Step4 />;
            case 5:
                return <Step5 />;
            default:
                return <Sub />;
        }
    };

    return (
        <div>
            <HeaderSub /> {/* Gọi component HeaderSub */}
            <div className="pkp_structure_main">
                <SlideBar /> {/* Gọi component SlideBar */}
                <div className="pkp_structure_content">
                    <div className="pkp_page_title">
                        <h3>Gửi một bài báo mới</h3>
                    </div>
                    <div className="pkpTabs">
                        <div className="tabs-list">
                            <button
                                className={`tab-button btn-step ${currentStep === 1 ? 'active' : ''}`}
                                onClick={() => setCurrentStep(1)}
                            >
                                Bắt đầu
                            </button>
                            <button
                                className={`tab-button btn-step ${currentStep === 2 ? 'active' : ''}`}
                                onClick={() => setCurrentStep(2)}
                            >
                                Tải lên bài nộp
                            </button>
                            <button
                                className={`tab-button btn-step ${currentStep === 3 ? 'active' : ''}`}
                                onClick={() => setCurrentStep(3)}
                            >
                                Nhập dữ liệu
                            </button>
                            <button
                                className={`tab-button btn-step ${currentStep === 4 ? 'active' : ''}`}
                                onClick={() => setCurrentStep(4)}
                            >
                                Xác nhận
                            </button>
                            <button
                                className={`tab-button btn-step ${currentStep === 5 ? 'active' : ''}`}
                                onClick={() => setCurrentStep(5)}
                            >
                                Lưu trữ
                            </button>
                        </div>
                        <div className="step-content">
                            {renderStep()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wizard;

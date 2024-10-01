import React from 'react';
import './Modal.css';
import { useTranslation } from 'react-i18next';

const Modal = ({ showModal, setShowModal, verificationID, email, setEmail, pasteOtp, handleOtpChange, handlePaste, handleRequestOtp, handleVerifyOtp }) => {
  const { t, i18n } = useTranslation();

  const handleClose = (e) => {
    if (e.target.classList.contains('modal')) {
      setShowModal(false);
    }
  };

  const handleVerify = () => {
    const otp = pasteOtp.join('');
    handleVerifyOtp({ otp, verificationID });
  };

  return (
    showModal && (
      <div className="modal show d-block" tabIndex={-1} onClick={handleClose}>
        <div className="modal-dialog modal-bottom modal-full-width">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-between align-items-center">
              <h3 className="fw-bold m-0">{t('sign_up_for_newsletter')}</h3>
              <div>
                <button type="button" className="btn-close shadow-none" onClick={() => setShowModal(false)} aria-label="Close">X</button>
              </div>
            </div>
            <div className="modal-body offcanvas-body small">
              <div className="container">
                <form className="custom-form d-flex justify-content-between align-items-center">
                  <div className="col-lg-8 col-md-7 mb-0">
                    {!verificationID ? (
                      <div className="d-flex" style={{ width: "600px", height: "50px", margin: "10px" }}>
                        <input
                          type="email"
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={t('enter_your_email')}
                          className="form-control email-input"
                        />
                        <button className="btn btn-primary subscribe ms-2" style={{ width: "200px", padding: "10px" }} type="button" onClick={() => handleRequestOtp(email)}>{t('submit')}</button>
                      </div>
                    ) : (
                      <div className="text-center" style={{ alignItems: "center" }}>
                        <h2 className='fs-4'>{t('otp_placeholder')}</h2>
                        <div className="d-flex justify-content-center otp-inputs">
                          {pasteOtp?.map((data, i) => (
                            <React.Fragment key={i}>
                              <input
                                type="text"
                                onPaste={(e) => handlePaste(e)}
                                value={data}
                                onChange={(e) => handleOtpChange(e, i)}
                                maxLength="1"
                                className="form-control text-center otp-input mb-3"
                                style={{ width: '50px' }}
                                dir='ltr'
                              />
                              {i < pasteOtp.length - 1 && <span className="otp-separator mt-2">&nbsp;-&nbsp;</span>}
                            </React.Fragment>
                          ))}
                        </div>
                        <div> 
                          <button className="btn btn-primary subscribe" style={{ width: "200px"}} type="button" onClick={handleVerify}>{t('verify')}</button>
                        </div>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
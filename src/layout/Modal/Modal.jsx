import React from 'react';
import './Modal.css';
import { useTranslation } from 'react-i18next';

const Modal = ({ showModal, setShowModal, verificationID, email, setEmail, pasteOtp, handleOtpChange, handlePaste, handleRequestOtp, handleVerifyOtp }) => {
  const { t } = useTranslation();

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
      <div className="modal show d-block" onClick={handleClose}>
        <div className="modal-dialog-bottom modal-full-width">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-between align-items-center">
              <h3 className="fw-bold m-0">{t('sign_up_for_newsletter')}</h3>
              <button type="button" className="btn-close shadow-none" onClick={() => setShowModal(false)} aria-label="Close">x</button>
            </div>
            <div className="modal-body">
              <div className="container">
                <form className="custom-form d-flex justify-content-between align-items-center">
                  <div className="col-lg-8 col-md-7 mb-0">
                    {!verificationID ? (
                      <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t('enter_your_email')}
                        className="form-control email-input"
                      />
                    ) : (
                      <div className="d-flex justify-content-between otp-inputs">
                        {pasteOtp?.map((data, i) => (
                          <input
                            key={i}
                            type="text"
                            onPaste={(e) => handlePaste(e)}
                            value={data}
                            onChange={(e) => handleOtpChange(e, i)}
                            maxLength="1"
                            className="form-control text-center otp-input mb-3"
                            style={{ width: '50px' }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="col-lg-3 col-md-3 text-end">
                    {!verificationID ? (
                      <button className="btn btn-primary subscribe" type="button" onClick={() => handleRequestOtp(email)}>{t('submit')}</button>
                    ) : (
                      <button className="btn btn-primary subscribe" type="button" onClick={handleVerify}>{t('verify')}</button>
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
import './NewsletterCard.css';
import { useTranslation } from 'react-i18next';

const NewsletterCard = ({ newsletters, subscriptions, handleSubscribeClick, loading }) => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  return (
    <div className="row justify-content-between p-2 m-0 py-3 mb-3 bg-light">
      {newsletters && newsletters.map((newsletter) => (
        <div className="col-md-6 mb-2" key={newsletter.preferenceID}>
          <div className="card rounded-0 h-100">
            <div className="row g-0 h-100">
              <div className="col-md-5">
                <img
                  src={newsletter.thumbnail}
                  className="nl-image img-fluid img-card h-100"
                  alt=""
                  draggable="false"
                />
              </div>
              <div className="col-md-7">
                <div className="card-body h-100 d-flex flex-column justify-content-between">
                  <h4 className="mb-1 fw-bold" style={{ fontSize: '14px' }}>
                    {currentLanguage === 'ar' ? newsletter.nameAr : newsletter.nameEn}
                  </h4>
                  <p className="p-0 m-0 mb-1 mt-1" style={{ fontSize: '12px' }}>
                    {currentLanguage === 'ar' ? newsletter.descriptionAr : newsletter.descriptionEn}
                  </p>
                  <button
                    className={`btn btn-sm mt-2 ${subscriptions[newsletter.preferenceID] ? 'btn-outline-danger' : 'btn-outline-dark'}`}
                    style={{ width: '120px' }}
                    onClick={() => handleSubscribeClick(newsletter)}
                    disabled={loading} // Disable button when loading
                  >
                    {subscriptions[newsletter.preferenceID] ? t('unsubscribe') : t('subscribe')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default NewsletterCard
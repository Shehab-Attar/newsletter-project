import './TopTitle.css';
import { useTranslation } from 'react-i18next';


const TopTitle = ({ isSubscribed, userId, showSettings, handleSettingsClick }) => {
  const { t } = useTranslation();

  return (
    <div className="text-left newsletter-container">
        <h2 className="fw-bold fs-4 newsletter-heading">{t('newsletter_subscription_center')}</h2>
      <div className="d-flex justify-content-between align-items-center">
      <p className="fw-light fs-6 mb-0">{t('more_content')}</p>
      {userId !== "0"  && (
        <button className="settings-button flex-wrap btn fw-bold d-flex align-items-center btn-light mb-1" onClick={handleSettingsClick}>
          {showSettings ? t('newsletter') : t('settings')}
        </button>
      )}
      </div>
      {!isSubscribed && (
        <p className="fw-light fs-6 mb-0">{t('choose_newsletter')}</p>
      )}
      <p className="border bg-light p-2 mb-1" id="terms-and-conditions">
        {t('conditions')}
        <a href="https://www.argaam.com/en/static-contents/privacypolicy" className="text-decoration-none" target="_blank"> {t('privacy_policy')} </a>
        {t('and')}
        <a href="https://www.argaam.com/en/static-contents/termsandconditions" className="text-decoration-none" target="_blank"> {t('terms_and_conditions')}</a>.
        {t('conditions2')}
      </p>
    </div>
  )
}

export default TopTitle;
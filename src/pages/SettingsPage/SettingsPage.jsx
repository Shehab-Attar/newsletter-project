import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import CurrentSubscriptions from './SettingsTabs/CurrentSubscriptions';
import Recommendations from './SettingsTabs/Recommendations';
import Preferences from './SettingsTabs/Preferences/Preferences';
import './SettingsPage.css';
import { useTranslation } from 'react-i18next';
const SettingsPage = ({ handleSubscribeClick, loading, newsletters, subscriptions, userId }) => {
  const { t } = useTranslation();
  return (
    <div className="container-lg">
      {/* Nav tabs */}
      <ul className="nav nav-tabs px-0 border-bottom-0" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button 
            className="nav-link active" 
            id="current-tab" 
            data-bs-toggle="tab" 
            data-bs-target="#current-tab-pane" 
            type="button" 
            role="tab" 
            aria-controls="current-tab-pane" 
            aria-selected="true">
            {t('current_subscriptions')}
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button 
            className="nav-link" 
            id="interests-tab" 
            data-bs-toggle="tab" 
            data-bs-target="#interests-tab-pane" 
            type="button" 
            role="tab" 
            aria-controls="interests-tab-pane"
            aria-selected="false">
            {t('preferences')}
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button 
            className="nav-link" 
            id="recommend-tab" 
            data-bs-toggle="tab" 
            data-bs-target="#recommend-tab-pane" 
            type="button" 
            role="tab" 
            aria-controls="recommend-tab-pane" 
            aria-selected="false">
            {t('recommendations')}
          </button>
        </li>
      </ul>

      {/* Tab content */}
      <div className="tab-content mt-3" id="myTabContent">
        {/* Current Subscriptions content */}
        <div className="tab-pane fade show active" id="current-tab-pane" role="tabpanel" aria-labelledby="current-tab">
          <div className="container">
          <CurrentSubscriptions
          newsletters={newsletters}
          subscriptions={subscriptions}
          handleSubscribeClick={handleSubscribeClick}
          loading={loading}
        />
          </div>
        </div>

        {/* Preferences content */}
        <div className="tab-pane fade bg-light" id="interests-tab-pane" role="tabpanel" aria-labelledby="interests-tab">
          <div className="container">
            <Preferences userId={userId}/>
          </div>
        </div>

        {/* Recommendations content */}
        <div className="tab-pane fade" id="recommend-tab-pane" role="tabpanel" aria-labelledby="recommend-tab">
          <div className="container">
          <Recommendations
          newsletters={newsletters}
          subscriptions={subscriptions}
          handleSubscribeClick={handleSubscribeClick}
          loading={loading}
        />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;

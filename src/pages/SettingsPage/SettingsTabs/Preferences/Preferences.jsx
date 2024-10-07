import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'; 
import { getUserSettings, updateUserSettings } from '../../../../services/apis';
import './Preferences.css';

const Preferences = ({ userId }) => {
  const { t, i18n } = useTranslation();
  const queryClient = useQueryClient();

  // Fetch user settings
  const { data: settings, error, isLoading } = useQuery({
    queryKey: ['userSettings', userId],
    queryFn: () => getUserSettings(userId),
    onError: (err) => console.error("Error fetching settings: ", err),
  });

  // Mutation for updating settings
  const mutation = useMutation({
    mutationFn: (updatedSetting) => updateUserSettings(userId, updatedSetting),
    onSuccess: () => {
      console.log('Settings updated successfully');
      queryClient.invalidateQueries(['userSettings', userId]); // Refetch user settings
    },
    onError: (err) => console.error("Error updating settings: ", err),
  });

  // Toggle function
  const handleToggle = (setting) => {
    // Check if setting is defined and has a settingId
    if (!setting || !setting.settingId) {
      console.error('Invalid setting object:', setting);
      return;
    }

    // Toggle the isChecked value
    const updatedSetting = {
      ...setting,
      isChecked: !setting.isChecked,
    };

    console.log('Toggling setting: ', updatedSetting);

    // Call mutation and ensure UI gets updated after success
    mutation.mutate(updatedSetting, {
      onSuccess: () => {
        console.log('Toggle success for setting: ', updatedSetting);
        queryClient.invalidateQueries(['userSettings', userId]); // Refresh the settings
      },
      onError: (error) => {
        console.error('Error updating settings:', error);
      }
    });
  };

  const renderSettingCells = (settingGroup) => {
    
    const sortedSettings = [...settingGroup].sort((a, b) => b.isChecked - a.isChecked); // Sorting by checked state

    return sortedSettings.map((setting) => (
      <div className="d-flex justify-content-between align-items-center bg-white my-2 p-1 rounded-3 px-3" key={setting.settingId} style={{ fontSize: '14px' }}>
        <p className='m=o p-0 py-1'>{i18n.language === 'ar' ? setting.nameAr : setting.nameEn}</p>
        <label className="switch">
          <input
            type="checkbox"
            checked={setting.isChecked}
            onChange={() => handleToggle(setting)} // Trigger the toggle function on change
            disabled={mutation.isLoading} // Disable input while mutation is happening
          />
          <span className="slider"></span>
        </label>
      </div>
    ));
  };

  if (isLoading) return <p>{t('loading')}</p>;
  if (error) return <p>{t('error_loading_settings')}</p>;

  return (
    <div className="container-lg row row-cols-lg-3 row-cols-md-2 row-cols-1 rounded py-1 bg-light">
      <div className='d-flex flex-column'>
        <h6 className="m-0 p-2 border-bottom fw-bold d-flex">{t('interests')}</h6>
        {renderSettingCells(settings.interest)}
      </div>    
      <div className='d-flex flex-column'>
        <h6 className="m-0 p-2 border-bottom fw-bold">{t('communication_frequency')}</h6>
        {renderSettingCells(settings.communicationFrequency)}
      </div>
      <div className='d-flex flex-column'>
        <h6 className="m-0 p-2 border-bottom fw-bold">{t('preferred_language')}</h6>
        {renderSettingCells(settings.preferredLanguage)}
      </div>
    </div>
  );
};

export default Preferences;

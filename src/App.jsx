import { Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import NewsletterSubscription from './pages/NewsletterPage/NewsletterPage';

const App = () => {

  const { i18n } = useTranslation();

  const basePath = `/${i18n.language}`;

  return (
      <Routes>
        <Route path="/:lang" element={<NewsletterSubscription />} />
        <Route path="*" element={<Navigate to={`${basePath}?userId=0`} replace />} />
      </Routes>
  );
};

export default App;

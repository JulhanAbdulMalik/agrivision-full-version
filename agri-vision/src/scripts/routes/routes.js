import HomePage from '../pages/home-page';
import AboutPage from '../pages/about-page';
import DetectionPage from '../pages/detection-page';
import EducationPage from '../pages/education-page';
import EducationDetailPage from '../pages/education-detail-page';
import DetectionSpecificPage from '../pages/detection-spesific-page';
import DetectionResultPage from '../pages/detection-result-page';

const routes = {
  '/': new HomePage(),
  '/about': new AboutPage(),

  // Detection
  '/detection': new DetectionPage(),
  '/detection/padi': new DetectionSpecificPage('Padi'),
  '/detection/jagung': new DetectionSpecificPage('Jagung'),
  '/detection/cabai': new DetectionSpecificPage('Cabai'),
  '/detection/tomat': new DetectionSpecificPage('Tomat'),

  // Detection Results
  '/detection/detect-results/padi': new DetectionResultPage('Padi'),
  '/detection/detect-results/jagung': new DetectionResultPage('Jagung'),
  '/detection/detect-results/cabai': new DetectionResultPage('Cabai'),
  '/detection/detect-results/tomat': new DetectionResultPage('Tomat'),

  // Education
  '/education': new EducationPage(),
  '/education/:id': new EducationDetailPage(),
};

export default routes;

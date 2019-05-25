import React from 'react';
import BackgroundClouds from './BackgroundClouds';
import './WelcomePage.scss';

const WelcomePage: React.FC = () => {
  return (
    <div className="WelcomePage">
      <BackgroundClouds />
    </div>
  );
}

export default WelcomePage;

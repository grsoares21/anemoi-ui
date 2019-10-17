import React from 'react';

import './WelcomePhrase.scss';
import { useTranslation, Trans } from 'react-i18next';

const WelcomePhrase: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="WelcomePhrase">
      <h1 className="WelcomePhraseIntroduction">
        <Trans i18nKey="WELCOME_IM_ANEMOI">
          Welcome I am <em>Anemoi.</em>
        </Trans>
        <br />
        <Trans i18nKey="TRAVEL_EXPERT">
          Travel <em>expert.</em>
        </Trans>
        <br />
      </h1>
      <h1 className="WelcomePhraseCallToAction">{t('CAN_I_HELP_PLANNING_YOURS')}</h1>
    </div>
  );
};

export default WelcomePhrase;

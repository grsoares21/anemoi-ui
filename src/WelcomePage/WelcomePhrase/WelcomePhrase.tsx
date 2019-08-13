import React from 'react';

import './WelcomePhrase.scss';

const WelcomePhrase: React.FC = () => {
  return (
    <div className="WelcomePhrase">
      <h1 className="WelcomePhraseIntroduction">
        Bem-vindo, eu sou o <em>Anemoi.</em>
        <br />
        Expert em <em>viagens.</em>
        <br />
      </h1>
      <h1 className="WelcomePhraseCallToAction">
        Possor ajudar a planejar a sua?
      </h1>
    </div>
  );
}

export default WelcomePhrase;

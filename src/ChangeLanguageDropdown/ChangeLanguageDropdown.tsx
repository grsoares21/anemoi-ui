import './ChangeLanguageDropdown.scss';

import { useTranslation } from 'react-i18next';
import React from 'react';
import { Dropdown } from 'react-bootstrap';
import moment from 'moment';
import FlagIcon from '../Shared/FlagIcon';

const languageToCountry = new Map<string, string>();
languageToCountry.set('en', 'us');
languageToCountry.set('pt', 'br');

const ChangeLanguageDropdown: React.FC = () => {
  const { i18n } = useTranslation();

  const currentLanguage = i18n.language.split('-')[0].toLowerCase();
  const currentCountry = languageToCountry.get(currentLanguage) || 'us';

  if(moment.locale() !== `${currentLanguage}-${currentCountry}`) {
    moment.locale(`${currentLanguage}-${currentCountry}`);
  }

  return (
    <div className="ChangeLanguageDropdown">
      <Dropdown>
        <Dropdown.Toggle id="dropdown-basic">
          <FlagIcon className="FlagIcon" code={currentCountry} />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {Array.from(languageToCountry).map(([language, country]: [string, string]) =>
            <Dropdown.Item key={language+country} onSelect={() => i18n.changeLanguage(language)}>
              <FlagIcon className="FlagIcon" code={country} />
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default ChangeLanguageDropdown;

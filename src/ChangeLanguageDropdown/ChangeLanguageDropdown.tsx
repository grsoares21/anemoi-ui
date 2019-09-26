import './ChangeLanguageDropdown.scss';

import { useTranslation } from 'react-i18next';
import React from 'react';
import { Dropdown } from 'react-bootstrap';
import moment from 'moment';
import FlagIcon from '../Shared/FlagIcon';
import { languageList } from './../i18n/i18n';

const ChangeLanguageDropdown: React.FC = () => {
  const { i18n } = useTranslation();

  if(moment.locale() !== i18n.language) {
    moment.locale(i18n.language);
  }

  return (
    <div className="ChangeLanguageDropdown">
      <Dropdown>
        <Dropdown.Toggle id="dropdown-basic">
          <FlagIcon className="FlagIcon" code={i18n.language.split('-')[1].toLocaleLowerCase()} />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {languageList.map(language =>
            <Dropdown.Item key={language} onSelect={() => i18n.changeLanguage(language)}>
              <FlagIcon className="FlagIcon" code={language.split('-')[1].toLocaleLowerCase()} />
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default ChangeLanguageDropdown;

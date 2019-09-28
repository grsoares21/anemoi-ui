import './ChangeCurrencyDropdown.scss';

import { useTranslation } from 'react-i18next';
import React, { useContext } from 'react';
import { Dropdown } from 'react-bootstrap';
import moment from 'moment';
import { CurrencyContext } from '../Shared/CurrecyContext';
import { currencyList } from '../Shared/CurrecyContext';


const ChangeCurrencyDropdown: React.FC = () => {
  const { i18n } = useTranslation();

  if(moment.locale() !== i18n.language) {
    moment.locale(i18n.language);
  }

  const currencyContext = useContext(CurrencyContext);

  return (
    <div className="ChangeCurrencyDropdown">
      <Dropdown>
        <Dropdown.Toggle id="dropdown-basic">
          {currencyContext.currency}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {currencyList.map(currency =>
            <Dropdown.Item key={currency} onSelect={() => currencyContext.setCurrency(currency)}>
              {currency}
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default ChangeCurrencyDropdown;

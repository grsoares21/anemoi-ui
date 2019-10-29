import './ChangeCurrencyDropdown.scss';

import { useTranslation } from 'react-i18next';
import React, { useContext, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import { CurrencyContext } from '../Shared/CurrecyContext';
import { currencyList } from '../Shared/CurrecyContext';
import LocaleCurrency from 'locale-currency';

const ChangeCurrencyDropdown: React.FC = () => {
  const { i18n } = useTranslation();
  const currencyContext = useContext(CurrencyContext);

  useEffect(() => {
    const detectedCurrency = LocaleCurrency.getCurrency(i18n.language);
    // if it's on our list of currencies
    if (currencyList.some(curr => curr === detectedCurrency)) {
      currencyContext.setCurrency(detectedCurrency);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="ChangeCurrencyDropdown">
      <Dropdown>
        <Dropdown.Toggle id="dropdown-basic">{currencyContext.currency}</Dropdown.Toggle>
        <Dropdown.Menu>
          {currencyList.map(currency => (
            <Dropdown.Item key={currency} onSelect={() => currencyContext.setCurrency(currency)}>
              {currency}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default ChangeCurrencyDropdown;

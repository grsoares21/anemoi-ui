import './ThemeContextCheckbox.scss';

import React, { useContext } from 'react';
import { ThemeContext } from '../../Shared/ThemeContext';

const ThemeContextCheckbox: React.FC = () => {
  const themeContext = useContext(ThemeContext);

  return (
    <input className="ThemeContextCheckbox" type="checkbox" onChange={(e) => {
      if (e.target.checked) {
        themeContext.setTheme("DARK");
      } else {
        themeContext.setTheme("LIGHT")
      }
    }} />
  );
};

export default ThemeContextCheckbox;

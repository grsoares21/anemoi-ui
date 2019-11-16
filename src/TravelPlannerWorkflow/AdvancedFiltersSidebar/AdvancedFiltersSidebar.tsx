import React, { useState } from 'react';
import useMedia from 'use-media';
//import { useTranslation } from 'react-i18next';
import Sidebar from 'react-sidebar';
import AdvancedFiltersSidebarStyles from './AdvancedFiltersSidebarStyles';

import './AdvancedFiltersSidebar.scss';

const AdvancedFiltersSidebar: React.FC = props => {
  //const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const isWide = useMedia({ minWidth: 800 });

  const sidebarContent = <b>Sidebar content</b>;
  return (
    <Sidebar
      sidebar={sidebarContent}
      open={open}
      onSetOpen={setOpen}
      docked={isWide && open}
      styles={AdvancedFiltersSidebarStyles}
    >
      <button onClick={() => setOpen(!open)} className="AdvancedFiltersButton">
        Open sidebar
      </button>
      {props.children}
    </Sidebar>
  );
};

export default AdvancedFiltersSidebar;

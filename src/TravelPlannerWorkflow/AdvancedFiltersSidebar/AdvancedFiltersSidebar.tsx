import React, { useState } from 'react';
import useMedia from 'use-media';
//import { useTranslation } from 'react-i18next';
import Sidebar from 'react-sidebar';
import AdvancedFiltersSidebarStyles from './AdvancedFiltersSidebarStyles';
import { GoSettings } from 'react-icons/go';

import './AdvancedFiltersSidebar.scss';
import { Button } from 'react-bootstrap';
import AdvancedFilters from './AdvancedFilters/AdvancedFilters';

const AdvancedFiltersSidebar: React.FC = props => {
  //const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const isWide = useMedia({ minWidth: 800 });
  const sidebarFeatureFlag = false;
  return sidebarFeatureFlag ? (
    <Sidebar
      sidebar={<AdvancedFilters />}
      open={open}
      onSetOpen={setOpen}
      docked={isWide && open}
      styles={AdvancedFiltersSidebarStyles}
    >
      <Button variant="outline-primary" className="AdvancedFiltersButton" onClick={() => setOpen(!open)}>
        <GoSettings />
      </Button>
      {props.children}
    </Sidebar>
  ) : (
    <span>{props.children}</span>
  );
};

export default AdvancedFiltersSidebar;

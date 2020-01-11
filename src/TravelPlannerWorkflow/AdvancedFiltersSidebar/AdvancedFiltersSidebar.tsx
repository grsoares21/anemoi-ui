import React, { useState } from 'react';
import useMedia from 'use-media';
//import { useTranslation } from 'react-i18next';
import Sidebar from 'react-sidebar';
import AdvancedFiltersSidebarStyles from './AdvancedFiltersSidebarStyles';
import { GoSettings } from 'react-icons/go';

import './AdvancedFiltersSidebar.scss';
import { Button } from 'react-bootstrap';

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
      <Button variant="outline-primary" className="AdvancedFiltersButton" onClick={() => setOpen(!open)}>
        <GoSettings />
      </Button>
      {props.children}
    </Sidebar>
  );
};

export default AdvancedFiltersSidebar;

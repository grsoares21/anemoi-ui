import React, { useState } from 'react';
import useMedia from 'use-media';

import Sidebar from 'react-sidebar';
import AdvancedFiltersSidebarStyles from './AdvancedFiltersSidebarStyles';
import { GoSettings } from 'react-icons/go';

import './AdvancedFiltersSidebar.scss';
import { Button } from 'react-bootstrap';
import AdvancedFilters from './AdvancedFilters/AdvancedFilters';
import useTheme from '../../Shared/useTheme';

const AdvancedFiltersSidebar: React.FC = props => {
  const [open, setOpen] = useState(false);
  const isWide = useMedia({ minWidth: 800 });
  const themeClass = useTheme();
  return (
    <Sidebar
      sidebar={<AdvancedFilters />}
      open={open}
      onSetOpen={setOpen}
      docked={isWide && open}
      sidebarClassName={`AdvancedFiltersSidebar ${themeClass}`}
      styles={AdvancedFiltersSidebarStyles}
    >
      <Button variant="outline-primary" className={`AdvancedFiltersButton ${themeClass}`} onClick={() => setOpen(!open)}>
        <GoSettings />
      </Button>
      {props.children}
    </Sidebar>
  );
};

export default AdvancedFiltersSidebar;

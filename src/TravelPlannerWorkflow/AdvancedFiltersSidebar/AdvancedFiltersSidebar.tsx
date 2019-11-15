import React, { useState } from 'react';
import useMedia from 'use-media';
//import { useTranslation } from 'react-i18next';
import Sidebar from 'react-sidebar';

const AdvancedFiltersSidebar: React.FC = () => {
  //const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const isWide = useMedia({ minWidth: 800 });

  const sidebarStyles = {
    sidebar: { background: 'white' },
    content: { zIndex: '3' }
  };

  const sidebarContent = <b>Sidebar content</b>;
  return (
    <Sidebar sidebar={sidebarContent} open={open} onSetOpen={setOpen} styles={sidebarStyles} docked={isWide && open}>
      <button onClick={() => setOpen(!open)}>Open sidebar</button>
    </Sidebar>
  );
};

export default AdvancedFiltersSidebar;

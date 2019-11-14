import React, { useState } from 'react';
//import { useTranslation } from 'react-i18next';
import Sidebar from 'react-sidebar';

const AdvancedFiltersSidebar: React.FC = () => {
  //const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const sidebarContent = <b>Sidebar content</b>;
  return (
    <Sidebar sidebar={sidebarContent} open={open} onSetOpen={setOpen} styles={{ sidebar: { background: 'white' } }}>
      <button onClick={() => setOpen(true)}>Open sidebar</button>
    </Sidebar>
  );
};

export default AdvancedFiltersSidebar;

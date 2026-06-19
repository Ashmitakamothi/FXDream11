import React, { createContext, useContext, useState } from 'react';
import { Layout, Grid } from 'antd';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import BottomNav from './BottomNav';
import MobileSidebar from './MobileSidebar';

const { Content } = Layout;
const { useBreakpoint } = Grid;

export const SidebarContext = createContext();
export const useSidebar = () => useContext(SidebarContext);

const MobileLayout = ({ children }) => {
  const screens = useBreakpoint();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Hide BottomNav on ContestDetail page (e.g., /user/contests/174)
  const isContestDetail = location.pathname.startsWith('/user/contests/') && location.pathname !== '/user/contests';

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
      <Layout style={{ minHeight: '100vh' }} className='bg-background'>
        <MobileSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        <Content style={{  padding: screens.md ? '20px 50px' : '5px', marginBottom: screens.md || isContestDetail ? 0 : 70 }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {children}
          </div>
        </Content>

        {!screens.md && !isContestDetail && <BottomNav />}
      </Layout>
    </SidebarContext.Provider>
  );
};

export default MobileLayout;
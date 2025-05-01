import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <header className="header">
        <h1>SCL-90 国际化心理测评</h1>
      </header>
      <main className="main">{children}</main>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} SCL-90 Assessment</p>
      </footer>
    </div>
  );
};

export default Layout;
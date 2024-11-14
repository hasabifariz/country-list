import { Handshake, Landmark } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="drawer ">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content Area */}
      <div className="drawer-content">
        {/* Navbar */}
        <div className="navbar bg-slate-50 border-b">
          <div className="navbar-start">
            <label
              htmlFor="my-drawer"
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle drawer-button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
          </div>
        </div>

        {/* Page Content */}
        <main className="p-4">{children}</main>
      </div>

      {/* Sidebar Drawer */}
      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-100 text-base-content min-h-full max-w-sm p-4 pt-10">
          <h1 className='text-2xl font-bold mb-10'>CountriesInfoApp</h1>
          {/* Sidebar content */}
          <li className='text-[14px] border-y font-semibold'><Link to={'/'}><Landmark size={20}/>Countries</Link></li>
          <li className='text-[14px] border-b font-semibold'><Link to={'/cooperated-countries'}><Handshake size={20}/>Cooperated Countries</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default Layout;

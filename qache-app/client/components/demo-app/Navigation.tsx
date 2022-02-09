import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';
import '../../styles/demo-styles/Navigation.scss';
import { useLocation } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import { FaBars, FaSearch } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { IoMdRefresh } from 'react-icons/io';
import { SidebarData } from './SidebarData';
import { IconContext } from 'react-icons';
import SubMenu from './SubMenuData';

const Navigation = ({ props }: { props: any }) => {
  const {
    refresh,
    setRefresh,
    sidebar,
    setSidebar,
    hideSidebar,
  }: {
    refresh: boolean;
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
    sidebar: boolean;
    setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
    hideSidebar: () => void;
  } = props;

  const [productMenu, setProductMenu] = useState(false);
  const [roomMenu, setRoomMenu] = useState(false);

  const showSidebar = () => setSidebar(true);

  const showSubMenu = (title: String) => {
    if (title === 'Products') setProductMenu(true);
    if (title === 'Rooms') setRoomMenu(true);
  };

  let location = useLocation();
	const invalidateCache = () => {
		const body ={query: `
			{
				invalidate
			}
		`}
		const uri = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/graphql': '/graphql'
		axios.post(uri, body).catch((err) => console.log(err))
		console.log('Cache invalidated!')
	}

  return (
    <>
      <IconContext.Provider value={{ color: 'black' }}>
        <nav id='nav-container'>
          <div className='navbar'>
            <Link to='#' className='menu-bars'>
              <FaBars onClick={showSidebar} />
            </Link>
            <Link to='/'>Homepage</Link>
            <a
              onClick={() => {
                showSidebar();
                showSubMenu('Products');
              }}
            >
              Products
            </a>
            <a
              onClick={() => {
                showSidebar();
                showSubMenu('Rooms');
              }}
            >
              Rooms
            </a>
            <Link to='/demo-app/deals'>Deals</Link>
            <Link to='/#team'>Team</Link>
            {/* <div className='search'>
              <input
                id='search'
                name='search'
                type='text'
                placeholder='What are you looking for?'
              />
              <FaSearch className='icon' />
            </div> */}
						<button className={location.pathname !== '/demo-app' ? 'active' : 'not-active'}
						onClick={() => invalidateCache()}
						>
							<b>Clear Cache</b>
						</button>
            <button
              className={location.pathname !== '/demo-app' ? 'active' : 'not-active'}
              onClick={() => setRefresh(!refresh)}
            >
              <IoMdRefresh className='spinner' />
              <span className='tooltip'>Qache more</span>
            </button>
          </div>

          <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items'>
              <li className='navbar-toggle' onClick={hideSidebar}>
                <Link to='#' className='menu-bars'>
                  <AiOutlineClose />
                </Link>
              </li>
              {SidebarData.map((item: any, index: number) => {
                return (
                  <SubMenu
                    item={item}
                    key={'item' + index}
                    sidebar={sidebar}
                    productMenu={productMenu}
                    setProductMenu={setProductMenu}
                    roomMenu={roomMenu}
                    setRoomMenu={setRoomMenu}
                    hideSidebar={hideSidebar}
                  />
                );
              })}
            </ul>
          </nav>
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default Navigation;

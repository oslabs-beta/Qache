import '../styles/SubMenuData.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SubMenu = ({
  item,
  sidebar,
  productMenu,
  setProductMenu,
  roomMenu,
  setRoomMenu,
  hideSidebar,
}) => {
  const [subnav, setSubnav] = useState(false);

  const showSubNav = () => setSubnav(!subnav);

  useEffect(() => {
    setSubnav(false);
    setProductMenu(false);
    setRoomMenu(false);
  }, [sidebar]);

  useEffect(() => {
    if (item.title === 'Products') {
      setSubnav(true);
    }
  }, [productMenu]);

  useEffect(() => {
    if (item.title === 'Rooms') {
      setSubnav(true);
    }
  }, [roomMenu]);

  return (
    <div>
      <Link
        className='sidebarLink'
        to={item.path}
        onClick={item.path === '#' ? item.subNav && showSubNav : hideSidebar}
      >
        <div>
          {item.icon}
          <span>{item.title}</span>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </Link>

      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <Link
              className='dropdownLink'
              to={item.path}
              key={'subItem' + index}
              onClick={hideSidebar}
            >
              <span>{item.title}</span>
            </Link>
          );
        })}
    </div>
  );
};

export default SubMenu;

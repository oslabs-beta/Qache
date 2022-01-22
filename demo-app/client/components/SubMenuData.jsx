import '../styles/SubMenuData.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const SubMenu = ({ item, sidebar }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubNav = () => setSubnav(!subnav);

  return (
    <div>
      <Link
        className='sidebarLink'
        to={item.path}
        onClick={item.subNav && showSubNav}
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
            >
              <span>{item.title}</span>
            </Link>
          );
        })}
    </div>
  );
};

export default SubMenu;

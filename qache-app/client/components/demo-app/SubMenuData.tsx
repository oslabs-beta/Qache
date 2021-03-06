import '../../styles/demo-styles/SubMenuData.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Item } from '../../../interfaces';

const SubMenu = ({
  item,
  sidebar,
  productMenu,
  setProductMenu,
  roomMenu,
  setRoomMenu,
  hideSidebar,
}: {
  item: Item;
  sidebar: boolean;
  productMenu: boolean;
  setProductMenu: React.Dispatch<React.SetStateAction<boolean>>;
  roomMenu: boolean;
  setRoomMenu: React.Dispatch<React.SetStateAction<boolean>>;
  hideSidebar: () => void;
}) => {
  const [subnav, setSubnav] = useState(false);

  const showSubNav = () => setSubnav(!subnav);

  useEffect(() => {
    setSubnav(false);
    setProductMenu(false);
    setRoomMenu(false);
  }, [sidebar]);

  useEffect(() => {
    if (item.title === 'Products') setSubnav(true);
  }, [productMenu]);

  useEffect(() => {
    if (item.title === 'Rooms') setSubnav(true);
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

      {item.subNav
        ? subnav &&
          item.subNav.map((item: Item, index: number) => {
            return (
              <Link
                className='dropdownLink'
                to={item.path}
                key={'subItem' + index}
                onClick={hideSidebar}
              >
                <div className='subIcon'>{item.icon}</div>
                <span>{item.title}</span>
              </Link>
            );
          })
        : null}
    </div>
  );
};

export default SubMenu;

import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as BiIcons from 'react-icons/bi';
import * as GiIcons from 'react-icons/gi';
import * as MdIcons from 'react-icons/md';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text',
  },
  {
    title: 'Products',
    path: '#',
    icon: <FaIcons.FaChair />,
    iconClosed: <RiIcons.RiArrowUpSFill />,
    iconOpened: <RiIcons.RiArrowDownSFill />,
    subNav: [
      {
        title: 'Appliances',
        path: '/products/appliances',
        icon: <GiIcons.GiKnifeFork />,
      },
      {
        title: 'Couches',
        path: '/products/couches',
        icon: <FaIcons.FaToiletPaper />,
      },
      {
        title: 'Furniture',
        path: '/products/furnitures',
        icon: <FaIcons.FaCouch />,
      },
      {
        title: 'Mattresses',
        path: '/products/mattresses',
        icon: <FaIcons.FaBed />,
      },
      {
        title: 'Storage',
        path: '/products/storage',
        icon: <BiIcons.BiCabinet />,
      },
    ],
    cName: 'nav-text',
  },
  {
    title: 'Rooms',
    path: '#',
    icon: <FaIcons.FaBed />,
    iconClosed: <RiIcons.RiArrowUpSFill />,
    iconOpened: <RiIcons.RiArrowDownSFill />,
    subNav: [
      {
        title: 'Bathroom',
        path: '/rooms/bathroom',
        icon: <FaIcons.FaToilet />,
      },
      {
        title: 'Bedroom',
        path: '/rooms/bedroom',
        icon: <FaIcons.FaBed />,
      },
      {
        title: 'Kitchen',
        path: '/rooms/kitchen',
        icon: <MdIcons.MdKitchen />,
      },
      {
        title: 'Living Room',
        path: '/rooms/living-room',
        icon: <GiIcons.GiSofa />,
      },
    ],
    cName: 'nav-text',
  },
  {
    title: 'Deals',
    path: '/deals',
    icon: <IoIcons.IoMdFlash />,
    cName: 'nav-text',
  },
];

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
      {
        title: 'Appliances',
        path: '/products/appliances',
        icon: <GiIcons.GiKnifeFork />,
      },
      {
        title: 'Bathroom',
        path: '/products/bathroom',
        icon: <FaIcons.FaToiletPaper />,
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
        title: 'Bedroom',
        path: '/rooms/bedroom',
        icon: <FaIcons.FaBed />,
      },
      {
        title: 'Living Room',
        path: '/rooms/living-room',
        icon: <GiIcons.GiSofa />,
      },
      {
        title: 'Kitchen',
        path: '/rooms/kitchen',
        icon: <MdIcons.MdKitchen />,
      },
      {
        title: 'Bathroom',
        path: '/rooms/bathroom',
        icon: <FaIcons.FaToilet />,
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

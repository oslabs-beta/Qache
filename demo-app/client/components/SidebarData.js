import { FaChair, FaToilet, FaToiletPaper, FaCouch, FaBed } from 'react-icons/fa';
import { AiFillHome } from 'react-icons/ai';
import { IoMdFlash } from 'react-icons/io';
import { RiArrowUpSFill, RiArrowDownSFill } from 'react-icons/ri';
import { BiCabinet } from 'react-icons/bi';
import { GiKnifeFork, GiSofa } from 'react-icons/gi';
import { MdKitchen } from 'react-icons/md';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiFillHome />,
    cName: 'nav-text',
  },
  {
    title: 'Products',
    path: '#',
    icon: <FaChair />,
    iconClosed: <RiArrowUpSFill />,
    iconOpened: <RiArrowDownSFill />,
    subNav: [
      {
        title: 'Appliances',
        path: '/products/appliances',
        icon: <GiKnifeFork />,
      },
      {
        title: 'Couches',
        path: '/products/couches',
        icon: <FaToiletPaper />,
      },
      {
        title: 'Furniture',
        path: '/products/furnitures',
        icon: <FaCouch />,
      },
      {
        title: 'Mattresses',
        path: '/products/mattresses',
        icon: <FaBed />,
      },
      {
        title: 'Storage',
        path: '/products/storage',
        icon: <BiCabinet />,
      },
    ],
    cName: 'nav-text',
  },
  {
    title: 'Rooms',
    path: '#',
    icon: <FaBed />,
    iconClosed: <RiArrowUpSFill />,
    iconOpened: <RiArrowDownSFill />,
    subNav: [
      {
        title: 'Bathroom',
        path: '/rooms/bathroom',
        icon: <FaToilet />,
      },
      {
        title: 'Bedroom',
        path: '/rooms/bedroom',
        icon: <FaBed />,
      },
      {
        title: 'Kitchen',
        path: '/rooms/kitchen',
        icon: <MdKitchen />,
      },
      {
        title: 'Living Room',
        path: '/rooms/living-room',
        icon: <GiSofa />,
      },
    ],
    cName: 'nav-text',
  },
  {
    title: 'Deals',
    path: '/deals',
    icon: <IoMdFlash />,
    cName: 'nav-text',
  },
];

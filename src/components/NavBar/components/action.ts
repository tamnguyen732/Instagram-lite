import { HiHome } from 'react-icons/hi2';
import { BiSearch } from 'react-icons/bi';
import { BsHeart, BsPlusSquare } from 'react-icons/bs';
import { SlCursor } from 'react-icons/sl';
import { ROUTES } from '~/constants/routes';
import { IconType } from 'react-icons';
import {IoLogOutOutline} from 'react-icons/io5'

interface Navbar {
  title: string;
  icon: IconType;
  hasChild: boolean;
  route: string;
}
export const navBarAction = [
  {
    title: 'Home',
    icon: HiHome,
    hasChild: false,
    route: ROUTES.HOME
  },
  {
    title: 'Search',
    icon: BiSearch,
    hasChild: true
  },
  {
    title: 'Inbox',
    icon: SlCursor,
    hasChild: false,
    route: ROUTES.INBOX
  },

  {
    title: 'Notification',
    icon: BsHeart,
    hasChild: true,
    route: ''
  },
  {
    title: 'Create',
    icon: BsPlusSquare,
    hasChild: false,
    route: ''
  },
  {
    title: 'Log Out',
    icon: IoLogOutOutline,
    hasChild: false,
    route: ''
  }
];

export const findTitle = (navBarAction: Navbar[]) => {
  return navBarAction.find((e) => e.title);
};

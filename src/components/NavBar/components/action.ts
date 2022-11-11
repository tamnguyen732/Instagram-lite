import { HiHome } from 'react-icons/hi2';
import { BiSearch } from 'react-icons/bi';
import { BsHeart, BsPlusSquare } from 'react-icons/bs';
import { SlCursor } from 'react-icons/sl';
import { ROUTES } from '~/constants/routes';
import { IconType } from 'react-icons';

interface Navbar {
  title: string;
  icon: IconType;
  hasChild: boolean;
  route: string;
  active: boolean;
}
export const navBarAction = [
  {
    title: 'Home',
    icon: HiHome,
    hasChild: false,
    route: ROUTES.HOME,
    active: false
  },
  {
    title: 'Search',
    icon: BiSearch,
    hasChild: true,
    active: false
  },
  {
    title: 'Inbox',
    icon: SlCursor,
    hasChild: false,
    route: ROUTES.INBOX,
    active: false
  },

  {
    title: 'Notification',
    icon: BsHeart,
    hasChild: true,
    active: false,
    route: ''
  },
  {
    title: 'Create',
    icon: BsPlusSquare,
    hasChild: false,
    active: false,
    route: ''
  }
];

export const findTitle = (navBarAction: Navbar[]) => {
  return navBarAction.find((e) => e.title);
};

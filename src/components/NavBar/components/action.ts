import IconCreate from '~/components/Icon/IconCreate';
import IconEmoji from '~/components/Icon/IconEmoji';
import IconHome from '~/components/Icon/IconHome';
import IconLocation from '~/components/Icon/IconLocation';
import IconNewMessage from '~/components/Icon/IconNewMessage';
import { ROUTES } from '~/constants/routes';

export const navBarAction = [
  {
    title: 'Home',
    icon: IconHome,
    hasChild: false,
    route: ROUTES.HOME,
    active: false
  },
  {
    title: 'Search',
    icon: IconLocation,
    hasChild: true,
    route: null,
    active: false
  },
  {
    title: 'Inbox',
    icon: IconNewMessage,
    hasChild: false,
    route: ROUTES.INBOX,
    active: false
  },

  {
    title: 'Notification',
    icon: IconEmoji,
    hasChild: true,
    route: null,
    active: false
  },
  {
    title: 'Create',
    icon: IconCreate,
    hasChild: true,
    route: null,
    active: false
  }
];

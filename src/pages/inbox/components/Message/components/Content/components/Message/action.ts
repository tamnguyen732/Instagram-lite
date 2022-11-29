import { generateAction } from '~/helpers/generateAction';

export const messageAction = [
  {
    title: 'Like',
    action: () => {},
    actionId: 'like'
  },
  {
    title: 'Copy',
    action: () => {},
    actionId: 'copy'
  }
];

export const handleMessageAction = generateAction(messageAction);

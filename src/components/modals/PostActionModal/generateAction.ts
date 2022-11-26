export type Action = {
  title: string;
  action: () => void;
  actionId: string;
  hasConfirm: boolean;
};

export const generateAction = (actions: Action[]) => {
  return (actionId: string, actionHandler: () => void) => {
    actions.forEach((action) => {
      if (action.actionId === actionId) action.action = actionHandler;
    });
  };
};

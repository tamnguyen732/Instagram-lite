import React from 'react';
import Inbox from './Inbox';
import UserList from './User';

const Message = () => {
  return (
    <div>
      <UserList />
      <Inbox />
    </div>
  );
};

export default Message;

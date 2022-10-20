import { ClassType } from 'type-graphql';

const logout = (Base: ClassType) => {
  class Logout extends Base {}
  return Logout;
};

export default logout;

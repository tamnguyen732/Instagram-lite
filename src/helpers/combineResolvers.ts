import { ClassType } from 'type-graphql';

const combineResolvers = (...classes: any[]): ClassType => {
  return classes.reduce(
    (accumulatorClass, fnClass) => fnClass(accumulatorClass),
    class Accumulator {},
  );
};

export default combineResolvers;

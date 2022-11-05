import classNames from 'classnames/bind';

interface Classes {
  readonly [key: string]: string;
}

export const bindClass = (classes: Classes) => classNames.bind(classes);

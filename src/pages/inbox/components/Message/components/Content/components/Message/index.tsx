import { bindClass } from '~/lib/classNames';
import styles from './styles.module.scss';
import { RiMoreLine } from 'react-icons/ri';
import { useRef, useState } from 'react';
import useClickOutside from '~/hooks/useClickOutside';
import { handleMessageAction } from './action';
import { messageAction } from './action';
const cx = bindClass(styles);

interface Props {
  ownMessage?: boolean;
}
const Message = ({ ownMessage }: Props) => {
  const [showAction, setShowAction] = useState<boolean>(false);
  const iconRef = useRef<any | null>(null);
  handleMessageAction('like', () => console.log('like'));
  handleMessageAction('copy', () => console.log('copy'));
  useClickOutside(iconRef, () => setShowAction(false));
  return (
    <>
      <div className={cx('wrapper', ownMessage ? 'owner' : '')}>
        <span>🤣🤣🤣🤣 Oi I have no i on about bro 🤣🤣</span>
        <div className={cx('icon-wrapper', showAction ? 'active' : '')} ref={iconRef}>
          <RiMoreLine
            onClick={() => setShowAction(true)}
            className={cx('icon', ownMessage ? 'owner' : '')}
          />
        </div>
        {showAction && (
          <div
            ref={iconRef}
            onClick={() => setShowAction(false)}
            className={cx('action', ownMessage ? 'owner' : '')}
          >
            {messageAction.map(({ title, action }) => {
              return (
                <span onClick={action} key={title} className={cx('item')}>
                  {title}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Message;

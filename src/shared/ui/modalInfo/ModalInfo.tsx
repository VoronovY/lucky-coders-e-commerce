import { Dispatch, KeyboardEventHandler, SetStateAction } from 'react';

import cn from 'classnames';

import styles from './ModalInfo.module.scss';

import Portal from '../../../widgets/portal/Portal';

import { CheckedGreenIcon } from '../../../app/layouts/images';

export interface ModalProps {
  message: string;
  isOpen: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  handleClick?: () => void;
  withIcon?: boolean;
}

export function ModalInfo({ message, setIsOpen, handleClick, isOpen, withIcon = true }: ModalProps): JSX.Element {
  const handleOkBtn = (): void => {
    if (setIsOpen) setIsOpen(false);
    if (handleClick) handleClick();
  };

  const handleModalClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    const target = event.target as HTMLDivElement;
    if (target.classList.contains(styles.modal)) {
      if (setIsOpen) setIsOpen(false);
      if (handleClick) handleClick();
    }
  };

  const handleKeyPress: KeyboardEventHandler<HTMLDivElement> = (event): void => {
    if (event.key === 'Escape') {
      if (setIsOpen) setIsOpen(false);
      if (handleClick) handleClick();
    }
  };

  const modalStyle = cn(styles.modal, {
    [styles.hidden]: !isOpen,
  });

  const contentStyle = cn(styles.content, {
    [styles.hidden]: !isOpen,
  });

  return (
    <Portal target="modal">
      <div className={modalStyle} onClick={handleModalClick} onKeyUp={handleKeyPress} tabIndex={0} role="button">
        <div className={contentStyle}>
          <div className={styles.icon}>{withIcon && <CheckedGreenIcon width="30" height="30" />}</div>
          <div className={styles.message}>{message}</div>
          <div>
            <button onClick={handleOkBtn} type="button">
              Ok
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
}

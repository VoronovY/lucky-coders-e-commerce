import cn from 'classnames';

import styles from './Button.module.scss';

import { CartButtonIcon } from '../../../app/layouts/images';

interface ButtonProps {
  children: string | JSX.Element;
  type?: 'button' | 'submit' | 'reset';
  width?: string;
  height?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  hasCartIcon?: boolean;
}
function Button({
  children,
  width = '100%',
  height = '35px',
  hasCartIcon = false,
  className = '',
  ...attributes
}: ButtonProps): JSX.Element {
  const style = cn(styles.button, {
    [className]: className,
  });
  return (
    <button className={style} type="button" style={{ width, height }} {...attributes}>
      {children}
      {hasCartIcon && <CartButtonIcon className={styles.cartIcon} />}
    </button>
  );
}

export default Button;

import cn from 'classnames';

import styles from './Button.module.scss';

interface ButtonProps {
  children: string | JSX.Element;
  type?: 'button' | 'submit' | 'reset';
  width?: string;
  height?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}
function Button({
  children,
  width = '100%',
  height = '35px',
  className = '',
  ...attributes
}: ButtonProps): JSX.Element {
  const style = cn(styles.button, {
    [className]: className,
  });
  return (
    <button className={style} type="button" style={{ width, height }} {...attributes}>
      {children}
    </button>
  );
}

export default Button;

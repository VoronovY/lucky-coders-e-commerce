import styles from './Button.module.scss';

interface ButtonProps {
  children: string;
  type?: 'button' | 'submit' | 'reset';
  width?: string;
  height?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}
function Button({ children, width = '100%', height = '35px', ...attributes }: ButtonProps): JSX.Element {
  return (
    <button className={styles.button} type="button" style={{ width, height }} {...attributes}>
      {children}
    </button>
  );
}

export default Button;

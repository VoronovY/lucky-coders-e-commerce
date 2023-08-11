import styles from './Button.module.scss';

interface ButtonProps {
  children: string;
  type?: 'button' | 'submit' | 'reset';
  width?: string;
  height?: string;
}
function Button({ children, width = '135px', height = '35px', ...attributes }: ButtonProps): JSX.Element {
  return (
    <button className={styles.button} type="button" style={{ width, height }} {...attributes}>
      {children}
    </button>
  );
}

export default Button;

import { Link } from 'react-router-dom';

import styles from './FormText.module.scss';

export interface FormTextProps {
  link: string;
  linkText: string;
  text: string;
}
function FormText({ link, linkText, text }: FormTextProps): JSX.Element {
  return (
    <p className={styles.signUpText}>
      {text}&nbsp;
      <Link to={link}>{linkText}</Link>
    </p>
  );
}

export { FormText };

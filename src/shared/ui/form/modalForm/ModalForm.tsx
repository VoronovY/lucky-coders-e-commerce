import styles from './ModalForm.module.scss';

import Button from '../../button/Button';

export interface FormWrapperProps {
  title: string;
  children: React.ReactNode;
  onCloseModal: () => void;
}

function ModalForm({ title, children, onCloseModal }: FormWrapperProps): JSX.Element {
  return (
    <>
      <div className={styles.modalBackdrop} />
      <div className={styles.modalForm}>
        <h3 className={styles.title}>{title}</h3>

        {children}

        <Button type="submit" width="100%" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button type="submit" width="100%">
          Save
        </Button>
      </div>
    </>
  );
}

export default ModalForm;

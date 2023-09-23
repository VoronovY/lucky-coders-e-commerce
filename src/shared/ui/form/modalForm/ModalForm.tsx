import styles from './ModalForm.module.scss';

export interface FormWrapperProps {
  title: string;
  children: React.ReactNode;
}

function ModalForm({ title, children }: FormWrapperProps): JSX.Element {
  return (
    <>
      <div className={styles.modalBackdrop} />
      <div className={styles.modalForm}>
        <h3 className={styles.title}>{title}</h3>

        {children}
      </div>
    </>
  );
}

export default ModalForm;

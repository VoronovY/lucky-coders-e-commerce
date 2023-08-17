import { useEffect, useState } from 'react';

import styles from './navCatalog.module.scss';
import Categories from './categories';

function HeaderNavProfile(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  return (
    <div className={styles.navCatalog}>
      <button type="button" onClick={onClick} className={styles.buttonOpen}>
        <div className={styles.burgerMenu}>
          <div />
          <div />
          <div />
        </div>
        <p>Catalog</p>
      </button>
      {isOpen ? <Categories setIsOpen={setIsOpen} /> : null}
    </div>
  );
}

export default HeaderNavProfile;

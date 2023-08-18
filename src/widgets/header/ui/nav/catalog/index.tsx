import { useEffect, useState } from 'react';

import styles from './navCatalog.module.scss';
import Categories from './categories';

import { BurgerMenuIcon } from '../../../../../app/layouts/images';

function Catalog(): JSX.Element {
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
        <BurgerMenuIcon className={styles.burgerMenu} />
        <p>Catalog</p>
      </button>
      {isOpen ? <Categories setIsOpen={setIsOpen} /> : null}
    </div>
  );
}

export default Catalog;

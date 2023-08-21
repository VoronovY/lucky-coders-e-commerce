import styles from './SearchInput.module.scss';

import { SearchIcon } from '../../../app/layouts/images';

function Search(): JSX.Element {
  return (
    <div className={styles.search}>
      <input placeholder="Search" type="text" className={styles.searchInput} />
      <button className={styles.iconWrapper} type="button">
        <SearchIcon className={styles.searchIcon} />
      </button>
    </div>
  );
}

export default Search;

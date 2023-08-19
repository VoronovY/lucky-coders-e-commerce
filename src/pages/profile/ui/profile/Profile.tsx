import styles from './Profile.module.scss';

import { EditIcon } from '../../../../app/layouts/images';

const infArr = [
  { id: 1, tittle: 'Ivan Ivanov', inf: '' },
  { id: 2, tittle: 'Birth Date: ', inf: '5 june, 1992' },
  { id: 3, tittle: 'E-mail: ', inf: 'ivanov@gmail.com' },
];

function ProfilePage(): JSX.Element {
  return (
    <div className={styles.profile}>
      <h2>Your Account</h2>
      <ul className={styles.profileList}>
        {infArr.map((item) => {
          return (
            <li key={item.id} className={styles.inf}>
              <button type="button" className={styles.infButton}>
                <EditIcon />
              </button>
              <p className={styles.profileText}>
                <span className={styles.infTittle}>{item.tittle}</span>
                {item.inf}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ProfilePage;

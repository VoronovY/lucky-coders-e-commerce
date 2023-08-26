import { Link, useNavigate } from 'react-router-dom';

import { useState } from 'react';

import styles from './ProfileMenu.module.scss';

import RoutesName from '../../../../shared/routing';
import { useAppDispatch } from '../../../../app/appStore/hooks';
import { updateAccessToken, updateUserId } from '../../../../shared/model/appSlice';
import myTokenCache from '../../../../shared/api/auth/tokenCache';

const profileLinks = [
  { id: '1', path: RoutesName.profile, text: 'Profile' },
  { id: '2', path: `${RoutesName.profile}/addresses`, text: 'Address Book' },
];
function ProfileMenu(): JSX.Element {
  const navigate = useNavigate();
  const disaptch = useAppDispatch();
  const [activeLink, setActiveLink] = useState('1');

  const handleSignOut = (): void => {
    localStorage.removeItem('accessToken');
    myTokenCache.clear();
    disaptch(updateUserId(''));
    disaptch(updateAccessToken(''));
    navigate(RoutesName.main);
  };

  const handleLinkClick = (id: string): void => {
    setActiveLink(id);
  };

  return (
    <div className={styles.profileMenu}>
      <div className={styles.profileList}>
        {profileLinks.map((link) => (
          <button
            type="button"
            key={link.id}
            className={activeLink === link.id ? styles.linkActive : ''}
            onClick={(): void => handleLinkClick(link.id)}
          >
            <Link to={link.path}>{link.text}</Link>
          </button>
        ))}
        <button className={styles.signOutButton} key="temporaryKey3" type="button" onClick={handleSignOut}>
          <p className={styles.text}>Sign Out</p>
        </button>
      </div>
    </div>
  );
}

export default ProfileMenu;

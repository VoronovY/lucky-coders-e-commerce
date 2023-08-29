import { ReactNode, useState } from 'react';

import cn from 'classnames';

import styles from './Collapse.module.scss';

export interface CollapsePros {
  title?: string;
  onClick?: () => void;
  children?: ReactNode;
  initialCollapsed?: boolean;
}

function Collapse({ title = '', children = null, onClick, initialCollapsed = true }: CollapsePros): JSX.Element {
  const [collapsed, setCollapsed] = useState(initialCollapsed);

  const buttonStyle = cn(styles.collapseButton, {
    [styles.collapsed]: collapsed,
    [styles.opened]: !collapsed,
  });

  const toggleCollapse = (): void => {
    if (!collapsed && onClick) {
      onClick();
    }
    setCollapsed(!collapsed);
  };

  return (
    <div className={styles.collapseWrapper}>
      <button className={buttonStyle} onClick={toggleCollapse} type="button">
        {title}
      </button>
      {collapsed ? null : children}
    </div>
  );
}

export { Collapse };

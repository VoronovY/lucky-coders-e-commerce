import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface IProps {
  children: ReactNode;
  target: string;
}

export default function Portal({ children, target }: IProps): JSX.Element {
  const container = document.getElementById(target) as HTMLElement;
  return createPortal(children, container);
}

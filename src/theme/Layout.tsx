import type {ReactNode} from 'react';
import OriginalLayout from '@theme-original/Layout';

export default function Layout(props: {children: ReactNode}) {
  return (
    <OriginalLayout>
      {props.children}
    </OriginalLayout>
  );
}

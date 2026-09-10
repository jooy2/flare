import { Helmet } from 'react-helmet-async';
import { MPContainer } from 'material-plus-ui';
import { ReactNode } from 'react';
import Header from '@/renderer/components/layouts/Header';

type LayoutProps = {
  title?: string;
  titleTail?: string | null;
  withTail?: boolean;
  withPadding?: boolean;
  header?: boolean;
  container?: boolean;
  center?: boolean;
  withBackButton?: boolean;
  children: ReactNode;
};

export default function Layout({
  title = 'Flare Player',
  titleTail = ' - Flare Flash Player',
  withTail = true,
  header = true,
  container = true,
  center = false,
  withPadding = true,
  withBackButton = false,
  children,
}: LayoutProps) {
  const bodyClassName = [
    'app-body',
    withPadding ? '' : 'app-body--flush',
    center ? 'app-body--center' : '',
  ]
    .filter(Boolean)
    .join(' ');
  const contentClassName = ['app-content', header ? 'app-content--below-header' : '']
    .filter(Boolean)
    .join(' ');

  return (
    <div className="app-shell">
      <Helmet>
        <title>
          {title}
          {withTail ? titleTail : ''}
        </title>
        <script src="js/ruffle/ruffle.js" />
      </Helmet>
      {header ? <Header title={title} withBackButton={withBackButton} /> : ''}
      <div className={bodyClassName}>
        {container ? (
          <MPContainer>
            <div className={contentClassName}>{children}</div>
          </MPContainer>
        ) : (
          <div className={contentClassName}>{children}</div>
        )}
      </div>
    </div>
  );
}

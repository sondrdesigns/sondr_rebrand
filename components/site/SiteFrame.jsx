'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV } from '@/lib/siteData';
import { SondrIcon } from '@/components/navigation/SondrIcon';

function HomeIcon() {
  return (
    <span className="home-dot">
      <svg className="house-svg" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="11" width="16" height="10" fill="currentColor" rx="0.5" />
        <rect x="8" y="15" width="4" height="6" fill="var(--paper)" />
        <polygon className="house-roof" points="1,12 11,2 21,12" fill="currentColor" />
      </svg>
    </span>
  );
}

function Sidebar({ pathname }) {
  return (
    <div className="sidebar">
      <div className="side-label">page navigation</div>
      <nav className="side-nav">
        <Link href="/" className={'sondr-icon' + (pathname === '/' ? ' current' : '')}>
          <HomeIcon />
          <span className="lbl">home</span>
        </Link>
        {NAV.map((item) => (
          <Link key={item.id} href={item.href} className={'sondr-icon' + (pathname === item.href ? ' current' : '')}>
            <SondrIcon name={item.icon} size={22} />
            <span className="lbl">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

export function SiteFrame({ children }) {
  const pathname = usePathname();

  return (
    <div>
      <Sidebar pathname={pathname} />
      <div className="content">
        <header className="content-logo">
          <Link className="logo-strip" href="/" title="logo goes here">
            <img src="/assets/tape-cream.png" alt="" />
            <span className="logo-text">sondr designs<small>logo goes here</small></span>
          </Link>
        </header>
        <div className="page-enter" key={pathname}>
          {children}
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV } from '@/lib/siteData';
import { SondrIcon } from '@/components/navigation/SondrIcon';

function HomeIcon() {
  return (
    <span className="home-dot">
      <svg className="house-svg" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g className="flame-group">
          <path className="flame f-left"    d="M4.5,11 C3.5,9 3,6.5 4.5,4 C5,2.5 6,1 6,1 C6,1 7,2.5 7.5,5 C8,7.5 7.5,9.5 7,11Z" fill="#FF4500"/>
          <path className="flame f-center"  d="M8.5,11 C7.5,8 7,5 9,2 C9.5,0.5 10.5,-1.5 11,-2 C11.5,-1.5 12.5,0.5 13,2 C15,5 14.5,8 13.5,11Z" fill="#FF4500"/>
          <path className="flame f-right"   d="M15,11 C14.5,9.5 14,7 15,4.5 C15.5,3 16.5,1.5 16.5,1.5 C16.5,1.5 17.5,3 18,5 C18.5,7.5 17.5,9.5 17,11Z" fill="#FF4500"/>
          <path className="flame fi-left"   d="M5.5,11 C5,9.5 5,7.5 5.5,5.5 C6,4 6.5,3 6.5,3 C6.5,3 7,4.5 7,6.5 C7,8.5 6.5,10 6,11Z" fill="#FFD700"/>
          <path className="flame fi-center" d="M10,11 C9.5,8 9,5 10.5,2.5 C11,1 11,0 11,0 C11,0 11.5,1 12,3 C13,5.5 12.5,8.5 12,11Z" fill="#FFD700"/>
          <path className="flame fi-right"  d="M15.5,11 C15,9 15,7.5 16,6 C16.5,4.5 16.5,3 16.5,3 C16.5,3 17.5,4.5 17.5,6.5 C17.5,8.5 16.5,10 16,11Z" fill="#FFD700"/>
        </g>
        <rect x="3" y="11" width="16" height="10" fill="currentColor" rx="0.5" />
        <rect className="house-window" x="4"  y="13" width="3"  height="2.5" rx="0.2" fill="var(--paper)" />
        <rect className="house-window" x="15" y="13" width="3"  height="2.5" rx="0.2" fill="var(--paper)" />
        <rect className="house-door"   x="8"  y="15" width="4"  height="6"   fill="var(--paper)" />
        <polygon className="house-roof" points="1,12 11,2 21,12" fill="currentColor" />
        <g className="smoke-group">
          <circle className="smoke smoke-l" cx="7"  cy="7" r="1.8" fill="rgba(90,90,90,0.75)"/>
          <circle className="smoke smoke-c" cx="11" cy="5" r="2.2" fill="rgba(70,70,70,0.75)"/>
          <circle className="smoke smoke-r" cx="15" cy="7" r="1.7" fill="rgba(90,90,90,0.75)"/>
        </g>
      </svg>
    </span>
  );
}

function Sidebar({ pathname, open, onClose }) {
  return (
    <>
      {open && <div className="nav-backdrop" onClick={onClose} />}
      <div className={`sidebar${open ? ' sidebar-open' : ''}`}>
        <div className="side-label">page navigation</div>
        <nav className="side-nav">
          <Link href="/" className={'sondr-icon' + (pathname === '/' ? ' current' : '')} onClick={onClose}>
            <HomeIcon />
            <span className="lbl">home</span>
          </Link>
          {NAV.map((item) => (
            <Link key={item.id} href={item.href} className={'sondr-icon' + (pathname === item.href ? ' current' : '')} onClick={onClose}>
              <SondrIcon name={item.icon} size={22} />
              <span className="lbl">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}

export function SiteFrame({ children }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <Sidebar pathname={pathname} open={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className="content">
        <header className="content-logo">
          <button
            type="button"
            className={`hamburger${menuOpen ? ' is-open' : ''}`}
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
          <Link className="logo-strip" href="/" aria-label="Sondr Designs home">
            <img className="logo-tape" src="/assets/tape-cream.png" alt="" />
            <img className="logo-mark" src="/assets/sondr-icon-logo.png" alt="Sondr Designs" />
          </Link>
        </header>
        <div className="page-enter" key={pathname}>
          {children}
        </div>
      </div>
    </div>
  );
}

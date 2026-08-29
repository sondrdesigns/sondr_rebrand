import { AdminSidebar } from './AdminSidebar';

export function AdminShell({ children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <AdminSidebar />
      <main style={{
        flex: 1,
        marginLeft: 220,
        background: 'var(--paper)',
        minHeight: '100vh',
        overflow: 'visible',
      }}>
        {children}
      </main>
    </div>
  );
}

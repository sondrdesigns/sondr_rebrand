import { AdminSidebar } from './AdminSidebar';
import { checkStoreConnection } from '@/lib/store';

export async function AdminShell({ children }) {
  const storage = await checkStoreConnection();
  const storageProblem = !storage.writable || storage.connected === false;

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
        {storageProblem && (
          <div style={{
            padding: '12px 24px',
            background: 'rgb(255,236,205)',
            borderBottom: '1px solid rgb(166,92,0)',
            color: 'rgb(104,55,0)',
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            lineHeight: 1.5,
          }}>
            Database disconnected. Admin content is read-only until Upstash Redis is connected and the deployment is restarted.
          </div>
        )}
        {children}
      </main>
    </div>
  );
}

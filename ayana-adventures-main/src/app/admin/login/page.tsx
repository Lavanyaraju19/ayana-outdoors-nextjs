import type { Metadata } from 'next';
import LoginForm from './LoginForm';

export const metadata: Metadata = {
  title: 'Admin Login',
  robots: { index: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 pt-16">
      <div className="w-full max-w-sm rounded-2xl border border-white/15 bg-white/10 p-8 backdrop-blur-xl shadow-2xl">
        <p className="font-body text-xs uppercase tracking-[0.3em] text-primary mb-2">Ayana Outdoors</p>
        <h1 className="font-display text-2xl text-white mb-6">Admin Login</h1>
        {params.error === 'not_authorized' && (
          <p className="mb-4 rounded-lg border border-red-400/40 bg-red-400/10 px-3 py-2 text-sm text-red-200">
            That account isn't authorized for admin access.
          </p>
        )}
        <LoginForm next={params.next} />
      </div>
    </main>
  );
}

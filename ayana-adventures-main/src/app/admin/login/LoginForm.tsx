"use client";

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login } from '../actions/auth';

const LoginForm = ({ next }: { next?: string }) => {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setPending(true);
    const form = new FormData(event.currentTarget);

    try {
      const result = await login({
        email: String(form.get('email') ?? ''),
        password: String(form.get('password') ?? ''),
        next,
      });
      if (result.status === 'error') {
        setError(result.message ?? 'Login failed.');
      }
    } finally {
      setPending(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="email" className="text-white/80">Email</Label>
        <Input id="email" name="email" type="email" required autoComplete="username" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="password" className="text-white/80">Password</Label>
        <Input id="password" name="password" type="password" required autoComplete="current-password" />
      </div>
      {error && <p className="text-sm text-red-300" role="alert">{error}</p>}
      <Button type="submit" className="w-full gap-2" disabled={pending}>
        {pending && <Loader2 className="h-4 w-4 animate-spin" />}
        {pending ? 'Signing in…' : 'Sign in'}
      </Button>
    </form>
  );
};

export default LoginForm;

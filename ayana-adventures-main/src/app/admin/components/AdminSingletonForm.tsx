"use client";

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { updateSingleton, type SingletonTable } from '../actions/content';
import type { FieldDef } from './AdminListEditor';

interface AdminSingletonFormProps {
  table: SingletonTable;
  fields: (FieldDef & { arrayOf?: boolean })[];
  data: Record<string, unknown>;
}

function toFormValue(field: AdminSingletonFormProps['fields'][number], raw: unknown) {
  if (field.arrayOf) return Array.isArray(raw) ? raw.join('\n') : '';
  if (field.type === 'boolean') return Boolean(raw);
  return raw != null ? String(raw) : '';
}

export default function AdminSingletonForm({ table, fields, data }: AdminSingletonFormProps) {
  const [values, setValues] = useState<Record<string, string | boolean>>(() => {
    const initial: Record<string, string | boolean> = {};
    for (const field of fields) initial[field.name] = toFormValue(field, data[field.name]);
    return initial;
  });
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSaved(false);

    const payload: Record<string, unknown> = {};
    for (const field of fields) {
      const raw = values[field.name];
      if (field.arrayOf) {
        payload[field.name] = String(raw)
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean);
      } else if (field.type === 'boolean') {
        payload[field.name] = Boolean(raw);
      } else {
        payload[field.name] = raw === '' ? null : raw;
      }
    }

    startTransition(async () => {
      try {
        await updateSingleton(table, payload);
        setSaved(true);
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong saving this.');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
      {fields.map((field) => (
        <div key={field.name} className="space-y-1.5">
          <Label htmlFor={field.name}>
            {field.label}
            {field.required && ' *'}
          </Label>
          {field.type === 'textarea' || field.arrayOf ? (
            <Textarea
              id={field.name}
              value={String(values[field.name] ?? '')}
              required={field.required}
              rows={field.arrayOf ? 4 : 3}
              placeholder={field.arrayOf ? 'One per line' : undefined}
              onChange={(e) => setValues((prev) => ({ ...prev, [field.name]: e.target.value }))}
            />
          ) : (
            <Input
              id={field.name}
              value={String(values[field.name] ?? '')}
              required={field.required}
              onChange={(e) => setValues((prev) => ({ ...prev, [field.name]: e.target.value }))}
            />
          )}
        </div>
      ))}

      {error && <p className="text-sm text-destructive" role="alert">{error}</p>}

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={isPending} className="gap-2">
          {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          Save changes
        </Button>
        {saved && !isPending && (
          <span className="inline-flex items-center gap-1 text-sm text-emerald-600">
            <CheckCircle2 className="h-4 w-4" /> Saved
          </span>
        )}
      </div>
    </form>
  );
}

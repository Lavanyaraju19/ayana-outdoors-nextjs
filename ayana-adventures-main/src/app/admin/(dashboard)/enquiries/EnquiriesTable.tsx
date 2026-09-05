"use client";

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { updateEnquiryStatus } from '@/app/admin/actions/content';

interface Enquiry {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  child_name: string | null;
  child_age: string | null;
  message: string | null;
  status: string;
  source_page: string;
  created_at: string;
  adventures?: { title: string } | null;
}

const STATUSES = ['new', 'contacted', 'processing', 'closed'];

const statusVariant: Record<string, 'default' | 'secondary' | 'outline'> = {
  new: 'default',
  contacted: 'secondary',
  processing: 'secondary',
  closed: 'outline',
};

function StatusSelect({ id, status }: { id: string; status: string }) {
  const [current, setCurrent] = useState(status);
  const [isPending, startTransition] = useTransition();

  return (
    <Select
      value={current}
      onValueChange={(value) => {
        setCurrent(value);
        startTransition(() => updateEnquiryStatus(id, value));
      }}
      disabled={isPending}
    >
      <SelectTrigger className="w-36">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {STATUSES.map((s) => (
          <SelectItem key={s} value={s}>{s}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default function EnquiriesTable({ enquiries, activeStatus }: { enquiries: Enquiry[]; activeStatus: string }) {
  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {['all', ...STATUSES].map((s) => (
          <Link
            key={s}
            href={s === 'all' ? '/admin/enquiries' : `/admin/enquiries?status=${s}`}
            className={`rounded-full border px-3 py-1 text-xs capitalize ${
              activeStatus === s ? 'border-primary bg-primary text-primary-foreground' : 'text-muted-foreground'
            }`}
          >
            {s}
          </Link>
        ))}
      </div>

      {enquiries.length === 0 ? (
        <p className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
          No enquiries {activeStatus !== 'all' ? `with status "${activeStatus}"` : 'yet'}.
        </p>
      ) : (
        <div className="space-y-3">
          {enquiries.map((enquiry) => (
            <div key={enquiry.id} className="rounded-lg border bg-card p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="font-semibold">
                    {enquiry.name}{' '}
                    <Badge variant={statusVariant[enquiry.status] ?? 'outline'} className="ml-2 capitalize">
                      {enquiry.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {enquiry.email && <>{enquiry.email} · </>}
                    {enquiry.phone}
                    {enquiry.adventures?.title && <> · Interested in: {enquiry.adventures.title}</>}
                  </p>
                  {(enquiry.child_name || enquiry.child_age) && (
                    <p className="text-sm text-muted-foreground">
                      Child: {enquiry.child_name || '—'} {enquiry.child_age && `(age ${enquiry.child_age})`}
                    </p>
                  )}
                  {enquiry.message && <p className="mt-2 text-sm">{enquiry.message}</p>}
                  <p className="mt-2 text-xs text-muted-foreground">
                    From {enquiry.source_page} · {new Date(enquiry.created_at).toLocaleString('en-IN')}
                  </p>
                </div>
                <StatusSelect id={enquiry.id} status={enquiry.status} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

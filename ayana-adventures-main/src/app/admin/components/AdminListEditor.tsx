"use client";

import { useState, useTransition } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Loader2, Pencil, Plus, Trash2, ArrowUp, ArrowDown, ImagePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { createRow, deleteRow, moveRow, updateRow, type SortableTable } from '../actions/content';
import { uploadMedia } from '../actions/media';

export interface FieldDef {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'boolean' | 'image';
  required?: boolean;
}

interface AdminListEditorProps {
  table: SortableTable;
  fields: FieldDef[];
  rows: Record<string, unknown>[];
  titleField: string;
  subtitleField?: string;
}

type FormValues = Record<string, string | boolean>;

function toFormValues(fields: FieldDef[], row?: Record<string, unknown>): FormValues {
  const values: FormValues = {};
  for (const field of fields) {
    const raw = row?.[field.name];
    values[field.name] = field.type === 'boolean' ? Boolean(raw) : raw != null ? String(raw) : '';
  }
  return values;
}

function RecordForm({
  table,
  fields,
  row,
  onDone,
}: {
  table: SortableTable;
  fields: FieldDef[];
  row?: Record<string, unknown>;
  onDone: () => void;
}) {
  const [values, setValues] = useState<FormValues>(() => toFormValues(fields, row));
  const [uploading, setUploading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleImageUpload = async (fieldName: string, file: File) => {
    setUploading(fieldName);
    setError(null);
    const formData = new FormData();
    formData.append('file', file);
    const result = await uploadMedia(formData);
    setUploading(null);
    if ('error' in result) {
      setError(result.error);
      return;
    }
    setValues((prev) => ({ ...prev, [fieldName]: result.path }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    const payload: Record<string, unknown> = {};
    for (const field of fields) {
      const value = values[field.name];
      if (field.type === 'number') payload[field.name] = value === '' ? null : Number(value);
      else if (field.type === 'boolean') payload[field.name] = Boolean(value);
      else payload[field.name] = value === '' ? null : value;
    }

    startTransition(async () => {
      try {
        if (row?.id) {
          await updateRow(table, String(row.id), payload);
        } else {
          await createRow(table, payload);
        }
        router.refresh();
        onDone();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong saving this.');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) => (
        <div key={field.name} className="space-y-1.5">
          <Label htmlFor={field.name}>
            {field.label}
            {field.required && ' *'}
          </Label>

          {field.type === 'textarea' ? (
            <Textarea
              id={field.name}
              value={String(values[field.name] ?? '')}
              required={field.required}
              onChange={(e) => setValues((prev) => ({ ...prev, [field.name]: e.target.value }))}
              rows={4}
            />
          ) : field.type === 'boolean' ? (
            <Switch
              id={field.name}
              checked={Boolean(values[field.name])}
              onCheckedChange={(checked) => setValues((prev) => ({ ...prev, [field.name]: checked }))}
            />
          ) : field.type === 'image' ? (
            <div className="space-y-2">
              {values[field.name] ? (
                <div className="relative h-32 w-full overflow-hidden rounded-lg border">
                  <Image src={String(values[field.name])} alt="" fill className="object-cover" />
                </div>
              ) : null}
              <div className="flex items-center gap-2">
                <Input
                  id={field.name}
                  value={String(values[field.name] ?? '')}
                  placeholder="/images/example.jpg or paste a URL"
                  onChange={(e) => setValues((prev) => ({ ...prev, [field.name]: e.target.value }))}
                />
                <label className="inline-flex cursor-pointer items-center gap-1 rounded-md border px-3 py-2 text-sm shrink-0">
                  {uploading === field.name ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
                  Upload
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(field.name, file);
                    }}
                  />
                </label>
              </div>
            </div>
          ) : (
            <Input
              id={field.name}
              type={field.type === 'number' ? 'number' : 'text'}
              value={String(values[field.name] ?? '')}
              required={field.required}
              onChange={(e) => setValues((prev) => ({ ...prev, [field.name]: e.target.value }))}
            />
          )}
        </div>
      ))}

      {error && <p className="text-sm text-destructive" role="alert">{error}</p>}

      <DialogFooter>
        <Button type="submit" disabled={isPending} className="gap-2">
          {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          Save
        </Button>
      </DialogFooter>
    </form>
  );
}

export default function AdminListEditor({ table, fields, rows, titleField, subtitleField }: AdminListEditorProps) {
  const [editingRow, setEditingRow] = useState<Record<string, unknown> | undefined>(undefined);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    setBusyId(id);
    try {
      await deleteRow(table, id);
      router.refresh();
    } finally {
      setBusyId(null);
    }
  };

  const handleMove = async (id: string, direction: 'up' | 'down') => {
    setBusyId(id);
    try {
      await moveRow(table, id, direction);
      router.refresh();
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="h-4 w-4" /> Add new</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add new</DialogTitle>
            </DialogHeader>
            <RecordForm table={table} fields={fields} onDone={() => setAddOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-2">
        {rows.length === 0 && (
          <p className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
            Nothing here yet. Click "Add new" to create the first one.
          </p>
        )}

        {rows.map((row, index) => (
          <div key={String(row.id)} className="flex items-center gap-3 rounded-lg border bg-card p-3">
            <div className="flex flex-col">
              <button
                type="button"
                disabled={index === 0 || busyId === row.id}
                onClick={() => handleMove(String(row.id), 'up')}
                className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                aria-label="Move up"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
              <button
                type="button"
                disabled={index === rows.length - 1 || busyId === row.id}
                onClick={() => handleMove(String(row.id), 'down')}
                className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                aria-label="Move down"
              >
                <ArrowDown className="h-4 w-4" />
              </button>
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold">{String(row[titleField] ?? '(untitled)')}</p>
              {subtitleField && row[subtitleField] ? (
                <p className="truncate text-sm text-muted-foreground">{String(row[subtitleField])}</p>
              ) : null}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                setEditingRow(row);
                setEditOpen(true);
              }}
              aria-label={`Edit ${String(row[titleField] ?? 'item')}`}
            >
              <Pencil className="h-4 w-4" />
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="icon" aria-label={`Delete ${String(row[titleField] ?? 'item')}`}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete this entry?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This removes "{String(row[titleField] ?? 'this item')}" from the live site immediately. This can't be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDelete(String(row.id))}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ))}
      </div>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit</DialogTitle>
          </DialogHeader>
          {editingRow && (
            <RecordForm table={table} fields={fields} row={editingRow} onDone={() => setEditOpen(false)} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

import AdminListEditor from '@/app/admin/components/AdminListEditor';
import { listRows } from '@/app/admin/actions/content';

export default async function AdminWhyAyana() {
  const rows = await listRows('why_ayana_items');

  return (
    <div>
      <h1 className="mb-2 text-2xl font-display font-bold">Why Ayana Outdoors</h1>
      <p className="mb-6 text-muted-foreground">The value-proposition cards on the homepage.</p>
      <AdminListEditor
        table="why_ayana_items"
        titleField="title"
        rows={rows}
        fields={[
          { name: 'title', label: 'Title', type: 'text', required: true },
          { name: 'description', label: 'Description', type: 'textarea', required: true },
          { name: 'link', label: 'Link', type: 'text', required: true },
        ]}
      />
    </div>
  );
}

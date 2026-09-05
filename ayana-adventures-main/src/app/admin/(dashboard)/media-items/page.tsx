import AdminListEditor from '@/app/admin/components/AdminListEditor';
import { listRows } from '@/app/admin/actions/content';

export default async function AdminMediaItems() {
  const rows = await listRows('media_items');

  return (
    <div>
      <h1 className="mb-2 text-2xl font-display font-bold">Media &amp; Press</h1>
      <p className="mb-6 text-muted-foreground">Instagram, YouTube and press links shown on the homepage.</p>
      <AdminListEditor
        table="media_items"
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

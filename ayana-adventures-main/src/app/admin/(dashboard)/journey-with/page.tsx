import AdminListEditor from '@/app/admin/components/AdminListEditor';
import { listRows } from '@/app/admin/actions/content';

export default async function AdminJourneyWith() {
  const rows = await listRows('journey_with_items');

  return (
    <div>
      <h1 className="mb-2 text-2xl font-display font-bold">Who We Journey With</h1>
      <p className="mb-6 text-muted-foreground">The Children / Families / Schools cards, shown on the homepage and the Who We Journey With page.</p>
      <AdminListEditor
        table="journey_with_items"
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

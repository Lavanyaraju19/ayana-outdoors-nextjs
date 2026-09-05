import AdminListEditor from '@/app/admin/components/AdminListEditor';
import { listRows } from '@/app/admin/actions/content';

export default async function AdminFounder() {
  const rows = await listRows('founder_facts');

  return (
    <div>
      <h1 className="mb-2 text-2xl font-display font-bold">Founder</h1>
      <p className="mb-6 text-muted-foreground">Facts shown on the homepage founder card and the full Founder Story page.</p>
      <AdminListEditor
        table="founder_facts"
        titleField="title"
        subtitleField="subtitle"
        rows={rows}
        fields={[
          { name: 'title', label: 'Fact', type: 'text', required: true },
          { name: 'subtitle', label: 'Subtitle (optional)', type: 'text' },
        ]}
      />
    </div>
  );
}

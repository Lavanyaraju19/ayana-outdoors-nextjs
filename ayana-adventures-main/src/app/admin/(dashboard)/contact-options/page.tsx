import AdminListEditor from '@/app/admin/components/AdminListEditor';
import { listRows } from '@/app/admin/actions/content';

export default async function AdminContactOptions() {
  const rows = await listRows('contact_options');

  return (
    <div>
      <h1 className="mb-2 text-2xl font-display font-bold">Contact Options</h1>
      <p className="mb-6 text-muted-foreground">The Call / WhatsApp / Email / Join Community cards on the Contact section.</p>
      <AdminListEditor
        table="contact_options"
        titleField="title"
        subtitleField="action"
        rows={rows}
        fields={[
          { name: 'title', label: 'Title', type: 'text', required: true },
          { name: 'description', label: 'Description', type: 'textarea', required: true },
          { name: 'action', label: 'Action text (e.g. phone number shown)', type: 'text', required: true },
          { name: 'link', label: 'Link (tel:, mailto:, https:// or a page path)', type: 'text', required: true },
          { name: 'external', label: 'Opens externally', type: 'boolean' },
        ]}
      />
    </div>
  );
}

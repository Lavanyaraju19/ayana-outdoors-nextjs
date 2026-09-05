import AdminListEditor from '@/app/admin/components/AdminListEditor';
import { listRows } from '@/app/admin/actions/content';

export default async function AdminAdventures() {
  const rows = await listRows('adventures');

  return (
    <div>
      <h1 className="mb-2 text-2xl font-display font-bold">Adventures</h1>
      <p className="mb-6 text-muted-foreground">
        These appear on the homepage and the Upcoming Adventures page, in this order.
      </p>
      <AdminListEditor
        table="adventures"
        titleField="title"
        subtitleField="duration"
        rows={rows}
        fields={[
          { name: 'title', label: 'Title', type: 'text', required: true },
          { name: 'image_path', label: 'Image', type: 'image', required: true },
          { name: 'description', label: 'Description', type: 'textarea', required: true },
          { name: 'duration', label: 'Duration (e.g. "1 Day")', type: 'text', required: true },
          { name: 'difficulty', label: 'Difficulty', type: 'text', required: true },
          { name: 'age_group', label: 'Age group', type: 'text', required: true },
          { name: 'learn_link', label: 'Learn More link', type: 'text', required: true },
          { name: 'enquiry_link', label: 'Enquiry link', type: 'text', required: true },
          { name: 'is_published', label: 'Published', type: 'boolean' },
        ]}
      />
    </div>
  );
}

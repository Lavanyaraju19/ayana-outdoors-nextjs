import AdminListEditor from '@/app/admin/components/AdminListEditor';
import { listRows } from '@/app/admin/actions/content';

export default async function AdminTestimonials() {
  const rows = await listRows('testimonials');

  return (
    <div>
      <h1 className="mb-2 text-2xl font-display font-bold">Testimonials</h1>
      <p className="mb-6 text-muted-foreground">The "Voices from Our Community" section on the homepage.</p>
      <AdminListEditor
        table="testimonials"
        titleField="title"
        subtitleField="label"
        rows={rows}
        fields={[
          { name: 'title', label: 'Title', type: 'text', required: true },
          { name: 'label', label: 'Label (small tag above the title)', type: 'text' },
          { name: 'description', label: 'Description', type: 'textarea', required: true },
          { name: 'link', label: 'Link', type: 'text', required: true },
        ]}
      />
    </div>
  );
}

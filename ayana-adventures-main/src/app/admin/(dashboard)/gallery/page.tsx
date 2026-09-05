import AdminListEditor from '@/app/admin/components/AdminListEditor';
import { listRows } from '@/app/admin/actions/content';

export default async function AdminGallery() {
  const rows = await listRows('gallery_photos');

  return (
    <div>
      <h1 className="mb-2 text-2xl font-display font-bold">Gallery</h1>
      <p className="mb-6 text-muted-foreground">Photos shown on the public Gallery page.</p>
      <AdminListEditor
        table="gallery_photos"
        titleField="title"
        rows={rows}
        fields={[
          { name: 'title', label: 'Caption', type: 'text', required: true },
          { name: 'image_path', label: 'Photo', type: 'image', required: true },
        ]}
      />
    </div>
  );
}

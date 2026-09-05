import { listEnquiries } from '@/app/admin/actions/content';
import EnquiriesTable from './EnquiriesTable';

export default async function AdminEnquiries({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const enquiries = await listEnquiries(status);

  return (
    <div>
      <h1 className="mb-2 text-2xl font-display font-bold">Enquiries</h1>
      <p className="mb-6 text-muted-foreground">Everyone who has submitted the contact form, newest first.</p>
      <EnquiriesTable enquiries={enquiries} activeStatus={status ?? 'all'} />
    </div>
  );
}

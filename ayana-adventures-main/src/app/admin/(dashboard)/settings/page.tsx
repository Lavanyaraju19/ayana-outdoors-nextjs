import AdminSingletonForm from '@/app/admin/components/AdminSingletonForm';
import { getSingleton } from '@/app/admin/actions/content';

export default async function AdminSettings() {
  const settings = await getSingleton('site_settings');

  return (
    <div>
      <h1 className="mb-2 text-2xl font-display font-bold">Settings</h1>
      <p className="mb-6 text-muted-foreground">
        Contact details and social links shown in the footer, WhatsApp button and structured data across the site.
      </p>
      <AdminSingletonForm
        table="site_settings"
        data={settings}
        fields={[
          { name: 'phone', label: 'Phone (as displayed, e.g. "+91 98765 43210")', type: 'text', required: true },
          { name: 'whatsapp_number', label: 'WhatsApp number (digits only, e.g. "919876543210")', type: 'text', required: true },
          { name: 'email', label: 'Email', type: 'text', required: true },
          { name: 'address_locality', label: 'City', type: 'text', required: true },
          { name: 'address_region', label: 'State', type: 'text', required: true },
          { name: 'social_instagram', label: 'Instagram URL', type: 'text' },
          { name: 'social_youtube', label: 'YouTube URL', type: 'text' },
          { name: 'social_facebook', label: 'Facebook URL', type: 'text' },
          { name: 'social_linkedin', label: 'LinkedIn URL', type: 'text' },
        ]}
      />
    </div>
  );
}

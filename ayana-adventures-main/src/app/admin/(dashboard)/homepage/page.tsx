import AdminSingletonForm from '@/app/admin/components/AdminSingletonForm';
import AdminListEditor from '@/app/admin/components/AdminListEditor';
import { getSingleton, listRows } from '@/app/admin/actions/content';

export default async function AdminHomepage() {
  const [hero, impactStats] = await Promise.all([getSingleton('hero_content'), listRows('impact_stats')]);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="mb-2 text-2xl font-display font-bold">Homepage — Hero</h1>
        <p className="mb-6 text-muted-foreground">The top banner visitors see first.</p>
        <AdminSingletonForm
          table="hero_content"
          data={hero}
          fields={[
            { name: 'eyebrow', label: 'Eyebrow text (small label above the headline)', type: 'text', required: true },
            { name: 'headline', label: 'Headline', type: 'text', required: true },
            { name: 'headline_highlight', label: 'Headline highlight (shown in accent color)', type: 'text', required: true },
            { name: 'subheadline', label: 'Subheadline', type: 'textarea', required: true },
            { name: 'highlights', label: 'Highlight chips', type: 'textarea', arrayOf: true },
            { name: 'cta_primary_label', label: 'Primary button label', type: 'text', required: true },
            { name: 'cta_primary_link', label: 'Primary button link', type: 'text', required: true },
            { name: 'cta_secondary_label', label: 'Secondary button label', type: 'text', required: true },
            { name: 'cta_secondary_link', label: 'Secondary button link', type: 'text', required: true },
            { name: 'cta_tertiary_label', label: 'Third button label', type: 'text', required: true },
            { name: 'cta_tertiary_link', label: 'Third button link', type: 'text', required: true },
          ]}
        />
      </div>

      <div>
        <h2 className="mb-2 text-xl font-display font-bold">Homepage — Impact Numbers</h2>
        <p className="mb-6 text-muted-foreground">The stat cards under the hero (e.g. "11+ Years Experience").</p>
        <AdminListEditor
          table="impact_stats"
          titleField="label"
          subtitleField="value"
          rows={impactStats}
          fields={[
            { name: 'value', label: 'Value (e.g. "11+")', type: 'text', required: true },
            { name: 'label', label: 'Label', type: 'text', required: true },
            { name: 'description', label: 'Description', type: 'textarea', required: true },
          ]}
        />
      </div>
    </div>
  );
}

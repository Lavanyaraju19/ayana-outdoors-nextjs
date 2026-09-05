import AdminListEditor from '@/app/admin/components/AdminListEditor';
import { listRows } from '@/app/admin/actions/content';

export default async function AdminFaqs() {
  const [faqItems, additional] = await Promise.all([listRows('faq_items'), listRows('additional_faq_questions')]);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="mb-2 text-2xl font-display font-bold">FAQs</h1>
        <p className="mb-6 text-muted-foreground">Full question &amp; answer pairs, shown on the homepage and the FAQs page.</p>
        <AdminListEditor
          table="faq_items"
          titleField="question"
          rows={faqItems}
          fields={[
            { name: 'question', label: 'Question', type: 'text', required: true },
            { name: 'answer', label: 'Answer', type: 'textarea', required: true },
          ]}
        />
      </div>

      <div>
        <h2 className="mb-2 text-xl font-display font-bold">Additional Questions</h2>
        <p className="mb-6 text-muted-foreground">Short questions-only list shown at the bottom of the FAQs page.</p>
        <AdminListEditor
          table="additional_faq_questions"
          titleField="question"
          rows={additional}
          fields={[{ name: 'question', label: 'Question', type: 'text', required: true }]}
        />
      </div>
    </div>
  );
}

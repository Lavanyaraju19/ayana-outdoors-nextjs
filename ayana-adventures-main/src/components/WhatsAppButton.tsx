import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  whatsappNumber: string;
}

const WhatsAppButton = ({ whatsappNumber }: WhatsAppButtonProps) => {
  const message = encodeURIComponent('Talk to Us. Help me choose the right outdoor learning experience for my child.');

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[hsl(142_70%_45%)] hover:bg-[hsl(142_70%_40%)] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-none"
      aria-label="Talk to Adventure Expert on WhatsApp"
      title="Talk to Adventure Expert"
    >
      <MessageCircle className="w-7 h-7 text-white" />
    </a>
  );
};

export default WhatsAppButton;

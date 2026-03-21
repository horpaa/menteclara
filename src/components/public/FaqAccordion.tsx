import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "¿Cuánto dura cada sesión?",
    a: "Las sesiones tienen una duración de 50 minutos.",
  },
  {
    q: "¿Puedo cancelar o reprogramar mi cita?",
    a: "Sí. Por favor, avisa con al menos 24 horas de antelación para no perder la sesión.",
  },
  {
    q: "¿Las videollamadas son seguras?",
    a: "Usamos plataformas cifradas que garantizan la confidencialidad de las sesiones.",
  },
  {
    q: "¿Cuántas sesiones necesitaré?",
    a: "Depende de cada persona y del motivo de consulta. Lo valoramos juntos en la primera sesión.",
  },
  {
    q: "¿Hay algún compromiso de permanencia?",
    a: "No. Puedes pausar o terminar el proceso cuando lo decidas.",
  },
  {
    q: "¿Ofrecéis factura?",
    a: "Sí, puedes solicitar factura para deducciones fiscales o reembolso de seguro.",
  },
];

export default function FaqAccordion() {
  return (
    <Accordion className="w-full">
      {faqs.map((faq, i) => (
        <AccordionItem key={i} value={`faq-${i}`}>
          <AccordionTrigger className="text-brand-dark text-left">{faq.q}</AccordionTrigger>
          <AccordionContent className="text-brand-dark/70">{faq.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

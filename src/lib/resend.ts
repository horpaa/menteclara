import { Resend } from "resend";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = process.env.RESEND_FROM_EMAIL ?? "citas@menteclara.es";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const WHATSAPP = process.env.WHATSAPP_NUMBER ?? "34600000000";

function formatDate(date: Date) {
  return format(new Date(date), "EEEE d 'de' MMMM 'a las' HH:mm", { locale: es });
}

export async function sendNewAppointmentRequestToPsychologist(data: {
  patientName: string;
  patientEmail: string;
  patientPhone?: string;
  startsAt: Date;
  type: string;
  appointmentId: string;
  isFirstConsult: boolean;
}) {
  const dateStr = formatDate(data.startsAt);
  const typeLabel = data.type === "VIDEO_CALL" ? "Videollamada" : "Presencial";
  const waMsg = encodeURIComponent(
    `Hola ${data.patientName}, he recibido tu solicitud de cita para el ${dateStr}. En breve te confirmo.`
  );

  await resend.emails.send({
    from: FROM,
    to: process.env.NEXTAUTH_URL ? [FROM] : ["delivered@resend.dev"],
    subject: `Nueva solicitud de cita — ${data.patientName}`,
    html: `
      <h2>Nueva solicitud de cita</h2>
      <p><strong>Paciente:</strong> ${data.patientName}</p>
      <p><strong>Email:</strong> ${data.patientEmail}</p>
      ${data.patientPhone ? `<p><strong>Teléfono:</strong> ${data.patientPhone}</p>` : ""}
      <p><strong>Fecha:</strong> ${dateStr}</p>
      <p><strong>Modalidad:</strong> ${typeLabel}</p>
      <p><strong>Primera consulta:</strong> ${data.isFirstConsult ? "Sí" : "No"}</p>
      <br/>
      <p>
        <a href="${SITE_URL}/admin/citas/${data.appointmentId}" style="background:#5B8DB8;color:white;padding:10px 20px;text-decoration:none;border-radius:6px;">
          Ver cita en panel
        </a>
        &nbsp;
        <a href="https://wa.me/${WHATSAPP}?text=${waMsg}" style="background:#25D366;color:white;padding:10px 20px;text-decoration:none;border-radius:6px;">
          WhatsApp
        </a>
      </p>
    `,
  });
}

export async function sendConfirmationToPatient(data: {
  patientName: string;
  patientEmail: string;
  startsAt: Date;
  type: string;
  meetLink?: string | null;
}) {
  const dateStr = formatDate(data.startsAt);

  await resend.emails.send({
    from: FROM,
    to: [data.patientEmail],
    subject: "Tu cita ha sido confirmada — MenteClara",
    html: `
      <h2>¡Tu cita está confirmada!</h2>
      <p>Hola ${data.patientName},</p>
      <p>Tu cita ha sido confirmada para el <strong>${dateStr}</strong>.</p>
      ${data.type === "VIDEO_CALL" && data.meetLink ? `<p>Link de videollamada: <a href="${data.meetLink}">${data.meetLink}</a></p>` : ""}
      ${data.type === "IN_PERSON" ? "<p>La consulta es presencial. Te esperamos.</p>" : ""}
      <p>Si necesitas cancelar o modificar, contáctanos con antelación.</p>
      <p>Un abrazo,<br/>MenteClara</p>
    `,
  });
}

export async function sendCancellationToPatient(data: {
  patientName: string;
  patientEmail: string;
  startsAt: Date;
  reason?: string;
}) {
  const dateStr = formatDate(data.startsAt);

  await resend.emails.send({
    from: FROM,
    to: [data.patientEmail],
    subject: "Actualización sobre tu cita — MenteClara",
    html: `
      <h2>Tu cita ha sido cancelada</h2>
      <p>Hola ${data.patientName},</p>
      <p>Lamentamos informarte que tu cita del <strong>${dateStr}</strong> no ha podido ser confirmada.</p>
      ${data.reason ? `<p><strong>Motivo:</strong> ${data.reason}</p>` : ""}
      <p>Por favor, <a href="${SITE_URL}/reservar">reserva una nueva cita</a> o contáctanos directamente.</p>
      <p>Disculpa las molestias,<br/>MenteClara</p>
    `,
  });
}

export async function sendReminderToPatient(data: {
  patientName: string;
  patientEmail: string;
  startsAt: Date;
  type: string;
  meetLink?: string | null;
}) {
  const dateStr = formatDate(data.startsAt);

  await resend.emails.send({
    from: FROM,
    to: [data.patientEmail],
    subject: "Recordatorio: tienes una cita mañana — MenteClara",
    html: `
      <h2>Recordatorio de cita</h2>
      <p>Hola ${data.patientName},</p>
      <p>Te recordamos que tienes una cita mañana: <strong>${dateStr}</strong>.</p>
      ${data.type === "VIDEO_CALL" && data.meetLink ? `<p>Link de videollamada: <a href="${data.meetLink}">${data.meetLink}</a></p>` : ""}
      <p>Si necesitas cancelar, por favor avísanos con la mayor antelación posible.</p>
      <p>¡Hasta pronto!,<br/>MenteClara</p>
    `,
  });
}

export async function sendContactNotification(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  await resend.emails.send({
    from: FROM,
    to: [FROM],
    subject: `Nuevo mensaje de contacto — ${data.name}`,
    html: `
      <h2>Nuevo mensaje de contacto</h2>
      <p><strong>Nombre:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      ${data.phone ? `<p><strong>Teléfono:</strong> ${data.phone}</p>` : ""}
      <p><strong>Mensaje:</strong></p>
      <p>${data.message}</p>
    `,
  });
}

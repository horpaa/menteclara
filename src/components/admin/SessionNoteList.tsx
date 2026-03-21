"use client";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface Note {
  id: string;
  content: string;
  objectives?: string | null;
  nextSteps?: string | null;
  createdAt: string;
  appointment?: { startsAt: string; type: string } | null;
}

interface Props {
  notes: Note[];
}

export default function SessionNoteList({ notes }: Props) {
  if (notes.length === 0) {
    return <p className="text-brand-dark/40 text-sm py-4">No hay notas de sesión.</p>;
  }

  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <div key={note.id} className="bg-white border border-brand-lavender rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-brand-dark">
              {note.appointment
                ? format(new Date(note.appointment.startsAt), "EEEE d 'de' MMMM yyyy", { locale: es })
                : format(new Date(note.createdAt), "d MMM yyyy", { locale: es })}
            </p>
            <span className="text-xs text-brand-dark/40">
              {note.appointment?.type === "VIDEO_CALL" ? "Videollamada" : "Presencial"}
            </span>
          </div>
          <p className="text-sm text-brand-dark/70 whitespace-pre-line mb-3">{note.content}</p>
          {note.objectives && (
            <div className="mb-2">
              <p className="text-xs font-semibold text-brand-dark mb-1">Objetivos</p>
              <p className="text-xs text-brand-dark/60 whitespace-pre-line">{note.objectives}</p>
            </div>
          )}
          {note.nextSteps && (
            <div>
              <p className="text-xs font-semibold text-brand-dark mb-1">Próximos pasos</p>
              <p className="text-xs text-brand-dark/60 whitespace-pre-line">{note.nextSteps}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

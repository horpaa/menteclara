"use client";
import { useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import { useRouter } from "next/navigation";

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  color: string;
}

interface AdminCalendarProps {
  events: CalendarEvent[];
}

const STATUS_COLORS: Record<string, string> = {
  PENDING: "#F59E0B",
  CONFIRMED: "#5B8DB8",
  COMPLETED: "#10B981",
  CANCELLED: "#EF4444",
  RESCHEDULED: "#8B5CF6",
};

export default function AdminCalendar({ events }: AdminCalendarProps) {
  const router = useRouter();

  return (
    <div className="bg-white border border-brand-lavender rounded-xl p-4">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        locale={esLocale}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={events}
        eventClick={(info) => {
          router.push(`/admin/citas/${info.event.id}`);
        }}
        slotMinTime="08:00:00"
        slotMaxTime="20:00:00"
        allDaySlot={false}
        height="auto"
        eventClassNames="cursor-pointer"
      />
    </div>
  );
}

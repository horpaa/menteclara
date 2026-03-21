"use client";
import AdminCalendar from "@/components/admin/AdminCalendar";

interface Props {
  events: { id: string; title: string; start: string; end: string; color: string }[];
}

export default function AdminCalendarWrapper({ events }: Props) {
  return <AdminCalendar events={events} />;
}

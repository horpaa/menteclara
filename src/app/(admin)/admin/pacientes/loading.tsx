import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col h-full overflow-auto">
      <div className="h-14 border-b border-brand-lavender bg-white" />
      <div className="flex-1 p-4 sm:p-6 space-y-4">
        <Skeleton className="h-10 w-64 rounded-lg" />
        <Skeleton className="h-64 rounded-xl" />
      </div>
    </div>
  );
}

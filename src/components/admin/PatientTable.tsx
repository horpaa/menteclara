"use client";
import { usePatients } from "@/hooks/usePatients";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { format } from "date-fns";
import { Search } from "lucide-react";

export default function PatientTable() {
  const [search, setSearch] = useState("");
  const { patients, isLoading } = usePatients(search || undefined);

  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <Search size={16} className="absolute left-3 top-2.5 text-brand-dark/40" />
        <Input
          placeholder="Buscar paciente..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="bg-white border border-brand-lavender rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Citas</TableHead>
              <TableHead>Alta</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell colSpan={5}><Skeleton className="h-4 w-full" /></TableCell>
                </TableRow>
              ))
            ) : patients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-brand-dark/40 py-8">
                  No se encontraron pacientes
                </TableCell>
              </TableRow>
            ) : (
              patients.map((p) => (
                <TableRow key={p.id} className="hover:bg-brand-light cursor-pointer">
                  <TableCell>
                    <Link href={`/admin/pacientes/${p.id}`} className="font-medium text-brand-dark hover:text-brand-blue">
                      {p.firstName} {p.lastName}
                    </Link>
                  </TableCell>
                  <TableCell className="text-brand-dark/60 text-sm">{p.email}</TableCell>
                  <TableCell className="text-brand-dark/60 text-sm">{p.phone ?? "—"}</TableCell>
                  <TableCell className="text-sm">{(p as any)._count?.appointments ?? 0}</TableCell>
                  <TableCell className="text-brand-dark/60 text-sm">
                    {format(new Date(p.createdAt), "dd/MM/yyyy")}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

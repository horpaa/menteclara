import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const role = (req.auth?.user as any)?.role;

  const isAdminRoute = nextUrl.pathname.startsWith("/admin");
  const isLoginPage = nextUrl.pathname === "/login";
  const isBookingRoute = nextUrl.pathname.startsWith("/reservar");
  const isAccesoPage = nextUrl.pathname === "/acceso";
  const isRegistroPage = nextUrl.pathname === "/registro";

  // Protect admin routes — only PSYCHOLOGIST or ADMIN roles
  if (isAdminRoute && (!isLoggedIn || (role !== "PSYCHOLOGIST" && role !== "ADMIN"))) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  // Admin already logged in → redirect away from login
  if (isLoginPage && isLoggedIn && (role === "PSYCHOLOGIST" || role === "ADMIN")) {
    return NextResponse.redirect(new URL("/admin", nextUrl));
  }

  // Protect booking — must be logged in as PATIENT (or admin can also book)
  if (isBookingRoute && !isLoggedIn) {
    const url = new URL("/acceso", nextUrl);
    url.searchParams.set("next", "/reservar");
    return NextResponse.redirect(url);
  }

  // Already logged in patient → redirect away from acceso/registro
  if ((isAccesoPage || isRegistroPage) && isLoggedIn && role === "PATIENT") {
    return NextResponse.redirect(new URL("/reservar", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/login", "/reservar/:path*", "/acceso", "/registro"],
};

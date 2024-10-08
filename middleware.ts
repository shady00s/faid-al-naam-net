import createMiddleware from "next-intl/middleware";
  
export const middleware = createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "ar"],

  // Used when no locale matches
  defaultLocale: "ar",
});


export const config = {
  // Match only internationalized pathnames
  matcher: ["/","/((?!api|_next|admin|static).*)"],

};

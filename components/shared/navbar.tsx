"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  FileText,
  Globe,
  Home,
  Menu,
  X,
  BarChart,
  Palette,
  Zap,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  availableContinents?: string[];
  onSidebarToggle?: () => void;
}

const Navbar = ({ availableContinents = [], onSidebarToggle }: NavbarProps) => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Determine current PEC and context
  const currentPEC = pathname.includes("/pec3")
    ? "pec3"
    : pathname.includes("/pec4")
    ? "pec4"
    : pathname.includes("/practica")
    ? "practica"
    : null;

  const isDocumentationPage = pathname.includes("/documentation");

  // PEC Navigation Items
  const pecNavigation = {
    pec3: [
      { name: "Análisis", href: "/pec3", icon: BarChart },
      { name: "Documentación", href: "/pec3/documentation", icon: FileText },
      {
        name: "Errores",
        href: "/pec3/documentation/analisis",
        icon: AlertTriangle,
      },
      { name: "Bocetos", href: "/pec3/documentation/bocetos", icon: Palette },
    ],
    pec4: [
      { name: "Dashboard", href: "/pec4", icon: LayoutDashboard },
      { name: "Documentación", href: "/pec4/documentation", icon: FileText },
      ...(availableContinents.length > 0
        ? [
            {
              name: "Continentes",
              href: "#continents",
              icon: Globe,
              isDropdown: true,
            },
          ]
        : []),
    ],
    practica: [
      { name: "Aplicación", href: "/practica", icon: Zap },
      {
        name: "Documentación",
        href: "/practica/documentation",
        icon: FileText,
      },
    ],
  };

  // Main navigation (when not in any PEC)
  const mainNavigation = [
    { name: "Inicio", href: "/", icon: Home },
    { name: "PEC 3", href: "/pec3", icon: BarChart },
    { name: "PEC 4", href: "/pec4", icon: LayoutDashboard },
    { name: "Práctica", href: "/practica", icon: Zap },
  ];

  // Get current navigation items
  const currentNavItems = currentPEC
    ? pecNavigation[currentPEC]
    : mainNavigation;

  // Get PEC badge info
  const getPECBadge = () => {
    switch (currentPEC) {
      case "pec3":
        return {
          label: "PEC 3",
          color: "bg-blue-100 text-blue-800",
          title: "Análisis de Vasos",
        };
      case "pec4":
        return {
          label: "PEC 4",
          color: "bg-green-100 text-green-800",
          title: "CO₂ Explorer",
        };
      case "practica":
        return {
          label: "Práctica",
          color: "bg-purple-100 text-purple-800",
          title: "Visualización Interactiva",
        };
      default:
        return {
          label: "Portfolio",
          color: "bg-gray-100 text-gray-800",
          title: "Infografía UOC",
        };
    }
  };

  const badge = getPECBadge();

  const isActiveLink = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <nav className='bg-white shadow-lg border-b border-gray-200 fixed top-0 left-0 right-0 z-30'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo/Brand with optional sidebar toggle */}
          <div className='flex items-center flex-shrink-0'>
            {isDocumentationPage && onSidebarToggle && (
              <button
                onClick={onSidebarToggle}
                className='mr-3 p-2 rounded-md hover:bg-gray-100 lg:hidden'
                title='Toggle sidebar'
              >
                <Menu className='w-5 h-5' />
              </button>
            )}

            {/* PEC Badge */}
            <span
              className={cn(
                "text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center",
                badge.color
              )}
            >
              {badge.label}
            </span>

            {/* Title */}
            <h1 className='ml-3 text-xl font-bold text-gray-900 whitespace-nowrap flex items-center'>
              {badge.title}
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-4 h-full'>
            <NavigationMenu>
              <NavigationMenuList className='flex items-center space-x-1 h-full'>
                {currentNavItems.map((item) => (
                  <NavigationMenuItem
                    key={item.name}
                    className='flex items-center'
                  >
                    {item.name === "Continentes" &&
                    availableContinents.length > 0 ? (
                      <>
                        <NavigationMenuTrigger className='h-10 flex items-center'>
                          <Globe className='w-4 h-4 mr-2' />
                          Continentes
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className='grid gap-3 p-6 w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
                            <div className='row-span-3'>
                              <NavigationMenuLink asChild>
                                <div className='flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md'>
                                  <Globe className='h-6 w-6' />
                                  <div className='mb-2 mt-4 text-lg font-medium'>
                                    Análisis Regional
                                  </div>
                                  <p className='text-sm leading-tight text-muted-foreground'>
                                    Explora las emisiones de CO₂ por continente
                                    con análisis detallado.
                                  </p>
                                </div>
                              </NavigationMenuLink>
                            </div>
                            <div className='grid gap-1'>
                              {availableContinents
                                .slice(0, 6)
                                .map((continent) => (
                                  <Link
                                    key={continent}
                                    href={`/pec4/routes/continents/${encodeURIComponent(
                                      continent
                                    )}`}
                                    legacyBehavior
                                    passHref
                                  >
                                    <NavigationMenuLink className='block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'>
                                      <div className='text-sm font-medium leading-none'>
                                        {continent}
                                      </div>
                                      <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
                                        Análisis de {continent}
                                      </p>
                                    </NavigationMenuLink>
                                  </Link>
                                ))}
                            </div>
                          </div>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <Link href={item.href} legacyBehavior passHref>
                        <NavigationMenuLink
                          className={cn(
                            "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                            isActiveLink(item.href) &&
                              "bg-accent text-accent-foreground"
                          )}
                        >
                          <item.icon className='w-4 h-4 mr-2' />
                          {item.name}
                        </NavigationMenuLink>
                      </Link>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            {/* Navigation Actions */}
            <div className='flex items-center space-x-2 ml-4'>
              {currentPEC && (
                <Button
                  variant='outline'
                  asChild
                  className='h-10 flex items-center'
                >
                  <Link href='/' className='flex items-center space-x-2'>
                    <Home className='w-4 h-4' />
                    <span>Portfolio</span>
                  </Link>
                </Button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className='md:hidden flex items-center'>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className='flex items-center justify-center'
            >
              {isMobileMenuOpen ? (
                <X className='h-6 w-6' />
              ) : (
                <Menu className='h-6 w-6' />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className='md:hidden'>
            <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200'>
              {currentNavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors",
                    isActiveLink(item.href)
                      ? "bg-accent text-accent-foreground"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className='w-5 h-5 mr-3' />
                  {item.name}
                </Link>
              ))}

              {/* Mobile Continents (PEC 4 only) */}
              {currentPEC === "pec4" && availableContinents.length > 0 && (
                <div className='pt-4'>
                  <div className='px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                    Continentes
                  </div>
                  {availableContinents.map((continent) => (
                    <Link
                      key={continent}
                      href={`/pec4/routes/continents/${encodeURIComponent(
                        continent
                      )}`}
                      className='flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Globe className='w-5 h-5 mr-3 text-gray-400' />
                      {continent}
                    </Link>
                  ))}
                </div>
              )}

              {/* Mobile Navigation Actions */}
              <div className='pt-4 border-t border-gray-200'>
                {currentPEC ? (
                  <Link
                    href='/'
                    className='flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Home className='w-5 h-5 mr-3' />
                    Volver al Portfolio
                  </Link>
                ) : (
                  <>
                    <Link
                      href='/pec3'
                      className='flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <BarChart className='w-5 h-5 mr-3' />
                      PEC 3
                    </Link>
                    <Link
                      href='/pec4'
                      className='flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <LayoutDashboard className='w-5 h-5 mr-3' />
                      PEC 4
                    </Link>
                    <Link
                      href='/practica'
                      className='flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Zap className='w-5 h-5 mr-3' />
                      Práctica
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

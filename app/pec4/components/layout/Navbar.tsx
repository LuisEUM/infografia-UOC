"use client";

import React from "react";
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
  ChevronDown,
  MapPin,
  Palette,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  availableContinents?: string[];
}

const Navbar = ({ availableContinents = [] }: NavbarProps) => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Navigation items
  const navItems = [
    {
      name: "Dashboard",
      href: "/pec4",
      icon: LayoutDashboard,
    },
    {
      name: "Documentación",
      href: "/pec4/documentation",
      icon: FileText,
    },
    {
      name: "Colores",
      href: "/pec4/theme",
      icon: Palette,
    },
  ];

  const isActiveLink = (href: string) => {
    if (href === "/pec4") {
      return pathname === "/pec4";
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className='bg-white shadow-lg border-b border-gray-200'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo/Brand */}
          <div className='flex items-center flex-shrink-0'>
            <span className='bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center'>
              PEC 4
            </span>
            <h1 className='ml-3 text-xl font-bold text-gray-900 whitespace-nowrap flex items-center'>
              CO₂ Explorer
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-4 h-full'>
            <NavigationMenu>
              <NavigationMenuList className='flex items-center space-x-1 h-full'>
                {navItems.map((item) => (
                  <NavigationMenuItem
                    key={item.name}
                    className='flex items-center'
                  >
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
                  </NavigationMenuItem>
                ))}

                {/* Continents Dropdown */}
                {availableContinents.length > 0 && (
                  <NavigationMenuItem className='flex items-center'>
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
                                Explora las emisiones de CO₂ por continente con
                                análisis detallado y comparaciones.
                              </p>
                            </div>
                          </NavigationMenuLink>
                        </div>
                        <div className='grid gap-1'>
                          {availableContinents.slice(0, 6).map((continent) => (
                            <Link
                              key={continent}
                              href={`/pec4/routes/continents/${encodeURIComponent(
                                continent
                              )}`}
                              legacyBehavior
                              passHref
                            >
                              <NavigationMenuLink className='block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'>
                                <div className='flex items-center'>
                                  <MapPin className='w-4 h-4 mr-2 text-muted-foreground' />
                                  <div className='text-sm font-medium leading-none'>
                                    {continent}
                                  </div>
                                </div>
                                <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
                                  Ver análisis detallado de {continent}
                                </p>
                              </NavigationMenuLink>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                )}
              </NavigationMenuList>
            </NavigationMenu>

            {/* Back to Portfolio */}
            <Button
              variant='outline'
              asChild
              className='ml-4 h-10 flex items-center'
            >
              <Link href='/' className='flex items-center space-x-2'>
                <Home className='w-4 h-4' />
                <span>Portfolio</span>
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className='md:hidden flex items-center'>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className='flex items-center justify-center'
            >
              <Menu className='h-6 w-6' />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className='md:hidden'>
            <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200'>
              {navItems.map((item) => (
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

              {/* Mobile Continents */}
              {availableContinents.length > 0 && (
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
                      <MapPin className='w-5 h-5 mr-3 text-gray-400' />
                      {continent}
                    </Link>
                  ))}
                </div>
              )}

              {/* Mobile Portfolio Link */}
              <div className='pt-4 border-t border-gray-200'>
                <Link
                  href='/'
                  className='flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Home className='w-5 h-5 mr-3' />
                  Volver al Portfolio
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

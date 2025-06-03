"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Database,
  Code,
  Layers,
  Users,
  Palette,
  Settings,
  Home,
  FileText,
  Map,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface SidebarItem {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  children?: SidebarItem[];
}

const sidebarItems: SidebarItem[] = [
  {
    id: "overview",
    title: "Resumen General",
    icon: FileText,
    href: "/pec4/documentation",
  },
  {
    id: "data",
    title: "Datos y Metodología",
    icon: Database,
    children: [
      {
        id: "processing",
        title: "Procesamiento de Datos",
        icon: Database,
        href: "/pec4/documentation?section=processing",
      },
      {
        id: "structure",
        title: "Estructura de Datos",
        icon: Code,
        href: "/pec4/documentation?section=structure",
      },
    ],
  },
  {
    id: "architecture",
    title: "Arquitectura Técnica",
    icon: Layers,
    children: [
      {
        id: "screaming",
        title: "Screaming Architecture",
        icon: Layers,
        href: "/pec4/documentation?section=architecture",
      },
      {
        id: "tech-stack",
        title: "Stack Tecnológico",
        icon: Settings,
        href: "/pec4/documentation?section=tech-stack",
      },
    ],
  },
  {
    id: "colors",
    title: "Sistema de Colores",
    icon: Palette,
    href: "/pec4/documentation/colors",
  },
  {
    id: "user-guide",
    title: "Guía de Usuario",
    icon: Users,
    children: [
      {
        id: "navigation",
        title: "Navegación",
        icon: Map,
        href: "/pec4/documentation?section=navigation",
      },
      {
        id: "filters",
        title: "Filtros y Controles",
        icon: Settings,
        href: "/pec4/documentation?section=filters",
      },
      {
        id: "interactions",
        title: "Interacciones",
        icon: Users,
        href: "/pec4/documentation?section=interactions",
      },
    ],
  },
];

interface SidebarProps {
  isOpen?: boolean;
  onToggle?: (open: boolean) => void;
}

export function Sidebar({
  isOpen: controlledIsOpen,
  onToggle,
}: SidebarProps = {}) {
  const [internalIsOpen, setInternalIsOpen] = useState(true);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const pathname = usePathname();

  // Use controlled state if provided, otherwise use internal state
  const isOpen =
    controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const toggleOpen = onToggle || setInternalIsOpen;

  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isActive = (href?: string) => {
    if (!href) return false;
    if (href === "/pec4/documentation") {
      return (
        pathname === href &&
        (typeof window === "undefined" || !window.location.search)
      );
    }
    return typeof window !== "undefined"
      ? window.location.href.includes(href)
      : pathname.startsWith(href);
  };

  const renderSidebarItem = (item: SidebarItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);
    const active = isActive(item.href);

    return (
      <div key={item.id}>
        {item.href ? (
          <Link href={item.href}>
            <div
              className={`flex items-center px-4 py-2 text-sm rounded-lg cursor-pointer transition-colors ${
                level > 0 ? "ml-6" : ""
              } ${
                active
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <item.icon
                className={`w-4 h-4 mr-3 ${
                  active ? "text-white" : "text-gray-500"
                }`}
              />
              <span className='flex-1'>{item.title}</span>
            </div>
          </Link>
        ) : (
          <div
            className={`flex items-center px-4 py-2 text-sm rounded-lg cursor-pointer transition-colors ${
              level > 0 ? "ml-6" : ""
            } text-gray-700 hover:bg-gray-100`}
            onClick={() => toggleExpanded(item.id)}
          >
            <item.icon className='w-4 h-4 mr-3 text-gray-500' />
            <span className='flex-1'>{item.title}</span>
            {hasChildren && (
              <svg
                className={`w-4 h-4 transition-transform ${
                  isExpanded ? "rotate-180" : ""
                }`}
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M19 9l-7 7-7-7'
                />
              </svg>
            )}
          </div>
        )}

        {hasChildren && isExpanded && (
          <div className='mt-1 space-y-1'>
            {item.children!.map((child) => renderSidebarItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Edge hover trigger */}
      <div
        className='fixed left-0 top-16 w-2 h-full z-30 lg:hidden'
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-16 left-0 z-20 w-64 h-[calc(100vh-4rem)] bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen || isHovering ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className='flex flex-col h-full'>
          {/* Header with toggle button */}
          <div className='flex items-center justify-between px-4 py-4 border-b'>
            <div className='flex items-center'>
              <FileText className='w-6 h-6 text-blue-600 mr-2' />
              <div>
                <h1 className='text-base font-bold text-gray-900'>
                  Documentación
                </h1>
                <p className='text-xs text-gray-500'>CO₂ Explorer</p>
              </div>
            </div>
            <button
              onClick={() => toggleOpen(!isOpen)}
              className='p-1 rounded-md hover:bg-gray-100 lg:hidden'
            >
              {isOpen ? (
                <ChevronLeft className='w-4 h-4' />
              ) : (
                <ChevronRight className='w-4 h-4' />
              )}
            </button>
          </div>

          {/* Navigation */}
          <nav className='flex-1 px-2 py-4 space-y-2 overflow-y-auto'>
            {sidebarItems.map((item) => renderSidebarItem(item))}
          </nav>

          {/* Footer */}
          <div className='p-4 border-t'>
            <Link
              href='/pec4'
              className='flex items-center px-4 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 transition-colors'
            >
              <Home className='w-4 h-4 mr-3' />
              Volver al Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {(isOpen || isHovering) && (
        <div
          className='lg:hidden fixed inset-0 z-10 bg-gray-600 bg-opacity-50 top-16'
          onClick={() => {
            toggleOpen(false);
            setIsHovering(false);
          }}
        />
      )}
    </>
  );
}

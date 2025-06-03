"use client";

import Link from "next/link";

interface BackButtonProps {
  href: string;
  label?: string;
  className?: string;
  color?: "blue" | "purple" | "gray";
}

export default function BackButton({
  href,
  label = "Volver al índice",
  className = "",
  color = "blue",
}: BackButtonProps) {
  const colorClasses = {
    blue: "text-blue-600 hover:text-blue-800",
    purple: "text-purple-600 hover:text-purple-800",
    gray: "text-gray-600 hover:text-gray-800",
  };

  return (
    <Link
      href={href}
      className={`inline-flex items-center font-medium text-sm transition-colors bg-white px-4 py-2 rounded-lg shadow-sm ${colorClasses[color]} ${className}`}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='w-4 h-4 mr-2'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18'
        />
      </svg>
      {label}
    </Link>
  );
}

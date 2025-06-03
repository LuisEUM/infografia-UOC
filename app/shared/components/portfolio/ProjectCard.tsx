"use client";

import Link from "next/link";
import { useState } from "react";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  status: "COMPLETADO" | "EN PROGRESO";
  href: string;
  icon: React.ReactNode;
  color: string;
  isClickable: boolean;
  onHover?: (id: string | null) => void;
}

export default function ProjectCard({
  id,
  title,
  description,
  status,
  href,
  icon,
  color,
  isClickable,
  onHover,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const statusColor =
    status === "COMPLETADO"
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-yellow-100 text-yellow-800 border-yellow-200";

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover?.(id);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHover?.(null);
  };

  const cardContent = (
    <div
      className={`
      relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 h-full
      ${isHovered ? "shadow-2xl transform -translate-y-2" : "shadow-lg"}
      ${!isClickable ? "opacity-75" : "hover:shadow-2xl"}
    `}
    >
      {/* Gradient Header */}
      <div
        className={`h-32 bg-gradient-to-r ${color} relative overflow-hidden`}
      >
        <div className='absolute inset-0 bg-black bg-opacity-10'></div>
        <div className='absolute top-4 right-4'>
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${statusColor}`}
          >
            {status}
          </span>
        </div>
        <div className='absolute bottom-4 left-4 text-white'>{icon}</div>
        {!isClickable && (
          <div className='absolute inset-0 bg-gray-500 bg-opacity-20 flex items-center justify-center'>
            <svg
              className='w-8 h-8 text-white opacity-50'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 15l3-3m0 0l-3-3m3 3H2m13 4v1a3 3 0 01-3 3H7a3 3 0 01-3-3V4a3 3 0 013-3h5a3 3 0 013 3v1'
              />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className='p-6'>
        <h3 className='text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors'>
          {title}
        </h3>
        <p className='text-gray-600 text-sm leading-relaxed mb-4'>
          {description}
        </p>

        {isClickable ? (
          <div className='flex items-center text-blue-600 font-medium text-sm'>
            <span>Explorar proyecto</span>
            <svg
              className='w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 5l7 7-7 7'
              />
            </svg>
          </div>
        ) : (
          <div className='flex items-center text-gray-400 font-medium text-sm'>
            <svg
              className='w-4 h-4 mr-2'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            <span>Próximamente disponible</span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div
      className='group relative'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isClickable ? (
        <Link href={href} className='block'>
          {cardContent}
        </Link>
      ) : (
        cardContent
      )}
    </div>
  );
}

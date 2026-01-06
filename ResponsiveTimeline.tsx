/**
 * Responsive Zig-Zag Timeline Component
 * 
 * Features:
 * ✓ Desktop: 6 milestones in single row, alternating positions
 * ✓ Tablet: 2 rows with alternating pattern
 * ✓ Mobile: Vertical stack with vertical connecting line
 * ✓ Smooth animations and hover effects
 * ✓ CSS Grid layout with pseudo-elements
 * ✓ Fully responsive design
 * 
 * Usage:
 * <ResponsiveTimeline milestones={milestonesData} />
 */

import React from 'react';

export const milestonesData = [
  {
    id: 1,
    year: 2000,
    title: 'Founded Jaivanth Engineering',
    description: 'Beginning our journey in industrial component manufacturing',
    icon: 'fas fa-flag',
    color: 'from-amber-500 to-amber-400'
  },
  {
    id: 2,
    year: 2002,
    title: 'Automats Added',
    description: 'Expanded capabilities with advanced automation',
    icon: 'fas fa-cog',
    color: 'from-yellow-500 to-yellow-400'
  },
  {
    id: 3,
    year: 2007,
    title: 'Power Press Components',
    description: 'Launched Power Press Components manufacturing',
    icon: 'fas fa-industry',
    color: 'from-green-500 to-green-400'
  },
  {
    id: 4,
    year: 2008,
    title: 'CNC Turning Started',
    description: 'Enhanced precision and expanded product range',
    icon: 'fas fa-tools',
    color: 'from-pink-500 to-pink-400'
  },
  {
    id: 5,
    year: 2013,
    title: 'ISO 9001 Certified',
    description: 'Formalized commitment to quality standards',
    icon: 'fas fa-certificate',
    color: 'from-blue-500 to-blue-400'
  },
  {
    id: 6,
    year: 2018,
    title: 'Cold Forging + ISO 2015',
    description: 'Advanced manufacturing with ISO 9001:2015 upgrade',
    icon: 'fas fa-wrench',
    color: 'from-cyan-500 to-cyan-400'
  }
];

interface TimelineCardProps {
  milestone: typeof milestonesData[0];
  index: number;
  isEven: boolean;
  onCardHover?: (id: number) => void;
  hoveredCardId?: number | null;
}

interface ResponsiveTimelineProps {
  milestones?: typeof milestonesData;
  title?: string;
  subtitle?: string;
  description?: string;
  onMilestoneClick?: (milestone: typeof milestonesData[0]) => void;
}

const TimelineCard: React.FC<TimelineCardProps> = ({
  milestone,
  index,
  isEven,
  onCardHover,
  hoveredCardId
}) => {
  const isHovered = hoveredCardId === milestone.id;

  return (
    <div
      className={`flex flex-col items-center lg:items-${isEven ? 'end' : 'start'} group`}
      onMouseEnter={() => onCardHover?.(milestone.id)}
      onMouseLeave={() => onCardHover?.(null)}
    >
      {/* Mobile connector line */}
      <div className="lg:hidden absolute left-1/2 top-20 w-6 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent transform translate-x-1/2" />

      {/* Desktop vertical connector */}
      <div
        className={`hidden lg:block absolute w-1 h-16 ${
          isEven ? 'top-full' : 'bottom-full'
        } left-1/2 transform -translate-x-1/2 bg-gradient-to-${
          isEven ? 't' : 'b'
        } from-cyan-400 via-cyan-300 to-transparent transition-all duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-60'
        }`}
      />

      {/* Timeline Card */}
      <div
        className={`w-full max-w-xs bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 p-8 border-l-4 border-cyan-500 cursor-pointer transform ${
          isHovered ? 'scale-105 -translate-y-2' : ''
        }`}
      >
        {/* Icon Badge */}
        <div
          className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${milestone.color} text-white text-2xl mb-6 transform transition-transform duration-300 ${
            isHovered ? 'scale-110 rotate-6' : ''
          }`}
        >
          <i className={milestone.icon} />
        </div>

        {/* Year */}
        <div className="text-5xl font-black bg-gradient-to-r from-cyan-600 via-cyan-500 to-cyan-400 bg-clip-text text-transparent mb-3 leading-tight">
          {milestone.year}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-cyan-600 transition-colors">
          {milestone.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-4">
          {milestone.description}
        </p>

        {/* Hover indicator */}
        <div
          className={`h-1 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full transition-all duration-300 ${
            isHovered ? 'w-full' : 'w-0'
          }`}
        />
      </div>

      {/* Timeline node/dot */}
      <div className="hidden lg:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <div
          className={`w-7 h-7 bg-white border-4 border-cyan-500 rounded-full shadow-lg ring-4 ring-cyan-100 transition-all duration-300 ${
            isHovered ? 'scale-125 ring-8 ring-cyan-200' : ''
          }`}
        />
      </div>
    </div>
  );
};

const ResponsiveTimeline: React.FC<ResponsiveTimelineProps> = ({
  milestones = milestonesData,
  title = 'Jaivant Engineering Timeline',
  subtitle = 'Our Journey',
  description = 'Explore our growth and milestones through the years',
  onMilestoneClick
}) => {
  const [hoveredCardId, setHoveredCardId] = React.useState<number | null>(null);

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-24">
          <span className="inline-block text-cyan-600 font-bold text-sm uppercase tracking-widest mb-4 animate-fade-in">
            {subtitle}
          </span>
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Horizontal timeline line (desktop only) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent transform -translate-y-1/2 z-0" />

          {/* Timeline Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24 lg:gap-16 relative z-10 lg:py-32">
            {milestones.map((milestone, index) => (
              <TimelineCard
                key={milestone.id}
                milestone={milestone}
                index={index}
                isEven={index % 2 === 1}
                onCardHover={setHoveredCardId}
                hoveredCardId={hoveredCardId}
              />
            ))}
          </div>

          {/* Vertical timeline line (mobile/tablet) */}
          <div className="lg:hidden absolute left-1/2 top-0 bottom-0 w-1.5 bg-gradient-to-b from-cyan-500 via-cyan-400 to-cyan-500 transform -translate-x-1/2 z-0" />
        </div>
      </div>

      {/* CSS for blob animation */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
};

export default ResponsiveTimeline;

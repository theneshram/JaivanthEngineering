import React from 'react';

// Milestone data
const milestonesData = [
  {
    year: 2000,
    title: 'Founded Jaivanth Engineering',
    description: 'Beginning our journey in industrial component manufacturing',
    icon: 'fas fa-flag',
    color: 'from-amber-500 to-amber-400'
  },
  {
    year: 2002,
    title: 'Automats Added',
    description: 'Expanded capabilities with advanced automation',
    icon: 'fas fa-cog',
    color: 'from-yellow-500 to-yellow-400'
  },
  {
    year: 2007,
    title: 'Power Press Components',
    description: 'Launched Power Press Components manufacturing',
    icon: 'fas fa-industry',
    color: 'from-green-500 to-green-400'
  },
  {
    year: 2008,
    title: 'CNC Turning Started',
    description: 'Enhanced precision and expanded product range',
    icon: 'fas fa-tools',
    color: 'from-pink-500 to-pink-400'
  },
  {
    year: 2013,
    title: 'ISO 9001 Certified',
    description: 'Formalized commitment to quality standards',
    icon: 'fas fa-certificate',
    color: 'from-blue-500 to-blue-400'
  },
  {
    year: 2018,
    title: 'Cold Forging + ISO 2015',
    description: 'Advanced manufacturing with ISO 9001:2015 upgrade',
    icon: 'fas fa-wrench',
    color: 'from-cyan-500 to-cyan-400'
  }
];

const ResponsiveTimeline = () => {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="inline-block text-cyan-600 font-semibold text-sm uppercase tracking-wider mb-3">
            Our Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Jaivant Engineering Timeline
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our growth and milestones through the years
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Horizontal line (desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-cyan-400 to-cyan-500 transform -translate-y-1/2 z-0" />

          {/* Timeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-20 relative z-10 lg:py-24 md:py-20">
            {milestonesData.map((milestone, index) => (
              <TimelineCard
                key={index}
                milestone={milestone}
                index={index}
                isEven={index % 2 === 1}
              />
            ))}
          </div>

          {/* Vertical line (mobile) */}
          <div className="lg:hidden absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 via-cyan-400 to-cyan-500 transform -translate-x-1/2" />
        </div>
      </div>
    </section>
  );
};

const TimelineCard = ({ milestone, index, isEven }) => {
  return (
    <div className={`flex flex-col items-center lg:items-start ${isEven ? 'lg:translate-y-32' : ''}`}>
      {/* Mobile connector line */}
      <div className="lg:hidden absolute left-1/2 top-20 w-6 h-0.5 bg-cyan-400 transform translate-x-1/2" />

      {/* Desktop connector */}
      <div className={`hidden lg:block absolute w-1 h-12 ${
        isEven ? 'bottom-full' : 'top-full'
      } left-1/2 transform -translate-x-1/2 bg-gradient-to-${isEven ? 'b' : 't'} from-cyan-400 to-transparent`} />

      {/* Card */}
      <div className="w-full max-w-sm bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border-l-4 border-cyan-500 group">
        {/* Icon Badge */}
        <div className={`inline-flex items-center justify-center w-14 h-14 rounded-lg bg-gradient-to-br ${milestone.color} text-white text-xl mb-4 group-hover:scale-110 transition-transform`}>
          <i className={milestone.icon} />
        </div>

        {/* Year */}
        <div className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-cyan-400 bg-clip-text text-transparent mb-2">
          {milestone.year}
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
          {milestone.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
          {milestone.description}
        </p>
      </div>

      {/* Timeline node */}
      <div className="hidden lg:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <div className="w-6 h-6 bg-white border-4 border-cyan-500 rounded-full shadow-lg" />
      </div>
    </div>
  );
};

export default ResponsiveTimeline;

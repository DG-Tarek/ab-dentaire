/**
 * Responsive Design System - Typography & Icon Scaling
 * 
 * This system provides consistent scaling across mobile, tablet, and desktop devices
 * while maintaining readability and touch accessibility standards.
 */

// Breakpoint definitions
export const BREAKPOINTS = {
  mobile: '320px',
  tablet: '768px', // md
  desktop: '1024px', // lg
  largeDesktop: '1280px' // xl
} as const;

// Base font sizes for different device types
export const BASE_FONT_SIZES = {
  mobile: '14px',    // Slightly larger for mobile readability
  tablet: '16px',    // Standard base size
  desktop: '16px'    // Standard base size
} as const;

// Typography scale using modular scale (1.25 ratio)
export const TYPOGRAPHY_SCALE = {
  // Mobile-first approach with responsive scaling
  xs: {
    mobile: '0.75rem',   // 12px
    tablet: '0.75rem',   // 12px
    desktop: '0.75rem'   // 12px
  },
  sm: {
    mobile: '0.875rem',  // 14px
    tablet: '0.875rem',  // 14px
    desktop: '0.875rem'  // 14px
  },
  base: {
    mobile: '1rem',      // 16px
    tablet: '1rem',      // 16px
    desktop: '1rem'      // 16px
  },
  lg: {
    mobile: '1.125rem',  // 18px
    tablet: '1.125rem',  // 18px
    desktop: '1.125rem'  // 18px
  },
  xl: {
    mobile: '1.25rem',   // 20px
    tablet: '1.25rem',   // 20px
    desktop: '1.25rem'   // 20px
  },
  '2xl': {
    mobile: '1.5rem',    // 24px
    tablet: '1.5rem',    // 24px
    desktop: '1.5rem'    // 24px
  },
  '3xl': {
    mobile: '1.875rem',  // 30px
    tablet: '1.875rem',  // 30px
    desktop: '1.875rem'  // 30px
  },
  '4xl': {
    mobile: '2.25rem',   // 36px
    tablet: '2.25rem',   // 36px
    desktop: '2.25rem'   // 36px
  }
} as const;

// Icon size scale (proportional to text)
export const ICON_SCALE = {
  xs: {
    mobile: '0.75rem',   // 12px
    tablet: '0.75rem',   // 12px
    desktop: '0.75rem'   // 12px
  },
  sm: {
    mobile: '1rem',      // 16px
    tablet: '1rem',      // 16px
    desktop: '1rem'      // 16px
  },
  base: {
    mobile: '1.25rem',   // 20px
    tablet: '1.25rem',   // 20px
    desktop: '1.25rem'   // 20px
  },
  lg: {
    mobile: '1.5rem',    // 24px
    tablet: '1.5rem',    // 24px
    desktop: '1.5rem'    // 24px
  },
  xl: {
    mobile: '1.75rem',   // 28px
    tablet: '1.75rem',   // 28px
    desktop: '1.75rem'   // 28px
  },
  '2xl': {
    mobile: '2rem',      // 32px
    tablet: '2rem',      // 32px
    desktop: '2rem'      // 32px
  },
  '3xl': {
    mobile: '2.5rem',    // 40px
    tablet: '2.5rem',    // 40px
    desktop: '2.5rem'    // 40px
  }
} as const;

// Touch target sizes (minimum 48px for accessibility)
export const TOUCH_TARGETS = {
  small: {
    mobile: '2.5rem',    // 40px (minimum for small interactive elements)
    tablet: '2.5rem',    // 40px
    desktop: '2.5rem'    // 40px
  },
  base: {
    mobile: '3rem',      // 48px (accessibility minimum)
    tablet: '3rem',      // 48px
    desktop: '2.5rem'    // 40px (desktop can be smaller)
  },
  large: {
    mobile: '3.5rem',    // 56px
    tablet: '3.5rem',    // 56px
    desktop: '3rem'      // 48px
  }
} as const;

// Spacing scale (proportional to typography)
export const SPACING_SCALE = {
  xs: {
    mobile: '0.25rem',   // 4px
    tablet: '0.25rem',   // 4px
    desktop: '0.25rem'   // 4px
  },
  sm: {
    mobile: '0.5rem',    // 8px
    tablet: '0.5rem',    // 8px
    desktop: '0.5rem'    // 8px
  },
  base: {
    mobile: '1rem',      // 16px
    tablet: '1rem',      // 16px
    desktop: '1rem'      // 16px
  },
  lg: {
    mobile: '1.5rem',    // 24px
    tablet: '1.5rem',    // 24px
    desktop: '1.5rem'    // 24px
  },
  xl: {
    mobile: '2rem',      // 32px
    tablet: '2rem',      // 32px
    desktop: '2rem'      // 32px
  },
  '2xl': {
    mobile: '3rem',      // 48px
    tablet: '3rem',      // 48px
    desktop: '3rem'      // 48px
  }
} as const;

// Utility functions for responsive scaling
export const getResponsiveValue = (
  scale: Record<string, Record<string, string>>,
  size: keyof typeof TYPOGRAPHY_SCALE | keyof typeof ICON_SCALE | keyof typeof TOUCH_TARGETS | keyof typeof SPACING_SCALE,
  device: 'mobile' | 'tablet' | 'desktop' = 'mobile'
): string => {
  return scale[size]?.[device] || scale[size]?.mobile || '1rem';
};

// Tailwind CSS classes for responsive typography
export const getResponsiveTextClasses = (size: keyof typeof TYPOGRAPHY_SCALE): string => {
  const mobile = getResponsiveValue(TYPOGRAPHY_SCALE, size, 'mobile');
  const tablet = getResponsiveValue(TYPOGRAPHY_SCALE, size, 'tablet');
  const desktop = getResponsiveValue(TYPOGRAPHY_SCALE, size, 'desktop');
  
  return `text-[${mobile}] md:text-[${tablet}] lg:text-[${desktop}]`;
};

// Tailwind CSS classes for responsive icons
export const getResponsiveIconClasses = (size: keyof typeof ICON_SCALE): string => {
  const mobile = getResponsiveValue(ICON_SCALE, size, 'mobile');
  const tablet = getResponsiveValue(ICON_SCALE, size, 'tablet');
  const desktop = getResponsiveValue(ICON_SCALE, size, 'desktop');
  
  return `w-[${mobile}] h-[${mobile}] md:w-[${tablet}] md:h-[${tablet}] lg:w-[${desktop}] lg:h-[${desktop}]`;
};

// Tailwind CSS classes for responsive touch targets
export const getResponsiveTouchClasses = (size: keyof typeof TOUCH_TARGETS): string => {
  const mobile = getResponsiveValue(TOUCH_TARGETS, size, 'mobile');
  const tablet = getResponsiveValue(TOUCH_TARGETS, size, 'tablet');
  const desktop = getResponsiveValue(TOUCH_TARGETS, size, 'desktop');
  
  return `w-[${mobile}] h-[${mobile}] md:w-[${tablet}] md:h-[${tablet}] lg:w-[${desktop}] lg:h-[${desktop}]`;
};

// Predefined responsive classes for common use cases
export const RESPONSIVE_CLASSES = {
  // Typography
  text: {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl'
  },
  // Icons
  icon: {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    base: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7',
    '2xl': 'w-8 h-8',
    '3xl': 'w-10 h-10'
  },
  // Touch targets
  touch: {
    small: 'w-10 h-10',
    base: 'w-12 h-12',
    large: 'w-14 h-14'
  },
  // Spacing
  spacing: {
    xs: 'p-1',
    sm: 'p-2',
    base: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
    '2xl': 'p-12'
  }
} as const;

// Component-specific responsive configurations
export const COMPONENT_SCALING = {
  // Search input
  searchInput: {
    height: {
      mobile: 'h-10',    // 40px - good touch target
      tablet: 'h-9',     // 36px - slightly smaller
      desktop: 'h-8'     // 32px - compact for desktop
    },
    text: {
      mobile: 'text-sm',
      tablet: 'text-sm',
      desktop: 'text-sm'
    },
    icon: {
      mobile: 'w-4 h-4',
      tablet: 'w-4 h-4',
      desktop: 'w-4 h-4'
    }
  },
  // Card elements
  card: {
    title: {
      mobile: 'text-sm',
      tablet: 'text-base',
      desktop: 'text-sm'
    },
    price: {
      mobile: 'text-xs',
      tablet: 'text-sm',
      desktop: 'text-sm'
    },
    button: {
      mobile: 'w-6 h-6',
      tablet: 'w-7 h-7',
      desktop: 'w-10 h-10'
    },
    icon: {
      mobile: 'w-3 h-3',
      tablet: 'w-4 h-4',
      desktop: 'w-4 h-4'
    }
  },
  // Navigation elements
  navigation: {
    text: {
      mobile: 'text-xs',
      tablet: 'text-sm',
      desktop: 'text-sm'
    },
    icon: {
      mobile: 'w-4 h-4',
      tablet: 'w-4 h-4',
      desktop: 'w-5 h-5'
    },
    button: {
      mobile: 'w-8 h-8',
      tablet: 'w-9 h-9',
      desktop: 'w-10 h-10'
    }
  }
} as const;

const responsiveScaling = {
  BREAKPOINTS,
  BASE_FONT_SIZES,
  TYPOGRAPHY_SCALE,
  ICON_SCALE,
  TOUCH_TARGETS,
  SPACING_SCALE,
  getResponsiveValue,
  getResponsiveTextClasses,
  getResponsiveIconClasses,
  getResponsiveTouchClasses,
  RESPONSIVE_CLASSES,
  COMPONENT_SCALING
};

export default responsiveScaling; 
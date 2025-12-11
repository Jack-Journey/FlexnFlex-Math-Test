/**
 * Flo & Flex Math Game - UI Component Library
 *
 * A comprehensive collection of reusable UI components extracted from the
 * Math Adventure game. Built with React, Tailwind CSS, and Framer Motion.
 *
 * Framework: React 18.3.1
 * Styling: Tailwind CSS v4.1.3
 * Animation: Framer Motion
 *
 * @author Extracted from FlexnFlex-Math-Test
 * @version 1.0.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ============================================================================
 * DESIGN SYSTEM TOKENS
 * ========================================================================= */

export const DesignTokens = {
  colors: {
    primary: '#9333ea',      // Purple
    primaryHover: '#7c3aed', // Purple darker
    success: '#10b981',      // Green
    error: '#ef4444',        // Red
    warning: '#f59e0b',      // Orange
    info: '#3b82f6',         // Blue
    text: {
      primary: '#1e293b',    // Slate 800
      secondary: '#475569',  // Slate 600
      tertiary: '#94a3b8',   // Slate 400
    },
    background: {
      primary: '#ffffff',
      secondary: '#f8fafc',  // Slate 50
      tertiary: '#f1f5f9',   // Slate 100
    }
  },
  spacing: {
    xs: '0.25rem',    // 1
    sm: '0.5rem',     // 2
    md: '1rem',       // 4
    lg: '1.5rem',     // 6
    xl: '2rem',       // 8
    '2xl': '3rem',    // 12
    '3xl': '4rem',    // 16
  },
  borderRadius: {
    sm: '0.375rem',   // rounded-sm
    md: '0.5rem',     // rounded-md
    lg: '0.625rem',   // rounded-lg
    xl: '1rem',       // rounded-xl
    '2xl': '1rem',    // rounded-2xl
    '3xl': '1.5rem',  // rounded-3xl
    full: '9999px',   // rounded-full
  },
  typography: {
    sizes: {
      xs: '0.75rem',    // text-xs
      sm: '0.875rem',   // text-sm
      base: '1rem',     // text-base
      lg: '1.125rem',   // text-lg
      xl: '1.25rem',    // text-xl
      '2xl': '1.5rem',  // text-2xl
      '3xl': '1.875rem',// text-3xl
      '5xl': '3rem',    // text-5xl
      '6xl': '3.75rem', // text-6xl
    },
    weights: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    }
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  },
  transitions: {
    fast: '150ms',
    base: '300ms',
    slow: '500ms',
    ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
  }
};

/* ============================================================================
 * ANIMATION VARIANTS (Framer Motion)
 * ========================================================================= */

export const AnimationVariants = {
  // Fade in/out
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 }
  },

  // Scale in/out
  scaleIn: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
    transition: { duration: 0.3, ease: 'easeOut' }
  },

  // Slide from bottom
  slideUp: {
    initial: { y: 100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 100, opacity: 0 },
    transition: { duration: 0.3, ease: 'easeOut' }
  },

  // Slide from top
  slideDown: {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -100, opacity: 0 },
    transition: { duration: 0.3, ease: 'easeOut' }
  },

  // Bounce
  bounce: {
    whileTap: { scale: 0.98 },
    whileHover: { scale: 1.05 },
    transition: { type: 'spring', stiffness: 400, damping: 10 }
  },

  // Pulse
  pulse: {
    animate: {
      scale: [1, 1.05, 1],
      transition: { duration: 2, repeat: Infinity }
    }
  },

  // Stagger children
  staggerContainer: {
    animate: {
      transition: { staggerChildren: 0.1 }
    }
  },

  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  }
};

/* ============================================================================
 * BUTTON COMPONENTS
 * ========================================================================= */

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  onClick,
  className = '',
  ...props
}) => {
  const baseClasses = 'font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants = {
    primary: 'bg-gradient-to-br from-purple-400 via-pink-400 to-pink-500 text-white hover:shadow-xl hover:scale-105 active:scale-98 focus:ring-purple-500',
    secondary: 'bg-white text-slate-800 border-2 border-slate-300 hover:bg-slate-50 hover:shadow-lg active:scale-98 focus:ring-slate-400',
    success: 'bg-gradient-to-r from-green-400 to-green-500 text-white hover:shadow-xl hover:scale-105 active:scale-98 focus:ring-green-500',
    danger: 'bg-gradient-to-r from-red-400 to-red-500 text-white hover:shadow-xl hover:scale-105 active:scale-98 focus:ring-red-500',
    ghost: 'bg-transparent text-slate-700 hover:bg-slate-100 active:scale-98 focus:ring-slate-400',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer';
  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${widthClass} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export const IconButton = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  className = '',
  ...props
}) => {
  const baseClasses = 'rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center';

  const variants = {
    primary: 'bg-purple-500 text-white hover:bg-purple-600 hover:shadow-lg focus:ring-purple-500',
    secondary: 'bg-slate-200 text-slate-700 hover:bg-slate-300 hover:shadow-lg focus:ring-slate-400',
    ghost: 'bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-slate-400',
  };

  const sizes = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
  };

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.1 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  );
};

/* ============================================================================
 * INPUT COMPONENTS
 * ========================================================================= */

export const Input = ({
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseClasses = 'px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500';
  const stateClasses = error
    ? 'border-red-400 focus:border-red-500 focus:ring-red-500'
    : 'border-slate-300 focus:border-purple-500';
  const disabledClasses = disabled ? 'bg-slate-100 cursor-not-allowed opacity-50' : 'bg-white';
  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <div className={`${widthClass}`}>
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`${baseClasses} ${stateClasses} ${disabledClasses} ${widthClass} ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export const Select = ({
  label,
  options,
  value,
  onChange,
  error,
  disabled = false,
  fullWidth = false,
  placeholder = 'Select an option',
  className = '',
  ...props
}) => {
  const baseClasses = 'px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500';
  const stateClasses = error
    ? 'border-red-400 focus:border-red-500 focus:ring-red-500'
    : 'border-slate-300 focus:border-purple-500';
  const disabledClasses = disabled ? 'bg-slate-100 cursor-not-allowed opacity-50' : 'bg-white cursor-pointer';
  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <div className={`${widthClass}`}>
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-2">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`${baseClasses} ${stateClasses} ${disabledClasses} ${widthClass} ${className}`}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export const Textarea = ({
  label,
  placeholder,
  value,
  onChange,
  rows = 4,
  error,
  disabled = false,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseClasses = 'px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-vertical';
  const stateClasses = error
    ? 'border-red-400 focus:border-red-500 focus:ring-red-500'
    : 'border-slate-300 focus:border-purple-500';
  const disabledClasses = disabled ? 'bg-slate-100 cursor-not-allowed opacity-50' : 'bg-white';
  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <div className={`${widthClass}`}>
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-2">
          {label}
        </label>
      )}
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        className={`${baseClasses} ${stateClasses} ${disabledClasses} ${widthClass} ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

/* ============================================================================
 * CARD COMPONENTS
 * ========================================================================= */

export const Card = ({
  children,
  variant = 'default',
  gradient = false,
  hover = true,
  padding = 'md',
  className = '',
  ...props
}) => {
  const baseClasses = 'rounded-2xl transition-all duration-300';

  const variants = {
    default: 'bg-white shadow-lg',
    outlined: 'bg-white border-2 border-slate-300',
    elevated: 'bg-white shadow-2xl',
    gradient: 'bg-gradient-to-br from-purple-400 via-pink-400 to-pink-500 text-white shadow-xl',
  };

  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const hoverClasses = hover ? 'hover:shadow-2xl hover:scale-105' : '';
  const gradientClasses = gradient ? variants.gradient : variants[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${baseClasses} ${gradientClasses} ${paddings[padding]} ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const GameCard = ({
  title,
  description,
  icon,
  color = 'purple',
  onClick,
  className = '',
  ...props
}) => {
  const colors = {
    purple: 'from-purple-400 to-purple-500',
    pink: 'from-pink-400 to-pink-500',
    blue: 'from-blue-400 to-blue-500',
    green: 'from-green-400 to-green-500',
    orange: 'from-orange-400 to-orange-500',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`p-6 rounded-3xl bg-gradient-to-br ${colors[color]} text-white shadow-xl cursor-pointer ${className}`}
      {...props}
    >
      {icon && (
        <div className="text-5xl mb-4">{icon}</div>
      )}
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      {description && (
        <p className="text-white/90 text-sm">{description}</p>
      )}
    </motion.div>
  );
};

/* ============================================================================
 * LAYOUT COMPONENTS
 * ========================================================================= */

export const Container = ({
  children,
  maxWidth = 'xl',
  centered = true,
  padding = true,
  className = '',
  ...props
}) => {
  const maxWidths = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-5xl',
    xl: 'max-w-6xl',
    full: 'max-w-full',
  };

  const centerClasses = centered ? 'mx-auto' : '';
  const paddingClasses = padding ? 'px-4 md:px-6' : '';

  return (
    <div className={`${maxWidths[maxWidth]} ${centerClasses} ${paddingClasses} ${className}`} {...props}>
      {children}
    </div>
  );
};

export const Grid = ({
  children,
  cols = 3,
  gap = 'md',
  responsive = true,
  className = '',
  ...props
}) => {
  const gaps = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
  };

  const gridCols = responsive
    ? `grid-cols-1 md:grid-cols-${cols}`
    : `grid-cols-${cols}`;

  return (
    <div className={`grid ${gridCols} ${gaps[gap]} ${className}`} {...props}>
      {children}
    </div>
  );
};

export const Flex = ({
  children,
  direction = 'row',
  align = 'center',
  justify = 'start',
  gap = 'md',
  wrap = false,
  className = '',
  ...props
}) => {
  const directions = {
    row: 'flex-row',
    col: 'flex-col',
    'row-reverse': 'flex-row-reverse',
    'col-reverse': 'flex-col-reverse',
  };

  const aligns = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  };

  const justifies = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
  };

  const gaps = {
    none: '',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
  };

  const wrapClass = wrap ? 'flex-wrap' : '';

  return (
    <div
      className={`flex ${directions[direction]} ${aligns[align]} ${justifies[justify]} ${gaps[gap]} ${wrapClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const Stack = ({ children, spacing = 'md', className = '', ...props }) => {
  const spacings = {
    none: 'space-y-0',
    sm: 'space-y-2',
    md: 'space-y-4',
    lg: 'space-y-6',
    xl: 'space-y-8',
  };

  return (
    <div className={`flex flex-col ${spacings[spacing]} ${className}`} {...props}>
      {children}
    </div>
  );
};

/* ============================================================================
 * MODAL COMPONENTS
 * ========================================================================= */

export const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  size = 'md',
  closeOnOverlay = true,
  className = '',
  ...props
}) => {
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-xl',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full',
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeOnOverlay ? onClose : undefined}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className={`bg-white rounded-3xl shadow-2xl ${sizes[size]} w-full ${className}`}
              {...props}
            >
              {title && (
                <div className="flex items-center justify-between p-6 border-b border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
                  <IconButton variant="ghost" onClick={onClose}>
                    ✕
                  </IconButton>
                </div>
              )}
              <div className="p-6">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

/* ============================================================================
 * FEEDBACK COMPONENTS
 * ========================================================================= */

export const Alert = ({
  variant = 'info',
  title,
  children,
  onClose,
  className = '',
  ...props
}) => {
  const variants = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-orange-50 border-orange-200 text-orange-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`p-4 rounded-xl border-2 ${variants[variant]} ${className}`}
      {...props}
    >
      <div className="flex items-start gap-3">
        <div className="text-2xl">{icons[variant]}</div>
        <div className="flex-1">
          {title && <div className="font-semibold mb-1">{title}</div>}
          <div className="text-sm">{children}</div>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-current hover:opacity-70">
            ✕
          </button>
        )}
      </div>
    </motion.div>
  );
};

export const Toast = ({
  message,
  variant = 'info',
  duration = 3000,
  onClose,
  className = '',
  ...props
}) => {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        onClose?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const variants = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-orange-500',
    info: 'bg-blue-500',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full text-white shadow-xl ${variants[variant]} ${className}`}
      {...props}
    >
      {message}
    </motion.div>
  );
};

export const Badge = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const variants = {
    primary: 'bg-purple-100 text-purple-800',
    success: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
    warning: 'bg-orange-100 text-orange-800',
    info: 'bg-blue-100 text-blue-800',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export const ProgressBar = ({
  value = 0,
  max = 100,
  variant = 'primary',
  size = 'md',
  showLabel = false,
  className = '',
  ...props
}) => {
  const percentage = Math.min((value / max) * 100, 100);

  const variants = {
    primary: 'bg-gradient-to-r from-purple-400 to-pink-500',
    success: 'bg-gradient-to-r from-green-400 to-green-500',
    error: 'bg-gradient-to-r from-red-400 to-red-500',
    warning: 'bg-gradient-to-r from-orange-400 to-orange-500',
  };

  const sizes = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  return (
    <div className={className} {...props}>
      {showLabel && (
        <div className="flex justify-between mb-2 text-sm text-slate-600">
          <span>{value} / {max}</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-200 rounded-full overflow-hidden ${sizes[size]}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`h-full ${variants[variant]}`}
        />
      </div>
    </div>
  );
};

export const Spinner = ({
  size = 'md',
  variant = 'primary',
  className = '',
  ...props
}) => {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  const variants = {
    primary: 'border-purple-500 border-t-transparent',
    white: 'border-white border-t-transparent',
  };

  return (
    <div
      className={`${sizes[size]} ${variants[variant]} rounded-full animate-spin ${className}`}
      {...props}
    />
  );
};

/* ============================================================================
 * TYPOGRAPHY COMPONENTS
 * ========================================================================= */

export const Heading = ({
  level = 1,
  children,
  gradient = false,
  className = '',
  ...props
}) => {
  const Tag = `h${level}`;

  const sizes = {
    1: 'text-5xl md:text-6xl',
    2: 'text-3xl md:text-5xl',
    3: 'text-2xl md:text-3xl',
    4: 'text-xl md:text-2xl',
    5: 'text-lg md:text-xl',
    6: 'text-base md:text-lg',
  };

  const gradientClasses = gradient
    ? 'bg-gradient-to-r from-purple-400 via-pink-400 to-pink-500 bg-clip-text text-transparent'
    : '';

  return (
    <Tag className={`font-bold ${sizes[level]} ${gradientClasses} ${className}`} {...props}>
      {children}
    </Tag>
  );
};

export const Text = ({
  children,
  size = 'base',
  weight = 'normal',
  color = 'primary',
  className = '',
  ...props
}) => {
  const sizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };

  const weights = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  const colors = {
    primary: 'text-slate-800',
    secondary: 'text-slate-600',
    tertiary: 'text-slate-400',
    white: 'text-white',
  };

  return (
    <p className={`${sizes[size]} ${weights[weight]} ${colors[color]} ${className}`} {...props}>
      {children}
    </p>
  );
};

/* ============================================================================
 * GAME-SPECIFIC COMPONENTS
 * ========================================================================= */

export const ScoreDisplay = ({
  score,
  label = 'Score',
  animated = true,
  className = '',
  ...props
}) => {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    if (animated) {
      const duration = 500;
      const steps = 20;
      const increment = (score - displayScore) / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        setDisplayScore(prev => {
          const newScore = prev + increment;
          return currentStep >= steps ? score : newScore;
        });

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    } else {
      setDisplayScore(score);
    }
  }, [score, animated, displayScore]);

  return (
    <div className={`text-center ${className}`} {...props}>
      <div className="text-sm text-slate-600 mb-1">{label}</div>
      <motion.div
        className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
        key={score}
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {Math.round(displayScore)}
      </motion.div>
    </div>
  );
};

export const LevelIndicator = ({
  currentLevel,
  totalLevels,
  className = '',
  ...props
}) => {
  return (
    <div className={`flex items-center gap-2 ${className}`} {...props}>
      {Array.from({ length: totalLevels }, (_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.1 }}
          className={`w-3 h-3 rounded-full ${
            i < currentLevel
              ? 'bg-gradient-to-r from-purple-400 to-pink-500'
              : 'bg-slate-300'
          }`}
        />
      ))}
    </div>
  );
};

export const QuestionCard = ({
  question,
  answers,
  onAnswer,
  selectedAnswer,
  disabled = false,
  className = '',
  ...props
}) => {
  return (
    <Card className={`max-w-2xl mx-auto ${className}`} {...props}>
      <Heading level={2} className="mb-6 text-center">{question}</Heading>
      <Stack spacing="md">
        {answers.map((answer, index) => (
          <Button
            key={index}
            variant={selectedAnswer === index ? 'primary' : 'secondary'}
            size="lg"
            fullWidth
            disabled={disabled}
            onClick={() => onAnswer(index)}
          >
            {answer}
          </Button>
        ))}
      </Stack>
    </Card>
  );
};

export const Timer = ({
  seconds,
  onComplete,
  variant = 'circular',
  size = 'md',
  className = '',
  ...props
}) => {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete?.();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onComplete]);

  const percentage = (timeLeft / seconds) * 100;

  if (variant === 'circular') {
    const sizes = {
      sm: 'w-16 h-16',
      md: 'w-20 h-20',
      lg: 'w-24 h-24',
    };

    return (
      <div className={`relative ${sizes[size]} ${className}`} {...props}>
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="8"
          />
          <motion.circle
            cx="50%"
            cy="50%"
            r="45%"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="8"
            strokeLinecap="round"
            initial={{ pathLength: 1 }}
            animate={{ pathLength: percentage / 100 }}
            style={{
              strokeDasharray: '1',
              strokeDashoffset: '0',
            }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
          {timeLeft}
        </div>
      </div>
    );
  }

  return (
    <div className={`text-center ${className}`} {...props}>
      <div className="text-4xl font-bold mb-2">{timeLeft}s</div>
      <ProgressBar value={timeLeft} max={seconds} variant="warning" />
    </div>
  );
};

/* ============================================================================
 * UTILITY COMPONENTS
 * ========================================================================= */

export const Divider = ({
  orientation = 'horizontal',
  spacing = 'md',
  className = '',
  ...props
}) => {
  const spacings = {
    none: '',
    sm: orientation === 'horizontal' ? 'my-2' : 'mx-2',
    md: orientation === 'horizontal' ? 'my-4' : 'mx-4',
    lg: orientation === 'horizontal' ? 'my-6' : 'mx-6',
    xl: orientation === 'horizontal' ? 'my-8' : 'mx-8',
  };

  const orientationClass = orientation === 'horizontal'
    ? 'w-full h-px'
    : 'w-px h-full';

  return (
    <div
      className={`bg-slate-200 ${orientationClass} ${spacings[spacing]} ${className}`}
      {...props}
    />
  );
};

export const Spacer = ({ size = 'md', className = '', ...props }) => {
  const sizes = {
    xs: 'h-1',
    sm: 'h-2',
    md: 'h-4',
    lg: 'h-6',
    xl: 'h-8',
    '2xl': 'h-12',
  };

  return <div className={`${sizes[size]} ${className}`} {...props} />;
};

export const AnimatedBackground = ({
  variant = 'gradient',
  className = '',
  children,
  ...props
}) => {
  const variants = {
    gradient: 'bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50',
    dots: 'bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-[size:16px_16px]',
    waves: 'bg-gradient-to-b from-purple-100 to-white',
  };

  return (
    <div className={`min-h-screen ${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
};

/* ============================================================================
 * EXPORT ALL
 * ========================================================================= */

export default {
  // Design System
  DesignTokens,
  AnimationVariants,

  // Buttons
  Button,
  IconButton,

  // Inputs
  Input,
  Select,
  Textarea,

  // Cards
  Card,
  GameCard,

  // Layout
  Container,
  Grid,
  Flex,
  Stack,

  // Modal
  Modal,

  // Feedback
  Alert,
  Toast,
  Badge,
  ProgressBar,
  Spinner,

  // Typography
  Heading,
  Text,

  // Game Components
  ScoreDisplay,
  LevelIndicator,
  QuestionCard,
  Timer,

  // Utilities
  Divider,
  Spacer,
  AnimatedBackground,
};

/**** Tailwind CSS Config ****/ 
module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ],
  darkMode: ['class', '[class~="dark"]'],
  theme: {
    extend: {
      colors: {
        // CSS custom property based colors
        'bg': 'var(--bg)',
        'bg-elev': 'var(--bg-elev)',
        'bg-secondary': 'var(--bg-secondary)',
        'text': 'var(--text)',
        'text-secondary': 'var(--text-secondary)',
        'muted': 'var(--muted)',
        'border': 'var(--border)',
        'primary': 'var(--primary)',
        'primary-hover': 'var(--primary-hover)',
        'card-bg': 'var(--card-bg)',
        'glass-bg': 'var(--glass-bg)',
        'danger': 'var(--danger)',
        'danger-hover': 'var(--danger-hover)',
        'success': 'var(--success)',
        'warning': 'var(--warning)',
        
        // Theme-aware color aliases
        'theme': 'var(--text)',
        'theme-secondary': 'var(--text-secondary)',
        'theme-muted': 'var(--muted)',
        'accent': 'var(--primary)',
        
        // Original primary scale for compatibility
        primary: {
          50: '#f2f8ff',
          100: '#e0f0ff',
          200: '#b9e0ff',
          300: '#7cc5ff',
          400: '#36a8ff',
          500: '#068dff',
          600: '#006fd6',
          700: '#0056aa',
          800: '#004a8d',
          900: '#063d6d',
          950: '#042747'
        }
      },
      
      backgroundColor: {
        'primary': 'var(--primary)',
        'bg': 'var(--bg)',
        'bg-elev': 'var(--bg-elev)',
        'bg-secondary': 'var(--bg-secondary)',
        'card': 'var(--card-bg)',
        'theme': 'var(--bg)',
        'theme-elev': 'var(--bg-elev)',
        'theme-secondary': 'var(--bg-secondary)',
      },
      
      textColor: {
        'primary': 'var(--text)',
        'secondary': 'var(--text-secondary)',
        'muted': 'var(--muted)',
        'accent': 'var(--primary)',
        'theme': 'var(--text)',
        'theme-secondary': 'var(--text-secondary)', 
        'theme-muted': 'var(--muted)',
        'danger': 'var(--danger)',
        'success': 'var(--success)',
        'warning': 'var(--warning)',
      },
      
      borderColor: {
        'primary': 'var(--border)',
        'accent': 'var(--primary)',
        'theme': 'var(--border)',
      }
    }
  },
  plugins: []
};

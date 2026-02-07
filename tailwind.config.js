/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                fintech: {
                    primary: '#0066FF',
                    secondary: '#0A1628',
                    accent: '#6366F1',
                    slate: {
                        50: '#F8FAFC',
                        100: '#F1F5F9',
                        200: '#E2E8F0',
                        300: '#CBD5E1',
                        400: '#94A3B8',
                        500: '#64748B',
                        600: '#475569',
                        700: '#334155',
                        800: '#1E293B',
                        900: '#0F172A',
                    },
                    blue: {
                        50: '#EFF6FF',
                        100: '#DBEAFE',
                        500: '#3B82F6',
                        600: '#2563EB',
                        700: '#1D4ED8',
                    },
                    violet: {
                        50: '#F5F3FF',
                        500: '#8B5CF6',
                        600: '#7C3AED',
                    },
                    cyan: {
                        50: '#ECFEFF',
                        500: '#06B6D4',
                    },
                },
                'samran-teal': '#00BFA6',
                'samran-green': '#22C55E',
                'samran-green-signal': '#16A34A',
                'samran-navy': '#0F172A',
                'samran-slate': '#64748B',
                'samran-gray-light': '#E2E8F0',
                'samran-gray-cloud': '#F1F5F9',
                'samran-white-clean': '#F9FBFC',
                'samran-teal-dark': '#008774', // Darker for text visibility (WCAG AA)
                'samran-green-dark': '#15803D', // Darker for text visibility
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Inter', 'system-ui', 'sans-serif'],
            },
            fontSize: {
                'display-xl': ['5.5rem', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '700' }],
                'display-lg': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '700' }],
                'display-md': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
                'display-sm': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
            },
            spacing: {
                '18': '4.5rem',
                '22': '5.5rem',
                '26': '6.5rem',
                '30': '7.5rem',
            },
            borderRadius: {
                '4xl': '2rem',
                '5xl': '2.5rem',
            },
            boxShadow: {
                'elegant': '0 20px 60px -15px rgba(0, 0, 0, 0.08), 0 10px 30px -10px rgba(0, 0, 0, 0.04)',
                'elegant-lg': '0 30px 80px -20px rgba(0, 0, 0, 0.12), 0 15px 40px -15px rgba(0, 0, 0, 0.06)',
                'glow': '0 0 40px rgba(99, 102, 241, 0.15)',
            },
            animation: {
                'fade-in': 'fadeIn 0.6s ease-out',
                'slide-up': 'slideUp 0.6s ease-out',
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
            },
        },
    },
    plugins: [],
}

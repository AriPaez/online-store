import type { Config } from "tailwindcss";

// Tailwind v4 config (minimal + extend with CSS custom properties from globals.css)
export default {
    content: ["./src/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
    theme: {
        container: {
            center: true,
            padding: "1rem",
            screens: {
                xl: "1280px",
                "2xl": "1440px",
            },
        },
        extend: {
            colors: {
                bg: "var(--fd-color-bg)",
                "bg-alt": "var(--fd-color-bg-alt)",
                surface: "var(--fd-color-surface)",
                "surface-alt": "var(--fd-color-surface-alt)",
                border: "var(--fd-color-border)",
                "border-strong": "var(--fd-color-border-strong)",
                text: "var(--fd-color-text)",
                "text-muted": "var(--fd-color-text-muted)",
                primary: "var(--fd-color-primary)",
                "primary-fg": "var(--fd-color-primary-foreground)",
                success: "var(--fd-color-success)",
                warning: "var(--fd-color-warning)",
                danger: "var(--fd-color-danger)",
                focus: "var(--fd-color-focus)",
            },
            fontSize: {
                xs: ["var(--fd-font-size-xs)", "1.4"],
                sm: ["var(--fd-font-size-sm)", "1.4"],
                base: ["var(--fd-font-size-base)", "1.5"],
                lg: ["var(--fd-font-size-lg)", "1.4"],
                xl: ["var(--fd-font-size-xl)", "1.2"],
                "2xl": ["var(--fd-font-size-2xl)", "1.15"],
                "3xl": ["var(--fd-font-size-3xl)", "1.1"],
                "4xl": ["var(--fd-font-size-4xl)", "1.05"],
                "5xl": ["var(--fd-font-size-5xl)", "1.05"],
            },
            borderRadius: {
                xs: "var(--fd-radius-xs)",
                sm: "var(--fd-radius-sm)",
                md: "var(--fd-radius-md)",
                lg: "var(--fd-radius-lg)",
                full: "var(--fd-radius-full)",
            },
            boxShadow: {
                sm: "var(--fd-shadow-sm)",
                DEFAULT: "var(--fd-shadow)",
                lg: "var(--fd-shadow-lg)",
                glow: "var(--fd-shadow-glow)",
            },
            transitionDuration: {
                fast: "var(--fd-transition-fast)",
                DEFAULT: "var(--fd-transition)",
                slow: "var(--fd-transition-slow)",
            },
            backgroundImage: {
                "hero-gradient": "var(--fd-gradient-hero)",
            },
            keyframes: {
                marquee: {
                    "0%": { transform: "translateX(0)" },
                    "100%": { transform: "translateX(-50%)" },
                },
            },
            animation: {
                marquee: "marquee 30s linear infinite",
            },
        },
    },
    plugins: [
        function ({ addUtilities }) {
            addUtilities({
                ".focus-ring": {
                    outline: "none",
                    boxShadow: "0 0 0 2px var(--fd-color-focus)",
                },
                ".scrollbar-thin": {
                    "::-webkit-scrollbar": { width: "8px", height: "8px" },
                    "::-webkit-scrollbar-track": { background: "var(--fd-color-bg-alt)" },
                    "::-webkit-scrollbar-thumb": {
                        background: "var(--fd-color-border)",
                        borderRadius: "8px",
                    },
                },
            });
        },
    ],
} satisfies Config;

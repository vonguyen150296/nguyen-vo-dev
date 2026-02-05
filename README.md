# Nguyen Vo - Portfolio Website

A modern, production-ready portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features multi-language support, dark/light themes, smooth animations, and a chatbot assistant.

## Features

- **Modern Tech Stack**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Multi-language Support**: English, German, French with easy extensibility
- **Theme System**: Dark/Light mode with system preference detection
- **Smooth Animations**: Framer Motion for elegant transitions
- **Chatbot Assistant**: AI-ready chatbot for visitor engagement
- **Responsive Design**: Optimized for all device sizes
- **Accessibility**: ARIA compliant, keyboard navigation, proper contrast
- **Performance Optimized**: Lazy loading, code splitting, optimized assets
- **SEO Ready**: Meta tags, Open Graph, semantic HTML

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

## Project Structure

```
nguyen-vo-dev/
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Home page
│   │   └── globals.css       # Global styles
│   ├── components/
│   │   ├── layout/           # Layout components (Navbar, Footer, ThemeProvider)
│   │   ├── sections/         # Page sections (Hero, Experience, Skills, etc.)
│   │   └── ui/               # Reusable UI components (Button, Icons, Chatbot)
│   ├── hooks/                # Custom React hooks
│   ├── i18n/                 # Internationalization files
│   │   ├── en.ts             # English translations
│   │   ├── de.ts             # German translations
│   │   ├── fr.ts             # French translations
│   │   └── index.ts          # i18n utilities
│   ├── lib/                  # Utilities and context
│   ├── types/                # TypeScript type definitions
│   └── constants/            # Application constants
├── public/                   # Static assets
├── next.config.ts            # Next.js configuration
├── tailwind.config.ts        # Tailwind CSS configuration
└── tsconfig.json             # TypeScript configuration
```

## Customization

### Update Personal Information

1. **Translations**: Edit files in `src/i18n/` to update content in all languages
2. **Contact Links**: Update email, LinkedIn, GitHub URLs in `src/components/sections/Contact.tsx`
3. **Metadata**: Update SEO metadata in `src/app/layout.tsx`

### Add New Languages

1. Create a new translation file in `src/i18n/` (e.g., `es.ts`)
2. Add the locale to `src/i18n/index.ts`
3. Update the `Locale` type in `src/types/index.ts`

### Customize Theme Colors

Edit CSS variables in `src/app/globals.css`:
- Light theme colors under `:root`
- Dark theme colors under `[data-theme='light']`

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and configure the build

Or use the Vercel CLI:
```bash
npm i -g vercel
vercel
```

### Build for Production

```bash
npm run build
npm start
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Technologies

- [Next.js 15](https://nextjs.org/) - React framework
- [React 19](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [next-themes](https://github.com/pacocoursey/next-themes) - Theme management

## License

MIT License - feel free to use this as a template for your own portfolio!

## Author

**Nguyen Vo** - Senior Frontend Developer

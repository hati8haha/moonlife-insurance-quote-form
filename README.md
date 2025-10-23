# MoonLife Insurance Quote Form

> **Disclaimer**: This is a sample website for demonstration purposes only. MoonLife Insurance is not a real company, and this application does not have backend functionality or process actual insurance quotes.

A modern, responsive insurance quote form built with React, TypeScript, and Vite. This application provides a multi-step form experience for users to get insurance quotes from MoonLife Insurance.

## Features

- **Multi-step Form**: Intuitive 3-step process for collecting user information
- **Responsive Design**: Mobile-first design that works on all devices
- **Form Validation**: Real-time validation with helpful error messages
- **Progress Tracking**: Visual progress bar to show completion status
- **TypeScript**: Full type safety throughout the application
- **Modern UI**: Clean, professional design with Tailwind CSS

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **pnpm** - Package manager

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- pnpm package manager

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd moonlife-insurance-quote-form
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the project for production
- `pnpm preview` - Preview the production build locally

## Project Structure

```
moonlife-insurance-quote-form/
├── components/           # React components
│   ├── CoverageStep.tsx  # Coverage selection step
│   ├── Icons.tsx         # Icon components
│   ├── PersonalInfoStep.tsx # Personal information step
│   ├── ProgressBar.tsx   # Progress indicator
│   ├── ReviewStep.tsx    # Review and confirmation step
│   └── SuccessStep.tsx   # Success confirmation
├── App.tsx              # Main application component
├── index.html           # HTML template
├── index.tsx            # Application entry point
├── types.ts             # TypeScript type definitions
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Project dependencies and scripts
```

## Form Steps

1. **Personal Information**: Collects user's name, email, and date of birth
2. **Coverage Selection**: Allows selection of insurance plan and coverage amount
3. **Review**: Displays all entered information for confirmation
4. **Success**: Confirmation page with option to start over

## Insurance Plans

- **Lunar Standard**: Basic coverage option
- **Celestial Plus**: Enhanced coverage with additional benefits
- **Galactic Premier**: Premium coverage with comprehensive protection

## Development

### Code Style

This project uses TypeScript for type safety and follows React best practices. Components are functional with hooks, and state management is handled locally within components.

### Styling

The application uses Tailwind CSS for styling with a custom color palette:
- Primary colors: Moon-themed blues and purples
- Clean, modern design with proper spacing and typography

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary software owned by MoonLife Insurance. All rights reserved.

## Contact

For questions or support, please contact the MoonLife Insurance development team.
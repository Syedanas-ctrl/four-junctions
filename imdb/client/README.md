### Installation

1. Clone the repository
2. Install dependencies:
   ```
   pnpm install
   ```
5. Start the development server:
   ```
   pnpm run dev
   ```

### Framework Overview

This project is built using:
- **Next.js 15.2.4** - A React framework for production-grade applications
- **React 19** - The latest version of React with enhanced features
- **TypeScript** - For type-safe development
- **Redux Toolkit** - For state management
- **Tailwind CSS** - For utility-first styling

### **State Management**
   - `useState` - For local component state
   - `useReducer` - For complex state logic
   - `useSelector` and `useDispatch` from React Redux for global state

### Tailwind CSS**
   - Utility-first CSS framework
   - Custom configuration in `tailwind.config.ts`
   - Responsive design utilities
   - Dark mode support with `next-themes`

### Project Structure

```
client/
├── app/          # Next.js app directory
├── components/   # Reusable UI components
├── hooks/        # Custom React hooks
├── lib/          # Utility functions and configurations
├── public/       # Static assets
├── styles/       # Global styles and CSS modules
└── types/        # TypeScript type definitions
```
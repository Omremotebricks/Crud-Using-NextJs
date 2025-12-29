# Task Manager - CRUD Application

A modern, responsive task management application built with Next.js 16, Supabase, and TypeScript. Features a clean UI with dark/light theme support and full CRUD operations.

## 🚀 Features

- **Full CRUD Operations**: Create, read, update, and delete tasks
- **Real-time Database**: Powered by Supabase for instant data synchronization
- **Theme Toggle**: Dark and light mode with smooth transitions
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean interface with Tailwind CSS styling
- **TypeScript**: Full type safety throughout the application
- **Server Actions**: Leverages Next.js 16 server actions for data operations

## 🛠️ Tech Stack

- **Framework**: Next.js 16.1.1 (App Router)
- **Language**: TypeScript 5
- **Database**: Supabase
- **Styling**: Tailwind CSS 4
- **UI Components**: Custom React components
- **State Management**: React hooks (useState, useEffect)
- **Authentication**: Supabase SSR

## 📦 Dependencies

### Core Dependencies
- `next`: 16.1.1
- `react`: 19.2.3
- `react-dom`: 19.2.3
- `@supabase/supabase-js`: ^2.89.0
- `@supabase/ssr`: ^0.8.0

### Development Dependencies
- `typescript`: ^5
- `tailwindcss`: ^4
- `eslint`: ^9
- `eslint-config-next`: 16.1.1

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account and project

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd crud-supabase-nextjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase Database**
   
   Create a `tasks` table in your Supabase database:
   ```sql
   CREATE TABLE tasks (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     title TEXT NOT NULL,
     description TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
├── app/
│   ├── globals.css          # Global styles and Tailwind imports
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main page with task management UI
├── lib/
│   ├── supabase.ts          # Supabase client configuration
│   └── tasks.ts             # Server actions for CRUD operations
├── public/                  # Static assets
├── .env.local              # Environment variables
├── next.config.ts          # Next.js configuration
├── package.json            # Project dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## 🎯 Key Features Explained

### Task Management
- **Create**: Add new tasks with title and optional description
- **Read**: View all tasks in a clean, organized list
- **Update**: Edit existing tasks inline
- **Delete**: Remove tasks with confirmation modal

### User Experience
- **Theme Toggle**: Switch between dark and light modes
- **Loading States**: Visual feedback during operations
- **Responsive Design**: Optimized for all screen sizes
- **Keyboard Shortcuts**: 
  - Enter to submit forms
  - Ctrl+Enter in textarea to submit

### Technical Implementation
- **Server Actions**: All CRUD operations use Next.js server actions
- **SSR Support**: Supabase SSR for server-side rendering
- **Type Safety**: Full TypeScript implementation
- **Error Handling**: Comprehensive error management

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Customization

### Styling
The application uses Tailwind CSS for styling. You can customize:
- Colors in the theme toggle functionality
- Component styles in `app/page.tsx`
- Global styles in `app/globals.css`

### Database Schema
Modify the `tasks` table structure in Supabase to add more fields:
```sql
ALTER TABLE tasks ADD COLUMN priority INTEGER DEFAULT 1;
ALTER TABLE tasks ADD COLUMN completed BOOLEAN DEFAULT FALSE;
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
The application can be deployed on any platform that supports Next.js:
- Netlify
- Railway
- AWS Amplify
- DigitalOcean App Platform

## 🔒 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Yes |

## 🤝 Contributing & Usage

### For Contributors (Adding Features)

1. **Fork the repository** to your GitHub account
2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/crud-supabase-nextjs.git
   cd crud-supabase-nextjs
   ```
3. **Create a separate branch** for your feature (avoid conflicts):
   ```bash
   git checkout -b feature/your-feature-name
   # Examples:
   git checkout -b feature/task-categories
   git checkout -b feature/search-functionality
   git checkout -b fix/theme-bug
   ```
4. **Make your changes** and test thoroughly
5. **Commit with clear messages**:
   ```bash
   git add .
   git commit -m "Add task categories feature"
   ```
6. **Push to your branch**:
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Open a Pull Request** with:
   - Clear description of changes
   - Screenshots if UI changes
   - Test instructions

### For Personal Use

If you want to use this project as your own:

1. **Fork or clone** the repository
2. **Set up your own Supabase project**:
   - Create account at [supabase.com](https://supabase.com)
   - Create new project
   - Update `.env.local` with your credentials
3. **Customize as needed**:
   - Change branding/colors
   - Add your own features
   - Modify database schema
4. **Deploy** to your preferred platform

### Pull Request Guidelines

- ✅ **Good PRs**: Well-tested, documented, single feature focus
- ✅ **We'll merge if**: Code quality is good, feature adds value, no conflicts
- ❌ **Avoid**: Multiple unrelated changes, breaking changes without discussion

### Branch Naming Convention
- `feature/feature-name` - New features
- `fix/bug-description` - Bug fixes
- `docs/update-description` - Documentation updates
- `refactor/component-name` - Code refactoring

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🐛 Known Issues

- Theme preference persists in localStorage
- Requires JavaScript enabled for full functionality

## 🔮 Future Enhancements

- [ ] Task categories and tags
- [ ] Due dates and reminders
- [ ] Task priority levels
- [ ] Search and filter functionality
- [ ] User authentication
- [ ] Task sharing and collaboration
- [ ] Mobile app version
- [ ] Offline support with PWA

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Provide steps to reproduce any bugs

---

Built with ❤️ using Next.js and Supabase
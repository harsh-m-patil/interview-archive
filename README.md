<div align="center">
  <img src="./assets/app.png" alt="App preview" />
  
  # Interview Archive

**Share interview questions with ease**

</div>

A comprehensive platform for storing, organizing, and sharing interview questions and answers. Built with modern web technologies to help developers prepare for technical interviews and contribute to the community knowledge base.

## Features

- **Question Management**: Create, edit, and organize interview questions with detailed content
- **Answer Tracking**: Provide and manage answers for interview questions
- **Tagging System**: Categorize questions with custom tags for easy filtering
- **Company & Role Filtering**: Filter questions by specific companies and job roles
- **User Authentication**: Secure user management with Better Auth
- **Responsive Design**: Modern UI built with shadcn/ui components and Tailwind CSS

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Authentication**: Better Auth
- **Database**: PostgreSQL with Prisma ORM
- **UI**: shadcn/ui components with Tailwind CSS
- **State Management**: Zustand & TanStack Query
- **Type Safety**: TypeScript with Zod validation

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- pnpm (recommended)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/harsh-m-patil/interview-archive.git
cd interview-archive
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

Configure your database URL and authentication secrets in `.env.local`.

4. Set up the database:

```bash
pnpm prisma migrate deploy
pnpm prisma db seed
```

5. Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint
- `pnpm typecheck` - Run TypeScript type checking

## Database Schema

The application uses a PostgreSQL database with the following main entities:

- **Users**: User accounts and authentication
- **Questions**: Interview questions with content, titles, and metadata
- **Answers**: User-provided answers to questions
- **Tags**: Categorization system for questions
- **Companies**: Company information for filtering
- **Roles**: Job role information for filtering

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

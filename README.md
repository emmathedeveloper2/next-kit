# NextKit ⚡  
**The ultimate Next.js auth starter powered by TailwindCSS, shadcn/ui, Drizzle ORM, and PostgreSQL.**

## 🧩 Stack

- **[Next.js](https://nextjs.org/)** – React framework for production-ready apps
- **[Tailwind CSS](https://tailwindcss.com/)** – Utility-first CSS for styling fast
- **[shadcn/ui](https://ui.shadcn.com/)** – Beautiful, accessible components built with Radix UI and Tailwind
- **[Drizzle ORM](https://orm.drizzle.team/)** – Lightweight, type-safe ORM for SQL
- **[PostgreSQL](https://www.postgresql.org/)** – Robust open-source SQL database
- **[Bun](https://bun.sh)** – All-in-one fast JavaScript runtime

## ✨ Features

- 🔐 Email/password authentication with sessions
- 🧩 Reusable UI components from `shadcn/ui`
- 🎨 Fully styled with TailwindCSS and themeable
- 📦 Bun-powered for blazing fast installs and scripts
- 🧪 Type-safe database layer with Drizzle ORM
- 🗃️ PostgreSQL integration with migrations
- 🚀 Production-ready setup with `.env` config

## 🚀 Getting Started

### 1. Clone the Repo

```bash
npx degit emmathedeveloper2/nextkit my-app
cd my-app
```

### 2. Install Dependencies (with Bun)

```bash
bun install
```

### 3. Set Up Your Database

Create a `.env` file based on `.env.example`:

```dotenv
DATABASE_URL="postgresql://user:password@localhost:5432/nextkit"
NEXTAUTH_SECRET="your-nextauth-secret"
```

Then push your schema:

```bash
bun run db:push
```

### 4. Start the Dev Server

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧱 Project Structure

```
.
├── app/                # Next.js app directory (routes, layouts)
├── components/         # Reusable UI components
├── db/                 # Drizzle schema & query logic
├── lib/                # Utils (auth, validation, helpers)
├── public/             # Static files
├── styles/             # Tailwind & global styles
├── drizzle/            # Migration files
├── .env                # Environment variables
├── tailwind.config.ts  # Tailwind config
└── next.config.js      # Next.js config
```

## 🔐 Auth Overview

- Built-in authentication with credentials
- Session handling via NextAuth or custom JWT/session logic
- Secure cookies with `httpOnly`
- Protect routes via middleware or server components

## 🧪 Scripts

| Script        | Description                      |
|---------------|----------------------------------|
| `dev`         | Start Next.js dev server         |
| `build`       | Build for production             |
| `start`       | Run production server            |
| `db:push`     | Push Drizzle schema              |
| `db:generate` | Generate Drizzle types           |
| `lint`        | Run ESLint                       |
| `format`      | Format code with Prettier        |

> All scripts run via `bun run <script>`

## 📦 Deployment

You can deploy NextKit to:

- **Vercel** (recommended for Next.js)
- **Railway**
- **Render**
- **Fly.io**

Just make sure to set your environment variables (`DATABASE_URL`, `NEXTAUTH_SECRET`, etc).

## 🙌 Contributing

Have ideas, improvements, or bugs to squash? PRs welcome!

---

Built with ❤️ by [@emmathedeveloper2](https://github.com/emmathedeveloper2)  
MIT License
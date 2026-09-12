# CoHoShop - Frontend

Welcome to the **CoHoShop** frontend repository. CoHoShop is a modern, fast, and responsive local marketplace platform designed to connect buyers and sellers seamlessly. 

This repository contains the client-facing Next.js application, featuring robust authentication, real-time rich text editing for product listings, and a highly polished UI powered by Tailwind CSS.

## 🚀 Tech Stack

- **Framework**: [Next.js (App Router)](https://nextjs.org/) (v16+)
- **Library**: [React](https://react.dev/) (v19)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (v4)
- **Authentication**: [Clerk](https://clerk.com/)
- **Form Handling & Validation**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Rich Text Editor**: [React Quill New](https://github.com/zenoamaro/react-quill)

## 📂 Project Structure

```text
src/
├── app/                  # Next.js App Router pages (routes, layout, page.jsx)
│   ├── (auth)/           # Clerk authentication routes (sign-in, sign-up)
│   ├── products/         # Public product browsing & details
│   └── saler/            # Protected seller dashboard (add/manage products)
├── components/           # Reusable UI components
│   ├── home/             # Landing page components (TrendingListings, Header, etc.)
│   ├── products/         # Product-specific components (ProductCard)
│   ├── saler/            # Seller-specific forms and components
│   └── ui/               # Base UI elements (buttons, inputs)
└── lib/                  
    └── schemas/          # Zod validation schemas
```

## 🛠️ Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v20+ recommended)
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-github-repo-url>
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up Environment Variables:**
   Create a `.env.local` file in the root of the project and add your required API keys. You will need your Clerk keys and backend API URL:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   
   # Provide the URL where your Node/Express backend is running
   NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the application running.

## 📜 Available Scripts

- `npm run dev`: Starts the development server with Hot Module Replacement.
- `npm run build`: Compiles and optimizes the application for production deployment.
- `npm run start`: Runs the compiled Next.js application in production mode.
- `npm run lint`: Runs ESLint to statically analyze your code and enforce stylistic conventions.

## 🚀 Deployment

The easiest way to deploy this Next.js application is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

1. Push this repository to GitHub.
2. Import the project into Vercel.
3. Add your Environment Variables (`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `NEXT_PUBLIC_API_URL`, etc.) in the Vercel dashboard.
4. Deploy!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! 
Feel free to check the [issues page](../../issues).

## 📄 License

This project is licensed under the MIT License.

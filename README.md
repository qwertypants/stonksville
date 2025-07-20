# Stonksville

Stonksville is a Next.js application that visualizes financial data and provides chat driven insights using OpenAI. Authentication is handled by Clerk. Charts and other components are written in TypeScript and use Tailwind CSS.

## Prerequisites

- Node.js 18 or higher
- npm (comes with Node) or pnpm
- An OpenAI API key
- Clerk credentials (publishable key and secret key)

## Installation

1. **Install dependencies**
   ```bash
   npm install
   ```
   or using pnpm:
   ```bash
   pnpm install
   ```

2. **Create an environment file**
   Copy `.env.example` to `.env.local` and fill in the required values.
   ```bash
   cp .env.example .env.local
   ```

3. **Populate environment variables**
   Open `.env.local` and provide your API keys.

## Running the project

Start the development server with:

```bash
npm run dev
```

or

```bash
pnpm dev
```

The application will be available at `http://localhost:3000` by default.

### Scripts

- `npm run dev` – start the development server
- `npm run lint` – run ESLint
- `npm run build` – create a production build
- `npm start` – run the built application

## Notes

- The file `lib/constants.ts` contains the base URL for the backend API (`https://dev-api.agentsmyth.com`). If you need to point to another API, adjust the `API_URL` constant.
- The project relies on Google Fonts during build time. If the build fails due to network restrictions (unable to download fonts), either allow access to `fonts.gstatic.com` or replace the fonts with local copies in `app/layout.tsx`.

## License

MIT

# Lead Capture

A full-stack lead generation tool built with Next.js (App Router), TypeScript, Tailwind CSS, and Supabase.

## Setup Instructions

1. Clone the repository and install dependencies:

   ```bash
   git clone https://github.com/YuqinLi1/Secco-Squared-Take_home
   npm install
   ```

2.Set up environment variables:
Create a .env.local file in the project root and add your Supabase credentials (see section below).

3.Run:

```bash
 npm run dev
```

Open http://localhost:3000 in your browser.

## Environment Variables Needed

You will need a Supabase project with a leads table. Add the following to your .env.local file:

Public variables for client-side operations (Insert)

NEXT_PUBLIC_SUPABASE_URL=https://froziylpbgoopaiyjvbr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyb3ppeWxwYmdvb3BhaXlqdmJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwMjM0MjYsImV4cCI6MjA5MzU5OTQyNn0.8nZwQPPkk60NDidBxB00Yflwv--D5WKa88-qsoNd0hI

Private variable for server-side operations (Bypassing RLS for /leads)

SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyb3ppeWxwYmdvb3BhaXlqdmJyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODAyMzQyNiwiZXhwIjoyMDkzNTk5NDI2fQ.XzXjp9QmnGZnjZ2MUIf0IjhZmI8JBgjM2V24_0yvJTs

## Anything You Should Know (Design Decisions)

Webhook Isolation: The external webhook is triggered server-side after the lead successfully persists in Supabase. If the webhook fails (e.g., network error or 500 response), the error is logged to the server console, but the user still receives a seamless success state.

Security & RLS: Row Level Security (RLS) is strictly enforced on the leads table. The public policy only permits INSERT operations. The /leads dashboard utilizes the Admin Service Role Key server-side to safely fetch and display data, ensuring public users cannot read the database.

Graceful Error Handling: Form submissions are wrapped in try/catch blocks. Duplicate email attempts are caught via Supabase's 23505 error code and display a user-friendly message rather than a generic failure.

X-Candidate-Name Header: The webhook is configured to send X-Candidate-Name: Yuqin Li in the headers as requested.

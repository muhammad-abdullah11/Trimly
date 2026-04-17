# Trimly ✨

Trimly is a modern, high-performance URL shortener built with cutting-edge web technologies. Designed for production scalability, Trimly provides robust features including secure authentication, detailed link analytics, and an intuitive administrative interface.

![Trimly Banner](https://via.placeholder.com/1200x400/101827/FFFFFF?text=Trimly+-+The+Modern+URL+Shortener)

## 🚀 Features

- **Blazing Fast URL Shortening:** Instantly convert long URLs into memorable, compact links.
- **Advanced Analytics & Tracking:** Gain actionable insights into your link performance. Track click counts, geographic origins, platforms, and user agents.
- **Secure Authentication & Authorization:** Comprehensive user management powered by NextAuth.js, including email verification, forgot/reset password flows, and secure credential hashing with `bcryptjs`.
- **Administrative Dashboard:** A fully equipped secure admin console to monitor platform activity, manage URLs, and oversee user engagement patterns.
- **Responsive & Dynamic UI:** A beautiful, responsive frontend built with TailwindCSS v4 and React 19, delivering exceptional user experiences across all devices.
- **Type-Safe Ecosystem:** Fully written in TypeScript for end-to-end type safety, minimizing runtime errors and improving developer experience.

## 🛠 Tech Stack

Trimly leverages a modern, production-grade technical stack:

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
- **UI Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Database:** [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/)
- **Email Service:** [Nodemailer](https://nodemailer.com/)
- **Data Parsing & ID Generation:** `ua-parser-js`, `nanoid`

## 🗂 Architecture Overview

The system architecture is designed around the Next.js App Router for optimal Server-Side Rendering (SSR) and API route handling:
- **Client Components:** Handle interactive UI elements like the dashboard, authentication forms, and dynamic charts.
- **Server Components & Actions:** Securely interact with MongoDB and manage sensitive operations without exposing proprietary logic to the client.
- **API Routes:** Robust RESTful endpoints under `app/api/...` managing user authentication, link generation, and analytics grouping.
- **Database:** MongoDB documents seamlessly modeled through Mongoose schemas (`ShortUrl`, `User`, etc.), ensuring data consistency and indexing for speed.

## 🚦 Getting Started

Follow these steps to set up the project locally for development or production deployment.

### Prerequisites
- Node.js (v20+ recommended)
- MongoDB instance (Atlas or local)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/muhammad-abdullah11/Trimly.git
   cd Trimly
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` or `.env.local` file in the root of the project with the following essential variables:
   ```env
   # Database connection
   MONGODB_URI=your_mongodb_connection_string

   # Authentication
   NEXTAUTH_SECRET=your_super_secret_key
   NEXTAUTH_URL=http://localhost:3000

   # Email Service (Nodemailer config)
   EMAIL_HOST=smtp.your-email-provider.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@domain.com
   EMAIL_PASS=your_email_password
   ```

4. **Run the Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📦 Building for Production

To create an optimized production build, run:
```bash
npm run build
```

This generates a `.next` folder with optimized static assets and server logic. To start the production server:
```bash
npm run start
```

## 🔐 Security Considerations

- Passwords are strictly hashed with salt rounds using `bcryptjs` before persisting to the DB.
- API endpoints strictly validate payloads and verify session consistency to prevent unauthorized data access.
- Sensitive environment variables are securely injected during runtime and never bundled with the client application.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request, report issues, or suggest new features to help continuously improve the Trimly ecosystem.

---

*Built with ❤️ utilizing the Next.js ecosystem.*

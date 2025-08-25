# doTask Service Marketplace – Frontend

This is the **frontend application** of the doTask Service Marketplace, built with **Next.js**. It connects with the backend API to provide users with a seamless service marketplace experience.

---

## 🚀 Tech Stack

* **Framework:** [Next.js](https://nextjs.org/) (App Router)
* **State Management:** Redux Toolkit
* **APIs:** REST APIs via fetch
* **Authentication:** Google OAuth (via backend integration)
* **Other Tools:** reCAPTCHA, Cloudinary, Stripe, Zoom

---

## 📂 Project Structure

```
frontend/
├── public/                 # Static assets
│   ├── assets/             # Images, icons, etc.
│   ├── fonts/              # Custom fonts
│
├── src/
│   ├── app/                # Next.js App Router pages & layouts
│   ├── components/         # Reusable React components
│   ├── const/              # Constant values (e.g., config, enums)
│   ├── hooks/              # Custom React hooks
│   ├── redux/              # Redux slices, store configuration
│   └── utils/              # Helper and utility functions
│
├── .gitignore              # Ignored files for Git
├── jsconfig.json           # Path aliases and JS config
├── next.config.mjs         # Next.js configuration
├── package.json            # Project dependencies and scripts
└── package-lock.json       # Dependency lock file
```

---

## ⚙️ Setup & Installation

1. **Clone the repository**

   git clone https://github.com/WajihulHassan944/service-marketplace
   cd doTask-frontend

2. **Install dependencies**

   npm install

3. **Configure Environment Variables**
   Create a `.env.local` file in the root directory with the required values:

   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key

4. **Run the development server**

   npm run dev

   The app will be available at [http://localhost:3000](http://localhost:3000).

---

## 📦 Available Scripts

* `npm run dev` – Start development server
* `npm run build` – Build for production
* `npm run start` – Run production build
* `npm run lint` – Run ESLint checks

---


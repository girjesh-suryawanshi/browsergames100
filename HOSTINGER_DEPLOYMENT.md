# 🚀 Hostinger Business Web Hosting Deployment Guide
## BrowserGames100 — React + Node.js + MySQL

This guide explains step-by-step how to deploy **BrowserGames100** on **Hostinger Business Web Hosting** using Node.js, MySQL database, and React frontend.

---

## 1. Create MySQL Database in Hostinger hPanel

1. Log in to **Hostinger hPanel**.
2. Go to **Databases** → **MySQL Databases**.
3. Create a new database:
   - **MySQL Database Name**: e.g., `u123456789_browsergames`
   - **MySQL Username**: e.g., `u123456789_admin`
   - **Password**: `YourStrongPassword123!`
4. Click **Create**.
5. Save these credentials — you will enter them into Hostinger Node.js environment variables.

---

## 2. Import Database Schema (phpMyAdmin — 1-Click)

1. Next to your new database in hPanel, click **Enter phpMyAdmin**.
2. Select your database name on the left sidebar.
3. Click the **Import** tab at the top.
4. Click **Choose File** and select `server/init-mysql.sql` from your project folder.
5. Click **Go** / **Import** at the bottom.
6. Done! All tables (`User`, `Category`, `BlogPost`) and the default admin (`admin@browsergames100.com` / `admin123`) are now initialized in MySQL.

---

## 3. Deploy Node.js Backend Application

1. In hPanel, go to **Websites** → **Add Website** or **Deploy Web App** (Node.js application).
2. Choose **Node.js** version: **18, 20, 22, or 24**.
3. Upload the contents of the `server/` folder (or connect your GitHub repository).
4. Set **Application Root**: `/` (or `/server`).
5. Set **Application Startup File**: `dist/index.js` (or `src/index.ts`).
6. Set **Environment Variables** in hPanel Node.js dashboard:

```env
NODE_ENV=production
PORT=3000
FRONTEND_URL=https://browsergames100.com
SITE_URL=https://browsergames100.com

DB_HOST=localhost
DB_PORT=3306
DB_NAME=u123456789_browsergames
DB_USER=u123456789_admin
DB_PASSWORD=YourStrongPassword123!

DATABASE_URL="mysql://u123456789_admin:YourStrongPassword123!@localhost:3306/u123456789_browsergames"

JWT_SECRET=replace_with_a_long_random_secret_key_browsergames100
INDEXNOW_KEY=
```

7. Click **NPM Install** and **Run Build** (`npm run build`).
8. Click **Start / Restart** application.

---

## 4. Deploy React Frontend

1. On your local machine or build server, build the production bundle:
   ```bash
   npm run build
   ```
2. Upload all files inside the `dist/` folder to your Hostinger `public_html` directory via hPanel **File Manager** or **FTP**.
3. Make sure `public_html/.htaccess` is uploaded (this ensures single-page application routing and forces HTTPS).

---

## 5. Verify & Test

1. Visit `https://browsergames100.com/` in your web browser.
2. Go to `https://browsergames100.com/admin/login`.
3. Log in using default credentials:
   - **Email**: `admin@browsergames100.com`
   - **Password**: `admin123`
4. Create, edit, publish, or delete blog posts directly into your Hostinger MySQL database!

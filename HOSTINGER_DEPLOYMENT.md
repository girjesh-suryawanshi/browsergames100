# 🚀 Hostinger Business Web Hosting Deployment Guide
## BrowserGames100 — React + Node.js + MySQL

This guide explains step-by-step how to deploy **BrowserGames100** on **Hostinger Business Web Hosting** using Node.js, MySQL database, and React frontend.

---

## 1. Create MySQL Database in Hostinger hPanel

1. Log in to **Hostinger hPanel**.
2. Go to **Databases** → **MySQL Databases**.
3. Create a new database:
   - **MySQL Database Name**: e.g., `u235459051_browsergames`
   - **MySQL Username**: e.g., `u235459051_admin`
   - **Password**: `Crompton@1310`  
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

DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=u235459051_browsergames
DB_USER=u235459051_admin
DB_PASSWORD=Crompton@1310

DATABASE_URL="mysql://u235459051_admin:Crompton@1310@127.0.0.1:3306/u235459051_browsergames"

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

---

## 6. How to Redeploy & Update Everything (Step-by-Step)

Follow these steps whenever you pull new code updates to your VPS / Hostinger server:

### Step 1: Update MySQL Database Schema
1. Open **phpMyAdmin** in your Hostinger / VPS control panel.
2. Select your database (`u235459051_browsergames`).
3. Click **Import** -> **Choose File** -> select the updated `server/init-mysql.sql` -> click **Import**.
   *(This safely creates any missing tables like `GameStat`, `UserFavorite`, `GameSubmission`, and `ContactMessage` using `CREATE TABLE IF NOT EXISTS`).*

### Step 2: Update & Rebuild Node.js Backend (`server/`)
1. Upload the updated `server/` files to your server (or run `git pull` if using Git).
2. In Hostinger Node.js Dashboard or VPS terminal:
   ```bash
   cd server
   npm install
   npm run build
   ```
3. Restart the Node.js application (Click **Restart** in Hostinger hPanel or run `pm2 restart server`).

### Step 3: Rebuild & Upload React Frontend (`dist/`)
1. On your local machine, run:
   ```bash
   npm run build
   ```
2. Upload the new contents of `dist/` to `public_html/` on Hostinger / VPS (overwrite existing assets).
3. Ensure `public_html/.htaccess` remains present for SPA routing.


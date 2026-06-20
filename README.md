# Katalog Jastip UAE - Indonesia 🇦🇪 ✈️ 🇮🇩

A beautiful, responsive, single-page customer-facing catalog for personal shopping (jastip) services from the United Arab Emirates to Indonesia, specializing in premium Dubai Kunafa Chocolate.

The web application is built using vanilla web technologies (HTML5, CSS3, and JavaScript) and designed with a premium, elegant color scheme to showcase items, manage a shopping cart with weight estimation, and generate a pre-filled WhatsApp checkout message.

---

## 🚀 Live Demo & Deployment

This project is fully static and designed to be hosted on **GitHub Pages**. 

To deploy this catalog to your own GitHub Pages:
1. Push this repository to GitHub (the `private/` folder is automatically ignored by `.gitignore`).
2. On GitHub, go to your repository's **Settings** > **Pages**.
3. Under **Build and deployment**, set the source to **Deploy from a branch**.
4. Select the `main` (or `master`) branch and the `/ (root)` folder, then click **Save**.
5. Once built, GitHub will provide a link to your live catalog (e.g., `https://<username>.github.io/<repository-name>/`).

---

## 🛠️ Features

- **Dynamic Data Loading**: Fetches and parses product details from a public CSV database (`data/product_list.csv`) and configurations from YAML (`data/config.yaml`).
- **Offline & Local Fallbacks**: If the website is opened directly from a file or encounters CORS limitations, it gracefully falls back to built-in static product and config data.
- **Search & Category Filter**: Allows users to filter chocolate products by category and search by name.
- **Shopping Cart Drawer**: Modern slide-over panel utilizing native HTML `<dialog>` element.
- **Weight Estimation**: Automatically estimates total luggage/package weight based on item sizes + packaging overhead (multiplier factor) to help keep track of baggage limits.
- **WhatsApp Checkout Integration**: Generates a pre-filled, structured text message detailing items, quantities, sub-totals, total price, and estimated weight, redirecting the customer directly to the admin's WhatsApp number.

---

## 📂 Project Structure

```text
├── assets/                  # Public product images (organized by product ID)
├── data/
│   ├── config.yaml          # WhatsApp checkout settings, greetings, and trip schedule
│   └── product_list.csv     # Cleaned, public product database (parsed by index.html)
├── private/                 # GIT-IGNORED: Original pricing sheets and reference docs
├── scripts/
│   └── process_private_csv.py  # Python script to download images and sanitize public data
├── .gitignore               # Ensures private data/credentials are not pushed to GitHub
├── index.html               # Main catalog web application
└── README.md                # Project documentation (this file)
```

---

## ⚙️ Running Locally

Because the webpage fetches `data/config.yaml` and `data/product_list.csv` dynamically, modern web browsers will block these requests under the `file://` protocol due to **CORS (Cross-Origin Resource Sharing)** rules.

To run and test the website locally, serve it using a local web server:

### Option 1: Python HTTP Server (Recommended)
If you have Python installed, run this command in your project root directory:
```bash
python3 -m http.server 8000
```
Then, open [http://localhost:8000](http://localhost:8000) in your browser.

### Option 2: VS Code Live Server
If you use VS Code, install the **Live Server** extension and click **"Go Live"** in the bottom status bar.

---

## 🔄 Data Pipeline (Updating the Catalog)

The project includes a Python automation script that handles processing raw price sheets, downloading remote images locally, and generating the clean public CSV.

### How to update product data:
1. Update or place your master spreadsheet in `private/Jastip UAE-Indo July 2026 - PriceList.csv` with columns: `id`, `category`, `product`, `size`, `unit`, `idr_sell`, and `image_link`.
2. Run the processing script:
   ```bash
   python scripts/process_private_csv.py
   ```
3. The script will:
   - Read the private CSV.
   - Automatically download images from `image_link` and save them under `assets/{id}/`.
   - Strip sensitive columns (like agent cost or private notes).
   - Write the sanitized database to `data/product_list.csv`.
4. Commit the changes in `data/` and `assets/` and push them to your repository to update the live catalog.

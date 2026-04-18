<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Three.js-0.184-000000?style=for-the-badge&logo=three.js" alt="Three.js" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
</p>

# 🧠 OncoVision — AI Tumor Intelligence Platform

> **OncoVision doesn't just detect tumors — it shows the future, helping doctors act before it's too late.**

OncoVision is a production-grade, AI-powered **brain tumor progression forecasting system** built for radiologists and oncologists. It goes beyond detection — it segments tumors from MRI scans, quantifies their properties, predicts growth trajectories over time, and enables clinicians to simulate the impact of different treatment decisions through an intuitive, visual-first interface.

---

## ✨ Features

### 📊 Clinical Dashboard
- Real-time patient overview with key metrics (total scans, high-risk cases, reports generated, prediction accuracy)
- Recent patient scans table with tumor type, risk level, and review status
- Risk distribution visualization

### 🔬 MRI Upload & Preprocessing
- Drag-and-drop upload zone with multi-format support (**NIfTI**, **DICOM**, **JPG/PNG**)
- Automatic file validation and format detection
- Live scan preview for image formats with 3D scan detection for volumetric data
- Patient information form (ID, name, age, gender, scan date)
- Step-by-step progress indicator (Upload → Segment → Predict → Report)

### 🧬 Tumor Segmentation
- 3D U-Net (primary) and 2D U-Net (fallback) model support
- Region classification: enhancing tumor, edema, necrotic core
- Tumor mask overlay visualization on MRI slices

### 📈 Growth Prediction Engine
- Mathematical growth models: **Logistic** and **Gompertz**
- Predicted tumor volume at 1-month, 3-month, and 6-month intervals
- Interactive growth curve charts

### 🧪 Treatment Simulation
- Treatment mode toggle: No Treatment / Chemotherapy / Radiation
- Growth parameter modification per treatment plan
- Comparative visualization of treated vs. untreated growth curves

### ⚠️ Risk Scoring System
- Composite risk score (0–100) derived from volume, aggressiveness, growth rate, and region
- Three-tier classification: **Low**, **Medium**, **High** risk
- Factor breakdown visualization

### 📄 Report Generation
- Auto-generated clinical PDF reports with tumor stats, growth predictions, risk levels, and visual snapshots
- Downloadable directly from the app

### 🧠 3D Brain Visualization
- Photorealistic, anatomically accurate brain model rendered with **Three.js**
- Interactive rotation, zoom, and inspection controls
- GLB-based high-fidelity mesh rendering

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                    FRONTEND                         │
│  Next.js 14 (App Router) + TypeScript               │
│  Tailwind CSS + shadcn/ui + Three.js + Recharts     │
├─────────────────────────────────────────────────────┤
│                    BACKEND                          │
│  Python + FastAPI                                   │
│  PyTorch + MONAI (Segmentation)                     │
│  Gompertz / Logistic Growth Models                  │
├─────────────────────────────────────────────────────┤
│                  ML PIPELINE                        │
│  MRI Input → Preprocess → Segment → Extract →      │
│  Growth Simulation → Output                         │
└─────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

| Layer        | Technology                                              |
| ------------ | ------------------------------------------------------- |
| **Framework**    | Next.js 14 (App Router)                                 |
| **Language**     | TypeScript                                              |
| **Styling**      | Tailwind CSS 3.4 + shadcn/ui                            |
| **3D Rendering** | Three.js 0.184                                          |
| **Charts**       | Recharts                                                |
| **Icons**        | Lucide React                                            |
| **Typography**   | Inter (Google Fonts via `next/font`)                     |
| **Backend**      | Python, FastAPI *(planned)*                              |
| **ML/AI**        | PyTorch, MONAI, BraTS Dataset *(planned)*                |

---

## 📁 Project Structure

```
OncoVision/
├── app/
│   ├── layout.tsx              # Root layout with sidebar + Inter font
│   ├── page.tsx                # Dashboard — patient overview & stats
│   ├── globals.css             # Global styles & design tokens
│   ├── mri-upload/
│   │   └── page.tsx            # MRI upload with drag-drop & preview
│   ├── segmentation/           # Tumor segmentation results
│   ├── prediction/             # Growth prediction charts
│   ├── simulation/             # Treatment simulation interface
│   ├── risk/                   # Risk score breakdown
│   └── reports/                # Report generation & PDF export
├── components/
│   ├── Sidebar.tsx             # Fixed navigation sidebar (260px)
│   ├── BrainViewer.tsx         # Three.js 3D brain visualization
│   └── ui/                     # shadcn/ui component library
├── lib/
│   └── utils.ts                # Utility functions (cn, etc.)
├── public/
│   └── brain.glb               # 3D brain model asset
├── PRD.md                      # Product Requirements Document
├── tailwind.config.ts          # Tailwind configuration & tokens
├── next.config.mjs             # Next.js configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies & scripts
```

---

## 🎨 Design System

| Token               | Value           | Usage                        |
| -------------------- | --------------- | ---------------------------- |
| **Primary**          | `#0F4C81`       | Deep medical blue — accents  |
| **Secondary**        | `#06B6D4`       | Cyan — highlights            |
| **Destructive/High** | Red             | High-risk indicators         |
| **Warning/Medium**   | Amber           | Medium-risk indicators       |
| **Success/Low**      | Green           | Low-risk / positive states   |
| **Typography**       | Inter           | All UI text                  |
| **Layout**           | 260px sidebar   | Fixed left navigation        |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x (or yarn / pnpm / bun)

### Installation

```bash
# Clone the repository
git clone https://github.com/karthik5033/OncoVision.git
cd OncoVision

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Available Scripts

| Command         | Description                       |
| --------------- | --------------------------------- |
| `npm run dev`   | Start development server          |
| `npm run build` | Create production build           |
| `npm run start` | Serve production build            |
| `npm run lint`  | Run ESLint for code quality       |

---

## 📸 Pages Overview

| Page                     | Route            | Description                                      |
| ------------------------ | ---------------- | ------------------------------------------------ |
| **Dashboard**            | `/`              | Patient overview, stats cards, recent scans table |
| **MRI Upload**           | `/mri-upload`    | Drag-drop upload, patient form, scan preview      |
| **Segmentation Results** | `/segmentation`  | Tumor overlay, region classification, volumes     |
| **Growth Prediction**    | `/prediction`    | Growth curves, month-by-month projections         |
| **Treatment Simulation** | `/simulation`    | Treatment toggle, comparative growth curves       |
| **Risk Score**           | `/risk`          | Composite score meter, factor breakdown           |
| **Reports**              | `/reports`       | PDF preview and export                            |

---

## 🔮 Roadmap

- [ ] Backend API integration (FastAPI + PyTorch)
- [ ] 3D U-Net tumor segmentation with BraTS dataset
- [ ] Gompertz & Logistic growth prediction engine
- [ ] Treatment simulation with real model outputs
- [ ] Auto-generated PDF clinical reports
- [ ] PACS integration for hospital workflows
- [ ] Real-time patient monitoring dashboard
- [ ] Multi-cancer extension (lung, liver, prostate)
- [ ] Personalized treatment optimization using patient history

---

## ⚠️ Disclaimer

> This application is a **research prototype** and is **not clinically validated** for real patient use. Growth models are mathematical approximations and should not be used for actual medical decision-making. Output quality is dependent on the BraTS dataset characteristics.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">
  Built with ❤️ for clinical AI innovation
</p>

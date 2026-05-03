OncoVision — Product Requirements Document
Version: 1.0
Status: In Development
Product Type: Clinical Decision Support Web Application

1. Product Overview
OncoVision is a production-grade, AI-powered brain tumor progression forecasting system built for doctors and radiologists. It goes beyond detection — it segments tumors from MRI scans, quantifies their properties, predicts how they will grow over time, and lets clinicians simulate the impact of different treatment decisions. The goal is to give clinicians a visual-first, intuitive tool that bridges raw AI output and actionable clinical insight.
One-line pitch: OncoVision doesn't just detect tumors — it shows the future, helping doctors act before it's too late.

2. Problem Statement
Early-stage brain tumor detection tools exist, but clinicians lack the ability to visualize how a tumor may evolve over weeks and months. There is no intuitive tool that combines detection, volumetric analysis, growth prediction, and treatment simulation in a single workflow. This gap leads to delayed interventions, poor patient communication, and reactive rather than proactive treatment planning.

3. Target Users
Primary: Radiologists and oncologists reviewing MRI scans and planning treatment
Secondary: Medical researchers studying tumor progression patterns
Demo context: Hackathon judges evaluating clinical AI innovation

4. Core Features
4.1 MRI Upload & Preprocessing

Accept NIfTI, DICOM, and JPG formats
Preprocessing pipeline: resize, normalize, slice extraction
Upload UI with drag-and-drop, file validation, and scan preview

4.2 Tumor Segmentation

Model: 3D U-Net (primary), 2D U-Net (fallback)
Dataset: BraTS (Brain Tumor Segmentation) from The Cancer Imaging Archive (~1,200+ patients, 3D MRI — T1, T1c, T2, FLAIR with ground truth masks)
Output: tumor mask, overlay visualization, region classification (enhancing tumor, edema, necrotic core)

4.3 Tumor Quantification

Compute tumor volume in mm³
Surface irregularity score
Growth region distribution across brain zones

4.4 Growth Prediction Engine

Models: Logistic Growth Model and Gompertz Model (recommended)
Inputs: initial tumor volume, aggressiveness score, time variable
Output: predicted tumor size at 1 month, 3 months, and 6 months

4.5 Simulation Engine

Visual progression timeline
Tumor expansion animation across time steps
Heatmap of high-risk spread regions

4.6 Treatment Simulation Mode

User selects: No Treatment / Chemotherapy / Radiation
System modifies growth parameters per treatment
Comparative visualization: treated vs untreated growth curves

4.7 Risk Scoring System

Composite score from 0–100
Three tiers: Low Risk, Medium Risk, High Risk
Score derived from volume, aggressiveness, growth rate, and region

4.8 Report Generation

Auto-generated PDF report containing tumor stats, growth predictions, risk level, and visual snapshots
Downloadable from within the app


5. System Architecture
Frontend

Next.js 14 (App Router), TypeScript
Tailwind CSS + shadcn/ui
Three.js for 3D tumor visualization
Chart.js / Recharts for growth graphs
lucide-react for iconography

Backend

Python, FastAPI
PyTorch + MONAI for segmentation model
Mathematical growth models (Gompertz, Logistic)

ML Pipeline Flow
MRI Input → Preprocessing → Segmentation Model → Feature Extraction → Growth Simulation → Output

6. Design System

Style: Clean, minimal, clinical — white and gray dominant
Primary accent: Deep medical blue (#0F4C81)
Secondary accent: Cyan (#06B6D4)
Risk colors: Red (high), Amber (medium), Green (low)
Typography: Inter
Layout: Fixed left sidebar (260px), content area right
Components: Cards with subtle shadows, pill badges, clean tables


7. Page Structure

Dashboard — patient overview, stats, recent scans table, risk distribution
MRI Upload — drag-and-drop upload, format validation, scan preview
Segmentation Results — tumor overlay, region classification, volume stats
Growth Prediction — chart, timeline, month-by-month projections
Treatment Simulation — treatment toggle, comparative curves
Risk Score — score meter, factor breakdown
Report — PDF preview, export


8. Evaluation Metrics
Segmentation: Dice Score, IoU
Prediction: Growth curve consistency, relative volume change accuracy

9. Limitations (v1.0)

Not clinically validated for real patient use
Growth models are mathematical approximations, not full biological simulations
Output quality is dependent on BraTS dataset characteristics


10. Future Scope

PACS integration for hospital workflows
Real-time patient monitoring dashboard
Personalized treatment optimization using patient history
Multi-cancer extension: lung, liver, prostate


11. Build Strategy
UI is built first, fully polished page by page, before any ML or backend wiring. This ensures a production-quality interface that can be demoed independently and then progressively brought to life with real model outputs.
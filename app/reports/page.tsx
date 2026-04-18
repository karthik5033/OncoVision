"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Table,
  Share2,
  CheckCircle2,
  Download,
  Printer,
  Mail,
  Check,
} from "lucide-react";
import Link from "next/link";

export default function ReportGenerationPage() {
  return (
    <div className="flex flex-col gap-6 p-8 pb-20 max-w-7xl mx-auto h-full overflow-y-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Report Generation
        </h1>
        <p className="text-sm font-medium text-text-secondary mt-1">
          Auto-generated clinical summary report for PT-8492
        </p>
      </div>

      {/* TOP ROW CHIPS */}
      <div className="flex flex-wrap items-center gap-3">
        {[
          "Report ID: RPT-20260418-8492",
          "Generated: April 18, 2026",
          "Status: Ready for Export",
        ].map((chip) => (
          <div
            key={chip}
            className="bg-[#EFF6FF] text-primary text-xs px-3 py-1.5 rounded-full font-medium border border-primary/10"
          >
            {chip}
          </div>
        ))}
      </div>

      {/* Main Split Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-2">
        {/* LEFT COLUMN (60% -> 7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Report Preview Card */}
          <Card className="shadow-sm border-border rounded-xl">
            <CardHeader className="pb-4 flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Report Preview</CardTitle>
              <Badge className="bg-green-500 hover:bg-green-600 text-white shadow-none border-none">
                Ready
              </Badge>
            </CardHeader>
            <CardContent>
              {/* Mock PDF Document */}
              <div className="min-h-[680px] bg-white border border-gray-200 shadow-md rounded-xl px-10 py-8 flex flex-col text-left font-sans">
                {/* TOP HEADER */}
                <div className="mb-4">
                  <h1 className="text-3xl font-bold text-primary">OncoVision</h1>
                  <p className="text-sm text-gray-500 font-medium mt-1">AI Tumor Intelligence Report</p>
                </div>
                
                <hr className="border-gray-200 mb-4" />
                
                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <p><span className="font-semibold text-gray-700">Patient ID:</span> PT-8492</p>
                    <p><span className="font-semibold text-gray-700">Name:</span> John Doe</p>
                    <p><span className="font-semibold text-gray-700">Age:</span> 54</p>
                    <p><span className="font-semibold text-gray-700">Gender:</span> Male</p>
                  </div>
                  <div>
                    <p><span className="font-semibold text-gray-700">Report Date:</span> April 18, 2026</p>
                    <p><span className="font-semibold text-gray-700">Scan ID:</span> SC-20240418-001</p>
                    <p><span className="font-semibold text-gray-700">Physician:</span> Dr. Admin</p>
                  </div>
                </div>

                <hr className="border-gray-200 mb-6" />

                {/* SECTION 1 — Tumor Segmentation Summary */}
                <div className="mb-6">
                  <h2 className="text-sm font-bold text-gray-900 border-l-4 border-primary pl-2 mb-3 uppercase tracking-wide">
                    Tumor Segmentation Summary
                  </h2>
                  <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-700 pl-3">
                    <p><span className="font-semibold">Tumor Type:</span> Glioblastoma</p>
                    <p><span className="font-semibold">WHO Grade:</span> IV</p>
                    <p><span className="font-semibold">Total Volume:</span> 69,200 mm³</p>
                    <p><span className="font-semibold">Largest Diameter:</span> 48.3 mm</p>
                    <p><span className="font-semibold">Location:</span> Right Frontal Lobe</p>
                    <p><span className="font-semibold">Segmentation Confidence:</span> 94.2%</p>
                  </div>
                </div>

                {/* SECTION 2 — Growth Prediction */}
                <div className="mb-6">
                  <h2 className="text-sm font-bold text-gray-900 border-l-4 border-primary pl-2 mb-3 uppercase tracking-wide">
                    Growth Prediction
                  </h2>
                  <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-700 pl-3">
                    <p><span className="font-semibold">Growth Model:</span> Gompertz</p>
                    <p><span className="font-semibold">1-Month Volume:</span> 84,500 mm³</p>
                    <p><span className="font-semibold">3-Month Volume:</span> 120,400 mm³</p>
                    <p><span className="font-semibold">6-Month Volume:</span> 174,800 mm³</p>
                    <p><span className="font-semibold">Growth Rate:</span> 0.312/month</p>
                    <p><span className="font-semibold">Time to Critical Mass:</span> 5.1 months</p>
                  </div>
                </div>

                {/* SECTION 3 — Treatment Recommendation */}
                <div className="mb-6">
                  <h2 className="text-sm font-bold text-gray-900 border-l-4 border-primary pl-2 mb-3 uppercase tracking-wide">
                    Treatment Recommendation
                  </h2>
                  <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-700 pl-3">
                    <p><span className="font-semibold">Recommended:</span> Radiation Therapy</p>
                    <p><span className="font-semibold">Projected Final Volume:</span> 72,100 mm³</p>
                    <p><span className="font-semibold">Volume Reduction:</span> 58.7%</p>
                    <p><span className="font-semibold">Sessions Required:</span> 30 fractions</p>
                  </div>
                </div>

                {/* SECTION 4 — Risk Assessment */}
                <div className="mb-8">
                  <h2 className="text-sm font-bold text-gray-900 border-l-4 border-primary pl-2 mb-3 uppercase tracking-wide">
                    Risk Assessment
                  </h2>
                  <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-700 pl-3">
                    <p><span className="font-semibold">Overall Risk Score:</span> 87/100</p>
                    <p className="flex items-center gap-2">
                      <span className="font-semibold">Risk Level:</span> 
                      <Badge className="bg-[#EF4444] text-white hover:bg-[#EF4444]/90 shadow-none border-none py-0 px-2 h-5">HIGH RISK</Badge>
                    </p>
                    <p><span className="font-semibold">Clinical Urgency:</span> Immediate action required</p>
                    <p><span className="font-semibold">Recommended Response:</span> Within 72 hours</p>
                  </div>
                </div>

                <div className="mt-auto">
                  <hr className="border-gray-200 mb-4" />
                  <div className="flex justify-between items-end">
                    <p className="text-xs text-gray-400 italic max-w-sm">
                      This report is generated by OncoVision AI and is intended for clinical decision support only. It does not constitute medical advice. All clinical decisions must be made by a licensed medical professional.
                    </p>
                    <p className="text-xs text-gray-400">
                      OncoVision v1.0 | Confidential
                    </p>
                  </div>
                </div>

              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN (40% -> 5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Export Options Card */}
          <Card className="shadow-sm border-border rounded-xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Export & Share</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                {/* PDF */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-50 rounded-lg">
                      <FileText className="h-5 w-5 text-red-500" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">PDF Report</p>
                      <p className="text-xs text-text-secondary">Full clinical report with visuals</p>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 text-xs font-semibold text-text-primary bg-transparent border border-border rounded-lg hover:bg-muted transition-colors">
                    Download PDF
                  </button>
                </div>
                {/* CSV */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-50 rounded-lg">
                      <Table className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">CSV Data</p>
                      <p className="text-xs text-text-secondary">Raw tumor metrics in spreadsheet format</p>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 text-xs font-semibold text-text-primary bg-transparent border border-border rounded-lg hover:bg-muted transition-colors">
                    Export CSV
                  </button>
                </div>
                {/* Share Link */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Share2 className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">Share Link</p>
                      <p className="text-xs text-text-secondary">Generate a secure shareable link</p>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 text-xs font-semibold text-text-primary bg-transparent border border-border rounded-lg hover:bg-muted transition-colors">
                    Copy Link
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Report Sections Card */}
          <Card className="shadow-sm border-border rounded-xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Report Contents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2.5">
                {[
                  "Patient Information",
                  "MRI Scan Metadata",
                  "Tumor Segmentation Results",
                  "Growth Prediction (6 months)",
                  "Treatment Simulation Comparison",
                  "Risk Score & Breakdown",
                  "Clinical Recommendations",
                  "AI Model Confidence Metrics",
                ].map((section) => (
                  <div key={section} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                    <span className="text-sm text-foreground font-medium">{section}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-text-secondary mt-4">
                All sections included in full export
              </p>
            </CardContent>
          </Card>

          {/* Recent Reports Card */}
          <Card className="shadow-sm border-border rounded-xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Recent Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col">
                {[
                  { id: "RPT-20260418-8492", pt: "PT-8492", date: "Apr 18", risk: "High Risk", riskColor: "bg-red-100 text-red-700" },
                  { id: "RPT-20260417-8491", pt: "PT-8491", date: "Apr 17", risk: "Low Risk", riskColor: "bg-green-100 text-green-700" },
                  { id: "RPT-20260416-8490", pt: "PT-8490", date: "Apr 16", risk: "Medium Risk", riskColor: "bg-yellow-100 text-yellow-700" },
                  { id: "RPT-20260415-8489", pt: "PT-8489", date: "Apr 15", risk: "High Risk", riskColor: "bg-red-100 text-red-700" },
                ].map((row, i, arr) => (
                  <div key={row.id} className={`flex items-center justify-between py-2.5 ${i !== arr.length - 1 ? "border-b border-border" : ""}`}>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-primary">{row.id}</span>
                      <span className="text-xs text-text-secondary">{row.pt} &bull; {row.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={`${row.riskColor} hover:${row.riskColor} shadow-none border-none text-[10px] py-0 h-5`}>
                        {row.risk}
                      </Badge>
                      <button className="text-gray-400 hover:text-gray-600 transition-colors">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions Card */}
          <Card className="shadow-sm border-border rounded-xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                <button className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-medium text-text-primary bg-transparent border border-border rounded-lg hover:bg-muted transition-colors">
                  <Printer className="h-4 w-4" />
                  Print Report
                </button>
                <button className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-medium text-text-primary bg-transparent border border-border rounded-lg hover:bg-muted transition-colors">
                  <Mail className="h-4 w-4" />
                  Email to Physician
                </button>
                <p className="text-xs text-text-secondary text-center mt-1">
                  Report auto-saved to patient record
                </p>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>

      {/* Bottom Full Width Action Bar */}
      <Card className="shadow-sm border-border rounded-xl mt-2 overflow-hidden shrink-0">
        <div className="flex flex-col md:flex-row items-center justify-between p-4 md:px-6 gap-4">
          
          {/* Left: Progress Indicator */}
          <div className="flex items-center gap-2 sm:gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">
                <Check className="h-3.5 w-3.5" />
              </div>
              <span className="text-sm font-medium text-primary whitespace-nowrap">
                Upload
              </span>
            </div>
            <div className="h-px w-8 sm:w-12 bg-primary"></div>
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">
                <Check className="h-3.5 w-3.5" />
              </div>
              <span className="text-sm font-medium text-primary whitespace-nowrap">
                Segment
              </span>
            </div>
            <div className="h-px w-8 sm:w-12 bg-primary"></div>
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">
                <Check className="h-3.5 w-3.5" />
              </div>
              <span className="text-sm font-medium text-primary whitespace-nowrap">
                Predict
              </span>
            </div>
            <div className="h-px w-8 sm:w-12 bg-primary"></div>
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">
                4
              </div>
              <span className="text-sm font-semibold text-primary whitespace-nowrap">
                Report
              </span>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
            <Link
              href="/prediction"
              className="px-4 py-2 text-sm font-medium text-text-primary bg-transparent border border-border rounded-lg hover:bg-muted transition-colors"
            >
              Back to Risk Score
            </Link>
            <button
              className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white rounded-lg transition-colors bg-primary hover:bg-primary/90"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}

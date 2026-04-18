"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Layers,
  ArrowRight,
  Check,
} from "lucide-react";
import Link from "next/link";
import BrainViewer from "@/components/BrainViewer";

export default function SegmentationResultsPage() {
  const regions = [
    {
      name: "Enhancing Tumor",
      desc: "Active tumor boundary",
      color: "bg-[#EF4444]",
      textColor: "text-[#EF4444]",
      pct: 18,
      vol: "12,400 mm³",
    },
    {
      name: "Edema Region",
      desc: "Peritumoral swelling",
      color: "bg-[#F59E0B]",
      textColor: "text-[#F59E0B]",
      pct: 45,
      vol: "31,200 mm³",
    },
    {
      name: "Necrotic Core",
      desc: "Dead tissue at center",
      color: "bg-[#6B7280]",
      textColor: "text-[#6B7280]",
      pct: 37,
      vol: "25,600 mm³",
    },
  ];

  const metrics = [
    { label: "Total Tumor Volume", value: "69,200 mm³" },
    { label: "Largest Diameter", value: "48.3 mm" },
    { label: "Surface Irregularity Score", value: "7.4 / 10" },
    { label: "Centroid Location", value: "Right Frontal Lobe" },
    { label: "Symmetry Index", value: "0.31 (Asymmetric)" },
  ];

  return (
    <div className="flex flex-col gap-6 p-8 pb-20 max-w-7xl mx-auto h-full overflow-y-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Segmentation Results
        </h1>
        <p className="text-sm font-medium text-text-secondary mt-1">
          Patient PT-8492 &bull; Glioblastoma &bull; Analyzed April 18, 2026
        </p>
      </div>

      {/* TOP ROW CHIPS */}
      <div className="flex flex-wrap items-center gap-3">
        {[
          "Scan ID: SC-20240418-001",
          "Modality: T1c + FLAIR",
          "Processing Time: 4.2s",
          "Model: 3D U-Net v2.1",
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
        {/* LEFT COLUMN (55%) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* MRI Viewer Card */}
          <Card className="shadow-sm border-border rounded-xl">
            <CardHeader className="pb-4 flex flex-row items-center justify-between">
              <CardTitle className="text-lg">3D Tumor Visualization</CardTitle>
              <Badge className="bg-[#0a0f1a] text-cyan-400 border-none shadow-none text-xs">
                3D • Interactive
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col">
                <div className="bg-[#0a0f1a] rounded-xl h-[420px] w-full flex flex-col relative overflow-hidden ring-1 ring-black/5">
                  <BrainViewer mode="static" tumorScale={0.45} />
                  
                  {/* Toolbar */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gray-800/80 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-4 z-10">
                    <ZoomIn className="h-4 w-4 text-gray-300 hover:text-white cursor-pointer transition-colors" />
                    <ZoomOut className="h-4 w-4 text-gray-300 hover:text-white cursor-pointer transition-colors" />
                    <RotateCcw className="h-4 w-4 text-gray-300 hover:text-white cursor-pointer transition-colors" />
                    <div className="w-px h-4 bg-gray-600"></div>
                    <Layers className="h-4 w-4 text-gray-300 hover:text-white cursor-pointer transition-colors" />
                    <Maximize2 className="h-4 w-4 text-gray-300 hover:text-white cursor-pointer transition-colors" />
                  </div>
                </div>

                <div className="text-center w-full mt-2">
                  <span className="text-[10px] text-text-secondary/70 italic">
                    Click and drag to rotate &bull; Scroll to zoom disabled
                  </span>
                </div>

                {/* Slice Navigator */}
                <div className="flex items-center gap-4 w-full mt-4 px-1">
                  <span className="text-sm font-semibold text-text-secondary">Slice</span>
                  <input
                    type="range"
                    min="1"
                    max="155"
                    defaultValue="42"
                    className="flex-1 accent-primary h-1.5 bg-muted rounded-full outline-none cursor-pointer"
                  />
                  <span className="text-xs font-semibold text-text-secondary w-12 text-right">
                    42 / 155
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Region Classification Card */}
          <Card className="shadow-sm border-border rounded-xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Detected Regions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-5">
                {regions.map((region) => (
                  <div key={region.name} className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`h-2.5 w-2.5 rounded-full ${region.color}`} />
                        <span className="font-semibold text-foreground text-sm">
                          {region.name}
                        </span>
                        <span className="hidden sm:inline text-xs text-text-secondary px-2">
                          &bull;
                        </span>
                        <span className="hidden sm:inline text-xs text-text-secondary">
                          {region.desc}
                        </span>
                      </div>
                      <span className="font-bold text-sm text-foreground">
                        {region.vol}
                      </span>
                    </div>
                    {/* Progress Bar */}
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full ${region.color} rounded-full`}
                          style={{ width: `${region.pct}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-text-secondary w-8 text-right">
                        {region.pct}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN (45%) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Tumor Metrics Card */}
          <Card className="shadow-sm border-border rounded-xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Quantification Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col">
                {metrics.map((metric, i) => (
                  <div
                    key={metric.label}
                    className={`flex items-center justify-between py-3 ${
                      i !== metrics.length - 1 ? "border-b border-border" : ""
                    }`}
                  >
                    <span className="text-sm font-medium text-text-secondary">
                      {metric.label}
                    </span>
                    <span className="font-bold text-sm text-primary">
                      {metric.value}
                    </span>
                  </div>
                ))}
                {/* Custom WHO Grade Metric */}
                <div className="flex items-center justify-between py-3 border-t border-border">
                  <span className="text-sm font-medium text-text-secondary">
                    WHO Grade (predicted)
                  </span>
                  <Badge className="bg-[#EF4444] text-white hover:bg-[#EF4444]/90 shadow-none border-none">
                    Grade IV
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Confidence & Model Card */}
          <Card className="shadow-sm border-border rounded-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Model Confidence</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 pt-4">
                {[
                  { value: "0.91", name: "Dice Score", desc: "Segmentation Accuracy" },
                  { value: "0.87", name: "IoU Score", desc: "Overlap Quality" },
                  { value: "94.2%", name: "Confidence", desc: "Overall Model Confidence" },
                ].map((stat) => (
                  <div key={stat.name} className="flex flex-col items-center justify-center text-center">
                    <span className="text-3xl font-bold text-primary mb-1">
                      {stat.value}
                    </span>
                    <span className="text-xs font-bold text-foreground">
                      {stat.name}
                    </span>
                    <span className="text-[10px] text-text-secondary mt-0.5 leading-tight">
                      {stat.desc}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Next Steps Card */}
          <Card className="shadow-sm border-border rounded-xl flex-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Recommended Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                {[
                  { text: "Proceed to Growth Prediction", href: "/prediction" },
                  { text: "Download Segmentation Mask", href: "#" },
                  { text: "Flag for Radiologist Review", href: "#" },
                ].map((action) => (
                  <Link
                    key={action.text}
                    href={action.href}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 transition-colors group cursor-pointer border border-transparent hover:border-blue-100"
                  >
                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {action.text}
                    </span>
                    <ArrowRight className="h-4 w-4 text-primary opacity-50 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
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
              <span className="text-sm font-semibold text-primary whitespace-nowrap">
                Upload
              </span>
            </div>
            <div className="h-px w-8 sm:w-12 bg-primary"></div>
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">
                2
              </div>
              <span className="text-sm font-semibold text-primary whitespace-nowrap">
                Segment
              </span>
            </div>
            <div className="h-px w-8 sm:w-12 bg-border"></div>
            <div className="flex items-center gap-2 opacity-50">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted-foreground text-white text-xs font-bold">
                3
              </div>
              <span className="text-sm font-medium text-text-secondary whitespace-nowrap">
                Predict
              </span>
            </div>
            <div className="h-px w-8 sm:w-12 bg-border"></div>
            <div className="flex items-center gap-2 opacity-50">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted-foreground text-white text-xs font-bold">
                4
              </div>
              <span className="text-sm font-medium text-text-secondary whitespace-nowrap">
                Report
              </span>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
            <Link
              href="/mri-upload"
              className="px-4 py-2 text-sm font-medium text-text-primary bg-transparent border border-border rounded-lg hover:bg-muted transition-colors"
            >
              Back to Upload
            </Link>
            <Link
              href="/prediction"
              className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white rounded-lg transition-colors bg-primary hover:bg-primary/90"
            >
              Proceed to Growth Prediction
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}

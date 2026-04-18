"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, FileText } from "lucide-react";
import Link from "next/link";

export default function RiskScorePage() {
  const breakdownFactors = [
    {
      name: "Tumor Volume",
      score: 88,
      weight: "×1.5",
      color: "bg-[#EF4444]",
      textColor: "text-[#EF4444]",
    },
    {
      name: "Growth Rate",
      score: 92,
      weight: "×1.4",
      color: "bg-[#EF4444]",
      textColor: "text-[#EF4444]",
    },
    {
      name: "WHO Grade",
      score: 100,
      weight: "×1.3",
      color: "bg-[#EF4444]",
      textColor: "text-[#EF4444]",
    },
    {
      name: "Location Risk",
      score: 75,
      weight: "×1.2",
      color: "bg-[#F59E0B]",
      textColor: "text-[#F59E0B]",
    },
    {
      name: "Surface Irregularity",
      score: 74,
      weight: "×1.1",
      color: "bg-[#F59E0B]",
      textColor: "text-[#F59E0B]",
    },
    {
      name: "Symmetry Index",
      score: 68,
      weight: "×1.0",
      color: "bg-[#F59E0B]",
      textColor: "text-[#F59E0B]",
    },
  ];

  const recommendations = [
    {
      title: "Neurosurgery Consultation",
      desc: "Schedule within 48–72 hours",
    },
    {
      title: "Radiation Oncology Referral",
      desc: "Initiate treatment planning immediately",
    },
    {
      title: "Repeat MRI in 2 Weeks",
      desc: "Monitor for acute progression",
    },
    {
      title: "Multidisciplinary Team Review",
      desc: "Tumor board discussion recommended",
    },
  ];

  return (
    <div className="flex flex-col gap-6 p-8 pb-20 max-w-7xl mx-auto h-full overflow-y-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Risk Score
        </h1>
        <p className="text-sm font-medium text-text-secondary mt-1">
          Composite risk assessment for PT-8492 based on segmentation, growth, and clinical factors
        </p>
      </div>

      {/* TOP ROW CHIPS */}
      <div className="flex flex-wrap items-center gap-3">
        {[
          "Patient: PT-8492",
          "Assessed: April 18, 2026",
          "WHO Grade: IV",
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
        {/* LEFT COLUMN (40%) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Overall Risk Score Card */}
          <Card className="shadow-sm border-border rounded-xl border-l-[4px] border-l-[#EF4444]">
            <CardHeader className="pb-0 text-center pt-8">
              <CardTitle className="text-lg">Overall Risk Score</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center pb-8">
              {/* Score Value */}
              <div className="mt-4 flex flex-col items-center">
                <span className="text-7xl font-black text-[#EF4444] leading-none">
                  87
                </span>
                <span className="text-sm text-text-secondary mt-2 font-medium">
                  out of 100
                </span>
              </div>

              {/* Status Badge */}
              <div className="mt-4 mb-6">
                <div className="bg-[#EF4444] text-white rounded-full text-lg font-bold px-6 py-2 tracking-wide uppercase">
                  High Risk
                </div>
              </div>

              <div className="w-full h-px bg-border/60 my-2"></div>

              {/* Ref Rows */}
              <div className="w-full flex flex-col gap-3 mt-4 px-4">
                <div className="flex items-center gap-2 text-text-secondary">
                  <div className="h-2 w-2 rounded-full bg-[#10B981]"></div>
                  <span className="text-sm font-medium">Low Risk: 0–39</span>
                </div>
                <div className="flex items-center gap-2 text-text-secondary">
                  <div className="h-2 w-2 rounded-full bg-[#F59E0B]"></div>
                  <span className="text-sm font-medium">Medium Risk: 40–69</span>
                </div>
                <div className="flex items-center gap-2 text-foreground font-bold">
                  <div className="h-2 w-2 rounded-full bg-[#EF4444]"></div>
                  <span className="text-sm">High Risk: 70–100</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Score Gauge Visual */}
          <Card className="shadow-sm border-border rounded-xl">
            <CardHeader className="pb-4 pt-5">
              <CardTitle className="text-lg text-center">Risk Gauge</CardTitle>
            </CardHeader>
            <CardContent className="pb-6">
              <div className="px-2">
                {/* Visual Bar */}
                <div className="relative w-full h-4 rounded-full overflow-hidden" 
                     style={{ background: "linear-gradient(to right, #10B981, #F59E0B, #EF4444)" }}>
                </div>
                
                {/* Alignment Trick for Indicator */}
                <div className="relative w-full h-0">
                   {/* Indicator pill positioned precisely over the bar via top offset */}
                   <div className="absolute top-[-20px] w-3 h-6 bg-gray-900 border-2 border-white rounded-full shadow-sm transform -translate-x-1/2" 
                        style={{ left: "87%" }}>
                   </div>
                </div>

                {/* Scale Markers */}
                <div className="flex justify-between mt-2 text-xs font-semibold text-text-secondary">
                  <span>0</span>
                  <span>50</span>
                  <span>100</span>
                </div>

                {/* Current Value Display Bottom */}
                <div className="text-center mt-3">
                  <span className="font-bold text-[#EF4444]">87 — High Risk</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Urgency Card */}
          <Card className="shadow-sm border-border rounded-xl">
             <CardHeader className="pb-2 hidden">
               <CardTitle>Clinical Urgency</CardTitle>
             </CardHeader>
             <CardContent className="p-6 text-center">
               <span className="text-sm font-bold text-text-secondary uppercase tracking-widest block mb-4">Clinical Urgency</span>
               <div className="flex items-center justify-center gap-3 mb-2">
                 <div className="h-3 w-3 bg-red-600 rounded-full animate-pulse"></div>
                 <span className="text-red-600 font-bold text-lg tracking-wide">
                   IMMEDIATE ACTION REQUIRED
                 </span>
               </div>
               <span className="text-sm font-medium text-text-secondary">
                 Recommended response within 72 hours
               </span>
             </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN (60%) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Score Breakdown Card */}
          <Card className="shadow-sm border-border rounded-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Risk Factor Breakdown</CardTitle>
              <p className="text-xs font-medium text-text-secondary">
                Score contribution per clinical dimension
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col">
                {breakdownFactors.map((factor, i) => (
                  <div
                    key={factor.name}
                    className={`flex flex-col py-3 ${
                      i !== breakdownFactors.length - 1 ? "border-b border-border/40" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-foreground w-[160px] truncate">
                        {factor.name}
                      </span>
                      <div className="flex-1 flex items-center px-4">
                        <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${factor.color}`}
                            style={{ width: `${factor.score}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 justify-end w-[130px]">
                        <span className={`text-sm font-bold ${factor.textColor} w-12 text-right`}>
                          {factor.score}/100
                        </span>
                        <span className="text-xs text-text-secondary font-medium w-10 text-right">
                          weight {factor.weight}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Comparative Context Card */}
          <Card className="shadow-sm border-border rounded-xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Population Comparison</CardTitle>
              <p className="text-xs font-medium text-text-secondary">
                How this patient compares to BraTS dataset
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="border border-border rounded-xl p-4 flex flex-col items-center justify-center text-center bg-white shadow-sm">
                    <span className="text-xl font-bold text-[#EF4444] mb-1">
                      Top 8%
                    </span>
                    <span className="text-xs font-medium text-text-secondary">
                      Risk Percentile
                    </span>
                  </div>
                  <div className="border border-border rounded-xl p-4 flex flex-col items-center justify-center text-center bg-white shadow-sm">
                    <span className="text-xl font-bold text-[#EF4444] mb-1">
                      Grade IV
                    </span>
                    <span className="text-xs font-medium text-text-secondary">
                      Tumor Classification
                    </span>
                  </div>
                  <div className="border border-border rounded-xl p-4 flex flex-col items-center justify-center text-center bg-white shadow-sm">
                    <span className="text-xl font-bold text-[#F59E0B] mb-1">
                      4.2 months
                    </span>
                    <span className="text-xs font-medium text-text-secondary">
                      Median Intervention Window
                    </span>
                  </div>
                </div>
                <p className="text-xs italic text-text-secondary text-center mt-1">
                  Score computed from 1,284 analyzed cases in the OncoVision database.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Recommended Actions Card */}
          <Card className="shadow-sm border-border rounded-xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Immediate Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                {recommendations.map((rec, i) => (
                  <div key={i} className="flex items-start gap-4 p-1">
                    <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-bold text-foreground">
                        {rec.title}
                      </span>
                      <span className="text-xs font-medium text-text-secondary">
                        {rec.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* BOTTOM ACTION BAR */}
      <Card className="shadow-sm border-border rounded-xl mt-2 overflow-hidden shrink-0">
        <div className="flex items-center justify-end p-4 md:px-6 gap-3 w-full">
          <Link
            href="/simulation"
            className="px-4 py-2 text-sm font-medium text-text-primary bg-transparent border border-border rounded-lg hover:bg-muted transition-colors"
          >
            Back to Treatment Simulation
          </Link>
          <Link
            href="/reports"
            className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white rounded-lg transition-colors bg-primary hover:bg-primary/90"
          >
            Generate Report
            <FileText className="h-4 w-4" />
          </Link>
        </div>
      </Card>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  XCircle,
  FlaskConical,
  Zap,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import BrainViewer from "@/components/BrainViewer";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type TreatmentType = "No Treatment" | "Chemotherapy" | "Radiation Therapy";

const chartData = [
  { month: 0, "No Treatment": 69200, Chemotherapy: 69200, "Radiation Therapy": 69200 },
  { month: 1, "No Treatment": 84500, Chemotherapy: 77400, "Radiation Therapy": 72100 },
  { month: 2, "No Treatment": 101800, Chemotherapy: 84100, "Radiation Therapy": 73800 },
  { month: 3, "No Treatment": 120400, Chemotherapy: 89600, "Radiation Therapy": 74200 },
  { month: 4, "No Treatment": 139600, Chemotherapy: 93800, "Radiation Therapy": 73600 },
  { month: 5, "No Treatment": 158200, Chemotherapy: 96400, "Radiation Therapy": 72900 },
  { month: 6, "No Treatment": 174800, Chemotherapy: 98200, "Radiation Therapy": 72100 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 shadow-xl border border-border rounded-xl flex flex-col gap-2 min-w-[200px]">
        <p className="font-semibold text-foreground text-sm border-b border-border pb-2 mb-1">{`Month ${label}`}</p>
        {payload.map((entry: any) => (
          <div key={entry.name} className="flex justify-between items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: entry.color || entry.stroke }}
              ></div>
              <span className="text-xs font-medium text-text-secondary">
                {entry.name}
              </span>
            </div>
            <span className="text-sm font-bold text-foreground">
              {(entry.value || 0).toLocaleString()} <span className="text-[10px] text-text-secondary font-normal">mm³</span>
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function TreatmentSimulationPage() {
  const [selectedTreatment, setSelectedTreatment] = useState<TreatmentType>("No Treatment");

  const sideEffectsRules = {
    "No Treatment": [
      "Continued neurological decline",
      "Increased intracranial pressure",
      "Seizure risk elevation",
    ],
    Chemotherapy: [
      "Nausea and fatigue (common)",
      "Myelosuppression risk",
      "Hair loss (moderate)",
    ],
    "Radiation Therapy": [
      "Radiation necrosis (rare)",
      "Cognitive effects (monitored)",
      "Fatigue during treatment",
    ],
  };

  const currentStatsRules = {
    "No Treatment": {
      bannerBg: "bg-red-50",
      bannerBorder: "border-red-200",
      bannerText: "text-red-700",
      bannerIcon: "⚠",
      bannerMsg: "Without intervention, tumor reaches critical mass within 5.1 months",
      stats: [
        { label: "Final Volume", value: "174,800 mm³" },
        { label: "Time to Critical", value: "5.1 months" },
        { label: "Survival Probability", value: "Low" },
      ],
    },
    Chemotherapy: {
      bannerBg: "bg-blue-50",
      bannerBorder: "border-blue-200",
      bannerText: "text-blue-700",
      bannerIcon: "ℹ",
      bannerMsg: "Temozolomide reduces proliferation rate by ~45%",
      stats: [
        { label: "Final Volume", value: "98,200 mm³" },
        { label: "Reduction", value: "43.8%" },
        { label: "Protocol Duration", value: "6 cycles" },
      ],
    },
    "Radiation Therapy": {
      bannerBg: "bg-green-50",
      bannerBorder: "border-green-200",
      bannerText: "text-green-700",
      bannerIcon: "✓",
      bannerMsg: "Radiation achieves near-stabilization by month 4",
      stats: [
        { label: "Final Volume", value: "72,100 mm³" },
        { label: "Reduction", value: "58.7%" },
        { label: "Sessions Required", value: "30 fractions" },
      ],
    },
  };

  const getOpacity = (name: string) => {
    return selectedTreatment === name ? 1 : 0.4;
  };

  return (
    <div className="flex flex-col gap-6 p-8 pb-20 max-w-7xl mx-auto h-full overflow-y-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Treatment Simulation
        </h1>
        <p className="text-sm font-medium text-text-secondary mt-1">
          Compare tumor progression across treatment scenarios for PT-8492
        </p>
      </div>

      {/* TOP ROW CHIPS */}
      <div className="flex flex-wrap items-center gap-3">
        {[
          "Baseline Volume: 69,200 mm³",
          "Simulation Period: 6 Months",
          "Growth Model: Gompertz",
        ].map((chip) => (
          <div
            key={chip}
            className="bg-[#EFF6FF] text-primary text-xs px-3 py-1.5 rounded-full font-medium border border-primary/10"
          >
            {chip}
          </div>
        ))}
      </div>

      {/* TREATMENT SELECTOR */}
      <Card className="shadow-sm border-border rounded-xl">
        <CardHeader className="pb-3 pt-5">
          <CardTitle className="text-lg">Select Treatment Scenario</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Card 1 */}
            <div
              onClick={() => setSelectedTreatment("No Treatment")}
              className={`p-5 rounded-xl cursor-pointer transition-all border flex flex-col gap-3 relative overflow-hidden ${
                selectedTreatment === "No Treatment"
                  ? "border-2 border-primary bg-[#EFF6FF] shadow-md"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="bg-red-100 p-2 rounded-lg shrink-0">
                  <XCircle className="h-5 w-5 text-red-600" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-foreground text-[15px]">
                    No Treatment
                  </span>
                  <span className="text-xs text-text-secondary mt-0.5 leading-relaxed">
                    Natural tumor progression without intervention
                  </span>
                </div>
              </div>
              <div className="mt-1">
                <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-none shadow-none text-[10px] px-2 py-0.5">
                  0% reduction
                </Badge>
              </div>
            </div>

            {/* Card 2 */}
            <div
              onClick={() => setSelectedTreatment("Chemotherapy")}
              className={`p-5 rounded-xl cursor-pointer transition-all border flex flex-col gap-3 relative overflow-hidden ${
                selectedTreatment === "Chemotherapy"
                  ? "border-2 border-primary bg-[#EFF6FF] shadow-md"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 p-2 rounded-lg shrink-0">
                  <FlaskConical className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-foreground text-[15px]">
                    Chemotherapy
                  </span>
                  <span className="text-xs text-text-secondary mt-0.5 leading-relaxed">
                    Temozolomide-based systemic treatment protocol
                  </span>
                </div>
              </div>
              <div className="mt-1">
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-none shadow-none text-[10px] px-2 py-0.5">
                  ~45% growth reduction
                </Badge>
              </div>
            </div>

            {/* Card 3 */}
            <div
              onClick={() => setSelectedTreatment("Radiation Therapy")}
              className={`p-5 rounded-xl cursor-pointer transition-all border flex flex-col gap-3 relative overflow-hidden ${
                selectedTreatment === "Radiation Therapy"
                  ? "border-2 border-primary bg-[#EFF6FF] shadow-md"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="bg-amber-100 p-2 rounded-lg shrink-0">
                  <Zap className="h-5 w-5 text-amber-600" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-foreground text-[15px]">
                    Radiation Therapy
                  </span>
                  <span className="text-xs text-text-secondary mt-0.5 leading-relaxed">
                    Focused beam radiotherapy targeting tumor mass
                  </span>
                </div>
              </div>
              <div className="mt-1">
                <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-none shadow-none text-[10px] px-2 py-0.5">
                  ~62% growth reduction
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* HERO SECTION */}
      <Card className="bg-[#0a0f1a] border-none shadow-xl rounded-xl overflow-hidden mt-4">
        <div className="flex flex-col md:flex-row h-auto md:h-[480px]">
          {/* Left half 3D Viewer */}
          <div className="w-full md:w-[60%] h-[300px] md:h-full relative">
            <BrainViewer
              mode="simulate"
              tumorScale={0.45}
              targetScale={
                selectedTreatment === "No Treatment" ? 0.94 :
                selectedTreatment === "Chemotherapy" ? 0.58 : 0.42
              }
            />
          </div>
          {/* Right half Stats Panel */}
          <div className="w-full md:w-[40%] bg-gray-900/50 p-8 flex flex-col justify-center border-t md:border-t-0 md:border-l border-gray-800">
            <h3 className="text-white font-bold text-xl mb-1">6-Month Projection</h3>
            <h2 className="text-cyan-400 text-3xl font-bold mb-8">{selectedTreatment}</h2>
            
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1 pb-4 border-b border-gray-800">
                <span className="text-gray-400 text-sm font-medium">Final Volume</span>
                <span className="text-white font-bold text-2xl">
                  {currentStatsRules[selectedTreatment].stats[0].value}
                </span>
              </div>
              
              <div className="flex flex-col gap-1 pb-4 border-b border-gray-800">
                <span className="text-gray-400 text-sm font-medium">Growth Change</span>
                <span className={`font-bold text-xl ${
                  selectedTreatment === "No Treatment" ? "text-red-500" :
                  selectedTreatment === "Chemotherapy" ? "text-amber-500" : "text-green-500"
                }`}>
                  {selectedTreatment === "No Treatment" ? "+152.6%" :
                   selectedTreatment === "Chemotherapy" ? "+41.9%" : "+4.2%"}
                </span>
              </div>
              
              <div className="flex flex-col gap-1 pb-4 border-b border-gray-800">
                <span className="text-gray-400 text-sm font-medium">Outcome Status</span>
                <div>
                  <Badge className={`border-none shadow-none mt-1 ${
                    selectedTreatment === "No Treatment" ? "bg-red-500 hover:bg-red-600 text-white" :
                    selectedTreatment === "Chemotherapy" ? "bg-amber-500 hover:bg-amber-600 text-white" : "bg-green-500 hover:bg-green-600 text-white"
                  }`}>
                    {selectedTreatment === "No Treatment" ? "Critical" :
                     selectedTreatment === "Chemotherapy" ? "Monitored" : "Stable"}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                <span>Tumor Reduction</span>
                <span>
                  {selectedTreatment === "No Treatment" ? "0%" :
                   selectedTreatment === "Chemotherapy" ? "43.8%" : "58.7%"}
                </span>
              </div>
              <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${
                    selectedTreatment === "No Treatment" ? "bg-red-500" :
                    selectedTreatment === "Chemotherapy" ? "bg-amber-500" : "bg-green-500"
                  }`} 
                  style={{ width: selectedTreatment === "No Treatment" ? "0%" : selectedTreatment === "Chemotherapy" ? "43.8%" : "58.7%" }} 
                />
              </div>
            </div>
            
            <span className="text-gray-500 text-xs italic mt-auto pt-4 text-center">
              Rotate brain to explore
            </span>
          </div>
        </div>
      </Card>

      {/* Main Split Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-2">
        {/* LEFT COLUMN (65%) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Comparative Chart Card */}
          <Card className="shadow-sm border-border rounded-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">
                Volume Progression Comparison
              </CardTitle>
              <p className="text-xs text-text-secondary font-medium">
                All three scenarios overlaid
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-[340px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData}
                    margin={{ top: 10, right: 30, left: 10, bottom: 5 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#F3F4F6"
                    />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#6B7280", fontSize: 12 }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#6B7280", fontSize: 12 }}
                      tickFormatter={(value) => `${value / 1000}k`}
                      dx={-10}
                    />
                    <Tooltip content={<CustomTooltip />} />

                    <Line
                      type="monotone"
                      dataKey="No Treatment"
                      stroke="#EF4444"
                      strokeWidth={2.5}
                      dot={false}
                      activeDot={{ r: 6, fill: "#EF4444", strokeWidth: 0 }}
                      strokeOpacity={getOpacity("No Treatment")}
                    />
                    <Line
                      type="monotone"
                      dataKey="Chemotherapy"
                      stroke="#06B6D4"
                      strokeWidth={2.5}
                      strokeDasharray="5 5"
                      dot={false}
                      activeDot={{ r: 6, fill: "#06B6D4", strokeWidth: 0 }}
                      strokeOpacity={getOpacity("Chemotherapy")}
                    />
                    <Line
                      type="monotone"
                      dataKey="Radiation Therapy"
                      stroke="#10B981"
                      strokeWidth={2.5}
                      strokeDasharray="8 4"
                      dot={false}
                      activeDot={{ r: 6, fill: "#10B981", strokeWidth: 0 }}
                      strokeOpacity={getOpacity("Radiation Therapy")}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              {/* Legend visually integrated */}
              <div className="flex flex-wrap items-center justify-center gap-6 mt-6">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-1 bg-[#EF4444] rounded"></div>
                  <span className="text-xs font-semibold text-text-secondary">
                    No Treatment
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-1 rounded" style={{ backgroundImage: "linear-gradient(to right, #06B6D4 50%, transparent 50%)", backgroundSize: "8px 100%" }}></div>
                  <span className="text-xs font-semibold text-text-secondary">
                    Chemotherapy
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-1 rounded" style={{ backgroundImage: "linear-gradient(to right, #10B981 70%, transparent 70%)", backgroundSize: "12px 100%" }}></div>
                  <span className="text-xs font-semibold text-text-secondary">
                    Radiation
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Outcome Summary Table */}
          <Card className="shadow-sm border-border rounded-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">6-Month Outcome Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Scenario</TableHead>
                    <TableHead>Final Volume</TableHead>
                    <TableHead className="hidden sm:table-cell">Total Growth</TableHead>
                    <TableHead className="hidden md:table-cell">Reduction vs Baseline</TableHead>
                    <TableHead>Outcome</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow
                    className={`${
                      selectedTreatment === "No Treatment" ? "bg-[#EFF6FF] hover:bg-[#EFF6FF]/90" : ""
                    }`}
                  >
                    <TableCell className="font-semibold text-foreground">No Treatment</TableCell>
                    <TableCell className="font-bold text-foreground">174,800 mm³</TableCell>
                    <TableCell className="hidden sm:table-cell text-text-secondary">+152.6%</TableCell>
                    <TableCell className="hidden md:table-cell text-text-secondary">—</TableCell>
                    <TableCell>
                      <Badge className="bg-[#EF4444] text-white hover:bg-[#EF4444]/90 shadow-none border-none">
                        Critical
                      </Badge>
                    </TableCell>
                  </TableRow>

                  <TableRow
                    className={`${
                      selectedTreatment === "Chemotherapy" ? "bg-[#EFF6FF] hover:bg-[#EFF6FF]/90" : ""
                    }`}
                  >
                    <TableCell className="font-semibold text-foreground">Chemotherapy</TableCell>
                    <TableCell className="font-bold text-foreground">98,200 mm³</TableCell>
                    <TableCell className="hidden sm:table-cell text-text-secondary">+41.9%</TableCell>
                    <TableCell className="hidden md:table-cell text-text-secondary">43.8%</TableCell>
                    <TableCell>
                      <Badge className="bg-[#F59E0B] text-white hover:bg-[#F59E0B]/90 shadow-none border-none">
                        Monitored
                      </Badge>
                    </TableCell>
                  </TableRow>

                  <TableRow
                    className={`${
                      selectedTreatment === "Radiation Therapy" ? "bg-[#EFF6FF] hover:bg-[#EFF6FF]/90" : ""
                    }`}
                  >
                    <TableCell className="font-semibold text-foreground">Radiation</TableCell>
                    <TableCell className="font-bold text-foreground">72,100 mm³</TableCell>
                    <TableCell className="hidden sm:table-cell text-text-secondary">+4.2%</TableCell>
                    <TableCell className="hidden md:table-cell text-text-secondary">58.7%</TableCell>
                    <TableCell>
                      <Badge className="bg-[#10B981] text-white hover:bg-[#10B981]/90 shadow-none border-none">
                        Stable
                      </Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN (35%) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Selected Scenario Detail Card */}
          <Card className="shadow-sm border-border rounded-xl">
            <CardHeader className="pb-3 border-b border-border/40">
              <CardTitle className="text-lg">{selectedTreatment}</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex flex-col gap-5">
                {/* Dynamic Banner */}
                <div
                  className={`flex items-start gap-3 p-3 rounded-xl border ${currentStatsRules[selectedTreatment].bannerBorder} ${currentStatsRules[selectedTreatment].bannerBg}`}
                >
                  <span className={`font-bold mt-0.5 ${currentStatsRules[selectedTreatment].bannerText}`}>
                    {currentStatsRules[selectedTreatment].bannerIcon}
                  </span>
                  <p className={`text-sm font-semibold leading-snug ${currentStatsRules[selectedTreatment].bannerText}`}>
                    {currentStatsRules[selectedTreatment].bannerMsg}
                  </p>
                </div>

                {/* Specific Stats */}
                <div className="flex flex-col gap-3">
                  {currentStatsRules[selectedTreatment].stats.map((stat, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between pb-2 border-b border-border/40 last:border-0 last:pb-0"
                    >
                      <span className="text-sm font-medium text-text-secondary">
                        {stat.label}
                      </span>
                      <span className="font-bold text-sm text-foreground">
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommendation Card */}
          <Card className="shadow-sm border-border rounded-xl border-l-[3px] border-l-[#10B981]">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">AI Recommendation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <span className="font-bold text-primary">
                  Radiation Therapy — Preferred
                </span>
                <p className="text-sm font-medium text-text-secondary leading-relaxed tracking-wide">
                  Based on tumor grade, location, and growth pattern, radiation
                  therapy offers the highest volume reduction with the most
                  favorable 6-month outcome for this patient profile.
                </p>
                <p className="text-[10px] text-text-secondary/70 italic mt-3">
                  This is an AI-generated suggestion. Clinical decisions must be
                  made by a licensed medical professional.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Side Effects Card */}
          <Card className="shadow-sm border-border rounded-xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Known Side Effects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                {sideEffectsRules[selectedTreatment].map((effect, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <AlertCircle className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-foreground">
                      {effect}
                    </span>
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
            href="/prediction"
            className="px-4 py-2 text-sm font-medium text-text-primary bg-transparent border border-border rounded-lg hover:bg-muted transition-colors"
          >
            Back to Growth Prediction
          </Link>
          <Link
            href="/risk"
            className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white rounded-lg transition-colors bg-primary hover:bg-primary/90"
          >
            View Risk Score
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Card>
    </div>
  );
}

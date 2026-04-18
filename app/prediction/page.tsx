"use client";

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
import { ArrowRight, Check, Info, Lightbulb } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import BrainViewer from "@/components/BrainViewer";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const chartData = [
  { month: 0, volume: 69200 },
  { month: 1, volume: 84500 },
  { month: 2, volume: 101800 },
  { month: 3, volume: 120400 },
  { month: 4, volume: 139600 },
  { month: 5, volume: 158200 },
  { month: 6, volume: 174800 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-md border border-border rounded-lg">
        <p className="font-semibold text-foreground text-xs">{`Month ${label}`}</p>
        <p className="text-sm text-primary font-bold">
          {`Volume: ${payload[0].value.toLocaleString()} mm³`}
        </p>
      </div>
    );
  }
  return null;
};

export default function GrowthPredictionPage() {
  const [selectedMonth, setSelectedMonth] = useState(0);
  const monthScales = [0.45, 0.52, 0.60, 0.70, 0.79, 0.87, 0.94];

  return (
    <div className="flex flex-col gap-6 p-8 pb-20 max-w-7xl mx-auto h-full overflow-y-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Growth Prediction
        </h1>
        <p className="text-sm font-medium text-text-secondary mt-1">
          Tumor progression forecast for PT-8492 based on Gompertz growth model
        </p>
      </div>

      {/* TOP ROW CHIPS */}
      <div className="flex flex-wrap items-center gap-3">
        {[
          "Model: Gompertz Growth",
          "Initial Volume: 69,200 mm³",
          "Aggressiveness Score: 8.2 / 10",
        ].map((chip) => (
          <div
            key={chip}
            className="bg-[#EFF6FF] text-primary text-xs px-3 py-1.5 rounded-full font-medium border border-primary/10"
          >
            {chip}
          </div>
        ))}
      </div>

      {/* NEW TUMOR VOLUME VISUALIZATION CARD */}
      <Card className="shadow-sm border-border rounded-xl">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Tumor Volume Visualization</CardTitle>
          <Badge className="bg-[#0a0f1a] text-cyan-400 border-none shadow-none text-xs">
            Live Simulation
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="bg-[#0a0f1a] rounded-xl h-[360px] w-full flex flex-col relative overflow-hidden ring-1 ring-black/5">
            <BrainViewer 
              mode={selectedMonth === 0 ? "pulse" : "simulate"} 
              tumorScale={0.45} 
              targetScale={monthScales[selectedMonth]} 
            />
          </div>
          
          <div className="flex flex-col items-center mt-4 gap-2">
            <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1">
              {["Baseline", "1M", "2M", "3M", "4M", "5M", "6M"].map((label, idx) => (
                <button
                  key={label}
                  onClick={() => setSelectedMonth(idx)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
                    selectedMonth === idx
                      ? "bg-cyan-400 text-[#0a0f1a]"
                      : "bg-[#0a0f1a] text-gray-400 hover:bg-gray-800"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <span className="text-xs text-text-secondary mt-1">
              Tumor size at selected timepoint (Gompertz model)
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Main Split Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-2">
        {/* LEFT COLUMN (65%) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Growth Curve Chart Card */}
          <Card className="shadow-sm border-border rounded-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">
                Predicted Tumor Volume Over Time
              </CardTitle>
              <p className="text-xs text-text-secondary font-medium">
                Projected without treatment intervention
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-[320px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
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
                    <Area
                      type="monotone"
                      dataKey="volume"
                      stroke="#EF4444"
                      strokeWidth={3}
                      fill="#EF4444"
                      fillOpacity={0.08}
                      activeDot={{ r: 6, fill: "#EF4444", stroke: "#fff", strokeWidth: 2 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Breakdown Table Card */}
          <Card className="shadow-sm border-border rounded-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Month-by-Month Projection</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timepoint</TableHead>
                    <TableHead>Predicted Volume</TableHead>
                    <TableHead>Growth Rate</TableHead>
                    <TableHead>Change</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="bg-[#EFF6FF] hover:bg-[#EFF6FF]/80">
                    <TableCell className="font-semibold text-primary">Baseline</TableCell>
                    <TableCell className="font-medium">69,200 mm³</TableCell>
                    <TableCell className="text-text-secondary">—</TableCell>
                    <TableCell className="text-text-secondary">—</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-white text-primary border-primary/20">
                        Current
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-foreground">1 Month</TableCell>
                    <TableCell>84,500 mm³</TableCell>
                    <TableCell className="text-[#F59E0B] font-medium">22.1%</TableCell>
                    <TableCell className="text-text-secondary">+15,300</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-muted text-muted-foreground hover:bg-muted/80 shadow-none border-none">
                        Projected
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-foreground">3 Months</TableCell>
                    <TableCell>120,400 mm³</TableCell>
                    <TableCell className="text-[#EF4444] font-medium">42.5%</TableCell>
                    <TableCell className="text-text-secondary">+51,200</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-muted text-muted-foreground hover:bg-muted/80 shadow-none border-none">
                        Projected
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-foreground">6 Months</TableCell>
                    <TableCell>174,800 mm³</TableCell>
                    <TableCell className="text-[#EF4444] font-bold">152.6%</TableCell>
                    <TableCell className="text-text-secondary">+105,600</TableCell>
                    <TableCell>
                      <Badge className="bg-[#EF4444] text-white hover:bg-[#EF4444]/90 shadow-none border-none">
                        Critical
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
          {/* Model Parameters Card */}
          <Card className="shadow-sm border-border rounded-xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Gompertz Model Parameters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col">
                {[
                  { label: "Carrying Capacity (K)", value: "285,000 mm³" },
                  { label: "Growth Rate (r)", value: "0.312 per month" },
                  { label: "Displacement (α)", value: "2.14" },
                  { label: "R² Fit Score", value: "0.971" },
                  { label: "Model Confidence", value: "94.2%" },
                ].map((param, i) => (
                  <div
                    key={param.label}
                    className={`flex items-center justify-between py-2.5 ${
                      i !== 4 ? "border-b border-border/60" : ""
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-medium text-text-secondary">
                        {param.label}
                      </span>
                      <Info className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                    <span className="font-bold text-sm text-primary">
                      {param.value}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Risk Trajectory Card */}
          <Card className="shadow-sm border-border rounded-xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Risk Trajectory</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col">
                {/* 1 Month */}
                <div className="flex flex-col py-3 border-b border-border gap-1 border-l-2 border-l-[#F59E0B] pl-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-foreground">1 Month</span>
                    <Badge className="bg-[#F59E0B] text-white hover:bg-[#F59E0B]/90 shadow-none border-none">
                      Medium Risk
                    </Badge>
                  </div>
                  <span className="text-xs text-text-secondary">
                    Rapid expansion phase initiated
                  </span>
                </div>

                {/* 3 Months */}
                <div className="flex flex-col py-3 border-b border-border gap-1 border-l-2 border-l-[#EF4444] pl-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-foreground">3 Months</span>
                    <Badge className="bg-[#EF4444] text-white hover:bg-[#EF4444]/90 shadow-none border-none">
                      High Risk
                    </Badge>
                  </div>
                  <span className="text-xs text-text-secondary">
                    Approaching critical mass threshold
                  </span>
                </div>

                {/* 6 Months */}
                <div className="flex flex-col py-3 gap-1 border-l-2 border-l-[#7F1D1D] pl-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-foreground">6 Months</span>
                    <Badge className="bg-[#991B1B] text-white hover:bg-[#991B1B]/90 shadow-none border-none">
                      Critical
                    </Badge>
                  </div>
                  <span className="text-xs text-text-secondary">
                    Immediate surgical intervention recommended
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Insights Card */}
          <Card className="shadow-sm border-border rounded-xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Clinical Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                {[
                  "Tumor volume doubles within 3.2 months at current growth rate",
                  "Growth pattern consistent with Grade IV Glioblastoma progression",
                  "Intervention window is estimated at 4–6 weeks from baseline",
                ].map((insight, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg border-l-2 border-l-[#F59E0B]"
                  >
                    <Lightbulb className="h-4 w-4 text-[#F59E0B] shrink-0 mt-0.5" />
                    <span className="text-xs text-text-secondary leading-relaxed font-medium">
                      {insight}
                    </span>
                  </div>
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
                <Check className="h-3.5 w-3.5" />
              </div>
              <span className="text-sm font-semibold text-primary whitespace-nowrap">
                Segment
              </span>
            </div>
            <div className="h-px w-8 sm:w-12 bg-primary"></div>
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">
                3
              </div>
              <span className="text-sm font-semibold text-primary whitespace-nowrap">
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
              href="/segmentation"
              className="px-4 py-2 text-sm font-medium text-text-primary bg-transparent border border-border rounded-lg hover:bg-muted transition-colors"
            >
              Back to Segmentation
            </Link>
            <Link
              href="/simulation"
              className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white rounded-lg transition-colors bg-primary hover:bg-primary/90"
            >
              Run Treatment Simulation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}

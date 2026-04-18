"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  UploadCloud,
  ScanLine,
  CheckCircle2,
  ArrowRight,
  X,
  File as FileIcon,
  Check,
} from "lucide-react";

type FileData = {
  file: File;
  previewUrl: string | null;
  is3D: boolean;
};

export default function MRIUploadPage() {
  const [fileData, setFileData] = useState<FileData | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    processFile(selectedFile);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (!droppedFile) return;

    processFile(droppedFile);
  };

  const processFile = (file: File) => {
    const isImage = file.type.startsWith("image/");
    const is3D =
      file.name.endsWith(".nii") ||
      file.name.endsWith(".nii.gz") ||
      file.name.endsWith(".dcm");

    let previewUrl = null;
    if (isImage) {
      previewUrl = URL.createObjectURL(file);
    }

    setFileData({ file, previewUrl, is3D });
  };

  const clearFile = () => {
    setFileData(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFormatBadge = (filename: string) => {
    if (filename.endsWith(".nii") || filename.endsWith(".nii.gz")) return "NIfTI";
    if (filename.endsWith(".dcm")) return "DICOM";
    if (filename.endsWith(".jpg") || filename.endsWith(".jpeg")) return "JPG";
    if (filename.endsWith(".png")) return "PNG";
    return "Unknown";
  };

  return (
    <div className="flex flex-col gap-6 p-8 pb-20 max-w-7xl mx-auto h-full overflow-y-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          MRI Upload
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Upload and prepare a patient scan for AI analysis
        </p>
      </div>

      {/* Main Split Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (60%) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Patient Info Section */}
          <Card className="shadow-sm border-border rounded-xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Patient Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="patientId" className="text-text-secondary text-xs font-semibold">
                    Patient ID
                  </Label>
                  <Input
                    id="patientId"
                    placeholder="e.g. PT-10023"
                    className="border-[#E5E7EB] focus-visible:ring-primary rounded-lg"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="patientName" className="text-text-secondary text-xs font-semibold">
                    Patient Name
                  </Label>
                  <Input
                    id="patientName"
                    placeholder="e.g. Jane Doe"
                    className="border-[#E5E7EB] focus-visible:ring-primary rounded-lg"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="age" className="text-text-secondary text-xs font-semibold">
                    Age
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="e.g. 45"
                    className="border-[#E5E7EB] focus-visible:ring-primary rounded-lg"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="gender" className="text-text-secondary text-xs font-semibold">
                    Gender
                  </Label>
                  <select
                    id="gender"
                    className="flex h-10 w-full items-center justify-between rounded-lg border border-[#E5E7EB] bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="" disabled selected>
                      Select Gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <Label htmlFor="scanDate" className="text-text-secondary text-xs font-semibold">
                    Scan Date
                  </Label>
                  <Input
                    id="scanDate"
                    type="date"
                    className="border-[#E5E7EB] focus-visible:ring-primary rounded-lg"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* MRI File Upload Section */}
          <Card className="shadow-sm border-border rounded-xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">MRI Scan File</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {!fileData ? (
                <>
                  <div
                    className="flex flex-col items-center justify-center border-2 border-dashed border-primary rounded-xl p-10 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <UploadCloud className="h-10 w-10 text-primary mb-4" />
                    <p className="text-foreground font-semibold text-base mb-1">
                      Drag & drop your MRI scan here
                    </p>
                    <p className="text-text-secondary text-sm">
                      Supports NIfTI (.nii), DICOM (.dcm), JPG/PNG
                    </p>

                    <div className="flex items-center gap-4 w-full max-w-xs my-6">
                      <div className="h-px bg-border flex-1"></div>
                      <span className="text-text-secondary text-sm font-medium">or</span>
                      <div className="h-px bg-border flex-1"></div>
                    </div>

                    <button className="bg-primary text-white hover:bg-primary/90 rounded-lg px-6 py-2.5 text-sm font-medium transition-colors">
                      Browse Files
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".nii,.nii.gz,.dcm,.jpg,.jpeg,.png"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm text-text-secondary font-medium">
                      Accepted Formats:
                    </span>
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="bg-[#0F4C81]/10 text-primary hover:bg-[#0F4C81]/20">
                        NIfTI
                      </Badge>
                      <Badge variant="secondary" className="bg-[#0F4C81]/10 text-primary hover:bg-[#0F4C81]/20">
                        DICOM
                      </Badge>
                      <Badge variant="secondary" className="bg-[#0F4C81]/10 text-primary hover:bg-[#0F4C81]/20">
                        JPG/PNG
                      </Badge>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-between border border-border rounded-xl p-4 bg-background shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground truncate max-w-[200px] sm:max-w-[300px]">
                        {fileData.file.name}
                      </span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-text-secondary">
                          {formatFileSize(fileData.file.size)}
                        </span>
                        <span className="text-xs text-border">•</span>
                        <Badge variant="secondary" className="bg-[#0F4C81]/10 text-primary text-[10px] px-1.5 hover:bg-[#0F4C81]/20">
                          {getFormatBadge(fileData.file.name)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-1.5 text-success">
                      <CheckCircle2 className="h-4 w-4" />
                      <span className="text-xs font-semibold">Ready</span>
                    </div>
                    <button
                      onClick={clearFile}
                      className="p-2 hover:bg-muted rounded-full text-text-secondary hover:text-foreground transition-colors"
                      title="Remove file"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column (40%) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Scan Preview Card */}
          <Card className="shadow-sm border-border rounded-xl flex flex-col min-h-[360px]">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Scan Preview</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              {!fileData ? (
                <div className="flex-1 flex flex-col items-center justify-center bg-muted/50 rounded-xl border border-border h-full min-h-[260px]">
                  <ScanLine className="h-12 w-12 text-muted-foreground/50 mb-3" />
                  <p className="text-sm font-medium text-muted-foreground">
                    Preview will appear after upload
                  </p>
                </div>
              ) : fileData.previewUrl ? (
                <div className="flex-1 flex items-center justify-center bg-black/5 rounded-xl border border-border overflow-hidden relative min-h-[260px]">
                  <Image
                    src={fileData.previewUrl}
                    alt="Scan Preview"
                    fill
                    className="object-contain"
                  />
                </div>
              ) : fileData.is3D ? (
                <div className="flex-1 flex flex-col items-center justify-center bg-[#0F4C81]/5 rounded-xl border border-primary/20 h-full min-h-[260px] p-6 text-center">
                  <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <ScanLine className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-foreground font-semibold mb-1">
                    3D scan detected
                  </h3>
                  <p className="text-sm text-text-secondary">
                    Preview not available. Proceeding to segmentation pipeline.
                  </p>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center bg-muted/50 rounded-xl border border-border h-full min-h-[260px]">
                  <p className="text-sm font-medium text-muted-foreground">
                    Preview not supported for this format
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Upload Guidelines Card */}
          <Card className="shadow-sm border-border rounded-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Scan Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-col gap-3">
                {[
                  "Minimum resolution: 128 x 128 x 128 voxels",
                  "Modalities supported: T1, T1c, T2, FLAIR",
                  "File size limit: 500MB",
                  "Patient data must be anonymized",
                  "Recommended format: NIfTI (.nii.gz)",
                ].map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-success shrink-0" />
                    <span className="text-sm text-foreground">{req}</span>
                  </li>
                ))}
              </ul>
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
                1
              </div>
              <span className="text-sm font-semibold text-primary whitespace-nowrap">Upload</span>
            </div>
            <div className="h-px w-8 sm:w-12 bg-border"></div>
            <div className="flex items-center gap-2 opacity-50">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted-foreground text-white text-xs font-bold">
                2
              </div>
              <span className="text-sm font-medium text-text-secondary whitespace-nowrap">Segment</span>
            </div>
            <div className="h-px w-8 sm:w-12 bg-border"></div>
            <div className="flex items-center gap-2 opacity-50">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted-foreground text-white text-xs font-bold">
                3
              </div>
              <span className="text-sm font-medium text-text-secondary whitespace-nowrap">Predict</span>
            </div>
            <div className="h-px w-8 sm:w-12 bg-border"></div>
            <div className="flex items-center gap-2 opacity-50">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted-foreground text-white text-xs font-bold">
                4
              </div>
              <span className="text-sm font-medium text-text-secondary whitespace-nowrap">Report</span>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
            <button
              onClick={clearFile}
              className="px-4 py-2 text-sm font-medium text-text-primary bg-transparent border border-border rounded-lg hover:bg-muted transition-colors"
            >
              Clear All
            </button>
            <button
              className={`flex items-center gap-2 px-6 py-2 text-sm font-medium text-white rounded-lg transition-all ${
                !fileData
                  ? "bg-primary/50 cursor-not-allowed opacity-50"
                  : "bg-primary hover:bg-primary/90"
              }`}
              disabled={!fileData}
            >
              Start Analysis
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}

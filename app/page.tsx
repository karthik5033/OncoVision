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
import { Brain, Activity, FileText, CheckCircle2 } from "lucide-react";

const recentScans = [
  {
    id: "PT-8492",
    date: "2026-04-18",
    type: "Glioblastoma",
    risk: "High",
    status: "Reviewed",
  },
  {
    id: "PT-8493",
    date: "2026-04-18",
    type: "Meningioma",
    risk: "Low",
    status: "Pending",
  },
  {
    id: "PT-8494",
    date: "2026-04-17",
    type: "Astrocytoma",
    risk: "Medium",
    status: "Reviewed",
  },
  {
    id: "PT-8495",
    date: "2026-04-17",
    type: "Pituitary Adenoma",
    risk: "Low",
    status: "Reviewed",
  },
  {
    id: "PT-8496",
    date: "2026-04-16",
    type: "Oligodendroglioma",
    risk: "High",
    status: "Pending Analysis",
  },
];

export default function Dashboard() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-col gap-8 p-8 pb-20">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Patient Overview
        </h1>
        <p className="text-sm text-text-secondary mt-1">{today}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-primary shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 text-muted-foreground pb-2">
            <CardTitle className="text-sm font-medium">
              Total Scans Analyzed
            </CardTitle>
            <Brain className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">1,284</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-destructive shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 text-muted-foreground pb-2">
            <CardTitle className="text-sm font-medium">
              High Risk Cases
            </CardTitle>
            <Activity className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">23</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-primary shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 text-muted-foreground pb-2">
            <CardTitle className="text-sm font-medium">
              Reports Generated
            </CardTitle>
            <FileText className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">891</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-success shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 text-muted-foreground pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Prediction Accuracy
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">94.2%</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-4 shadow-sm border border-border rounded-xl">
          <CardHeader>
            <CardTitle>Recent Patient Scans</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient ID</TableHead>
                  <TableHead>Scan Date</TableHead>
                  <TableHead>Tumor Type</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentScans.map((scan) => (
                  <TableRow key={scan.id}>
                    <TableCell className="font-medium">{scan.id}</TableCell>
                    <TableCell className="text-text-secondary">{scan.date}</TableCell>
                    <TableCell>{scan.type}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          scan.risk === "High"
                            ? "destructive"
                            : scan.risk === "Medium"
                            ? "default"
                            : "secondary"
                        }
                        className={
                          scan.risk === "Medium"
                            ? "bg-warning text-white hover:bg-warning/80"
                            : scan.risk === "Low"
                            ? "bg-success hover:bg-success/80 text-white"
                            : ""
                        }
                      >
                        {scan.risk}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-text-secondary">{scan.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="md:col-span-3 shadow-sm border border-border rounded-xl">
          <CardHeader>
            <CardTitle>Risk Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-[300px] items-center justify-center rounded-lg bg-muted border border-border border-dashed">
              <span className="text-muted-foreground font-medium">
                Chart coming soon
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

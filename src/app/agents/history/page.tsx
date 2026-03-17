"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft } from "lucide-react";
import { MOCK_AUTOMATIONS } from "@/lib/mock-data";
import Link from "next/link";

export default function RunHistoryPage() {
  const automation = MOCK_AUTOMATIONS[0]; // Sale Leads — Limassol

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/agents"><Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4" /></Button></Link>
        <div>
          <h1 className="text-2xl font-bold">{automation.name} — Run History</h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="default">Active</Badge>
            <span className="text-sm text-muted-foreground">Total: {automation.runs.length} runs · {automation.totalProcessed} leads processed</span>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{automation.totalProcessed}</div>
            <div className="text-sm text-muted-foreground">Total Processed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{automation.totalInterested}</div>
            <div className="text-sm text-muted-foreground">Total Interested</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{automation.matchingLeads}</div>
            <div className="text-sm text-muted-foreground">Matching Leads</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{((automation.totalInterested / automation.totalProcessed) * 100).toFixed(1)}%</div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
          </CardContent>
        </Card>
      </div>

      {/* Run table */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Daily Runs</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead className="text-center">Queued</TableHead>
                <TableHead className="text-center">Contacted</TableHead>
                <TableHead className="text-center text-green-600">Interested</TableHead>
                <TableHead className="text-center text-blue-600">Callback</TableHead>
                <TableHead className="text-center text-red-600">Not Int.</TableHead>
                <TableHead className="text-center">Not Reach.</TableHead>
                <TableHead className="text-center">Errors</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {automation.runs.map(run => (
                <TableRow key={run.date} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">{run.date}</TableCell>
                  <TableCell className="text-center">{run.leadsQueued}</TableCell>
                  <TableCell className="text-center">{run.contacted}</TableCell>
                  <TableCell className="text-center text-green-600 font-medium">{run.interested}</TableCell>
                  <TableCell className="text-center text-blue-600">{run.callback}</TableCell>
                  <TableCell className="text-center text-red-600">{run.notInterested}</TableCell>
                  <TableCell className="text-center text-muted-foreground">{run.notReachable}</TableCell>
                  <TableCell className="text-center">{run.errors > 0 ? <span className="text-red-600">{run.errors}</span> : "—"}</TableCell>
                </TableRow>
              ))}
              {/* Weekend gap */}
              <TableRow>
                <TableCell className="text-muted-foreground italic" colSpan={8}>Mar 15 — Weekend (no run)</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Errors */}
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-sm">Errors</CardTitle></CardHeader>
        <CardContent className="text-sm">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Mar 14:</span>
            <span>1 CRM writeback failed (Alexei P.) — retried ✓</span>
          </div>
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground">Click any row to see lead-level results for that run.</p>
    </div>
  );
}

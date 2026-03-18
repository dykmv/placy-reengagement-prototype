"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, CheckCircle, MessageSquare, Phone, X } from "lucide-react";
import { MOCK_AUTOMATIONS, MOCK_LEADS, type Lead, type AutomationRun } from "@/lib/mock-data";
import Link from "next/link";

const statusConfig: Record<string, { label: string; className: string }> = {
  interested: { label: "Interested", className: "bg-green-100 text-green-800" },
  callback_later: { label: "Callback", className: "bg-blue-100 text-blue-800" },
  not_interested: { label: "Not Interested", className: "bg-red-100 text-red-800" },
  not_reachable: { label: "Not Reachable", className: "bg-gray-100 text-gray-800" },
};

// Map run dates to leads (simulated drill-down)
function getLeadsForRun(runDate: string): Lead[] {
  // Match leads by contactDate containing the run date's day
  const dayNum = runDate.replace("Mar ", "");
  const fullDate = `2026-03-${dayNum.padStart(2, "0")}`;
  const matchedLeads = MOCK_LEADS.filter(l => l.contactDate === fullDate);
  // If no exact match, return a sample of leads
  if (matchedLeads.length === 0) {
    return MOCK_LEADS.filter(l => l.status !== "not_reachable").slice(0, 5);
  }
  return matchedLeads;
}

export default function RunHistoryPage() {
  const automation = MOCK_AUTOMATIONS[0];
  const [selectedRun, setSelectedRun] = useState<AutomationRun | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const runLeads = selectedRun ? getLeadsForRun(selectedRun.date) : [];

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
        <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold">{automation.totalProcessed}</div><div className="text-sm text-muted-foreground">Total Processed</div></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold text-green-600">{automation.totalInterested}</div><div className="text-sm text-muted-foreground">Total Interested</div></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold">{automation.matchingLeads}</div><div className="text-sm text-muted-foreground">Matching Leads</div></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold">{((automation.totalInterested / automation.totalProcessed) * 100).toFixed(1)}%</div><div className="text-sm text-muted-foreground">Success Rate</div></CardContent></Card>
      </div>

      {/* Run table */}
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-base">Daily Runs — click a row to see leads</CardTitle></CardHeader>
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
                <TableRow
                  key={run.date}
                  className={`cursor-pointer hover:bg-muted/50 ${selectedRun?.date === run.date ? "bg-muted ring-1 ring-border" : ""}`}
                  onClick={() => { setSelectedRun(run); setSelectedLead(null); }}
                >
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
              <TableRow>
                <TableCell className="text-muted-foreground italic" colSpan={8}>Mar 15 — Weekend (no run)</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Drill-down: leads for selected run */}
      {selectedRun && (
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Leads from {selectedRun.date} — {selectedRun.leadsQueued} leads</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setSelectedRun(null)}><X className="h-4 w-4" /></Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Channel</TableHead>
                  <TableHead>Agent</TableHead>
                  <TableHead>Summary</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {runLeads.map(lead => (
                  <TableRow
                    key={lead.id}
                    className={`cursor-pointer hover:bg-muted/50 ${lead.humanNeeded ? "bg-orange-50/50 border-l-2 border-l-orange-400" : ""}`}
                    onClick={() => setSelectedLead(lead)}
                  >
                    <TableCell className="font-medium">{lead.name}{lead.humanNeeded && <span className="ml-1">👤</span>}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{lead.phone}</TableCell>
                    <TableCell><Badge className={statusConfig[lead.status]?.className || "bg-gray-100"}>{statusConfig[lead.status]?.label || lead.status}</Badge></TableCell>
                    <TableCell className="text-sm capitalize">{lead.contactChannel || "—"}</TableCell>
                    <TableCell className="text-sm">{lead.agent}</TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate">{lead.aiSummary || "—"}</TableCell>
                  </TableRow>
                ))}
                {/* Show not_reachable count */}
                {selectedRun.notReachable > 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-muted-foreground text-sm italic">
                      + {selectedRun.notReachable} leads not reachable (no response after all attempts)
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Lead detail sheet */}
      <Sheet open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
        <SheetContent className="w-[500px] sm:w-[600px] overflow-y-auto">
          {selectedLead && (
            <>
              <SheetHeader>
                <div className="flex items-center gap-3">
                  <SheetTitle className="text-xl">{selectedLead.name}</SheetTitle>
                  <Badge className={statusConfig[selectedLead.status]?.className || ""}>{statusConfig[selectedLead.status]?.label || selectedLead.status}</Badge>
                </div>
                <SheetDescription>{selectedLead.phone}</SheetDescription>
              </SheetHeader>

              <div className="mt-4 flex gap-2 flex-wrap">
                <Badge variant="outline">{selectedLead.dealType === "sale" ? "Buy" : "Rent"}</Badge>
                <Badge variant="outline">{selectedLead.interest}</Badge>
                <Badge variant="outline">{selectedLead.city}</Badge>
                <Badge variant="outline">{selectedLead.budget}</Badge>
              </div>

              <div className="mt-2 text-xs text-muted-foreground">Agent: {selectedLead.agent} · {selectedLead.adSource} · Via {selectedLead.contactChannel}</div>

              {selectedLead.humanNeeded && (
                <div className="mt-3 p-3 rounded-md bg-orange-50 border border-orange-200 text-sm">👤 Human contact requested — Pending</div>
              )}

              <div className="mt-4 flex gap-2">
                <Button size="sm" variant="outline"><MessageSquare className="h-3 w-3 mr-1" />WhatsApp</Button>
                <Button size="sm" variant="outline"><Phone className="h-3 w-3 mr-1" />Call</Button>
              </div>

              <Separator className="my-4" />

              {selectedLead.aiSummary && (
                <>
                  <Card className="bg-primary/5">
                    <CardHeader className="pb-1"><CardTitle className="text-sm">AI Summary</CardTitle></CardHeader>
                    <CardContent className="text-sm">{selectedLead.aiSummary}</CardContent>
                  </Card>
                  <Separator className="my-4" />
                </>
              )}

              {selectedLead.conversation && selectedLead.conversation.length > 0 && (
                <>
                  <div className="text-sm font-medium mb-3">{selectedLead.contactChannel === "whatsapp" ? "💬" : "📞"} Conversation — {selectedLead.contactDate}</div>
                  <div className="space-y-3">
                    {selectedLead.conversation.map((msg, i) => (
                      <div key={i} className={`flex ${msg.sender === "bot" ? "justify-start" : "justify-end"}`}>
                        <div className={`max-w-[80%] rounded-lg p-3 text-sm ${msg.sender === "bot" ? "bg-white border shadow-sm" : "bg-green-100 text-green-900"}`}>
                          <p>{msg.text}</p>
                          <div className={`text-[10px] mt-1 text-right ${msg.sender === "bot" ? "text-gray-400" : "text-green-600"}`}>{msg.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Separator className="my-4" />
                </>
              )}

              {selectedLead.crmUpdated && (
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-600" /> CRM updated · Assigned to: {selectedLead.agent}</div>
                  <div className="text-xs text-muted-foreground">Updated: {selectedLead.contactDate}</div>
                </div>
              )}
            </>
          )}
        </SheetContent>
      </Sheet>

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
    </div>
  );
}

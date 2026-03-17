"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, MessageSquare, Phone, X } from "lucide-react";
import { MOCK_LEADS, type Lead, type LeadStatus } from "@/lib/mock-data";

const statusConfig: Record<LeadStatus, { label: string; className: string }> = {
  interested: { label: "Interested", className: "bg-green-100 text-green-800" },
  callback_later: { label: "Callback", className: "bg-blue-100 text-blue-800" },
  not_interested: { label: "Not Interested", className: "bg-red-100 text-red-800" },
  not_reachable: { label: "Not Reachable", className: "bg-gray-100 text-gray-800" },
  pending: { label: "Pending", className: "bg-yellow-100 text-yellow-800" },
};

export default function LeadsPage() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dealFilter, setDealFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const filteredLeads = MOCK_LEADS.filter(l => {
    if (statusFilter !== "all" && l.status !== statusFilter) return false;
    if (dealFilter !== "all" && l.dealType !== dealFilter) return false;
    if (search && !l.name.toLowerCase().includes(search.toLowerCase()) && !l.phone.includes(search)) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Re-engagement Leads</h1>
        <Button variant="outline" size="sm">Export CSV</Button>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <Select value={statusFilter} onValueChange={(v) => v && setStatusFilter(v)}>
          <SelectTrigger className="w-40"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="interested">Interested</SelectItem>
            <SelectItem value="callback_later">Callback Later</SelectItem>
            <SelectItem value="not_interested">Not Interested</SelectItem>
            <SelectItem value="not_reachable">Not Reachable</SelectItem>
          </SelectContent>
        </Select>
        <Select value={dealFilter} onValueChange={(v) => v && setDealFilter(v)}>
          <SelectTrigger className="w-32"><SelectValue placeholder="Deal type" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="sale">Sale</SelectItem>
            <SelectItem value="rent">Rent</SelectItem>
          </SelectContent>
        </Select>
        <Input
          placeholder="Search name or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64"
        />
        <span className="text-sm text-muted-foreground self-center">
          {filteredLeads.length} leads
        </span>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Deal</TableHead>
                <TableHead>Agent</TableHead>
                <TableHead>AI Summary</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.slice(0, 30).map(lead => (
                <TableRow
                  key={lead.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => setSelectedLead(lead)}
                >
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell className="text-sm">{lead.phone}</TableCell>
                  <TableCell>
                    <Badge className={statusConfig[lead.status].className}>
                      {statusConfig[lead.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm capitalize">{lead.dealType}</TableCell>
                  <TableCell className="text-sm">{lead.agent}</TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate">
                    {lead.aiSummary || "—"}
                  </TableCell>
                  <TableCell className="text-sm">{lead.contactDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Lead Detail Sheet */}
      <Sheet open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
        <SheetContent className="w-[500px] sm:w-[600px] overflow-y-auto">
          {selectedLead && (
            <>
              <SheetHeader>
                <div className="flex items-center gap-3">
                  <SheetTitle className="text-xl">{selectedLead.name}</SheetTitle>
                  <Badge className={statusConfig[selectedLead.status].className}>
                    {statusConfig[selectedLead.status].label}
                  </Badge>
                </div>
                <SheetDescription>{selectedLead.phone}</SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                {/* Lead Info */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Agent</span><span>{selectedLead.agent}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Source</span><span>{selectedLead.source}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Interest</span><span>{selectedLead.interest}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Budget</span><span>{selectedLead.budget}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">City</span><span>{selectedLead.city}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Last follow-up (before re-engagement)</span><span>{selectedLead.lastFollowUp}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Days inactive</span><span>{selectedLead.daysInactive}</span></div>
                </div>

                <Separator />

                {/* AI Summary */}
                {selectedLead.aiSummary && (
                  <>
                    <Card className="bg-primary/5">
                      <CardHeader className="pb-1">
                        <CardTitle className="text-sm">AI Summary</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm">
                        {selectedLead.aiSummary}
                      </CardContent>
                    </Card>
                    <Separator />
                  </>
                )}

                {/* Conversation */}
                {selectedLead.conversation && selectedLead.conversation.length > 0 && (
                  <>
                    <div>
                      <div className="text-sm font-medium mb-3 flex items-center gap-2">
                        {selectedLead.contactChannel === "whatsapp" ? <MessageSquare className="h-4 w-4" /> : <Phone className="h-4 w-4" />}
                        Conversation — {selectedLead.contactDate}
                      </div>
                      <div className="space-y-3">
                        {selectedLead.conversation.map((msg, i) => (
                          <div key={i} className={`flex ${msg.sender === "bot" ? "justify-start" : "justify-end"}`}>
                            <div className={`max-w-[80%] rounded-lg p-3 text-sm ${
                              msg.sender === "bot"
                                ? "bg-white border shadow-sm"
                                : "bg-green-100 text-green-900"
                            }`}>
                              <p>{msg.text}</p>
                              <div className={`text-[10px] mt-1 text-right ${msg.sender === "bot" ? "text-gray-400" : "text-green-600"}`}>
                                {msg.time} {msg.sender === "bot" && "✓✓"}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Separator />
                  </>
                )}

                {/* CRM Status */}
                {selectedLead.crmUpdated && (
                  <div className="space-y-2">
                    <div className="text-sm font-medium">CRM Status</div>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-600" /> Qobrix status → &quot;Re-engagement&quot;</div>
                      <div className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-600" /> Activity note added with summary</div>
                      <div className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-600" /> Assigned to: {selectedLead.agent} (original agent)</div>
                      <div className="text-xs text-muted-foreground mt-1">Updated: {selectedLead.contactDate}</div>
                    </div>
                  </div>
                )}

                {/* Contact attempts */}
                <div className="space-y-2">
                  <div className="text-sm font-medium">Contact Attempts</div>
                  <div className="text-sm text-muted-foreground">
                    1. {selectedLead.contactChannel === "whatsapp" ? "WA" : "Voice"} — {selectedLead.contactDate}{" "}
                    {selectedLead.status === "interested" || selectedLead.status === "callback_later" || selectedLead.status === "not_interested"
                      ? "→ responded ✓"
                      : "→ no response"}
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

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
import { CheckCircle, MessageSquare, Phone, Download, Plus } from "lucide-react";
import { ALL_LEADS, type Lead } from "@/lib/mock-data";

const statusConfig: Record<string, { label: string; className: string }> = {
  interested: { label: "Interested", className: "bg-green-100 text-green-800" },
  callback_later: { label: "Callback", className: "bg-blue-100 text-blue-800" },
  not_interested: { label: "Not Interested", className: "bg-red-100 text-red-800" },
  not_reachable: { label: "Not Reachable", className: "bg-gray-100 text-gray-800" },
  pending: { label: "Pending", className: "bg-yellow-100 text-yellow-800" },
  new: { label: "New", className: "bg-emerald-100 text-emerald-800" },
  contacted: { label: "Contacted", className: "bg-amber-100 text-amber-800" },
  irrelevant: { label: "Irrelevant", className: "bg-red-50 text-red-600" },
};

export default function LeadsPage() {
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dealFilter, setDealFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const filteredLeads = ALL_LEADS.filter(l => {
    if (sourceFilter !== "all" && l.leadSource !== sourceFilter) return false;
    if (statusFilter !== "all" && l.status !== statusFilter) return false;
    if (dealFilter !== "all" && l.dealType !== dealFilter) return false;
    if (search && !l.name.toLowerCase().includes(search.toLowerCase()) && !l.phone.includes(search)) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Leads</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Download className="h-3 w-3 mr-1" />Export .csv</Button>
          <Button size="sm"><Plus className="h-3 w-3 mr-1" />Add Lead</Button>
        </div>
      </div>

      <div className="flex gap-3 flex-wrap">
        <Select value={sourceFilter} onValueChange={(v) => v && setSourceFilter(v)}>
          <SelectTrigger className="w-44"><SelectValue placeholder="Source" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All sources</SelectItem>
            <SelectItem value="inbound">Inbound (LQT)</SelectItem>
            <SelectItem value="re-engagement">Re-engagement</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={(v) => v && setStatusFilter(v)}>
          <SelectTrigger className="w-40"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="interested">Interested</SelectItem>
            <SelectItem value="callback_later">Callback Later</SelectItem>
            <SelectItem value="not_interested">Not Interested</SelectItem>
            <SelectItem value="not_reachable">Not Reachable</SelectItem>
            <SelectItem value="irrelevant">Irrelevant</SelectItem>
          </SelectContent>
        </Select>
        <Select value={dealFilter} onValueChange={(v) => v && setDealFilter(v)}>
          <SelectTrigger className="w-32"><SelectValue placeholder="Type" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="sale">Sale</SelectItem>
            <SelectItem value="rent">Rent</SelectItem>
          </SelectContent>
        </Select>
        <Input placeholder="Search name or phone..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-64" />
        <span className="text-sm text-muted-foreground self-center">{filteredLeads.length} leads</span>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Updated</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Source</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.slice(0, 30).map(lead => (
                <TableRow key={lead.id} className={`cursor-pointer hover:bg-muted/50 ${lead.humanNeeded ? "bg-orange-50/50 border-l-2 border-l-orange-400" : ""}`} onClick={() => setSelectedLead(lead)}>
                  <TableCell className="text-sm text-muted-foreground">{lead.contactDate || lead.lastFollowUp}</TableCell>
                  <TableCell className="font-medium">{lead.name}{lead.humanNeeded && <span className="ml-1 text-orange-500">👤</span>}</TableCell>
                  <TableCell className="text-sm capitalize">{lead.dealType}</TableCell>
                  <TableCell className="text-sm">{lead.property || lead.interest}</TableCell>
                  <TableCell className="text-sm">{lead.location || lead.city}</TableCell>
                  <TableCell className="text-sm">{lead.budget}</TableCell>
                  <TableCell><Badge className={statusConfig[lead.status]?.className || "bg-gray-100"}>{statusConfig[lead.status]?.label || lead.status}</Badge></TableCell>
                  <TableCell><Badge variant="outline" className="text-xs">{lead.leadSource === "inbound" ? "Inbound" : "Re-engage"}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

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
                {selectedLead.property && <Badge variant="outline">{selectedLead.property}</Badge>}
                {selectedLead.city && <Badge variant="outline">{selectedLead.city}</Badge>}
                {selectedLead.budget && <Badge variant="outline">{selectedLead.budget}</Badge>}
              </div>
              <div className="mt-2 text-xs text-muted-foreground">{selectedLead.leadSource === "inbound" ? "Inbound lead" : "Re-engaged lead"} · Agent: {selectedLead.agent || "Unassigned"} · {selectedLead.adSource}</div>
              {selectedLead.humanNeeded && <div className="mt-3 p-3 rounded-md bg-orange-50 border border-orange-200 text-sm">👤 Human contact requested — Pending</div>}
              <div className="mt-4 flex gap-2">
                <Button size="sm" variant="outline"><MessageSquare className="h-3 w-3 mr-1" />WhatsApp</Button>
                <Button size="sm" variant="outline"><Phone className="h-3 w-3 mr-1" />Call</Button>
              </div>
              <Separator className="my-4" />
              {selectedLead.aiSummary && (<><Card className="bg-primary/5"><CardHeader className="pb-1"><CardTitle className="text-sm">Summary</CardTitle></CardHeader><CardContent className="text-sm">{selectedLead.aiSummary}</CardContent></Card><Separator className="my-4" /></>)}
              {selectedLead.conversation && selectedLead.conversation.length > 0 && (<><div className="text-sm font-medium mb-3">{selectedLead.contactChannel === "whatsapp" ? "💬" : "📞"} Conversation — {selectedLead.contactDate}</div><div className="space-y-3">{selectedLead.conversation.map((msg, i) => (<div key={i} className={`flex ${msg.sender === "bot" ? "justify-start" : "justify-end"}`}><div className={`max-w-[80%] rounded-lg p-3 text-sm ${msg.sender === "bot" ? "bg-white border shadow-sm" : "bg-green-100 text-green-900"}`}><p>{msg.text}</p><div className={`text-[10px] mt-1 text-right ${msg.sender === "bot" ? "text-gray-400" : "text-green-600"}`}>{msg.time}</div></div></div>))}</div><Separator className="my-4" /></>)}
              {selectedLead.leadSource === "re-engagement" && selectedLead.crmUpdated && (<div className="space-y-1 text-sm"><div className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-600" /> CRM updated · Assigned to: {selectedLead.agent}</div></div>)}
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

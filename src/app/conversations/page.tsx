"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MessageSquare, Phone, Mail, Download, X, ExternalLink } from "lucide-react";
import { MOCK_CONVERSATIONS, type Conversation } from "@/lib/mock-data";

const channelIcons: Record<string, React.ReactNode> = {
  whatsapp: <MessageSquare className="h-4 w-4 text-green-600" />,
  voice: <Phone className="h-4 w-4" />,
  email: <Mail className="h-4 w-4 text-blue-600" />,
};

const intentBadge: Record<string, { label: string; className: string }> = {
  sale: { label: "Buy", className: "bg-blue-100 text-blue-800" },
  rent: { label: "Rent", className: "bg-emerald-100 text-emerald-800" },
  rent_out: { label: "Rent Out", className: "bg-purple-100 text-purple-800" },
  irrelevant: { label: "Irrelevant", className: "bg-red-50 text-red-600" },
  not_detected: { label: "Not detected", className: "bg-gray-100 text-gray-600" },
};

export default function ConversationsPage() {
  const [channelFilter, setChannelFilter] = useState<string>("all");
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [intentFilter, setIntentFilter] = useState<string>("all");
  const [humanOnly, setHumanOnly] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Conversation | null>(null);

  const filtered = MOCK_CONVERSATIONS.filter(c => {
    if (channelFilter !== "all" && c.channel !== channelFilter) return false;
    if (sourceFilter !== "all" && c.source !== sourceFilter) return false;
    if (intentFilter !== "all" && c.intent !== intentFilter) return false;
    if (humanOnly && !c.humanNeeded) return false;
    if (search && !c.clientName.toLowerCase().includes(search.toLowerCase()) && !c.phone.includes(search)) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Conversations</h1>
          <p className="text-sm text-muted-foreground">Click a row to open the detail panel on the right</p>
        </div>
        <Button variant="outline" size="sm"><Download className="h-3 w-3 mr-1" />Export .csv</Button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap items-center">
        <Input placeholder="Search name or phone..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-52" />
        <Separator orientation="vertical" className="h-6" />
        {/* Channel pills */}
        {["all", "whatsapp", "voice", "email"].map(ch => (
          <Button key={ch} size="sm" variant={channelFilter === ch ? "default" : "outline"} onClick={() => setChannelFilter(ch)} className="text-xs">
            {ch === "all" ? "All" : ch === "whatsapp" ? "💬 WA" : ch === "voice" ? "📞 Phone" : "📧 Email"}
          </Button>
        ))}
        <Separator orientation="vertical" className="h-6" />
        {/* Source pills */}
        {["all", "inbound", "re-engagement"].map(src => (
          <Button key={src} size="sm" variant={sourceFilter === src ? "default" : "outline"} onClick={() => setSourceFilter(src)} className="text-xs">
            {src === "all" ? "All" : src === "inbound" ? "Inbound" : "Re-engagement"}
          </Button>
        ))}
        <Separator orientation="vertical" className="h-6" />
        <Button size="sm" variant={humanOnly ? "default" : "outline"} onClick={() => setHumanOnly(!humanOnly)} className="text-xs">
          👤 Human needed
        </Button>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">Updated</TableHead>
                <TableHead className="w-8"></TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Intent</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Summary</TableHead>
                <TableHead className="w-20">Source</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(conv => (
                <TableRow
                  key={conv.id}
                  className={`cursor-pointer hover:bg-muted/50 ${conv.humanNeeded ? "bg-orange-50/50 border-l-2 border-l-orange-400" : ""} ${selected?.id === conv.id ? "bg-muted ring-1 ring-border" : ""}`}
                  onClick={() => setSelected(conv)}
                >
                  <TableCell className="text-sm text-muted-foreground">{conv.updatedAt}</TableCell>
                  <TableCell>{channelIcons[conv.channel]}</TableCell>
                  <TableCell className="font-medium">{conv.clientName}{conv.humanNeeded && <span className="ml-1">👤</span>}</TableCell>
                  <TableCell>
                    <Badge className={intentBadge[conv.intent]?.className || "bg-gray-100"}>
                      {intentBadge[conv.intent]?.label || conv.intent}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{conv.duration}</TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-[250px] truncate">{conv.summary}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[10px]">
                      {conv.source === "inbound" ? "IN" : "RE"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground py-8">No conversations match your filters</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Detail Panel */}
      <Sheet open={!!selected} onOpenChange={() => setSelected(null)}>
        <SheetContent className="w-[480px] sm:w-[540px] overflow-y-auto p-0">
          {selected && (
            <div>
              {/* Header — sticky */}
              <div className="p-5 border-b sticky top-0 bg-background z-10">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">{selected.clientName}</h2>
                  <Button size="sm" variant="ghost" onClick={() => setSelected(null)}><X className="h-4 w-4" /></Button>
                </div>
                <div className="text-sm text-muted-foreground">{selected.phone}</div>
                <div className="mt-2 flex gap-2 flex-wrap">
                  <Badge className={intentBadge[selected.intent]?.className || ""}>{intentBadge[selected.intent]?.label || selected.intent}</Badge>
                  {selected.property && <Badge variant="outline">{selected.property}</Badge>}
                  {selected.location && <Badge variant="outline">{selected.location}</Badge>}
                  {selected.price && <Badge variant="outline">{selected.price}</Badge>}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {selected.source === "inbound" ? "Inbound" : "Re-engagement"} · Last: {selected.updatedAt}{selected.leadCreated ? " · Lead created" : ""}
                </div>
                {selected.humanNeeded && (
                  <div className="mt-2 p-2 rounded bg-orange-50 border border-orange-200 text-sm text-orange-800">
                    👤 Human contact requested — Pending
                  </div>
                )}
                <div className="mt-3 flex gap-2">
                  <Button size="sm" variant="outline"><MessageSquare className="h-3 w-3 mr-1" />WhatsApp</Button>
                  <Button size="sm" variant="outline"><Phone className="h-3 w-3 mr-1" />Call</Button>
                  <Button size="sm" variant="outline"><ExternalLink className="h-3 w-3 mr-1" />Open Client</Button>
                </div>
              </div>

              {/* Timeline */}
              <div className="p-5">
                <div className="text-xs font-medium text-muted-foreground uppercase mb-3">Today</div>

                {/* Conversation card */}
                <div className="border-l-2 border-muted pl-4 space-y-4">
                  <div className="space-y-2">
                    <div className="text-xs text-muted-foreground">
                      {selected.channel === "whatsapp" ? "💬 WhatsApp chat" : "📞 Phone call"} · {selected.updatedAt} · {selected.duration}
                    </div>
                    <Card>
                      <CardContent className="p-3 text-sm">
                        {selected.summary}
                      </CardContent>
                    </Card>
                  </div>

                  {selected.leadCreated && (
                    <div className="flex items-center gap-2 p-2 rounded bg-green-50 border border-green-200 text-sm">
                      <span className="text-green-600 font-medium">🎯 Lead created</span>
                      <div className="flex gap-1 flex-wrap">
                        <Badge variant="outline" className="text-[10px]">{selected.intent}</Badge>
                        {selected.property && <Badge variant="outline" className="text-[10px]">{selected.property}</Badge>}
                        {selected.location && <Badge variant="outline" className="text-[10px]">{selected.location}</Badge>}
                        {selected.price && <Badge variant="outline" className="text-[10px]">{selected.price}</Badge>}
                      </div>
                      {selected.refNumber && <span className="text-xs text-muted-foreground">Ref: {selected.refNumber}</span>}
                    </div>
                  )}

                  {selected.source === "re-engagement" && (
                    <div className="text-xs text-muted-foreground p-2 bg-muted/50 rounded">
                      🔄 This conversation was initiated by Placy Re-engagement automation
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

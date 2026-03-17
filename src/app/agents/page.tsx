"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Pause, Play, Upload, History } from "lucide-react";
import { MOCK_AUTOMATIONS } from "@/lib/mock-data";
import Link from "next/link";
import { useState } from "react";

export default function AutomationsPage() {
  const [automations, setAutomations] = useState(MOCK_AUTOMATIONS);

  const toggleStatus = (id: string) => {
    setAutomations((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, status: a.status === "active" ? "paused" as const : "active" as const }
          : a
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">AI Agents</h1>
        <div className="flex gap-2">
          <Link href="/agents/upload"><Button variant="outline"><Upload className="h-4 w-4 mr-2" />Upload CSV</Button></Link>
          <Link href="/agents/create"><Button><Plus className="h-4 w-4 mr-2" />Set Up Agent</Button></Link>
        </div>
      </div>

      <div className="space-y-4">
        {automations.map((a) => (
          <Card key={a.id}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{a.name}</h3>
                    <Badge variant={a.status === "active" ? "default" : "secondary"}>
                      {a.status === "active" ? "Active" : a.status === "paused" ? "Paused" : a.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {a.statuses.join(", ")} · {a.dealType === "sale" ? "Sale" : "Rental"} · {a.city} · &gt;{a.inactivityDays}d inactive
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Channel: {a.channel} · {a.schedule} at WA {a.waTime}, Voice {a.voiceWindow} · {a.batchSize}/day
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleStatus(a.id)}
                  >
                    {a.status === "active" ? (
                      <><Pause className="h-3 w-3 mr-1" /> Pause</>
                    ) : (
                      <><Play className="h-3 w-3 mr-1" /> Resume</>
                    )}
                  </Button>
                  <Link href="/agents/history"><Button variant="outline" size="sm"><History className="h-3 w-3 mr-1" />Runs</Button></Link>
                </div>
              </div>

              <div className="mt-4 flex gap-6 text-sm">
                <div>
                  <span className="text-muted-foreground">Matching:</span>{" "}
                  <span className="font-medium">{a.matchingLeads} leads</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Processed:</span>{" "}
                  <span className="font-medium">{a.totalProcessed}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Interested:</span>{" "}
                  <span className="font-medium text-green-600">{a.totalInterested}</span>
                </div>
                {a.lastRun && (
                  <div>
                    <span className="text-muted-foreground">Last run:</span>{" "}
                    <span className="font-medium">{a.lastRun}</span>
                  </div>
                )}
              </div>

              {/* Run history preview */}
              {a.runs.length > 0 && (
                <div className="mt-4">
                  <div className="text-xs font-medium text-muted-foreground mb-2">Recent runs</div>
                  <div className="grid grid-cols-[80px_60px_60px_50px_50px_50px_50px] gap-1 text-xs">
                    <div className="font-medium text-muted-foreground">Date</div>
                    <div className="font-medium text-muted-foreground">Queued</div>
                    <div className="font-medium text-muted-foreground">Contact.</div>
                    <div className="font-medium text-green-600">Int.</div>
                    <div className="font-medium text-blue-600">CB</div>
                    <div className="font-medium text-red-600">Not Int.</div>
                    <div className="font-medium text-muted-foreground">N/R</div>
                    {a.runs.slice(0, 4).map((r) => (
                      <>
                        <div key={r.date}>{r.date}</div>
                        <div>{r.leadsQueued}</div>
                        <div>{r.contacted}</div>
                        <div className="text-green-600">{r.interested}</div>
                        <div className="text-blue-600">{r.callback}</div>
                        <div className="text-red-600">{r.notInterested}</div>
                        <div>{r.notReachable}</div>
                      </>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

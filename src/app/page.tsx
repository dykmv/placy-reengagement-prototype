"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Lightbulb, AlertTriangle, TrendingUp, MessageSquare, Phone, Bot } from "lucide-react";
import { DASHBOARD_STATS, MOCK_AUTOMATIONS } from "@/lib/mock-data";

export default function AnalyticsPage() {
  const s = DASHBOARD_STATS;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Analytics</h1>

      {/* Discovery Widget — dormant leads banner */}
      <Card className="border-2 border-primary/20 bg-primary/5">
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                <span className="font-semibold">Recover Revenue from Dormant Leads</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Placy scanned your Qobrix and found leads that need attention:
              </p>
              <div className="flex gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">89</div>
                  <div className="text-xs text-muted-foreground">Rental leads</div>
                  <Badge variant="secondary" className="text-[10px] mt-0.5">follow-up expired &gt;14d</Badge>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">158</div>
                  <div className="text-xs text-muted-foreground">Sale leads</div>
                  <Badge variant="secondary" className="text-[10px] mt-0.5">follow-up expired &gt;60d</Badge>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                5-10% of these leads are still interested — set up a Re-engagement Agent to find them.
              </p>
            </div>
            <Link href="/agents/create">
              <Button><Bot className="h-4 w-4 mr-2" />Set Up Agent</Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Health Summary — Re-engagement metrics */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Leads Processed</div>
            <div className="text-3xl font-bold">{s.processed}</div>
            <div className="text-xs text-muted-foreground">re-engagement</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Contacted</div>
            <div className="text-3xl font-bold">{s.contacted}</div>
            <div className="text-xs text-muted-foreground">{((s.contacted / s.processed) * 100).toFixed(0)}% of processed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Interested</div>
            <div className="text-3xl font-bold text-green-600">{s.interested}</div>
            <div className="flex items-center gap-1 text-xs text-green-600">
              <TrendingUp className="h-3 w-3" /> +3 vs last period
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Success Rate</div>
            <div className="text-3xl font-bold">{s.successRate}%</div>
            <div className="flex items-center gap-1 text-xs text-green-600">
              <TrendingUp className="h-3 w-3" /> +2.1%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Needs Attention */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="p-4 space-y-2">
          <div className="flex items-center gap-2 font-medium">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            Needs Attention
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>3 interested leads not yet contacted by agents (oldest: 2 days ago)</span>
            <Link href="/leads"><Button variant="outline" size="sm">View leads</Button></Link>
          </div>
          <Separator />
          <div className="flex items-center justify-between text-sm">
            <span>Re-engagement Agent &quot;Rental — Limassol&quot; — first results ready</span>
            <Link href="/agents"><Button variant="outline" size="sm">Review</Button></Link>
          </div>
        </CardContent>
      </Card>

      {/* Channel Performance */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <MessageSquare className="h-4 w-4" /> WhatsApp
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm">
            <div className="flex justify-between"><span>Sent</span><span className="font-medium">{s.waSent}</span></div>
            <div className="flex justify-between"><span>Replied</span><span className="font-medium">{s.waReplied} ({s.waReplyRate}%)</span></div>
            <div className="flex justify-between"><span>Qualified from replies</span><span className="font-medium text-green-600">{s.waQualified} ({s.waQualRate}%)</span></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Phone className="h-4 w-4" /> Voice
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm">
            <div className="flex justify-between"><span>Calls</span><span className="font-medium">{s.voiceCalls}</span></div>
            <div className="flex justify-between"><span>Answered</span><span className="font-medium">{s.voiceAnswered} ({s.voiceAnswerRate}%)</span></div>
            <div className="flex justify-between"><span>Qualified from answered</span><span className="font-medium text-green-600">{s.voiceQualified} ({s.voiceQualRate}%)</span></div>
          </CardContent>
        </Card>
      </div>

      {/* Outcome Breakdown */}
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-base">Outcome Breakdown</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {[
            { label: "Interested", count: s.interested, pct: ((s.interested / s.processed) * 100).toFixed(1), color: "bg-green-500" },
            { label: "Callback Later", count: s.callbackLater, pct: ((s.callbackLater / s.processed) * 100).toFixed(1), color: "bg-blue-500" },
            { label: "Not Interested", count: s.notInterested, pct: ((s.notInterested / s.processed) * 100).toFixed(1), color: "bg-red-500" },
            { label: "Not Reachable", count: s.notReachable, pct: ((s.notReachable / s.processed) * 100).toFixed(1), color: "bg-gray-400" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <div className={`h-3 w-3 rounded-full ${item.color}`} />
              <span className="w-32 text-sm">{item.label}</span>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
              </div>
              <span className="text-sm font-medium w-8 text-right">{item.count}</span>
              <span className="text-xs text-muted-foreground w-12 text-right">{item.pct}%</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Active Agents */}
      <Card>
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-base">Active AI Agents</CardTitle>
          <Link href="/agents"><Button variant="outline" size="sm">Manage</Button></Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {MOCK_AUTOMATIONS.map((a) => (
              <div key={a.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <span className="font-medium text-sm">{a.name}</span>
                  <span className="ml-2">
                    <Badge variant={a.status === "active" ? "default" : "secondary"}>
                      {a.status === "active" ? "Active" : "Paused"}
                    </Badge>
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {a.lastRun && `Last run: ${a.lastRun}`} · {a.totalInterested} interested
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

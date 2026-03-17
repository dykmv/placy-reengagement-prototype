"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function EmailPreviewPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Email Digest Preview</h1>
        <Badge variant="secondary">Preview — not a real email</Badge>
      </div>

      <Card className="shadow-lg">
        <CardContent className="p-0">
          {/* Email header */}
          <div className="p-6 border-b bg-muted/30">
            <div className="text-xs text-muted-foreground mb-1">From: Placy &lt;notifications@placy.com&gt;</div>
            <div className="text-xs text-muted-foreground mb-1">To: victoria@myspace.cy</div>
            <div className="text-xs text-muted-foreground mb-3">Date: March 18, 2026, 08:00 AM</div>
            <div className="font-semibold">🔄 Re-engagement results — 3 interested leads today</div>
          </div>

          {/* Email body */}
          <div className="p-6 space-y-5 text-sm">
            <p>Hi Victoria,</p>
            <p>Yesterday&apos;s re-engagement results for <strong>MySpace Real Estate</strong>:</p>

            {/* Campaign results */}
            <div className="p-4 bg-muted/30 rounded-lg space-y-3">
              <div className="font-semibold">Sale Leads — Limassol</div>
              <div className="text-muted-foreground">28 contacted · 3 interested · 1 callback later</div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-green-500 mt-1.5 shrink-0" />
                  <div>
                    <div className="font-medium">Alexei Petrov</div>
                    <div className="text-muted-foreground">&quot;Budget €280K, ground floor with garden, available next week&quot;</div>
                    <div className="text-xs text-muted-foreground mt-0.5">→ Agent: Nikos Andreou · Via WhatsApp</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-green-500 mt-1.5 shrink-0" />
                  <div>
                    <div className="font-medium">Elena Volkova</div>
                    <div className="text-muted-foreground">&quot;2-bed in Germasogeia, 3-month timeline, €220K&quot;</div>
                    <div className="text-xs text-muted-foreground mt-0.5">→ Agent: Maria Georgiou · Via WhatsApp</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-green-500 mt-1.5 shrink-0" />
                  <div>
                    <div className="font-medium">James Smith</div>
                    <div className="text-muted-foreground">&quot;Villa €400-500K, relocating from UK, ready to view&quot;</div>
                    <div className="text-xs text-muted-foreground mt-0.5">→ Agent: Nikos Andreou · Via Voice</div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="text-xs text-muted-foreground">
                All 3 leads assigned to agents in Qobrix with full conversation summaries.
              </div>
            </div>

            {/* Alert */}
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-2">
                <span>⚠️</span>
                <span>2 interested leads from earlier this week haven&apos;t been contacted by agents yet.</span>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center py-2">
              <div className="inline-block px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium text-sm cursor-pointer">
                View all results in dashboard →
              </div>
            </div>

            <Separator />

            {/* Monthly summary */}
            <div className="space-y-1">
              <div className="font-semibold text-xs uppercase text-muted-foreground">This month so far</div>
              <div>247 processed · <strong>32 interested</strong> (13%) · 15 callback later</div>
              <div className="text-muted-foreground">Your success rate is above average for Cyprus agencies.</div>
            </div>

            <Separator />

            <div className="text-xs text-muted-foreground text-center">
              — Placy Team<br />
              <span className="text-[10px]">You&apos;re receiving this because you have active re-engagement agents. <a className="underline" href="#">Manage notifications</a></span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

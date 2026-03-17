"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb } from "lucide-react";
import { DASHBOARD_STATS } from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <Card className="border-2 border-primary/20 bg-primary/5">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Lightbulb className="h-5 w-5 text-primary" />
            Recover Revenue from Dormant Leads
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Placy scanned your Qobrix and found:
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold">{DASHBOARD_STATS.totalDormantRent}</div>
                <div className="text-sm text-muted-foreground">Rental leads</div>
                <Badge variant="secondary" className="mt-1">follow-up expired &gt;14 days</Badge>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold">{DASHBOARD_STATS.totalDormantSale}</div>
                <div className="text-sm text-muted-foreground">Sale leads</div>
                <Badge variant="secondary" className="mt-1">follow-up expired &gt;60 days</Badge>
              </CardContent>
            </Card>
          </div>
          <p className="text-sm text-muted-foreground">
            Based on similar agencies, 5-10% of these leads are still interested — that&apos;s potential revenue you&apos;re leaving on the table.
          </p>
          <Link href="/reengagement/automations/create"><Button>Set Up Re-engagement</Button></Link>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">New leads today</div>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Conversations</div>
            <div className="text-2xl font-bold">34</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Qualified</div>
            <div className="text-2xl font-bold">8</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

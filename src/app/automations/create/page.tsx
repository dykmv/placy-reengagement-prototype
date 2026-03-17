"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, ArrowLeft, ArrowRight, ChevronDown, ChevronUp, MessageSquare, Phone } from "lucide-react";
import { MOCK_LEADS } from "@/lib/mock-data";
import Link from "next/link";

type Scenario = "setup" | "activated" | "results";

export default function CreateAutomationPage() {
  const [scenario, setScenario] = useState<Scenario>("setup");
  const [step, setStep] = useState(1);
  const [dealType, setDealType] = useState<"sale" | "rent">("sale");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showAdvancedStep2, setShowAdvancedStep2] = useState(false);
  const [channel, setChannel] = useState("wa-first");
  const [statuses, setStatuses] = useState({ contactMade: true, sleep: true, assignedNew: false, viewing: false });
  const [cities, setCities] = useState({ limassol: true, paphos: true, nicosia: false, famagusta: false });
  const [inactivityDays, setInactivityDays] = useState("60");

  const matchingLeads = dealType === "sale" ? 142 : 89;
  const sampleLeads = MOCK_LEADS.filter(l => l.dealType === dealType && l.status !== "pending").slice(0, 3);

  const interestedLeads = MOCK_LEADS.filter(l => l.status === "interested").slice(0, 3);
  const callbackLeads = MOCK_LEADS.filter(l => l.status === "callback_later").slice(0, 2);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Scenario Switcher — KEY for demo */}
      <Card className="bg-muted/50">
        <CardContent className="p-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">Demo mode — switch scenario:</div>
          <Tabs value={scenario} onValueChange={(v) => setScenario(v as Scenario)}>
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="setup">Setup Wizard</TabsTrigger>
              <TabsTrigger value="activated">Just Activated</TabsTrigger>
              <TabsTrigger value="results">First Results (Day 2)</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      {/* === SCENARIO: SETUP === */}
      {scenario === "setup" && (
        <>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Create Re-engagement Automation</h1>
            <div className="text-sm text-muted-foreground">Step {step} of 3</div>
          </div>

          {/* Progress */}
          <div className="flex gap-2">
            {[1, 2, 3].map(s => (
              <div key={s} className={`h-1 flex-1 rounded-full ${s <= step ? "bg-primary" : "bg-muted"}`} />
            ))}
          </div>

          {/* STEP 1: AUDIENCE */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Choose Your Audience</h2>
              <p className="text-sm text-muted-foreground">What type of leads do you want to reactivate?</p>

              <div className="space-y-3">
                {[
                  { value: "sale", label: "Sale leads", desc: "158 leads, follow-up expired >60 days", rec: true },
                  { value: "rent", label: "Rental leads", desc: "89 leads, follow-up expired >14 days", rec: false },
                ].map(opt => (
                  <Card
                    key={opt.value}
                    className={`cursor-pointer transition-colors ${dealType === opt.value ? "border-primary bg-primary/5" : "hover:bg-muted/50"}`}
                    onClick={() => { setDealType(opt.value as "sale" | "rent"); setInactivityDays(opt.value === "sale" ? "60" : "14"); }}
                  >
                    <CardContent className="p-4 flex items-center justify-between">
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          {opt.label}
                          {opt.rec && <Badge variant="secondary">Recommended to start</Badge>}
                        </div>
                        <div className="text-sm text-muted-foreground">{opt.desc}</div>
                      </div>
                      <div className={`h-4 w-4 rounded-full border-2 ${dealType === opt.value ? "border-primary bg-primary" : "border-muted-foreground"}`} />
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Advanced filters */}
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
              >
                {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                Advanced filters
              </button>

              {showAdvanced && (
                <Card>
                  <CardContent className="p-4 space-y-4">
                    <div>
                      <div className="text-sm font-medium mb-2">Lead statuses</div>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { key: "contactMade", label: "Contact Made", checked: statuses.contactMade },
                          { key: "sleep", label: "Sleep", checked: statuses.sleep },
                          { key: "assignedNew", label: "Assigned/New", checked: statuses.assignedNew },
                          { key: "viewing", label: "Viewing", checked: statuses.viewing },
                        ].map(s => (
                          <label key={s.key} className="flex items-center gap-2 text-sm">
                            <Checkbox
                              checked={s.checked}
                              onCheckedChange={(v) => setStatuses(prev => ({ ...prev, [s.key]: v }))}
                            />
                            {s.label}
                          </label>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        &quot;Assigned/New&quot; excluded: agents should contact these first.
                        &quot;Viewing&quot; excluded: personal follow-up better after meetings.
                      </p>
                    </div>
                    <Separator />
                    <div>
                      <div className="text-sm font-medium mb-2">Cities</div>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { key: "limassol", label: "Limassol" },
                          { key: "paphos", label: "Paphos" },
                          { key: "nicosia", label: "Nicosia" },
                          { key: "famagusta", label: "Famagusta" },
                        ].map(c => (
                          <label key={c.key} className="flex items-center gap-2 text-sm">
                            <Checkbox
                              checked={cities[c.key as keyof typeof cities]}
                              onCheckedChange={(v) => setCities(prev => ({ ...prev, [c.key]: v }))}
                            />
                            {c.label}
                          </label>
                        ))}
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <div className="text-sm font-medium mb-2">Follow-up expired more than</div>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={inactivityDays}
                          onChange={(e) => setInactivityDays(e.target.value)}
                          className="w-20"
                        />
                        <span className="text-sm">days ago</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Preview */}
              <Card className="bg-muted/30">
                <CardContent className="p-4">
                  <div className="text-sm">
                    <span className="font-medium text-lg">{matchingLeads}</span>{" "}
                    <span className="text-muted-foreground">leads match your criteria</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Sample: {sampleLeads.map(l => `${l.name} (${l.daysInactive}d ago)`).join(", ")}
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button onClick={() => setStep(2)}>
                  Next <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: SCHEDULE & MESSAGE */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Schedule & Communication</h2>

              <div>
                <div className="text-sm font-medium mb-2">Channel</div>
                <div className="space-y-2">
                  {[
                    { value: "wa-first", label: "WhatsApp first, then Voice call", desc: "Best results: 83% qualification from WA replies", rec: true },
                    { value: "voice-first", label: "Voice call first, then WhatsApp", desc: "", rec: false },
                    { value: "wa-only", label: "WhatsApp only", desc: "", rec: false },
                  ].map(opt => (
                    <Card
                      key={opt.value}
                      className={`cursor-pointer transition-colors ${channel === opt.value ? "border-primary bg-primary/5" : "hover:bg-muted/50"}`}
                      onClick={() => setChannel(opt.value)}
                    >
                      <CardContent className="p-3 flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium flex items-center gap-2">
                            {opt.label}
                            {opt.rec && <Badge variant="secondary">Recommended</Badge>}
                          </div>
                          {opt.desc && <div className="text-xs text-muted-foreground">{opt.desc}</div>}
                        </div>
                        <div className={`h-4 w-4 rounded-full border-2 ${channel === opt.value ? "border-primary bg-primary" : "border-muted-foreground"}`} />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-sm font-medium mb-1">Run frequency</div>
                  <Select defaultValue="daily">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Every day</SelectItem>
                      <SelectItem value="weekday">Every weekday</SelectItem>
                      <SelectItem value="weekly">Every week (Mon)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <div className="text-sm font-medium mb-1 flex items-center gap-1"><MessageSquare className="h-3 w-3" /> WA send time</div>
                  <Select defaultValue="09:30">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["08:00","08:30","09:00","09:30","10:00","10:30","11:00"].map(t => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <div className="text-sm font-medium mb-1 flex items-center gap-1"><Phone className="h-3 w-3" /> Voice window</div>
                  <div className="flex items-center gap-1">
                    <Select defaultValue="17:00">
                      <SelectTrigger className="w-[80px]"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {["15:00","16:00","17:00","18:00"].map(t => (
                          <SelectItem key={t} value={t}>{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <span className="text-xs">to</span>
                    <Select defaultValue="20:00">
                      <SelectTrigger className="w-[80px]"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {["19:00","20:00","21:00"].map(t => (
                          <SelectItem key={t} value={t}>{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Message Preview */}
              <div>
                <div className="text-sm font-medium mb-2">Message Preview</div>
                <Card className="max-w-sm mx-auto bg-[#e5ddd5]">
                  <CardContent className="p-4 space-y-2">
                    <div className="bg-white rounded-lg p-3 text-sm shadow-sm">
                      <p>Hi <strong>Alexei</strong>, this is <strong>Sarah</strong> from <strong>MySpace Real Estate</strong>.</p>
                      <p className="mt-2">You were looking at property for <strong>sale</strong> in <strong>Limassol</strong> some time ago. Is your request still relevant?</p>
                      <p className="mt-2">We&apos;d love to help you find the right option. Reply YES if you&apos;re still looking!</p>
                      <div className="text-[10px] text-right text-gray-500 mt-1">09:31 ✓✓</div>
                    </div>
                  </CardContent>
                </Card>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  Uses real data: &quot;Alexei&quot; from your CRM, &quot;sale&quot; from deal type, &quot;Limassol&quot; from city.
                </p>
              </div>

              {/* Advanced */}
              <button
                onClick={() => setShowAdvancedStep2(!showAdvancedStep2)}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
              >
                {showAdvancedStep2 ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                Advanced settings
              </button>
              {showAdvancedStep2 && (
                <Card>
                  <CardContent className="p-4 space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span>Assistant name</span>
                      <Select defaultValue="sarah">
                        <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sarah">Sarah</SelectItem>
                          <SelectItem value="alex">Alex</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Retry intervals</span>
                      <span className="text-muted-foreground">7d → 14d → 30d</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Max attempts</span>
                      <span className="text-muted-foreground">3</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Voicemail</span>
                      <span className="text-muted-foreground">Hang up (default)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Return leads to</span>
                      <span className="text-muted-foreground">Original agent</span>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  <ArrowLeft className="h-4 w-4 mr-1" /> Back
                </Button>
                <Button onClick={() => setStep(3)}>
                  Next: Review <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: REVIEW & ACTIVATE */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Review & Activate</h2>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Automation Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="grid grid-cols-2 gap-y-2">
                    <span className="text-muted-foreground">Name</span>
                    <span className="font-medium">{dealType === "sale" ? "Sale" : "Rental"} Leads — Limassol</span>
                    <span className="text-muted-foreground">Audience</span>
                    <span>Contact Made + Sleep, {dealType === "sale" ? "Sale" : "Rental"}, Limassol, &gt;{inactivityDays}d</span>
                    <span className="text-muted-foreground">Matching leads</span>
                    <span className="font-medium">{matchingLeads}</span>
                    <span className="text-muted-foreground">Channel</span>
                    <span>WhatsApp → Voice fallback</span>
                    <span className="text-muted-foreground">Schedule</span>
                    <span>Daily — WA at 09:30, Voice 17:00–20:00</span>
                    <span className="text-muted-foreground">Batch size</span>
                    <span>30 leads/day</span>
                    <span className="text-muted-foreground">Est. completion</span>
                    <span>~5 days</span>
                  </div>
                  <Separator className="my-3" />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-600" /> Update lead status in Qobrix</div>
                    <div className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-600" /> Add conversation summary as note</div>
                    <div className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-600" /> Return lead to original assigned agent</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-4 space-y-3">
                  <div className="text-sm font-medium">Start with a test?</div>
                  <p className="text-sm text-muted-foreground">
                    Run a batch of 50 leads first to see results before activating the full automation.
                  </p>
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setScenario("activated")}>
                      Test with 50 leads
                    </Button>
                    <Button onClick={() => setScenario("activated")}>
                      Activate all ({matchingLeads})
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Button variant="outline" onClick={() => setStep(2)}>
                <ArrowLeft className="h-4 w-4 mr-1" /> Back
              </Button>
            </div>
          )}
        </>
      )}

      {/* === SCENARIO: ACTIVATED === */}
      {scenario === "activated" && (
        <div className="space-y-6">
          <div className="flex flex-col items-center text-center py-8 space-y-4">
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold">Re-engagement Activated!</h1>
            <p className="text-muted-foreground max-w-md">
              Your automation &quot;Sale Leads — Limassol&quot; is live. First messages will be sent tomorrow at 09:30.
            </p>
          </div>

          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="text-sm font-medium">What to expect:</div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <span><strong>Tomorrow AM</strong> — WhatsApp messages sent to first 30 leads</span>
                </div>
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <span><strong>Tomorrow PM</strong> — First replies start arriving</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span><strong>Tomorrow 17:00</strong> — Voice calls to non-responders</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                  <span><strong>Day 2</strong> — Review first results + CRM updated</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Link href="/automations"><Button>Go to Automations</Button></Link>
            <Button variant="outline" onClick={() => { setScenario("setup"); setStep(1); setDealType("rent"); setInactivityDays("14"); }}>
              Create Rental Automation
            </Button>
          </div>
        </div>
      )}

      {/* === SCENARIO: FIRST RESULTS === */}
      {scenario === "results" && (
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">First Run Results — Sale Leads — Limassol</h1>
          <p className="text-sm text-muted-foreground">
            Automation continues running automatically. You can pause or adjust anytime.
          </p>

          {/* Summary cards */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "Leads contacted", value: "28", sub: "" },
              { label: "Interested", value: "3", sub: "", color: "text-green-600" },
              { label: "Callback Later", value: "1", sub: "", color: "text-blue-600" },
              { label: "Not Reachable", value: "18", sub: "64% — normal range", color: "" },
            ].map(m => (
              <Card key={m.label}>
                <CardContent className="p-4 text-center">
                  <div className={`text-3xl font-bold ${m.color || ""}`}>{m.value}</div>
                  <div className="text-sm text-muted-foreground">{m.label}</div>
                  {m.sub && <div className="text-xs text-muted-foreground">{m.sub}</div>}
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-sm text-muted-foreground">
            Your 11% interested rate is above average for Cyprus agencies.
          </p>

          {/* Interested leads */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-green-600">Interested Leads</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {interestedLeads.map(lead => (
                <div key={lead.id} className="flex items-start justify-between p-3 rounded-md border">
                  <div>
                    <div className="font-medium flex items-center gap-2">
                      {lead.name}
                      <Badge className="bg-green-100 text-green-800">Interested</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">&quot;{lead.aiSummary?.slice(0, 100)}...&quot;</p>
                    <div className="text-xs text-muted-foreground mt-1">
                      Agent: {lead.agent} · CRM: ✓ Updated · {lead.contactChannel === "whatsapp" ? "WhatsApp" : "Voice"}
                    </div>
                  </div>
                  <Link href="/leads"><Button variant="outline" size="sm">View</Button></Link>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Callback leads */}
          {callbackLeads.length > 0 && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-blue-600">Callback Later</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {callbackLeads.slice(0, 1).map(lead => (
                  <div key={lead.id} className="flex items-start justify-between p-3 rounded-md border">
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {lead.name}
                        <Badge className="bg-blue-100 text-blue-800">Callback</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">&quot;{lead.aiSummary?.slice(0, 100)}...&quot;</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          <Card className="bg-muted/30">
            <CardContent className="p-4 space-y-1 text-sm">
              <div className="font-medium">CRM Updated</div>
              <div className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-600" /> 3 leads → status &quot;Re-engagement&quot; in Qobrix</div>
              <div className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-600" /> 6 leads → &quot;Closed — Re-engagement&quot;</div>
              <div className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-600" /> Activity notes added to all contacted leads</div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Link href="/automations"><Button>View Automations</Button></Link>
            <Link href="/leads"><Button variant="outline">View All Leads</Button></Link>
          </div>
        </div>
      )}
    </div>
  );
}

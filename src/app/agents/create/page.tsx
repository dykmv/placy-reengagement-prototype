"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, ArrowLeft, ArrowRight, ChevronDown, ChevronUp, MessageSquare, Phone, AlertTriangle, Search } from "lucide-react";
import { MOCK_LEADS } from "@/lib/mock-data";
import Link from "next/link";

type Scenario = "setup" | "activated" | "results";

const ALL_STATUSES = [
  { key: "new", label: "New", default: false },
  { key: "assigned", label: "Assigned", default: false },
  { key: "contactMade", label: "Contact Made", default: true },
  { key: "viewing", label: "Viewing", default: false },
  { key: "negotiation", label: "Negotiation", default: false },
  { key: "asleep", label: "Asleep", default: true },
  { key: "closedWon", label: "Closed Won", default: false },
  { key: "closedLost", label: "Closed Lost", default: false },
];

const CITIES = [
  "Limassol", "Paphos", "Nicosia", "Larnaca", "Famagusta", "Ayia Napa",
  "Paralimni", "Germasogeia", "Mesa Geitonia", "Kato Paphos", "Polis Chrysochous",
];

// All time slots from 00:00 to 23:30
const TIME_SLOTS = Array.from({ length: 48 }, (_, i) => {
  const h = String(Math.floor(i / 2)).padStart(2, "0");
  const m = i % 2 === 0 ? "00" : "30";
  return `${h}:${m}`;
});

function isUnsocialTime(time: string): boolean {
  const hour = parseInt(time.split(":")[0]);
  return hour >= 21 || hour < 8;
}

export default function CreateAutomationPage() {
  const [scenario, setScenario] = useState<Scenario>("setup");
  const [step, setStep] = useState(1);
  const [dealType, setDealType] = useState<"sale" | "rent">("sale");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [channel, setChannel] = useState("wa-first");
  const [statuses, setStatuses] = useState<Record<string, boolean>>(
    Object.fromEntries(ALL_STATUSES.map(s => [s.key, s.default]))
  );
  const [allCities, setAllCities] = useState(true);
  const [selectedCities, setSelectedCities] = useState<Record<string, boolean>>(
    Object.fromEntries(CITIES.map(c => [c, true]))
  );
  const [citySearch, setCitySearch] = useState("");
  const [inactivityDays, setInactivityDays] = useState("60");
  const [waTime, setWaTime] = useState("09:30");
  const [voiceStart, setVoiceStart] = useState("17:00");
  const [voiceEnd, setVoiceEnd] = useState("20:00");
  const [assistantName, setAssistantName] = useState("Sarah");
  const [maxAttempts, setMaxAttempts] = useState("3");
  const [retryInterval, setRetryInterval] = useState("2");
  const [messageTab, setMessageTab] = useState<"whatsapp" | "voice">("whatsapp");

  const matchingLeads = dealType === "sale" ? 142 : 89;
  const sampleLeads = MOCK_LEADS.filter(l => l.dealType === dealType && l.status !== "pending").slice(0, 3);
  const interestedLeads = MOCK_LEADS.filter(l => l.status === "interested").slice(0, 3);
  const callbackLeads = MOCK_LEADS.filter(l => l.status === "callback_later").slice(0, 2);

  const filteredCities = CITIES.filter(c => c.toLowerCase().includes(citySearch.toLowerCase()));

  const toggleAllCities = (checked: boolean) => {
    setAllCities(checked);
    setSelectedCities(Object.fromEntries(CITIES.map(c => [c, checked])));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Scenario Switcher */}
      <Card className="bg-muted/50">
        <CardContent className="p-3">
          <div className="text-xs text-muted-foreground mb-2">Demo mode — switch scenario:</div>
          <Tabs value={scenario} onValueChange={(v) => setScenario(v as Scenario)}>
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="setup">Agent Setup</TabsTrigger>
              <TabsTrigger value="activated">Agent Active</TabsTrigger>
              <TabsTrigger value="results">First Results (Day 2)</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      {/* === SCENARIO: SETUP === */}
      {scenario === "setup" && (
        <>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Set Up Re-engagement Agent</h1>
            <div className="text-sm text-muted-foreground">Step {step} of 3</div>
          </div>

          {/* How it works — explainer */}
          <Card className="bg-blue-50/50 border-blue-200">
            <CardContent className="p-4 text-sm space-y-2">
              <div className="font-medium">How Re-engagement works</div>
              <ol className="list-decimal ml-4 space-y-1 text-muted-foreground">
                <li>You select which leads from your CRM need follow-up</li>
                <li>Placy AI contacts them via WhatsApp and/or Voice on your schedule</li>
                <li>The agent asks if they&apos;re still interested, collects updated preferences</li>
                <li>Interested leads are returned to your team with full context in your CRM</li>
              </ol>
            </CardContent>
          </Card>

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
                  <Card key={opt.value} className={`cursor-pointer transition-colors ${dealType === opt.value ? "border-primary bg-primary/5" : "hover:bg-muted/50"}`} onClick={() => { setDealType(opt.value as "sale" | "rent"); setInactivityDays(opt.value === "sale" ? "60" : "14"); }}>
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
              <button onClick={() => setShowAdvanced(!showAdvanced)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                Advanced filters
              </button>

              {showAdvanced && (
                <Card>
                  <CardContent className="p-4 space-y-4">
                    {/* Lead statuses — all CRM statuses */}
                    <div>
                      <div className="text-sm font-medium mb-2">Lead statuses</div>
                      <div className="grid grid-cols-2 gap-2">
                        {ALL_STATUSES.map(s => (
                          <label key={s.key} className="flex items-center gap-2 text-sm">
                            <Checkbox
                              checked={statuses[s.key]}
                              onCheckedChange={(v) => setStatuses(prev => ({ ...prev, [s.key]: !!v }))}
                            />
                            {s.label}
                          </label>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Default: &quot;Contact Made&quot; + &quot;Asleep&quot; — leads where initial contact was made but no recent follow-up.
                      </p>
                    </div>

                    <Separator />

                    {/* Cities — searchable list */}
                    <div>
                      <div className="text-sm font-medium mb-2">Location</div>
                      <label className="flex items-center gap-2 text-sm mb-2">
                        <Checkbox checked={allCities} onCheckedChange={(v) => toggleAllCities(!!v)} />
                        <span className="font-medium">Select all cities</span>
                      </label>
                      <div className="relative mb-2">
                        <Search className="absolute left-2 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                        <Input placeholder="Search city..." value={citySearch} onChange={(e) => setCitySearch(e.target.value)} className="pl-8 h-9 text-sm" />
                      </div>
                      <div className="grid grid-cols-2 gap-1.5 max-h-40 overflow-y-auto">
                        {filteredCities.map(city => (
                          <label key={city} className="flex items-center gap-2 text-sm">
                            <Checkbox
                              checked={selectedCities[city] ?? true}
                              onCheckedChange={(v) => {
                                setSelectedCities(prev => ({ ...prev, [city]: !!v }));
                                setAllCities(false);
                              }}
                            />
                            {city}
                          </label>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <div className="text-sm font-medium mb-2">Follow-up expired more than</div>
                      <div className="flex items-center gap-2">
                        <Input type="number" value={inactivityDays} onChange={(e) => setInactivityDays(e.target.value)} className="w-20" />
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
                <Button onClick={() => setStep(2)}>Next <ArrowRight className="h-4 w-4 ml-1" /></Button>
              </div>
            </div>
          )}

          {/* STEP 2: SCHEDULE & MESSAGE */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Schedule & Communication</h2>

              {/* Channel */}
              <div>
                <div className="text-sm font-medium mb-2">Channel</div>
                <div className="space-y-2">
                  {[
                    { value: "wa-first", label: "WhatsApp first, then Voice call", desc: "Best results: 83% qualification from WA replies", rec: true },
                    { value: "voice-first", label: "Voice call first, then WhatsApp", desc: "", rec: false },
                    { value: "wa-only", label: "WhatsApp only", desc: "", rec: false },
                  ].map(opt => (
                    <Card key={opt.value} className={`cursor-pointer transition-colors ${channel === opt.value ? "border-primary bg-primary/5" : "hover:bg-muted/50"}`} onClick={() => setChannel(opt.value)}>
                      <CardContent className="p-3 flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium flex items-center gap-2">{opt.label}{opt.rec && <Badge variant="secondary">Recommended</Badge>}</div>
                          {opt.desc && <div className="text-xs text-muted-foreground">{opt.desc}</div>}
                        </div>
                        <div className={`h-4 w-4 rounded-full border-2 ${channel === opt.value ? "border-primary bg-primary" : "border-muted-foreground"}`} />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Schedule — full time range with warnings */}
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
                  <Select value={waTime} onValueChange={(v) => v && setWaTime(v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent className="max-h-60">
                      {TIME_SLOTS.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  {isUnsocialTime(waTime) && (
                    <div className="flex items-center gap-1 mt-1 text-xs text-yellow-600">
                      <AlertTriangle className="h-3 w-3" /> Sending messages at this hour may annoy recipients
                    </div>
                  )}
                </div>
                <div>
                  <div className="text-sm font-medium mb-1 flex items-center gap-1"><Phone className="h-3 w-3" /> Voice call window</div>
                  <div className="flex items-center gap-1">
                    <Select value={voiceStart} onValueChange={(v) => v && setVoiceStart(v)}>
                      <SelectTrigger className="w-[80px]"><SelectValue /></SelectTrigger>
                      <SelectContent className="max-h-60">{TIME_SLOTS.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                    </Select>
                    <span className="text-xs">to</span>
                    <Select value={voiceEnd} onValueChange={(v) => v && setVoiceEnd(v)}>
                      <SelectTrigger className="w-[80px]"><SelectValue /></SelectTrigger>
                      <SelectContent className="max-h-60">{TIME_SLOTS.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  {(isUnsocialTime(voiceStart) || isUnsocialTime(voiceEnd)) && (
                    <div className="flex items-center gap-1 mt-1 text-xs text-yellow-600">
                      <AlertTriangle className="h-3 w-3" /> Calling at this hour may annoy recipients
                    </div>
                  )}
                </div>
              </div>

              {/* Message Preview — Tabs for WA and Voice */}
              <div>
                <div className="text-sm font-medium mb-2">Message Preview</div>
                <div className="flex gap-2 mb-3">
                  <Button size="sm" variant={messageTab === "whatsapp" ? "default" : "outline"} onClick={() => setMessageTab("whatsapp")}>
                    <MessageSquare className="h-3 w-3 mr-1" /> WhatsApp Message
                  </Button>
                  <Button size="sm" variant={messageTab === "voice" ? "default" : "outline"} onClick={() => setMessageTab("voice")}>
                    <Phone className="h-3 w-3 mr-1" /> Voice Script
                  </Button>
                </div>

                {messageTab === "whatsapp" && (
                  <Card className="max-w-sm mx-auto bg-[#e5ddd5]">
                    <CardContent className="p-4">
                      <div className="bg-white rounded-lg p-3 text-sm shadow-sm">
                        <p>Hi <strong>Alexei</strong>, this is <strong>{assistantName}</strong> from <strong>Domenica Group</strong>.</p>
                        <p className="mt-2">You previously contacted our agency about <strong>2-Bedroom Apartment in Limassol</strong>, priced at <strong>€250,000</strong> — <span className="text-blue-600 underline">domenicagroup.com/listing/12345</span>. Are you still looking for a property?</p>
                        <div className="text-[10px] text-right text-gray-500 mt-1">{waTime} ✓✓</div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {messageTab === "voice" && (
                  <Card className="max-w-sm mx-auto">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4" /> Voice script — what leads will hear:
                      </div>
                      <div className="p-3 bg-muted/50 rounded-lg text-sm italic">
                        &quot;Hi <strong>Alexei</strong>, this is <strong>{assistantName}</strong> from <strong>Domenica Group</strong>. You previously contacted our agency about a <strong>2-Bedroom Apartment in Limassol</strong>, priced at <strong>€250,000</strong>. Are you still looking for a property?&quot;
                      </div>
                      <div className="text-xs text-muted-foreground">
                        If the lead says yes → the agent asks about budget, timeline, preferences.<br />
                        If the lead says no → polite close, status updated.<br />
                        If callback requested → schedules follow-up.
                      </div>
                    </CardContent>
                  </Card>
                )}

                <p className="text-xs text-muted-foreground text-center mt-2">
                  Variables filled from CRM: <code className="bg-muted px-1 rounded">{"{{client_first_name}}"}</code> <code className="bg-muted px-1 rounded">{"{{listing_title}}"}</code> <code className="bg-muted px-1 rounded">{"{{listing_location}}"}</code> <code className="bg-muted px-1 rounded">{"{{listing_price}}"}</code> <code className="bg-muted px-1 rounded">{"{{listing_url}}"}</code>
                </p>
              </div>

              {/* Settings — inline, not hidden */}
              <Card>
                <CardContent className="p-4 space-y-3 text-sm">
                  <div className="font-medium">Agent Settings</div>
                  <div className="flex items-center justify-between">
                    <span>Assistant name</span>
                    <Input value={assistantName} onChange={(e) => setAssistantName(e.target.value)} className="w-40 text-right" />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span>Max attempts per lead</span>
                    <Select value={maxAttempts} onValueChange={(v) => v && setMaxAttempts(v)}>
                      <SelectTrigger className="w-20"><SelectValue /></SelectTrigger>
                      <SelectContent>{["1","2","3","4","5"].map(n => <SelectItem key={n} value={n}>{n}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span>Retry interval (days between attempts)</span>
                    <Select value={retryInterval} onValueChange={(v) => v && setRetryInterval(v)}>
                      <SelectTrigger className="w-20"><SelectValue /></SelectTrigger>
                      <SelectContent>{["1","2","3","5","7","14"].map(n => <SelectItem key={n} value={n}>{n}d</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    With {maxAttempts} attempts and {retryInterval}d interval: attempt 1 → wait {retryInterval}d → attempt 2 → wait {retryInterval}d → attempt 3
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span>Voicemail behavior</span>
                    <span className="text-muted-foreground">Hang up (default)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Return leads to</span>
                    <span className="text-muted-foreground">Original agent</span>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button>
                <Button onClick={() => setStep(3)}>Next: Review <ArrowRight className="h-4 w-4 ml-1" /></Button>
              </div>
            </div>
          )}

          {/* STEP 3: REVIEW & ACTIVATE */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Review & Activate</h2>

              <Card>
                <CardHeader className="pb-2"><CardTitle className="text-base">Agent Summary</CardTitle></CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="grid grid-cols-2 gap-y-2">
                    <span className="text-muted-foreground">Name</span>
                    <span className="font-medium">{dealType === "sale" ? "Sale" : "Rental"} Leads — Limassol</span>
                    <span className="text-muted-foreground">Audience</span>
                    <span>{ALL_STATUSES.filter(s => statuses[s.key]).map(s => s.label).join(", ")}, {dealType === "sale" ? "Sale" : "Rental"}, &gt;{inactivityDays}d</span>
                    <span className="text-muted-foreground">Matching leads</span>
                    <span className="font-medium">{matchingLeads}</span>
                    <span className="text-muted-foreground">Channel</span>
                    <span>{channel === "wa-first" ? "WhatsApp → Voice" : channel === "voice-first" ? "Voice → WhatsApp" : "WhatsApp only"}</span>
                    <span className="text-muted-foreground">Schedule</span>
                    <span>Daily — WA at {waTime}, Voice {voiceStart}–{voiceEnd}</span>
                    <span className="text-muted-foreground">Assistant</span>
                    <span>{assistantName}</span>
                    <span className="text-muted-foreground">Attempts</span>
                    <span>{maxAttempts} attempts, every {retryInterval} days</span>
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
                  <p className="text-sm text-muted-foreground">Run a batch of 50 leads first to see results before activating the full agent.</p>
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setScenario("activated")}>Test with 50 leads</Button>
                    <Button onClick={() => setScenario("activated")}>Activate Agent ({matchingLeads})</Button>
                  </div>
                </CardContent>
              </Card>

              <Button variant="outline" onClick={() => setStep(2)}><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button>
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
            <h1 className="text-2xl font-bold">Re-engagement Agent Activated!</h1>
            <p className="text-muted-foreground max-w-md">
              Your agent &quot;Sale Leads — Limassol&quot; is live. First messages will be sent tomorrow at {waTime}.
            </p>
          </div>
          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="text-sm font-medium">What to expect:</div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-3"><MessageSquare className="h-4 w-4 text-muted-foreground" /><span><strong>Tomorrow {waTime}</strong> — WhatsApp messages sent to first 30 leads</span></div>
                <div className="flex items-center gap-3"><MessageSquare className="h-4 w-4 text-muted-foreground" /><span><strong>Same day PM</strong> — First replies start arriving</span></div>
                <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-muted-foreground" /><span><strong>Tomorrow {voiceStart}</strong> — Voice calls to non-responders</span></div>
                <div className="flex items-center gap-3"><CheckCircle className="h-4 w-4 text-muted-foreground" /><span><strong>Day 2</strong> — Review first results + CRM updated</span></div>
              </div>
            </CardContent>
          </Card>
          <div className="flex gap-3">
            <Link href="/agents"><Button>Go to Agents</Button></Link>
            <Button variant="outline" onClick={() => { setScenario("setup"); setStep(1); setDealType("rent"); setInactivityDays("14"); }}>Set Up Rental Agent</Button>
          </div>
        </div>
      )}

      {/* === SCENARIO: FIRST RESULTS === */}
      {scenario === "results" && (
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">First Run Results — Sale Leads — Limassol</h1>
          <p className="text-sm text-muted-foreground">Agent continues running automatically. You can pause or adjust anytime.</p>

          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "Leads contacted", value: "28" },
              { label: "Interested", value: "3", color: "text-green-600" },
              { label: "Callback Later", value: "1", color: "text-blue-600" },
              { label: "Not Reachable", value: "18", sub: "64% — normal range" },
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

          <p className="text-sm text-muted-foreground">Your 11% interested rate is above average for Cyprus agencies.</p>

          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-base text-green-600">Interested Leads</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {interestedLeads.map(lead => (
                <div key={lead.id} className="flex items-start justify-between p-3 rounded-md border">
                  <div>
                    <div className="font-medium flex items-center gap-2">{lead.name}<Badge className="bg-green-100 text-green-800">Interested</Badge></div>
                    <p className="text-sm text-muted-foreground mt-1">&quot;{lead.aiSummary?.slice(0, 100)}...&quot;</p>
                    <div className="text-xs text-muted-foreground mt-1">Agent: {lead.agent} · CRM: ✓ Updated · {lead.contactChannel === "whatsapp" ? "WhatsApp" : "Voice"}</div>
                  </div>
                  <Link href="/leads"><Button variant="outline" size="sm">View</Button></Link>
                </div>
              ))}
            </CardContent>
          </Card>

          {callbackLeads.length > 0 && (
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-base text-blue-600">Callback Later</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {callbackLeads.slice(0, 1).map(lead => (
                  <div key={lead.id} className="p-3 rounded-md border">
                    <div className="font-medium flex items-center gap-2">{lead.name}<Badge className="bg-blue-100 text-blue-800">Callback</Badge></div>
                    <p className="text-sm text-muted-foreground mt-1">&quot;{lead.aiSummary?.slice(0, 100)}...&quot;</p>
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
            <Link href="/agents"><Button>View Agents</Button></Link>
            <Link href="/leads"><Button variant="outline">View All Leads</Button></Link>
          </div>
        </div>
      )}
    </div>
  );
}

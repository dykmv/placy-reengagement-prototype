"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, ArrowRight, Upload, CheckCircle, MessageSquare, Phone, ChevronDown, ChevronUp, Download, RotateCcw, Bot } from "lucide-react";
import Link from "next/link";

type Scenario = "upload" | "results" | "test-results";

const mockPreviewRows = [
  { name: "Alexei Petrov", phone: "+357 99 456 789", interest: "2-bed apartment", budget: "€250,000", source: "Facebook Ads" },
  { name: "Maria Konstantinou", phone: "+357 97 654 321", interest: "Villa", budget: "€400,000", source: "Facebook Ads" },
  { name: "Ivan Sokolov", phone: "+7 905 123 456", interest: "Rent 1-bed", budget: "€1,200/mo", source: "Facebook Ads" },
  { name: "Elena Georgiou", phone: "+357 99 111 222", interest: "2-bed apartment", budget: "€280,000", source: "Google Ads" },
  { name: "James Taylor", phone: "+44 79 8765 432", interest: "Penthouse", budget: "€500,000", source: "Facebook Ads" },
];

export default function CSVUploadPage() {
  const [scenario, setScenario] = useState<Scenario>("upload");
  const [step, setStep] = useState(1);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Scenario Switcher */}
      <Card className="bg-muted/50">
        <CardContent className="p-3">
          <div className="text-xs text-muted-foreground mb-2">Demo mode — switch scenario:</div>
          <Tabs value={scenario} onValueChange={(v) => setScenario(v as Scenario)}>
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="upload">CSV Upload</TabsTrigger>
              <TabsTrigger value="test-results">Test Batch (50)</TabsTrigger>
              <TabsTrigger value="results">Full Results</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      {/* === UPLOAD FLOW === */}
      {scenario === "upload" && (
        <>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Upload Leads for Re-engagement</h1>
            <div className="text-sm text-muted-foreground">Step {step} of 3</div>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3].map(s => (
              <div key={s} className={`h-1 flex-1 rounded-full ${s <= step ? "bg-primary" : "bg-muted"}`} />
            ))}
          </div>

          {/* STEP 1: UPLOAD & MAP */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Upload Your File</h2>

              {!fileUploaded ? (
                <Card className="border-2 border-dashed cursor-pointer hover:border-primary/50 transition-colors" onClick={() => setFileUploaded(true)}>
                  <CardContent className="p-12 text-center space-y-3">
                    <Upload className="h-10 w-10 mx-auto text-muted-foreground" />
                    <div className="font-medium">Drag & drop your CSV or Excel here</div>
                    <div className="text-sm text-muted-foreground">or click to browse</div>
                    <div className="text-xs text-muted-foreground">Supported: CSV, XLSX · Max: 10,000 rows</div>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="font-medium">leads_facebook_q3.csv</span>
                    <span className="text-muted-foreground">— 892 rows</span>
                  </div>

                  {/* Column mapping */}
                  <Card>
                    <CardHeader className="pb-2"><CardTitle className="text-sm">Column Mapping</CardTitle></CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      {[
                        { from: "Full Name", to: "Name", auto: true },
                        { from: "+35799...", to: "Phone", auto: true },
                        { from: "Email addr", to: "Email", auto: true },
                        { from: "Ad Campaign", to: "Source tag", auto: false },
                        { from: "Property Type", to: "Interest", auto: false },
                        { from: "Budget EUR", to: "Budget", auto: true },
                        { from: "Notes", to: "Context", auto: false },
                      ].map(col => (
                        <div key={col.from} className="flex items-center gap-3">
                          <span className="w-32 text-muted-foreground truncate">&quot;{col.from}&quot;</span>
                          <span>→</span>
                          <Badge variant={col.auto ? "default" : "secondary"} className="text-xs">{col.to}{col.auto && " ✓"}</Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Warnings */}
                  <div className="space-y-1 text-sm">
                    <div className="text-yellow-600">⚠️ 12 rows missing phone — will be excluded</div>
                    <div className="text-yellow-600">⚠️ 3 duplicate phone numbers — will be merged</div>
                    <div className="font-medium">Valid leads: 877</div>
                  </div>

                  {/* Data preview */}
                  <Card>
                    <CardHeader className="pb-2"><CardTitle className="text-sm">Preview (first 5 rows)</CardTitle></CardHeader>
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Interest</TableHead>
                            <TableHead>Budget</TableHead>
                            <TableHead>Source</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {mockPreviewRows.map((r, i) => (
                            <TableRow key={i}>
                              <TableCell className="text-sm">{r.name}</TableCell>
                              <TableCell className="text-sm text-muted-foreground">{r.phone}</TableCell>
                              <TableCell className="text-sm">{r.interest}</TableCell>
                              <TableCell className="text-sm">{r.budget}</TableCell>
                              <TableCell className="text-sm text-muted-foreground">{r.source}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  {/* Campaign tag */}
                  <div>
                    <div className="text-sm font-medium mb-1">Campaign tag</div>
                    <Input defaultValue="Facebook Villas Q3 2025" className="max-w-sm" />
                    <div className="text-xs text-muted-foreground mt-1">Helps you identify this batch later</div>
                  </div>
                </div>
              )}

              <p className="text-xs text-muted-foreground">Each row needs at least a phone number. Name and property interest help personalize the message.</p>

              <div className="flex justify-end">
                <Button onClick={() => { setFileUploaded(true); setStep(2); }} disabled={false}>
                  Next: Review Message <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: MESSAGE & SETTINGS */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Message & Settings</h2>

              <div>
                <div className="text-sm font-medium mb-2">Channel</div>
                <div className="space-y-2">
                  {[
                    { value: "wa", label: "WhatsApp first, then Voice", rec: true },
                    { value: "voice", label: "Voice first, then WhatsApp", rec: false },
                    { value: "wa-only", label: "WhatsApp only", rec: false },
                  ].map(opt => (
                    <Card key={opt.value} className={`cursor-pointer ${opt.rec ? "border-primary bg-primary/5" : "hover:bg-muted/50"}`}>
                      <CardContent className="p-3 flex items-center justify-between">
                        <div className="text-sm font-medium flex items-center gap-2">
                          {opt.label}
                          {opt.rec && <Badge variant="secondary">Recommended</Badge>}
                        </div>
                        <div className={`h-4 w-4 rounded-full border-2 ${opt.rec ? "border-primary bg-primary" : "border-muted-foreground"}`} />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-sm font-medium mb-1 flex items-center gap-1"><MessageSquare className="h-3 w-3" /> WA send time</div>
                  <Select defaultValue="09:30">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["08:00","09:00","09:30","10:00","11:00"].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2">
                  <div className="text-sm font-medium mb-1 flex items-center gap-1"><Phone className="h-3 w-3" /> Voice call window</div>
                  <div className="flex items-center gap-1">
                    <Select defaultValue="17:00">
                      <SelectTrigger className="w-24"><SelectValue /></SelectTrigger>
                      <SelectContent>{["15:00","16:00","17:00","18:00"].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                    </Select>
                    <span className="text-xs">to</span>
                    <Select defaultValue="20:00">
                      <SelectTrigger className="w-24"><SelectValue /></SelectTrigger>
                      <SelectContent>{["19:00","20:00","21:00"].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Message preview */}
              <div>
                <div className="text-sm font-medium mb-2">Message Preview</div>
                <Card className="max-w-sm mx-auto bg-[#e5ddd5]">
                  <CardContent className="p-4">
                    <div className="bg-white rounded-lg p-3 text-sm shadow-sm">
                      <p>Hi <strong>Alexei</strong>, this is <strong>Sarah</strong> from <strong>Domenica Group</strong>.</p>
                      <p className="mt-2">You showed interest in <strong>Villas</strong> some time ago. Are you still looking for property in Cyprus?</p>
                      <p className="mt-2">Reply YES if you&apos;re still interested!</p>
                      <div className="text-[10px] text-right text-gray-500 mt-1">09:31 ✓✓</div>
                    </div>
                  </CardContent>
                </Card>
                <p className="text-xs text-muted-foreground text-center mt-2">Uses real data from your file: &quot;Alexei&quot; from Name, &quot;Villas&quot; from Interest.</p>
              </div>

              {/* Advanced */}
              <button onClick={() => setShowAdvanced(!showAdvanced)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                Advanced settings
              </button>
              {showAdvanced && (
                <Card>
                  <CardContent className="p-4 space-y-3 text-sm">
                    <div className="flex justify-between"><span>Assistant name</span><span className="text-muted-foreground">Sarah</span></div>
                    <div className="flex justify-between"><span>Languages</span><span className="text-muted-foreground">EN, RU, EL (auto-detect)</span></div>
                    <div className="flex justify-between"><span>Retry after no response</span><span className="text-muted-foreground">7 days</span></div>
                    <div className="flex justify-between"><span>Max attempts</span><span className="text-muted-foreground">3</span></div>
                    <div className="flex justify-between"><span>Voicemail</span><span className="text-muted-foreground">Hang up</span></div>
                  </CardContent>
                </Card>
              )}

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button>
                <Button onClick={() => setStep(3)}>Next: Launch <ArrowRight className="h-4 w-4 ml-1" /></Button>
              </div>
            </div>
          )}

          {/* STEP 3: LAUNCH */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Launch Campaign</h2>

              <Card>
                <CardHeader className="pb-2"><CardTitle className="text-base">Campaign Summary</CardTitle></CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="grid grid-cols-2 gap-y-2">
                    <span className="text-muted-foreground">File</span><span>leads_facebook_q3.csv</span>
                    <span className="text-muted-foreground">Valid leads</span><span className="font-medium">877</span>
                    <span className="text-muted-foreground">Tag</span><span>Facebook Villas Q3 2025</span>
                    <span className="text-muted-foreground">Channel</span><span>WhatsApp → Voice fallback</span>
                    <span className="text-muted-foreground">WA time / Voice window</span><span>09:30 / 17:00–20:00</span>
                    <span className="text-muted-foreground">Est. completion</span><span>2-3 days</span>
                    <span className="text-muted-foreground">First results</span><span>Within 24 hours</span>
                  </div>
                </CardContent>
              </Card>

              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md text-sm">
                ⚠️ You are about to contact 877 leads via WhatsApp and Voice from your agency&apos;s number.
              </div>

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-4 space-y-3">
                  <div className="text-sm font-medium">Want to test first?</div>
                  <p className="text-sm text-muted-foreground">Run 50 leads to see results before launching the full campaign.</p>
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setScenario("test-results")}>Test with 50 leads</Button>
                    <Button onClick={() => setScenario("results")}>Launch All (877)</Button>
                  </div>
                </CardContent>
              </Card>

              <Button variant="outline" onClick={() => setStep(2)}><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button>
            </div>
          )}
        </>
      )}

      {/* === TEST BATCH RESULTS === */}
      {scenario === "test-results" && (
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">Test Batch Results — Facebook Villas Q3 2025</h1>
          <p className="text-sm text-muted-foreground">50 leads tested out of 877 total</p>

          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "Total tested", value: "50" },
              { label: "Contacted", value: "14", sub: "28%" },
              { label: "Interested", value: "3", color: "text-green-600" },
              { label: "Callback", value: "1", color: "text-blue-600" },
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

          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-base text-green-600">Interested Leads</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: "Alexei Petrov", summary: "Budget €280K, ground floor with garden. Available next week." },
                { name: "Elena Volkova", summary: "2-bed in Germasogeia, 3-month timeline. €220K." },
                { name: "James Smith", summary: "Villa €400-500K, relocating from UK. Ready to view." },
              ].map(l => (
                <div key={l.name} className="flex items-start justify-between p-3 rounded-md border">
                  <div>
                    <div className="font-medium flex items-center gap-2">{l.name}<Badge className="bg-green-100 text-green-800">Interested</Badge></div>
                    <p className="text-sm text-muted-foreground mt-1">&quot;{l.summary}&quot;</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Separator />

          <div className="space-y-3">
            <div className="font-medium">Happy with the results? Launch the remaining 827 leads.</div>
            <div className="flex gap-3">
              <Button onClick={() => setScenario("results")}>Launch Remaining 827 Leads</Button>
              <Button variant="outline" onClick={() => { setScenario("upload"); setStep(2); }}>Adjust Settings</Button>
            </div>
            <Button variant="outline" size="sm"><Download className="h-3 w-3 mr-1" />Export Test Results (CSV)</Button>
          </div>
        </div>
      )}

      {/* === FULL CAMPAIGN RESULTS === */}
      {scenario === "results" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Campaign: Facebook Villas Q3 2025</h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge className="bg-green-100 text-green-800">Completed</Badge>
                <span className="text-sm text-muted-foreground">Duration: 2.5 days</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "Total leads", value: "877" },
              { label: "Contacted", value: "234", sub: "27%" },
              { label: "Interested", value: "32", color: "text-green-600" },
              { label: "Callback Later", value: "15", color: "text-blue-600" },
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

          {/* Outcome breakdown */}
          <Card>
            <CardContent className="p-4 space-y-3">
              {[
                { label: "Interested", count: 32, pct: "3.7%", color: "bg-green-500" },
                { label: "Callback Later", count: 15, pct: "1.7%", color: "bg-blue-500" },
                { label: "Not Interested", count: 48, pct: "5.5%", color: "bg-red-500" },
                { label: "Not Reachable", count: 782, pct: "89.2%", color: "bg-gray-400" },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className={`h-3 w-3 rounded-full ${item.color}`} />
                  <span className="w-32 text-sm">{item.label}</span>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${parseFloat(item.pct) * 3}%` }} />
                  </div>
                  <span className="text-sm font-medium w-8 text-right">{item.count}</span>
                  <span className="text-xs text-muted-foreground w-12 text-right">{item.pct}</span>
                </div>
              ))}
              <p className="text-xs text-muted-foreground">Similar campaigns average 4-7% qualification. Your 5.4% (interested + callback) is on track.</p>
            </CardContent>
          </Card>

          {/* Channel performance */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4 text-sm space-y-1">
                <div className="font-medium flex items-center gap-2"><MessageSquare className="h-4 w-4" /> WhatsApp</div>
                <div className="flex justify-between"><span>Sent</span><span>877</span></div>
                <div className="flex justify-between"><span>Replied</span><span>89 (10.1%)</span></div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-sm space-y-1">
                <div className="font-medium flex items-center gap-2"><Phone className="h-4 w-4" /> Voice fallback</div>
                <div className="flex justify-between"><span>Calls</span><span>788</span></div>
                <div className="flex justify-between"><span>Answered</span><span>145 (18.4%)</span></div>
              </CardContent>
            </Card>
          </div>

          <Separator />

          {/* Export */}
          <div className="space-y-3">
            <div className="font-medium">Export Results</div>
            <div className="flex gap-3">
              <Button variant="outline"><Download className="h-4 w-4 mr-2" />Export All Results (CSV)</Button>
              <Button variant="outline"><Download className="h-4 w-4 mr-2" />Export Only Interested (47)</Button>
            </div>
          </div>

          <Separator />

          {/* What's next */}
          <Card className="bg-muted/30">
            <CardContent className="p-4 space-y-3">
              <div className="font-medium">What&apos;s next?</div>
              <p className="text-sm text-muted-foreground">782 leads were not reachable. A retry often reaches 10-15% more.</p>
              <div className="flex gap-3 flex-wrap">
                <Button variant="outline"><RotateCcw className="h-4 w-4 mr-2" />Retry Unreachable Leads</Button>
                <Button variant="outline"><Upload className="h-4 w-4 mr-2" />Upload New Batch</Button>
              </div>
              <Separator />
              <div className="flex items-center gap-2">
                <Bot className="h-4 w-4 text-primary" />
                <span className="text-sm">Want results automatically in your CRM? Connect Qobrix for auto-sync.</span>
                <Link href="/agents/create"><Button size="sm" variant="outline">Connect CRM</Button></Link>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

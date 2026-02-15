import React, { useState, useRef, useEffect } from 'react';
import { Building2, Cpu, FileText, CheckCircle, ChevronRight, LogOut, Clock, Zap, ArrowRight } from 'lucide-react';
import { Button, Card, Input, Badge } from '../components';

export const LoginPage: React.FC<{ onLogin: (name: string) => void }> = ({ onLogin }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin('Aman');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full px-4 animate-fade-in">
      <div className="mb-10 text-center">
        <div className="w-16 h-16 bg-[#8B5CF6] rounded-xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#8B5CF6]/20">
          <Cpu size={32} className="text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#111827] tracking-tight mb-2">
          BidCraft <span className="text-[#8B5CF6]">Agentic AI</span>
        </h1>
        <p className="text-[#6B7280] text-sm font-mono tracking-widest uppercase">Automated B2B Response System</p>
      </div>

      <Card className="w-full max-w-md shadow-lg border-[#E5E7EB]">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input id="email" label="Enterprise ID" placeholder="aman@corp.ai" defaultValue="Aman" required />
          <Input id="password" type="password" label="Secure Token" placeholder="••••••••••••" required />
          <Button type="submit" className="w-full py-4 shadow-md">
            Initialize Session <ArrowRight size={14} />
          </Button>
        </form>
        <div className="mt-6 pt-6 border-t border-[#E5E7EB] flex justify-between text-[10px] text-[#9CA3AF] font-mono uppercase">
          <span>System: Online</span>
          <span>Latency: 12ms</span>
        </div>
      </Card>
    </div>
  );
};

export const OnboardingPage: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [selectedSectors, setSelectedSectors] = useState<string[]>(['Web Development']);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const toggleSector = (sector: string) => {
    if (selectedSectors.includes(sector)) {
      setSelectedSectors((prev) => prev.filter((s) => s !== sector));
    } else {
      if (selectedSectors.length < 2) {
        setSelectedSectors((prev) => [...prev, sector]);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 w-full px-4 animate-fade-in pb-20">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-[#EDE9FE] rounded-lg text-[#6D28D9] border border-[#DDD6FE]"><Building2 size={24} /></div>
        <div>
          <h2 className="text-2xl font-bold text-[#111827]">Organization Profile</h2>
          <p className="text-[#6B7280] text-xs font-mono">Configure Agent Parameters</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Entity Identity">
          <div className="space-y-4">
            <Input id="orgName" label="Legal Name" placeholder="Aman Solutions Ltd." defaultValue="Aman Solutions Ltd."/>
            <div className="flex flex-col gap-2 w-full">
              <label className="text-[#6B7280] text-[10px] font-bold uppercase tracking-widest ml-1">
                Primary Sector <span className="text-[#8B5CF6] ml-1">(Max 2)</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['Web Development', 'Mobile Apps', 'Enterprise SaaS', 'Cloud DevOps'].map((sector) => {
                  const isSelected = selectedSectors.includes(sector);
                  return (
                    <button
                      key={sector}
                      type="button"
                      onClick={() => toggleSector(sector)}
                      className={`px-3 py-3 rounded-lg text-[10px] font-bold uppercase border transition-all ${isSelected ? 'bg-[#EDE9FE] border-[#8B5CF6] text-[#6D28D9]' : 'bg-white border-[#E5E7EB] text-[#6B7280] hover:border-[#9CA3AF]'} ${!isSelected && selectedSectors.length >= 2 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {sector}
                    </button>
                  );
                })}
              </div>
              <p className="text-[10px] text-[#9CA3AF] text-right">{selectedSectors.length}/2 Selected</p>
            </div>
            <Input id="location" label="Headquarters" placeholder="Mumbai, India" defaultValue="Mumbai, India" />
          </div>
        </Card>

        <Card title="Knowledge Base" subtitle="Agent Context Source">
          <div className="space-y-4">
            <div className="border-2 border-dashed border-[#E5E7EB] rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-[#F8FAFC] hover:border-[#8B5CF6] transition-all cursor-pointer group relative" onClick={() => fileInputRef.current?.click()}>
              <input type="file" className="hidden" ref={fileInputRef} onChange={handleFileChange} accept=".pdf,.docx,.pptx" />
              {fileName ? (
                <>
                  <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mb-3">
                    <CheckCircle size={20} className="text-emerald-500" />
                  </div>
                  <span className="text-sm font-bold text-[#111827]">{fileName}</span>
                  <span className="text-[10px] text-emerald-600 mt-1">Ready for analysis</span>
                </>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-full bg-[#EDE9FE] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <FileText size={20} className="text-[#8B5CF6]" />
                  </div>
                  <span className="text-sm font-bold text-[#111827] group-hover:text-[#6D28D9]">Upload Company Profile</span>
                  <span className="text-[10px] text-[#9CA3AF] mt-1">PDF, DOCX, PPTX (Max 20MB)</span>
                </>
              )}
            </div>

            <div className="bg-[#F8FAFC] rounded-lg p-4 border border-[#E5E7EB]">
              <p className="text-xs font-semibold text-[#111827] mb-2">
                Please upload a company profile, pitch deck, or capability document that describes how your company works.
              </p>
              <p className="text-[11px] text-[#6B7280] mb-3 leading-relaxed">
                This helps our AI generate accurate solutions, realistic timelines, and correct pricing in proposals.
              </p>
              <div className="text-[10px] text-[#6B7280] space-y-1 pl-1">
                <p className="font-semibold text-[#4B5563] mb-1">Your document should ideally include:</p>
                <ul className="list-disc pl-4 space-y-0.5">
                  <li>Company overview & positioning</li>
                  <li>Services you offer (e.g., Web, Mobile, AI, Cloud, etc.)</li>
                  <li>Industries you serve</li>
                  <li>Your delivery model or team structure</li>
                  <li>Your typical pricing approach or cost structure</li>
                  <li>Past projects / case studies</li>
                  <li>Any certifications or compliance requirements</li>
                </ul>
                <p className="mt-2 text-[#8B5CF6] font-medium italic">The better this document, the more accurate your proposals and pricing will be.</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex justify-end mt-8">
        <Button onClick={onNext} disabled={selectedSectors.length === 0} className={selectedSectors.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}>
          Enter Dashboard <ChevronRight size={14} />
        </Button>
      </div>
    </div>
  );
};

export const DashboardPage: React.FC<{ onNew: () => void }> = ({ onNew }) => {
  const stats = [
    { label: 'Active Bids', val: '04', icon: Clock, color: 'text-[#6D28D9]', bg: 'bg-[#EDE9FE]' },
    { label: 'Win Rate', val: '68%', icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Agents', val: '12', icon: Cpu, color: 'text-[#8B5CF6]', bg: 'bg-[#F3F4F6]' },
    { label: 'Credits', val: '∞', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50' }
  ];

  return (
    <div className="max-w-6xl mx-auto py-10 w-full px-4 animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-[#111827] tracking-tight">Command Center</h2>
          <p className="text-[#6B7280] mt-1 text-xs font-mono uppercase">User: Aman // Role: Admin</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={onNew}><FileText size={14} /> New Project</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-white border border-[#E5E7EB] p-4 rounded-xl flex flex-col justify-between h-24 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest">{s.label}</span>
                <div className={`p-1.5 rounded-md ${s.bg}`}>
                  <Icon size={16} className={s.color} />
                </div>
              </div>
              <p className="text-2xl font-bold text-[#111827]">{s.val}</p>
            </div>
          );
        })}
      </div>

      <Card title="Live Operations">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="text-[10px] text-[#6B7280] font-mono border-b border-[#E5E7EB]">
                <th className="py-4 pl-2 font-normal uppercase">RFP Document</th>
                <th className="py-4 font-normal uppercase">Sector</th>
                <th className="py-4 font-normal uppercase">Status</th>
                <th className="py-4 text-right pr-2 font-normal uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {[
                { name: 'Enterprise_SaaS_Platform.pdf', ind: 'SaaS', status: 'complete', date: '2m ago' },
                { name: 'Gov_Portal_Redesign.docx', ind: 'Public Sector', status: 'waiting', date: '1h ago' },
                { name: 'Crypto_Exchange_v2.pdf', ind: 'FinTech', status: 'failed', date: '1d ago' }
              ].map((row, i) => (
                <tr key={i} className="border-b border-[#E5E7EB] hover:bg-[#F8FAFC] transition-colors group">
                  <td className="py-4 pl-2 font-medium text-[#111827] group-hover:text-[#6D28D9] flex items-center gap-3">
                    <FileText size={14} className="text-[#9CA3AF]" /> {row.name}
                  </td>
                  <td className="py-4 text-[#6B7280]">{row.ind}</td>
                  <td className="py-4">
                    <Badge color={row.status === 'complete' ? 'emerald' : row.status === 'failed' ? 'red' : 'amber'}>
                      {row.status}
                    </Badge>
                  </td>
                  <td className="py-4 text-right pr-2">
                    <button className="text-[#9CA3AF] hover:text-[#6D28D9] transition-colors"><ChevronRight size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export const WorkstationPage: React.FC<{ onReset: () => void }> = ({ onReset }) => {
  const [step, setStep] = useState<number>(0);
  const [logs, setLogs] = useState<string[]>([]);
  const logsEndRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  useEffect(() => {
    let interval: number | undefined;
    let timeout: number | undefined;

    if (step === 2) {
      const seq = [
        'Initializing Bidcraft Agent...',
        'Connecting to LlamaParse API...',
        'OCR Extraction: Table structure detected (Page 4)...',
        "Semantic Search: Matching 'React/Node.js' in Tech Stack...",
        "Drafting Strategy: Focusing on 'Scalable Cloud Architecture'...",
        'Generating Section: Executive Summary...',
        'Generating Section: Technical Compliance...',
        'Finalizing Draft...'
      ];
      let i = 0;
      interval = window.setInterval(() => {
        if (i >= seq.length) {
          if (interval) window.clearInterval(interval);
          timeout = window.setTimeout(() => setStep(3), 1000);
        } else {
          setLogs((prev) => [...prev, seq[i]]);
          i++;
        }
      }, 800) as unknown as number;
    }

    return () => {
      if (interval) window.clearInterval(interval);
      if (timeout) window.clearTimeout(timeout);
    };
  }, [step]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setStep(2);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 w-full px-4 animate-fade-in pb-20">
      <div className="flex items-center justify-between mb-12 px-2 md:px-10 relative">
        <div className="absolute left-0 right-0 top-2 h-0.5 bg-[#E5E7EB] -z-10"></div>
        {['Industry', 'Upload', 'Analysis', 'Review', 'Export'].map((s, i) => (
          <div key={s} className="flex flex-col items-center gap-2 bg-[#F8FAFC] px-2">
            <div className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${i <= step ? 'bg-[#8B5CF6] border-[#8B5CF6] shadow-[0_0_10px_rgba(139,92,246,0.5)]' : 'bg-white border-[#9CA3AF]'}`}></div>
            <span className={`text-[10px] font-bold uppercase tracking-widest ${i <= step ? 'text-[#6D28D9]' : 'text-[#9CA3AF]'}`}>{s}</span>
          </div>
        ))}
      </div>

      {step === 0 && (
        <Card title="Industry Validation" subtitle="Step 1/5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button type="button" onClick={() => setStep(1)} className="p-6 text-left border border-[#E5E7EB] bg-white hover:bg-[#EDE9FE] hover:border-[#8B5CF6] rounded-xl transition-all group">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-[#111827] group-hover:text-[#6D28D9]">Web & App Development</span>
                <CheckCircle size={16} className="text-[#9CA3AF] group-hover:text-[#8B5CF6]" />
              </div>
              <p className="text-xs text-[#6B7280]">Matches Organization Profile</p>
            </button>

            <button type="button" onClick={() => setStep(1)} className="p-6 text-left border border-[#E5E7EB] bg-white hover:bg-[#EDE9FE] hover:border-[#8B5CF6] rounded-xl transition-all group">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-[#111827] group-hover:text-[#6D28D9]">Enterprise SaaS</span>
                <CheckCircle size={16} className="text-[#9CA3AF] group-hover:text-[#8B5CF6]" />
              </div>
              <p className="text-xs text-[#6B7280]">Serviceable Sector</p>
            </button>

            <button type="button" onClick={() => setStep(1)} className="p-6 text-left border border-[#E5E7EB] bg-white hover:bg-[#EDE9FE] hover:border-[#8B5CF6] rounded-xl transition-all group">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-[#111827] group-hover:text-[#6D28D9]">E-Commerce & Retail</span>
                <CheckCircle size={16} className="text-[#9CA3AF] group-hover:text-[#8B5CF6]" />
              </div>
              <p className="text-xs text-[#6B7280]">Serviceable Sector</p>
            </button>
          </div>
        </Card>
      )}

      {step === 1 && (
        <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-[#E5E7EB] rounded-2xl hover:border-[#8B5CF6] transition-colors bg-white relative text-center">
          <input type="file" className="hidden" ref={fileInputRef} onChange={handleFileSelect} />
          <div className="w-16 h-16 bg-[#EDE9FE] rounded-full flex items-center justify-center mb-6">
            <FileText size={32} className="text-[#8B5CF6]" />
          </div>
          <h3 className="text-xl font-bold text-[#111827] mb-2">Upload RFP Document</h3>
          <p className="text-[#6B7280] mb-8 text-sm font-mono max-w-md mx-auto">PDF, DOCX supported. LlamaParse Active.</p>
          <div className="w-full flex justify-center">
            <Button onClick={() => fileInputRef.current?.click()}>Select File & Analyze</Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <Card title="Agent Processing" subtitle="LlamaParse + Vector Search">
          <div className="bg-[#1F0B3A] rounded-lg p-6 font-mono text-xs h-64 overflow-y-auto border border-[#374151]">
            {logs.map((l, i) => (
              <div key={i} className="mb-2 flex gap-2 animate-fade-in">
                <span className="text-[#8B5CF6] font-bold">{'>'}</span>
                <span className="text-[#E5E7EB]">{l}</span>
              </div>
            ))}
            <div ref={logsEndRef} className="animate-pulse text-[#8B5CF6] font-bold">_</div>
          </div>
        </Card>
      )}

      {step === 3 && (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-[#111827]">Requirement Analysis</h2>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              {[
                { type: 'Critical', text: 'Must support 50k concurrent users.', match: 'Verified (Tech Stack Doc)' },
                { type: 'Standard', text: 'ISO 27001 Certification required.', match: 'Verified (Profile Page 1)' },
                { type: 'Risk', text: 'Liability cap exceeds standard policy.', match: 'Manual Review Recommended' }
              ].map((req, i) => (
                <div key={i} className="bg-white border-l-4 border-[#8B5CF6] p-4 rounded-r-lg shadow-sm border-t border-r border-b border-gray-100">
                  <div className="flex justify-between mb-1">
                    <span className="text-[10px] font-bold uppercase text-[#6D28D9]">{req.type}</span>
                    <span className="text-[10px] text-[#6B7280] font-mono">{req.match}</span>
                  </div>
                  <p className="text-sm text-[#111827]">{req.text}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <div className="text-center">
                  <h4 className="text-sm font-bold text-[#111827] mb-2">Confidence</h4>
                  <div className="text-4xl font-bold text-emerald-600 mb-1">94%</div>
                  <p className="text-[10px] text-[#6B7280] uppercase tracking-widest">Match Score</p>
                </div>
              </Card>
              <Card>
                <div className="text-center">
                  <h4 className="text-sm font-bold text-[#111827] mb-2">Est. Effort</h4>
                  <div className="text-4xl font-bold text-[#111827] mb-1">3 <span className="text-lg text-[#6B7280]">wks</span></div>
                  <p className="text-[10px] text-[#6B7280] uppercase tracking-widest">Implementation</p>
                </div>
              </Card>
              <Card>
                <div className="text-center">
                  <h4 className="text-sm font-bold text-[#111827] mb-2">Est. Cost</h4>
                  <div className="text-4xl font-bold text-[#111827] mb-1">$12<span className="text-lg text-[#6B7280]">k</span></div>
                  <p className="text-[10px] text-[#6B7280] uppercase tracking-widest">Project Budget</p>
                </div>
              </Card>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button onClick={() => setStep(4)} className="w-full sm:w-auto">
              Approve Draft & Export <ChevronRight size={14} className="ml-1" />
            </Button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-100">
            <CheckCircle size={48} className="text-emerald-500" />
          </div>
          <h2 className="text-3xl font-bold text-[#111827] mb-4">Bid Generated Successfully</h2>
          <p className="text-[#6B7280] mb-8 max-w-md mx-auto">The final proposal has been compiled and is ready for export. All 42 requirements have been addressed.</p>
          <div className="flex gap-4 justify-center">
            <Button variant="secondary" onClick={onReset}>Start New Bid</Button>
            <Button>Download PDF</Button>
          </div>
        </div>
      )}
    </div>
  );
};

// pages index exports handled via named exports above


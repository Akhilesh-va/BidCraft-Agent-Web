import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import html2pdf from "html2pdf.js";

const Page = styled.div`
  max-width: 1000px;
  margin: 24px auto;
  padding: 20px;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 22px;
  box-shadow: 0 8px 28px rgba(12, 18, 31, 0.06);
`;

const Title = styled.h2`
  margin: 0 0 12px;
`;

const ProposalResult: React.FC = () => {
  const { state } = useLocation() as { state: { result?: any } | null };
  const res = state?.result;

  if (!res) {
    return (
      <Page>
        <Card>
          <h3>No proposal available</h3>
          <p>Try running the agent pipeline again.</p>
        </Card>
      </Page>
    );
  }

  const proposal = res.proposal || res.refinedProposal || res.rfp?.generatedProposal || res.proposal;
  const reportHtml = res.reportHtml || (res.rfp && res.rfp.reportHtml);

  // prefer structured rendering from proposal object when available (avoids [object Object] from raw HTML)
  const hasStructured = !!proposal && typeof proposal === "object";

  return (
    <Page>
      <Card>
        <Title>Generated Proposal</Title>
        <p>
          <strong>RFP ID:</strong> {res?.rfp?._id || res?.rfp?.id || "n/a"}
        </p>
        <p>
          <strong>Status:</strong> {res?.ok ? "Completed" : "Completed (with warnings)"}
        </p>
        {hasStructured ? (
          <div style={{ marginTop: 18 }}>
            <h4>Proposal (structured)</h4>
            {/* Render all major sections as preview (not raw JSON) */}
            <section>
              <h5>Executive summary</h5>
              <p>{proposal.executive_summary?.overview || "—"}</p>
              {proposal.executive_summary?.value_proposition && <p><strong>Value proposition:</strong> {proposal.executive_summary.value_proposition}</p>}
            </section>

            <section style={{ marginTop: 12 }}>
              <h5>Understanding of requirements</h5>
              <p><strong>Project overview:</strong> {proposal.understanding_of_requirements?.project_overview || "—"}</p>
              {Array.isArray(proposal.understanding_of_requirements?.key_objectives) && (
                <>
                  <strong>Key objectives</strong>
                  <ul>{proposal.understanding_of_requirements.key_objectives.map((k: string, i: number) => <li key={i}>{k}</li>)}</ul>
                </>
              )}
              {Array.isArray(proposal.understanding_of_requirements?.in_scope) && (
                <>
                  <strong>In scope</strong>
                  <ul>{proposal.understanding_of_requirements.in_scope.map((s: string, i: number) => <li key={i}>{s}</li>)}</ul>
                </>
              )}
              {Array.isArray(proposal.understanding_of_requirements?.out_of_scope) && (
                <>
                  <strong>Out of scope</strong>
                  <ul>{proposal.understanding_of_requirements.out_of_scope.map((s: string, i: number) => <li key={i}>{s}</li>)}</ul>
                </>
              )}
            </section>

            <section style={{ marginTop: 12 }}>
              <h5>Requirement Mapping</h5>
              {(proposal.requirement_mapping || []).length === 0 ? <p>—</p> : (
                <ul>
                  {(proposal.requirement_mapping || []).map((r: any, i: number) => (
                    <li key={i}><strong>{r.requirement_id || `REQ-${i+1}`}</strong>: {r.description || r.requirement || ""} — <em>{r.mapped_service || r.mapped_technology || r.status || ""}</em></li>
                  ))}
                </ul>
              )}
            </section>

            <section style={{ marginTop: 12 }}>
              <h5>Solution Architecture</h5>
              <p>{proposal.solution_architecture?.architecture_overview || "—"}</p>
              {Array.isArray(proposal.solution_architecture?.components) && (
                <ul>
                  {proposal.solution_architecture.components.map((c: any, i: number) => (
                    <li key={i}>
                      {typeof c === "string" ? c : (c.component_name || c.name || `Component ${i+1}`)}
                      {typeof c === "object" && (c.component_description || c.description) ? <div style={{ color: "#475569" }}>{c.component_description || c.description}</div> : null}
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section style={{ marginTop: 12 }}>
              <h5>Delivery plan & timeline</h5>
              {(proposal.delivery_plan?.phases || []).map((p: any, idx: number) => (
                <div key={idx}>
                  <strong>{p.phase_name || `Phase ${idx+1}`}{p.duration_weeks ? ` — ${p.duration_weeks} weeks` : ""}</strong>
                  {p.deliverables && <ul>{(p.deliverables || []).map((d: string, j: number) => <li key={j}>{d}</li>)}</ul>}
                </div>
              ))}
            </section>

            <section style={{ marginTop: 12 }}>
              <h5>Pricing & commercials</h5>
              <div>Currency: {proposal.pricing_and_commercials?.currency || "—"}</div>
              <div>Total cost: {proposal.pricing_and_commercials?.total_cost ?? "—"}</div>
              {proposal.pricing_and_commercials?.team_composition && (
                <div style={{ marginTop: 8 }}>
                  <strong>Team composition</strong>
                  <ul>
                    <li>{proposal.pricing_and_commercials.team_composition.role || "Role"} x {proposal.pricing_and_commercials.team_composition.count || 0} @ {proposal.pricing_and_commercials.currency || ""} {proposal.pricing_and_commercials.team_composition.monthly_cost || 0}</li>
                  </ul>
                </div>
              )}
            </section>

            <section style={{ marginTop: 12 }}>
              <h5>Requirement Traceability Matrix</h5>
              {(proposal.requirement_traceability_matrix || []).length === 0 ? <p>—</p> : (
                <ul>{(proposal.requirement_traceability_matrix || []).map((r: any, i: number) => <li key={i}>{r.requirement_id}: {r.requirement} → {r.solution_reference} [{r.status}]</li>)}</ul>
              )}
            </section>

            <section style={{ marginTop: 12 }}>
              <h5>Assumptions & Exclusions</h5>
              <div><strong>Assumptions</strong><ul>{(proposal.assumptions_and_exclusions?.assumptions || []).map((a: string, i: number) => <li key={i}>{a}</li>)}</ul></div>
              <div><strong>Exclusions</strong><ul>{(proposal.assumptions_and_exclusions?.exclusions || []).map((a: string, i: number) => <li key={i}>{a}</li>)}</ul></div>
            </section>

            <section style={{ marginTop: 12 }}>
              <h5>Risk & Mitigation</h5>
              <ul>{(proposal.risk_and_mitigation || []).map((r: any, i: number) => <li key={i}><strong>{r.risk}</strong> ({r.impact}) — {r.mitigation}</li>)}</ul>
            </section>

            <section style={{ marginTop: 12 }}>
              <h5>Company credentials</h5>
              <ul>{(proposal.company_credentials?.relevant_experience || []).map((c: string, i: number) => <li key={i}>{c}</li>)}</ul>
            </section>

            <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
              {reportHtml && (
                <>
                  <button
                    onClick={() => {
                      const tmp = document.createElement("div");
                      tmp.innerHTML = reportHtml;
                      // Ensure page padding for PDF by wrapping and setting margin
                      tmp.style.padding = "28px";
                      html2pdf()
                        .from(tmp)
                        .set({
                          filename: "proposal.pdf",
                          margin: 20,
                          html2canvas: { scale: 2 },
                          jsPDF: { unit: "pt", format: "a4" }
                        })
                        .save();
                    }}
                  >
                    Download PDF (rendered)
                  </button>
                  <button
                    onClick={() => {
                      const w = window.open();
                      if (!w) return;
                      // inject padding styles into the opened window so printed/pdf has margins
                      w.document.write(`<style>body{padding:32px;box-sizing:border-box;} img{max-width:100%;}</style>${reportHtml}`);
                      w.document.close();
                    }}
                  >
                    Open rendered
                  </button>
                </>
              )}
            </div>
          </div>
        ) : reportHtml ? (
          <div style={{ marginTop: 18 }}>
            <h4>Rendered Report</h4>
            <div id="report-html" dangerouslySetInnerHTML={{ __html: reportHtml }} />
            <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
              <button
                onClick={() => {
                  const element = document.getElementById("report-html");
                  if (!element) return alert("Report not ready");
                  html2pdf()
                    .from(element)
                    .set({ filename: "proposal.pdf", html2canvas: { scale: 2 } })
                    .save();
                }}
              >
                Download PDF
              </button>
              <button
                onClick={() => {
                  const w = window.open();
                  if (!w) return;
                  w.document.write(reportHtml);
                  w.document.close();
                }}
              >
                Open in new tab
              </button>
            </div>
          </div>
        ) : (
          <div style={{ marginTop: 18 }}>
            <h4>Proposal JSON</h4>
            <pre style={{ whiteSpace: "pre-wrap", maxHeight: 400, overflow: "auto" }}>{JSON.stringify(proposal, null, 2)}</pre>
          </div>
        )}
      </Card>
    </Page>
  );
};

export default ProposalResult;


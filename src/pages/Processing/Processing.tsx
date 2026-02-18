import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import AgentProgress from "@/components/AgentProgress/AgentProgress";
import Button from "@/components/Button/Button";
import { auth } from "@/config/firebase";
import { generateProposal } from "@/utils/api";

const Page = styled.div`
  max-width: 900px;
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
  margin: 0 0 6px;
`;

const Sub = styled.p`
  margin: 6px 0 16px;
  color: ${({ theme }) => theme.colors.muted};
`;

const Processing: React.FC = () => {
  const { state } = useLocation() as { state: { fileName?: string } | null };
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const steps = [
    { title: "Analysing the Document", meta: "Scanning document structure..." },
    { title: "Requirement Mapping Agent", meta: "Prioritizing features..." },
    { title: "Designing Solution Architect", meta: "Designing database schema..." },
    { title: "Finance Pricing Agent", meta: "Calculating resource costs..." },
    { title: "Master Agent Reviewing Task", meta: "Finalizing proposal..." }
  ];

  const calledRef = useRef(false);

  useEffect(() => {
    // if approvedOverview passed, trigger generateProposal and animate progress
    const approvedOverview = (state as any)?.approvedOverview;
    let iv: any = null;
    setActive(0);
    iv = setInterval(() => setActive((s) => Math.min(s + 1, steps.length)), 1500);

    (async () => {
      if (calledRef.current) return;
      calledRef.current = true;
      try {
        if (approvedOverview) {
          const idToken = await auth.currentUser?.getIdToken();
          const resp = await generateProposal(idToken || "", approvedOverview);
          // on success navigate to proposal result
          navigate("/proposal", { state: { result: resp } });
        } else {
          // no approvedOverview -> just simulate until complete
          setTimeout(() => {
            clearInterval(iv);
          }, steps.length * 1500 + 200);
        }
      } catch (err) {
        console.error("generateProposal failed", err);
        clearInterval(iv);
      }
    })();
    return () => {
      clearInterval(iv);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Page>
      <Card>
        <Title>Processing</Title>
        <Sub>Agent pipeline running for: {state?.fileName || "Uploaded document"}</Sub>
        <AgentProgress steps={steps} activeIndex={Math.min(active, steps.length - 1)} />
        <div style={{ marginTop: 18, display: "flex", gap: 10 }}>
          <Button onClick={() => navigate("/")}>Back to Dashboard</Button>
          <Button onClick={() => navigate("/proposal")}>View Proposal</Button>
        </div>
      </Card>
    </Page>
  );
};

export default Processing;

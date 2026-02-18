import React from "react";
import styled from "styled-components";
import Button from "@/components/Button/Button";
import { useLocation, useNavigate } from "react-router-dom";

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

const Section = styled.div`
  margin-bottom: 16px;
`;

const Title = styled.h2`
  margin: 0 0 6px;
`;

const Sub = styled.p`
  margin: 6px 0 12px;
  color: ${({ theme }) => theme.colors.muted};
`;

const Bullet = styled.li`
  margin-bottom: 8px;
`;

// Recursive renderer for arbitrary SRS objects
const SRSRenderer: React.FC<{ data: any; level?: number }> = ({ data, level = 0 }) => {
  if (data === null || data === undefined) return null;
  const indent = { marginLeft: level * 12 };

  if (typeof data === "string" || typeof data === "number" || typeof data === "boolean") {
    return <div style={indent}>{String(data)}</div>;
  }

  if (Array.isArray(data)) {
    return (
      <ul style={indent}>
        {data.map((item, i) => (
          <li key={i}>
            {typeof item === "object" ? <SRSRenderer data={item} level={level + 1} /> : String(item)}
          </li>
        ))}
      </ul>
    );
  }

  // object
  return (
    <div style={indent}>
      {Object.entries(data).map(([k, v]) => (
        <div key={k} style={{ marginBottom: 8 }}>
          <strong>{k.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}:</strong>
          <div style={{ marginTop: 6 }}>
            {typeof v === "object" ? <SRSRenderer data={v} level={level + 1} /> : String(v)}
          </div>
        </div>
      ))}
    </div>
  );
};

const ReviewSummary: React.FC = () => {
  const { state } = useLocation() as { state: { extracted?: any } | null };
  const navigate = useNavigate();
  const extracted = state?.extracted;
  const srs = extracted?.srs || null;
  // raw text intentionally hidden from UI by default

  if (!extracted) {
    return (
      <Page>
        <Card>
          <Title>No document found</Title>
          <Sub>Please upload a document first.</Sub>
        </Card>
      </Page>
    );
  }

  const [submitting, setSubmitting] = React.useState(false);

  return (
    <Page>
      <Card>
        <Title>Review Summary</Title>
        <Sub>Review extracted content and approve to run the agent pipeline.</Sub>

        {/* Render full SRS preview below to avoid duplication */}

        

        {/*
          Raw extracted text is hidden from the main UI for security/confidentiality.
          It is still available in state but will not be displayed.
        */}
        {srs && (
          <Section>
            <h4>Full SRS Preview</h4>
            <SRSRenderer data={srs} />
          </Section>
        )}

        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 18 }}>
          <Button variant="ghost" onClick={() => navigate(-1)} disabled={submitting}>
            Edit Manually
          </Button>
          <Button
            onClick={() => {
              if (submitting) return;
              setSubmitting(true);
              // build approvedOverview without rawText
              const approvedOverview = srs ? { ...srs } : { ...extracted };
              if (approvedOverview && approvedOverview.rawText) delete approvedOverview.rawText;
              navigate("/processing", { state: { approvedOverview } });
            }}
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Approve & Run Agents"}
          </Button>
        </div>
      </Card>
    </Page>
  );
};

export default ReviewSummary;

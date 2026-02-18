import React from "react";
import styled, { keyframes } from "styled-components";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(6, 8, 15, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 80;
`;

const Sheet = styled.div`
  width: 520px;
  max-width: calc(100% - 40px);
  background: ${({ theme }) => theme.colors.card};
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 12px 40px rgba(2, 6, 23, 0.16);
  text-align: left;
`;

const Title = styled.h3`
  margin: 0 0 6px 0;
`;

const Sub = styled.p`
  margin: 0 0 12px 0;
  color: ${({ theme }) => theme.colors.muted};
`;

const BarWrap = styled.div`
  background: #eef6ff;
  height: 10px;
  border-radius: 999px;
  overflow: hidden;
`;

const fill = (w: number) => keyframes`
  from { width: 0%; }
  to { width: ${w}%;}
`;

const Bar = styled.div<{ width: number }>`
  height: 100%;
  background: ${({ theme }) => theme.colors.primary};
  width: ${({ width }) => width}%;
  transition: width 300ms ease;
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.06);
  border-left-color: ${({ theme }) => theme.colors.primary};
  width: 28px;
  height: 28px;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  @keyframes spin { to { transform: rotate(360deg); } }
`;

export const UploadProgressModal: React.FC<{
  open: boolean;
  percent?: number;
  stage?: "uploading" | "extracting" | "done";
  title?: string;
}> = ({ open, percent = 0, stage = "uploading", title }) => {
  if (!open) return null;
  return (
    <Overlay>
      <Sheet>
        <Title>{title || (stage === "uploading" ? "Uploading..." : stage === "extracting" ? "Extracting..." : "Done")}</Title>
        <Sub>
          {stage === "uploading" && `Uploading file — ${percent}%`}
          {stage === "extracting" && `Extracting content and building overview...`}
          {stage === "done" && `Completed`}
        </Sub>

        {stage === "uploading" && (
          <>
            <BarWrap>
              <Bar width={percent} />
            </BarWrap>
          </>
        )}

        {stage === "extracting" && (
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <Spinner />
            <div style={{ color: "#475569" }}>Processing document with BidCraft agents — this may take a few seconds.</div>
          </div>
        )}
      </Sheet>
    </Overlay>
  );
};

export default UploadProgressModal;


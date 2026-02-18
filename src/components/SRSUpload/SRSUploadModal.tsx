import React, { useRef, useState } from "react";
import styled from "styled-components";
import Button from "@/components/Button/Button";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { auth } from "@/config/firebase";
import { uploadSRSOverview } from "@/utils/api";
import UploadProgressModal from "@/components/UploadProgress/UploadProgressModal";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(6, 8, 15, 0.45);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 60;
`;

const Sheet = styled.div`
  width: 720px;
  max-width: calc(100% - 40px);
  background: ${({ theme }) => theme.colors.card};
  border-radius: 12px 12px 0 0;
  padding: 24px;
  box-shadow: 0 -8px 40px rgba(2, 6, 23, 0.12);
`;

const Title = styled.h3`
  margin: 0 0 8px 0;
  font-size: 20px;
`;

const Desc = styled.p`
  margin: 0 0 16px 0;
  color: ${({ theme }) => theme.colors.muted};
`;

const UploadBox = styled.label<{ hasFile?: boolean }>`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-radius: 10px;
  border: ${({ hasFile }) => (hasFile ? "1px solid #d0e8ff" : "2px dashed #60a5fa")};
  background: ${({ hasFile }) => (hasFile ? "#f0f9ff" : "transparent")};
  cursor: pointer;
`;

export const SRSUploadModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const navigate = useNavigate();
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [progressStage, setProgressStage] = useState<"uploading" | "extracting" | "done">("uploading");

  const onChoose = () => fileRef.current?.click();

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFileName(f.name);
      setUploading(true);
      (async () => {
        try {
          const idToken = await auth.currentUser?.getIdToken();
          if (!idToken) throw new Error("Not authenticated");
          const resp = await uploadSRSOverview(idToken, f, (p) => setProgress(p));
          // backend returns { ok: true, srs, rawText }
          const extracted = resp?.srs
            ? {
                fileName: f.name,
                srs: resp.srs,
                rawText: resp.rawText || ""
              }
            : { fileName: f.name, srs: null, rawText: resp?.rawText || "" };
          // show extracting modal for ~3500ms then navigate to review
          setUploading(false);
          setProgress(100);
          setProgressStage("extracting");
          setShowProgressModal(true);
          setTimeout(() => {
            setShowProgressModal(false);
            navigate("/review", { state: { extracted } });
            onClose();
          }, 3500);
        } catch (err) {
          console.error("SRS upload failed", err);
          setUploading(false);
          alert("Upload failed");
        }
      })();
    }
  };

  return (
    <Overlay onClick={onClose}>
      <Sheet onClick={(e) => e.stopPropagation()}>
        <Title>Upload Client SRS</Title>
        <Desc>Upload the client's SRS/RFP document (PDF or DOCX). The agent will extract requirements and generate a proposed response.</Desc>

        <input id="srs-file-input" ref={fileRef} type="file" accept=".pdf,.doc,.docx" style={{ display: "none" }} onChange={onFile} />
        <UploadBox htmlFor="srs-file-input" hasFile={!!fileName}>
          <AiOutlineCloudUpload size={28} color="#2563eb" />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700 }}>{fileName || "Choose a file to upload"}</div>
            <div style={{ color: "#64748b", fontSize: 13 }}>{uploading ? `Uploading... ${progress}%` : "PDF or DOCX"}</div>
            {uploading && (
              <div style={{ width: "100%", marginTop: 8, background: "#eef2ff", height: 8, borderRadius: 6 }}>
                <div style={{ width: `${progress}%`, height: "100%", background: "#2563eb", borderRadius: 6, transition: "width 300ms ease" }} />
              </div>
            )}
          </div>
          <Button type="button">Choose File</Button>
        </UploadBox>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 16 }}>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </Sheet>
      <UploadProgressModal open={showProgressModal || uploading} percent={progress} stage={progressStage} />
    </Overlay>
  );
};

export default SRSUploadModal;

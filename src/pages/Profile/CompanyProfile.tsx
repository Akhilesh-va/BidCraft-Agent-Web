import React, { useRef, useState } from "react";
import styled from "styled-components";
import Button from "@/components/Button/Button";
import { auth } from "@/config/firebase";
import { uploadProviderProfile } from "@/utils/api";
import { AiOutlineCloudUpload, AiOutlineWarning } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import UploadProgressModal from "@/components/UploadProgress/UploadProgressModal";
import { useAuth } from "@/context/AuthContext";

const Container = styled.div`
  max-width: 420px;
  margin: 12px auto 48px;
  padding: 0 16px;
`;

const TitleWrap = styled.div`
  text-align: center;
  margin: 18px 0 8px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 28px;
`;

const Subtitle = styled.p`
  margin: 8px 0 0;
  color: ${({ theme }) => theme.colors.muted};
`;

const BigCard = styled.div`
  background: linear-gradient(180deg, rgba(255,255,255,0.98), rgba(250,250,252,0.98));
  border-radius: 22px;
  padding: 26px;
  text-align: center;
  margin-top: 18px;
  box-shadow: 0 10px 30px rgba(12, 18, 31, 0.06);
`;

const Cloud = styled.div`
  display: inline-flex;
  width: 76px;
  height: 76px;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.background};
  margin-bottom: 12px;
`;

const Head = styled.h3`
  margin: 6px 0 6px;
  font-size: 18px;
`;

const Desc = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 14px;
`;

const Checklist = styled.ul`
  list-style: none;
  padding: 0;
  margin: 18px 0 12px;
  text-align: left;
`;

const Item = styled.li`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
  font-size: 14px;
`;

const UploadBox = styled.label<{ hasFile?: boolean }>`
  display: block;
  border: ${({ hasFile }) => (hasFile ? "1px solid #d0e8ff" : "2px dashed #60a5fa")};
  background: ${({ hasFile }) => (hasFile ? "#f0f9ff" : "transparent")};
  padding: 14px;
  border-radius: 12px;
  margin-top: 12px;
  cursor: pointer;
  color: ${({ hasFile }) => (hasFile ? "#2563eb" : "#2563eb")};
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FooterNote = styled.div`
  margin-top: 14px;
  display: flex;
  gap: 10px;
  align-items: center;
  background: #fff6f6;
  padding: 12px;
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.danger};
`;

const HiddenInput = styled.input`
  display: none; 
`;

const CompanyProfile: React.FC = () => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [progressStage, setProgressStage] = useState<"uploading" | "extracting" | "done">("uploading");
  const fileRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const { refreshBackendUser } = useAuth();

  const onChoose = () => fileRef.current?.click();

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFileName(f.name);
      // simulate extraction
      setUploading(true);
      (async () => {
        try {
          const idToken = await auth.currentUser?.getIdToken();
          if (!idToken) throw new Error("Not authenticated");
          const resp = await uploadProviderProfile(idToken, f, (p) => setProgress(p));
          // backend returns { ok: true, profile, user }
          if (resp?.ok) {
            setUploading(false);
            setProgress(100);
            setProgressStage("extracting");
            setShowProgressModal(true);
            // wait ~3500ms showing extracting
            setTimeout(async () => {
              try {
                await refreshBackendUser();
              } catch (e) {
                /* ignore */
              }
              setShowProgressModal(false);
              alert("Company profile uploaded and saved");
              navigate("/");
            }, 3500);
          } else {
            setUploading(false);
            console.error("Upload failed", resp);
            alert("Upload failed");
          }
        } catch (err) {
          console.error("upload provider profile failed", err);
          setUploading(false);
          alert("Upload failed");
        }
      })();
    }
  };

  return (
    <Container>
      <TitleWrap>
        <Title>Company Profile</Title>
        <Subtitle>Upload your documentation to get started</Subtitle>
      </TitleWrap>

      <BigCard>
        <Cloud>
          <AiOutlineCloudUpload size={36} color="#1e90ff" />
        </Cloud>
        <Head>Optimize Your Experience</Head>
        <Desc>A detailed company profile helps our AI generate accurate solutions and realistic pricing.</Desc>

        <Checklist>
          <Item>
            <FaCheckCircle color="#10b981" />
            Company overview & positioning
          </Item>
          <Item>
            <FaCheckCircle color="#10b981" />
            Services (Web, Mobile, AI, Cloud)
          </Item>
          <Item>
            <FaCheckCircle color="#10b981" />
            Target industries & structure
          </Item>
          <Item>
            <FaCheckCircle color="#10b981" />
            Pricing approach & case studies
          </Item>
        </Checklist>

        <HiddenInput id="company-profile-file" ref={fileRef} type="file" accept=".pdf,.doc,.docx" onChange={onFile} />
        <UploadBox htmlFor="company-profile-file" hasFile={!!fileName}>
          {fileName ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
              <div style={{ background: "#eef6ff", padding: "8px 12px", borderRadius: 8 }}>{fileName}</div>
              <div style={{ color: "#2563eb", fontSize: 14 }}>{uploading ? `Uploading... ${progress}%` : "Tap to Upload Document"}</div>
              {uploading && (
                <div style={{ width: "100%", marginTop: 8, background: "#eef2ff", height: 8, borderRadius: 6 }}>
                  <div style={{ width: `${progress}%`, height: "100%", background: "#2563eb", borderRadius: 6, transition: "width 300ms ease" }} />
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <AiOutlineCloudUpload color="#2563eb" />
              <span>Tap to Upload Document</span>
            </div>
          )}
          </UploadBox>
      </BigCard>

      <FooterNote>
        <AiOutlineWarning />
        <div>Better documentation leads to more accurate proposals.</div>
      </FooterNote>
    </Container>
  );
};

export default CompanyProfile;

import React from "react";
import styled from "styled-components";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/Button/Button";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaMapMarkerAlt, FaCogs, FaShieldAlt, FaMoneyBillWave } from "react-icons/fa";

const Container = styled.div`
  max-width: 1000px;
  margin: 24px auto;
  padding: 0 16px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 20px;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 20px;
  box-shadow: 0 6px 18px rgba(12, 18, 31, 0.04);
`;

const Avatar = styled.div`
  width: 88px;
  height: 88px;
  border-radius: 12px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 12px;
`;

const SectionTitle = styled.h4`
  margin: 0 0 8px 0;
`;

const Chip = styled.span`
  display: inline-block;
  padding: 6px 10px;
  background: #f1f7ff;
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 999px;
  font-weight: 600;
  font-size: 13px;
  margin: 6px 6px 0 0;
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Profile: React.FC = () => {
  const { user, backendUser, signOutUser, refreshBackendUser } = useAuth();
  const profile = backendUser?.companyProfile || null;
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (!confirm("Are you sure you want to log out?")) return;
    await signOutUser();
    navigate("/login");
  };

  return (
    <Container>
      <Grid>
        <div>
          <Card>
            <h3 style={{ margin: 0 }}>{user?.displayName || backendUser?.name || "No name provided"}</h3>
            <p style={{ color: "#64748b", marginTop: 6 }}>{user?.email || backendUser?.email || "No email"}</p>
            <Avatar>
              {user?.photoURL ? (
                <img src={user.photoURL} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ fontWeight: 800, color: "#2563eb" }}>{(user?.displayName || "U").charAt(0)}</div>
              )}
            </Avatar>
            <p style={{ marginTop: 12 }}>Provider ID: {backendUser?.googleId || backendUser?._id || "n/a"}</p>
          </Card>

          <Card style={{ marginTop: 16 }}>
            <SectionTitle>Account</SectionTitle>
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <Button variant="ghost" onClick={() => navigate("/company-profile")}>
                Edit Company Profile
              </Button>
              <Button onClick={handleLogout}>Logout</Button>
            </div>
            <div style={{ marginTop: 12 }}>
              <Button variant="ghost" onClick={() => refreshBackendUser()}>
                Refresh Profile
              </Button>
            </div>
          </Card>
        </div>

        <div>
          <Card>
            <SectionTitle>Company Profile</SectionTitle>
            {!profile ? (
              <p style={{ color: "#64748b" }}>
                No company profile found. Please upload your company profile from the Company Profile page.
              </p>
            ) : (
              <>
                <h3 style={{ margin: "6px 0" }}>{profile.company_identity?.name || profile.companyName}</h3>

                <Row>
                  <FaEnvelope />
                  <div style={{ color: "#64748b" }}>{profile.company_identity?.contact?.email || "-"}</div>
                </Row>

                {profile.company_identity?.company_size && (
                  <Row style={{ marginTop: 8 }}>
                    <FaMapMarkerAlt />
                    <div style={{ color: "#64748b" }}>{profile.company_identity.company_size}</div>
                  </Row>
                )}

                <div style={{ marginTop: 12 }}>
                  <SectionTitle>Services</SectionTitle>
                  {profile.services &&
                    (typeof profile.services === "object"
                      ? Object.entries(profile.services)
                          .filter(([, v]) => Boolean(v))
                          .map(([k]) => (
                            <Chip key={k}>{k.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}</Chip>
                          ))
                      : (profile.services as string[]).map((s: string) => <Chip key={s}>{s}</Chip>))}
                </div>

                <div style={{ marginTop: 12 }}>
                  <SectionTitle>Tech Stack</SectionTitle>
                  {profile.tech_stack &&
                    Object.entries(profile.tech_stack).map(([cat, arr]: any) => (
                      <div key={cat} style={{ marginTop: 8 }}>
                        <strong>{cat.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}</strong>
                        <div style={{ marginTop: 6 }}>
                          {(arr || []).map((t: string) => (
                            <Chip key={t}>{t}</Chip>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>

                <div style={{ marginTop: 12 }}>
                  <SectionTitle>
                    <FaMoneyBillWave /> Pricing Summary
                  </SectionTitle>
                  <div style={{ marginTop: 8 }}>Currency: {profile.pricing_rules?.currency || "N/A"}</div>
                  {profile.pricing_rules?.monthly_cost_per_role && (
                    <div style={{ marginTop: 8 }}>
                      <strong>Top Roles</strong>
                      <ul>
                        {Object.entries(profile.pricing_rules.monthly_cost_per_role)
                          .slice(0, 6)
                          .map(([role, cost]) => (
                            <li key={role}>
                              {role.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}: {profile.pricing_rules.currency || ""} {cost}
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div style={{ marginTop: 12 }}>
                  <SectionTitle>
                    <FaShieldAlt /> Security & Compliance
                  </SectionTitle>
                  <ul>
                    {(profile.security_and_compliance?.security_practices || []).map((s: string, i: number) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ marginTop: 12 }}>
                  <SectionTitle>Experience & Case Studies</SectionTitle>
                  {(profile.experience_and_case_studies?.case_studies || []).map((c: any, i: number) => (
                    <div key={i} style={{ marginTop: 8 }}>
                      <strong>{c.industry}</strong>
                      <div style={{ color: "#475569" }}>{c.solution}</div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </Card>
        </div>
      </Grid>
    </Container>
  );
};

export default Profile;

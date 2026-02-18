import React from "react";
import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import Button from "@/components/Button/Button";
import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Page = styled.main`
  max-width: 480px;
  margin: 48px auto;
  padding: 24px;
`;

const Card = styled.section`
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 28px;
  box-shadow: 0 10px 32px rgba(12, 18, 31, 0.06);
`;

const Title = styled.h1`
  margin: 0 0 8px 0;
  font-size: 28px;
  text-align: center;
`;

const Subtitle = styled.p`
  margin: 0 0 20px 0;
  color: ${({ theme }) => theme.colors.muted};
  text-align: center;
`;

const SocialRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SocialButton = styled(Button)<{ variantStyle?: "white" | "brand" | "dark" }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 12px 16px;
  background: ${({ variantStyle, theme }) =>
    variantStyle === "white" ? "#fff" : variantStyle === "dark" ? "#0b1220" : theme.colors.primary};
  color: ${({ variantStyle }) => (variantStyle === "white" ? "#111827" : "white")};
  box-shadow: ${({ variantStyle }) => (variantStyle === "white" ? "0 6px 16px rgba(2,6,23,0.06)" : "none")};
  border: ${({ variantStyle }) => (variantStyle === "white" ? "1px solid #e6e8eb" : "none")};
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 18px 0;
  color: ${({ theme }) => theme.colors.muted};
  font-weight: 600;
  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: #eef2f7;
  }
`;

const EmailForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Input = styled.input`
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid #e6e8eb;
  outline: none;
`;

const Small = styled.div`
  text-align: center;
  margin-top: 12px;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 13px;
`;

const Login: React.FC = () => {
  const { signInWithProvider } = useAuth();
  const navigate = useNavigate();

  const handleSocial = async (p: "google" | "facebook" | "twitter") => {
    try {
      await signInWithProvider(p);
      navigate("/");
    } catch (e) {
      alert("Sign-in failed");
      console.error(e);
    }
  };

  return (
    <Page>
      <Card>
        <Title>Welcome Back</Title>
        <Subtitle>Sign in to continue</Subtitle>

        <SocialRow>
          <SocialButton variantStyle="white" onClick={() => handleSocial("google")}>
            <FcGoogle size={20} />
            Continue with Google
          </SocialButton>
          <SocialButton variantStyle="brand" onClick={() => handleSocial("facebook")}>
            <FaFacebookF />
            Continue with Facebook
          </SocialButton>
          <SocialButton variantStyle="dark" onClick={() => handleSocial("twitter")}>
            <FaTwitter />
            Continue with Twitter
          </SocialButton>
        </SocialRow>

        <Divider>or</Divider>

        <EmailForm
          onSubmit={(e) => {
            e.preventDefault();
            alert("Email sign-in placeholder");
          }}
        >
          <Input placeholder="Email address" type="email" required />
          <Button type="submit">Continue with Email</Button>
        </EmailForm>

        <Small>
          By continuing, you agree to our <Link to="/">Terms & Privacy Policy</Link>
        </Small>
      </Card>
    </Page>
  );
};

export default Login;

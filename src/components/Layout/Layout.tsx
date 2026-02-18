import React from "react";
import styled from "styled-components";
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const AppWrap = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
  background: transparent;
  padding: 28px;
`;

const Content = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { signOutUser } = useAuth();
  const navigate = useNavigate();
  const handleProfile = () => navigate("/profile");

  return (
    <AppWrap>
      <Sidebar />
      <Main>
        <Header title="BidCraft Agentic AI" onProfile={handleProfile} />
        <Content>{children}</Content>
      </Main>
    </AppWrap>
  );
};

export default Layout;

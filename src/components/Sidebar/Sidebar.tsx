import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { FaHome, FaCloudUploadAlt, FaProjectDiagram, FaChartBar, FaHistory } from "react-icons/fa";

const Wrap = styled.aside`
  width: 260px;
  background: ${({ theme }) => theme.colors.card};
  border-right: 1px solid #eef2f7;
  height: 100vh;
  position: sticky;
  top: 0;
  padding: 20px;
`;

const Logo = styled.div`
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 18px;
  margin-bottom: 18px;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const LinkItem = styled(NavLink)`
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 10px 12px;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
  &.active {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Sidebar: React.FC = () => {
  return (
    <Wrap>
      <Logo>BidCraft</Logo>
      <Nav>
        <LinkItem to="/" end>
          <FaHome /> Dashboard
        </LinkItem>
        <LinkItem to="/company-profile">
          <FaCloudUploadAlt /> Company Profile
        </LinkItem>
        <LinkItem to="/analytics">
          <FaChartBar /> Analytics
        </LinkItem>
        <LinkItem to="/history">
          <FaHistory /> History
        </LinkItem>
        <LinkItem to="/bids">
          <FaProjectDiagram /> Bids
        </LinkItem>
      </Nav>
    </Wrap>
  );
};

export default Sidebar;

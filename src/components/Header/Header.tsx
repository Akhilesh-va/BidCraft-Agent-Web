import React from "react";
import styled from "styled-components";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";

const Wrap = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px 20px;
  background: transparent;
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  border-radius: 10px;
`;

const Title = styled.div`
  font-weight: 800;
  font-size: 18px;
`;

const Header: React.FC<{
  title?: string;
  onBack?: () => void;
  onProfile?: () => void;
}> = ({ title, onBack, onProfile }) => {
  return (
    <Wrap>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <IconButton onClick={onBack}>
          <AiOutlineArrowLeft size={20} />
        </IconButton>
        <Title>{title}</Title>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <IconButton onClick={onProfile} aria-label="Profile">
          <FaUserCircle size={22} />
        </IconButton>
      </div>
    </Wrap>
  );
};

export default Header;

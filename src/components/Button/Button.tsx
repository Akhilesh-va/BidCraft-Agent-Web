import React from "react";
import styled from "styled-components";

const StyledButton = styled.button<{ variant?: string }>`
  padding: 10px 16px;
  background: ${({ theme, variant }) =>
    variant === "ghost" ? "transparent" : theme.colors.primary};
  color: ${({ theme, variant }) =>
    variant === "ghost" ? theme.colors.text : "#ffffff"};
  border: ${({ theme, variant }) =>
    variant === "ghost" ? "1px solid #e2e8f0" : "none"};
  border-radius: ${({ theme }) => theme.radii.sm};
  cursor: pointer;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    opacity: 0.9;
    background: ${({ theme, variant }) =>
      variant === "ghost" ? "#f1f5f9" : theme.colors.primaryDark};
  }
`;

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: string }> = (
  props
) => {
  return <StyledButton {...props} />;
};

export default Button;

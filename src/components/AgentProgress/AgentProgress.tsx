import React from "react";
import styled from "styled-components";

const Wrap = styled.div`
  padding: 20px;
`;

const Timeline = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Step = styled.li<{ active?: boolean }>`
  display: flex;
  gap: 12px;
  align-items: flex-start;
  margin-bottom: 18px;
  color: ${({ theme, active }) => (active ? theme.colors.text : theme.colors.muted)};
`;

const Dot = styled.div<{ active?: boolean }>`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 3px solid ${({ theme, active }) => (active ? theme.colors.primary : "#e5e7eb")};
  background: ${({ theme, active }) => (active ? "#fff" : "#fff")};
`;

const Content = styled.div`
  flex: 1;
`;

const Title = styled.div`
  font-weight: 700;
  margin-bottom: 6px;
`;

const Meta = styled.div`
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, "Roboto Mono", "Courier New", monospace;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 13px;
`;

export const AgentProgress: React.FC<{ steps: { title: string; meta?: string }[]; activeIndex?: number }> = ({
  steps,
  activeIndex = 0
}) => {
  return (
    <Wrap>
      <Timeline>
        {steps.map((s, i) => (
          <Step key={i} active={i <= activeIndex}>
            <Dot active={i <= activeIndex} />
            <Content>
              <Title>{s.title}</Title>
              {s.meta && <Meta>{s.meta}</Meta>}
            </Content>
          </Step>
        ))}
      </Timeline>
    </Wrap>
  );
};

export default AgentProgress;


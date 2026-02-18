import React from "react";
import styled from "styled-components";

const Page = styled.div`
  max-width: 1000px;
  margin: 24px auto;
  padding: 20px;
`;

const Analytics: React.FC = () => {
  return (
    <Page>
      <h2>Analytics</h2>
      <p>Placeholder analytics dashboard — wire to backend stats when ready.</p>
    </Page>
  );
};

export default Analytics;


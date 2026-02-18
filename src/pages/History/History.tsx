import React from "react";
import styled from "styled-components";

const Page = styled.div`
  max-width: 1000px;
  margin: 24px auto;
  padding: 20px;
`;

const History: React.FC = () => {
  return (
    <Page>
      <h2>History</h2>
      <p>Placeholder for pipeline/bid history. Will be populated from backend RFP records.</p>
    </Page>
  );
};

export default History;


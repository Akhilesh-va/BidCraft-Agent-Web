import React from "react";
import styled from "styled-components";
import Button from "@/components/Button/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { FaUser } from "react-icons/fa";
import SRSUploadModal from "@/components/SRSUpload/SRSUploadModal";

const Page = styled.div`
  max-width: 1000px;
  margin: 24px auto;
  padding: 20px;
`;

const Hero = styled.section`
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 28px;
  box-shadow: 0 8px 28px rgba(12, 18, 31, 0.04);
  display: flex;
  gap: 24px;
  align-items: center;
`;

const Welcome = styled.div`
  flex: 1;
`;

const Greeting = styled.h2`
  margin: 0 0 6px 0;
  font-size: 26px;
`;

const Search = styled.div`
  margin-top: 12px;
  display: flex;
  gap: 12px;
  align-items: center;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid #e6e8eb;
  outline: none;
`;

const QuickActions = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const Action = styled.button`
  background: ${({ theme }) => theme.colors.background};
  border: none;
  padding: 12px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  width: 84px;
  cursor: pointer;
`;

const AvatarArea = styled.div`
  width: 120px;
  text-align: center;
`;

const Avatar = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.background};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const List = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 14px;
`;

const BidCard = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 6px 20px rgba(12, 18, 31, 0.04);
`;

const Meta = styled.div`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 13px;
  margin-top: 8px;
`;

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showModal, setShowModal] = React.useState(false);

  const recentBids = [
    { id: 1, title: "Mobile App Development", status: "Pending Review", time: "2 hrs ago" },
    { id: 2, title: "E-commerce Website", status: "Won", time: "5 hrs ago" },
    { id: 3, title: "AI Integration Project", status: "Lost", time: "1 day ago" }
  ];

  return (
    <Page>
      <Hero>
        <Welcome>
          <Greeting>
            Welcome back, {user?.displayName ? user.displayName.split(" ")[0] : "There"}.
          </Greeting>
          <Search>
            <SearchInput placeholder="Search projects, bids..." />
            <Button onClick={() => setShowModal(true)}>New Upload</Button>
          </Search>
          <QuickActions style={{ marginTop: 16 }}>
            <Action onClick={() => setShowModal(true)}>
              <div style={{ fontSize: 20, color: "#2563eb" }}>⤴</div>
              <div style={{ fontSize: 12 }}>Upload</div>
            </Action>
          </QuickActions>
        </Welcome>

        <AvatarArea>
          <Avatar>
            {user?.photoURL ? <img src={user.photoURL} alt="avatar" style={{ width: "100%" }} /> : <div style={{ fontWeight: 800, color: "#2563eb" }}>{(user?.displayName || "U").charAt(0)}</div>}
          </Avatar>
        </AvatarArea>
      </Hero>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 18 }}>
        <h3 style={{ margin: 0 }}>Recent Bids</h3>
      </div>

      <List>
        {recentBids.map((b) => (
          <BidCard key={b.id}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontWeight: 700 }}>{b.title}</div>
              <div style={{ color: b.status === "Won" ? "#10b981" : b.status === "Lost" ? "#ef4444" : "#f59e0b", fontWeight: 700 }}>{b.status}</div>
            </div>
            <Meta>{b.time}</Meta>
          </BidCard>
        ))}
      </List>
      {showModal && <SRSUploadModal onClose={() => setShowModal(false)} />}
    </Page>
  );
};

export default Home;

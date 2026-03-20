import { getServerSideUser } from "@/hooks/getServerSideUser";
import LayoutClientWrapper from "./LayoutClientWrapper";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const userDetails = await getServerSideUser();

  return (
    <LayoutClientWrapper userDetails={userDetails}>
      {children}
    </LayoutClientWrapper>
  );
}
import {Footer, Navbar} from "@/components/landing";
// import ClientLayoutWrapper from "@/components/landing/navbar/ClientNavbarLayout";
import { getServerSideUser } from "@/hooks/getServerSideUser";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const userDetails =await getServerSideUser()
    return (
        <>
        {/* <ClientLayoutWrapper>
            {children}
         </ClientLayoutWrapper> */}
            <Navbar userInfo={userDetails}  />
            {children}
            <Footer />
        </>
    )
}
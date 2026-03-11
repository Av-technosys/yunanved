import Footer from "@/components/landing/Footer";
import ClientLayoutWrapper from "@/components/landing/navbar/ClientNavbarLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
        <ClientLayoutWrapper>
            {children}
         </ClientLayoutWrapper>

            <Footer />
        </>
    )
}
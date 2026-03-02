import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";

export default function CategoryLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
}
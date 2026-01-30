export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return <div className=" flex">
        <div className=" h-screen w-72 bg-slate-500"></div>
        <div className=" w-full p-3">
            {children}
        </div>
    </div>;
}
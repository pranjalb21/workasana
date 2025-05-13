import SideNav from "./SideNav";

export default function Layout({ children }) {
    return (
        <main className="d-flex">
            <SideNav />
            <section className="w-100">{children}</section>
        </main>
    );
}

import Layout from "../components/Layout";
import ProfileForm from "../components/ProfileForm";

export default function SettingsPage() {
    return (
        <Layout>
            <section className="h-100 d-flex justify-content-center align-items-center">
                <ProfileForm />
            </section>
        </Layout>
    );
}

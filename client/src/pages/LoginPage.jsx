import LoginForm from "../components/LoginForm";
import { useData } from "../contexts/Application.context";

export default function LoginPage() {
    const { loading } = useData();
    if (!loading) {
        return <LoginForm />;
    }
}

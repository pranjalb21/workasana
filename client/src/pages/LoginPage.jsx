import React from "react";
import Layout from "../components/Layout";
import LoginForm from "../components/LoginForm";
import { useData } from "../contexts/application.context";

export default function LoginPage() {
    const { loading } = useData();
    return !loading && <LoginForm />;
}

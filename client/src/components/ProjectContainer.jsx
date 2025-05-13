import { useEffect } from "react";
import ProjectCard from "./ProjectCard";
import { useData } from "../contexts/Application.context";
import { base_url } from "../constants/Constants";

export default function ProjectContainer({
    type = "",
    project_status,
    keyword,
}) {
    const { loadProjects, projects } = useData();

    const loadData = async () => {
        let url = new URL(`${base_url}/projects`);

        if (type) {
            url.pathname += `/${type}`;
        }

        const params = new URLSearchParams();
        if (project_status) params.set("project_status", project_status);
        if (keyword) params.set("keyword", keyword);

        url.search = params.toString(); // Automatically appends '?' only if parameters exist

        await loadProjects(url.toString());
    };
    useEffect(() => {
        loadData();
    }, []);
    useEffect(() => {
        loadData();
    }, [project_status, keyword]);
    return (
        <div className="d-flex flex-wrap gap-3 mt-3">
            {projects && projects?.length > 0 ? (
                projects?.map((project) => (
                    <ProjectCard project={project} key={project._id} />
                ))
            ) : (
                <p className="fs-6">No project found.</p>
            )}
        </div>
    );
}

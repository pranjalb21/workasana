import { MdOutlineSpaceDashboard} from "react-icons/md";
import { GoProject } from "react-icons/go";
import { AiOutlineTeam } from "react-icons/ai";
import { TbReportAnalytics } from "react-icons/tb";
import { IoSettingsSharp } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";
import Logo from "./Logo";
import { useData } from "../contexts/Application.context";
const dashBoardLinks = [
    { title: "Dashboard", link: "/", icon: <MdOutlineSpaceDashboard /> },
    { title: "Projects", link: "/projects", icon: <GoProject /> },
    { title: "Team", link: "/team", icon: <AiOutlineTeam /> },
    { title: "Reports", link: "/reports", icon: <TbReportAnalytics /> },
    { title: "Setting", link: "/settings", icon: <IoSettingsSharp /> },
    { title: "LogOut", link: "/logout", icon: <TbLogout2 /> },

    // { title: "LogIn", link: "/login", icon: <MdLogin /> },
    // { title: "SignUp", link: "/signup", icon: <IoCreateOutline /> },
];
export default function SideNav() {
    const { logout } = useData();
    return (
        <div className="sideNav">
            <Logo />
            <ul className="sideNav-ul mt-3">
                {dashBoardLinks.map((item) => (
                    <li
                        key={item.title}
                        data-bs-toggle="tooltip"
                        data-bs-placement="right"
                        title={item.title}
                    >
                        <NavLink
                            className={`d-flex align-items-center navlink ${({
                                isActive,
                                isPending,
                            }) =>
                                isPending
                                    ? "pending"
                                    : isActive
                                    ? "active"
                                    : ""}`}
                            to={item.link}
                            onClick={() => item.title === "LogOut" && logout()}
                        >
                            <p className="m-0 p-0 d-flex me-1 fs-4">
                                {item.icon}
                            </p>
                            <p className="m-0 p-0 fs-6 d-md-inline-block d-none">
                                {item.title}
                            </p>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
}

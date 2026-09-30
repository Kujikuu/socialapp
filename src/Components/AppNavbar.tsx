
import {
    Avatar,
    Dropdown,
    DropdownDivider,
    DropdownHeader,
    DropdownItem,
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarLink,
    NavbarToggle,
} from "flowbite-react";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../hooks/AuthContext";

export default function AppNavbar() {
    const { isLogged, logoutUser, user } = useAuth();
    const navigate = useNavigate();
    return (
        <Navbar rounded>
            <NavbarBrand href="/main">
                <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span>
            </NavbarBrand>
            <div className="flex md:order-2">
                <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
                    }
                >
                    <DropdownHeader>
                        <span className="block text-sm">{user?.name || "User"}</span>
                        <span className="block truncate text-sm font-medium">{user?.email || "user@example.com"}</span>
                    </DropdownHeader>
                    <DropdownItem href="/main/profile">Profile</DropdownItem>
                    <DropdownItem href="/main/settings">Settings</DropdownItem>
                    <DropdownDivider />
                    <DropdownItem onClick={() => {
                        if (isLogged) {
                            logoutUser();
                            navigate("/");
                        }
                    }}>Sign out</DropdownItem>
                </Dropdown>
                <NavbarToggle />
            </div>
            <NavbarCollapse>
                {/* <NavbarLink href="#" active>
                    Home
                </NavbarLink>
                <NavbarLink href="#">About</NavbarLink>
                <NavbarLink href="#">Services</NavbarLink>
                <NavbarLink href="#">Pricing</NavbarLink>
                <NavbarLink href="#">Contact</NavbarLink> */}
                <NavLink to="/main">Feed</NavLink>
                <NavLink to="profile">Profile</NavLink>
                <NavLink to="notifications">Notifications</NavLink>
            </NavbarCollapse>
        </Navbar>
    );
}
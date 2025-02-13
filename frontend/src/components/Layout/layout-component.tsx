import {FC, ReactNode, useState} from "react";
import {useLocation} from "react-router-dom";
import Sidebar from "./sidebar.tsx";
import {Box} from "@mui/material";
import Navbar from "./navbar.tsx";

export const LayoutComponent : FC<{children : ReactNode}> = ({ children }) => {

    const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);
    const location = useLocation();

    const renderLayout = !["/login", "/register"].includes(location.pathname);

    const handleDrawerToggle = () => {
        setDrawerOpen((prev) => !prev);
    };

    return (
        <Box sx={{ display: 'grid', gridTemplateColumns: renderLayout && isDrawerOpen ? '240px 1fr' : '1fr'}}>
            {renderLayout && <Sidebar open={isDrawerOpen} />}
            <Box
                component="main"
                sx={{
                    p: 3,
                    transition: 'all 0.3s',
                    paddingTop: '64px',
                    overflow: 'auto',
                }}
            >
                {renderLayout && <Navbar handleDrawerToggle={handleDrawerToggle} />}
                {children}
            </Box>
        </Box>
    );

}
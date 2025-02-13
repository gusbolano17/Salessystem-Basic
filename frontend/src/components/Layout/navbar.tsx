import { FC } from "react";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

interface NavbarProps {
    handleDrawerToggle?: () => void;
}

const Navbar: FC<NavbarProps> = ({ handleDrawerToggle }) => (
    <AppBar position='fixed' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor:'#9c27b0'}}>
        <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={handleDrawerToggle}>
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
                Mi Aplicación
            </Typography>
        </Toolbar>
    </AppBar>
);

export default Navbar;

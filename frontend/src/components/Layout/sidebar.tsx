import {FC, useMemo, useState} from "react";
import {
    Box,
    Collapse,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar
} from "@mui/material";
import {
    ExpandLess,
    ExpandMore,
    Home,
    Inventory,
    LocalShipping,
    Person,
    PersonAdd, PersonSearch,
    Receipt
} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

type MenuItem = {
    text: string;
    path?: string;
    icon: React.ReactNode;
    subitems?: MenuItem[];
};

interface SidebarProps {
    open?: boolean;
}

const drawerWidth = 240;

const Sidebar: FC<SidebarProps> = ({ open = false }) => {
    const navigate = useNavigate();

    const [openSubmenu, setOpenSubmenu] = useState<{[key : string] : boolean}>({});

    const menuItems = useMemo<MenuItem[]>(() => [
        { text: 'Dashboard', path: '/dashboard', icon: <Home /> },
        {
            text : 'Clientes',
            icon : <Person/>,
            subitems : [
                {text : 'Agregar cliente', path : '/clientes/agregar', icon : <PersonAdd/>},
                {text : 'Consultar clientes', path : '/clientes/consultar', icon : <PersonSearch/>},
            ]
        },
        { text: 'productos', path: '/productos', icon: <Inventory /> },
        {
            text : 'proveedores',
            icon : <LocalShipping/>,
            subitems : [
                {text : 'Agregar proveedor', path : '/proveedores/agregar', icon : <LocalShipping/>},
                {text : 'Consultar proveedores', path : '/proveedores/consultar', icon : <LocalShipping/>},
            ]
        },
        { text: 'ventas', path: '/ventas', icon: <Receipt /> }
    ], []);

    const toggleSubmenu = (text : string)=> {
        setOpenSubmenu((prev) => ({...prev, [text]: !prev[text]}));
    }

    const renderMenuItem = (item: MenuItem) => {
        if (item.subitems) {
            return (
                <div key={item.text}>
                    <ListItemButton onClick={() => toggleSubmenu(item.text)} sx={{ "&:hover": { backgroundColor: "#2D3748" } }}>
                        <ListItemIcon sx={{ color: "#CBD5E0" }}>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                        {openSubmenu[item.text] ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openSubmenu[item.text]} timeout="auto" unmountOnExit>
                        <List sx={{ pl: 4 }}>
                            {item.subitems.map((subItem) => (
                                <ListItemButton
                                    key={subItem.text}
                                    onClick={() => subItem.path && navigate(subItem.path)}
                                    sx={{ "&:hover": { backgroundColor: "#2D3748" } }}
                                >
                                    <ListItemIcon sx={{ color: "#CBD5E0" }}>{subItem.icon}</ListItemIcon>
                                    <ListItemText primary={subItem.text} />
                                </ListItemButton>
                            ))}
                        </List>
                    </Collapse>
                </div>
            );
        }

        return (
            <ListItemButton
                key={item.text}
                onClick={() => item.path && navigate(item.path)}
                sx={{ "&:hover": { backgroundColor: "#2D3748" } }}
            >
                <ListItemIcon sx={{ color: "#CBD5E0" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
            </ListItemButton>
        );
    };

    return (
        <Drawer
            variant="persistent"
            open={open}
            sx={{
                width: open ? drawerWidth : 0,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    backgroundColor: "#1A202C",
                    color: "#FFFFFF",
                    transition: "width 0.3s",
                    overflowX: "hidden",
                },
            }}
        >
            <Toolbar />
            <Box role="navigation" sx={{ overflow: "auto" }}>
                <List>{menuItems.map(renderMenuItem)}</List>
            </Box>
        </Drawer>
    );

};

export default Sidebar;

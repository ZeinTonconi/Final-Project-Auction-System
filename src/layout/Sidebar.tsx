import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
} from "@mui/material";
import { Home, Info } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import LogoutIcon from "@mui/icons-material/Logout";
import GroupIcon from "@mui/icons-material/Group";
import PaidIcon from "@mui/icons-material/Paid";
import { useUser } from "../contexts/userContext.tsx";
import { useTranslation } from "react-i18next";

const drawerWidth = 240;

interface SidebarProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  isMobile: boolean;
}

const Sidebar = ({
  mobileOpen,
  handleDrawerToggle,
  isMobile,
}: SidebarProps) => {
  const location = useLocation();
  const { logout, user } = useUser();
  const {t} = useTranslation()
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/dashboard"
            selected={location.pathname === "/dashboard"}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/auctions"
            selected={location.pathname === "/auctions"}
          >
            <ListItemIcon>
              <PaidIcon />
            </ListItemIcon>
            <ListItemText primary={t("sidebar.auctions")} />
          </ListItemButton>
        </ListItem>

        {user?.role === "admin" && (
          <>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/admin/products"
                selected={location.pathname === "/admin/products"}
              >
                <ListItemIcon>
                  <BusinessCenterIcon />
                </ListItemIcon>
                <ListItemText primary={t("sidebar.products")} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/admin/users"
                selected={location.pathname === "/admin/users"}
              >
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary={t("sidebar.users")} />
              </ListItemButton>
            </ListItem>
          </>
        )}

        <ListItem disablePadding>
          <ListItemButton onClick={logout} component={Link} to="/">
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={t("sidebar.logout")} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <>
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      )}

      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;

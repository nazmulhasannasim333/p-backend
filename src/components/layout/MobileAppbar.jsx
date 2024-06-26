import {
    AppBar,
    Avatar,
    Box,
    Container,
    Divider,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
  } from "@mui/material";
import MobileSidebar from "./MobileSidebar.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Dashboard as DashboardIcon,
    Logout as LogoutIcon,
  } from "@mui/icons-material";
  import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
  
  
  const MobileAppbar = () => {
    const appBarZIndex = 1200;
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate()

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  

  
    return (
      <>
        <AppBar
          elevation={1}
          sx={{
            background: "#fff",
            borderBottom: `1px solid #e3e3e3`,
            py: { xs: 0.5, md: 1 },
            zIndex: appBarZIndex,
          }}
          position="fixed"
        >
        <Container>
        <Toolbar
            sx={{
              height: { xs: "50px", md: "100px" },
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              px: "0 !important",
            }}
          >
            <Box>
              <MobileSidebar />
            </Box>
            <Box>
              <Tooltip title="Open Menu">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={'Avatar'}
                    src=""
                  />
                </IconButton>
              </Tooltip>
              <Menu
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              PaperProps={{
                style: {
                  width: '200px',
                  background: "#fff",
                },
              }}
            >
              <MenuItem onClick={() => {
                handleCloseUserMenu();
                navigate(`/`);
              }}>
                <DashboardIcon sx={{ fontSize: 20, mr: "7px" }} /> Dashboard
              </MenuItem>
              <MenuItem onClick={() => {
                handleCloseUserMenu();
                navigate(`/`);
              }}>
                <ManageAccountsIcon sx={{ fontSize: 20, mr: "7px" }} /> Profile
              </MenuItem>
              <Divider />
              <MenuItem>
                <LogoutIcon sx={{ fontSize: 20, mr: "7px" }} /> Logout
              </MenuItem>
            </Menu>
            </Box>
          </Toolbar>
        </Container>
        </AppBar>
      </>
    );
  };
  
  export default MobileAppbar;
  
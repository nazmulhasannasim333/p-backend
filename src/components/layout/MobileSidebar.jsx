/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import CloseIcon from "@mui/icons-material/Close";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import Box from "@mui/material/Box";
import  {  useState } from "react";
import {  NavLink } from "react-router-dom";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import logo from "../../assets/react.svg"

const MobileSidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{ sx: { width: "80vw" } }}
      >
        <List
          sx={{
            width: "100%",
            bgcolor: "#fff",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 2,
              pt: 1,
              pb: 1.5,
              borderBottom: "1px solid #DEE1E0",
            }}
          >
            <img
              src={logo}
              alt="logo"
              width="55px"
              height="50px"
            />
            <CloseIcon onClick={() => setOpen(false)} />
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", height: "100%",  }}>
           <List sx={{ flexGrow: 1 }}>
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton
          onClick={() => setOpen(false)}
            component={NavLink}
            to="/"
            end
            sx={{
              minHeight: 54,
              justifyContent: "initial",
              px: 4,
              py: 2,
              "&.active": {
                borderLeft: "5px solid #FF0000",
                backgroundColor: "#FFE9E9",
                "& .MuiListItemIcon-root": {
                  color: "#FF0000",
                },
                "& .MuiListItemText-root": {
                  color: "#FF0000",
                },
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: 2,
                justifyContent: "center",
              }}
            >
              <DashboardIcon sx={{ fontSize: 30 }} />
            </ListItemIcon> <ListItemText primary="Dashboard" sx={{ opacity: 1 }} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton
          onClick={() => setOpen(false)}
            component={NavLink}
            to="/users"
            end
            sx={{
              minHeight: 54,
              justifyContent: "initial",
              px: 4,
              py: 2,
              "&.active": {
                borderLeft: "5px solid #FF0000",
                backgroundColor: "#FFE9E9",
                "& .MuiListItemIcon-root": {
                  color: "#FF0000",
                },
                "& .MuiListItemText-root": {
                  color: "#FF0000",
                },
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: 2,
                justifyContent: "center",
              }}
            >
              <AssignmentIndIcon sx={{ fontSize: 30 }} />
            </ListItemIcon> <ListItemText primary="Users" sx={{ opacity: 1 }} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton
          onClick={() => setOpen(false)}
            component={NavLink}
            to="/tasks"
            end
            sx={{
              minHeight: 54,
              justifyContent: "initial",
              px: 4,
              py: 2,
              "&.active": {
                borderLeft: "5px solid #FF0000",
                backgroundColor: "#FFE9E9",
                "& .MuiListItemIcon-root": {
                  color: "#FF0000",
                },
                "& .MuiListItemText-root": {
                  color: "#FF0000",
                },
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: 2,
                justifyContent: "center",
              }}
            >
              <AssignmentIndIcon sx={{ fontSize: 30 }} />
            </ListItemIcon> <ListItemText primary="Tasks" sx={{ opacity: 1 }} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
        </List>
      </Drawer>

      <IconButton
        onClick={() => setOpen((prevState) => !prevState)}
      >
        <MenuRoundedIcon fontSize="large" />
      </IconButton>
    </>
  );
};

export default MobileSidebar;

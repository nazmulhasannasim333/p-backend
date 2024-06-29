/* eslint-disable react/prop-types */
import {
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
  } from "@mui/material";
  import Box from "@mui/material/Box";
  import DashboardIcon from "@mui/icons-material/Dashboard";
  import PeopleIcon from '@mui/icons-material/People';
  import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import { NavLink } from "react-router-dom";
import TaskIcon from '@mui/icons-material/Task';
  
  const Sidebar = ({ open }) => {
  
  
    return (
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <List sx={{ flexGrow: 1 }}>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
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
              </ListItemIcon>
              {open && <ListItemText primary="Dashboard" sx={{ opacity: 1 }} />}
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
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
                <PeopleIcon sx={{ fontSize: 30 }} />
              </ListItemIcon>
              {open && <ListItemText primary="User Management" sx={{ opacity: 1 }} />}
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
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
                <TaskIcon sx={{ fontSize: 30 }} />
              </ListItemIcon>
              {open && <ListItemText primary="Task Management" sx={{ opacity: 1 }} />}
            </ListItemButton>
          </ListItem>
        </List>
        <Divider sx={{ borderTopWidth: "2px", borderTopColor: "#777777" }} />
        <ListItem disablePadding sx={{ display: "block", mt: "auto" }}>
          <ListItemButton
            sx={{
              minHeight: 54,
              justifyContent: "initial",
              px: 4,
              display: "flex",
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: 3,
                justifyContent: "center",
                fontSize: 30,
              }}
            >
              <HelpCenterIcon sx={{ fontSize: 30 }} />
            </ListItemIcon>
            {open && (
              <ListItemText primary="Help Center" sx={{ opacity: 1 }} />
            )}
          </ListItemButton>
        </ListItem>
      </Box>
    );
  };
  
  export default Sidebar;
  
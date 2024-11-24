import React, { useState } from "react";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    RBAC DASHBOARD
                </Typography>
                <Button
                    color={isActive("/home") ? "default" : "inherit"} 
                    component={Link}
                    to="/home"
                    style={{
                        backgroundColor: isActive("/home")
                            ? "grey"
                            : "transparent",
                    }} // Conditional background color
                >
                    HOME
                </Button>
                <Button
                    color={isActive("/users") ? "default" : "inherit"}
                    component={Link}
                    to="/users"
                    style={{
                        backgroundColor: isActive("/users")
                            ? "grey"
                            : "transparent",
                    }}
                >
                    USERS
                </Button>
                <Button
                    color={isActive("/roles") ? "default" : "inherit"}
                    component={Link}
                    to="/roles"
                    style={{
                        backgroundColor: isActive("/roles")
                            ? "grey"
                            : "transparent",
                    }}
                >
                    ROLES
                </Button>
                <Button
                    color={isActive("/graph") ? "default" : "inherit"}
                    component={Link}
                    to="/graph"
                    style={{
                        backgroundColor: isActive("/graph")
                            ? "grey"
                            : "transparent",
                    }}
                >
                    GRAPH
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;

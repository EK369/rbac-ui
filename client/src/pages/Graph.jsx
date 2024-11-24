import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie, Bar, Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
);

const Graph = () => {
    const [userData, setUserData] = useState(null); // State for Pie chart (User Roles Distribution)
    const [roleData, setRoleData] = useState(null); // State for Bar chart (Roles Created)
    const [statusData, setStatusData] = useState(null); // State for Doughnut chart (Active vs Inactive)

    useEffect(() => {
        // Fetch user data and calculate role distribution and status
        axios
            .get("http://localhost:5000/api/users")
            .then((response) => {
                const users = response.data;
                console.log("users", users)

                // Calculate role distribution with "Other" grouping
                const roles = users.reduce((acc, user) => {
                    const roleName = user.role.name; // Assuming 'role' is populated with the role name

                    // Group specific roles, others as "Other"
                    if (["Super-Admin", "Admin", "User"].includes(roleName)) {
                        acc[roleName] = (acc[roleName] || 0) + 1;
                    } else {
                        acc["Other"] = (acc["Other"] || 0) + 1; // Add to "Other"
                    }
                    return acc;
                }, {});

                console.log("roles", roles)

                // Define colors for each role, including "Other"
                const roleColors = {
                    "Super-Admin": "#FF6384", // Red
                    Admin: "#36A2EB", // Blue
                    User: "#FFCE56", // Yellow
                    Other: "#808080", // Grey for Other
                };

                // Map colors dynamically based on role keys
                const colors = Object.keys(roles).map(
                    (role) => roleColors[role] || "#4BC0C0"
                );

                // Set Pie chart data
                setUserData({
                    labels: Object.keys(roles),
                    datasets: [
                        {
                            label: "Users by Role",
                            data: Object.values(roles),
                            backgroundColor: colors,
                        },
                    ],
                });


                // Calculate active/inactive users
                const status = users.reduce(
                    (acc, user) => {
                        if (user.status === "Active") {
                            acc.active += 1;
                        } else {
                            acc.inactive += 1;
                        }
                        return acc;
                    },
                    { active: 0, inactive: 0 }
                );


                // Set Doughnut chart data for Active/Inactive status
                setStatusData({
                    labels: ["Active", "Inactive"],
                    datasets: [
                        {
                            label: "User Status",
                            data: [status.active, status.inactive],
                            backgroundColor: ["#4CAF50", "#F44336"], // Green for Active, Red for Inactive
                        },
                    ],
                });
            })
            .catch((error) =>
                console.error("Error fetching users data:", error)
            );

        // Fetch roles data for the Bar chart
        axios
            .get("http://localhost:5000/api/roles")
            .then((response) => {
                const roles = response.data;
                const roleNames = roles.map((role) => role.name);
                const roleCounts = new Array(roles.length).fill(1); // Use 1 for each role (or replace with actual count logic)

                // Set Bar chart data
                setRoleData({
                    labels: roleNames,
                    datasets: [
                        {
                            label: "Roles Created",
                            data: roleCounts,
                            backgroundColor: "#36A2EB", // Blue
                            borderColor: "#1f7fc7",
                            borderWidth: 1,
                        },
                    ],
                });
            })
            .catch((error) =>
                console.error("Error fetching roles data:", error)
            );
    }, []); // Empty dependency array ensures the effect runs only once after initial render

    // Render Pie, Bar, and Doughnut charts
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                paddingTop: "50px",
            }}
        >
            <h2 style={{ textAlign: "center", color: "#FFCE56" }}>
                User Roles Distribution
            </h2>
            <div
                style={{
                    width: "80%",
                    height: "400px",
                    marginBottom: "50px",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                {userData ? (
                    <Pie data={userData} />
                ) : (
                    <p>Loading user data...</p>
                )}
            </div>

            <h2 style={{ textAlign: "center", color: "#FFCE56" }}>
                Roles Created
            </h2>
            <div
                style={{
                    width: "80%",
                    height: "400px",
                    marginBottom: "50px",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                {roleData ? (
                    <Bar data={roleData} options={{ responsive: true }} />
                ) : (
                    <p>Loading role data...</p>
                )}
            </div>

            <h2 style={{ textAlign: "center", color: "#4CAF50" }}>
                User Status: Active vs Inactive
            </h2>
            <div
                style={{
                    width: "80%",
                    height: "400px",
                    marginBottom: "50px",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                {statusData ? (
                    <Doughnut data={statusData} />
                ) : (
                    <p>Loading status data...</p>
                )}
            </div>
        </div>
    );
};

export default Graph;

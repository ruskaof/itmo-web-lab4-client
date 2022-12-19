import React from "react";
import LoginFormButtons from "./components/login/LoginFormButtons.jsx";
import LoginForm from "./components/login/LoginForm.jsx";
import {Box, Tab, Tabs, Typography} from "@mui/material";
import RegisterForm from "./components/register/RegisterForm.jsx";
import {useIsMobile} from "../../utility/useIsMobile.js";

export default function LoginPage() {
    const isMobile = useIsMobile();
    const [pageId, setPageId] = React.useState(0);

    const handleChange = (event, newValue) => {
        setPageId(newValue);
    }

    return (<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <div style={{
            width: "100%",
            maxWidth: "600px",
        }}>
            <div className="card">
                <Box sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                    marginBottom: '10px',
                    borderRadius: '5px',
                }}>
                    <Tabs value={pageId} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Register "/>
                        <Tab label="Login"/>
                    </Tabs>
                </Box>
                <TabPanel value={pageId} index={0}>
                    <RegisterForm/>
                </TabPanel>
                <TabPanel value={pageId} index={1}>
                    <LoginForm/>
                </TabPanel>
            </div>
        </div>
        </Box>)
}

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (<div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            style={{
                width: "100%",
                height: "100%",
            }}
            {...other}
        >
            {value === index && (<Box>
                {children}
                </Box>)}
        </div>);
}
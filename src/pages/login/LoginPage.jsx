import React from "react";
import LoginFormButtons from "./components/login/LoginFormButtons.jsx";
import LoginForm from "./components/login/LoginForm.jsx";
import {Box, Tab, Tabs, Typography} from "@mui/material";
import RegisterForm from "./components/register/RegisterForm.jsx";

export default function LoginPage() {
    const [pageId, setPageId] = React.useState(0);

    const handleChange = (event, newValue) => {
        setPageId(newValue);
    }

    return (<div>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
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
        </div>)
}

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (<div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (<Box>
                {children}
                </Box>)}
        </div>);
}
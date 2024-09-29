import { FC, ReactNode, useState } from "react";
import logo from "../assets/logo.svg";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Avatar, Button, Divider, Image, makeStyles, mergeClasses, Persona, Popover, PopoverSurface, PopoverTrigger, Slot, Tab, TabList, Text, tokens, Tooltip } from "@fluentui/react-components";
import { ChevronDoubleLeftRegular, ChevronDoubleRightRegular, PowerFilled, SettingsRegular, TextBulletListSquareClockRegular } from "@fluentui/react-icons";
import { navigation } from "..";
import exp from "constants";

const useClasses = makeStyles({
    layout: {
        display: "grid",
        gridTemplateRows: "50px auto",
        gridTemplateColumns: "auto minmax(0, 1fr)",
        gridTemplateAreas: 
        `'header header header header'
        'navigation page page page'`,
        height: "100vh"
    },
    
    header: {
        gridArea: "header",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "5px 10px",
        borderBottom: "1px solid gray",
        backgroundColor: tokens.colorNeutralBackground5
    },
    logo: {
        display: "flex",
        alignItems: "center",
        gap: "5px"
    },
    actions: {
        display: "flex",
        gap: "10px"
    },
    profile: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "5px",
        cursor: "pointer",
        ':hover': {
            backgroundColor: tokens.colorNeutralBackground5Hover
        }
    },
    profilePopup: {
        display: "flex",
        gap: "10px",
        alignItems: "center"
    },
    profilePopupUserData: {
        display: "flex",
        flexDirection: "column",
        gap: "5px"
    },
    profilePopupDivider: {
        padding: "15px 0px"
    },
    profilePopupActions: {
        display: "flex",
        alignItems: "center",
        justifyContent: "end"
    },
    profilePopupSignOutButton: {
        width: "100%",
        padding: "8px 0px",
        color: tokens.colorNeutralForegroundStaticInverted,
        backgroundColor: tokens.colorStatusDangerBackground3Hover,
        ':hover': {
            color: tokens.colorNeutralForegroundStaticInverted,
            backgroundColor: tokens.colorStatusDangerBackground3Pressed
        }
    },

    navigation: {
        gridArea: "navigation",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRight: "1px solid gray",
        backgroundColor: tokens.colorNeutralBackground2
    },
    navigationTabs: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    navigationSettingsSection: {
        display: "flex",
    },
    navigationSettingsSectionExpanded: {
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "space-between",
        paddingRight: "5px"
    },
    navigationSettingsSectionCollapsed: {
        flexDirection: "column",
        alignContent: "center",
        paddingBottom: "5px"
    },
    navigationToggleIconContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    navigationToggleIcon: {
        fontSize: "24px",
        cursor: "pointer"
    },

    page: {
        gridArea: "page",
        padding: "10px",
        backgroundColor: tokens.colorNeutralBackground1
    }
});

export const MainLayout: FC = () => {

    const classes = useClasses();

    return (
        <div className={classes.layout}>
            <Header />
            <Navigation />
            <Page />
        </div>
    );
};

const Header: FC = () => {

    const classes = useClasses();

    return (
        <header className={classes.header}>
            <Link to="/">
                <div className={classes.logo}>
                    <Image src={logo} width={28} height={28} alt="Logo" />
                    <h1>Remind me</h1>
                </div>
            </Link>
            <div className={classes.actions}>
                <Popover>
                    <PopoverTrigger>
                       <Tooltip content="Profil" relationship="label">
                            <div className={classes.profile}>
                                <Avatar name="Marcin" initials="MB" color="brand" />
                                <Text>Marcin</Text>
                            </div>
                       </Tooltip>
                    </PopoverTrigger>
                    <PopoverSurface>
                        <div>
                            <div className={classes.profilePopup}>
                                <Avatar name="Marcin" initials="MB" size={72} color="brand" />
                                <div className={classes.profilePopupUserData}>
                                    <h2>Marcin Burak</h2>
                                    <Text>marcin.burak@outlook.com</Text>
                                </div>
                            </div>
                            <Divider className={classes.profilePopupDivider} />
                            <Button className={classes.profilePopupSignOutButton} icon={<PowerFilled />}>Wyloguj się</Button>
                        </div>
                    </PopoverSurface>
                </Popover>
            </div>
        </header>
    );
};

const Navigation: FC = () => {

    const classes = useClasses();
    const [expanded, setExpanded] = useState(true);

    const NavigationLink: FC<{ path: string, text: string, icon: ReactNode, expanded: boolean }> = ({ path, text, icon, expanded }) => {
        return (
            <NavLink to={path}>
                {icon}
                {expanded && <Text>{text}</Text>}
            </NavLink>
        );
    };

    const ExpandableTab: FC<{ text: string, icon: Slot<'span'>, expanded: boolean }> = ({ text, icon, expanded }) => {
        if (expanded) {
            return (
                <Tab content={text} icon={icon} value={text} />
            );
        }

        return (
            <Tooltip content={text} relationship="label">
                <Tab icon={icon} value={text} />
            </Tooltip>
        );
    };

    const ToggleIcon: FC<{ expanded: boolean, onExpand: () => void, onCollapse: () => void }> = ({ expanded, onExpand, onCollapse }) => {
        if (expanded) {
            return (
                <Tooltip content="Zwiń nawigację" relationship="label">
                    <ChevronDoubleLeftRegular className={classes.navigationToggleIcon} onClick={onCollapse} />
                </Tooltip>
            );
        }

        return (
            <Tooltip content="Rozwiń nawigację" relationship="label">
                <ChevronDoubleRightRegular className={classes.navigationToggleIcon} onClick={onExpand} />
            </Tooltip>
        );
    };

    const navigationSettingsSectionClasses = mergeClasses(classes.navigationSettingsSection, expanded ? classes.navigationSettingsSectionExpanded : classes.navigationSettingsSectionCollapsed);
    
    return (
        <aside className={classes.navigation}>
            <TabList className={classes.navigationTabs} appearance="subtle" size="large" vertical>
                <div>
                    <NavLink to={navigation.reminders}>
                        <ExpandableTab text="Przypomnienia" icon={<TextBulletListSquareClockRegular />} expanded={expanded} />
                    </NavLink>
                </div>
                <div>
                    <Divider inset />
                    <div className={navigationSettingsSectionClasses}>
                    <NavLink to={navigation.settings}>
                        <ExpandableTab text="Ustawienia" icon={<SettingsRegular />} expanded={expanded} />
                    </NavLink>
                    <div className={classes.navigationToggleIconContainer}>
                        <ToggleIcon expanded={expanded} onExpand={() => setExpanded(true)} onCollapse={() => setExpanded(false)} />
                    </div>
                </div>
                </div>
            </TabList>
        </aside>
    );
};

const Page: FC = () => {

    const classes = useClasses();

    return (
        <main className={classes.page}>
            <Outlet />
        </main>
    );
};
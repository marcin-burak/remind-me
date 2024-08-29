import { FC, useState } from "react";
import logo from "../assets/logo.svg";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Divider, Image, makeStyles, mergeClasses, Slot, Tab, TabList, tokens, Tooltip } from "@fluentui/react-components";
import { ChevronDoubleLeftRegular, ChevronDoubleRightRegular, PowerFilled, SettingsRegular, TextBulletListSquareClockRegular } from "@fluentui/react-icons";
import { navigation } from "..";

const useClasses = makeStyles({
    layout: {
        display: "grid",
        gridTemplateRows: "48px auto",
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
    signOutIconContainer: {
        display: "flex",
        alignItems: "center"
    },
    signOutIcon: { 
        color: tokens.colorPaletteRedBackground3,
        width: "20px",
        height: "20px",
        cursor: "pointer"
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
            <div className={classes.signOutIconContainer}>
                <Tooltip content="Wyloguj się" relationship="label">
                    <PowerFilled className={classes.signOutIcon} onClick={() => alert("Singed out")} />
                </Tooltip>
            </div>
        </header>
    );
};

const Navigation: FC = () => {

    const classes = useClasses();
    const [expanded, setExpanded] = useState(true);

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
import { FC, useContext } from "react";
import { CompoundButton, Label, makeStyles } from "@fluentui/react-components";
import { LaptopRegular, WeatherMoonRegular, WeatherSunnyRegular } from "@fluentui/react-icons";
import { PageHeader } from "./components";
import { ThemeContext } from "../theme";

const useClasses = makeStyles({
    section: {
        display: "flex",
        flexDirection: "column",
        gap: "5px"
    },
    themeButtons: {
        display: "flex",
        gap: "10px"
    }
});

export const SettingsPage: FC = () => {

    const classes = useClasses();
    const themeContext = useContext(ThemeContext);

    if (themeContext === null) {
        return null;
    }

    return (
        <article>
            <PageHeader text="Ustawienia" />
            <section className={classes.section}>
                <Label>Motyw</Label>
                <div className={classes.themeButtons}>
                    <CompoundButton icon={<LaptopRegular />} appearance={themeContext.isSystemTheme ? "primary" : undefined} onClick={() => themeContext.setSystemTheme()}>System</CompoundButton>
                    <CompoundButton icon={<WeatherSunnyRegular />} appearance={themeContext.isLightTheme ? "primary" : undefined} onClick={() => themeContext.setLightTheme()}>Jasny</CompoundButton>
                    <CompoundButton icon={<WeatherMoonRegular />} appearance={themeContext.isDarkTheme ? "primary" : undefined} onClick={() => themeContext.setDarkTheme()}>Ciemny</CompoundButton>
                </div>
            </section>
        </article>
    );
};
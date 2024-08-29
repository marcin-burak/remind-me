import { FC } from "react";
import { Divider, makeStyles } from "@fluentui/react-components";

const useClasses = makeStyles({
    divider: {
        padding: "10px 0px"
    }
});

export const PageHeader: FC<{ text: string }> = ({ text }) => {

    const classes = useClasses();

    return (
        <div>
            <header>
                <h1>{text}</h1>
            </header>
            <Divider className={classes.divider} />
        </div>
    );
};
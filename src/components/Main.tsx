import { ReactElement } from "react";

const Main = ({ children }: { children: ReactElement }) => {
    return (
        <div
            id="main"
            className={
                "border-2 border-teal-200 p-4 home-main flex gap-0 overflow-y-hidden h-full"
            }
        >
            {children}
        </div>
    );
};

export default Main;

import { ReactElement } from "react";
import Main from "./Main";
import Navbar from "./Navbar";

const Template = ({ children }: { children: ReactElement }) => {
    return (
        <div className="w-screen h-screen bg-bg-dark flex flex-col">
            <Navbar />
            <div className="px-2 sm:px-8 grow">
                <Main>{children}</Main>
            </div>
        </div>
    );
};

export default Template;

import { ReactElement } from "react";
import Main from "./Main";
import Navbar from "./Navbar";

const Template = ({ children }: { children: ReactElement }) => {
    return (
        <div className="w-screen h-dvh bg-bg-dark flex flex-col">
            <Navbar />
            <div className="lg:pb-5 px-2 sm:pb-2 sm:px-8 grow min-h-0">
                <Main>{children}</Main>
            </div>
        </div>
    );
};

export default Template;

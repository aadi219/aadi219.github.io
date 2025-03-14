import { ReactElement } from "react";
import Template from "../components/Template.tsx";
import Main from "./components/Main";

const Home = (): ReactElement => {
    return (
        <>
            <Template>
                <Main />
            </Template>
        </>
    );
};

export default Home;

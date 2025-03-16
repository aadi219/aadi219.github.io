import { ReactElement } from "react";
import { Link } from "react-router-dom";

export const NavLink = ({
    addr,
    text
}: {
    addr: string;
    text: string;
}): ReactElement => {
    return (
        <>
            <span className="font-main navlink md:px-14 py-2 text-highlight-teal hover:text-highlight-blue transition-colors duration-300">
                <Link to={addr}>{text}</Link>
            </span>
        </>
    );
};

const Navbar = (): ReactElement => {
    return (
        <div className="w-full flex justify-between px-4 md:px-0 md:justify-evenly text-xl">
            <NavLink addr="/" text="HOME" />
            <NavLink addr="/about" text="ABOUT" />
            <NavLink addr="/projects" text="PROJECTS" />
            <a
                className="md:px-14 font-main py-2 text-highlight-teal hover:text-highlight-blue transition-colors duration-300"
                href="https://drive.google.com/file/d/1EOOdWZ7B2Zi_c2H99zidLk8G3ffSa4Jp/view?usp=sharing"
                target="_blank"
            >
                RESUME
            </a>
        </div>
    );
};

export default Navbar;

import { ReactElement } from "react";
import { useScroll } from "../context/ScrollContext";

interface SubnavItemProps {
    linkTo: string;
    index: number;
}

const SubnavItem = ({ linkTo, index }: SubnavItemProps): ReactElement => {
    const { scrollToIndex } = useScroll();

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        console.log(scrollToIndex);
        scrollToIndex(index);
    };

    return (
        <a
            onClick={handleClick}
            href={"#" + linkTo}
            className="w-[25%] barFill font-heading italic py-1 px-2 hover:text-bg-dark text-cyan-300"
        >
            .{linkTo}
        </a>
    );
};

export default SubnavItem;

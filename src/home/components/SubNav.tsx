import SubnavItem from "./SubnavItem.tsx";
const SubNav = () => {
    return (
        <div className="subnav flex flex-col text-lg">
            <SubnavItem linkTo="Bio" index={0} />
            <SubnavItem linkTo="Skills" index={1} />
            <SubnavItem linkTo="Projects" index={2} />
        </div>
    );
};

export default SubNav;

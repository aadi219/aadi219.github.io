import SubnavItem from "./SubnavItem.tsx";
const SubNav = () => {
    return (
        <div className="subnav hidden lg:visible lg:flex sm:flex-col md:justify-start mt-4 pt-3 md:pt-0 text-lg">
            <SubnavItem linkTo="Bio" index={0} />
            <SubnavItem linkTo="Skills" index={1} />
            <SubnavItem linkTo="Projects" index={2} />
        </div>
    );
};

export default SubNav;

import { EmailRounded, GitHub, LinkedIn } from "@mui/icons-material";

const Contacts = ({className} : {className: string}) => {
    return (
        <ul id="contacts" className={className}>
            <li className="mb-3">
                <a target="_blank" href="https://github.com/aadi219/">
                    <GitHub />
                </a>
            </li>
            <li className="mb-3">
                <a
                    target="_blank"
                    href="https://www.linkedin.com/in/aadibadola/"
                >
                    <LinkedIn />
                </a>
            </li>
            <li className="mb-3">
                <a target="_blank" href="mailto:aadibadola1@gmail.com">
                    <EmailRounded />
                </a>
            </li>
        </ul>
    );
};

export default Contacts;

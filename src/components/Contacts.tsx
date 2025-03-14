import { EmailRounded, GitHub, LinkedIn } from "@mui/icons-material";

const Contacts = () => {
    return (
        <ul id="contacts" className="relative z-20">
            <li>
                <a target="_blank" href="https://github.com/aadi219/">
                    <GitHub />
                </a>
            </li>
            <li>
                <a
                    target="_blank"
                    href="https://www.linkedin.com/in/aadibadola/"
                >
                    <LinkedIn />
                </a>
            </li>
            <li>
                <a target="_blank" href="mailto:aadibadola1@gmail.com">
                    <EmailRounded />
                </a>
            </li>
        </ul>
    );
};

export default Contacts;

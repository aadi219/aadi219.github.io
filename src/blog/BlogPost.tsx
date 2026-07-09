import { useParams } from "react-router-dom";
import Template from "../components/Template";
import Main from "./components/BlogPostMain";

const BlogPost = () => {
    const { slug } = useParams<{ slug: string }>();

    return (
        <Template>
            <Main slug={slug} />
        </Template>
    );
};

export default BlogPost;

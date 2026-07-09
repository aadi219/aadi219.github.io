import { useEffect } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkFlexibleMarkers from "remark-flexible-markers";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import type { Components } from "react-markdown";
import { getPostBySlug } from "../lib/posts";
import "katex/dist/katex.min.css";
import "../blog.css";

const formatDate = (date: string): string =>
    new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC"
    });

const markdownComponents: Components = {
    a: ({ href, children, ...props }) => {
        const isExternal = /^https?:\/\//.test(href ?? "");
        return (
            <a
                href={href}
                {...props}
                {...(isExternal
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
            >
                {children}
            </a>
        );
    },
    // Markdown images become <figure><img/><figcaption/></figure>. Write
    // ![alt](path "Caption") to set both an accessible alt and a visible
    // caption, or just ![Caption](path) to use the alt text as the caption.
    img: ({ src, alt, title }) => {
        const caption = title || alt;
        return (
            <figure className="blog-figure">
                <img src={src} alt={alt ?? ""} />
                {caption && <figcaption>{caption}</figcaption>}
            </figure>
        );
    },
    // A markdown image on its own line is parsed as a <p> containing a
    // single image. Since <figure> can't legally nest inside <p>, unwrap
    // the paragraph in that one case and render the figure directly.
    p: ({ node, children }) => {
        const isSingleImage =
            node?.children?.length === 1 &&
            node.children[0].type === "element" &&
            node.children[0].tagName === "img";
        if (isSingleImage) {
            return <>{children}</>;
        }
        return <p>{children}</p>;
    }
};

const BlogPostMain = ({ slug }: { slug?: string }) => {
    const post = slug ? getPostBySlug(slug) : undefined;

    useEffect(() => {
        document.title = post ? `${post.title} | Aadi Badola` : "Aadi Badola";
        return () => {
            document.title = "Aadi Badola";
        };
    }, [post]);

    if (!post) {
        return (
            <div className="w-full h-full overflow-y-auto px-4 md:relative md:top-[40px]">
                <div className="md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto">
                    <h2 className="font-heading text-highlight-blue mb-4">
                        Post not found
                    </h2>
                    <Link to="/blog" className="btn-fill p-3 inline-block">
                        Back to Blog
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full overflow-y-auto px-4 md:relative md:top-[40px] pb-10">
            <div className="md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto">
                <Link
                    to="/blog"
                    className="font-main text-highlight-teal hover:text-highlight-blue transition-colors duration-300"
                >
                    &larr; Back to Blog
                </Link>
                <h1 className="font-heading text-highlight-teal text-3xl sm:text-4xl font-semibold mt-4">
                    {post.title}
                </h1>
                <p className="font-main text-highlight-blue mt-2 mb-8">
                    {formatDate(post.date)}
                </p>
                <div className="blog-content">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm, remarkMath, remarkFlexibleMarkers]}
                        rehypePlugins={[rehypeKatex, rehypeHighlight]}
                        components={markdownComponents}
                    >
                        {post.content}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
};

export default BlogPostMain;

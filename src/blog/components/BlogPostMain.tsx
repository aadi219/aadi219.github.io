import { useEffect } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
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
        day: "numeric"
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
            <div className="w-full h-full overflow-y-auto lg:px-40 md:relative md:top-[40px]">
                <h2 className="font-heading text-highlight-blue mb-4">
                    Post not found
                </h2>
                <Link to="/blog" className="btn-fill p-3 inline-block">
                    Back to Blog
                </Link>
            </div>
        );
    }

    return (
        <div className="w-full h-full overflow-y-auto lg:px-40 md:relative md:top-[40px] pb-10">
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
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex, rehypeHighlight]}
                    components={markdownComponents}
                >
                    {post.content}
                </ReactMarkdown>
            </div>
        </div>
    );
};

export default BlogPostMain;

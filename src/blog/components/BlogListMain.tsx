import { Link } from "react-router-dom";
import { getAllPosts } from "../lib/posts";

const formatDate = (date: string): string =>
    new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });

const BlogListMain = () => {
    const posts = getAllPosts();

    return (
        <div className="w-full h-full overflow-y-auto px-4 md:relative md:top-[40px] pb-10 text-left">
            <div className="md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto">
                {posts.length === 0 ? (
                    <p className="font-main text-white">
                        No posts yet — check back soon.
                    </p>
                ) : (
                    <ul className="flex flex-col">
                        {posts.map((post) => (
                            <li
                                key={post.slug}
                                className="border-b border-bg-med last:border-b-0"
                            >
                                <Link
                                    to={`/blog/${post.slug}`}
                                    className="group block py-4"
                                >
                                    <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                                        <p className="font-heading text-lg sm:text-xl text-highlight-teal font-semibold group-hover:text-highlight-blue transition-colors duration-300">
                                            {post.title}
                                        </p>
                                        <p className="font-main text-sm text-highlight-blue whitespace-nowrap">
                                            {formatDate(post.date)}
                                        </p>
                                    </div>
                                    {post.description && (
                                        <p className="font-main text-white mt-1">
                                            {post.description}
                                        </p>
                                    )}
                                    {post.tags && post.tags.length > 0 && (
                                        <ul className="flex flex-wrap gap-3 mt-2">
                                            {post.tags.map((tag) => (
                                                <li
                                                    key={tag}
                                                    className="font-main text-xs text-highlight-blue"
                                                >
                                                    #{tag}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default BlogListMain;

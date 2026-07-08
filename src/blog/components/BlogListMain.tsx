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
        <div className="w-full h-full overflow-y-auto lg:px-40 md:relative md:top-[40px] pb-10">
            <h2 className="font-heading text-highlight-blue mb-6">Blog</h2>
            {posts.length === 0 ? (
                <p className="font-main text-white">No posts yet — check back soon.</p>
            ) : (
                <ul className="flex flex-col gap-6">
                    {posts.map((post) => (
                        <li key={post.slug}>
                            <Link
                                to={`/blog/${post.slug}`}
                                className="block bg-col-dark border-2 border-bg-med rounded-[10px] p-5 transition-colors duration-300 hover:border-highlight-teal"
                            >
                                <p className="font-heading text-xl sm:text-2xl text-highlight-teal font-semibold">
                                    {post.title}
                                </p>
                                <p className="font-main text-sm text-highlight-blue mt-1">
                                    {formatDate(post.date)}
                                </p>
                                {post.description && (
                                    <p className="font-main text-white mt-3">
                                        {post.description}
                                    </p>
                                )}
                                {post.tags && post.tags.length > 0 && (
                                    <ul className="flex flex-wrap gap-2 mt-4">
                                        {post.tags.map((tag) => (
                                            <li
                                                key={tag}
                                                className="font-main text-xs text-highlight-blue border border-highlight-teal rounded-full py-1 px-3"
                                            >
                                                {tag}
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
    );
};

export default BlogListMain;

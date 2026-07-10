import fm from "front-matter";

export interface PostFrontmatter {
    title: string;
    date: string;
    description?: string;
    image?: string;
    tags?: string[];
    draft?: boolean;
}

export interface Post extends PostFrontmatter {
    slug: string;
    content: string;
}

const rawPosts = import.meta.glob("/src/blog/posts/*.md", {
    query: "?raw",
    import: "default",
    eager: true
}) as Record<string, string>;

const slugFromPath = (path: string): string => {
    const filename = path.split("/").pop() ?? "";
    return filename.replace(/\.md$/, "");
};

const parsePost = (path: string, raw: string): Post => {
    const { attributes, body } = fm<Partial<PostFrontmatter>>(raw);
    if (!attributes.title || !attributes.date) {
        throw new Error(
            `Blog post "${path}" is missing required frontmatter (title, date)`
        );
    }
    return {
        ...(attributes as PostFrontmatter),
        slug: slugFromPath(path),
        content: body
    };
};

const allPosts: Post[] = Object.entries(rawPosts)
    .map(([path, raw]) => parsePost(path, raw))
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export const getAllPosts = (): Post[] => allPosts;

export const getPostBySlug = (slug: string): Post | undefined =>
    allPosts.find((post) => post.slug === slug);

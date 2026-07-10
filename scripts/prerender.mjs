// Generates a static index.html per route (with route-specific <title>/meta tags)
// and a sitemap.xml, so search crawlers and link-preview bots -- which read raw
// HTML without executing JS -- see correct per-page metadata instead of the
// shared SPA shell. Runs after `vite build` via the `postbuild` npm script.
import fm from "front-matter";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
const postsDir = path.join(root, "src/blog/posts");
const siteUrl = "https://aadibadola.com";

const template = fs.readFileSync(path.join(distDir, "index.html"), "utf-8");

const posts = fs
    .readdirSync(postsDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
        const raw = fs.readFileSync(path.join(postsDir, file), "utf-8");
        const { attributes } = fm(raw);
        return {
            slug: file.replace(/\.md$/, ""),
            title: attributes.title,
            date: attributes.date,
            description: attributes.description ?? "",
            image: attributes.image,
            draft: attributes.draft ?? false
        };
    })
    .filter((post) => !post.draft);

const escapeHtml = (value) =>
    value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const setTitle = (html, title) =>
    html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`);

const setMeta = (html, attr, key, content) => {
    const re = new RegExp(`(<meta[^>]*${attr}=["']${key}["'][^>]*content=)(["'])[^"']*(["'])`);
    return html.replace(re, `$1$2${escapeHtml(content)}$3`);
};

const setCanonical = (html, url) =>
    html.replace(/(<link rel="canonical" href=)(["'])[^"']*(["'])/, `$1$2${url}$3`);

const renderRoute = ({ routePath, title, description, image }) => {
    const url = `${siteUrl}${routePath === "/" ? "" : routePath}`;
    let html = template;
    html = setTitle(html, title);
    html = setMeta(html, "name", "description", description);
    html = setMeta(html, "property", "og:title", title);
    html = setMeta(html, "property", "og:description", description);
    html = setMeta(html, "property", "og:url", url);
    html = setMeta(html, "name", "twitter:title", title);
    html = setMeta(html, "name", "twitter:description", description);
    html = setMeta(html, "property", "twitter:url", url);
    html = setCanonical(html, url);
    if (image) {
        const imageUrl = `${siteUrl}${image}`;
        html = setMeta(html, "property", "og:image", imageUrl);
        html = setMeta(html, "name", "twitter:image", imageUrl);
    }

    if (routePath === "/") {
        fs.writeFileSync(path.join(distDir, "index.html"), html);
        return;
    }
    const outDir = path.join(distDir, routePath.replace(/^\//, ""));
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, "index.html"), html);
};

const routes = [
    {
        routePath: "/",
        title: "Aadi Badola",
        description: "Experienced Machine Learning Engineer & Full-Stack Developer"
    },
    {
        routePath: "/about",
        title: "About | Aadi Badola",
        description:
            "About Aadi Badola, a Software Engineer experienced in full-stack development and AI-powered solutions."
    },
    {
        routePath: "/projects",
        title: "Projects | Aadi Badola",
        description: "A showcase of software, machine learning, and full-stack projects by Aadi Badola."
    },
    {
        routePath: "/blog",
        title: "Blog | Aadi Badola",
        description: "Articles on category theory, functional programming, and machine learning by Aadi Badola."
    },
    ...posts.map((post) => ({
        routePath: `/blog/${post.slug}`,
        title: `${post.title} | Aadi Badola`,
        description: post.description || post.title,
        image: post.image
    }))
];

for (const route of routes) {
    renderRoute(route);
}

const urlEntries = ["/", "/about", "/projects", "/blog", ...posts.map((p) => `/blog/${p.slug}`)]
    .map((routePath) => {
        const post = posts.find((p) => `/blog/${p.slug}` === routePath);
        const lastmod = post ? post.date : new Date().toISOString().slice(0, 10);
        const url = `${siteUrl}${routePath === "/" ? "" : routePath}`;
        return `  <url>\n    <loc>${url}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
    })
    .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`;

fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemap);

console.log(`Prerendered ${routes.length} routes and generated sitemap.xml with ${posts.length} post(s).`);

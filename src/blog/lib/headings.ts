import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";
import { toString } from "mdast-util-to-string";
import GithubSlugger from "github-slugger";
import type { Heading } from "mdast";

export interface HeadingItem {
    depth: number;
    text: string;
    id: string;
}

const parser = unified().use(remarkParse).use(remarkGfm);

// Ids must match what rehype-slug assigns to the rendered h2/h3 elements,
// so this walks the same headings in document order with the same slugger.
export const extractHeadings = (markdown: string): HeadingItem[] => {
    const tree = parser.parse(markdown);
    const slugger = new GithubSlugger();
    const headings: HeadingItem[] = [];

    visit(tree, "heading", (node: Heading) => {
        if (node.depth < 2 || node.depth > 3) return;
        const text = toString(node);
        headings.push({ depth: node.depth, text, id: slugger.slug(text) });
    });

    return headings;
};

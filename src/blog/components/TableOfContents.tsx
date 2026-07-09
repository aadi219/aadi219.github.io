import { useEffect, useState, type RefObject } from "react";
import type { HeadingItem } from "../lib/headings";

interface HeadingNode extends HeadingItem {
    children: HeadingItem[];
}

// Nests each h3 under the h2 that precedes it in document order, so the
// rendered list is an actual nested <ul>, not just visually indented.
const groupHeadings = (headings: HeadingItem[]): HeadingNode[] => {
    const tree: HeadingNode[] = [];
    for (const heading of headings) {
        if (heading.depth === 2 || tree.length === 0) {
            tree.push({ ...heading, children: [] });
        } else {
            tree[tree.length - 1].children.push(heading);
        }
    }
    return tree;
};

const TableOfContents = ({
    headings,
    containerRef
}: {
    headings: HeadingItem[];
    containerRef: RefObject<HTMLDivElement | null>;
}) => {
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        if (headings.length === 0) return;

        // The article scrolls inside a nested div, not the window, so the
        // observer root must be that div rather than the (non-scrolling) viewport.
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                root: containerRef.current,
                rootMargin: "-100px 0px -70% 0px",
                threshold: 0
            }
        );

        const elements = headings
            .map(({ id }) => document.getElementById(id))
            .filter((el): el is HTMLElement => el !== null);

        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [headings, containerRef]);

    if (headings.length === 0) return null;

    const tree = groupHeadings(headings);

    const linkClass = (id: string) =>
        `block font-main text-sm leading-snug transition-colors duration-200 ${
            activeId === id
                ? "text-highlight-teal"
                : "text-highlight-blue hover:text-highlight-teal"
        }`;

    return (
        <div className="hidden lg:block lg:absolute lg:top-0 lg:bottom-0 lg:left-full lg:ml-6 lg:w-44 xl:w-52 text-left lg:pl-3 md:pl-1">
            <nav aria-label="Table of contents" className="lg:sticky lg:top-28">
                <p className="font-heading text-xs tracking-widest uppercase text-highlight-blue mb-3">
                    On this page
                </p>
                <ul className="flex flex-col gap-2">
                    {tree.map((node) => (
                        <li key={node.id}>
                            <a href={`#${node.id}`} className={linkClass(node.id)}>
                                {node.text}
                            </a>
                            {node.children.length > 0 && (
                                <ul className="flex flex-col gap-2 mt-2 pl-3 border-l border-bg-med">
                                    {node.children.map((child) => (
                                        <li key={child.id}>
                                            <a
                                                href={`#${child.id}`}
                                                className={linkClass(child.id)}
                                            >
                                                {child.text}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default TableOfContents;

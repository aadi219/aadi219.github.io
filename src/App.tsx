import About from "./about/About.tsx";
import "./App.css";
import Blog from "./blog/Blog.tsx";
import BlogPost from "./blog/BlogPost.tsx";
import Home from "./home/Home";
import Projects from "./projects/Projects";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/projects",
        element: <Projects />
    },
    {
        path: "/about",
        element: <About />
    },
    {
        path: "/blog",
        element: <Blog />
    },
    {
        path: "/blog/:slug",
        element: <BlogPost />
    }
]);
function App() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;

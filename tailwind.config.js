/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {  
        "bg-dark" : "var(--bg-dark)",
        "bg-med" : "var(--bg-med)",
        "highlight-blue" : "var(--highlight-blue)",
        "highlight-teal" : "var(--highlight-teal)",
        "col-dark" : "var(--col-dark)",
        "hover-dark" : "var(--bg-hover)"
      }
    },
  },
  plugins: [],
}


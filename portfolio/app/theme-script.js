// This script runs before the React app loads to prevent flash of wrong theme
;(() => {
    try {
      const storedTheme = localStorage.getItem("theme")
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
  
      if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    } catch (e) {
      console.error("Theme initialization failed:", e)
    }
  })()
  
# install Create react App
`       npx create-react-app notehub     `

# Install Tailwind Css
`       npm install -D tailwindcss postcss autoprefixer       `
`       npx tailwindcss init -p       `

# Configure your template paths
# Add the paths to all of your template files in your tailwind.config.js file.

`
/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}  
`

# Add the Tailwind directives to your CSS
# Add the @tailwind directives for each of Tailwind’s layers to your ./src/index.css file.
`
@tailwind base;
@tailwind components;
@tailwind utilities;
` 

# Start your build process
`       npm run start       `


# Install the material icon 
`       npm install @mui/icons-material @mui/material @emotion/styled @emotion/react        `
if any error then
`   npm install @mui/material @emotion/react @emotion/styled    `
`   npm install @mui/material @mui/styled-engine-sc styled-components    `
`   npm install @mui/icons-material     `

# Install the React Infinite Scroll
`       npm install --save react-infinite-scroll-component       `

# Install react router dom
`       npm install --save react-router-dom         `

# install --save react-top-loading-bar
`       npm install --save react-top-loading-bar      `

#  Thank You
# Made By Harsh Kumar
# Github @H4rshSingh# NoteHub






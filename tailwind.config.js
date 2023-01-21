/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.js", // Note the addition of the `app` directory.
		"./app/**/*.ts",
		"./app/**/*.jsx",
		"./app/**/*.tsx",
		"./pages/**/*.js",
		"./pages/**/*.ts",
		"./pages/**/*.jsx",
		"./pages/**/*.tsx",
	],
	plugins: [
		require("@tailwindcss/forms")
	],
};

module.exports = {
	config: {
		tailwindjs: "./tailwind.config.js",
		port: 9050
	},
	paths: {
		root: "./",
		src: {
			base: "./src",
			css: "./src/assets/css",
			js: "./src/js",
			img: "./src/assets/images",
			includeHtml: './src/include_html',
			guide: './src/guide',
		},
		dist: {
			base: "./dist",
			css: "./dist/assets/css",
			cssFile: "ps_style_mo",
			js: "./dist/js",
			jsFile: "ps_script_mo",
			img: "./dist/assets/images",
			guide: './dist/guide',
		},
		build: {
			base: "./build",
			css: "./build/assets/css",
			cssFile: "ps_style_mo",
			js: "./build/js",
			jsFile: "ps_script_mo",
			img: "./build/assets/images"
		}
	}
}
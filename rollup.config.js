const resolve = require("@rollup/plugin-node-resolve");
const babel = require("@rollup/plugin-babel");
const commonjs = require("@rollup/plugin-commonjs");
const terser = require("@rollup/plugin-terser");
const postcss = require("rollup-plugin-postcss");
const del = require("rollup-plugin-delete");
const cssnano = require("cssnano");

module.exports = [{
	input: "src/index.js",
	plugins: [
		del({
			targets: "dist/*"
		}),
		resolve(),
		commonjs(),
		babel({
			exclude: ["node_modules/**"],
			babelHelpers: "bundled"
		})
	],
	output: [
		{
			file: "dist/cjs.js",
			format: "cjs",
			exports: "named",
			footer: "module.exports = Object.assign(exports.default, exports);",
			sourcemap: true
		},
		{
			file: "dist/es.js",
			format: "es"
		},
		{
			file: "dist/umd.js",
			format: "umd",
			name: "PaperCheckboxTree",
			sourcemap: true,
			plugins: [
				terser()
			]
		},
	],
}, {
	input: "src/index.pcss",
	output: {
		file: "dist/style.js",
		format: "cjs"
	},
	plugins: [
		del({
			targets: "dist/style.js",
			hook: "writeBundle"
		}),
		postcss({
			extract: "style.css",
			plugins: [
				cssnano({
					preset: "default"
				})
			],
		})
	]
}]

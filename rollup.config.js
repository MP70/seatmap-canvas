import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import {terser} from "rollup-plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import serve from 'rollup-plugin-serve'
import scss from 'rollup-plugin-scss'
import livereload from 'rollup-plugin-livereload'

const packageJson = require("./package.json");

export default commandLineArgs => {
    console.log('cmd', commandLineArgs)
    let config = [
        {
            input: "src/lib/canvas.index.ts",
            output: [
                {
                    file: packageJson.main,
                    format: "iife",
                    sourcemap: true,
                },
                {
                    file: packageJson.module,
                    format: "esm",
                    sourcemap: true,
                },
            ],
            plugins: [
                scss(),
                peerDepsExternal(),
                resolve(),
                commonjs(),
                typescript({tsconfig: "./tsconfig.json"}),
                terser()
            ],
            external: [],
        },
        {
            input: "src/lib/canvas.index.ts",
            output: [{file: "dist/types.d.ts", format: "es"}],
            plugins: [scss(), dts.default()],
        },
    ];
    console.log('commandLineArgs.prod', commandLineArgs.prod)
    if (!commandLineArgs.prod) {
        config[0].plugins.push(livereload())
        config[0].plugins.push(serve({
            openPage: '/index.html',
            contentBase: ['dist', 'examples', 'src'],
            port: 3002,
        }))
    }
    return config;
}
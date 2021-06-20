import typescript from '@rollup/plugin-typescript';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy';
import svelte from "rollup-plugin-svelte";
import autoPreprocess from 'svelte-preprocess';
import manifest from './manifest.json';

const TEST_VAULT = `test-vault/.obsidian/plugins/${manifest.id}`;

export default {
  input: 'src/main.ts',
  output: {
    dir: 'dist/',
    sourcemap: 'inline',
    format: 'cjs',
    exports: 'default'
  },
  external: ['obsidian'],
  plugins: [
    typescript({
      include: [
        'src/constants.ts',
        'src/file.ts',
        'src/main.ts',
        'src/mermaid.ts',
        'src/moment-date-regex.ts',
        'src/parser.ts',
        'src/plan-data.ts',
        'src/planner-md.ts',
        'src/progress.ts',
        'src/settings-tab.ts',
        'src/settings.ts',
        'src/status-bar.ts',
        'src/timeline-store.ts',
        'src/timeline-view.ts',
      ]
    }),
    nodeResolve({browser: true}),
    commonjs(),
    svelte({
       preprocess: autoPreprocess()
    }),
    copy({
      targets: [
        { src: 'dist/main.js', dest: TEST_VAULT },
        { src: ['manifest.json', 'styles.css'], dest: TEST_VAULT }
      ], flatten: true
    })
  ]
};

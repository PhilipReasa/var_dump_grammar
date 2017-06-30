#!/bin/sh
pegjs -o dist/var_dump_grammar.js --format globals --export-var varDumpParser var_dump_grammar.pegjs
pegjs -o dist/var_dump_grammar_commonjs.js --format commonjs var_dump_grammar.pegjs

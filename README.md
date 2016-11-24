# Compiler

Process-visualized compiler for a toy language.

### Introduction

[Demo](https://sevenoutman.github.io/Compiler/)

This application origins from my class project.
The goal of the project was to implement a compiler for a given sample language.
Most importantly, it should be able to visualize the compiling process by, 
e.g. drawing the syntax tree 
or showing the change of symbol table as it steps forward.

My team decided to make it on Web platform,
so that it has the best accessibility.
My teammate [@ExinCoda](https://github.com/ExinCoda) implemented the core compiler
and I was in charge of UI and visualization.

### Achievement

Finally the application got:
 - An editor - with tab management -
so that you can directly write your code right inside it.
 - A workspace where you can create or delete source code files.
 - An output console.
 - A syntax tree display which only shows when you are compiling, not editing.

You can never describe a UI perfectly with only text, so I recommend you [try it out](https://sevenoutman.github.io/Compiler/) yourself.

## The language

The sample language to compile - which I called 'toy language' - is given by our teacher.
I'll put its syntax and rules here if I can find those documents back. -.-||

## Update

I'm learning Vue.js these days and I tried re-implementing the UI with Vue.
Although most functionality is ready, it's not quite finished yet.
Some file management features are still under recovering.
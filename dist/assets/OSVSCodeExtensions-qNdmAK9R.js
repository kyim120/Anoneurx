import{w as i,r,j as s}from"./index-B6A8K-v4.js";import{O as n}from"./OSPage-3MAod4ts.js";import{O as c,a as l,C as d}from"./OSCard-C-gOhGVy.js";import{e as m}from"./data-Bl7Gjdeb.js";import{C as p}from"./cpu-BQ_hhqkt.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=i("SquareTerminal",[["path",{d:"m7 11 2-2-2-2",key:"1lz0vl"}],["path",{d:"M11 13h4",key:"1p7l4v"}],["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}]]),f=()=>{const[t,o]=r.useState(""),a=r.useMemo(()=>m.filter(e=>`${e.name} ${e.description}`.toLowerCase().includes(t.toLowerCase())),[t]);return s.jsxs(n,{children:[s.jsx(c,{title:"VS Code Extensions",subtitle:"Editor extensions to accelerate development on the Anoneurx stack.",search:t,onSearchChange:o,icon:x}),s.jsx("div",{className:"grid gap-5 sm:grid-cols-2 lg:grid-cols-3",children:a.map(e=>s.jsx(l,{title:e.name,description:e.description,icon:p,meta:s.jsxs(d,{children:[e.installs," installs"]})},e.id))})]})};export{f as default};

(this.webpackJsonpunicafe=this.webpackJsonpunicafe||[]).push([[0],{38:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var r=t(14),c=t.n(r),a=t(4),u=t(2),o=t(0),i=function(e){var n=e.handleSubmit,t=e.handleNameChange,r=e.handleNumberChange,c=e.newName,a=e.newNumber;return Object(o.jsxs)("form",{onSubmit:n,children:[Object(o.jsxs)("div",{children:["name: ",Object(o.jsx)("input",{value:c,onChange:t}),"number: ",Object(o.jsx)("input",{value:a,onChange:r})]}),Object(o.jsx)("div",{children:Object(o.jsx)("button",{type:"submit",children:"add"})})]})},l=function(e){var n=e.deleteReq;return Object(o.jsx)("button",{onClick:n,children:" Delete "})},s=t(3),b=t.n(s),d="/api/persons",h=function(){return b.a.get(d).then((function(e){return e.data}))},j=function(e){return b.a.post(d,e).then((function(e){return e.data}))},f=function(e){return b.a.delete("".concat(d,"/").concat(e)).then((function(e){return e.data}))},m=function(e){var n=e.person,t=e.afterDelete,r=e.handleError;return Object(o.jsxs)("h3",{children:[" ",n.name," : ",n.number," ",Object(o.jsx)(l,{deleteReq:function(){return function(e){if(window.confirm("Delete ".concat(n.name," ? ")))return f(e).then((function(){t(n.id)})).catch((function(c){r("".concat(n.name," was not found")),t(e)}))}(n.id)}})," "]})},O=function(e){var n=e.persons,t=e.handleDelete,r=e.handleError;return n.map((function(e){return Object(o.jsx)(m,{person:e,afterDelete:t,handleError:r},e.name)}))},p=function(e){var n=e.message;return n?Object(o.jsx)("div",{className:"error",children:n}):null},x=function(){var e=Object(u.useState)([{name:"Arto Hellas",number:"123123112"}]),n=Object(a.a)(e,2),t=n[0],r=n[1],c=Object(u.useState)(""),l=Object(a.a)(c,2),s=l[0],b=l[1],d=Object(u.useState)(""),f=Object(a.a)(d,2),m=f[0],x=f[1],v=Object(u.useState)(null),g=Object(a.a)(v,2),w=g[0],N=g[1];Object(u.useEffect)((function(){h().then((function(e){return r(e)}))}),[]);var C=function(e){return!(t.filter((function(n){return n.name===e})).length>0)||(window.alert("".concat(s," already in phonebook")),!1)};return Object(o.jsxs)("div",{children:[Object(o.jsx)("h2",{children:"Phonebook"}),Object(o.jsx)(p,{message:w}),Object(o.jsx)(i,{handleSubmit:function(e){(e.preventDefault(),C(s))&&j({name:s,number:m}).then((function(e){r(t.concat(e)),b(""),x("")}))},handleNameChange:function(e){b(e.target.value)},handleNumberChange:function(e){x(e.target.value)},newName:s,newNumber:m}),Object(o.jsx)("h2",{children:"Numbers"}),Object(o.jsx)(O,{persons:t,handleDelete:function(e){return r(t.filter((function(n){return n.id!==e})))},handleError:function(e){console.log("errorhandled",e),N(e),setTimeout((function(){return N(null)}),5e3)}})]})};t(38);c.a.render(Object(o.jsx)(x,{}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.ca1d5c66.chunk.js.map
(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{514:function(e,a,t){e.exports=t(969)},519:function(e,a,t){},969:function(e,a,t){"use strict";t.r(a);var r=t(0),n=t.n(r),c=t(41),l=t.n(c),o=(t(519),t(1005)),s=t(1004),m=t(487),i=t.n(m),u=t(485),d=t.n(u),E=t(486),b=t.n(E),g=t(488),p=t.n(g),f=t(249),h=t.n(f),v=t(489),w=t(74),y=t(14),O="http://18.194.127.99:3001",j=function(e,a,t){var r="",n=localStorage.getItem("token"),c={headers:new Headers({Accept:"application/json","Content-Type":"application/json",Authorization:n})};switch(e){case y.d:var l=t.pagination,o=l.page,s=l.perPage,m=t.sort,i=m.field,u=m.order,d={page:o,limit:s,query:t.filter.query,order:u,sortField:i};console.log(t),r="".concat(O,"/").concat(a,"?").concat(Object(w.stringify)(d));break;case y.e:console.log("many"),console.log(t),r="".concat(O,"/").concat(a);break;case y.f:console.log("refre"),console.log(t),r="parentId"==t.target?"".concat(O,"/").concat(a,"?parentId=").concat(t.id):"".concat(O,"/").concat(a,"?postId=").concat(t.id);break;case y.g:r="".concat(O,"/").concat(a,"/getOne/").concat(t.id);break;case y.a:if("posts"==a){var E=t.data,b=E.title,g=E.body,p=E.files,f=E.categories,h=E.tags,j=new FormData;if(j.append("title",b),j.append("body",g),f)for(var k=0;k<f.length;k++)j.append("categories",f[k]);if(h)for(var P=0;P<h.length;P++)j.append("tags",h[P]);if(p)for(var I=0;I<p.length;I++)j.append("files",p[I].rawFile);r="".concat(O,"/").concat(a,"/new"),c.headers.delete("Content-Type"),c.method="POST",c.body=j}else r="".concat(O,"/").concat(a,"/new"),c.method="POST",c.body=JSON.stringify(t.data);break;case y.h:r="".concat(O,"/").concat(a,"/update/").concat(t.id),"users"===a&&(r="".concat(O,"/").concat(a,"/promote/").concat(t.id)),c.method="PUT",c.body=JSON.stringify(t.data);break;case y.b:r="".concat(O,"/").concat(a,"/delete/").concat(t.id),c.method="DELETE";break;default:throw new Error("Unsupported Data Provider request type ".concat(e))}return fetch(r,c).then(function(e){return e.json()}).then(function(a){switch(e){case y.d:case y.f:return console.log(a),{data:a.data,total:a.count};case y.a:return console.log(a),{data:Object(v.a)({},t.data,{id:a.data.id})};case y.g:case y.h:case y.b:return console.log(a),{data:a.data};default:return{data:a.data}}})},k=t(219),P=function(e,a){if(e===k.d){var t=a.username,r=a.password,n=new Request("".concat("http://18.194.127.99:3001","/auth/login/admin"),{method:"POST",body:JSON.stringify({email:t,password:r}),headers:new Headers({"Content-Type":"application/json"})});return fetch(n).then(function(e){if(e.status<200||e.status>=300)throw new Error(e.statusText);return e.json()}).then(function(e){var a=e.data,t=e.token;localStorage.setItem("token",t),localStorage.setItem("role",a.role)})}if(e===k.e)return localStorage.removeItem("token"),localStorage.removeItem("role"),Promise.resolve();if(e===k.a)return localStorage.getItem("token")?Promise.resolve():Promise.reject();if(e===k.c){var c=localStorage.getItem("role");return c?Promise.resolve(c):Promise.reject()}return e===k.b?(localStorage.removeItem("token"),Promise.reject()):void 0},I=t(1006),A=t(1007),C=t(986),T=t(987),S=t(988),N=t(1014),q=t(990),J=t(983),F=t(1009),H=t(993),x=t(1008),z=t(984),D=function(e){return n.a.createElement(x.a,e,n.a.createElement(J.a,{label:"Search",source:"query",alwaysOn:!0}),n.a.createElement(z.a,{optionText:"name"}))},R=function(e){return n.a.createElement(I.a,Object.assign({filters:n.a.createElement(D,null)},e),n.a.createElement(A.a,{rowClick:"edit"},n.a.createElement(C.a,{source:"id"}),n.a.createElement(C.a,{source:"name"}),n.a.createElement(T.a,{source:"createdAt"}),n.a.createElement(T.a,{source:"updatedAt"}),n.a.createElement(S.a,{basePath:"/categories"})))},U=function(e){var a=e.record;return n.a.createElement("span",null,"Category ",a?'"'.concat(a.name,'"'):"")},B=function(e){return n.a.createElement(N.a,Object.assign({title:"Create a Category"},e),n.a.createElement(q.a,null,n.a.createElement(J.a,{source:"name"})))},W=function(e){return n.a.createElement(F.a,Object.assign({title:n.a.createElement(U,null)},e),n.a.createElement(q.a,null,n.a.createElement(H.a,{source:"id"}),n.a.createElement(J.a,{source:"name"})))},L=function(e){return n.a.createElement(I.a,Object.assign({filters:n.a.createElement(D,null)},e),n.a.createElement(A.a,{rowClick:"edit"},n.a.createElement(C.a,{source:"id"}),n.a.createElement(C.a,{source:"name"}),n.a.createElement(T.a,{source:"createdAt"}),n.a.createElement(T.a,{source:"updatedAt"}),n.a.createElement(S.a,{basePath:"/hashTags"})))},V=function(e){var a=e.record;return n.a.createElement("span",null,"HashTag ",a?'"'.concat(a.name,'"'):"")},$=function(e){return n.a.createElement(N.a,Object.assign({title:"Create a HashTag"},e),n.a.createElement(q.a,null,n.a.createElement(J.a,{source:"name"})))},G=function(e){return n.a.createElement(F.a,Object.assign({title:n.a.createElement(V,null)},e),n.a.createElement(q.a,null,n.a.createElement(H.a,{source:"id"}),n.a.createElement(J.a,{source:"name"})))},K=t(994),M=function(e){return n.a.createElement(I.a,Object.assign({filters:n.a.createElement(D,null)},e),n.a.createElement(A.a,{rowClick:"edit"},n.a.createElement(C.a,{source:"id"}),n.a.createElement(C.a,{source:"fullName"}),n.a.createElement(K.a,{source:"email"}),n.a.createElement(C.a,{source:"number"}),n.a.createElement(C.a,{source:"role"}),n.a.createElement(T.a,{source:"createdAt"}),n.a.createElement(T.a,{source:"updatedAt"}),n.a.createElement(S.a,{basePath:"/users"})))},Q=function(e){var a=e.record;return n.a.createElement("span",null,"User ",a?'"'.concat(a.fullName,'"'):"")},X=function(e){return n.a.createElement(F.a,Object.assign({title:n.a.createElement(Q,null)},e),n.a.createElement(q.a,null,n.a.createElement(H.a,{source:"id"}),n.a.createElement(H.a,{source:"fullName"}),n.a.createElement(H.a,{source:"email"}),n.a.createElement(H.a,{source:"number"}),n.a.createElement(z.a,{source:"role",choices:[{id:"admin",name:"admin"},{id:"maintainer",name:"maintainer"},{id:"user",name:"user"}]})))},Y=t(241),Z=t.n(Y),_=t(163),ee=t(42),ae=t(995),te=t(1012),re=t(996),ne=t(1010),ce=t(998),le=t(999),oe=t(1015),se=t(1e3),me=t(1001),ie=t(1002),ue=t(1003),de=t(1016),Ee=t(1013),be=t(328),ge=function(e){var a=e.record;return n.a.createElement(ee.a,{component:_.a,to:"/comments/create?postId=".concat(a.id),label:"Add a comment"},n.a.createElement(Z.a,null))},pe=function(e){return n.a.createElement(I.a,Object.assign({filters:n.a.createElement(D,null)},e),n.a.createElement(A.a,{rowClick:"edit"},n.a.createElement(C.a,{source:"id"}),n.a.createElement(C.a,{source:"title",sortable:!1}),n.a.createElement(C.a,{source:"reactionsCount",sortable:!1}),n.a.createElement(T.a,{source:"createdAt",sortable:!1}),n.a.createElement(T.a,{source:"updatedAt",sortable:!1}),n.a.createElement(S.a,{basePath:"/posts"})))},fe=function(e){var a=e.record;return n.a.createElement("span",null,"Post ",a?'"'.concat(a.title,'"'):"")},he=function(e){return n.a.createElement(N.a,Object.assign({title:"Create a Post"},e),n.a.createElement(q.a,null,n.a.createElement(J.a,{source:"title",validate:Object(ae.a)()}),n.a.createElement(be.a,{source:"body",toolbar:[[{size:["small",!1,"large","huge"]}],[{font:[]}],[{direction:"rtl"}],[{align:[]}],["bold","italic","underline","link","blockquote","video"]]}),n.a.createElement(te.a,{source:"files",label:"Related pictures , First One is background image",accept:"image/*",multiple:!0},n.a.createElement(re.a,{source:"src",title:"title"})),n.a.createElement(ne.a,{label:"categories",reference:"categories",source:"categories",perPage:100,validate:Object(ae.a)()},n.a.createElement(ce.a,null,n.a.createElement(le.a,{source:"name"}))),n.a.createElement(ne.a,{label:"tags",reference:"hashTags",source:"tags",perPage:100,validate:Object(ae.a)()},n.a.createElement(ce.a,null,n.a.createElement(le.a,{source:"name"})))))},ve=function(e){return n.a.createElement(F.a,Object.assign({title:n.a.createElement(fe,null)},e),n.a.createElement(oe.a,null,n.a.createElement(se.a,{label:"summary"},n.a.createElement(H.a,{source:"id"}),n.a.createElement(H.a,{source:"title"}),n.a.createElement(H.a,{source:"reactionsCount"}),n.a.createElement(me.a,{source:"body"}),n.a.createElement(re.a,{source:"backgroundImage",title:"backgroundImage"}),n.a.createElement(ie.a,{source:"categories"},n.a.createElement(ue.a,null,n.a.createElement(le.a,{source:"name"}))),n.a.createElement(ie.a,{source:"tags"},n.a.createElement(ue.a,null,n.a.createElement(le.a,{source:"name"})))),n.a.createElement(se.a,{label:"update"},n.a.createElement(J.a,{source:"title"}),n.a.createElement(be.a,{source:"body",toolbar:[[{size:["small",!1,"large","huge"]}],[{font:[]}],[{direction:"rtl"}],[{align:[]}],["bold","italic","underline","link","blockquote","video"]]}),n.a.createElement(ne.a,{label:"categories",reference:"categories",source:"categories",perPage:100,validate:Object(ae.a)()},n.a.createElement(ce.a,{source:"name"},n.a.createElement(le.a,{source:"name"}))),n.a.createElement(ne.a,{label:"tags",reference:"hashTags",source:"tags",perPage:100,validate:Object(ae.a)()},n.a.createElement(ce.a,null,n.a.createElement(le.a,{source:"name"})))),n.a.createElement(se.a,{label:"Comments"},n.a.createElement(de.a,{label:"Comments",reference:"comments",target:"post.id"},n.a.createElement(A.a,{rowClick:"edit"},n.a.createElement(C.a,{source:"id"}),n.a.createElement(C.a,{source:"body",sortable:!1}),n.a.createElement(Ee.a,{label:"Author Name",source:"user.id",reference:"users",sortable:!1},n.a.createElement(le.a,{source:"fullName"})),n.a.createElement(Ee.a,{label:"Author Email",source:"user.id",reference:"users",sortable:!1},n.a.createElement(le.a,{source:"email"})),n.a.createElement(Ee.a,{label:"Post",source:"post.id",reference:"posts",sortable:!1},n.a.createElement(le.a,{source:"id"})),n.a.createElement(C.a,{source:"reports",sortable:!1}),n.a.createElement(T.a,{source:"createdAt",sortable:!1}),n.a.createElement(T.a,{source:"updatedAt",sortable:!1}),n.a.createElement(S.a,{basePath:"/comments"}))),n.a.createElement(ge,null))))},we=function(e){var a=e.record;return n.a.createElement(ee.a,{component:_.a,to:"/comments/create?parentId=".concat(a.id,"&postId=").concat(a.post.id),label:"Add a Reply"},n.a.createElement(Z.a,null))},ye=function(e){return n.a.createElement(I.a,Object.assign({filters:n.a.createElement(D,null)},e),n.a.createElement(A.a,{rowClick:"edit"},n.a.createElement(C.a,{source:"id"}),n.a.createElement(C.a,{source:"body",sortable:!1}),n.a.createElement(Ee.a,{label:"Post",source:"post.id",reference:"posts",sortable:!1},n.a.createElement(le.a,{source:"id"})),n.a.createElement(C.a,{source:"reports",sortable:!1}),n.a.createElement(T.a,{source:"createdAt",sortable:!1}),n.a.createElement(T.a,{source:"updatedAt",sortable:!1})))},Oe=function(e){var a=e.record;return n.a.createElement("span",null,"Comment ",a?'"'.concat(a.body,'"'):"")},je=function(e){var a=Object(w.parse)(e.location.search).postId,t=Object(w.parse)(e.location.search).parentId||null;return n.a.createElement(N.a,Object.assign({title:"Create a Comment"},e),n.a.createElement(q.a,{defaultValue:{postId:a,parentId:t},redirect:"/posts/".concat(a,"/2")},n.a.createElement(H.a,{source:"postId"}),n.a.createElement(H.a,{source:"parentId"}),n.a.createElement(J.a,{source:"body"})))},ke=function(e){return n.a.createElement(F.a,Object.assign({title:n.a.createElement(Oe,null)},e),n.a.createElement(oe.a,null,n.a.createElement(se.a,{label:"summary"},n.a.createElement(H.a,{source:"id"}),n.a.createElement(H.a,{source:"body"})),n.a.createElement(se.a,{label:"replies"},n.a.createElement(de.a,{label:"replies",reference:"comments",target:"parentId"},n.a.createElement(A.a,{rowClick:"edit"},n.a.createElement(C.a,{source:"id"}),n.a.createElement(C.a,{source:"body",sortable:!1}),n.a.createElement(Ee.a,{label:"Author Name",source:"user.id",reference:"users",sortable:!1},n.a.createElement(le.a,{source:"fullName"})),n.a.createElement(Ee.a,{label:"Author Email",source:"user.id",reference:"users",sortable:!1},n.a.createElement(le.a,{source:"email"})),n.a.createElement(Ee.a,{label:"Post",source:"post.id",reference:"posts",sortable:!1},n.a.createElement(le.a,{source:"id"})),n.a.createElement(C.a,{source:"reports",sortable:!1}),n.a.createElement(T.a,{source:"createdAt",sortable:!1}),n.a.createElement(T.a,{source:"updatedAt",sortable:!1}),n.a.createElement(S.a,{basePath:"/comments"}))),n.a.createElement(we,null))))},Pe=function(){return n.a.createElement(o.a,{authProvider:P,dataProvider:j},function(e){return["admin"===e?n.a.createElement(s.a,{name:"users",list:M,edit:X,icon:d.a}):null,n.a.createElement(s.a,{name:"categories",list:R,create:B,edit:W}),n.a.createElement(s.a,{name:"hashTags",list:L,create:$,edit:G,icon:b.a}),n.a.createElement(s.a,{name:"posts",list:pe,create:he,edit:ve,icon:i.a}),n.a.createElement(s.a,{name:"comments",list:ye,create:je,edit:ke,icon:p.a}),n.a.createElement(s.a,{name:"reports",icon:h.a})]})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(n.a.createElement(Pe,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[514,1,2]]]);
//# sourceMappingURL=main.ddeb56ed.chunk.js.map
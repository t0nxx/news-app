(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{1009:function(e,a,t){"use strict";t.r(a);var r=t(0),c=t.n(r),n=t(40),l=t.n(n),o=(t(540),t(1044)),s=t(1043),i=t(505),u=t.n(i),m=t(503),d=t.n(m),E=t(504),b=t.n(E),p=t(506),g=t.n(p),f=t(507),h=t.n(f),j=t(508),O=t.n(j),v=t(509),w=t.n(v),y=t(510),k=t(79),C=t(14),T="https://api.hakaya.news",P=function(e,a,t){var r="",c=localStorage.getItem("token"),n={headers:new Headers({Accept:"application/json","Content-Type":"application/json",Authorization:c})};switch(e){case C.d:var l=t.pagination,o=l.page,s=l.perPage,i=t.sort,u=i.field,m=i.order,d={page:o,limit:s,query:t.filter.query,order:m,sortField:u};r="".concat(T,"/").concat(a,"?").concat(Object(k.stringify)(d));break;case C.e:r="".concat(T,"/").concat(a);break;case C.f:r="parentId"==t.target?"".concat(T,"/").concat(a,"?parentId=").concat(t.id):"".concat(T,"/").concat(a,"?postId=").concat(t.id);break;case C.g:r="".concat(T,"/").concat(a,"/getOne/").concat(t.id);break;case C.a:switch(a){case"posts":var E=t.data,b=E.title,p=E.body,g=E.files,f=E.categories,h=E.tags,j=E.source,O=new FormData;if(O.append("title",b),O.append("body",p),O.append("source",j),f)for(var v=0;v<f.length;v++)O.append("categories",f[v]);if(h)for(var w=0;w<h.length;w++)O.append("tags",h[w]);g&&O.append("files",g.rawFile),r="".concat(T,"/").concat(a,"/new"),n.headers.delete("Content-Type"),n.method="POST",n.body=O;break;case"uploads":var P=t.data.files,A=new FormData;P&&A.append("files",P.rawFile),r="".concat(T,"/").concat(a,"/new"),n.headers.delete("Content-Type"),n.method="POST",n.body=A;break;case"categories":case"sources":var I=t.data,S=I.name,F=I.files,B=new FormData;B.append("name",S),F&&B.append("files",F.rawFile),r="".concat(T,"/").concat(a,"/new"),n.headers.delete("Content-Type"),n.method="POST",n.body=B;break;default:r="".concat(T,"/").concat(a,"/new"),n.method="POST",n.body=JSON.stringify(t.data)}break;case C.h:if("posts"===a){var N=t.data,D=N.title,x=N.body,U=N.files,q=N.categories,z=N.tags,H=N.source,J=new FormData;if(J.append("title",D),J.append("body",x),J.append("source",H),q)for(var L=0;L<q.length;L++)J.append("categories",q[L]);if(z)for(var R=0;R<z.length;R++)J.append("tags",z[R]);U&&J.append("files",U.rawFile),r="".concat(T,"/").concat(a,"/update/").concat(t.id),n.headers.delete("Content-Type"),n.method="PUT",n.body=J}else if("categories"===a||"sources"===a){var M=t.data,W=M.name,G=M.files,V=new FormData;V.append("name",W),G&&V.append("files",G.rawFile),r="".concat(T,"/").concat(a,"/update/").concat(t.id),n.headers.delete("Content-Type"),n.method="PUT",n.body=V}else r="".concat(T,"/").concat(a,"/update/").concat(t.id),"users"===a&&(r="".concat(T,"/").concat(a,"/promote/").concat(t.id)),n.method="PUT",n.body=JSON.stringify(t.data);break;case C.b:r="".concat(T,"/").concat(a,"/delete/").concat(t.id),n.method="DELETE";break;default:throw new Error("Unsupported Data Provider request type ".concat(e))}return fetch(r,n).then(function(e){return e.json()}).then(function(a){switch(e){case C.d:case C.f:return{data:a.data,total:a.count};case C.a:return{data:Object(y.a)({},t.data,{id:a.data.id})};case C.g:case C.h:return{data:a.data};case C.b:return a;default:return{data:a.data}}})},A=t(224),I=function(e,a){if(e===A.d){var t=a.username,r=a.password,c=new Request("".concat("https://api.hakaya.news","/auth/login/admin"),{method:"POST",body:JSON.stringify({email:t,password:r}),headers:new Headers({"Content-Type":"application/json"})});return fetch(c).then(function(e){if(e.status<200||e.status>=300)throw new Error("invalid email / password");return e.json()}).then(function(e){var a=e.data,t=e.token;localStorage.setItem("token",t),localStorage.setItem("role",a.role)})}if(e===A.e)return localStorage.removeItem("token"),localStorage.removeItem("role"),Promise.resolve();if(e===A.a)return localStorage.getItem("token")?Promise.resolve():Promise.reject();if(e===A.c){var n=localStorage.getItem("role");return n?Promise.resolve(n):Promise.reject()}return e===A.b?(localStorage.removeItem("token"),Promise.reject()):void 0},S=t(1045),F=t(1046),B=t(1027),N=t(1028),D=t(1029),x=t(1053),U=t(1031),q=t(1025),z=t(1032),H=t(1033),J=t(1034),L=t(1048),R=t(1037),M=t(1047),W=t(1026),G=function(e){return c.a.createElement(M.a,e,c.a.createElement(q.a,{label:"Search",source:"query",alwaysOn:!0}),c.a.createElement(W.a,{optionText:"name"}))},V=function(e){return c.a.createElement(S.a,Object.assign({filters:c.a.createElement(G,null)},e),c.a.createElement(F.a,{rowClick:"edit"},c.a.createElement(B.a,{source:"id"}),c.a.createElement(B.a,{source:"name"}),c.a.createElement(N.a,{source:"createdAt"}),c.a.createElement(N.a,{source:"updatedAt"}),c.a.createElement(D.a,{basePath:"/categories"})))},$=function(e){var a=e.record;return c.a.createElement("span",null,"Category ",a?'"'.concat(a.name,'"'):"")},K=function(e){return c.a.createElement(x.a,Object.assign({title:"Create a Category"},e),c.a.createElement(U.a,null,c.a.createElement(q.a,{source:"name",validate:Object(z.a)()}),c.a.createElement(H.a,{source:"files",label:"Background image",accept:"image/*",validate:Object(z.a)()},c.a.createElement(J.a,{source:"src",title:"title"}))))},Q=function(e){return c.a.createElement(L.a,Object.assign({title:c.a.createElement($,null)},e),c.a.createElement(U.a,null,c.a.createElement(R.a,{source:"id"}),c.a.createElement(q.a,{source:"name"}),c.a.createElement(J.a,{source:"backgroundImage",title:"backgroundImage"}),c.a.createElement(H.a,{source:"files",label:"Background image",accept:"image/*",validate:Object(z.a)()},c.a.createElement(J.a,{source:"src",title:"title"}))))},X=function(e){return c.a.createElement(S.a,Object.assign({filters:c.a.createElement(G,null)},e),c.a.createElement(F.a,{rowClick:"edit"},c.a.createElement(B.a,{source:"id"}),c.a.createElement(B.a,{source:"name"}),c.a.createElement(N.a,{source:"createdAt"}),c.a.createElement(N.a,{source:"updatedAt"}),c.a.createElement(D.a,{basePath:"/hashTags"})))},Y=function(e){var a=e.record;return c.a.createElement("span",null,"HashTag ",a?'"'.concat(a.name,'"'):"")},Z=function(e){return c.a.createElement(x.a,Object.assign({title:"Create a HashTag"},e),c.a.createElement(U.a,null,c.a.createElement(q.a,{source:"name",validate:Object(z.a)()})))},_=function(e){return c.a.createElement(L.a,Object.assign({title:c.a.createElement(Y,null)},e),c.a.createElement(U.a,null,c.a.createElement(R.a,{source:"id"}),c.a.createElement(q.a,{source:"name"})))},ee=t(1038),ae=function(e){return c.a.createElement(S.a,Object.assign({filters:c.a.createElement(G,null)},e),c.a.createElement(F.a,{rowClick:"edit"},c.a.createElement(B.a,{source:"id"}),c.a.createElement(B.a,{source:"fullName"}),c.a.createElement(ee.a,{source:"email"}),c.a.createElement(B.a,{source:"number"}),c.a.createElement(B.a,{source:"role"}),c.a.createElement(N.a,{source:"createdAt"}),c.a.createElement(N.a,{source:"updatedAt"}),c.a.createElement(D.a,{basePath:"/users"})))},te=function(e){var a=e.record;return c.a.createElement("span",null,"User ",a?'"'.concat(a.fullName,'"'):"")},re=function(e){return c.a.createElement(L.a,Object.assign({title:c.a.createElement(te,null)},e),c.a.createElement(U.a,null,c.a.createElement(R.a,{source:"id"}),c.a.createElement(R.a,{source:"fullName"}),c.a.createElement(R.a,{source:"email"}),c.a.createElement(R.a,{source:"number"}),c.a.createElement(W.a,{source:"role",choices:[{id:"admin",name:"admin"},{id:"maintainer",name:"maintainer"},{id:"user",name:"user"}]})))},ce=t(245),ne=t.n(ce),le=t(188),oe=t(42),se=t(1051),ie=t(1039),ue=t(1040),me=t(1052),de=t(1056),Ee=t(1054),be=t(1041),pe=t(1055),ge=t(1050),fe=t(337),he=function(e){var a=e.record;return c.a.createElement(oe.a,{component:le.a,to:"/comments/create?postId=".concat(a.id),label:"Add a comment"},c.a.createElement(ne.a,null))},je=function(e){return c.a.createElement(S.a,Object.assign({filters:c.a.createElement(G,null)},e),c.a.createElement(F.a,{rowClick:"edit"},c.a.createElement(B.a,{source:"id"}),c.a.createElement(B.a,{source:"title",sortable:!1}),c.a.createElement(B.a,{source:"reactionsCount"}),c.a.createElement(N.a,{source:"createdAt",sortable:!1}),c.a.createElement(N.a,{source:"updatedAt",sortable:!1}),c.a.createElement(D.a,{basePath:"/posts"})))},Oe=function(e){var a=e.record;return c.a.createElement("span",null,"Post ",a?'"'.concat(a.title,'"'):"")},ve=function(e){return c.a.createElement(x.a,Object.assign({title:"Create a Post"},e),c.a.createElement(U.a,null,c.a.createElement(q.a,{source:"title",validate:Object(z.a)()}),c.a.createElement(fe.a,{source:"body",toolbar:[[{size:["small",!1,"large","huge"]}],[{font:[]}],[{direction:"rtl"}],[{align:[]}],["bold","italic","underline","link","blockquote","image","video"]]}),c.a.createElement(H.a,{source:"files",label:"Background image",accept:"image/*",validate:Object(z.a)()},c.a.createElement(J.a,{source:"src",title:"title"})),c.a.createElement(se.a,{label:"categories",reference:"categories",source:"categories",perPage:100,validate:Object(z.a)()},c.a.createElement(ie.a,null,c.a.createElement(ue.a,{source:"name"}))),c.a.createElement(se.a,{label:"tags",reference:"hashTags",source:"tags",perPage:1e3,validate:Object(z.a)()},c.a.createElement(me.a,null)),c.a.createElement(de.a,{label:"source",source:"source",reference:"sources",validate:Object(z.a)()},c.a.createElement(W.a,{optionText:"name"}))))},we=function(e){return c.a.createElement(L.a,Object.assign({title:c.a.createElement(Oe,null)},e),c.a.createElement(Ee.a,null,c.a.createElement(be.a,{label:"update"},c.a.createElement(R.a,{source:"id"}),c.a.createElement(R.a,{source:"reactionsCount"}),c.a.createElement(q.a,{source:"title"}),c.a.createElement(fe.a,{source:"body",toolbar:[[{size:["small",!1,"large","huge"]}],[{font:[]}],[{direction:"rtl"}],[{align:[]}],["bold","italic","underline","link","blockquote","image","video"]]}),c.a.createElement(se.a,{label:"categories",reference:"categories",source:"categories",perPage:100,validate:Object(z.a)()},c.a.createElement(ie.a,{source:"name"},c.a.createElement(ue.a,{source:"name"}))),c.a.createElement(se.a,{label:"tags",reference:"hashTags",source:"tags",perPage:1e3,validate:Object(z.a)()},c.a.createElement(me.a,null)),c.a.createElement(de.a,{label:"source",source:"source.id",reference:"sources"},c.a.createElement(W.a,{optionText:"name"})),c.a.createElement(J.a,{source:"backgroundImage",title:"backgroundImage"}),c.a.createElement(H.a,{source:"files",label:"Background image",accept:"image/*"},c.a.createElement(J.a,{source:"src",title:"title"}))),c.a.createElement(be.a,{label:"Comments"},c.a.createElement(pe.a,{label:"Comments",reference:"comments",target:"post.id"},c.a.createElement(F.a,{rowClick:"edit"},c.a.createElement(B.a,{source:"id"}),c.a.createElement(B.a,{source:"body",sortable:!1}),c.a.createElement(ge.a,{label:"Author Name",source:"user.id",reference:"users",sortable:!1},c.a.createElement(ue.a,{source:"fullName"})),c.a.createElement(ge.a,{label:"Author Email",source:"user.id",reference:"users",sortable:!1},c.a.createElement(ue.a,{source:"email"})),c.a.createElement(ge.a,{label:"Post",source:"post.id",reference:"posts",sortable:!1},c.a.createElement(ue.a,{source:"id"})),c.a.createElement(B.a,{source:"reports",sortable:!1}),c.a.createElement(N.a,{source:"createdAt",sortable:!1}),c.a.createElement(N.a,{source:"updatedAt",sortable:!1}),c.a.createElement(D.a,{basePath:"/comments"}))),c.a.createElement(he,null))))},ye=function(e){var a=e.record;return c.a.createElement(oe.a,{component:le.a,to:"/comments/create?parentId=".concat(a.id,"&postId=").concat(a.post.id),label:"Add a Reply"},c.a.createElement(ne.a,null))},ke=function(e){return c.a.createElement(S.a,Object.assign({filters:c.a.createElement(G,null)},e),c.a.createElement(F.a,{rowClick:"edit"},c.a.createElement(B.a,{source:"id"}),c.a.createElement(B.a,{source:"body",sortable:!1}),c.a.createElement(ge.a,{label:"Post",source:"post.id",reference:"posts",sortable:!1},c.a.createElement(ue.a,{source:"id"})),c.a.createElement(B.a,{source:"reports"}),c.a.createElement(N.a,{source:"createdAt",sortable:!1}),c.a.createElement(N.a,{source:"updatedAt",sortable:!1})))},Ce=function(e){var a=e.record;return c.a.createElement("span",null,"Comment ",a?'"'.concat(a.body,'"'):"")},Te=function(e){var a=Object(k.parse)(e.location.search).postId,t=Object(k.parse)(e.location.search).parentId||null;return c.a.createElement(x.a,Object.assign({title:"Create a Comment"},e),c.a.createElement(U.a,{defaultValue:{postId:a,parentId:t},redirect:"/posts/".concat(a,"/2")},c.a.createElement(R.a,{source:"postId"}),c.a.createElement(R.a,{source:"parentId"}),c.a.createElement(q.a,{source:"body"})))},Pe=function(e){return c.a.createElement(L.a,Object.assign({title:c.a.createElement(Ce,null)},e),c.a.createElement(Ee.a,null,c.a.createElement(be.a,{label:"summary"},c.a.createElement(R.a,{source:"id"}),c.a.createElement(R.a,{source:"body"})),c.a.createElement(be.a,{label:"replies"},c.a.createElement(pe.a,{label:"replies",reference:"comments",target:"parentId"},c.a.createElement(F.a,{rowClick:"edit"},c.a.createElement(B.a,{source:"id"}),c.a.createElement(B.a,{source:"body",sortable:!1}),c.a.createElement(ge.a,{label:"Author Name",source:"user.id",reference:"users",sortable:!1},c.a.createElement(ue.a,{source:"fullName"})),c.a.createElement(ge.a,{label:"Author Email",source:"user.id",reference:"users",sortable:!1},c.a.createElement(ue.a,{source:"email"})),c.a.createElement(ge.a,{label:"Post",source:"post.id",reference:"posts",sortable:!1},c.a.createElement(ue.a,{source:"id"})),c.a.createElement(B.a,{source:"reports",sortable:!1}),c.a.createElement(N.a,{source:"createdAt",sortable:!1}),c.a.createElement(N.a,{source:"updatedAt",sortable:!1}),c.a.createElement(D.a,{basePath:"/comments"}))),c.a.createElement(ye,null))))},Ae=function(e){return c.a.createElement(S.a,Object.assign({filters:c.a.createElement(G,null)},e),c.a.createElement(F.a,{rowClick:"edit"},c.a.createElement(B.a,{source:"id"}),c.a.createElement(B.a,{source:"name"}),c.a.createElement(N.a,{source:"createdAt"}),c.a.createElement(N.a,{source:"updatedAt"}),c.a.createElement(D.a,{basePath:"/sources"})))},Ie=function(e){var a=e.record;return c.a.createElement("span",null,"Source ",a?'"'.concat(a.name,'"'):"")},Se=function(e){return c.a.createElement(x.a,Object.assign({title:"Create a Source"},e),c.a.createElement(U.a,null,c.a.createElement(q.a,{source:"name",validate:Object(z.a)()}),c.a.createElement(H.a,{source:"files",label:"Background image",accept:"image/*",validate:Object(z.a)()},c.a.createElement(J.a,{source:"src",title:"title"}))))},Fe=function(e){return c.a.createElement(L.a,Object.assign({title:c.a.createElement(Ie,null)},e),c.a.createElement(U.a,null,c.a.createElement(R.a,{source:"id"}),c.a.createElement(q.a,{source:"name"}),c.a.createElement(J.a,{source:"backgroundImage",title:"backgroundImage"}),c.a.createElement(H.a,{source:"files",label:"Background image",accept:"image/*",validate:Object(z.a)()},c.a.createElement(J.a,{source:"src",title:"title"}))))},Be=t(1042),Ne=t(338),De=function(e){return c.a.createElement(S.a,Object.assign({filters:c.a.createElement(G,null)},e),c.a.createElement(F.a,{rowClick:"edit"},c.a.createElement(B.a,{source:"id"}),c.a.createElement(Be.a,{source:"url"}),c.a.createElement(N.a,{source:"createdAt"}),c.a.createElement(N.a,{source:"updatedAt"}),c.a.createElement(D.a,{basePath:"/uploads"})))},xe=function(e){var a=e.record;return c.a.createElement("span",null,"Uploader ",a?'"'.concat(a.url,'"'):"")},Ue=function(e){return c.a.createElement(x.a,Object.assign({title:"Create a Uploader"},e),c.a.createElement(U.a,null,c.a.createElement(Ne.b,{source:"files",label:"upload video",accept:"video/*",validate:Object(z.a)()},c.a.createElement(Be.a,{source:"src"}))))},qe=function(e){return c.a.createElement(L.a,Object.assign({title:c.a.createElement(xe,null)},e),c.a.createElement(U.a,null,c.a.createElement(R.a,{source:"id"}),c.a.createElement(q.a,{source:"url"})))},ze=function(e){return c.a.createElement(S.a,Object.assign({filters:c.a.createElement(G,null)},e),c.a.createElement(F.a,null,c.a.createElement(B.a,{source:"id"}),c.a.createElement(B.a,{source:"title",sortable:!1}),c.a.createElement(B.a,{source:"body",sortable:!1}),c.a.createElement(N.a,{source:"createdAt",sortable:!1}),c.a.createElement(N.a,{source:"updatedAt",sortable:!1})))},He=function(e){return c.a.createElement(x.a,Object.assign({title:"Create a Notification"},e),c.a.createElement(U.a,null,c.a.createElement(q.a,{source:"title",validate:Object(z.a)()}),c.a.createElement(q.a,{source:"body",validate:Object(z.a)()}),c.a.createElement(se.a,{label:"categories",reference:"categories",source:"categories",perPage:100,validate:Object(z.a)()},c.a.createElement(ie.a,null,c.a.createElement(ue.a,{source:"name"})))))},Je=t(68),Le=t(77),Re=t.n(Le),Me=t(84),We=t.n(Me),Ge=t(489),Ve=t.n(Ge),$e=function(e){var a=e.title,t=e.count,r=e.color,n=e.id;return c.a.createElement(Re.a,{style:{margin:20,height:200,width:300}},c.a.createElement(Ve.a,{title:a,style:{backgroundColor:r,textAlign:"center"}}),c.a.createElement(We.a,{style:{textAlign:"center",fontSize:30}},t),n?c.a.createElement(We.a,{style:{textAlign:"center"}},c.a.createElement("a",{href:"https://admin.hakaya.news/#/posts/".concat(n)}," GoTo Post")):null)},Ke=["#F06292","#BA68C8","#7986CB","#4FC3F7","#81C784","#FFD54F","#FF5722","#607D8B","#FF3D00"],Qe=function(){return Ke[Math.floor(Math.random()*Ke.length)]},Xe=function(){var e=Object(r.useState)(0),a=Object(Je.a)(e,2),t=a[0],n=a[1],l=Object(r.useState)(0),o=Object(Je.a)(l,2),s=o[0],i=o[1],u=Object(r.useState)(0),m=Object(Je.a)(u,2),d=m[0],E=m[1],b=Object(r.useState)(0),p=Object(Je.a)(b,2),g=p[0],f=p[1],h=Object(r.useState)(0),j=Object(Je.a)(h,2),O=j[0],v=j[1],w=Object(r.useState)(0),y=Object(Je.a)(w,2),k=y[0],C=y[1],T=Object(r.useState)({}),P=Object(Je.a)(T,2),A=P[0],I=P[1],S=Object(r.useState)({}),F=Object(Je.a)(S,2),B=F[0],N=F[1],D=Object(r.useState)({}),x=Object(Je.a)(D,2),U=x[0],q=x[1],z=Object(r.useState)({}),H=Object(Je.a)(z,2),J=H[0],L=H[1],R={headers:{"Content-Type":"application/json",Authorization:localStorage.getItem("token")}};return Object(r.useEffect)(function(){fetch("https://api.hakaya.news/posts/statistics",R).then(function(e){return e.json()}).then(function(e){var a=e.commentsCount,t=e.usersCount,r=e.postsCount,c=e.reactionsCount,l=e.tagsCount,o=e.categoriesCount,s=e.mostLiked,u=e.mostLoved,m=e.mostAngry,d=e.mostCommented;n(a),i(t),E(r),f(c),v(l),C(o),I(s),N(u),q(m),L(d)})},[]),c.a.createElement("div",{style:{display:"flex",flexFlow:"row wrap"}},c.a.createElement($e,{title:"Total Comments ",count:t,color:Qe()}),c.a.createElement($e,{title:"Total Comments ",count:d,color:Qe()}),c.a.createElement($e,{title:"Total Reactions ",count:g,color:Qe()}),c.a.createElement($e,{title:"Total Categories ",count:k,color:Qe()}),c.a.createElement($e,{title:"Total Hash Tags ",count:O,color:Qe()}),c.a.createElement($e,{title:"Total Users ",count:s,color:Qe()}),c.a.createElement($e,{title:"Top Liked ",count:A.count,color:Qe(),id:A.postId}),c.a.createElement($e,{title:"Top Loved ",count:B.count,color:Qe(),id:B.postId}),c.a.createElement($e,{title:"Top Angry ",count:U.count,color:Qe(),id:U.postId}),c.a.createElement($e,{title:"Top Commented ",count:J.count,color:Qe(),id:J.postId}))},Ye=function(){return c.a.createElement(o.a,{dashboard:Xe,authProvider:I,dataProvider:P},function(e){return["admin"===e?c.a.createElement(s.a,{name:"users",list:ae,edit:re,icon:d.a}):null,c.a.createElement(s.a,{name:"categories",list:V,create:K,edit:Q}),c.a.createElement(s.a,{name:"hashTags",list:X,create:Z,edit:_,icon:b.a}),c.a.createElement(s.a,{name:"posts",list:je,create:ve,edit:we,icon:u.a}),c.a.createElement(s.a,{name:"comments",list:ke,create:Te,edit:Pe,icon:g.a}),c.a.createElement(s.a,{name:"sources",list:Ae,create:Se,edit:Fe,icon:h.a}),c.a.createElement(s.a,{name:"uploads",list:De,create:Ue,edit:qe,icon:O.a}),c.a.createElement(s.a,{name:"notifications",list:ze,create:He,icon:w.a})]})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(c.a.createElement(Ye,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},535:function(e,a,t){e.exports=t(1009)},540:function(e,a,t){}},[[535,1,2]]]);
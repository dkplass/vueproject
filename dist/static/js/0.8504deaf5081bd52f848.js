webpackJsonp([0],{"+Ap0":function(t,r,e){"use strict";var a={render:function(){var t=this,r=t.$createElement,e=t._self._c||r;return e("div",[e("nav",{staticClass:"bg-light mt-4",attrs:{"aria-label":"breadcrumb"}},[e("ol",{staticClass:"breadcrumb"},[t._l(t.breadcrumbList,function(r,a){return e("li",{key:a,staticClass:"breadcrumb-item",class:{active:r.link},on:{click:function(r){return t.routeTo(a)}}},[t._v(t._s(r.name))])}),t._v(" "),t.category?e("li",{staticClass:"breadcrumb-item active"},[t._v(t._s(t.category))]):t._e()],2)])])},staticRenderFns:[]};var i=e("VU/8")({name:"Breadcrumb",props:["category"],data:function(){return{breadcrumbList:[]}},methods:{updateBreadcrumbList:function(){this.breadcrumbList=this.$route.meta.breadcrumb},routeTo:function(t){this.breadcrumbList[t].link&&this.$router.push(this.breadcrumbList[t].link)}},watch:{$route:function(t,r){this.updateBreadcrumbList()}},mounted:function(){this.updateBreadcrumbList()}},a,!1,function(t){e("CEIC")},null,null);r.a=i.exports},CEIC:function(t,r){}});
//# sourceMappingURL=0.8504deaf5081bd52f848.js.map
(function(e){function t(t){for(var r,s,l=t[0],i=t[1],c=t[2],m=0,p=[];m<l.length;m++)s=l[m],Object.prototype.hasOwnProperty.call(n,s)&&n[s]&&p.push(n[s][0]),n[s]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);u&&u(t);while(p.length)p.shift()();return a.push.apply(a,c||[]),o()}function o(){for(var e,t=0;t<a.length;t++){for(var o=a[t],r=!0,l=1;l<o.length;l++){var i=o[l];0!==n[i]&&(r=!1)}r&&(a.splice(t--,1),e=s(s.s=o[0]))}return e}var r={},n={app:0},a=[];function s(t){if(r[t])return r[t].exports;var o=r[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,s),o.l=!0,o.exports}s.m=e,s.c=r,s.d=function(e,t,o){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(s.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(o,r,function(t){return e[t]}.bind(null,r));return o},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],i=l.push.bind(l);l.push=t,l=l.slice();for(var c=0;c<l.length;c++)t(l[c]);var u=i;a.push([0,"chunk-vendors"]),o()})({0:function(e,t,o){e.exports=o("56d7")},"25e0":function(e,t,o){"use strict";var r=o("9886"),n=o.n(r);n.a},"262b":function(e,t,o){"use strict";var r=o("3d9d"),n=o.n(r);n.a},"3d9d":function(e,t,o){},"4ea0":function(e,t,o){"use strict";var r=o("831f"),n=o.n(r);n.a},"4ffd":function(e,t,o){e.exports=o.p+"img/logo.2b17b9da.png"},"56d7":function(e,t,o){"use strict";o.r(t);o("cadf"),o("551c"),o("f751"),o("097d");var r=o("a026"),n=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{attrs:{id:"app"}},[o("router-view")],1)},a=[],s={name:"App"},l=s,i=(o("5c0b"),o("2877")),c=Object(i["a"])(l,n,a,!1,null,null,null),u=c.exports,m=o("8c4f"),p=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"log-p"},[o("el-container",{staticClass:"cont-box"},[o("el-header",{staticClass:"H1"},[e._v("天气订阅平台")]),o("el-main",[o("el-tabs",{on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[o("el-tab-pane",{attrs:{label:"登录",name:"Login"}},[o("login-form",{attrs:{exchange:e.exchange}})],1),o("el-tab-pane",{attrs:{label:"注册",name:"Logon"}},[o("logon-form",{attrs:{exchange:e.exchange}})],1)],1)],1)],1)],1)},d=[],f=(o("a481"),o("28a5"),o("7f7f"),function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("el-form",{ref:"loginForm",staticClass:"demo-ruleForm",attrs:{model:e.loginForm,"status-icon":"",rules:e.logoTest,"label-width":"80px"}},[o("el-form-item",{attrs:{label:"ID",prop:"ID"}},[o("el-input",{attrs:{placeholder:"用户名或邮箱地址","auto-complete":"off"},model:{value:e.loginForm.ID,callback:function(t){e.$set(e.loginForm,"ID",t)},expression:"loginForm.ID"}})],1),o("el-form-item",{attrs:{label:"密码",prop:"pass"}},[o("el-input",{attrs:{type:"password","auto-complete":"off",placeholder:"密码为6-8位字符，包含数字字母下划线"},model:{value:e.loginForm.pass,callback:function(t){e.$set(e.loginForm,"pass",t)},expression:"loginForm.pass"}})],1),o("el-form-item",{attrs:{justify:"center"}},[o("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("loginForm")}}},[e._v("登录")])],1)],1)}),g=[],h=o("2427"),v=o.n(h),b={data:function(){var e=function(e,t,o){""===t?o(new Error("请输入密码")):/^[\w\d_]{6,8}$/.test(t)?o():o(new Error("请输入正确密码"))},t=function(e,t,o){""===t?o(new Error("请输入ID")):/^[\w\d_]{6,8}$/.test(t)||/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(t)?o():o(new Error("请输入正确ID"))};return{loginForm:{ID:"",pass:""},logoTest:{pass:[{required:!0,validator:e,trigger:"blur"}],ID:[{required:!0,validator:t,trigger:"blur"}]}}},methods:{submitForm:function(e){var t=this;this.$refs[e].validate((function(o){if(!o)return console.log("error submit!!"),!1;var r=t.loginForm,n=r.ID,a=r.pass;v.a.post("/api/login",{ID:n,pass:a}).then((function(o){if(o.data){if("000"!==o.data.code)return t.$message.error(o.data.info),void t.resetForm(e);t.$message({message:"登录成功！",type:"success"}),t.resetForm(e),t.$store.commit("rewriteUserinfo",o.data.data),t.$router.push("/Sys/1-1")}else t.$message.error("请求出错！")}))}))},resetForm:function(e){this.$refs[e].resetFields()}}},x=b,y=Object(i["a"])(x,f,g,!1,null,null,null),F=y.exports,w=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("el-form",{ref:"logonForm",staticClass:"demo-ruleForm",attrs:{model:e.logonForm,"status-icon":"",rules:e.logoTest,"label-width":"80px"}},[o("el-form-item",{attrs:{label:"用户名",prop:"ID"}},[o("el-input",{attrs:{placeholder:"ID为6-8位字符，包含数字字母下划线","auto-complete":"off"},model:{value:e.logonForm.ID,callback:function(t){e.$set(e.logonForm,"ID",t)},expression:"logonForm.ID"}})],1),o("el-form-item",{attrs:{label:"邮箱",prop:"email"}},[o("el-input",{attrs:{placeholder:"邮箱"},model:{value:e.logonForm.email,callback:function(t){e.$set(e.logonForm,"email",t)},expression:"logonForm.email"}})],1),o("el-form-item",{attrs:{label:"密码",prop:"pass"}},[o("el-input",{attrs:{type:"password","auto-complete":"off",placeholder:"密码为6-8位字符，包含数字字母下划线"},model:{value:e.logonForm.pass,callback:function(t){e.$set(e.logonForm,"pass",t)},expression:"logonForm.pass"}})],1),o("el-form-item",{attrs:{label:"确认密码",prop:"checkPass"}},[o("el-input",{attrs:{type:"password","auto-complete":"off",placeholder:"再次输入密码"},model:{value:e.logonForm.checkPass,callback:function(t){e.$set(e.logonForm,"checkPass",t)},expression:"logonForm.checkPass"}})],1),o("el-form-item",[o("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("logonForm")}}},[e._v("提交")]),o("el-button",{on:{click:function(t){return e.resetForm("logonForm")}}},[e._v("重置")])],1)],1)},$=[],_={data:function(){var e=this,t=function(t,o,r){""===o?r(new Error("请输入密码")):/^[\w\d_]{6,8}$/.test(o)?(""!==e.logonForm.checkPass&&e.$refs.logonForm.validateField("checkPass"),r()):r(new Error("请输入正确格式密码"))},o=function(t,o,r){""===o?r(new Error("请再次输入密码")):o!==e.logonForm.pass?r(new Error("两次输入密码不一致!")):r()},r=function(e,t,o){""===t?o(new Error("请输入用户名")):/^[\w\d_]{6,8}$/.test(t)?v.a.get("/api/testUniqueID",{params:{ID:t}}).then((function(e){e.data?"003"!=e.data.code?o():o("该用户名已有人注册，请更换重试"):o("网络状况不佳，无法验证用户名")})):o(new Error("请输入正确格式用户名"))};return{logonForm:{ID:"",pass:"",checkPass:"",email:""},logoTest:{pass:[{required:!0,validator:t,trigger:"blur"}],checkPass:[{required:!0,validator:o,trigger:"blur"}],email:[{required:!0,message:"请输入邮箱地址",trigger:"blur"},{type:"email",message:"请输入正确的邮箱地址",trigger:"blur,change"}],ID:[{required:!0,validator:r,trigger:"blur"}]}}},methods:{submitForm:function(e){var t=this;this.$refs[e].validate((function(o){if(!o)return!1;var r=t.logonForm,n=r.ID,a=r.pass,s=r.email;v.a.post("/api/logon",{ID:n,pass:a,email:s}).then((function(o){o.data?"000"===o.data.code?(t.$message({message:"注册成功！",type:"success"}),t.resetForm(e),t.exchange()):t.$message.error(o.data.info):t.$message.error("请求出错！")}))}))},resetForm:function(e){this.$refs[e].resetFields()}},props:{exchange:Function}},k=_,O=Object(i["a"])(k,w,$,!1,null,null,null),D=O.exports,C={data:function(){return{activeName:this.$route.name}},methods:{handleClick:function(e,t){var o=t.target.id.split("tab-")[1];this.$route.name!==o&&this.$router.replace(o)},exchange:function(){var e="";"Login"===this.$route.name?e="Logon":"Logon"===this.$route.name&&(e="Login"),this.$router.replace(e),this.activeName=e}},components:{LoginForm:F,LogonForm:D},beforeRouteUpdate:function(e,t,o){this.$data.activeName=e.name,console.log(e.name),o()}},I=C,j=(o("262b"),Object(i["a"])(I,p,d,!1,null,null,null)),L=j.exports,E=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{attrs:{id:"sys"}},[o("s-header"),o("div",{staticClass:"body"},[o("s-side-list"),o("div",{staticClass:"view"},[o("router-view")],1)],1)],1)},S=[],P=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-row",{attrs:{type:"flex",justify:"space-between",align:"middle",tag:"header"}},[r("el-col",{staticClass:"header-left"},[r("img",{staticClass:"logo",attrs:{src:o("4ffd"),alt:"LOGO"}}),r("h1",{staticClass:"title"},[e._v("天气订阅平台")])])],1)},M=[],T={},H=T,A=(o("8787"),Object(i["a"])(H,P,M,!1,null,"33add564",null)),q=A.exports,N=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("el-menu",{staticClass:"el-menu-vertical-demo nav",attrs:{"default-active":"1-1",collapse:e.isCollapse,"unique-opened":!0,router:!0,"background-color":"#fff","text-color":"#66CC66","active-text-color":"#000"}},[e._l(e.listMap,(function(t){var r=t.key,n=t.icon,a=t.title,s=t.list;return o("el-submenu",{key:r,attrs:{index:r}},[o("template",{slot:"title"},[o("i",{class:n}),o("span",{attrs:{slot:"title"},slot:"title"},[e._v(e._s(a))])]),o("el-menu-item-group",e._l(s,(function(t){var r=t.index,n=t.txt;return o("el-menu-item",{key:r,attrs:{index:r}},[e._v(e._s(n))])})),1)],2)})),o("el-menu-item",{attrs:{index:void 0},on:{click:e.changeShowStyle}},[o("i",{class:e.isCollapse?"el-icon-arrow-right":"el-icon-arrow-left"})])],2)},z=[],U=[{key:"first",title:"导航一",icon:"el-icon-location",list:[{index:"1-1",txt:"选项1"},{index:"1-2",txt:"选项2"},{index:"1-3",txt:"选项3"},{index:"1-4",txt:"选项4"}]},{key:"second",title:"导航二",icon:"el-icon-menu",list:[{index:"2-1",txt:"选项1"},{index:"2-2",txt:"选项2"},{index:"2-3",txt:"选项3"},{index:"2-4",txt:"选项4"}]}],Y={data:function(){return{isCollapse:!0}},methods:{changeShowStyle:function(){this.isCollapse=!this.isCollapse}},created:function(){this.listMap=U}},Z=Y,G=(o("4ea0"),Object(i["a"])(Z,N,z,!1,null,"1ba7d82a",null)),J=G.exports,W={name:"sys",components:{sHeader:q,sSideList:J}},R=W,B=(o("25e0"),Object(i["a"])(R,E,S,!1,null,null,null)),K=B.exports,Q=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{attrs:{id:"aaa"}},[e._v("\n  1-1\n  "),o("chart",{attrs:{options:e.chartOptions}})],1)},V=[],X=(o("c5f6"),o("e08f")),ee=o("1f21"),te=o.n(ee);te.a.setOptions({global:{useUTC:!1}});var oe={data:function(){return{seriesData:[]}},computed:{chartOptions:function(){return{chart:{zoomType:"x"},title:{text:"室外温度走势图"},subtitle:{text:void 0===document.ontouchstart?"鼠标拖动可以进行缩放":"手势操作进行缩放"},xAxis:{type:"datetime",dateTimeLabelFormats:{millisecond:"%H:%M:%S.%L",second:"%H:%M:%S",minute:"%H:%M",hour:"%H:%M",day:"%m-%d",week:"%m-%d",month:"%Y-%m",year:"%Y"}},tooltip:{dateTimeLabelFormats:{millisecond:"%H:%M:%S.%L",second:"%H:%M:%S",minute:"%H:%M",hour:"%H:%M",day:"%Y-%m-%d",week:"%m-%d",month:"%Y-%m",year:"%Y"}},yAxis:{title:{text:"温度"}},legend:{enabled:!1},plotOptions:{area:{fillColor:{linearGradient:{x1:0,y1:0,x2:0,y2:1},stops:[[0,te.a.getOptions().colors[0]],[1,te.a.Color(te.a.getOptions().colors[0]).setOpacity(0).get("rgba")]]},marker:{radius:2},lineWidth:1,states:{hover:{lineWidth:1}},threshold:null}},series:[{type:"area",name:"室外温度",data:this.seriesData}]}}},mounted:function(){var e=this;v.a.get("/api/mock").then((function(t){console.log(Array.isArray(t.data)),e.seriesData=t.data.map((function(e){var t=[];return t[0]=e.time,t[1]=Number(e.outTemp),t})),console.log(e.seriesData)}))},components:{Chart:X["Chart"]}},re=oe,ne=Object(i["a"])(re,Q,V,!1,null,null,null),ae=ne.exports;r["default"].use(m["a"]);var se=new m["a"]({routes:[{path:"/",redirect:"Login"},{path:"/Login",name:"Login",component:L},{path:"/Logon",name:"Logon",component:L},{path:"/Sys",name:"Sys",component:K,children:[{path:"1-1",name:"1-1",component:ae}]}]}),le=o("2f62");r["default"].use(le["a"]);var ie=new le["a"].Store({state:{userinfo:null},mutations:{rewriteUserinfo:function(e,t){e.userinfo=t}},actions:{}}),ce=o("7893"),ue=o.n(ce);o("610a");r["default"].config.productionTip=!1,r["default"].use(ue.a),new r["default"]({router:se,store:ie,render:function(e){return e(u)}}).$mount("#app")},"5c0b":function(e,t,o){"use strict";var r=o("e332"),n=o.n(r);n.a},"831f":function(e,t,o){},8787:function(e,t,o){"use strict";var r=o("b104"),n=o.n(r);n.a},9886:function(e,t,o){},b104:function(e,t,o){},e332:function(e,t,o){}});
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-33d77450","chunk-753e3236"],{"0a5c":function(t,e,a){},"0d58":function(t,e,a){},"2a26":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:24}},[a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",[t._v("全国疫情概览")]),a("sub-btn",{attrs:{url:"/api/addSub",params:{token:this.$store.getters.Userinfo.token,chartstr:"TotalHistory"},disabled:t.disable1}})],1),a("div",{staticClass:"box-body"},[a("e-chart",{attrs:{option:t.option,height:400}})],1)])],1)],1)},r=[],i=(a("6d57"),a("309f"),a("0b53"),a("06a2"),a("ec25"),a("cc57"),a("2b45"),a("b449"),a("17d6")),s=a("09d9"),o=a("9faa"),c=a("c1d0");function u(t){if("undefined"===typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(t=d(t))){var e=0,a=function(){};return{s:a,n:function(){return e>=t.length?{done:!0}:{done:!1,value:t[e++]}},e:function(t){throw t},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var n,r,i=!0,s=!1;return{s:function(){n=t[Symbol.iterator]()},n:function(){var t=n.next();return i=t.done,t},e:function(t){s=!0,r=t},f:function(){try{i||null==n.return||n.return()}finally{if(s)throw r}}}}function d(t,e){if(t){if("string"===typeof t)return l(t,e);var a=Object.prototype.toString.call(t).slice(8,-1);return"Object"===a&&t.constructor&&(a=t.constructor.name),"Map"===a||"Set"===a?Array.from(a):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?l(t,e):void 0}}function l(t,e){(null==e||e>t.length)&&(e=t.length);for(var a=0,n=new Array(e);a<e;a++)n[a]=t[a];return n}function h(){return f.apply(this,arguments)}function f(){return f=Object(i["a"])(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e=c,t.abrupt("return",e.data);case 2:case"end":return t.stop()}}),t)}))),f.apply(this,arguments)}var p={name:"TotalHistory",data:function(){return{history:[],timeLine:{type:"category",data:[],axisTick:{alignWithLabel:!0}},diagnosedLine:{name:"确诊病例",type:"line",stack:"确诊病例",itemStyle:{color:"#ff0000"},data:[]},increaseLine:{name:"新增确诊",type:"bar",stack:"新增确诊",yAxisIndex:1,itemStyle:{color:"#3300FF"},data:[0]},suspectLine:{name:"疑似病例",type:"line",stack:"疑似病例",itemStyle:{color:"#FF6600"},data:[]},deathLine:{name:"死亡人数",type:"line",stack:"死亡人数",yAxisIndex:1,itemStyle:{color:"#CC6600"},data:[]},curedLine:{name:"治愈人数",type:"line",stack:"治愈人数",yAxisIndex:1,itemStyle:{color:"#00CC00"},data:[]}}},computed:{disable1:function(){var t="TotalHistory";return!(!Array.isArray(this.$store.getters.Userinfo.subList)||-1==this.$store.getters.Userinfo.subList.indexOf(t))},option:function(){return{title:{text:"全国疫情变化图（12天）",left:"center"},tooltip:{trigger:"axis",axisPointer:{type:"cross",nimation:!1,label:{backgroundColor:"#6a7985"}}},legend:{data:["确诊病例","疑似病例","死亡人数","治愈人数","新增确诊"],selected:{新增确诊:!1},left:"12%",top:"6%"},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},xAxis:[this.timeLine],yAxis:[{type:"value",name:"确诊|疑似",max:4e4,splitNumber:8},{type:"value",name:"死亡|治愈|新增",max:4e3,splitNumber:8,position:"right"}],series:[this.diagnosedLine,this.suspectLine,this.deathLine,this.curedLine,this.increaseLine]}}},watch:{history:function(){this.transformStatusToData()}},methods:{catchHistory:function(t){var e=t.history;this.history=e},catchTotal:function(t){var e=t.date,a=t.diagnosed,n=t.suspect,r=t.death,i=t.cured;this.totalStatus={date:e,diagnosed:a,suspect:n,death:r,cured:i}},update:function(){var t=this;h().then((function(e){e?(t.catchTotal(e),t.catchHistory(e)):t.$toast.error("拉取数据失败！")}))},transformStatusToData:function(){var t={timeLine:"date",diagnosedLine:"confirmedNum",suspectLine:"suspectedNum",deathLine:"deathsNum",curedLine:"curesNum"};for(var e in this.$options.data())"history"!==e&&(this.$data[e]=this.$options.data()[e]);var a,n=u(this.history);try{for(n.s();!(a=n.n()).done;){var r=a.value;for(var i in t)this[i].data.unshift(r[t[i]])}}catch(d){n.e(d)}finally{n.f()}for(var s=this.diagnosedLine.data[0],o=0,c=1;c<this.diagnosedLine.data.length;c++)o=this.diagnosedLine.data[c],this.increaseLine.data.push(o-s),s=o}},created:function(){this.update(),this.transformStatusToData()},components:{EChart:s["a"],subBtn:o["a"]}},y=p,m=(a("f9d9"),a("e90a")),v=Object(m["a"])(y,n,r,!1,null,"1f9326b3",null);e["default"]=v.exports},"2aa6":function(t,e,a){"use strict";var n=a("0a5c"),r=a.n(n);r.a},"33a7":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page"},[a("h1",[t._v("新型冠状病毒全国疫情概览")]),a("div",{staticClass:"date"},[t._v("当前统计截止时间："+t._s(t.totalStatus.date))]),a("el-row",{staticClass:"total-container"},t._l(t.totalList,(function(e){return a("el-col",{key:e.EN,class:e.EN,attrs:{span:6}},[a("div",{staticClass:"title"},[t._v(t._s(e.CN))]),a("div",{staticClass:"content"},[t._v(t._s(t.totalStatus[e.EN]))])])})),1),a("total-history",{staticClass:"chart-center"})],1)},r=[],i=(a("b449"),a("17d6")),s=(a("82ae"),a("c1d0")),o=a("2a26");function c(){return u.apply(this,arguments)}function u(){return u=Object(i["a"])(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e=s,t.abrupt("return",e.data);case 2:case"end":return t.stop()}}),t)}))),u.apply(this,arguments)}var d={name:"App",data:function(){return{totalList:[{EN:"diagnosed",CN:"确诊病例"},{EN:"suspect",CN:"疑似病例"},{EN:"death",CN:"死亡人数"},{EN:"cured",CN:"治愈人数"}],totalStatus:{date:"xxxx-xx-xx xx:xx:xx",diagnosed:0,suspect:0,death:0,cured:0}}},methods:{update:function(){var t=this;c().then((function(e){e?t.catchTotal(e):t.$toast.error("拉取数据失败！")}))},catchTotal:function(t){var e=t.date,a=t.diagnosed,n=t.suspect,r=t.death,i=t.cured;this.totalStatus={date:e,diagnosed:a,suspect:n,death:r,cured:i}}},created:function(){this.update()},components:{TotalHistory:o["default"]}},l=d,h=(a("2aa6"),a("e90a")),f=Object(h["a"])(l,n,r,!1,null,"52c8da4d",null);e["default"]=f.exports},f9d9:function(t,e,a){"use strict";var n=a("0d58"),r=a.n(n);r.a}}]);
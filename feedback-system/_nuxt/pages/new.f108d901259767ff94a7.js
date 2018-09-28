webpackJsonp([2],{"6md+":function(t,e,r){(t.exports=r("FZ+f")(!1)).push([t.i,".product-form[data-v-481d0270]{width:80%}",""])},EwaE:function(t,e,r){(t.exports=r("FZ+f")(!1)).push([t.i,".title[data-v-1b8f9b27]{font-size:24px;line-height:60px;text-align:left;padding-left:60px;letter-spacing:1px}.header-bar[data-v-1b8f9b27]{width:100vw}.header-bar-title[data-v-1b8f9b27]{border-bottom:1px solid #e6e6e6}a[data-v-1b8f9b27]{text-decoration:none}@media (max-width:768px){.title[data-v-1b8f9b27]{font-size:16px;padding-left:8px}}",""])},GYVE:function(t,e,r){"use strict";var i=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-form",{ref:"form",staticClass:"product-form",attrs:{model:t.form,rules:t.rules}},[r("el-form-item",{attrs:{label:"作品タイトル",prop:"title"}},[r("el-input",{attrs:{placeholder:"20文字以内"},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1),r("el-form-item",{attrs:{label:"製作者",prop:"producer"}},[r("el-input",{attrs:{placeholder:"20文字以内"},model:{value:t.form.producer,callback:function(e){t.$set(t.form,"producer",e)},expression:"form.producer"}})],1),r("el-form-item",{attrs:{label:"作品説明",prop:"text"}},[r("el-input",{attrs:{type:"textarea",rows:4,resize:"none",placeholder:"400文字以内"},model:{value:t.form.text,callback:function(e){t.$set(t.form,"text",e)},expression:"form.text"}})],1),r("el-form-item",{attrs:{label:"リンク等",prop:"link"}},[r("el-input",{attrs:{placeholder:"100文字以内"},model:{value:t.form.link,callback:function(e){t.$set(t.form,"link",e)},expression:"form.link"}})],1),r("el-form-item",[r("el-row",{attrs:{type:"flex",justify:"center"}},[this.product?r("el-button",{attrs:{type:"info"},on:{click:t.onClickReturn}},[t._v("戻る")]):t._e(),this.product?r("el-button",{attrs:{type:"primary"},on:{click:t.onClickUpdate}},[t._v("更新")]):r("el-button",{attrs:{type:"primary"},on:{click:t.onClickRegister}},[t._v("登録")])],1)],1)],1)};i._withStripped=!0;var o={render:i,staticRenderFns:[]};e.a=o},HuMl:function(t,e,r){"use strict";var i=r("jnC+"),o=r("GYVE"),s=!1;var n=function(t){s||r("xvMe")},a=r("VU/8")(i.a,o.a,!1,n,"data-v-481d0270",null);a.options.__file="components/ProductForm.vue",e.a=a.exports},IWFf:function(t,e,r){var i=r("KESm");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);r("rjj0")("2c5929b0",i,!1,{sourceMap:!1})},KESm:function(t,e,r){(t.exports=r("FZ+f")(!1)).push([t.i,".el-header{padding:0}.el-main{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-ms-flex-align:center;align-items:center}",""])},Sql6:function(t,e,r){"use strict";var i=r("iw9C"),o=!1;var s=function(t){o||r("Vmxd")},n=r("VU/8")(null,i.a,!1,s,"data-v-1b8f9b27",null);n.options.__file="components/HeaderMenu.vue",e.a=n.exports},Vc0N:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=r("xmze"),o=r("pSfI"),s=!1;var n=function(t){s||r("IWFf")},a=r("VU/8")(i.a,o.a,!1,n,null,null);a.options.__file="pages/new.vue",e.default=a.exports},Vmxd:function(t,e,r){var i=r("EwaE");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);r("rjj0")("0d39ac18",i,!1,{sourceMap:!1})},iw9C:function(t,e,r){"use strict";var i=function(){var t=this.$createElement,e=this._self._c||t;return e("el-menu",{attrs:{router:!0,"default-active":this.$route.path,mode:"horizontal"}},[e("el-menu-item",{attrs:{index:"/",router:"/"}},[this._v("一覧")]),e("el-menu-item",{attrs:{index:"/new",router:"/new"}},[this._v("登録")])],1)};i._withStripped=!0;var o={render:i,staticRenderFns:[]};e.a=o},"jnC+":function(t,e,r){"use strict";e.a={data:function(){return{form:{title:this.product?this.product.title:"",producer:this.product?this.product.producer:"",text:this.product?this.product.text:"",link:this.product?this.product.link:""},rules:{title:[{required:!0,message:"必須です",trigger:"blur"},{max:20,message:"20文字以内で入力してください",trigger:"blur"}],producer:[{required:!0,message:"必須です",trigger:"blur"},{max:20,message:"20文字以内で入力してください",trigger:"blur"}],text:[{max:400,message:"400文字以内で入力してください",trigger:"blur"}],link:[{max:100,message:"100文字以内で入力してください",trigger:"blur"}]}}},props:["product"],methods:{onClickRegister:function(){var t=this;this.$refs.form.validate(),this.$axios.$post("/products/",{title:this.form.title,producer:this.form.producer,text:this.form.text,link:this.form.link}).then(function(){t.$message({message:"登録に成功しました",type:"success"})}).catch(function(){t.$message.error("登録に失敗しました")})},onClickUpdate:function(){var t=this;this.$refs.form.validate(),this.$axios.$put("/products/"+this.product.id+"/",{title:this.form.title,producer:this.form.producer,text:this.form.text,link:this.form.link}).then(function(){t.$message({message:"更新に成功しました",type:"success"}),t.$router.push("/"+t.product.id+"/")}).catch(function(){t.$message.error("更新に失敗しました")})},onClickReturn:function(){this.$router.push("/"+this.product.id+"/")}}}},pSfI:function(t,e,r){"use strict";var i=function(){var t=this.$createElement,e=this._self._c||t;return e("el-container",{staticClass:"container"},[e("el-header",[e("header-menu")],1),e("el-main",{staticClass:"main-content"},[e("h1",[this._v("作品登録")]),e("product-form")],1)],1)};i._withStripped=!0;var o={render:i,staticRenderFns:[]};e.a=o},xmze:function(t,e,r){"use strict";var i=r("Sql6"),o=r("HuMl");e.a={components:{HeaderMenu:i.a,ProductForm:o.a}}},xvMe:function(t,e,r){var i=r("6md+");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);r("rjj0")("77cc7b72",i,!1,{sourceMap:!1})}});
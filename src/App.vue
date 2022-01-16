<template>
  <div class="admin-app">
    <Header class="header" />
    <main class="main">
      <SideBar class="sidebar" />
      <div class="router">
        <router-view />
      </div>
    </main>
    <Loading v-if="loadingFlg" class="loading" />
  </div>
</template>
<script>
import Header from "./components/Header.vue";
import SideBar from "./components/SideBar.vue";
import Loading from "./components/Loading.vue";
export default {
  name: "App",
  components: {
    Header,
    SideBar,
    Loading,
  },
  computed: {
    loadingFlg() {
      return this.$store.state.loadingFlg;
    },
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.admin-app {
  display: flex;
  flex-flow: column;
  width: 100vw;
}
.main {
  display: flex;
  width: 100vw;
  background-color: #fff;
  overflow: hidden;
}
.sidebar {
  width: 180px;
  height: 100vh;
}
.router {
  margin-left: 204px;
  position: relative;
  width: 100%;
}
.loading {
  z-index: 9999;
  height: 100vh;
  width: 100vw;
  position: fixed;
  background-color: #0000005c;
}
/** ------------------------------------- */
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  margin: 0;
  padding: 0;
}

ol,
ul {
  list-style: none;
}
li {
  display: list-item;
  text-align: -webkit-match-parent;
}
/* 共通スタイル */
.bc-white {
  background-color: white;
}
.fs-20 {
  font-size: 20px;
}
.fs-24 {
  font-size: 24px;
}
.fs-32 {
  font-size: 32px;
}
.fs-48 {
  font-size: 48px;
}
.mg-16 {
  margin: 16px;
}
.mg-section {
  margin: 48px 48px;
}
.mg-auto {
  margin: auto;
}
.mt-16 {
  margin-top: 16px;
}
.mt-24 {
  margin-top: 24px;
}
.mt-32 {
  margin-top: 32px;
}
.mt-48 {
  margin-top: 48px;
}
.mt-64 {
  margin-top: 64px;
}
.mb-16 {
  margin-bottom: 16px;
}
.mb-32 {
  margin-bottom: 32px;
}
.mr-8 {
  margin-right: 8px;
}
.mr-24 {
  margin-right: 24px;
}
.mr-64 {
  margin-right: 64px;
}
.ml-8 {
  margin-left: 8px;
}
.ml-16 {
  margin-left: 16px;
}
.ml-64 {
  margin-left: 64px;
}
.pt-32 {
  padding-top: 32px;
}
.pb-16 {
  padding-bottom: 16px;
}
.mrl-48px {
  margin: 0 48px;
}
.w-20 {
  width: 20%;
}
.w-50 {
  width: 50%;
}
.w-100 {
  width: 100%;
}
.h-100 {
  height: 100%;
}
.bold {
  font-weight: bold;
}
.left {
  text-align: left;
}
.center {
  text-align: center;
}
.flex {
  display: flex;
}
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.flex-column {
  flex-flow: column;
}
.table {
  display: table;
}
.wrap {
  flex-wrap: wrap;
}
.left {
  text-align: left;
}
.relative {
  position: relative;
}
.border-t {
  border-top: 1px solid;
}
.border-b {
  border-bottom: 1px solid;
}
</style>

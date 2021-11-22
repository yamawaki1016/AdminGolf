<template>
  <div id="nav">
    <main>
      <router-view />
    </main>
  </div>
</template>
<script>
export default {};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
/* .header {
  // height: 10vh;
  // margin-top: 5px;
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
} */
.main {
  /* flex: 1; */
  background-color: #fff;
  overflow: hidden;
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
.mg-section {
  margin: 48px 48px;
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
.pb-16 {
  padding-bottom: 16px;
}
.mrl-48px {
  margin: 0 48px;
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

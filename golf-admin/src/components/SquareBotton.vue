<template>
  <div class="botton" @click="clickBotton()">
    <span class="botton-title">{{ title }}</span>
  </div>
</template>
<script>
export default {
  name: "SquareBotton",
  components: {},
  props: {
    title: String,
  },
  emits: ["click-btn"],
  computed: {},
  methods: {
    clickBotton() {
      this.$emit("click-btn");
    },
  },
};
</script>
<style>
.botton {
  display: table-cell;
  height: 30px;
  width: 100px;
  text-align: center;
  vertical-align: middle;
  border: 1px solid;
  border-radius: 20px;
}
.botton-title {
  height: 100%;
  color: #000;
}
.botton:hover {
  background-color: silver;
}
</style>
<template>
  <a class="tag" :style="tagStyle()" @click="clickTag()">{{ tagName }}</a>
</template>
<script>
export default {
  name: "TheTag",
  components: {},
  props: {
    tagName: {
      type: String,
      required: true,
    },
    tagColor: {
      type: String,
      required: false,
      default: "blue",
      validator: function (value) {
        // プロパティの値は、必ずいずれかの文字列でなければならない
        return ["blue", "red", "gray"].indexOf(value) !== -1;
      },
    },
  },
  emits: ["click-tag"],
  computed: {},
  methods: {
    clickTag() {
      this.$emit("click-tag");
    },
    tagStyle() {
      const color = this.tagColor;
      let addStyle = {};
      switch (color) {
        case "blue":
          addStyle["--tag-color"] = "blue";
          break;
        case "red":
          addStyle["--tag-color"] = "red";
          break;
        case "gray":
          addStyle["--tag-color"] = "gray";
          break;
        default:
          // default blue
          addStyle["--tag-color"] = "blue";
      }
      return addStyle;
    },
  },
};
</script>
<style scoped>
a {
  position: relative;
  display: inline-block;
  margin: 0 0.6em 0.6em 0.6em;
  padding: 0.6em 0.6em 0.6em 1.2em;
  line-height: 1;
  color: #fff;
  text-decoration: none;
  background-color: var(--tag-color);
}
a:before {
  position: absolute;
  top: 0;
  left: -1em;
  content: "";
  border-width: 1.1em 1em 1.1em 0;
  border-style: solid;
  border-color: transparent var(--tag-color) transparent transparent;
}
a:after {
  position: absolute;
  top: center;
  left: 0;
  content: "●";
  color: #fff;
}
a:hover {
  box-shadow: 0 15px 30px -5px rgba(0, 0, 0, 0.15), 0 0 5px rgba(0, 0, 0, 0.1);
  transform: translateY(-4px);
}
</style>

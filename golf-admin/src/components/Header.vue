<template>
  <div class="header-contents">
    <span class="header-title">{{ HeaderTitle }}</span>
  </div>
</template>
<script>
export default {
  name: "Header",
  props: {
    HeaderTitle: {
      type: String,
      default: "管理画面",
    },
  },
  components: {},
  computed: {},
  methods: {},
};
</script>
<style scoped>
.header-contents {
  font-size: 20px;
  vertical-align: middle;
  font-weight: bold;
  position: sticky;
  top: 0px;
  height: 40px;
  background: linear-gradient(
    -45deg,
    rgb(186, 255, 255),
    rgba(169, 189, 255, 0.89)
  );
}
</style>
<template>
  <transition name="SquareBlock">
    <div class="block-mask" :style="bgColorStyle()">
      <div class="block-wrapper">
        <div class="block-container">
          <div class="block-body">
            <slot name="body"> default body </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "SquareBlock",
  props: {
    colorType: {
      type: Number,
      default: 0,
    },
  },
  components: {},
  computed: {},
  methods: {
    bgColorStyle() {
      if (this.colorType == 0) {
        return "background-color: rgb(11, 135, 250);";
      } else if (this.colorType == 1) {
        return "background-color: gray;";
      } else {
        return "background-color: rgb(11, 135, 250);";
      }
    },
  },
};
</script>
<style scoped>
.gray {
  background-color: gray;
}
.default {
  background-color: rgb(11, 135, 250);
}
.block-mask {
  background-color: rgb(11, 135, 250);
  text-align: center;
  vertical-align: middle;
  border-radius: 20px;
  color: white;
  font-size: 32px;
  transition: all 0.3s ease 0s;
}
.block-mask:hover {
  opacity: 0.6;
}
.block-container {
  padding: 64px;
}
</style>
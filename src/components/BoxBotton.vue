<template>
  <div class="button">
    <div class="text" @click="this.$emit('click-box-botton')">
      {{ this.text }}
    </div>
  </div>
</template>
<script>
export default {
  name: "BoxBotton",
  data() {
    return {};
  },
  props: {
    text: {
      type: String,
      default: "botton",
    },
  },
};
</script>
<style scoped>
.text {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 8px 0;
  width: 100%;
  color: #2285b1;
  font-size: 18px;
  font-weight: 700;
  border: 2px solid #2285b1;
}

.text::after {
  content: "";
  width: 5px;
  height: 5px;
  border-top: 3px solid #2285b1;
  border-right: 3px solid #2285b1;
  transform: rotate(45deg);
}

.text:hover {
  color: #333333;
  text-decoration: none;
  background-color: #a0c4d3;
}

.text:hover::after {
  border-top: 3px solid #333333;
  border-right: 3px solid #333333;
}
</style>

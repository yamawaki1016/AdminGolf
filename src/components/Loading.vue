<template>
  <div>
    <div class="load-content spinner-box">
      <div class="pulse-container">
        <div class="pulse-bubble pulse-bubble-1"></div>
        <div class="pulse-bubble pulse-bubble-2"></div>
        <div class="pulse-bubble pulse-bubble-3"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Loading",
};
</script>
<style>
@keyframes pulse {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0.25;
    transform: scale(0.75);
  }
}
.load-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
}
.spinner-box {
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
}
.pulse-container {
  width: 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.pulse-bubble {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #3ff9dc;
}
.pulse-bubble-1 {
  animation: pulse 0.4s ease 0s infinite alternate;
}
.pulse-bubble-2 {
  animation: pulse 0.4s ease 0.2s infinite alternate;
}
.pulse-bubble-3 {
  animation: pulse 0.4s ease 0.4s infinite alternate;
}
</style>

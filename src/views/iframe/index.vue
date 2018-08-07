<template>
  <div>
    <iframe src="https://slv.ssna.rongwenest.com/reports/groundcontrol/index.jsp"  class="iframe" name="mainFrame" frameborder="0"></iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    var frame = document.getElementsByName("mainFrame");
    setTimeout(function() {
      frame[0].contentWindow.postMessage("hcl##Hcl2018@", "*");
    }, 1000);
  }
};
</script>

<style lang="scss" scoped>
.iframe {
  width: 100%;
  height: calc(91vh);
}
.hideNavbar {
  .iframe {
    width: 100%;
    height: calc(100vh);
  }
}
</style>

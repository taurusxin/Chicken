<template>
<div class="notify">
  <div class="box">
    <a-input
        class="content"
        placeholder="输入提醒内容..."
        size="default"
        v-model="content"
        allow-clear />
    <a-button
        class="send-button"
        @click="send">发送</a-button>
  </div>
</div>
</template>

<script>
export default {
  name: "notify",
  data() {
    return {
      content: ''
    }
  },
  methods: {
    send() {
      const that = this
      this.$axios.get('http://47.100.0.217:8267/custom?content=' + this.content).then(
          function (response) {
            that.$message.success(
                '发送提醒成功！',
                3,
            )
          }
      )
    }
  }
}
</script>

<style scoped>
.box {
  margin: 10px;
}

.content {
  width: 70%;
}
.send-button {
  width: 80px;
}
</style>
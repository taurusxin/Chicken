<template>
  <div class="home">
    <a-skeleton
        active
        :loading="loading">
      <div class="term-chicken-list">飞哥这学期吃了
        <span class="chickens" v-for="(index,key) in data.term">
          🐥
        </span>
        这么多鸡，一共吃了 <span class="high-light">{{ data.term }}</span> 次
      </div>

      <div class="most-chicken">
        飞哥这学期吃鸡最多的一天是
        <span class="high-light">
          {{ data.most_date }}
        </span>，这一天他吃了
        <span class="high-light">{{ data.most_count }}</span> 次鸡
      </div>

      <div class="today-chicken-list">
        <div v-if="data.today === 0">
          飞哥今天还没有吃鸡，快去<a-button @click="notify()">提醒他</a-button>点一份
        </div>
        <div v-else>
          飞哥今天吃了
          <span class="chickens" v-for="(index,key) in data.today">
          🐥
        </span>
          这么多鸡
        </div>
      </div>
    </a-skeleton>

    <a-divider />

      <div class="time-range">
        <a-radio-group
            class="time-group"
            name="timeGroup"
            v-model="time"
            button-style="solid">
          <a-radio-button value="中餐">
            中餐
          </a-radio-button>
          <a-radio-button value="下午茶">
            下午茶
          </a-radio-button>
          <a-radio-button value="晚餐">
            晚餐
          </a-radio-button>
          <a-radio-button value="夜宵">
            夜宵
          </a-radio-button>
        </a-radio-group>

        <a-button
            class="add-chicken"
            type="primary"
            size="large"
            @click="handleAddChicken">
          🐥飞哥吃鸡了！
        </a-button>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      data: {
        today: 1,
        term: 1,
        most_date: '',
        most_count: 1
      },
      time: '夜宵',
      loading: true
    }
  },
  methods: {
    handleAddChicken() {
      const that = this
      this.$modal.confirm({
        title: '确认',
        content: '飞哥今天' + this.time + '确定吃了一顿鸡吗？',
        okText: '是的',
        cancelText: '没有',
        onOk() {
          that.$axios.get('http://chicken.rhyland.top/query.php?type=add&time=' + that.time)
              .then(function (response) {
                console.log(response.data)
                that.$message.success(
                    '飞哥吃鸡了！',
                    3,
                )
                that.refreshData()
              }).catch(function (error){})
        },
        onCancel() {},
      });
    },
    refreshData() {
      const that = this
      this.$axios.get('http://chicken.rhyland.top/query.php?type=all')
          .then(function (response) {
            that.loading = true
            that.data.today = parseInt(response.data.today)
            that.data.term = parseInt(response.data.term)
            that.data.most_count = response.data.most_count
            that.data.most_date = response.data.most_date
            that.loading = false
          }).catch(function (error){})
    },
    notify() {
      const that = this
      this.$axios.get('http://47.100.0.217:8267/send').then(
          function (response) {
            that.$message.success(
                '发送提醒成功！',
                3,
            )
          }
      )
    }
  },
  mounted() {
    this.refreshData()
  }
}
</script>

<style lang="less" scoped>

.today-chicken-list, .term-chicken-list, .most-chicken {
  font-size: 25px;
  margin: 25px;
}

.add-chicken {
  margin: 10px 30px;
  width: 200px;
}

.time-group {
  margin: 20px 25px;
}

.high-light {
  color: deeppink;
}
</style>

<template>
  <div class="home">
    <a-skeleton
        active
        :loading="loading">
      <div class="term-chicken-list">飞哥这学期吃了 <br/>
        <span class="chickens" v-for="(index,key) in data.term">
          🐥
        </span>
        <br/>这么多鸡，一共吃了 <span class="high-light">{{ data.term }}</span> 次
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
          飞哥今天还没有吃鸡，快去<a-button @click="notify()" class="notify-btn">提醒他</a-button>点一份
        </div>
        <div v-else>
          飞哥今天吃了
          <span class="chickens" v-for="(index,key) in data.today">
          🐥
        </span>
          这么多鸡<a-button @click="notify()" class="notify-btn">提醒他</a-button>再点一份
        </div>
      </div>
    </a-skeleton>

    <a-divider />
      <div class="time-range">
        <a-radio-group
            class="time-group"
            name="timeGroup"
            v-model="time_range"
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

    <a-divider />
    <h1>飞哥吃鸡统计</h1>
    <div id="pie-chart"></div>
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
      time_range: '',
      loading: true,
      chicken_time: [
        {name: '中餐', value: 0},
        {name: '下午茶', value: 0},
        {name: '晚餐', value: 0},
        {name: '夜宵', value: 0},
      ]
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
      this.$axios.get('http://chicken.rhyland.top/query.php?type=list')
          .then(function (response) {
            response.data.forEach((e) => {
              switch (e.time){
                case '中餐':
                  that.chicken_time[0].value += 1
                  break;
                case '下午茶':
                  that.chicken_time[1].value += 1
                  break;
                case '晚餐':
                  that.chicken_time[2].value += 1
                  break;
                case '夜宵':
                  that.chicken_time[3].value += 1
                  break;
              }
            })
            //拿完数据再绘图
            that.drawCharts()
          }).catch(function (error){})

      let now = new Date().getHours();
      if (0 <= now && now <= 13){
        this.time_range = '中餐'
      }else if (now <= 16){
        this.time_range = '下午茶'
      }else if (now <= 21){
        this.time_range = '晚餐'
      }else{
        this.time_range = '夜宵'
      }
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
    },
    drawCharts() {
      let chart = this.$echarts.init(document.querySelector('#pie-chart'), 'macarons2')

      chart.setOption({
        title: {
          text: '总数',
          subtext: (this.chicken_time[0].value + this.chicken_time[1].value +
              this.chicken_time[2].value + this.chicken_time[3].value).toString(),
          x: 'center',
          y: '45%'
        },
        legend: {
          y: 'bottom',
          orient:'horizontal',
          data: ["中餐","下午茶","晚餐","夜宵"]
        },
        series: [{
          name: '吃鸡数',
          type: 'pie',
          radius: ['40%', '60%'],
          itemStyle:{
            normal: {
              label: {
                show: true,
                formatter: '{c}'
              }
            }
          },
          data: this.chicken_time
        }]
      })

    }
  },
  mounted() {
    this.refreshData()

    window.addEventListener('resize',()=>{
      this.$echarts.init(document.querySelector('#pie-chart')).resize()
    })
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

.notify-btn {
  margin: 15px;
}

#pie-chart {
  width: 100%;
  height: 280px;
}
</style>

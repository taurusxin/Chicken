<template>
  <div class="history">
    <a-table
        bordered
        class="table"
        :pagination="false"
        :columns="columns"
        :data-source="data"
        :loading="loading">
      <span slot="num" slot-scope="text, record, index">
        {{ data.length - parseInt(index) }}
      </span>
      <template slot="operation" slot-scope="text, record">
        <a-popconfirm
            v-if="data.length"
            title="不可恢复的操作，确定要删除吗？"
            ok-text="是的"
            cancel-text="不要"
            @confirm="() => onDelete(record.key)"
        >
          <a href="#">删除</a>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
</template>

<script>
export default {
  name: "History",
  data() {
    return {
      loading: true,
      columns: [
        {
          title: '次数',
          dataIndex: 'num',
          scopedSlots: { customRender: 'num' }
        },
        {
          title: '日期',
          dataIndex: 'date',
        },
        {
          title: '时间点',
          dataIndex: 'time',
        },
        {
          title: '操作',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      data: []
    }
  },
  methods: {
    refreshData() {
      const that = this
      this.$axios.get('http://chicken.rhyland.top/query.php?type=list')
          .then(function (response) {
            that.loading = true
            that.data = response.data
            that.loading = false
          }).catch(function (error){})
    },
    onDelete(key) {
      const that = this
      this.$axios.get('http://chicken.rhyland.top/query.php?type=delete&id='+key)
          .then(function (response) {
            that.refreshData()
          }).catch(function (error){})
    }
  },
  mounted() {
    this.refreshData()
  }
}
</script>

<style type="less" scoped>


@media screen and (max-width: 500px){
  .table {
    display: inline-block;
    margin-top: 25px;
    width: 90%;
  }
}
@media screen and (min-width: 500px){
  .table {
    width: 500px;
    margin: 25px 25px;
    display: inline-block;
  }
}
</style>

<template>
  <div class="history">
    <a-table
        bordered
        class="table"
        :columns="columns"
        :data-source="data"
        :loading="loading">
      <span slot="num" slot-scope="text, record, index">
        {{ parseInt(index)+1 }}
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
      this.$axios.get('https://blog.rhyland.top/chicken/query.php?type=list')
          .then(function (response) {
            that.loading = true
            that.data = response.data
            that.loading = false
          }).catch(function (error){})
    },
    onDelete(key) {
      const that = this
      this.$axios.get('https://blog.rhyland.top/chicken/query.php?type=delete&id='+key)
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

<style type="less">
.table {
  margin: 25px 25px;
}
</style>
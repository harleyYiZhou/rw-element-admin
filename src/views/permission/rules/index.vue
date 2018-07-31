<template>
    <div class="app-container">
        <div class="filter-container">
            <el-input style="width: 200px;" class="filter-item" placeholder="请输入内容" v-model="listQuery.title">
            </el-input>
            <el-button class="filter-item" type="primary" icon="el-icon-search">{{$t('table.search')}}</el-button>
            <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="permissionDialog=true">{{$t('table.add')}}</el-button>
            <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-delete">{{$t('table.delete')}}</el-button>
        </div>

        <template>
            <el-table :data="tableData" style="width: 100%" border>
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column :label="$t('permission.ruleName')" prop="ruleName">
                </el-table-column>
                <el-table-column :label="$t('permission.options')">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" circle  @click="permissionDialog=true"></el-button>
                        <el-button type="danger" icon="el-icon-delete" circle></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>

        <div class="pagination-container">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
        <el-dialog :title="$t('permission.user')" :visible.sync="permissionDialog" width="50%">
            <el-form :rules="rules" ref="ruleForm" :model="ruleForm" label-width="80px" style='width: 400px; margin-left:10px;'>
                <el-form-item prop="ruleName" :label="$t('permission.ruleName')">
                    <el-input v-model="ruleForm.ruleName"></el-input>
                </el-form-item>
                <el-form-item prop="className" :label="$t('permission.className')">
                    <el-input v-model="ruleForm.className"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
export default {
  data() {
    return {
      permissionDialog: false,
      tableData: [
        {
          ruleName: '规则1'
        },
        {
          ruleName: '规则2'
        },
        {
          ruleName: '规则3'
        }
      ],
      listQuery: {
        page: 1,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      ruleForm: {
        ruleName: '',
        className: ''
      },
      rules: {
        ruleName: [
          {
            required: true,
            message: this.$t('permission.rules.enterName'),
            trigger: 'blur'
          },
          {
            min: 2,
            max: 10,
            message: this.$t('permission.rules.nameSize'),
            trigger: 'blur'
          }
        ],
        className: [
          {
            required: true,
            message: this.$t('permission.rules.enterName'),
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    total: function() {
      return this.tableData.length
    }
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedCities = val ? this.cities : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length
    },
    // 每页个数发生改变时触发
    handleSizeChange: function() {},
    // 当前页数发生改变时触发
    handleCurrentChange: function() {}
  }
}
</script>

<style lang="scss" scoped>
</style>

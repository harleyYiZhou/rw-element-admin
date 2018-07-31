<template>
    <div class="app-container">
        <div class="filter-container">
            <el-input style="width: 200px;" class="filter-item" placeholder="请输入内容" v-model="listQuery.title">
            </el-input>
            <el-select clearable style="width: 90px" class="filter-item" v-model="listQuery.important">
                <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item">
                </el-option>
            </el-select>
            <el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.type">
                <el-option v-for="item in  calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key">
                </el-option>
            </el-select>
            <el-select style="width: 140px" class="filter-item" v-model="listQuery.sort">
                <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
                </el-option>
            </el-select>
            <el-button class="filter-item" type="primary" icon="el-icon-search">{{$t('table.search')}}</el-button>
            <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="userDialog=true">{{$t('table.add')}}</el-button>
            <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-delete">{{$t('table.delete')}}</el-button>
        </div>

        <template>
            <el-table :data="tableData" style="width: 100%" border>
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column :label="$t('permission.userName')" width="180" prop="userName">
                </el-table-column>
                <el-table-column :label="$t('permission.email')" width="180" prop="email">
                </el-table-column>
                <el-table-column :label="$t('permission.createdAt')" prop="createdAt">
                </el-table-column>
                <el-table-column :label="$t('permission.status')">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('permission.role')" prop="role">
                </el-table-column>
                <el-table-column :label="$t('permission.options')">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" circle @click="userDialog=true"></el-button>
                        <el-button type="success" icon="el-icon-check" circle></el-button>
                        <el-button type="danger" icon="el-icon-delete" circle></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>

        <div class="pagination-container">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
        <el-dialog :title="$t('permission.user')" :visible.sync="userDialog" width="50%">
            <el-form :rules="rules" ref="ruleForm" :model="userForm" label-width="80px" style='width: 400px; margin-left:10px;'>
                <el-form-item prop="userName" :label="$t('permission.userName')">
                    <el-input v-model="userForm.userName"></el-input>
                </el-form-item>
                <el-form-item :label="$t('permission.password')" prop="password">
                    <el-input :type="passwordType" v-model="userForm.password"></el-input>
                    <span class="show-pwd" @click="showPwd">
                        <svg-icon icon-class="eye" />
                    </span>
                </el-form-item>
                <el-form-item :label="$t('permission.email')" prop="email">
                    <el-input placeholder="请输入内容" v-model="userForm.email">
                    </el-input>
                </el-form-item>
                <el-form-item :label="$t('permission.role')">
                    <el-select v-model="userForm.role" multiple placeholder="请选择角色">
                        <el-option v-for="item in role" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('permission.isActivate')">
                    <el-switch v-model="userForm.activate" :active-text="$t('permission.inactivate')" :inactive-text="$t('permission.activate')">
                    </el-switch>
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
    const validateEmail = (rule, value, callback) => {
      var reg = new RegExp(
        '^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$'
      )
      if (!reg.test(value)) {
        callback(new Error('email不符合规范'))
      } else {
        callback()
      }
    }
    return {
      importanceOptions: [],
      calendarTypeOptions: [],
      sortOptions: [],
      listQuery: {
        page: 1,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      tableData: [
        {
          userName: 'admin',
          email: 'harley@163.com',
          createdAt: '2016-05-04',
          status: 'published',
          role: 'superAdmin'
        },
        {
          userName: 'harley',
          email: 'harley@163.com',
          createdAt: '2016-05-04',
          status: 'draft',
          role: 'admin'
        },
        {
          userName: 'calvin',
          email: 'calvin@163.com',
          createdAt: '2016-05-04',
          status: 'deleted',
          role: 'user'
        }
      ],
      userForm: {
        userName: '',
        password: '',
        email: '',
        activate: false,
        role: []
      },
      role: [
        {
          label: '超级管理员',
          value: '1'
        },
        {
          label: '管理员',
          value: '2'
        },
        {
          label: '用户',
          value: '3'
        }
      ],
      rules: {
        userName: [
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
        password: [
          {
            required: true,
            message: this.$t('permission.rules.enterPassword'),
            trigger: 'blur'
          },
          {
            min: 6,
            max: 16,
            message: this.$t('permission.rules.passwordSize'),
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: this.$t('permission.rules.enterEmail'),
            trigger: 'blur'
          },
          { required: true, trigger: 'blur', validator: validateEmail }
        ]
      },
      // 弹窗
      userDialog: false,
      passwordType: 'password'
    }
  },
  computed: {
    total: function() {
      return this.tableData.length
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    // 显示密码
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    // 获取表单数据，并得出总数total
    getList() {
      this.total = this.tableData.length
    },
    // 每页个数发生改变时触发
    handleSizeChange: function() {},
    // 当前页数发生改变时触发
    handleCurrentChange: function() {},
    // 提交表单校验
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  }
}
</script>

<style lang="scss" scoped>
.el-pagination {
  text-align: right;
}
.show-pwd {
  position: absolute;
  right: 10px;
  top: 0px;
  font-size: 16px;
  color: #666;
  cursor: pointer;
  user-select: none;
}
</style>

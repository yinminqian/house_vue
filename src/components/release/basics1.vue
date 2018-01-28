<template>
  <div>
    <basics_bar></basics_bar>
    <el-row>
      <el-col :span="24">
        <el-progress :text-inside="true" :stroke-width="18" :percentage="20"></el-progress>
        <!--<el-steps :active="active" finish-status="success">-->
        <!--<el-step title="步骤 1"></el-step>-->
        <!--<el-step title="步骤 2"></el-step>-->
        <!--<el-step title="步骤 3"></el-step>-->
        <!--</el-steps>-->


      </el-col>
      <el-col :span="12">
        <div style="text-align: center">
          <h1>您打算发布什么样的房源</h1>
          <div class="input-size">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="input_size">
            <el-select v-model="value" placeholder="请选择">
              <br>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>

          <div class="input_size">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>


        </div>


      </el-col>
      <el-col :span="12">

        <el-alert class="alert_warn"
                  title="警告提示的文案"
                  type="warning"
                  description="文字说明文字说明文字说明文字说明文字说明文字说明"
                  :closable="false"
                  show-icon>
        </el-alert>


      </el-col>


    </el-row>


  </div>
</template>


<script>
  import basics_bar from './basics_bar'

  export default ({
    name: 'basics1',
    components: {
      basics_bar: basics_bar,
    },

  })
</script>


<style scoped>
  .alert_warn {
    height: 300px;
    width: 300px;
  }

  .input_size {
    margin: 10px;
  }
</style>

<template>
  <div class="dashboard">

<!--第一部分-->
    <el-row>
      <el-col :span="8">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix card-header">
            <img src="../../assets/icon_images/img1.png" style="width: 50px; height: auto;" alt="">
            <div class="content">
              <span>今日订单总数</span>
              <div class="number">200</div>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix card-header">
            <img src="../../assets/icon_images/img2.png" style="width: 50px; height: auto;" alt="">
            <div class="content">
              <span>今日销售总额</span>
              <div class="number">¥5000.00</div>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix card-header">
            <img src="../../assets/icon_images/img3.png" style="width: 50px; height: auto;" alt="">
            <div class="content">
              <span>昨日销售总额</span>
              <div class="number">¥5000.00</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

<!--第二部分-->
    <el-row>
      <el-col :span="24">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>待处理事务</span>
          </div>
          <el-table :data="tasksData">
            <el-table-column prop="task" label="任务"></el-table-column>
            <el-table-column prop="count" label="数量"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>

<!--第三部分-->
    <el-row>
      <el-col :span="12">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>商品总览</span>
          </div>
          <el-row>
            <el-col :span="6" style="padding: 15px">
              <div class="top">100</div>
              <div>已下架</div>
            </el-col>
            <el-col :span="6" style="padding: 15px">
              <div class="top">400</div>
              <div>已上架</div>
            </el-col>
            <el-col :span="6" style="padding: 15px">
              <div class="top" style="margin-left: 20px">50</div>
              <div>库存紧张</div>
            </el-col>
            <el-col :span="6" style="padding: 15px">
              <div class="top" style="margin-left: 15px">500</div>
              <div>全部商品</div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>用户总览</span>
          </div>
          <el-row>
            <el-col :span="6" style="padding: 15px">
              <div class="top" style="margin-left: 15px">100</div>
              <div>今日新增</div>
            </el-col>
            <el-col :span="6" style="padding: 15px">
              <div class="top" style="margin-left: 10px">100</div>
              <div>昨日新增</div>
            </el-col>
            <el-col :span="6" style="padding: 15px">
              <div class="top" style="margin-left: 0px">1000</div>
              <div>本月新增</div>
            </el-col>
            <el-col :span="6" style="padding: 15px">
              <div class="top" style="margin-left: 5px">5000</div>
              <div>会员总数</div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>


<!--第四部分-->
    <el-row>
      <el-col :span="24">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>订单统计</span>
          </div>
          <div>
            <el-row>
              <el-col :span="12">
                <div data-v-36a2686f="">
                  <div data-v-36a2686f="" style="color: rgb(144, 147, 153); font-size: 14px;">本月订单总数</div>
                  <div data-v-36a2686f="" style="color: rgb(96, 98, 102); font-size: 24px; padding: 10px 0px;">10000</div>
                  <div data-v-36a2686f="">
                    <span data-v-36a2686f="" class="color-success" style="font-size: 14px;color: green">+10%</span>
                    <span data-v-36a2686f="" style="color: rgb(192, 196, 204); font-size: 14px;margin-left: 6px">同比上月</span>
                  </div>
                </div>

                <div data-v-36a2686f="" style="margin-top: 20px;">
                  <div data-v-36a2686f="" style="color: rgb(144, 147, 153); font-size: 14px;">本周订单总数</div>
                  <div data-v-36a2686f="" style="color: rgb(96, 98, 102); font-size: 24px; padding: 10px 0px;">1000</div>
                  <div data-v-36a2686f=""><span data-v-36a2686f="" class="color-danger" style="font-size: 14px;color: red">-10%</span>
                    <span data-v-36a2686f="" style="color: rgb(192, 196, 204); font-size: 14px;margin-left: 6px">同比上周</span>
                  </div>
                </div>

                <div data-v-36a2686f="" style="margin-top: 20px;">
                  <div data-v-36a2686f="" style="color: rgb(144, 147, 153); font-size: 14px;">本月销售总额</div>
                  <div data-v-36a2686f="" style="color: rgb(96, 98, 102); font-size: 24px; padding: 10px 0px;">100000</div>
                  <div data-v-36a2686f=""><span data-v-36a2686f="" class="color-success" style="font-size: 14px;color: green">+10%</span>
                    <span data-v-36a2686f="" style="color: rgb(192, 196, 204); font-size: 14px;margin-left: 6px">同比上月</span>
                  </div>
                </div>

                <div data-v-36a2686f="" style="margin-top: 20px;">
                  <div data-v-36a2686f="" style="color: rgb(144, 147, 153); font-size: 14px;">本周销售总额</div>
                  <div data-v-36a2686f="" style="color: rgb(96, 98, 102); font-size: 24px; padding: 10px 0px;">50000</div>
                  <div data-v-36a2686f="">
                    <span data-v-36a2686f="" class="color-danger" style="font-size: 14px;color: red">-10%</span>
                    <span data-v-36a2686f="" style="color: rgb(192, 196, 204); font-size: 14px;margin-left: 6px">同比上周</span>
                  </div>
                </div>

              </el-col>

              <el-col :span="12">
                <div class="block">
                  <el-date-picker
                    v-model="value2"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions">
                  </el-date-picker>
                </div>
              </el-col>

              <!-- ECharts 图表容器 -->
              <div ref="chart" style="height: 400px; margin-top: 50px;margin-left: 100px"></div>

            </el-row>

          </div>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import * as echarts from 'echarts';
  export default {
    data() {
      return {
        tasksData: [
          { task: '待付款订单', count: '(10)' },
          { task: '已完成订单', count: '(10)' },
          { task: '待发货订单', count: '(10)' },
          { task: '新缺货登记', count: '(10)' },
          { task: '已发货订单', count: '(10)' },
          { task: '待处理退货订单', count: '(10)' },
          { task: '待确认收货订单', count: '(10)' },
          { task: '广告位即将到期', count: '(10)' }
        ],
        value2: '',
        pickerOptions: {}
      };
    },
    mounted() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(this.$refs.chart);
      // 设置图表配置项
      this.chart.setOption({
        title: {
          // text: '订单统计图表'
        },
        tooltip: {},
        xAxis: {
          data: ["本月", "本周", "上月", "上周"]
        },
        yAxis: {},
        series: [{
          name: '订单数',
          type: 'bar',
          data: [10000, 1000, 9000, 1100]
        }]
      });
    }
  };
</script>

<style scoped>
  .dashboard {
    padding: 20px;
  }

  .box-card {
    margin-bottom: 20px;
  }
  .clearfix::after {
    content: "";
    display: block;
    clear: both;
  }

  .card-header {
    display: flex;
    align-items: center;
  }

  .content {
    flex-grow: 1;
    margin-left: 20px;
  }

  .number {
    font-size: 20px;
    font-weight: bold;
    margin-top: 10px;
  }

  .clearfix {
    color: #606266;
    padding: 15px 20px;
    background: #f2f6fc;
    font-weight: 700;
  }

  .box-card {
    margin-bottom: 10px;
  }

  .top {
    font-size: 25px;
    color: #f17070;
    margin-bottom: 10px;
  }

</style>




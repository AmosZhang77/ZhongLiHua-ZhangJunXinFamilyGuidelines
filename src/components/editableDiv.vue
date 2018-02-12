<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="tableBox">
      <table>
        <tr>
          <th>
            <div>钟立华认可并单独执行</div>
            <div>日期</div>
          </th>
          <th>认可到共同&gt;&gt;</th>
          <th>
            <div>共同认可并执行</div>
            <div>日期</div>
          </th>
          <th>&lt;&lt;认可到共同</th>
          <th>
            <div>张君歆认可并单独执行</div>
            <div>日期</div>
          </th>
          <th></th>
        </tr>
        <tr v-for="(item,index) in saveData">
          <td>
            <div><input type="text" v-model="item.contentL"></div>
            <div><span>日期：</span><input type="text" v-model="item.dateL"></div>
          </td>
          <td>
            <button @click="LAddC(index)">认可到共同&gt;&gt;</button>
          </td>
          <td>
            <div><input type="text" v-model="item.content"></div>
            <div><span>日期：</span><input type="text" v-model="item.date"></div>
          </td>
          <td>
            <button @click="RAddC(index)">&lt;&lt;认可到共同</button>
          </td>
          <td>
            <div><input type="text" v-model="item.contentJ"></div>
            <div><span>日期：</span><input type="text" v-model="item.dateJ"></div>
          </td>
          <td>
            <button @click="returnThisDate(index)">恢复本条编辑</button>
          </td>
        </tr>
      </table>
    </div>
    <div>
      <button @click="returnThisDate(index)">保存到</button>
      <input type="text" v-model="location">
    </div>
  </div>
</template>

<script>
  var FileSaver = require('file-saver');
export default {
  name: 'unitTest',
  data () {
    var saveData = [
      {
        contentL: '1234',
        dateL: '2018-02-12',
        content: '12345',
        date: '2018-02-12',
        contentJ: '12346',
        dateJ: '2018-02-12',
      },
      {
        contentL: '1234',
        dateL: '2018-02-12',
        content: '12345',
        date: '2018-02-12',
        contentJ: '12346',
        dateJ: '2018-02-12',
      },
      {
        contentL: '1234',
        dateL: '2018-02-12',
        content: '12345',
        date: '2018-02-12',
        contentJ: '12346',
        dateJ: '2018-02-12',
      }
    ]
    var saveDataOri = [].concat(JSON.parse(JSON.stringify(saveData)))
    return {
      msg: 'cookingChoose-APP',
      saveData: saveData,
      saveDataOri: saveDataOri,
      location: 'saveDataOri',
    }
  },
  mounted: function () {
    this.dataInit()
  },
  methods: {
    LAddC: function (index) {
      this.saveData[index].content = this.saveData[index].contentL
      this.saveData[index].date = this.saveData[index].dateL
    },
    RAddC: function (index) {
      this.saveData[index].content = this.saveData[index].contentJ
      this.saveData[index].date = this.saveData[index].dateJ
    },
    returnThisDate: function (index) {
      this.saveData[index].contentL = this.saveDataOri[index].contentL
      this.saveData[index].content = this.saveDataOri[index].content
      this.saveData[index].contentJ = this.saveDataOri[index].contentJ
      this.saveData[index].dateL = this.saveDataOri[index].dateL
      this.saveData[index].date = this.saveDataOri[index].date
      this.saveData[index].dateJ = this.saveDataOri[index].dateJ
    },
    saveText: function () {
      var content = '这是直接使用HTML5进行导出的'
      var blob = new Blob([content], {type: 'text/plain;charset=utf-8'})
      FileSaver.saveAs(blob, 'file.txt') // saveAs(blob,filename)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
</style>
<style lang="scss" scoped>
  h1 {
    margin-top: 200px;
  }

  .r {
    height: 20px;
    background: #dddddd;
    width: 400px;
    margin: 0 auto;
  }

  table {
    td{
      div{
        text-align: right;
      }
    }
    /*rule: all;*/
    margin: 0 auto;
    border: 1px solid black;
    tr {
      td:nth-of-type(1) {
      }
      td:nth-of-type(2) {
      }
      td:nth-of-type(3) {
      }
      th:nth-of-type(1) {
      }
      th:nth-of-type(2) {
      }
      th:nth-of-type(3) {
      }
    }

    td, th {
      border: 1px solid black;
    }
  }

  .tableBox {
    font-size: 12px;
    font-weight: normal;
  }
</style>

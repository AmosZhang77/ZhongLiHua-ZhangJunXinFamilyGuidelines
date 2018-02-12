<template>
  <div class="hello">
    <h3>{{ msg }}</h3>
    <div class="tableBox">
      <table>
        <tr>
          <th>序号</th>
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
          <th><button @click="returnAllDate">回复全部编辑</button></th>
        </tr>
        <tr v-for="(item,index) in saveData">
          <td>{{index+1}}</td>
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
            <button @click="delThisDate(index)">删除</button>
          </td>
        </tr>
      </table>
    </div>
    <div class="inputBox">
      <input type="file" @change="fileReady($event)"><button @click="importFile">导入文件选择的文件并修改</button>
    </div>
    <div class="inputBox">
      <button @click="saveText">将修改的文件保存到：文件名.txt</button>
      <input type="text" v-model="fileName"><span>.txt 文件</span>
    </div>
  </div>
</template>

<script>
var FileSaver = require('file-saver')
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
      msg: 'familyGuidelines-APP',
      saveData: saveData,
      saveDataOri: saveDataOri,
      fileName: '',
      importContent: [],
    }
  },
  mounted: function () {
    // this.dataInit()
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
    returnAllDate: function () {
      for (let i = 0; i < this.saveDataOri.length; i++) {
        for (let index in this.saveDataOri[i]) {
          this.saveData[i][index] = this.saveDataOri[i][index]
        }
      }
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
      var date = new Date()
      var dateStr = ''
      if (this.fileName === '' || this.fileName === ' ') {
        dateStr = date.getFullYear() + '_' + (date.getMonth() + 1) + '_' + date.getDate() + '_' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
      } else {
        dateStr = this.fileName + '_' + date.getFullYear() + '_' + (date.getMonth() + 1) + '_' + date.getDate() + '_' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
      }
      console.log(dateStr)
      var content = JSON.stringify(this.saveData)
      var blob = new Blob([content], {type: 'text/plain;charset=utf-8'})
      FileSaver.saveAs(blob, dateStr + '.txt') // saveAs(blob,filename)
    },
    fileReady: function (e) {
      var _this = this
      var selectedFile = e.target.files[0] // 获取读取的File对象
      var name = selectedFile.name // 读取选中文件的文件名
      var size = selectedFile.size // 读取选中文件的大小
      console.log('文件名:' + name + '大小：' + size)

      var reader = new FileReader() // 这里是核心！！！读取操作就是由它完成的。
      reader.readAsText(selectedFile) // 读取文件的内容

      reader.onload = function () {
        // var obj = {'data': this.result}
        // console.log('obj', obj)
        _this.importContent = this.result // 当读取完成之后会回调这个函数，然后此时文件的内容存储到了result中。直接操作即可。
        console.log(_this.importContent)
      }
    },
    importFile: function () {
      console.log('importContent', this.importContent)
      var saveDataOriNew = [].concat(JSON.parse(this.importContent))
      console.log('saveDataOriNew', saveDataOriNew)
      for (let i = 0; i < saveDataOriNew.length; i++) {
        for (let index in saveDataOriNew[i]) {
          this.saveDataOri[i][index] = saveDataOriNew[i][index]
        }
      }
      var saveDataNew = [].concat(JSON.parse(this.importContent))
      for (let i = 0; i < saveDataNew.length; i++) {
        for (let index in saveDataNew[i]) {
          this.saveData[i][index] = saveDataNew[i][index]
        }
      }
    },
    delThisDate: function (index) {
      this.saveData.splice(index, 1)
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
  .inputBox{
    height: 30px;
    padding: 10px 0 0 0;
  }
</style>

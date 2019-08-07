<template>
  <v-container grid-list-md text-center mt-3 mb-3>
    <v-layout wrap>
      <v-flex xs12 mb-1 style="text-align: center;">
        <h1>대일이형 선물</h1>
      </v-flex>
      <v-flex xs8>
        <input type="file" v-on:change="readFile" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"/>
        <div id="kakaoMap">

        </div>
      </v-flex>
      <v-flex xs4>
        <table v-if="excelData.Sheet1 != null">
          <thead>
            <tr>
              <th class="_idx">Index</th>
              <th class="_tb">장소명</th>
              <th class="_tb">위치</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in excelData.Sheet1" :name="item[0]" :key="item[0]">
              <td class="_idx">{{item[0]}}</td>
              <td class="_tb">{{item[1]}}</td>
              <td class="_tb">{{item[2]}}</td>
            </tr>
          </tbody>
        </table>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=068cbd046736afa28819c0140c26020f&libraries=services"></script>
<script>
import XLSX from 'xlsx'
export default {
  name: 'DY',
  data () {
    return {
      excelData: '',
      excelGeo: []
    }
  },
  mounted () {
    this.isDY()
  },
  methods: {
    isDY () {
      var isOK = prompt('비밀번호를 입력하세요.', '')
      if(isOK === '나는야vs1')
        return;
      else
        this.$router.push('/')
    },
    readFile (event) {
      const file = event.target.files[0]
      const reader = new FileReader()
      let tmpResult = {}
      reader.onload = (e) => {
        let data = e.target.result
        data = new Uint8Array(data)
        let excelFile = XLSX.read(data, { type: 'array' })
        excelFile.SheetNames.forEach(function (sheetName) {
          const roa = XLSX.utils.sheet_to_json(excelFile.Sheets[sheetName], { header: 1 })
          if (roa.length) tmpResult[sheetName] = roa
        })
        this.excelData = tmpResult
      }
      reader.readAsArrayBuffer(file)
      this.searchLatLng()
    },
    searchLatLng () {
      var geocoder = new kakao.maps.services.Geocoder()
      var callback = function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          console.log(result)
        }
      }
      for (var x in this.excelData.Sheet1) {
        var geo = geocoder.addressSearch(x[2], callback)
        console.log(geo)
        this.excelGeo.push(geo)
      }
    }
  }
}
</script>
<style>
  ._tb {
    text-align: center;
  }
  ._idx{
    text-align: left;
    padding-left: 10px;
    width: 10%;
  }
  table {
    width: 100%;
    border: 1px solid black;
    border-collapse: collapse;
  }
  th, td {
    border: 1px solid black;
  }
  th {
    background-color: aqua
  }
</style>

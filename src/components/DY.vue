<template>
  <v-container grid-list-md text-center mt-3 mb-3>
    <v-layout wrap>
      <v-flex xs12 mb-1 style="text-align: center;">
        <h1>대일이형 선물</h1>
      </v-flex>
      <v-flex xs8>
        <input type="file" v-on:change="readFile" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"/>
        <div id="staticMap">

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
          <tbody id="excelTbody" ref="excelTbody">
            <tr v-for="item in excelData.Sheet1" :name="item[0]" :key="item[0]">
              <td class="_idx">{{item[0]}}</td>
              <td class="_tb">{{item[1]}}</td>
              <td class="_tb" :id="item[0]" :ref="item[0]">{{item[2]}}</td>
            </tr>
          </tbody>
        </table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import XLSX from 'xlsx'
export default {
  name: 'DY',
  data () {
    return {
      excelData: ''
    }
  },
  mounted () {
    this.isDY()
  },
  methods: {
    isDY () {
      var isOK = prompt('비밀번호를 입력하세요.', '')
      if (isOK !== '1234') { this.$router.push('/') }
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
        this.searchLatLng(tmpResult)
      }
      reader.readAsArrayBuffer(file)
      // this.searchLatLng()
    },
    searchLatLng (excel) {
      // eslint-disable-next-line
      var geocoder = new kakao.maps.services.Geocoder()
      var cnt = excel.Sheet1.length
      var markers = []
      var marker = {}
      for (var i = 0; i < cnt; i++) {
        geocoder.addressSearch(excel.Sheet1[i][2], function (result, status) {
          // eslint-disable-next-line
          if (status === kakao.maps.services.Status.OK) {
            var x = result[0]['road_address']['x']
            var y = result[0]['road_address']['y']
            // eslint-disable-next-line
            marker.position = new kakao.maps.LatLng(x, y)
            marker.text = excel.Sheet1[i][0]
            markers.push(marker)
          }
        })
      }
      var jsonMarker = JSON.stringify(markers)
      console.log(jsonMarker)
      drawMap(jsonMarker)
    }
  }
}
function drawMap (markers) {
  /* eslint-disable */
  var staticMapContainer = document.getElementById('staticMap'),
    staticMapOption = {
      level : 3,
      marker : markers
    }
  var staticMap = new kakao.maps.StaticMap(staticMapContainer, staticMapOption)
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

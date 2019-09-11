<template>
  <v-container grid-list-md text-center mt-3 mb-3>
    <v-layout wrap>
      <v-flex xs12 mb-1 style="text-align: center;">
        <h1>대일이형 선물</h1>
      </v-flex>
      <v-flex xs12>
        <input type="file" v-on:change="readFile" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"/>
        <div id="map" style="width:100%;height:1000px;"></div>
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
      var isOK = prompt('나의 이름은?', '')
      if (isOK !== 'thdansghl') { this.$router.push('/') }
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
      /* eslint-disable */
      var geocoder = new kakao.maps.services.Geocoder()
      var cnt = excel.Sheet1.length
      var positions = []
      var mapContainer = document.getElementById('map');
      var mapOption = {
          center: new kakao.maps.LatLng(37.450701, 126.570667),
          level: 12
      }
      var map = new kakao.maps.Map(mapContainer, mapOption)
      for (var i = 0; i < cnt; i++) {
        positions[i] = excel.Sheet1[i][2]
      }
      positions.forEach(function (addr, index) {
        geocoder.addressSearch(addr, function (result, status) {
          if (status === kakao.maps.services.Status.OK) {
            var coords = new kakao.maps.LatLng(result[0].y, result[0].x)
            // var marker = new kakao.maps.Marker({
            //   map: map,
            //   position: coords
            // })
            // var infowindow = new kakao.maps.InfoWindow({
            //   content: '<div style="width:50px;">' + index + '</div>',
            //   disableAutoPan: true
            // })
            // infowindow.open(map, marker);
            var tmp = index + 1;
            var customOverlay = new kakao.maps.CustomOverlay({
              map: map,
              content: '<div style="background-color:white; border:2px solid red; font-weight:bold">' + tmp + '</div>',
              position: coords
            })
            customOverlay.setMap(map)
          }
        })
      })
    }
  }
}
// function drawMap (markers) {
//   /* eslint-disable */
//   var staticMapContainer = document.getElementById('staticMap'),
//     staticMapOption = {
//       level : 3,
//       marker : markers
//     }
//   var staticMap = new kakao.maps.StaticMap(staticMapContainer, staticMapOption)
// }
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

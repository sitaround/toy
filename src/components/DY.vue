<template>
  <v-container grid-list-md text-center mt-3 mb-3>
    <v-layout wrap>
      <v-flex xs-12 lg-12 mb-1 style="text-align: center;">
        <h1>대일이형 선물</h1>
      </v-flex>
      <v-flex xs-12 lg-12>
        <input type="file" v-on:change="readFile" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"/>
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
      if (!sessionStorage.isOK) {
        var isOK = prompt('나의 이름은?', '')
        if (isOK !== 'thdansghl') { this.$router.push('/') } else { sessionStorage.isOK = true }
      }
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
        this.findLatLng(tmpResult)
      }
      reader.readAsArrayBuffer(file)
    },
    findLatLng (excel) {
      /* eslint-disable */
      var geocoder = new kakao.maps.services.Geocoder()
      var positions = []
      var latlng = []
      for (var i = 0; i < excel.Sheet1.length; i++){
        positions[i] = excel.Sheet1[i][2];
      }
      /*
      * 1. busy waiting => while(!cnt)
      * 2. promise.all  => async await 가능
      */
      var promises = [];
      function getAddressSearch(addr, index) {
        return new Promise((resolve) => {
          //비동기 시작
          geocoder.addressSearch(addr, function (result, status) {
            if (status === kakao.maps.services.Status.OK) {
              var xy = {}
              xy.x = Number(result[0].x)
              xy.y = Number(result[0].y)
              latlng[index] = xy
            } else {
              alert(index+1 + "행의 주소를 다시 확인!!!!")
            }
            resolve();
          })
          //비동기 끝
        })
      }
      positions.forEach( function (addr, index) {
        // 비동기 코드
        promises.push(getAddressSearch(addr, index))
        // 비동기 코드 끝
      });
      Promise.all(promises).then(() => {this.drawMap(latlng)})
    },
    drawMap (latlng) {
      /* eslint-disable */
      var centerX = 0;
      var centerY = 0;
      for(var i in latlng){
        centerX += latlng[i].x
        centerY += latlng[i].y
      }
      centerX /= latlng.length
      centerY /= latlng.length
      var myWindow = window.open("", "_self")
      myWindow.document.write("<html><body><div id='map' style='width:100%; height:100%'></div></body></html>")
      var mapContainer = myWindow.document.getElementById('map')
      var mapOption = {
          center: new kakao.maps.LatLng(centerY, centerX),
          level: 5
      }
      var map = new kakao.maps.Map(mapContainer, mapOption)
      latlng.forEach(function(xy, index){
        var tmp = index+1
        var customOverlay = new kakao.maps.CustomOverlay({
          content: '<div style="font-size:12px; background-color:white; border:2px solid red; font-weight:bold; padding:1px">' + tmp + '</div>',
          position: new kakao.maps.LatLng(xy.y, xy.x),
          zIndex: latlng.length-tmp
        })
        customOverlay.setMap(map)
      })
    }
  }
}
</script>
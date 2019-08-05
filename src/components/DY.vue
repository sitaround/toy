<template>
  <v-layout mt-5 mb-5>
    <v-flex xs6>
      <input type="file" v-on:change="readFile" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"/>
      <div id="kakaoMap">

      </div>
    </v-flex>
    <v-flex xs6>
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
</template>
<script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=068cbd046736afa28819c0140c26020f&libraries=drawing"></script>
<script>
import XLSX from 'xlsx'
export default {
  name: 'DY',
  data () {
    return {
      excelData: '',
      curLat: '',
      curLong: ''
    }
  },
  mounted: function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.curLat = position.coords.latitude.toFixed(6)
        this.curLong = position.coords.longitude.toFixed(6)
      })
    }
    this.createMap()
  },
  methods: {
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
    createMap () {
      var container = document.getElementById('kakaoMap')
      var options = {
        center: new kakao.maps.LatLng(this.curLat, this.curLong),
        level: 3
      }
      var map = new kakao.maps.Map(container, options)
    },
    searchLatLng () {
      const baseURI = ''
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
    width: 70%;
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

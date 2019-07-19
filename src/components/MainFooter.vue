<template>
  <v-footer dark height="auto">
    <v-card flat tile class="indigo lighten-1 white--text text-xs-center">
      <v-card-text class="pb-0">
        <Weather v-bind:latitude=latitude v-bind:longitude=longitude></Weather>
      </v-card-text>
      <v-card-text class="white--text pt-0">
        <h1>간간히 Software Expert Academy 문제의 풀이와 리뷰, 알고리즘 문제를 풀면서 새로 알게 된 지식과 Effective Java 책을 공부하면서 알게 된 새로운 지식들을 심심할 때마다 포스팅하기 위한 블로그.</h1>
      </v-card-text>
      <v-card-actions class="grey darken-3 justify-center">
        &copy;2019 — <strong>MH</strong>
      </v-card-actions>
    </v-card>
  </v-footer>
</template>
<script>
import Weather from '@/components/Weather'
export default {
  name: 'MainFooter',
  data () {
    return {
      latitude: '37.566295',
      longitude: '126.977945'
    }
  },
  created () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = position.coords.latitude.toFixed(6)
        this.longitude = position.coords.longitude.toFixed(6)
      })
    }
  },
  components: {
    Weather
  }
}
</script>

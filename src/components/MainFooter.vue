<template>
  <v-footer dark height="auto">
    <v-card flat tile class="indigo lighten-1 white--text text-xs-center">
      <v-card-text class="pb-0">
        <Weather v-bind:latitude=latitude v-bind:longitude=longitude></Weather>
      </v-card-text>
      <v-card-text class="white--text pt-0">
        <h1>으아아아아아아아아아아아아ㅏ아아아아아아아아아아아아아아아아아아아아아아아아아아아안아아아아아아아아아아아아아ㅏ아아아아아아아아아아아아아아아아아아아아아아아아아아아안아</h1>
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

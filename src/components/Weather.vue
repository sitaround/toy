<template>
  <weatherWidget
    api-key="8183ddac5cfba86ddc36a59aed5b2d87"
    :latitude="latitude"
    :longitude="longitude"
    language="en"
    units="ca"
    hide-header>
  </weatherWidget>
</template>

<script>
import VueWeatherWidget from 'vue-weather-widget'
import 'vue-weather-widget/dist/css/vue-weather-widget.css'
export default {
  name: 'Weather',
  props: {
    latitude: String,
    longitude: String
  },
  components: {
    'weatherWidget': VueWeatherWidget
  }
}

</script>

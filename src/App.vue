<template>
  <v-app>
    <mainHeader/>
    <v-content>
      <router-view/>
    </v-content>
    <mainFooter/>
  </v-app>
</template>

<script>
import MainHeader from '@/components/MainHeader'
import MainFooter from '@/components/MainFooter'

export default {
  name: 'App',
  components: {
    'mainHeader': MainHeader,
    'mainFooter': MainFooter
  },
  data () {
    return {

    }
  }
}
</script>

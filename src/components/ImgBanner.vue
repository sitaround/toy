<template>
  <div>
    <v-img :src="imgSrc"
           aspect-ratio="1.7" style="height:100vh">
      <v-layout align-center justify-center row fill-height>
        <v-flex text-xs-center>
          <span class="text-shadow display-2 font-weight-light">
            <slot name="text"/>
          </span>
        </v-flex>
      </v-layout>
    </v-img>
  </div>
</template>

<script>

export default {
  name: 'ImgBanner',
  props: {
    imgSrc: { type: String },
    text: { type: String }
  },
  methods: {
  }
}
</script>

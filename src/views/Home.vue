<template>
  <div>
    <ImgBanner imgSrc="https://source.unsplash.com/random" class="mb-1">
      <div style="line-height:1.2em;" slot="text">Algorithm &amp; Effective Java</div>
    </ImgBanner>
  </div>
</template>
<script>
import ImgBanner from '@/components/ImgBanner'
export default {
  name: 'Home',
  components: {
    ImgBanner
  }
}
</script>

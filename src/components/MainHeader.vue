<template>
  <v-toolbar app dark fixed z-index='1000'>
    <v-toolbar-title id="_head" onclick="location.href='/'">MH's Blog</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn v-for="item in menu" :key="item.title" :to="item.link">{{item.title}}</v-btn>
      <v-btn @click="addBook"><v-icon>mdi-star</v-icon></v-btn>
    </v-toolbar-items>
    <v-menu class="hidden-md-and-up">
      <v-toolbar-side-icon slot="activator"><v-icon>mdi-dots-vertical</v-icon></v-toolbar-side-icon>
      <v-list dark>
        <v-list-tile v-for="item in menu" :key="item.title">
          <v-list-tile-content>
            <router-link :to="item.link" tag="v-list-tile-title">{{item.title}}</router-link>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script>
export default {
  name: 'main-header',
  data () {
    return {
      menu: [
        { title: 'Home', link: '/' },
        { title: 'Post', link: 'post' },
        { title: 'Portfolio', link: 'portfolio' }
      ]
    }
  },
  methods: {
    addBook () {
      alert('Ctrl + D를 누르면 즐겨찾기가 됩니다.')
    }
  }
}
</script>
<style>
  #_head:hover{
  cursor: pointer;
  box-shadow: 3px 3px 3px 3px black;
}

</style>

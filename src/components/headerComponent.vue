<template>
  <div id="headerComponent">
    <div id="nav">
      <div id="logo">
        <a href="https://algorithmwatch.org/"><img src="@/assets/aw-logo.svg"/></a>
      </div>
      <h2 v-if="lang=='en'">Automatically-generated MEPs</h2>
      <h2 v-if="lang=='de'">Automatisch generierte MEPs</h2>
      <div id="lang_box">
        <span @click="changeLang('en')" :class="(lang=='en'?'selected':'')">English</span>
        <span @click="changeLang('de')" :class="(lang=='de'?'selected':'')">German</span>
      </div>
    </div>
  </div>
</template>

<script>
//import store from '@/store'

export default {
  name: 'headerComponent',
  data(){
    return {
    
    }
  },
  props: {
  },
  computed: {
    lang(){
      return this.$route.params.lang
    },
    mpid(){
      return this.$route.params.mpid
    }
  },
  methods: {
    changeLang(lang){
      let params = this.$route.params
      params["lang"] = lang
      this.$router.push({ name: this.$route.name, params: params })
    }
  },

  watch:{
  },

  created(){
    console.log("headerComponent created")
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  
  #headerComponent{
    height: 95px;
    position: relative;
    #nav{
      position: relative;
      width: 90%;
      margin:0 5%;
      grid-area: logo;
      align-self: center;
      display: flex;
      flex-direction: row;
      align-items: start;
      padding: var(--gap) 0;
      #logo{
        margin-right: 50px;
      }
      #lang_box{
        position: absolute;
        right: 0;
        top:50%;
        transform:translate(0,-50%);
        span{
          margin-right: 15px;
          cursor: pointer;
          &.selected{
            color:red;
          }
        }
      }
    }
    &:after{
      content: "";
      display: block;
      height: 2px;
      background: linear-gradient(to right, #af140f, #e6a507, #247427, #22afe5, #493553, #af140f);
      position: absolute;
      width: 100%;
      bottom: 0;
      right: 0;
    }
  }

  @media (max-width: 800px) {
    
    #headerComponent{
      height: 120px;
      #nav{
        #lang_box{
          right: auto;
          left:50%;
          top:85px;
          transform:translate(-50%,0);
          span{
            margin-right: 15px;            
          }
        }
      }
    }
    
  }


</style>

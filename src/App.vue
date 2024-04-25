<template>
  <div id="app">

    <headerComponent v-if="embed!='embed'"></headerComponent>

    <div id="main_content" v-if="selectedCandidateData">
      <div v-show="isDraft" ref="draft" class="draft"></div>

      <div id="image_expand_container" v-if="expanded_image">
        <div id="image_expand_wrapper">
          <div id="close_button" @click="expanded_image=false">
            <div></div>
            <div></div>
          </div>
          <img :src="expanded_image_url"/>
        </div>
      </div>

      <div id="chapo" v-if="embed!='embed'">
        <span v-if="lang=='en'">We wanted to know how image generators interpreted the names of German candidates to the European Parliament. We prompted several services with the names. Here’s what we found.</span>
        <span v-if="lang=='de'">Wir wollten wissen, wie Bildgeneratoren die Namen deutscher Kandidaten für das Europaparlament interpretieren. Wir haben mehrere Dienste mit den Namen angefragt. Hier ist, was wir gefunden haben.</span>
      </div>

      <div id="candidate_selector">
        <div class="dropdown">
          <input type="text" class="dropdown-input" v-model="searchString" @input="filterOptions" placeholder="Type to search" @focus="focusInput()"><div class="dropdown-after" @click="focusInput()"></div>
          <div class="dropdown-menu" v-show="showDropdown">
            <div class="dropdown-menu-item" v-for="option,index in filtredCandidates" :key="index" @click="selectOption(option)">
              {{ option["first name"]}} {{ option["last name"]}}
            </div>
          </div>
        </div>

        <span v-if="lang=='en'"> as seen by image generators</span>
        <span v-if="lang=='de'"> wie von Bildgeneratoren gesehen</span>
      </div>

      <div id="presentation_container">
        <span id="presentation_text" v-if="lang=='en'">
          {{selectedCandidateData["first name"]}} {{selectedCandidateData["last name"]}} is a candidate for the European Parliament in June, on the list of {{selectedCandidateData["party"]}}. We asked three image generators to create images about 
          <span v-if="selectedCandidateData['pronoun']=='he/his'">him</span>
          <span v-else>her</span>.
        </span>

        <span id="presentation_text" v-if="lang=='de'">
          {{selectedCandidateData["first name"]}} {{selectedCandidateData["last name"]}} kandidiert im Juni für das Europaparlament auf der Liste von {{selectedCandidateData["party"]}}. Wir haben drei Bildgeneratoren zu 
          <span v-if="selectedCandidateData['pronoun']=='he/his'">seiner</span>
          <span v-else>ihrer</span>
          Amtszeit als Europaabgeordnete befragt, falls
          <span v-if="selectedCandidateData['pronoun']=='he/his'">er</span>
          <span v-else>sie</span>
           gewählt wird.
        </span>
      </div>

      
        <a v-if="lang=='en'&&embed!='embed'" href="https://algorithmwatch.org/en/donate/" class="donation_cta_container">
          <span v-if="lang=='en'&&embed!='embed'">Support AlgorithmWatch with a donation</span> 
        </a>

        <a v-if="lang=='de'" href="https://algorithmwatch.org/de/spenden/" class="donation_cta_container">
          <span>Unterstützen Sie AlgorithmWatch mit einer Spende</span> 
        </a>

      <div v-for="p,i in prompts_list" :key="i" class="prompt_content">

        <div class="prompt_wrapper">

          <p class="prompt_name" v-if="lang=='en'">

            "<b>{{selectedCandidateData["first name"]}} {{selectedCandidateData["last name"]}}</b> {{prompts[p]["en"]}}" according&nbsp;to&nbsp;:
            
          </p> 

          <p class="prompt_name" v-if="lang=='de'">
            "<b>{{selectedCandidateData["first name"]}} {{selectedCandidateData["last name"]}}</b> {{prompts[p]["de"]}}" entsprechend&nbsp;:
          </p> 

        </div>

        <div class="images_container">

          <div class="image_wrapper" v-for="u,i in imgUrls[p]" :key="i" @mouseenter="addClass" @mouseleave="removeClass" @click="expand_image(u)">

            <div class="model_name" v-if="i%2==0"><b>{{models_full[parseInt(i/2)]}}</b></div>

            <img v-if="i%2==0" :src="u" @error='imageUrlAlt' :alt='selectedCandidateData["first name"]+" "+selectedCandidateData["last name"]+" "+prompts[p]["en"]' />

            <img v-if="i%2==1" :src="u" @error='imageUrlAlt' :alt='selectedCandidateData["first name"]+" "+selectedCandidateData["last name"]+" "+prompts[p]["de"]' />

            <div class="image_hover">
              <span v-if="i%2==0">{{selectedCandidateData["first name"]}} {{selectedCandidateData["last name"]}} {{prompts[p]["en"]}}</span>
              <span v-if="i%2==1">{{selectedCandidateData["first name"]}} {{selectedCandidateData["last name"]}} {{prompts[p]["de"]}}</span>
            </div>  

          </div>
        </div>

      </div>

    </div>

  </div>
</template>

<script>

import headerComponent from './components/headerComponent.vue'
import store from '@/store'

export default {
  name: 'App',
  metaInfo:{
    meta:[
      { property: 'msapplication-TileImage', content: 'https://static.algorithmwatch.org/gfx/favicon-270x270.png' },
      { property: 'og:image', content: 'https://algorithmwatch.github.io/automatically-generated-politicians/share.png' },
      { property: 'og:title', content: "Picturing the Parliament: how AI portrays German political candidates"}
    ],
    link: [
      { rel: 'stylesheet', href: 'https://algorithmwatch.org/en/wp-content/themes/aw2020/aw.min.css?72' },
      { rel: 'icon', type: 'image/svg+xml', href: 'https://static.algorithmwatch.org/gfx/aw-logo-icon.svg' },
      { rel: "shortcut icon" , href:"https://static.algorithmwatch.org/gfx/favicon-32x32.png", type:"image/x-icon" },
      { rel: "apple-touch-icon", href:"https://static.algorithmwatch.org/gfx/favicon_57px.png" },
      { rel: "apple-touch-icon", sizes:"114x114", href:"https://static.algorithmwatch.org/gfx/favicon_114px.png" },
      { rel: "apple-touch-icon", sizes:"72x72", href:"https://static.algorithmwatch.org/gfx/favicon_72px.png" },
      { rel: "apple-touch-icon", sizes:"144x144", href:"https://static.algorithmwatch.org/gfx/favicon_144px.png" },
      { rel: "icon" , href:"https://static.algorithmwatch.org/gfx/favicon-32x32.png", sizes:"32x32" },
      { rel: "icon" , href:"https://static.algorithmwatch.org/gfx/favicon-192x192.png", sizes:"192x192" },
      { rel: "apple-touch-icon" , href:"https://static.algorithmwatch.org/gfx/favicon-180x180.png" }
    ]
  },
  data(){
    return{
      baseurl: process.env.NODE_ENV === 'production'
      ? '/automatically-generated-politicians/'
      : '/',
      candidates:[],
      isDraft: true,
      candidates_url:[],
      filtredCandidates:[],
      showDropdown: false,
      searchString:'',
      selectedCandidate:"",
      selectedItem:"Terry_Reintke",
      imgUrls:{
        "speech":[],
        "hospital":[],
        "dinner":[],
        "market":[]
      },
      prompts_list:["speech","hospital","dinner","market"],
      prompts:{
        "speech":{
          "en":"gives a speech to crowd",
          "de":"hält eine Rede vor einer Menschenmenge"
        },
        "hospital":{
          "en":"visits a hospital as a member of the European Parliament",
          "de":"besucht ein Krankenhaus als Mitglied des Europäischen Parlaments"
        },
        "dinner":{
          "en":"is having dinner with staff",
          "de":"beim Abendessen mit Mitarbeitenden"
        },
        "market":{
          "en":"visits citizens in a market during a campaigning event",
          "de":"besucht Bürgerinnen und Bürger auf einem Markt während einer Wahlkampfveranstaltung"
        },

      },
      models:["dalle","stable","midjourney"],
      models_full:["Dall-E","Stable Diffusion","MidJourney"],
      expanded_image:false,
      expanded_image_url:"",
      download_image_url:"",
      IGModal:false
    }
  },
  components: {
    headerComponent
  },

  computed: {
    dataImport() {
      return store.state.endImport
    },
    lang(){
      return this.$route.params.lang
    },
    mpid(){
      return this.$route.params.mpid
    },
    embed(){
      return this.$route.params.embed
    },
    selectedCandidateData(){
      return this.candidates.find(obj => obj.URL_ID === this.selectedCandidate)
    }
  },

  methods:{

    checkCandidateUrl(){
      var self = this
      if(this.candidates_url.includes(this.mpid)){
        this.selectedCandidate = this.mpid
        this.searchString = this.candidates.find(obj => obj.URL_ID === self.mpid)["first name"]+" "+this.candidates.find(obj => obj.URL_ID === self.mpid)["last name"]
        this.selectedItem = this.mpid
        this.buildImgUrlsTab()

      }else{
        let params = this.$route.params
        params["mpid"] = "Terry_Reintke"
        this.$router.push({ name: this.$route.name, params: params })
      }
    },

    buildImgUrlsTab(){

      var self = this
      this.imgUrls = {
        "speech":[],
        "hospital":[],
        "dinner":[],
        "market":[]
      }
      
      Object.keys(this.prompts).forEach(function(p){
        self.models.forEach(function(m){
          var url_en = self.baseurl + 'img/'+self.selectedCandidateData['ID']+'-'+self.selectedCandidateData['last name']+'-'+m+'-en-'+p+'.jpeg'
          var url_de = self.baseurl + 'img/'+self.selectedCandidateData['ID']+'-'+self.selectedCandidateData['last name']+'-'+m+'-de-'+p+'.jpeg'
          self.imgUrls[p].push(url_en)
          self.imgUrls[p].push(url_de)
        })
      })
    },

    addClass: function (e) {
      e.target.classList.add("hovered");
    },
    
    removeClass: function (e) {
      e.target.classList.remove("hovered");
    },

    expand_image(url){
      this.expanded_image = true
      this.expanded_image_url = url
      this.download_image_url = window.location.origin+url
    },
    filterOptions() {
      this.filtredCandidates = this.candidates.filter(option => {
        return option.URL_ID.toLowerCase().includes(this.searchString.toLowerCase());
      });

      this.showDropdown = true;
    },
    selectOption(option) {
      this.selectedItem = option["URL_ID"];
      this.searchString = option["first name"]+" "+option["last name"]
      this.showDropdown = false;
    },
    focusInput(){
      this.searchString=""
      this.showDropdown=true
      this.filtredCandidates = this.candidates
    },
    updateDocTitle(){
      if(this.lang == "en"){
        document.title = "Picturing the Parliament: how AI portrays German political candidates | AlgorithmWatch"
      }else{
        document.title = "Bilder eines Parlaments: wie KI deutsche Kandidat*innen darstellt | AlgorithmWatch"
      }
    },
    imageUrlAlt(event){
      if(this.lang=='en'){
        event.target.src = this.baseurl + "img/placeholder-en.png"
      }else{
        event.target.src = this.baseurl + "img/placeholder-de.png"
      }
    }

  },
  watch:{
    dataImport:function(){
      var self = this
      var byName = store.state.candidatesData.slice(0);
      byName.sort(function(a,b) {
          var x = a["last name"].toLowerCase().replace("ö","o").replace("ü","u");
          var y = b["last name"].toLowerCase().replace("ö","o").replace("ü","u");
          return x < y ? -1 : x > y ? 1 : 0;
      });
      this.candidates = byName
      this.candidates.forEach(function(c){
        self.candidates_url.push((c["URL_ID"]))
      })
      this.filtredCandidates_url = this.candidates_url
    },

    candidates_url:function(){
      this.checkCandidateUrl()
    },

    lang:function(){
      this.checkCandidateUrl()
      this.updateDocTitle()
    },

    mpid:function(){
      this.checkCandidateUrl()
    },

    selectedItem:function(){
      let params = this.$route.params
      params["mpid"] = this.selectedItem
      this.$router.push({ name: this.$route.name, params: params })  
    },

  },

  mounted(){

    let params = this.$route.params

    if(this.lang != "de" && this.lang != "en"){
      params["lang"] = "en"
    }

    this.updateDocTitle()

    this.$router.push({ name: this.$route.name, params: params })

  },
  updated() {
    this.$refs.draft.textContent = Array(50).fill('draft - do not share').join(' ');
  }
}
</script>

<style lang="scss">

  @import "https://algorithmwatch.org/en/wp-content/cache/min/1/en/wp-content/themes/aw2020/aw.min.css?ver=1709220387";

  .draft {
    background: rgb(0, 0, 0);
    min-height: 100%;
    width: 100%;
    position: absolute;
    z-index: -1;
    color: white;
    font-size: 4em;
    font-variant: small-caps;
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1em;
    opacity: 2%;
  }

  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    #main_content{
      #image_expand_container{
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 999;
        background: rgba(0,0,0,0.8);
        top:0;
        #image_expand_wrapper{
          position: absolute;
          width: 80%;
          max-width: 650px;
          aspect-ratio: 1/1;
          top:50%;
          left:50%;
          transform:translate(-50%,-50%);
          #close_button{
            width: 30px;
            height: 30px;
            position: absolute;
            top:-40px;
            right: 0;
            cursor: pointer;
            &:hover{
              div{
                background-color: #d81d23;
              }
              }
            div{
              width: 30px;
              height: 3px;
              background-color: white;
              position: absolute;
              top:50%;
              left:50%;
              &:first-child{
                transform:translate(-50%,-50%) rotate(45deg);
              }
              &:last-child{
                transform:translate(-50%,-50%) rotate(-45deg);
              }
            }
          }
          #download_button{
            position: absolute;
            color:black;
            padding: 4px 8px 4px 8px;
            border-radius: 8px;
            text-align: center;
            margin-top: 20px;
            background: white;
            left:50%;
            transform:translate(-50%,0);
            cursor: pointer;
            &:hover{
              background:#d81d23;
              color:white;
            }
          }
        }
      }
      #chapo{
        width: 80%;
        max-width: 750px;
        margin:25px auto 0;
      }
      #candidate_selector{
        font-size: 20px;
        max-width: 750px;
        margin:25px auto 25px;
        cursor: pointer;
        .dropdown {
          position: relative;
          display: inline-block;
        }
        .dropdown-after{

          &:after{
            content: '';
            position: absolute;
            right: 7px;
            top: 14px;
            width: 0;
            height: 0;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-top: 12px solid #d81d23;
            clear: both;
          }
          &:hover{
            &:after{
              opacity: 0.8;
            }
          }
        }
        .dropdown-input {
          width: 200px;
          padding: 8px;
          font-size: 18px;
        }
        .dropdown-menu {
          position: absolute;
          background-color: #f9f9f9;
          min-width: 200px;
          border: 1px solid #ddd;
          z-index: 1;
          max-height: 250px;
          overflow: scroll;
        }
        .dropdown-menu-item {
          padding: 8px;
          cursor: pointer;
        }
        .dropdown-menu-item:hover {
          background-color: #f1f1f1;
        }
      }
      #presentation_container{
        width: 80%;
        max-width: 750px;
        margin:25px auto 0;
      }
      .donation_cta_container{
        display: inline-block;
        text-decoration: none;
        position: relative;
        width: auto;
        max-width: 80%;
        text-align: center;
        margin:20px auto 20px;
        left:50%;
        transform:translate(-50%,0);
        padding: 5px 10px 5px 10px;
        border-radius: 8px;
        background:#d81d23;
        color:white;
        cursor: pointer;
        &:hover{
          opacity: 0.8;
        }
      }
      .prompt_content{
        margin-bottom: 70px;
        .prompt_wrapper{
          max-width: 750px;
          margin:0 auto 25px;
          font-size: 18px;
          .prompt_name{
            text-wrap: wrap;
            text-align: center;
          }
        }
        .images_container{
          width: 100%;
          display: flex;
          justify-content: center;
          margin-top: 0px;
          .image_wrapper{
            position: relative;
            margin-left: 10px;
            margin-right: 10px;
            margin-top: 35px;
            cursor: pointer;
            .model_name{
              position: absolute;
              top:-40px;
              font-size: 18px;
              width: calc(200% + 20px);
              text-align: center;
              padding: 3px;
              &:after{
                content: "";
                display: block;
                width: 100%;
                height: 1px;
                background: linear-gradient(to right, #af140f, #e6a507, #247427, #22afe5, #493553, #af140f);
                display: block;
                margin-top: 2px;
              }
            }
            &:first-child{
              margin-left:0px;
            }
            &:last-child{
              margin-right:0px;
            }
            span{
              position: absolute;
              top:-30px;
              left:50%;
              transform:translate(-50%,0);
            }
            img{

            }
            .image_hover{
              width: 100%;
              height: 100%;
              position: absolute;
              background-color: rgba(999,999,999,0.85);
              top:0;
              left:0;
              pointer-events: none;
              display: none;
              span{
                position: absolute;
                top:50%;
                left:50%;
                transform:translate(-50%,-50%);
                width: 80%;
                opacity: 1;
              }
            }
            &.hovered{
              .image_hover{
                display: block;
              }
            }
          }
        }
      }
    }
  }

  @media (max-width: 1023px) { 

     #app {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      #main_content{
        #candidate_selector{
          text-align: center;
        }
        .prompt_content{
          .prompt_wrapper{
            text-align: center;
          }
          .images_container{
            display: grid;
            grid-template-columns: repeat(2, auto);
            grid-column-gap: 10px;
            grid-row-gap: 10px;
            .image_wrapper{
              max-width: 200px;
              .model_name{
                width: calc(200% + 30px);
              }
            }
          }
        }
      }
    }

  }

  @media (max-width: 800px) { 

    #app {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      #main_content{
        #candidate_selector{
          .dropdown {
            display: block;
            margin-bottom: 15px;
            input{
              text-align: center;
            }
            &:after{
              right: auto;
              left:50%;
              transform:translate(75px,0);
              top: 14px;
              
            }
          }
          .dropdown-menu {
            max-width: 200px;
            left:50%;
            transform:translate(-50%,0);
          }
        }
        .prompt_content{
          .prompt_wrapper{
            text-align: center;
          }
          .images_container{
            display: grid;
            grid-template-columns: repeat(2, auto);
            grid-column-gap: 10px;
            grid-row-gap: 10px;
            .image_wrapper{
              max-width: 150px;
            }
          }
        }
      }
    }

  }


</style>

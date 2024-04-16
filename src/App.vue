<template>
  <div id="app">

    <headerComponent></headerComponent>

    <div id="main_content" v-if="selectedCandidateData">

      <div id="image_expand_container" v-if="expanded_image">
        <div id="image_expand_wrapper">
          <div id="close_button" @click="expanded_image=false">
            <div></div>
            <div></div>
          </div>
          <img :src="expanded_image_url"/>
          <a download :href="download_image_url">
            <span id="download_button">
              <span v-if="lang=='en'">Download</span>
              <span v-if="lang=='de'">Herunterladen</span>
            </span>
          </a>
        </div>
      </div>

      <div id="chapo">
        <span v-if="lang=='en'">We wanted to know how image generators interpreted the names of German candidates to the European Parliament. We prompted several services with the names. Here’s what we found.</span>
        <span v-if="lang=='de'">Wir wollten wissen, wie Bildgeneratoren die Namen deutscher Kandidaten für das Europaparlament interpretieren. Wir haben mehrere Dienste mit den Namen angefragt. Hier ist, was wir gefunden haben.</span>
      </div>

      <div id="candidate_selector">
        <div class="dropdown">
          <input type="text" class="dropdown-input" v-model="searchString" @input="filterOptions" placeholder="Type to search" @focus="focusInput()">
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
          {{selectedCandidateData["first name"]}} {{selectedCandidateData["last name"]}} is a candidate for the European Parliament in June, on the list of {{selectedCandidateData["party"]}}. We prompted three image generators about 
          <span v-if="selectedCandidateData['pronoun']=='he/his'">his</span>
          <span v-else>her</span>
          tenure as an MEP if 
          <span v-if="selectedCandidateData['pronoun']=='he/his'">he</span>
          <span v-else>she</span>
           is elected.
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

      
        <a v-if="lang=='en'" href="https://algorithmwatch.org/en/donate/" class="donation_cta_container">
          <span v-if="lang=='en'">Support AlgorithmWatch with a donation</span> 
        </a>

        <a v-if="lang=='de'" href="https://algorithmwatch.org/de/spenden/" class="donation_cta_container">
          <span>Unterstützen Sie AlgorithmWatch mit einer Spende</span> 
        </a>
      

      <div id="share_container">
          <span v-if="lang=='en'">Share on </span>
          <span v-if="lang=='de'">Teilen auf </span>
          
          <a :href="shareUrl['mastodon']">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M433 179.1c0-97.2-63.7-125.7-63.7-125.7-62.5-28.7-228.6-28.4-290.5 0 0 0-63.7 28.5-63.7 125.7 0 115.7-6.6 259.4 105.6 289.1 40.5 10.7 75.3 13 103.3 11.4 50.8-2.8 79.3-18.1 79.3-18.1l-1.7-36.9s-36.3 11.4-77.1 10.1c-40.4-1.4-83-4.4-89.6-54a102.5 102.5 0 0 1 -.9-13.9c85.6 20.9 158.7 9.1 178.8 6.7 56.1-6.7 105-41.3 111.2-72.9 9.8-49.8 9-121.5 9-121.5zm-75.1 125.2h-46.6v-114.2c0-49.7-64-51.6-64 6.9v62.5h-46.3V197c0-58.5-64-56.6-64-6.9v114.2H90.2c0-122.1-5.2-147.9 18.4-175 25.9-28.9 79.8-30.8 103.8 6.1l11.6 19.5 11.6-19.5c24.1-37.1 78.1-34.8 103.8-6.1 23.7 27.3 18.4 53 18.4 175z"/></svg>
          </a>
          <a :href="shareUrl['pinterest']">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M496 256c0 137-111 248-248 248-25.6 0-50.2-3.9-73.4-11.1 10.1-16.5 25.2-43.5 30.8-65 3-11.6 15.4-59 15.4-59 8.1 15.4 31.7 28.5 56.8 28.5 74.8 0 128.7-68.8 128.7-154.3 0-81.9-66.9-143.2-152.9-143.2-107 0-163.9 71.8-163.9 150.1 0 36.4 19.4 81.7 50.3 96.1 4.7 2.2 7.2 1.2 8.3-3.3 .8-3.4 5-20.3 6.9-28.1 .6-2.5 .3-4.7-1.7-7.1-10.1-12.5-18.3-35.3-18.3-56.6 0-54.7 41.4-107.6 112-107.6 60.9 0 103.6 41.5 103.6 100.9 0 67.1-33.9 113.6-78 113.6-24.3 0-42.6-20.1-36.7-44.8 7-29.5 20.5-61.3 20.5-82.6 0-19-10.2-34.9-31.4-34.9-24.9 0-44.9 25.7-44.9 60.2 0 22 7.4 36.8 7.4 36.8s-24.5 103.8-29 123.2c-5 21.4-3 51.6-.9 71.2C65.4 450.9 0 361.1 0 256 0 119 111 8 248 8s248 111 248 248z"/></svg>
          </a>
          <a @click="IGModal=true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg></a>
          <a :href="shareUrl['whatsapp']">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
          </a>
          <a :href="shareUrl['mail']">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg>
          </a>
        <div id="IGmodal" v-if="IGModal==true">
          <span class="IG_text" v-if="lang=='en'">To share an image on Instagram, click on an image to download it. Then, in the Instagram app, select "choose image from gallery".</span>
          <span class="IG_text" v-if="lang=='de'">Um ein Bild auf Instagram zu teilen, klicken Sie auf ein Bild, um es herunterzuladen. Wählen Sie dann in der Instagram-App "Bild aus Galerie auswählen".</span>
          <div class="IG_close" @click="IGModal=false">
            <span v-if="lang=='en'">Got it</span>
            <span v-if="lang=='de'">bestehend</span>
          </div>
        </div>
      </div>

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

            <img v-if="i%2==0" :src="u" :alt='selectedCandidateData["first name"]+" "+selectedCandidateData["last name"]+" "+prompts[p]["en"]' />

            <img v-if="i%2==1" :src="u" :alt='selectedCandidateData["first name"]+" "+selectedCandidateData["last name"]+" "+prompts[p]["de"]' />

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
  data(){
    return{
      candidates:[],
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
    selectedCandidateData(){
      return this.candidates.find(obj => obj.URL_ID === this.selectedCandidate)
    },
    shareUrl(){
      var mastodon = "https://mastodonshare.com/?url="+encodeURI(window.location)
      var pinterest = "http://pinterest.com/pin/create/button/?url="+encodeURI(window.location)
      var whatsapp = "https://wa.me/?text="+encodeURI(window.location)
      var mail = "mailto:?&subject=Automatically-generated MEPs&body="+window.location+""
      return {"mastodon":mastodon,"pinterest":pinterest,"whatsapp":whatsapp,"mail":mail}
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
          var url_en = '/img/'+self.selectedCandidateData['ID']+'-'+self.selectedCandidateData['last name']+'-'+m+'-en-'+p+'.jpeg'
          var url_de = '/img/'+self.selectedCandidateData['ID']+'-'+self.selectedCandidateData['last name']+'-'+m+'-de-'+p+'.jpeg'
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
    }

  },
  watch:{
    dataImport:function(){
      var self = this
      this.candidates = store.state.candidatesData
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

    this.$router.push({ name: this.$route.name, params: params })

  }
}
</script>

<style lang="scss">

  @import "https://algorithmwatch.org/en/wp-content/cache/min/1/en/wp-content/themes/aw2020/aw.min.css?ver=1709220387";

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
        .dropdown {
          position: relative;
          display: inline-block;
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
      #share_container{
        width: 80%;
        max-width: 750px;
        margin:10px auto 25px;
        position: relative;
        a{
          cursor:pointer;
          color:black;
          text-decoration: none;
          svg{
            max-width: 20px;
            height: auto;
            margin-left:8px;
            margin-right:8px;
            transform:translate(0,3px);
            fill:#d81d23;
            &:hover{
              opacity: 0.8;
            }
          }
        }
        #IGmodal{
          width: 300px;
          height: 400px;
          background: white;
          position: absolute;
          z-index: 999;
          top:50%;
          left:50%;
          transform:translate(-50%,-50%);
          border-radius: 50px;
          border:2px solid grey;
          text-align: center;
          .IG_text{
            display: inline-block;
            width: 250px;
            position: relative;
            margin-top:100px;
            margin-bottom: 20px;
          }
          .IG_close{
            position: relative;
            border:1px solid black;
            border-radius: 5px;
            display:inline-block;
            padding: 5px 10px 5px 10px;
            cursor: pointer;
          }
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

<template>
    <div class="home-page-wrapper" >
        <div class="home-library-title">
            <h4>
                Early Modern Women’s Marginalia: the Library of Libraries is a database of the marks that women made in books between 1530 and 1680, drawing from hundreds of repositories across the world. It presents the data from a wider project that explores how early modern women engaged with the margins of books, as owners, readers,  writers, artists, and students, registering a range of book uses from humanist annotation through handwriting practice and pen trials to doodles, smudges and stains. Bringing together details about the marginalia, the books, and the agents who marked them, the database is designed to encourage exploration of the collection and further research using these materials, providing views of both the aggregated data and individual instances of marginal marks. 
            </h4>
            <h4>
                The database is organised using three broad categories: Marks, Books and Agents. Rich metadata is provided in each of these sections, providing information about the kinds of marks that were made and where they appear, bibliographic details about the books in which they are found, and further details about the women agents themselves: their names, any dates, and the stability of the attribution, from certain to possible. You can zoom out to see all the marks, books or agents through different views, or zoom in to view subsets of the data.
            </h4>
            <h4>
                Items you would like to explore further can be added to a shelf in your own digital library: Your Collection. Each item can then be viewed with all the metadata about mark, book and agent at once, alongside images of the marginalia where available.             
            </h4>

        
        </div>
        <div class="home-images">
    <div v-if="topViewsList" class="home-images-wrapper">
      <div class="home-images-inner">

          <vueper-slides :dragging-distance="70"
          class="no-shadow" 
          slide-image-inside
          :visible-slides="2"
          slide-multiple
          :slide-ratio="1"
          fixed-height="40rem"
          :gap="10"
          :bullets="false"
          :arrows-outside="false"
          prevent-y-scroll 
          lazy-load-on-drag
          >
                <vueper-slide
              v-for="imagePreview in articleImageSet" 
                :key="imagePreview"
                  :image="`https://hmgugjmjfcvjtmrrafjm.supabase.co/storage/v1/object/public/${imagePreview.imageFolder}/${imagePreview.itemID}/${imagePreview.itemImage.name}`"
                  @click=""
                  />
        </vueper-slides>

      </div>
  </div>
</div>

        
    </div>
   
    
  </template>
  
  <script setup>

import { storeToRefs } from "pinia";
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
// ROUTE MANAGERS
const route = useRoute()

// STATE MANAGERS IMPORT //    

//Library State
const libraryStore = useLibraryStore();

//View State
const viewStore = useViewStore();
const { libraryData,
        libraryDisplay,
        formattedLibrary, 
        itemHeight,
        itemColour, 
        colourSet,
        colourScale,
        dataSize,
        getActiveFilters,
        filterObject,
        colourScaleConverter,
        ordinalColourMap,
        domainIndex,
        viewHeightBounds,
        domainColourIndex,
        viewColourBounds,
        viewColourSet } = storeToRefs(viewStore)
const { parseDatabase,
        handleViewSelection,
        getIDP,
        filterActiveToggle,
        getImagePreviewsofSize,
        handleColour } = useViewStore();

//Reference Constants
const referenceStore = useReferenceStore();
const { categoryMap, 
        viewMap,
        invCategoryMap, 
        colourMapFiltered,
        scales,
        topViewsList } = storeToRefs(referenceStore)

        //Utility Functions
const { handleObjectProperty,
        contrastHandler } = useUtils();

        const { 
        Agent,
        Book,
        Mark,
        complete,
        selectedImageSet
         } = storeToRefs(libraryStore)

         const articleImageSet = ref([])

         topViewsList.value.map((shelf)=> shelf[1].map((bookend) => bookend[1].map((item) => articleImageSet.value.push(item))))
         console.log('topViewsList', topViewsList)
         console.log('articleImageSet', articleImageSet)
// libraryStore.getSelectedImageSet('Marks', 'MargID', 3, 'HomeBanner')
// const imagePreviews = ref()
//   watch(() => libraryStore.selectedImageSet['HomeBanner'],()=>{
//         console.log('selectedImageSet["HomeBanner"]', libraryStore.selectedImageSet['HomeBanner'])
//         getImagePreviewsofSize(libraryStore.selectedImageSet['HomeBanner'], 3).then(data=> imagePreviews.value = data);
//     // console.log('imagePreviewList', imagePreviews.value)
//   })
 
    function iconDimensions(){
    const scaleWidth = 1;
    const scaleHeight = 1;
    const fill = '#222';
    const activeFill = '#FFF';
        return {
            agentIcon:{
                iconHeight: 0.9  * scaleHeight,
                iconWidth: 0.7 * scaleWidth,
                iconFill: route.params.setQuery === 'agents'? activeFill : fill,
            },
            bookIcon:{
                iconHeight: 1 * scaleHeight,
                iconWidth: 0.7 * scaleWidth,
                iconFill: route.params.setQuery === 'books'? activeFill : fill,
            },
            markIcon:{
                iconHeight: 0.9 * scaleHeight,
                iconWidth: 0.75 * scaleWidth,
                iconFill: route.params.setQuery === 'marks'? activeFill : fill,
            },
        }
    }

    const icons = ref()
    icons.value = iconDimensions()

    // const showAnnotations = ref(false)

    // To Top Button
    const { x, y } = useWindowScroll() // To replace below
    const useX = ref(x)
    const useY = ref(y)
    const toExploreButton = ref();
    const toTopButton = ref();
    // onMounted(() => {
    //     watchEffect(()=>{
    //         if (useY.value > 550) {
    //             toTopButton.value.classList.add("showButton");
    //         } else {
    //             toTopButton.value.classList.remove("showButton");
    //         }
    //     })
    // })
    const scrollToExplore = () => {
        window.scrollTo({ top: 540, behavior: "smooth" });
    };


  </script>
  
  <style lang="scss" scoped>
  span{
    font-weight: 650;
    // color: black;
}
.index-list-main{
    padding: 1rem 2rem 1rem 2rem;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    // width: 24vw;
}


.index-list-main h3{
    // padding: 2rem 0 0 0;
    margin: 0 0 0 0.75rem;
	color: black;
	font-family: 'Source Sans 3', sans-serif;
	font-size: 1.65rem;
	font-weight:350;
	letter-spacing: 0.425rem;
  }

  .index-list-main h3.activePage {

	color: white;

  }

.library-explorer-container{
    // max-width: 100vw;
}


  </style>
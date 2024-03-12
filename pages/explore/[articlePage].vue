<template>
    <div  class="library-explorer-container">


    <!-- <div class="query-box">
        <h2 class="query-breadcrumb"> {{ libraryDisplay.pageText.queryBreadcrumb }}</h2>
        <h2 class="query-breadcrumb">Total Items: {{ dataSize }}</h2>
    </div> -->
    <div class="shelf-separator-container"><div class="shelf-separator"></div></div>
    <div class="article-library-title">
        <h1>Graffiti</h1>
        <h2><span>Definition:</span></h2>
        <h4>The database uses the term graffiti for a range of marks that are primarily visual in nature, consisting of images, pasted material, object traces, letter practice, doodles, smudges and stains.</h4>
        <div class="article-hero">
        <NuxtImg class="explore-item-image" 
            :class="[heroImageClass]"
            src="https://hmgugjmjfcvjtmrrafjm.supabase.co/storage/v1/object/public/mark-images/21/MargID_21_(1_of_1).jpg"
            />
        </div>
        <h4>
            RCIN 1051956 Psaultier de David, Royal Collection Trust, Windsor Castle Royal Library, Windsor (link to card Jesse - if there is one? Same for the next group of images or image) 
        </h4>
        <p>
            Most scholarship on early modern women’s marginalia to date has concentrated on its verbal forms, yet women’s annotations also include visual marks or images of varying degrees of legibility and complexity, ranging from stars and manicules, doodles, copies of typographical ornaments, drawings in pen and ink, and the insertion of images into texts through cutting and pasting. These visual forms, which we have grouped under the term ‘graffiti’, comprise an exciting and largely unexamined sub-corpus within early modern women’s marginalia, providing new evidence of how women read, how they saw their world, and how they used their books. Graffiti also illuminate how women engaged with formal categories of visual expression such as calligraphy, copying and drawing, with implications for our understanding of their education and their relationship to humanism. The collection of graffiti found in our database show how important both texts and images were to the ways in which women perceived and represented their worlds. 
        </p>
    </div>




    <!-- <button @click="showAnnotations=!showAnnotations" class="annotation-button" :class="{ 'active': showAnnotations }">
        🖊️
    </button>
        <AnnotationPanel v-if="showAnnotations"/> -->
    <!-- <button ref="toTopButton" @click="scrollToTop" class="to-top-button">☝️</button> -->


    </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import * as d3 from "d3";
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'

// ROUTE MANAGERS
const route = useRoute()

// STATE MANAGERS IMPORT //    
const supabase = useSupabaseClient()

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
        handleColour } = useViewStore();

//Reference Constants
const referenceStore = useReferenceStore();
const { categoryMap, 
        viewMap,
        invCategoryMap, 
        colourMapFiltered,
        scales } = storeToRefs(referenceStore)

        //Utility Functions
const { handleObjectProperty,
        contrastHandler } = useUtils();




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

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const heroImageClass = ref('graffitiHero')


</script>

<style lang="scss" scoped>

.graffitiHero{
    position: relative;
    width: 60vw
    // height: 325px;
}

.article-hero{
    display: flex;
    align-items: center;
    justify-content: center;
}

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

    .nav-div{
        z-index: 10;
        position: sticky;
        top: 0;
        background-color: rgba(255,255,255,1);
        // width: 100%;
        // height: 100%;
        // opacity: 100%;

    }

    .nav-bottom-div{
        z-index: 15;
        position: sticky;
        bottom: -1px;
        background-color: rgba(255,255,255,1);
        // width: 100%;
        // height: 100%;
        // opacity: 100%;

    }

</style>
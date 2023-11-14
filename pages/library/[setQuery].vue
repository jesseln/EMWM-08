<template>
    <div  class="library-explorer-container">
        <FilterSidebar v-if="useY > 300" />


    <!-- <div class="query-box">
        <h2 class="query-breadcrumb"> {{ libraryDisplay.pageText.queryBreadcrumb }}</h2>
        <h2 class="query-breadcrumb">Total Items: {{ dataSize }}</h2>
    </div> -->
    <div class="shelf-separator-container"><div class="shelf-separator"></div></div>
    <div class="explore-library-title">
        <h1>Explore the Collection </h1>
        <h4>The library presents <span>the Agents</span>, the 'women marginalists' in the collection, <span>the Books</span> they owned and <span>the Marks</span> they made in the margins during the 16th and 17th centuries.</h4>
        <h4>Select from one of the 3 collections below, the click on the arrow to begin.</h4>
    </div>
    <div class="type-selector-wrapper" >
        <NuxtLink to="/library/agents">
    <VMenu
        placement="top" 
        :delay="{ show: 50, hide: 200 }"
    >

        <div class="library-type-title-box" :class="{ activePage : route.params.setQuery === 'agents'}">
            <h1 class="library-type-title"></h1>
            <div class="index-list-main">
                <div class="icon-container">
                    <svg xmlns="http://www.w3.org/2000/svg" :width="11*icons.agentIcon.iconWidth" :height="33*icons.agentIcon.iconHeight" viewBox="0 0 11 33" fill="none">
                        <path d="M0 5.35535C0 2.39767 2.39767 0 5.35535 0C8.31302 0 10.7107 2.39767 10.7107 5.35535V26.7767C10.7107 29.7344 8.31302 32.1321 5.35535 32.1321C2.39767 32.1321 0 29.7344 0 26.7767V5.35535Z" :fill="icons.agentIcon.iconFill"/>
                    </svg>
                </div>
                <h3 :class="{ activePage : route.params.setQuery === 'agents'}">The Agents</h3>   
            </div>
        </div>
        <template #popper >
         <div class="explore-category-descriptor">
            <h2>The Agents</h2>
            <p>In these collections the term <span>'Agents'</span> refers to the women who made the marginal marks in each book. They can also be referred to as <span>'Marginalists'</span>.</p>
            <p>The names of these women are known through the marks they made. These often included marks of ownership with the inscription, <span>"Her Book"</span>.</p>
         </div>
        </template>
    </VMenu>
    </NuxtLink>
    <NuxtLink to="/library/books">
        <VMenu
        placement="top" 
        :delay="{ show: 50, hide: 200 }"
    >

        <div class="library-type-title-box" :class="{ activePage : route.params.setQuery === 'books'}">
            <h1 class="library-type-title"></h1>
            <div class="index-list-main">
                <div class="icon-container">
                    <svg xmlns="http://www.w3.org/2000/svg" :width="10*icons.bookIcon.iconWidth" :height="30*icons.bookIcon.iconHeight" viewBox="0 0 10 30" fill="none">
                        <path d="M0.00512695 0H10V29.9846H0.00512695V0Z" :fill="icons.bookIcon.iconFill"/>
                    </svg>
                </div>
                <h3 :class="{ activePage : route.params.setQuery === 'books'}">The Books</h3>
            </div>
        </div>
        <template #popper >
         <div class="explore-category-descriptor">
            <h2>The Books</h2>
            <p>The <span>Books</span> in these collections are books which have each been annotated by women <span>Agents</span>. These inscriptions are referred to as marginal <span>Marks</span>.</p>
              <p>These books have been sourced from international respositories. Images of the books and the marginal marks they contain can be viewed in the library.</p>
         </div>
        </template>
    </VMenu>
    </NuxtLink>
    <NuxtLink to="/library/marks">
        <VMenu
        placement="top" 
        :delay="{ show: 50, hide: 200 }"
    >

        <div class="library-type-title-box" :class="{ activePage : route.params.setQuery === 'marks'}">
            <h1 class="library-type-title"></h1>
            <div class="index-list-main">
                        <div class="icon-container">
                        <svg xmlns="http://www.w3.org/2000/svg" :width="10*icons.markIcon.iconWidth" :height="33*icons.markIcon.iconHeight" viewBox="0 0 10 33" fill="none">
                            <path d="M0.379883 6.90698L4.99988 0L9.61988 6.90698V33H0.379883V6.90698Z" :fill="icons.markIcon.iconFill"/>
                        </svg>
                        </div>
                        <h3 :class="{ activePage : route.params.setQuery === 'marks'}">The Marks</h3>
                    </div>

        </div>
        <template #popper >
         <div class="explore-category-descriptor">
            <h2>The Marks</h2>
            <p>The term <span>'Marks'</span> refers to marks made by the women <span>Agents</span> within the <span>Books</span> in the collection. </p>
            <p>These marginal marks show diverse forms of engagement with each book and their text. Collectively these marks are known as <Span>'Marginalia'.</Span></p>
         </div>
        </template>
    </VMenu>
    </NuxtLink>
    </div>
    <div class="explore-button-wrapper">
    <button ref="toExploreButton" @click="scrollToExplore" class="to-explore-button shelf-button">
        <Icon name="ic:baseline-arrow-downward" size="3rem" />
    </button>
    </div>
        <div class="nav-div">
            <LibraryNav />
        </div>
        <div v-if="getActiveFilters.length" class="filters-bar">
                <h4 class="library-nav-view-filters">Active Filters</h4>
                <div class="catalogue-filter-category-container-active-inview">
                    <button 
                    v-for="filterValue in getActiveFilters"
                    @click="filterActiveToggle(filterValue, filterValue.category, filterValue.itemType)" 
                    class="catalogue-filter-category-active"
                    :class="{ filterActive : filterObject.get(filterValue.itemType)[filterValue.category][filterValue.name].active }">
                    <div class="catalogue-filter-category-wrapper">
                        <div class="catalogue-filter-category-titles-wrapper">
                            <h2 class="catalogue-filter-item" >
                                {{ filterValue.itemType }}
                            </h2>
                            <h3 class="catalogue-filter-category" >
                                 {{categoryMap.get(filterValue.itemType)[filterValue.category]}}
                            </h3>
                        </div>
                        <div class="catalogue-filter-category-value-container">
                            <p class="catalogue-filter-category-value" >  {{filterValue.name}} </p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M6 0C2.65714 0 0 2.65714 0 6C0 9.34286 2.65714 12 6 12C9.34286 12 12 9.34286 12 6C12 2.65714 9.34286 0 6 0ZM6 11.1429C3.17143 11.1429 0.857143 8.82857 0.857143 6C0.857143 3.17143 3.17143 0.857143 6 0.857143C8.82857 0.857143 11.1429 3.17143 11.1429 6C11.1429 8.82857 8.82857 11.1429 6 11.1429Z" fill="white"/>
                                <path d="M8.31429 8.94434L6 6.63005L3.68571 8.94434L3 8.25862L5.31429 5.94434L3 3.63005L3.68571 2.94434L6 5.25862L8.31429 2.94434L9 3.63005L6.68571 5.94434L9 8.25862L8.31429 8.94434Z" fill="white"/>
                            </svg>
                        </div>
                    </div>
                </button>
            </div>
        </div>
        <div class="explore-loading-page" v-if="!dataCheck || useY <= 300">
            <div class="lds-default lds-grey"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>   
        </div>
        <div v-if="dataCheck && useY > 300">
            <LibraryView />
        </div>

    <div class="nav-bottom-div">
        <div v-if="dataCheck && useY > 300">
        <LibraryBottomNav />
        </div>
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
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'
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


    const setQueryView = referenceStore.viewRouteQueries[route.params.setQuery]
    // console.log("setQueryView", setQueryView)
    // console.log("viewStore", viewStore.libraryDisplay)
    // console.log("query check", setQueryView.view.itemType)
    Object.assign(viewStore.libraryDisplay.view, setQueryView.view)
    Object.assign(viewStore.libraryDisplay.viewType, setQueryView.viewType)
    Object.assign(viewStore.libraryDisplay.pageText, setQueryView.pageText)

//    console.log('library display', viewStore.libraryDisplay)
//    console.log('computed ', formattedLibrary)
//    console.log('computed length', formattedLibrary.length !== undefined)
   
   const dataCheck = computed (() => {
        return formattedLibrary.value.length !== undefined
    })

    watchEffect(()=>{
        parseDatabase(libraryStore[viewStore.libraryDisplay.view.itemType])
        // console.log('watchEffect',formattedLibrary)
    })

    // Error Page
    // if(route.params.setQuery !== 'myQuery'){
    //     throw createError({ statusCode: 404, statusMessage: "View not Found"})
    // }

 
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

    watch(route.params.setQuery,()=>{
        icons.value = iconDimensions()
    }, {immediate: true})


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

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
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
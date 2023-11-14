<template>
    <div  class="library-explorer-container">

        <FilterSidebar />


    <!-- <div class="query-box">
        <h2 class="query-breadcrumb"> {{ libraryDisplay.pageText.queryBreadcrumb }}</h2>
        <h2 class="query-breadcrumb">Total Items: {{ dataSize }}</h2>
    </div> -->
    <div class="shelf-separator-container"><div class="shelf-separator"></div></div>
        <div class="icon-container">
        </div>
        <div class="library-type-title-box">
            <h1 class="library-type-title">{{ libraryDisplay.pageText.libraryTypeTitle }}</h1>
            <p class="library-type-subtitle">{{ libraryDisplay.pageText.libraryTypeSubtitle }}</p>
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
        <div v-if="dataCheck">
            <LibraryView />
        </div>

    <div class="nav-bottom-div">
        <div v-if="dataCheck">
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

 


    // const showAnnotations = ref(false)

    // // To Top Button
    // const { x, y } = useWindowScroll() // To replace below
    // const useX = x
    // const useY = y
    // const toTopButton = ref();
    // onMounted(() => {
    //     watchEffect(()=>{
    //         if (useY.value > 550) {
    //             toTopButton.value.classList.add("showButton");
    //         } else {
    //             toTopButton.value.classList.remove("showButton");
    //         }
    //     })
    // })
    // const scrollToTop = () => {
    //     window.scrollTo({ top: 0, behavior: "smooth" });
    // };



</script>

<style lang="scss" scoped>

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
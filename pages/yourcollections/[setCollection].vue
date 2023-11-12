<template>
    <div  class="library-explorer-container">

        <YourCollectionFilterSidebar />

    <div class="shelf-separator-container"><div class="shelf-separator"></div></div>
        <div class="icon-container">
        </div>
        <div class="library-type-title-box">
            <h1 class="library-type-title">{{ route.params.setCollection}}</h1>
            <p class="library-type-subtitle"> {{ libraryDisplayYC.pageText.libraryTypeSubtitle }}</p>
        </div>
        <div class="nav-div">
            <YourCollectionNav />
        </div>
        <div v-if="getActiveFiltersYC.length" class="filters-bar">
                <h4 class="library-nav-view-filters">Active Filters</h4>
                <div class="catalogue-filter-category-container-active-inview">
                    <button 
                    v-for="filterValue in getActiveFiltersYC"
                    @click="yourCollectionStore.filterActiveToggleYC(filterValue, filterValue.category, filterValue.itemType)" 
                    class="catalogue-filter-category-active"
                    :class="{ filterActive : filterObjectYC.get(filterValue.itemType)[filterValue.category][filterValue.name].active }">
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
            <YourCollectionView />
        </div>

    <div class="nav-bottom-div">
        <div v-if="dataCheck">
        <YourCollectionBottomNav />
        </div>
    </div>
    <!-- <button @click="showAnnotations=!showAnnotations" class="annotation-button" :class="{ 'active': showAnnotations }">
        🖊️
    </button>
        <AnnotationPanel v-if="showAnnotations"/> -->
    <button ref="toTopButton" @click="scrollToTop" class="to-top-button">☝️</button>


    </div>
</template>

<script setup>
import { storeToRefs } from "pinia";

// ROUTE MANAGERS
const route = useRoute()

// STATE MANAGERS IMPORT //    

//Library State
const libraryStore = useLibraryStore();
const viewStore = useViewStore();

//View State
const yourCollectionStore = useYourCollectionStore();
const { yourCollection, 
        allCollections,
        collectionName,
        itemLibraryYC, 
        dataSizeYC,
        libraryDisplayYC,
        formattedLibraryYC,
        formattedItemLibraryYC,
        filterLibraryYC, 
        heightCategoryYC,
        itemHeightYC,
        itemColourYC,
        colourScaleYC,
        colourScaleConverterYC,
        colourSetYC, 
        ordinalColourMapYC,
        viewColourSetYC,
        domainIndexYC,
        viewHeightBoundsYC,
        domainColourIndexYC,
        viewColourBoundsYC,
        activeFiltersYC,
        filterObjectYC,
        getActiveFiltersYC } = storeToRefs(yourCollectionStore)
const { getItemLibraryYC,
        getFilterObjectYC,
        filterActiveToggleYC,
        parseDatabaseYC,
        handleViewSelectionYC,
        getIDP_YC,
        getIFP_YC,
        itemTypeCheckYC,
        addToCollection, 
        removeFromCollection } = useYourCollectionStore();

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


    // const setQueryView = referenceStore.viewRouteQueries[route.params.setQuery]
    // console.log("setQueryView", setQueryView)
    // console.log("yourCollectionStore", yourCollectionStore.libraryDisplayYC)
    // console.log("query check", setQueryView.view.itemType)
    // Object.assign(yourCollectionStore.libraryDisplayYC.view, setQueryView.view)
    // Object.assign(yourCollectionStore.libraryDisplayYC.viewType, setQueryView.viewType)
    // Object.assign(yourCollectionStore.libraryDisplayYC.pageText, setQueryView.pageText)

//    console.log('library display', yourCollectionStore.libraryDisplayYC)
//    console.log('computed ', formattedLibraryYC)
//    console.log('computed length', formattedLibraryYC.length !== undefined)
   
   const dataCheck = computed (() => {
        return formattedLibraryYC.value.length !== undefined
    })

    const showAnnotations = ref(false)

    // To Top Button
    const { x, y } = useWindowScroll() // To replace below
    const useX = x
    const useY = y
    const toTopButton = ref();
    onMounted(() => {
        collectionName.value = route.params.setCollection

        watchEffect(()=>{
            if (useY.value > 550) {
                toTopButton.value.classList.add("showButton");
            } else {
                toTopButton.value.classList.remove("showButton");
            }
        })
    })
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };


    console.log('filter Object YC', yourCollectionStore.filterObjectYC)
    
    console.log('formatted Library YC', yourCollectionStore.formattedLibraryYC)
    console.log('filter Library YC', yourCollectionStore.filterLibraryYC)
    console.log('your Collection', yourCollectionStore.yourCollection)
    console.log('library data', viewStore.libraryData)


</script>

<style lang="scss" scoped>

    .nav-div{
        z-index: 10;
        position: sticky;
        top: 0;
        background-color: rgba(255,255,255,0.98);
        // width: 100%;
        // height: 100%;
        // opacity: 100%;

    }

    .nav-bottom-div{
        z-index: 5;
        position: sticky;
        bottom: -1px;
        background-color: rgba(255,255,255,0.98);
        // width: 100%;
        // height: 100%;
        // opacity: 100%;

    }

</style>
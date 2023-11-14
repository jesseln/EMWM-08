<template>
    <div class="home-page-wrapper" >
        <div class="home-library-title">
            <h1>Welcome to the Collection of Early Modern Women's Marginalia</h1>
            <h4>
                <span>Marginalia are marks made in the margins of books. The marks in this collection were made by women during the 16th and 17th centuries. 
                This period of time is known as the Early Modern Period</span>.
            </h4>
            <h4>
                Marginalia give us a window into what books early modern women read or owned, and how they engaged with them. 
                This site tracks a growing archive of women’s annotations in 16th and 17th century books, including ownership marks, 
                inscriptions, and notes,  as well as material uses of books such as drawing, record keeping, pen trials and handwriting practice.
            </h4>
            <h4>
                This digital library presents over 1,000 instances of marginalia found from this period. These have been catalogued and a significant amount of detail has been provided by the research team. 
                This library has been designed to explore this collection. It provides a wide range of features for viewing and arranging the collection to suit the needs of literary  researchers.
            </h4>
            </div>
            <div class="shelf-separator-container-homepage"><div class="shelf-separator-homepage"></div></div>
            <div class="home-library-title">
            <h2 class="low-top-margin">
                Each view of the collection focusses on one of three connected elements:
            </h2>
            <div class="homepage-icon-container">
                    <svg xmlns="http://www.w3.org/2000/svg" :width="11*icons.agentIcon.iconWidth" :height="33*icons.agentIcon.iconHeight" viewBox="0 0 11 33" fill="none">
                        <path d="M0 5.35535C0 2.39767 2.39767 0 5.35535 0C8.31302 0 10.7107 2.39767 10.7107 5.35535V26.7767C10.7107 29.7344 8.31302 32.1321 5.35535 32.1321C2.39767 32.1321 0 29.7344 0 26.7767V5.35535Z" :fill="icons.agentIcon.iconFill"/>
                    </svg>
                </div>
                <h3>The <span>Women Agents,</span> </h3>
                <div class="homepage-icon-container">
                        <svg xmlns="http://www.w3.org/2000/svg" :width="10*icons.markIcon.iconWidth" :height="33*icons.markIcon.iconHeight" viewBox="0 0 10 33" fill="none">
                            <path d="M0.379883 6.90698L4.99988 0L9.61988 6.90698V33H0.379883V6.90698Z" :fill="icons.markIcon.iconFill"/>
                        </svg>
                    </div>
                <h3>  the  <span>Marks</span> they made, and </h3>
                <div class="homepage-icon-container">
                    <svg xmlns="http://www.w3.org/2000/svg" :width="10*icons.bookIcon.iconWidth" :height="30*icons.bookIcon.iconHeight" viewBox="0 0 10 30" fill="none">
                        <path d="M0.00512695 0H10V29.9846H0.00512695V0Z" :fill="icons.bookIcon.iconFill"/>
                    </svg>
                </div>
                 <h3> the <span>Books</span> in which the marks were found.  </h3>
                 <h4 class="low-top-margin"> </h4>
            <h4>
                Items you would like to explore further can be added to <span>Your Collection</span> and viewed with all their associated elements at once.
            <span>To begin viewing the collection,</span> select from one of the three categories below to begin viewing the collection, or click "Explore the collection" above.
            </h4>
            <h4>
                 
            </h4> 
        </div>
        <div class="shelf-separator-container-homepage"><div class="shelf-separator-homepage"></div></div>
        <div class="home-library-second-title">
            <h1>
                View the Collection
            </h1>
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
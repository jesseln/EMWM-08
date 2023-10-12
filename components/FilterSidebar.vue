<template>
<div class="sidebar scrollable" :style="{ width: sidebarWidth }">
    <div class="sidebar-title-box">
        <h1 class="query-type-sideBar"> {{libraryDisplay.pageText.queryType}} </h1>
    </div>
    <!-- <div class="shelf-separator-container"><div class="shelf-separator"></div></div> -->
<div class="sidebar-content">
    <!-- <div class="filters">
        <h2>Filters</h2>
    </div>

    <div class="highlights">
        <h2>Highlights</h2>
    </div> -->

    <div class="library-catalogue-title-box">
        <h2 class="library-catalogue-title">Library Catalogue</h2>
        <h3 class="library-catalogue-subtitle">Filter and Highlight</h3>

        <!-- <button v-tooltip="{
  content: 'You have ',
  theme: 'info-tooltip'
}">dsfghf</button> -->

<!-- <Vmenu>
    <template>
        <h1>hhh</h1>
    </template>
</Vmenu> -->
        <!-- <button v-tooltip="{
  content: 'Roll your eyes colors',
  theme: 'filter-menu'
}">d</button> -->
    </div>
    <div class="library-catalogue">
        <div class="catalogue-title-box"  @click="toggle('Agent')">
            <h4 class="catalogue-title">Agents</h4>
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="6" viewBox="0 0 11 6" fill="none" class="svg">
                <path d="M1 1.00002L5.72428 4.90478L10.1111 1.00002" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>
            </svg>
        </div>
        <div class="catalogue-container" :class="{ hidden : !visible.Agent, visible : visible.Agent}">  

            <div class="catalogue" v-for="item in referenceStore.categoryMap.get('Agent')">
                <VMenu
                placement="right" 
                :delay="{ show: 0, hide: 0 }"
                theme="filter-menu"
                >
                <p>{{ item }}</p>
                <template #popper >
                <h1>hello</h1>
            </template>
        </VMenu>
            </div>

        </div>
        <div class="catalogue-title-box" @click="toggle('Book')">
            <h4 class="catalogue-title">Books</h4>
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="6" viewBox="0 0 11 6" fill="none" class="svg">
                <path d="M1 1.00002L5.72428 4.90478L10.1111 1.00002" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>
            </svg>
        </div>
        <div class="catalogue-container" :class="{ hidden : !visible.Book }">    
            <div class="catalogue" v-for="item in referenceStore.categoryMap.get('Book')">
                <p>{{ item }}</p>
            </div>
        </div>
        <div class="catalogue-title-box" @click="toggle('Mark')">
            <h4 class="catalogue-title">Marks</h4>
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="6" viewBox="0 0 11 6" fill="none" class="svg">
                <path d="M1 1.00002L5.72428 4.90478L10.1111 1.00002" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>
            </svg>
        </div>
        <div class="catalogue-container" :class="{ hidden : !visible.Mark }">    
            <div class="catalogue" v-for="item in referenceStore.categoryMap.get('Mark')">
                <p>{{ item }}</p>
            </div>
        </div>
    </div>

</div>
</div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'
const nuxtApp = useNuxtApp()

// STATE MANAGERS IMPORT //    

//Library State
const libraryStore = useLibraryStore();

//View State
const viewStore = useViewStore();
const { libraryData,
        libraryDisplay,
        dataSize,
        formattedLibrary, 
        itemHeight,
        itemColour, 
        viewHeightBounds, 
        viewColourSet } = storeToRefs(viewStore)
const { parseDatabase,
        handleViewSelection,
        getIDP,
        itemTypeCheck } = useViewStore();


//Your Shelf State
const yourShelfStore = useYourShelfStore();
const { yourShelf }  = storeToRefs(yourShelfStore)
const { addToShelf, 
        removeFromShelf } = useYourShelfStore();

//Reference Constants
const referenceStore = useReferenceStore();
const { categoryMap, 
        invCategoryMap, 
        colourMapFiltered,
        scales,
        viewRouteQueries,
        viewEditItemBundle,
        viewColourItemBundle } = storeToRefs(referenceStore)


// nuxtApp.vueApp.use(FloatingVue, {
//   themes: {
//     'info-tooltip': {
//       $extend: 'tooltip',
//       $resetCss: true,
//     },
//   },
// })


const collapsed = ref(false)
const toggleIconSF = ref(0.8)
const iconScaleFactor = ref(0.5)
const SIDEBAR_WIDTH = 10
const SIDEBAR_WIDTH_COLLAPSED = 2.5
const toggleSidebar = () => (collapsed.value = !collapsed.value)

const sidebarWidth = computed(
  () => `${collapsed.value ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH}vw`
)


const visible = reactive({
        Agent: false,
        Book: false,
        Mark: false,
    })

const toggle = (option)=> {
    console.log(option)
    visible[option] = !visible[option]
}

</script>


<style  >

.v-popper--theme-filter-menu .v-popper__inner {
    background: #ff0000;
    /* background: #fff; */
  color: black;
  padding: 24px;
  border-radius: 6px;
  border: 1px solid #ddd;
  box-shadow: 0 6px 30px rgba(0, 0, 0, .1);
}

.v-popper--theme-filter-menu .v-popper__arrow-outer {
    border-color: #00ff00;
}

.v-popper--theme-item-menu .v-popper__inner {
    background: #ff0000;
    /* background: #fff; */
  color: black;
  padding: 24px;
  border-radius: 6px;
  border: 1px solid #ddd;
  box-shadow: 0 6px 30px rgba(0, 0, 0, .1);
}

.v-popper--theme-item-menu .v-popper__arrow-outer {
    border-color: #570711;
}
  

.v-popper--theme-info-tooltip {
  .v-popper__inner {
    background: #004499;
  }

  .v-popper__arrow-inner {
    border-color: #004499;
  }
}


  .sidebar {
	display: grid;
	grid-template-rows: 2.25rem auto auto;
	border-radius: 0 0.1rem 0.1rem 0;
	color: black;
	float: left;
	position: sticky;
	z-index: 6;
    height: 90vh;
	top: 0vh;
	left: 0;
	padding: 0.5em;
	transition: 0.3s ease-in-out;
  }

  .scrollable{
    overflow-x: hidden;
    right: -2px;
  }

  .sidebar-content{
    display: flex;
    flex-flow: column nowrap
  }
  
  .query-type-sideBar{
	margin: 0 0.4rem ;
	color: black;
	font-family: 'Source Sans 3', sans-serif;
	font-size: 1rem;
	font-weight:550;
    letter-spacing: 0.1rem;
}

  .sidebar-title-box{
    grid-row: 1/2;
    border-bottom: 2px solid #ebebeb;

  }

  .library-catalogue-title-box{
    grid-row: 2/3;
    padding: 0.5rem 0 0.5rem 0;
    border-bottom: 2px solid #ebebeb;
  }
  .library-catalogue-title{
	color: #111827;
	font-family:'Raleway', sans-serif;
	font-size: .9rem;
	font-weight: 650;
	line-height: 1.2rem;
	padding: 0 0 0.3rem;
  }

.library-catalogue-subtitle{
    color: #575757;
	font-family:'Raleway', sans-serif;
	font-size: .825rem;
	font-weight: 450;
	line-height: 1.2rem;
}
  

.library-catalogue {
    grid-row: 3/4;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
}


.catalogue-title-box{
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin: 0.25rem 0;
    padding: 0 0.5rem;
    border-bottom: 0.1rem solid #ccc;
    cursor: pointer;
    color: #111827;
}

.catalogue-title-box:hover{
    color: rgb(155, 155, 155)
}

.svg{
    color: inherit;
}
.catalogue-title{
    color: inherit;
	font-family:'Raleway', sans-serif;
	font-size: 0.8rem;
	font-weight: 500;
	line-height: 1rem;
	padding: 0.4rem 0;
}
.catalogue-container{
    display: flex;
    flex-flow: column wrap;
}
   
.catalogue{
	color: #111827;
	font-family:'Raleway', sans-serif;
	font-size: 0.8rem;
	font-weight: 350;
	line-height: 1.2rem;
	padding: 0.2rem 0 0.2rem 0.5rem;
    cursor: pointer;
}

.catalogue:hover{
    background-color: #f5f5f5;
}


.hidden {
        visibility: hidden;
        height: 0;
    }
.visible {
    visibility: visible;
    height: auto;
}

.collapse-icon {
  grid-column-start: 1;
  grid-column-end: 2;
  position: absolute;
  top: 0.5vw;
  left: 22.1vw;
  margin: 0.55em;
  cursor: pointer;
  color: rgb(63, 63, 63);
  transition: 0.3s ease-in-out;
}

.rotate-180 {
  transform: translate(-22vw, 0) rotate(180deg);
  transition: 0.3s ease-in-out;
}
</style>

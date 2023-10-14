<template>
<div class="sidebar scrollable" :style="{ width: sidebarWidth }">
    <div class="sidebar-title-box">
        <h1 class="query-type-sideBar"> {{libraryDisplay.pageText.queryType}} </h1>
    </div>
    <!-- <div class="shelf-separator-container"><div class="shelf-separator"></div></div> -->
<div class="sidebar-content">

    <div class="library-catalogue-title-box">
        <h2 class="library-catalogue-title">Library Catalogue</h2>
        <h3 class="library-catalogue-subtitle">Filter and Highlight</h3>

    </div>
    <div class="library-catalogue">
        <div class="catalogue-title-box"  @click="toggle('Agent')">
            <h4 class="catalogue-title">Agents</h4>
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="6" viewBox="0 0 11 6" fill="none" class="svg">
                <path d="M1 1.00002L5.72428 4.90478L10.1111 1.00002" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>
            </svg>
        </div>
        <div class="catalogue-container" :class="{ hidden : !visible.Agent, visible : visible.Agent}">  

            <div class="catalogue" v-for="item in Object.keys(filterMap.get('Agent'))">
                <VDropdown
                placement="right" 
                :triggers="['click']"
                :popperTriggers="['']"
                :delay="{ show: 0, hide: 0 }"
                >
                    <p>{{ categoryMap.get('Agent')[item] }}</p>
                    <template #popper >
                        <div v-for="value in filterObject.get('Agent')[item]">
                            <p>{{ value }}</p>
                        </div>
                    </template>
                </VDropdown>
            </div>
        </div>
        <div class="catalogue-title-box" @click="toggle('Book')">
            <h4 class="catalogue-title">Books</h4>
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="6" viewBox="0 0 11 6" fill="none" class="svg">
                <path d="M1 1.00002L5.72428 4.90478L10.1111 1.00002" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>
            </svg>
        </div>
        <div class="catalogue-container" :class="{ hidden : !visible.Book }">    
            <div class="catalogue" v-for="item in Object.keys(filterMap.get('Book'))">
                <VDropdown
                placement="right" 
                :triggers="['click']"
                :popperTriggers="['']"
                :delay="{ show: 0, hide: 0 }"
                >
                    <p>{{ categoryMap.get('Book')[item] }}</p>
                    <template #popper >
                        <div v-for="value in filterObject.get('Book')[item]">
                            <p>{{ value }}</p>
                        </div>
                    </template>
                </VDropdown>
            </div>
        </div>
        <div class="catalogue-title-box" @click="toggle('Mark')">
            <h4 class="catalogue-title">Marks</h4>
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="6" viewBox="0 0 11 6" fill="none" class="svg">
                <path d="M1 1.00002L5.72428 4.90478L10.1111 1.00002" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>
            </svg>
        </div>
        <div class="catalogue-container" :class="{ hidden : !visible.Mark }">    
            <div class="catalogue" v-for="item in Object.keys(filterMap.get('Mark'))">
                <VDropdown
                placement="right" 
                :triggers="['click']"
                :popperTriggers="['']"
                :delay="{ show: 0, hide: 0 }"
                >
                    <p>{{ categoryMap.get('Mark')[item] }}</p>
                    <template #popper >
                        <div v-for="value in filterObject.get('Mark')[item]">
                            <p>{{ value }}</p>
                        </div>
                    </template>
                </VDropdown>
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
// import VDropdown from 'floating-vue/dist/components/Dropdown.vue.d.ts'

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
        getIFP,
        itemTypeCheck } = useViewStore();

    //Utils
    const { alphabetically,
            isArray } = useUtils();


//Your Shelf State
const yourShelfStore = useYourShelfStore();
const { yourShelf }  = storeToRefs(yourShelfStore)
const { addToShelf, 
        removeFromShelf } = useYourShelfStore();

//Reference Constants
const referenceStore = useReferenceStore();
const { categoryMap, 
        invCategoryMap,
        filterMap, 
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

function getFilterObject(targetFormat, sourceObject, viewModeType){
        let filterObject = {};
        for (let i = 0, formatKeys = Object.keys(targetFormat); i < formatKeys.length; i++) {
                filterObject[formatKeys[i]] = []
            }
        
        for (let i = 0, sourceKeys = Object.keys(sourceObject); i < sourceKeys.length; i++) {
            for (let j = 0, targetKeys = Object.keys(filterObject); j < targetKeys.length; j++) {
                let value = getIFP(sourceObject[i], targetKeys[j], viewModeType)
                if(isArray(value)) {filterObject[targetKeys[j]].push(...value) }
                else {filterObject[targetKeys[j]].push(value) }
            }
        }
        for (let i = 0, targetKeys = Object.keys(filterObject); i < targetKeys.length; i++) {
            filterObject[targetKeys[i]] = new Set(filterObject[targetKeys[i]]);
            filterObject[targetKeys[i]] = Array.from(filterObject[targetKeys[i]]).sort(alphabetically(true))
        }
        return filterObject
}



const filterObject = reactive(new Map())

onMounted(()=>{
    watchEffect(()=>{
        filterObject.set('Agent', getFilterObject(referenceStore.filterMap.get('Agent'), viewStore.libraryData, 'Agent'))
        filterObject.set('Book', getFilterObject(referenceStore.filterMap.get('Book'), viewStore.libraryData, 'Book'))
        filterObject.set('Mark', getFilterObject(referenceStore.filterMap.get('Mark'), viewStore.libraryData, 'Mark'))

        console.log('new filter Object',    filterObject)
        console.log('filter map Marks',    referenceStore.filterMap.get('Mark'))
    
  })
})

// console.log('filter map format',     Object.entries(referenceStore.filterMap.get('Agent')))
//     console.log('new filter Object',    agentsFilter)




</script>



<style lang="scss" scoped>



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
	// padding: 0.2rem 0 0.2rem 0.5rem;
    cursor: pointer;
}
.catalogue p{

	padding: 0.2rem 0 0.2rem 0.5rem;
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

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

    <div v-if="getActiveFilters.length">
        <h4 class="catalogue-title">Active Filters</h4>
        <div class="catalogue-filter-category-container">
        <button 
        v-for="filterValue in getActiveFilters"
            @click="filterActiveToggle(filterValue, filterValue.category, filterValue.itemType)" 
            class="catalogue-filter-category-box"
            :class="{ filterActive : filterObject.get(filterValue.itemType)[filterValue.category][filterValue.name].active }">
                <p class="catalogue-filter-category" > {{ filterValue.itemType }} | {{categoryMap.get(filterValue.itemType)[filterValue.category]}} | {{filterValue.name}}</p>
        </button>
        </div>
    </div>
    <div class="library-catalogue">
        <div class="catalogue-title-box"  @click="toggle('Agent')">
            <h4 class="catalogue-title">Agents</h4>
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="6" viewBox="0 0 11 6" fill="none" class="svg">
                <path d="M1 1.00002L5.72428 4.90478L10.1111 1.00002" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>
            </svg>
        </div>
        <div class="catalogue-container" :class="{ hidden : !visible.Agent, visible : visible.Agent}">  

            <div class="catalogue" v-for="category in Object.keys(filterMap.get('Agent'))">
                <VDropdown
                placement="right" 
                :triggers="['click']"
                :popperTriggers="['']"
                :delay="{ show: 0, hide: 0 }" 
                theme = "filter-dropdown"
                >
                    <p>{{ categoryMap.get('Agent')[category] }}</p>
                    <template #popper >
                        <div class="catalogue-filter-category-title-box">
                            <h3>Catalogue Values</h3>
                            <h2>Agent | {{ categoryMap.get('Agent')[category] }}</h2>
                            <p>Select a value to filter the library</p>
                        </div>
                        <div class="catalogue-filter-category-container">
                            <button 
                            v-for="filterValue in filterObject.get('Agent')[category]"
                            @click="viewStore.filterActiveToggle(filterValue, category, 'Agent')" 
                            class="catalogue-filter-category-box"
                            :class="{ filterActive : filterObject.get('Agent')[category][filterValue.name].active }">
                                <p class="catalogue-filter-category" >{{ filterValue.name }}</p>
                            </button>
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
            <div class="catalogue" v-for="category in Object.keys(filterMap.get('Book'))">
                <VDropdown
                placement="right" 
                :triggers="['click']"
                :popperTriggers="['']"
                :delay="{ show: 0, hide: 0 }" 
                theme = "filter-dropdown"
                >
                    <p>{{ categoryMap.get('Book')[category] }}</p>
                    <template #popper >
                        <div class="catalogue-filter-category-title-box">
                            <h3>Catalogue Values</h3>
                            <h2>Book | {{ categoryMap.get('Book')[category] }}</h2>
                            <p>Select a value to filter the library</p>
                        </div>
                        <div class="catalogue-filter-category-container">
                            <button 
                            v-for="filterValue in filterObject.get('Book')[category]"
                            @click="viewStore.filterActiveToggle(filterValue, category, 'Book')" 
                            class="catalogue-filter-category-box"
                            :class="{ filterActive : filterObject.get('Book')[category][filterValue.name].active }">
                                <p class="catalogue-filter-category" >{{ filterValue.name }}</p>
                            </button>
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
            <div class="catalogue" v-for="category in Object.keys(filterMap.get('Mark'))">
                <VDropdown
                placement="right" 
                :triggers="['click']"
                :popperTriggers="['']"
                :delay="{ show: 0, hide: 0 }" 
                theme = "filter-dropdown"
                >
                    <p>{{ categoryMap.get('Mark')[category] }}</p>
                    <template #popper >
                        <div class="catalogue-filter-category-title-box">
                            <h3>Catalogue Values</h3>
                            <h2>Mark | {{ categoryMap.get('Mark')[category] }}</h2>
                            <p>Select a value to filter the library</p>
                        </div>
                        <div class="catalogue-filter-category-container">
                            <button 
                            v-for="filterValue in filterObject.get('Mark')[category]"
                            @click="viewStore.filterActiveToggle(filterValue, category, 'Mark')" 
                            class="catalogue-filter-category-box"
                            :class="{ filterActive : filterObject.get('Mark')[category][filterValue.name].active }">
                                <p class="catalogue-filter-category" >{{ filterValue.name }}</p>
                            </button>
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


//View State
const viewStore = useViewStore();
const { 
        libraryDisplay,
        getActiveFilters,
        filterObject, } = storeToRefs(viewStore)
const { 
        filterActiveToggle,
 } = useViewStore();



//Reference Constants
const referenceStore = useReferenceStore();
const { categoryMap, 

        filterMap, 
    } = storeToRefs(referenceStore)


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



onMounted(()=>{
        // viewStore.filterObject.set('Agent', getFilterObject(referenceStore.filterMap.get('Agent'), viewStore.libraryData, 'Agent'))
        // viewStore.filterObject.set('Book', getFilterObject(referenceStore.filterMap.get('Book'), viewStore.libraryData, 'Book'))
        // viewStore.filterObject.set('Mark', getFilterObject(referenceStore.filterMap.get('Mark'), viewStore.libraryData, 'Mark'))
})

</script>



<style lang="scss" scoped>


.catalogue-filter-category-title-box h2{
    margin: 0 0.5rem 0.5rem;
    color: black;
    font-family: "Source Sans 3", sans-serif;
    font-size: 1.15rem;
    font-weight: 400;
    // letter-spacing: 0.425rem;
}
.catalogue-filter-category-title-box h3{
    margin: 0.35rem 0.5rem 0.15rem;
    font-family: "Raleway", sans-serif;
    font-size: 0.715rem;
    font-weight: 560;
    letter-spacing: 0.05rem;
    line-height: 1.25rem;
    color: rgb(138, 138, 138);
}
.catalogue-filter-category-title-box p{
    margin: 0.25rem 0.5rem;
    font-family: "Source Serif 4", serif;
    font-size: 0.8rem;
    font-weight: 350;
    letter-spacing: 0.05rem;
    color: rgb(22, 22, 22);
    white-space: wrap;
}
.catalogue-filter-category-container{
    margin: 1rem 0.5rem;
    display: flex;
    flex-flow: column wrap;
    max-height: 70vh;
    min-width: 0;
    min-height: 0;
    max-width: 80vw;
    overflow-y: auto;
    align-items: center;
    justify-content: center;
    
}
.catalogue-filter-category-box{
    max-width: fit-content;
    margin: 0.25rem 0.5rem;
    // max-width: 10rem;
    border-radius: 0.3rem;
    border: 0.1rem solid rgb(240, 240, 240);
    background: rgb(252, 252, 252);
    cursor: pointer;
}
.catalogue-filter-category{
    padding: 0.5rem 1rem;
    text-overflow: ellipsis;
    overflow:hidden;
    display: -webkit-box;
    max-height: 50px;
    padding: 4px 10px;
    max-width: 200px;
//  background-color: aqua;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}

.catalogue-filter-category-box:hover{
    background: rgb(240, 240, 240);
    // background: rgb(212, 212, 212);
}

// .catalogue-filter-category-box:focus{
//     background: rgb(252, 252, 252);
// }

.catalogue-filter-category-box.filterActive{
    background: rgb(156, 208, 233);
}


p.catalogue-filter-category{
    text-align: left;
	line-height: 0.9rem;
	font-family: 'Raleway', sans-serif;
	font-size: 0.7rem;
	font-weight: 500;
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

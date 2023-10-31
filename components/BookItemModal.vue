<template>
    <VMenu
        placement="top" 
        :delay="{ show: 50, hide: 200 }"
    >
    <div class="item-wrapper" v-on="itemHandlers" :style="{ maxHeight: scales.maxItemHeight + 'px', height: itemHeight(getIDP(item,'height')) + 'px', width:scales.minItemWidth + 'px'}">    
        <div class="book-item-background" :style="{ maxHeight: scales.maxItemHeight + 'px', height: itemHeight(getIDP(item,'height')) + 'px',width:scales.minItemWidth + 4 + 'px'}"></div>

        <div class="book-item" :style="{ maxHeight: scales.maxItemHeight-4 + 'px', height: itemHeight(getIDP(item,'height'))-4 + 'px' , background: itemColour(getIDP(item, 'colour')),
        width:scales.minItemWidth + 'px'}" :class="{lowlight: isHighlight}">


        <div class="item-value" :style="{ color: contrastHandler(itemColour(getIDP(item, 'colour')))}">
            <p >{{ getIDP(item, itemBundle.labelViewMode) }}</p>
        </div>
        </div>
    </div>
        <template #popper >
            <div class="item-menu-container scrollable">
            <div class="item-menu-header-container">
                <h2 class="item-menu-header">{{ itemBundle.menuHeader }}</h2>
                <h2 class="item-menu-subheader"> 
                    {{ handleObjectProperty(item, itemBundle.menuSubheader) }}
                </h2>
                <p class="item-menu-subheader-type">
                    {{categoryMap.get(itemBundle.itemType)[itemBundle.menuSubheader]}}
                </p>
            </div>
            <div class="item-menu">
                <div class="shelf-button-wrapper">
                    <button class="shelf-button" @click="$emit('viewDetails', item)"> View Details </button>
                </div>
            </div>
        </div>
        </template>
    </VMenu>
    <div class="section-shelf-box">
    <!-- Shelf Box DO NOT DELETE -->
    </div>


</template>

<script setup>
import * as d3 from "d3";
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'
import { storeToRefs } from "pinia";
// import { VueperSlides, VueperSlide } from 'vueperslides'
// import 'vueperslides/dist/vueperslides.css'


const supabase = useSupabaseClient()
//Props
const {item, itemBundle} = defineProps(['item', 'itemBundle']);
const {viewDetails} = defineEmits(['viewDetails']);
// STATE MANAGERS IMPORT //    
//View State
const viewStore = useViewStore();
const { libraryData,
        libraryDisplay,
        formattedLibrary, 
        itemHeight,
        itemColour, 
        viewHeightBounds, 
        viewColourSet } = storeToRefs(viewStore)
const { parseDatabase,
        handleViewSelection,
        getIDP,
        itemTypeCheck } = useViewStore();
    

//Reference Constants
const referenceStore = useReferenceStore();
const { categoryMap, 
        invCategoryMap, 
        scales } = storeToRefs(referenceStore)

// COMPOPSABLES
//Utility Functions
const { handleObjectProperty,
        contrastHandler } = useUtils();


//Kept due to temporary use in template.
const isHighlight = ref(false);


// Event Handlers
const itemHandlers = {
  mouseover: handleMouseOver,
  mouseout: handleMouseOut
}

// const bookSlides = ref(
//     { 
//         image: "",
//         title: "my title",
//         content: "my content",
//     }
// )

// async function bookImages(item){
//     const { data, error } = await supabase
//     .storage
//     // .listBuckets()
//     .from('book-images')
//     // .list('10')
//     .list(`${item.BookID}`, {
//         limit: 100,
//         offset: 0,
//         sortBy: { column: 'name', order: 'asc' },
//     })
//     if(error) {
//             console.log(error)
//     }

//     if(data){
//         bookSlides.value.image = data
//         return data
//     }
// }

// onMounted(()=>{
//     bookImages(item)
// })

function handleMouseOver(d) {
    d3.select(d.currentTarget)
        .style('transform', getUpPos(d.currentTarget, true));
}

function handleMouseOut(d) {
    d3.select(d.currentTarget)
        .style('transform', getUpPos(d.currentTarget, false));
}

function getUpPos(elm, isUp) {
    if( elm.classList.contains('item-wrapper')){
    return `translate(0, ${(isUp ? -10 : 0)}px)`
    }
}

</script>

<style scoped>

</style>
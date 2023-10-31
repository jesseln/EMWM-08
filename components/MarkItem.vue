<template>
    <VMenu
        placement="top" 
        :delay="{ show: 50, hide: 200 }"
        @show="menuShown"
    >
        <div class="item-wrapper" v-on="itemHandlers" :style="{ maxHeight: scales.maxItemHeight + 'px', height: itemHeight(getIDP(item,'height')) + 'px', width:scales.minItemWidth + 'px'}">    
            <div class="mark-item-top" :style="{ background: itemColour(getIDP(item, 'colour')), width:scales.minItemWidth - 2 + 'px'}"></div>
            <div class="mark-item-top-background" :style="{ width:scales.minItemWidth + 2 + 'px'}"></div>
            <div class="mark-item-background" :style="{ maxHeight: scales.maxItemHeight-20  + 'px', height: itemHeight(getIDP(item,'height'))-20 + 'px',width:scales.minItemWidth + 2 + 'px'}"></div>

            <div class="mark-item" :style="{ maxHeight: scales.maxItemHeight-23 + 'px', height: itemHeight(getIDP(item,'height'))-23 + 'px' , background: itemColour(getIDP(item, 'colour')),
            width:scales.minItemWidth - 2 + 'px'}" :class="{lowlight: isHighlight}">


<div class="item-value" :style="{ color: contrastHandler(itemColour(getIDP(item, 'colour')))}">
            <p >{{ getIDP(item, itemBundle.labelViewMode) }}</p>
        </div>
        </div>
    </div>
    <template #popper >
            <div class="item-menu-container scrollable">
            <div class="item-menu-header-container">
                <h2 class="item-menu-header">{{ itemBundle.menuHeader }}</h2>
                <h2 class="item-menu-subheader-ID">{{ handleObjectProperty(item, itemBundle.ownProp1) }}</h2>
                <h2 class="item-menu-subheader"> 
                    {{ handleObjectProperty(item, itemBundle.menuSubheader) }}
                </h2>
                <p class="item-menu-subheader-type">
                    {{categoryMap.get(itemBundle.itemType)[itemBundle.menuSubheader]}}
                </p>
            </div>
            <div class="item-menu-totals-wrapper">
            <div class="item-menu-totals">
                        <div class="item-menu-totals-badge">
                            <div class="item-menu-icon-container">
                                <svg xmlns="http://www.w3.org/2000/svg" :width="11*icons.agentIcon.iconWidth" :height="33*icons.agentIcon.iconHeight" viewBox="0 0 11 33" fill="none">
                                    <path d="M0 5.35535C0 2.39767 2.39767 0 5.35535 0C8.31302 0 10.7107 2.39767 10.7107 5.35535V26.7767C10.7107 29.7344 8.31302 32.1321 5.35535 32.1321C2.39767 32.1321 0 29.7344 0 26.7767V5.35535Z" :fill="icons.agentIcon.iconFill"/>
                                </svg>
                            </div>
                            <p>{{itemLibraryCount[0]}}</p>
                        </div>
                    <div class="item-menu-totals-badge">
                        <div class="item-menu-icon-container">
                            <svg xmlns="http://www.w3.org/2000/svg" :width="10*icons.bookIcon.iconWidth" :height="30*icons.bookIcon.iconHeight" viewBox="0 0 10 30" fill="none">
                                <path d="M0.00512695 0H10V29.9846H0.00512695V0Z" :fill="icons.bookIcon.iconFill"/>
                            </svg>
                        </div>
                        <p>{{itemLibraryCount[1]}}</p>
                    </div>
                    <div class="item-menu-totals-badge">
                        <div class="item-menu-icon-container">
                            <svg xmlns="http://www.w3.org/2000/svg" :width="10*icons.markIcon.iconWidth" :height="33*icons.markIcon.iconHeight" viewBox="0 0 10 33" fill="none">
                                <path d="M0.379883 6.90698L4.99988 0L9.61988 6.90698V33H0.379883V6.90698Z" :fill="icons.markIcon.iconFill"/>
                            </svg>
                        </div>
                        <p>{{itemLibraryCount[2]}}</p>
                    </div>
                </div>
            </div>
            <div class="item-menu-details-button">
                <div class="shelf-button-wrapper">
                    <button class="catalogue-filter-category-box details-button" @click="$emit('viewDetails', item)"> View Details </button>
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

//Props
const {item, itemBundle} = defineProps(['item', 'itemBundle']);
const {viewDetails} = defineEmits(['viewDetails']);

// STATE MANAGERS IMPORT //    
//View State
const viewStore = useViewStore();
const { libraryData,
        libraryDisplay,
        formattedLibrary, 
        formattedItemLibrary,
        filterLibrary,
        itemHeight,
        itemColour, 
        viewHeightBounds, 
        viewColourSet } = storeToRefs(viewStore)
const { parseDatabase,
        handleViewSelection,
        getIDP,
        itemTypeCheck,
        getItemLibrary,
        getItemLibraryCount } = useViewStore();
    
//Reference Constants
const referenceStore = useReferenceStore();
const { categoryMap, 
        invCategoryMap, 
        scales } = storeToRefs(referenceStore)

// COMPOPSABLES
//Utility Functions
const { handleObjectProperty,
        contrastHandler } = useUtils();
        
//Function format written to use local vairables and return to reactive value
function iconDimensions(){
    const scaleWidth = 1;
    const scaleHeight = 1;
    const fill = '#999';
    return {
        agentIcon:{
            iconHeight: 0.9  * scaleHeight,
            iconWidth: 0.7 * scaleWidth,
            iconFill: fill,
        },
        bookIcon:{
            iconHeight: 1 * scaleHeight,
            iconWidth: 0.7 * scaleWidth,
            iconFill: fill,
        },
        markIcon:{
            iconHeight: 0.9 * scaleHeight,
            iconWidth: 0.75 * scaleWidth,
            iconFill: fill,
        },
    }
}

const icons = ref()

watchEffect(()=>{
    icons.value = iconDimensions()
})

//Kept due to temporary use in template.
const isHighlight = ref(false);
const itemLibraryCount = ref([])

function menuShown() {
    // console.log(item)
    itemLibraryCount.value = getItemLibraryCount(item)
    
}

// Event Handlers
const itemHandlers = {
  mouseover: handleMouseOver,
  mouseout: handleMouseOut
}

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
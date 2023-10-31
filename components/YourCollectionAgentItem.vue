<template>
    <VMenu
        placement="top" 
        :delay="{ show: 50, hide: 200 }"
        @show="menuShown"
    >
    <div class="item-wrapper" v-on="itemHandlers" :style="{ maxHeight: scales.maxItemHeight + 'px', height: itemHeightYC(getIDP_YC(item,'height')) + 'px', width:scales.minItemWidth + 'px'}"> 

        <div class="agent-item-background" :style="{ maxHeight: scales.maxItemHeight + 'px', height: itemHeightYC(getIDP_YC(item,'height')) + 'px',width:scales.minItemWidth + 4 + 'px'}"></div>

        <div class="agent-item" :style="{ maxHeight: scales.maxItemHeight-4 + 'px', height: itemHeightYC(getIDP_YC(item,'height'))-4 + 'px' , background: itemColourYC(getIDP_YC(item, 'colour')),
        width:scales.minItemWidth + 'px'}" :class="{lowlight: isHighlight}">


        <div class="item-value" :style="{ color:  contrastHandler(itemColourYC(getIDP_YC(item, 'colour')))}">
            <p >{{ getIDP_YC(item, itemBundle.labelViewMode) }}</p>
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
                    <button class="catalogue-filter-category-box details-button" @click="$emit('viewDetails', item)"> View Details </button>
                </div>
                <div class="shelf-button-wrapper">
                    <button class="shelf-button" @click="itemBundle.yourCollectionFunction(item)">{{itemBundle.yourCollectionText}}</button>
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
const yourCollectionStore = useYourCollectionStore();
const { allColleciton,
        yourCollection, 
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
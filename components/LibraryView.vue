<template>
    <div class="library-wrapper">
        <div class="slider range">
            <label for="fader"> </label>
            <input type="range" min="0" max="100" v-model="zoomLevel" id="fader" step="50" list="volsettings">
            <datalist id="volsettings">
                <option>0</option><option>50</option><option>100</option>
            </datalist>
        </div> 
   
    <div class="shelf" v-for="shelf in filterLibrary" :key="shelf">
        <div class="shelf-title-box">
            <h2 class="shelf-title">{{shelf[0]}}</h2>
        </div>
        <div class="shelf-inner" >
            <template class="section-wrapper" v-for="bookend in shelf[1]" :key="bookend" >
                    <div class="section-title-box-wrapper">
                    <div class="section-title-box" :style="{ height: scales.maxShelfHeight + 'px'}">
                        <h3 class="section-category">{{ categoryMap.get(libraryDisplay.viewType.bookend)[libraryDisplay.view.bookend] }}</h3>
                        <h3 class="section-value">{{ bookend[0] }}</h3>
                        <div class="section-shelf-box">
                        <!-- Shelf Box DO NOT DELETE -->
                        </div>
                    </div>
                        <div class="section-inner" 
                        :class="{ 
                            zoomOut : zoomLevel === '0',
                            zoomMid : zoomLevel === '50',
                            zoomIn : zoomLevel === '100',
                        }"
                        v-for="item in bookend[1].slice(0,1)" 
                        :key="JSON.stringify(item)" 
                        :style="{ height: scales.maxShelfHeight + 'px'}">
                            <LazyAgentItem @viewDetails="showModal" v-if="itemTypeCheck(item) === 'Agent'" :item="item" :itemBundle="libraryItemBundle.Agent"/>
                            <LazyBookItem @viewDetails="showModal" v-if="itemTypeCheck(item) === 'Book'" :item="item" :itemBundle="libraryItemBundle.Book"/>
                            <LazyMarkItem @viewDetails="showModal" v-if="itemTypeCheck(item) === 'Mark'" :item="item" :itemBundle="libraryItemBundle.Mark"/>
                    </div> 
                
                    </div>
                    <div class="section-inner" 
                        v-for="item in bookend[1].slice(1, 
                        bookend[1].length)" 
                        :class="{ 
                            zoomOut : zoomLevel === '0',
                            zoomMid : zoomLevel === '50',
                            zoomIn : zoomLevel === '100',
                        }"
                        :key="JSON.stringify(item)" 
                        :style="{ height: scales.maxShelfHeight + 'px'}">
                        <LazyAgentItem @viewDetails="showModal" v-if="itemTypeCheck(item) === 'Agent'" :item="item" :itemBundle="libraryItemBundle.Agent"/>
                        <LazyBookItem @viewDetails="showModal" v-if="itemTypeCheck(item) === 'Book'" :item="item" :itemBundle="libraryItemBundle.Book"/>
                        <LazyMarkItem @viewDetails="showModal" v-if="itemTypeCheck(item) === 'Mark'" :item="item" :itemBundle="libraryItemBundle.Mark"/>
                    </div>
                </template>
        </div>
    </div>
    <div class="modal-background"  ref="modalBackground">
        <div class="item-modal-content-outer" ref="itemModalContentOuter">
            <div class="item-modal-content" ref="itemModalContent" >
                <ItemModal :key="_item" v-if="_item" @close="hideModal" :_item="_item" />
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
    import { storeToRefs } from "pinia";
   
    // STATE MANAGERS IMPORT //    
    //View State
    const viewStore = useViewStore();
    const { libraryData,
            libraryDisplay,
            formattedLibrary, 
            filterLibrary,
            itemHeight,
            itemColour, 
            viewHeightBounds, 
            viewColourSet } = storeToRefs(viewStore)
    const { parseDatabase,
            handleViewSelection,
            getIDP,
            itemTypeCheck } = useViewStore();
        
const yourCollectionStore = useYourCollectionStore();
const { allCollections,
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
    const { zoomLevel,
            categoryMap, 
            invCategoryMap, 
            scales,
            libraryItemBundle } = storeToRefs(referenceStore)

  const itemModalContent = ref(null)
  const itemModalContentOuter = ref(null)
  const modalBackground = ref(null)
  const _item = ref(null)
         
  function showModal(item){
    //Component Prop
    _item.value = item;
    //Styles
    itemModalContent.value.style.transitionDelay = '.15s'
    itemModalContent.value.style.visibility = 'visible'
    modalBackground.value.style.transitionDelay = '.075s'
    modalBackground.value.style.visibility = 'visible'
    itemModalContentOuter.value.style.transitionDelay = '.075s'
    itemModalContentOuter.value.style.visibility = 'visible'
  }

  const hideModal = ()=>{
    itemModalContent.value.style.transitionDelay = '.3s'
    itemModalContent.value.style.visibility = 'hidden'
    modalBackground.value.style.transitionDelay = '.15s'
    modalBackground.value.style.visibility = 'hidden'
    itemModalContentOuter.value.style.transitionDelay = '.15s'
    itemModalContentOuter.value.style.visibility = 'hidden'
  }

  onClickOutside(itemModalContent, (event) => {
    if(itemModalContent.value.style.visibility === 'visible' && event.target.matches('.modal-background')){
        itemModalContent.value.style.transitionDelay = '.3s'
        itemModalContent.value.style.visibility = 'hidden'
        modalBackground.value.style.transitionDelay = '.15s'
        modalBackground.value.style.visibility = 'hidden'
        itemModalContentOuter.value.style.transitionDelay = '.15s'
        itemModalContentOuter.value.style.visibility = 'hidden'
    }  
  })

  watchEffect(()=>{
    // console.log('zoomLevel', zoomLevel.value)
    // console.log('scales', referenceStore.scales)
  })

</script>

<style lang="scss" scoped>

.section-inner.zoomOut{
	gap: 0px 0.25rem;
}
.section-inner.zoomMid{
	gap: 0px 0.5rem;
}
.section-inner.zoomIn{
	gap: 0px 0.8rem;
}




.slider {
    z-index: 200;
    position: fixed;
    top: 50%;
    right: 0;
    // transform: translate(-50%,-50%);
    width: 15vh;
    height: 2.5vw;
    // padding: 30px;
    // padding-left: 40px;
    background: #fcfcfc;
    border-radius: 20px;
    display: flex;
    align-items: center;
    box-shadow: 0px 15px 40px #7E6D5766;
}
.slider label {
    font-size: 24px;
    font-weight: 400;
    font-family: Open Sans;
    padding-left: 10px;
    color: black;
}
.slider input[type="range"] {
    width: 420px;
    height: 2px;
    background: black;
    border: none;
    outline: none;
} 
.range{
    // margin-top:10%;
    -webkit-transform:rotate(90deg);
    -moz-transform:rotate(90deg);
    -o-transform:rotate(90deg);
    transform:rotate(270deg);
}
   
   
.modal-background{
    display: block;
    visibility: hidden;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1040;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.1);
    -webkit-backdrop-filter: blur(0.06rem);
    backdrop-filter: blur(0.06rem);
}
.item-modal-content-outer{
    display: grid;
    grid-template-rows: 100vh;
    position: fixed;
    top: 0;
    max-width: 76vw;
    left: 12vw;
    align-items: center;
    justify-content: center;
    align-content: center;
}
  .item-modal-content {
    grid-row: 1 / 2;
    display: flex;
    flex-flow: column wrap;
    visibility: hidden;
    height: fit-content;
    width: fit-content;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 3px 12px 0px;
    z-index: 200;
    background: #ffffff;
    padding: 7px;
    border: 0.1rem #eeeeee solid;
    border-radius: 0.3rem;
    justify-content: center;
    align-content: center;
    align-items: center;
  }
  
  /* .dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  } */

//   .item-modal a:hover {background-color: #ddd;}


</style>
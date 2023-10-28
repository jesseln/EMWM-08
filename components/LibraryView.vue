<template>
    <div class="library-wrapper">
    <div class="shelf" v-for="shelf in filterLibrary" :key="shelf">
        <div class="shelf-title-box">
            <h2 class="shelf-title">{{shelf[0]}}</h2>
        </div>
        <div class="shelf-inner">
            <div class="section-wrapper" v-for="bookend in shelf[1]" :key="bookend" >
                <div class="section-title-box" :style="{ height: scales.maxShelfHeight + 'px'}">
                    <h3 class="section-category">{{ categoryMap.get(libraryDisplay.viewType.bookend)[libraryDisplay.view.bookend] }}</h3>
                    <h3 class="section-value">{{ bookend[0] }}</h3>
                    <div class="section-shelf-box">
                    <!-- Shelf Box DO NOT DELETE -->
                    </div>
                </div>
                    <div class="section-inner" v-for="item in bookend[1]" :key="JSON.stringify(item)" :style="{ height: scales.maxShelfHeight + 'px'}">
                        <AgentItem v-if="itemTypeCheck(item) === 'Agent'" :item="item" :itemBundle="libraryItemBundle.Agent"/>
                        <BookItem @viewDetails="showModal" v-if="itemTypeCheck(item) === 'Book'" :item="item" :itemBundle="libraryItemBundle.Book"/>
                        <MarkItem v-if="itemTypeCheck(item) === 'Mark'" :item="item" :itemBundle="libraryItemBundle.Mark"/>
                    </div>
            </div>
        </div>
    </div>
    <div class="modal-background"  ref="modalBackground">
        <div class="item-modal-content" ref="itemModalContent" >
            <ItemModal :key="itemDetails" v-if="itemDetails" @close="hideModal" :itemDetails="itemDetails" />
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
        
    //Your Shelf State
    const yourShelfStore = useYourShelfStore();
    const { yourShelf }  = storeToRefs(yourShelfStore)
    const { addToShelf, 
           removeFromShelf } = useYourShelfStore();

    //Reference Constants
    const referenceStore = useReferenceStore();
    const { categoryMap, 
            invCategoryMap, 
            scales,
            libraryItemBundle } = storeToRefs(referenceStore)

  const itemModalContent = ref(null)
  const modalBackground = ref(null)
  const itemDetails = ref(null)
         
  function showModal(item){
    //Component Prop
    itemDetails.value = item;
    //Styles
    itemModalContent.value.style.transitionDelay = '.15s'
    itemModalContent.value.style.visibility = 'visible'
    modalBackground.value.style.transitionDelay = '.075s'
    modalBackground.value.style.visibility = 'visible'
  }

  const hideModal = ()=>{
    itemModalContent.value.style.transitionDelay = '.3s'
    itemModalContent.value.style.visibility = 'hidden'
    modalBackground.value.style.transitionDelay = '.15s'
    modalBackground.value.style.visibility = 'hidden'
  }

  onClickOutside(itemModalContent, (event) => {
    if(itemModalContent.value.style.visibility === 'visible'){
        itemModalContent.value.style.transitionDelay = '.3s'
        itemModalContent.value.style.visibility = 'hidden'
        modalBackground.value.style.transitionDelay = '.15s'
        modalBackground.value.style.visibility = 'hidden'
    }  
  })

</script>

<style lang="scss" scoped>
.modal-background{
    display: block;
    visibility: hidden;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1040;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.05);
    backdrop-filter: blur(0.02rem);
}
  .item-modal-content {
    display: block;
    visibility: hidden;
    position: fixed;
    left: 12vw;
    top: 3rem;
    // background-color: #ffffff;
    min-width: 76vw;
    max-width: 76vw;
    min-height: 85vh;
    max-height: 85vh;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 3px 12px 0px;
    z-index: 200;
    background: #ffffff;
    padding: 7px;
    border: 0.1rem #eeeeee solid;
    border-radius: 0.3rem;
    margin: 0 0 2rem;
  }
  
  /* .dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  } */

//   .item-modal a:hover {background-color: #ddd;}


</style>
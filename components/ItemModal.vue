<template>
    <div class="item-modal-container">
        <div class="item-modal-header">
            <h2>{{onMounteditem[onMountedID]}}</h2>
            <h3 v-if="imageFound" > </h3>
            <div class="shelf-button-wrapper">
                <button class="shelf-button" @click="$emit('close')"> Close </button>
            </div>
        </div>
        <div v-if="imageFound" class="item-modal-images">
            <div class="item-modal-image-slider">

                <vueper-slides :dragging-distance="70"
                fractions progress
                class="no-shadow" 
                slide-image-inside
                :visible-slides="imageSlides.image.length <= 4? imageSlides.image.length: 4"
                slide-multiple
                :slide-ratio="1 / 4"
                :gap="1"
                :arrows-outside="false"
                :bullets="false"
                prevent-y-scroll 
                lazy 
                lazy-load-on-drag>
                    <vueper-slide
                        v-for="itemImage in imageSlides.image"
                        :key="itemImage"
                        :image="`https://hmgugjmjfcvjtmrrafjm.supabase.co/storage/v1/object/public/${imageFolder}/${item[itemID]}/${itemImage.name}`"
                        />
                </vueper-slides>
          
            </div>
        </div>
        <div class="item-modal-details">
        </div>
        <div class="item-modal-associated">
            <div class="item-modal-shelf scrollable" v-for="shelf in formattedItemLibrary" :key="shelf">
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
                    <div class="section-inner" v-for="item2Display in bookend[1]" :key="JSON.stringify(item2Display)" :style="{ height: scales.maxShelfHeight + 'px'}">
                        <AgentItemModal @viewDetails="updateModal" v-if="itemTypeCheck(item2Display) === 'Agent'" :item="item2Display" :itemBundle="libraryItemBundle.Agent"/>
                        <BookItemModal @viewDetails="updateModal" v-if="itemTypeCheck(item2Display) === 'Book'" :item="item2Display" :itemBundle="libraryItemBundle.Book"/>
                        <MarkItemModal @viewDetails="updateModal" v-if="itemTypeCheck(item2Display) === 'Mark'" :item="item2Display" :itemBundle="libraryItemBundle.Mark"/>
                    </div>
            </div>
        </div>
    </div>
        </div>
    </div>
</template>

<script setup>
import { VueperSlides, VueperSlide } from 'vueperslides'
import { storeToRefs } from "pinia";
import 'vueperslides/dist/vueperslides.css'
const {_item} = defineProps(['_item']);
const supabase = useSupabaseClient()



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
        getItemLibrary } = useViewStore();
    

//Reference Constants
const referenceStore = useReferenceStore();
const { categoryMap, 
        invCategoryMap, 
        scales,
        libraryItemBundle } = storeToRefs(referenceStore)

const onMounteditem = ref(_item) 
const onMountedID = ref()       
const item = ref(_item)
const itemID = ref();
const imageRequestID = ref();
const imageFolder = ref();
const itemType = ref()
const imageFound = ref(false);
const imageSlides = ref(
    { 
        image: [],
        title: "my title",
        content: "my content",
    }
)


function updateModal(updateItem){
    item.value = updateItem
    itemType.value = itemTypeCheck(item.value)
    updateItemRefs(item.value)
}

function getItemID(soureItem){
    let itemType = itemTypeCheck(soureItem)
    if(itemType === 'Agent') return 'FemaleAgentID'
    if(itemType === 'Book') return 'BookID'
    if(itemType === 'Mark') return 'MargID'
}

onMountedID.value = getItemID(_item)

function updateItemRefs(){
    if(itemType.value === 'Agent'){
        itemID.value = 'FemaleAgentID'
    } 
    if(itemType.value === 'Book'){
        itemID.value = 'BookID'
        imageRequestID.value = 'BookID'
        imageFolder.value = 'book-images'
    } 
    if(itemType.value === 'Mark'){
        itemID.value = 'MargID'
        imageRequestID.value = 'MargID'
        imageFolder.value = 'mark-images'
    } 
}

async function getImages(item){
    imageFound.value = false
    const { data, error } = await supabase
    .storage
    // .listBuckets()
    .from(`${imageFolder.value}`)
    // .list('10')
    .list(`${item[imageRequestID.value]}`, {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' },
    })
    if(error) {
            console.log(error)
    }

    if(data){
        imageFound.value = true
        // console.log(data)
        imageSlides.value.image = data
        return data
    }
}

onMounted(()=>{
    itemType.value = itemTypeCheck(item.value)
    updateItemRefs(item.value)
    getItemLibrary(item.value)
    watch(item,()=>{
        if(itemType.value !== 'Agent') {
            // console.log('itemTYpe ',itemType.value)
            getImages(item.value)
        }
    }, { immediate: true })
})




</script>

<style lang="scss" scoped>
.item-modal-shelf{
    margin: 1rem 2rem;
    max-height: 15rem;
}
.item-modal-container{
    padding: 10px 0;
    display: grid;
	grid-template-rows: 1fr 10rem 4fr 4fr;
    justify-content: space-between;
    align-content: flex-end;
    align-items: flex-start;
    color: black;
    min-width: 75vw;
    max-width: 75vw;
    min-height: 84vh;
    max-height: 84vh;
    // text-align: left;
    min-width: 0;
    min-height: 0;
}

.item-modal-header{
    grid-row: 1 / 2;
    min-width: 75vw;
}

.item-modal-images{
    display: block;
    position: relative;
    grid-row: 2 / 3;
    // left: 3rem;
    margin: 0 1rem;
    max-width: 75vw;
    max-height: 20rem;
}
.item-modal-image-slider{
    height: 15px;
}
.item-modal-details{
    grid-row: 3 / 4;
    min-width: 75vw;
}
.item-modal-associated{
    grid-row: 4 / 5;
    min-width: 75vw;
    align-self: end;
}

</style>
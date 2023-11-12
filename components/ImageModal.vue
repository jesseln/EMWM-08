<template>
    <div class="item-modal-container">
        <div class="item-modal-header">
            <div class="item-modal-header-LHS">
                    <p>Library Item Selected</p>
                <div v-if="itemTypeCheck(_itemImage) === 'Agent'"  class="item-modal-header-title"  :style="{ borderRadius: '5rem', background: itemColour(getIDP(_itemImage, 'colour')), color: contrastHandler(itemColour(getIDP(_itemImage, 'colour')))}">
                    <!-- <p>Library Item Selected </p> -->
                    <p>{{ onMountedType }} </p>
                    <h3>{{onMounteditem['Female agent name']}}</h3>
                </div>
                <div v-if="itemTypeCheck(_itemImage) === 'Book'"  class="item-modal-header-title"  :style="{ borderRadius: '0.25rem', background: itemColour(getIDP(_itemImage, 'colour')), color: contrastHandler(itemColour(getIDP(_itemImage, 'colour')))}">
                    <!-- <p>Library Item Selected </p> -->
                    <p>{{ onMountedType }} No. </p>
                    <h3>{{onMounteditem[onMountedID]}}</h3>
                </div>
                <div v-if="itemTypeCheck(_itemImage) === 'Mark'"  class="item-modal-header-title"  :style="{ borderWidth: '0.125rem', margin: '0 0 0 1rem', borderRadius: '0.25rem', background: itemColour(getIDP(_itemImage, 'colour')), color: contrastHandler(itemColour(getIDP(_itemImage, 'colour')))}">
                    <div class="mark-item-top mark-item-modal" :style="{ background: itemColour(getIDP(_itemImage, 'colour')), width:scales.minItemWidth - 2 + 'px'}"></div>
                    <div class="mark-item-top-background mark-item-modal" :style="{ width:scales.minItemWidth -1 + 'px'}"></div> <!-- <p>Library Item Selected </p> -->
                    <p>{{ onMountedType }} No. </p>
                    <h3>{{onMounteditem[onMountedID]}}</h3>
                </div>
            </div>


            <div class="item-modal-header-RHS">
                <p v-if="imageFound" > Total Images: {{ imageSlides.image.length }}</p>
               
                <button class="shelf-button item-modal-close-button" @click="$emit('close')"> 
                    <Icon name="ic:baseline-cancel" size="1.5rem" class="close-button" />
                </button>
            </div>
        </div>
        <div class="image-modal-container scrollable">
            <div class="image-modal">
                <div class="image-modal-inner" ref="imageHover">
                    <NuxtImg 
                    :height="maxImageHeight"
                    :src="`https://hmgugjmjfcvjtmrrafjm.supabase.co/storage/v1/object/public/${_itemImage.imageFolder}/${_itemImage.item[_itemImage.itemID]}/${_itemImage.name}`"
                    loading="lazy"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { VueperSlides, VueperSlide } from 'vueperslides'
import { storeToRefs } from "pinia";
import 'vueperslides/dist/vueperslides.css'
const {_itemImage} = defineProps(['_itemImage']);
const {close} = defineEmits(['close']);
const supabase = useSupabaseClient()



//Old Colour Scheme for non selected items
//Agent #CDBAE9
//Book #ADE2B6
//Mark #FBE27D


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

//View State
const yourCollectionStore = useYourCollectionStore();
const { allCollections,
        collectionName,
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
        removeFromCollection,
        getCollectionData } = useYourCollectionStore();

//Reference Constants
const referenceStore = useReferenceStore();
const { categoryMap, 
        invCategoryMap, 
        scales,
        libraryItemBundle,
        viewMap,
        colourMapFiltered,
        itemModalMap,
        windowHeight,
        windowWidth,
    } = storeToRefs(referenceStore)

                // COMPOPSABLES
//Utility Functions
const { handleObjectProperty,
        handleObjectPath,
        contrastHandler } = useUtils();

const onMounteditem = ref(_itemImage) 
const onMountedID = ref(); 
const onMountedName = ref();
const onMountedType = ref();
const item = ref(_itemImage)
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


onMountedID.value = getItemID(_itemImage)
onMountedType.value = itemTypeCheck(_itemImage)

function updateItemRefs(){
    imageFound.value = false
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
    .from(`${imageFolder.value}`)
    .list(`${item[imageRequestID.value]}`, {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' },
    })
    if(error) {
            console.log(error)
    }
    if(data){
        imageSlides.value.image = data
        imageFound.value = data.length > 0 ? true : false
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


const value = computed (()=> {
        return { 
            section: `${viewStore.libraryDisplay.viewType['shelf']}:${[viewStore.libraryDisplay.view['shelf']]}`,
    }
    })

    const visible = reactive({
        section: false,
    })

    const section = ref(false)




const imageHover = ref()
const isHovered = useElementHover(imageHover)
const imageContainer = useParentElement(imageHover)
const { width, height } = useElementSize(imageHover)
const extractor = (event) => event instanceof Touch ? null : [event.offsetX, event.offsetY]
const { x, y, sourceType } = useMouse({ target: imageContainer, type: extractor })

const maxImageHeight = computed(()=>{
    console.log(windowHeight.value)
    return windowHeight.value - 150
})

watch([isHovered,x,y] ,()=>{
    if(isHovered.value){
        imageHover.value.style.transform = 'scale(3)'
        imageHover.value.style.transformOrigin = `${x.value/width.value*100}% ${y.value/height.value*100}%`
        // console.log(`${x.value/width.value*100}% ${y.value/height.value*100}%`)
    }
    if(!isHovered.value){
        imageHover.value.style.transform = 'scale(1)'
    }
})


    // .on('mouseover', function(){
    //   $(this).children('.photo').css({'transform': 'scale('+ $(this).attr('data-scale') +')'});
    // })
    // .on('mouseout', function(){
    //   $(this).children('.photo').css({'transform': 'scale(1)'});
    // })
    // .on('mousemove', function(e){
    //   $(this).children('.photo').css({'transform-origin': ((e.pageX - $(this).offset().left) / $(this).width()) * 100 + '% ' + ((e.pageY - $(this).offset().top) / $(this).height()) * 100 +'%'});
    // })


</script>

<style lang="scss" scoped>
.section-inner-item-modal{
    // margin: 1vh 0; 
}
.item-modal-close-button{
    position: relative;
    padding: 0.1rem;
    border-radius: 10rem;
}
.close-button{
    position: relative;
    width: 1.5rem;
    height: 1.5rem;
    top: unset;
    right: unset;
}
.close-button:hover{
    color: rgb(126, 126, 126);
}
.mark-item-modal{
    transform: rotate(-90deg) translate(-7px, 0);
    transform-origin: bottom left;
}
.no-image-found{
    width: 100%;
    background: #ececec;
    min-height: 32vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.no-image{

    box-shadow: rgba(0, 0, 0, 0.05) 0px 3px 12px 0px;
    background: #ffffff;
    border-radius: 0.5rem;
}
.item-modal-details-title{
    display: flex;
    flex-flow: column wrap;
    border-right: 1px solid #ccc;
    min-width: 6rem;
    padding: 0 0.5rem 0 0;
    justify-content: center;
    align-content: flex-start;
    align-items: flex-start;
}
.item-modal-details-title p{

	font-family: 'Raleway', sans-serif;
	font-size: 1rem;
	font-weight: 550;
	color: rgb(30, 30, 30);
	width: 100%;

}
.item-modal-details-title h3{

	font-family: 'Raleway', sans-serif;
	font-size: 1.8rem;
	font-weight: 550;
	color: rgb(30, 30, 30);
	width: 100%;

}
.item-modal-details-category-wrapper{
    display: flex;
    flex-flow: row wrap;
    align-items: center;
}
.item-modal-details-category{
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    margin: 0 1.5rem 2vh;
}
.item-modal-details-category h3{
	font-family: 'Raleway', sans-serif;
	font-size: 0.9rem;
	font-weight: 550;
	color: rgb(30, 30, 30);
	width: 100%;
	text-align: center;
    max-width: 16rem;
    text-overflow: ellipsis;
    overflow:hidden;
    display: -webkit-box;
    max-height: 100px;
    max-width: 200px;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
}


.item-modal-details-category p{
	margin: 0.2rem 0 0rem;
	font-family: 'Raleway', sans-serif;
	font-size: 0.6rem;
	font-weight: 450;
	color: rgb(97,97,97);
	width: 100%;
	text-align: center;
}
.no-pointers{
    pointer-events: none;
}

.item-modal-header{
    // background: #e2e2e2;
    // grid-row: 1/2;
    margin: 0 0 0.5rem;
    height: clamp(2rem, 4vh, 4rem);
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
}
.item-modal-header .item-modal-header-title h3{
	font-family: 'Raleway', sans-serif;
	font-size: 0.95rem;
	font-weight: 550;
    line-height: 1.25rem;
}
.item-modal-header .item-modal-header-title p{
    margin: 0 0.75rem 0 0;
    font-family: 'Raleway', sans-serif;
	font-size: 0.8rem;
	font-weight: 450;
    letter-spacing: 0rem;
    line-height: 0.8rem;
}
.item-modal-header-title{
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    border: 0.125rem solid #ffffff;
    border-radius: 0.5rem;
    padding: 0.25rem 1.25rem;
    filter: drop-shadow(-0px 1px 5px rgba(99, 99, 99, 0.3));
}
.item-modal-header p{
    margin: 0 1rem 0 0;
    font-family: 'Source Sans 3', sans-serif;
    font-size: 1rem;
    font-weight: 300;
    letter-spacing: 0.05rem;
    line-height: 1.1rem;
}
.item-modal-header-RHS{
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-end;
    align-items: center;
    gap: 2rem;
}
.item-modal-header-LHS{
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: center;
}

.item-modal-title-box{
    margin: 2px 0 2px 0;
    max-width: 9rem;   
    position: relative;
}
.item-modal-category{
	font-family: 'Raleway', sans-serif;
	font-size: 1.35rem;
	font-weight: 350;
	color: black;
	min-width: 5rem;
}
.prevent-close-on-click{

}
.form-style-1 input[type=text]{
    border-radius: .5rem;
	box-sizing: border-box;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	border:1px solid #BEBEBE;
	padding: 7px;
	margin:0px;
	-webkit-transition: all 0.30s ease-in-out;
	-moz-transition: all 0.30s ease-in-out;
	-ms-transition: all 0.30s ease-in-out;
	-o-transition: all 0.30s ease-in-out;
	outline: none;	
}
.form-style-1 input[type=text]:focus{
	-moz-box-shadow: 0 0 8px #ad88e9;
	-webkit-box-shadow: 0 0 8px #ad88e9;
	box-shadow: 0 0 8px #ad88e9;
	border: 1px solid #ad88e9;
}
.item-modal-shelf{
    margin: 0.25rem 0.5rem;
    padding: 0 1.5rem;
    max-height: 17vh;
}
// .item-modal-container{
//     position: relative;
//     padding: 10px 0;
//     display: grid;
//     width: 100%;
// 	grid-template-rows: 6vh 32vh 22vh 22vh;

//     justify-content: space-between;
//     align-content: flex-end;
//     align-items: flex-start;
//     color: black;
// }
.item-modal-container{
    position: relative;
    padding: 0.5rem 1rem;
    display: flex;
    flex-flow: column nowrap;
	// grid-template-rows: 6vh 32vh 22vh 22vh;
    justify-content: space-between;
    align-content: flex-end;
    align-items: flex-start;
    color: black;
    // text-align: left;
}

.image-modal-container{
    max-width: 100vw;
    max-height: 90vh;
    padding: 0;
    margin: 0;
    min-height: 10rem;
}
.image-modal{
    padding: 0;
    margin: 0;
}

.image-modal-inner{
    transition: transform .5s ease;
}
.image-modal-inner:hover{
    transition: transform .5s ease-out;
}


.item-modal-image-slider{
    height: fit-content;

}
.item-modal-details{
    width: 100%;
    // grid-row: 3 / 4;
    margin: 1vh 1rem 0.5vh;
    display: flex;
    flex-flow: row nowrap;
    height: clamp(7rem, 20vh, 12rem);
}
.item-modal-associated{
    // grid-row: 4 / 5;
    width: 100%;
    min-width: 75vw;
    align-self: end;
    overflow: hidden;
    padding: 0 0 1rem;
    max-height: 18vh;
    min-height: 10rem;
    bottom:0;
}
.item-modal-add-to-colleciton{
    grid-row: 5/6;
    // min-width: 75vw;
    // align-self: end;
    display: flex;
    flex-flow: row wrap;
    margin: 0;
    align-content: center;
    align-items: center;
    justify-content: center;
}
.item-modal-add-to-colleciton-controls{
    grid-row: 5/6;
    // min-width: 75vw;
    // align-self: end;
    display: flex;
    flex-flow: row wrap;
    margin: 0;
    align-content: center;
    align-items: center;
    justify-content: flex-start;
}

.item-modal-add-to-colleciton h3{
	margin: 0 1.25rem;
	color: black;
    font-family: 'Source Sans 3', sans-serif;
    font-size: 1rem;
    font-weight: 300;
    letter-spacing: 0.05rem;
    line-height: 1.1rem;
    color: black;
    
}

input.item-modal-input{
    min-width: 16rem;
}

li.create-collection{
    display:flex;
    flex-direction: row;
    justify-content: center;
}

li.create-collection button{
    width: 100%;
}

.aselect {
    // display: flex;
    //     flex-direction: row;
    //     flex-wrap: nowrap;
    margin: 0 0.8rem 0 0;
    padding: 0;
	}

    
    .selector {
        // display: flex;
        // flex-direction: row;
        // flex-wrap: nowrap;
        // width: 100%;
        border: 1px solid gainsboro;
        background: #ffffff;
        padding: 0 0.5rem 0 0;
        position: relative;
        border-radius: 2rem;


        cursor: pointer;

    }

    
    .arrow {
            position: absolute;
            right: 10px;
            top: 0;
            // width: 0;
            // height: 0;
            // border-left: 5px solid transparent;
            // border-right: 5px solid transparent;
            // border-bottom: 8px solid #adadad;
            // transform: rotate(90deg);
            // transition-duration: 0.3s;
            // transition-timing-function: cubic-bezier(.59,1.39,.37,1.01);
        }

        .expanded {
            transform: rotateZ(0deg) translateY(2px);
        }

    .selector:hover {
        background:#f5f5f5;
    }

    ul {
        border-radius: 0.8rem;
        width: calc(100% + 2px);
        list-style-type: none;
        padding: 0;
        margin: 0;
        font-family: 'Raleway', sans-serif;
        font-size: 0.775rem;
        font-weight: 550;
        letter-spacing: 0.05rem;
        line-height: 1.1rem;
        color: black;
        border: 1px solid gainsboro;
        position: absolute;
        left: -1px;
        top: -5px;
        z-index: 11;
        background: #fff;
        // display: block;
        max-height: 50vh;
        // overflow: auto;
    }

    .collection-item{
        display: flex;
        flex-flow: row wrap;
        padding: 0.3rem 0.1rem 0.3rem 1.1rem;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }
    li {
        z-index: 11;
        padding: 0.3rem 0.3rem;
        color: #292929;
        border-bottom: 1px solid rgb(241, 241, 241);
        cursor: pointer;
        &:hover {
            // color: white;
            background:#f5f5f5;
            // colour was #f7e8f777;
        }
    }
    .current {
        font-size: 0.725rem;
        font-weight: 500;
        color:  black;
        background: #f5f5f5;
    }
    .hidden {
        visibility: hidden;
    }
    .visible {
        z-index: 11;
        visibility: visible;
    }

    .label, .label p {
        z-index: 5;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        gap: 0.5rem;
        min-width: 24rem;
        white-space: nowrap;
        width: 100%;
        padding: 0.2rem 1.25rem 0.15rem 1rem;
        // margin: 0.5rem 0 0 0;
        font-family: 'Raleway', sans-serif;
        font-size: 0.725rem;
        font-weight: 500;
        letter-spacing: 0.05rem;
        line-height: 1.25rem;
        color: black;
        // color: #888;
			}

</style>
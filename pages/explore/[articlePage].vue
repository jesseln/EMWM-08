<template>



    <!-- <div class="query-box">
        <h2 class="query-breadcrumb"> {{ libraryDisplay.pageText.queryBreadcrumb }}</h2>
        <h2 class="query-breadcrumb">Total Items: {{ dataSize }}</h2>
    </div> -->
    <div class="shelf-separator-container"><div class="shelf-separator"></div></div>
    <div class="article-library-title">
        <div class="article-title-topsection">
        <div class="article-title-subsection">
            <h1>Visual</h1>
            <h2><span>A Definition of Graffiti:</span></h2>
            <h4>The database uses the term graffiti for a range of marks that are primarily visual in nature, consisting of images, pasted material, object traces, letter practice, doodles, smudges and stains.</h4>
        </div>
        <div>
            <div class="article-title-image">
                <NuxtImg class="article-title-image-cropped"
                src="https://hmgugjmjfcvjtmrrafjm.supabase.co/storage/v1/object/public/article-images/visual/visual_1.png"
                />
            </div>
        </div>
        </div>  
    </div>
    <div  class="article-container">
        <div class="article-std-image">
        <NuxtImg 
            :class="[stdImageClass]"
            src="https://hmgugjmjfcvjtmrrafjm.supabase.co/storage/v1/object/public/article-images/visual/visual_1.png"
            />
        </div>
        <div class="article-image-caption-container">
            <p class="article-image-caption">
                RCIN 1051956 Psaultier de David, Royal Collection Trust, Windsor Castle Royal Library, Windsor 
            </p>
        </div>
        <div class="article-std-image">
        <NuxtImg 
            :class="[stdImageClass]"
            src="https://hmgugjmjfcvjtmrrafjm.supabase.co/storage/v1/object/public/article-images/visual/visual_2.png"
            />
        </div>
        <div class="article-image-caption-container">
            <p class="article-image-caption">
                Figure 1, from Marcello Palnigenio Stellato's <i>The zodiake of life</i> (London, 1565), 
                Bodleian Library, Douce P 584, sigs. N7r (left), B7r (right top), and E4v (right bottom).
            </p>
        </div>
        <div class="article-para-section">
            <p class="article-para">
                Most scholarship on early modern women’s marginalia to date has concentrated on its verbal forms, yet women’s annotations also include visual marks or images of varying degrees of legibility and complexity, ranging from stars and manicules, doodles, copies of typographical ornaments, drawings in pen and ink, and the insertion of images into texts through cutting and pasting. These visual forms, which we have grouped under the term ‘graffiti’, comprise an exciting and largely unexamined sub-corpus within early modern women’s marginalia, providing new evidence of how women read, how they saw their world, and how they used their books. Graffiti also illuminate how women engaged with formal categories of visual expression such as calligraphy, copying and drawing, with implications for our understanding of their education and their relationship to humanism. The collection of graffiti found in our database show how important both texts and images were to the ways in which women perceived and represented their worlds. 
            </p>
            <h2 class="article-view-title">
                Visualisation of a breakdown of types of graffiti
            </h2>
        </div>
        <div v-if="dataCheck[0]">
        <LibraryBottomNavArticle :articleView="{
                name: articleViewSet.name, 
                section: articleViewSet.sections[0]
                }" />
        </div>
        <div v-if="dataCheck[0]" class="article-view-insert">
            <LibraryArticleView :articleView="{
                name: articleViewSet.name, 
                section: articleViewSet.sections[0]
                }" />
        </div>
        <h2 class="article-view-title">
            Visualisations of types of marginalia in the database, with graffiti as a percentage against ownership, annotation, and recording.
        </h2>
        <div v-if="dataCheck[1]">
        <LibraryBottomNavArticle :articleView="{
                name: articleViewSet.name, 
                section: articleViewSet.sections[1]
                }" />
        </div>
        <div v-if="dataCheck[1]" class="article-view-insert">
            <LibraryArticleView :articleView="{
                name: articleViewSet.name, 
                section: articleViewSet.sections[1]
                }" />
        </div>
        <div class="article-para-section">
            <p class="article-para ">
                One important use of image in the margins has been to help readers note and highlight a feature of a text, allowing it to be more easily understood and remembered. Images such as stars and manicules (hands pointing to certain lines) are the most common forms of such visual marginalia, and they add the humanist concept of enargeia (vividness) to a reader’s interaction with the page, amplifying, decorating and ‘colouring-in’ texts not only with marks such as underlining but with images drawn from what the reader saw in the world around them. Women as well as men annotated their texts using such visual aids, as Mary Powntis’s manicules in a copy of The Zodiake of Life show. There are very few examples of women’s use of this kind of visual annotation, but they do exist, showing that women had access to elements of humanist annotation despite their exclusion from the all-male humanist schoolroom. Rather than strict segregation, women’s use of forms such as the manicule to annotate texts and to mark passages show how the education of men and women overlapped. Women as students and teachers can be found at the sixteenth-century schoolroom’s edges, and their levels of literacy and education increased throughout the seventeenth century. 
            </p>
            <p class="article-para">
                Most scholarship on early modern women’s marginalia to date has concentrated on its verbal forms, yet women’s annotations also include visual marks or images of varying degrees of legibility and complexity, ranging from stars and manicules, doodles, copies of typographical ornaments, drawings in pen and ink, and the insertion of images into texts through cutting and pasting. These visual forms, which we have grouped under the term ‘graffiti’, comprise an exciting and largely unexamined sub-corpus within early modern women’s marginalia, providing new evidence of how women read, how they saw their world, and how they used their books. Graffiti also illuminate how women engaged with formal categories of visual expression such as calligraphy, copying and drawing, with implications for our understanding of their education and their relationship to humanism. The collection of graffiti found in our database show how important both texts and images were to the ways in which women perceived and represented their worlds. 
            </p>
            <p class="article-para">
                Some women, especially royalty, did receive a humanist education which included instruction in writing, drawing, painting, perspective and geometry. Again, we have very few traces of how royal women acquired and used these skills. One stunning exception is the drawing of an armillary sphere that faces a quatrain by the princess Elizabeth on the final pages of a Book of Hours, where a scroll beneath the image in Elizabeth’s distinctive italic hand contains a line from Petrarch’s Triumph of Death: ‘Miser é chi spemé in cosa mortal pone’ (Wretched is he who places hope in a mortal thing). It is impossible to know if Elizabeth drew this image or not, but her inscription means that across the opening image and text work together; the quatrain and its signature adhere to the armillary sphere, the book upon which it rests, and the line from Petrarch in Elizabeth’s hand. This is a collection of visual and verbal annotation to be circulated, a way in which the princess Elizabeth could signal her piety, her desire to be guided by the word of god rather than earthly things, as well as her spirited aversion to the damaging workings of the ‘inward suspicious minde’. 
            </p>
        </div>
        <div class="article-std-image">
        <NuxtImg  
            :class="[stdImageClass]"
            src="https://hmgugjmjfcvjtmrrafjm.supabase.co/storage/v1/object/public/article-images/visual/visual_3.png"
            />
        </div>
        <div class="article-image-caption-container">
            <p class="article-image-caption">
                Sir Philip Sidney, The Countess of Pembroke’s Arcadia (London, 1623), Bodleian Library, J-J Sidney 25, title page.
            </p>
        </div>
        <div class="article-std-image">
        <NuxtImg 
            :class="[stdImageClass]"
            src="https://hmgugjmjfcvjtmrrafjm.supabase.co/storage/v1/object/public/article-images/visual/visual_4.png"
            />
        </div>
        <div class="article-image-caption-container">
            <p class="article-image-caption">
                Emmerson Collection State Library Victoria, Melbourne, RAREEMM 322/21, Samuel Daniel, Certaine Poems (London,  on blank leaves inserted after sig. F6v)
            </p>
        </div>
        <div class="article-para-section">
            <p class="article-para">
                However, the majority of graffiti that we have attributed to women in the database take very different forms to these polished examples. On the title page of a 1623 copy of the Arcadia held in the Bodleian library, the half-cropped signature of Elizabeth Duke is accompanied by a set of marks that include looping lines, dashes, and blots. This kind of inchoate mark is very commonly encountered, especially on flyleaves, endpages, paste downs and title pages. Often appearing as scribble, closer inspection can reveal women’s names, accompanied by letter practice and pen trials, as well as doodles. While such doodles can often seem to indicate inattention, often they constitute the shape-forming that was a building block of learning to write, or they take their cues from the visual world of the book, copying typography, ornaments or images from its pages. Sometimes a cluster of marks contains all of these elements as well as what may be original drawing.  In a copy of Samuel
                Daniel’s Certaine Poems, we can see the name of Elizabeth Court, surrounded by swooping circles that were a form of letter practice, as well as a circular inscription of the Lord’s Prayer in Court’s hand, and partial and complete drawings of a dog, less easy to attribute. 
            </p>
            <p class="article-para">
                Around 7% of our database comprises graffiti, but images are far more difficult to attribute to women agents than textual marginalia, where hands can be matched. When a volume has a single woman marginalist, images can be attributed to that woman as probable; but far more commonly images and doodles appear on pages with multiple hands and can only be attributed as possible through proximity or the incorporation of textual elements. Object traces, smudges and stains, while no doubt caused by women users and readers of books, are almost impossible to attribute. So while we can trace graffiti to women only occasionally, it is likely that women contributed in far greater numbers to the pages of pen trials, letter practice, doodles and drawing than we can demonstrate. 
            </p>
        </div>
    </div>



</template>

<script setup>
import { storeToRefs } from "pinia";
import * as d3 from "d3";
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'

// ROUTE MANAGERS
const route = useRoute()

// STATE MANAGERS IMPORT //    
const supabase = useSupabaseClient()

//Library State
const libraryStore = useLibraryStore();
const { complete,
    Agent, Book, Mark } = storeToRefs(libraryStore)

//View State
const viewStore = useViewStore();
const { libraryData,
        libraryDisplay,
        formattedLibrary, 
        itemHeight,
        itemColour, 
        colourSet,
        colourScale,
        dataSize,
        getActiveFilters,
        filterObject,
        filterLibrary,
        colourScaleConverter,
        ordinalColourMap,
        domainIndex,
        viewHeightBounds,
        domainColourIndex,
        viewColourBounds,
        viewColourSet,
        viewUpdated } = storeToRefs(viewStore)

const { parseDatabase,
        handleViewSelection,
        getIDP,
        filterActiveToggle,
        updateView,
        getFilterObject,
        formatHeight,
        formatColour,
        getAllFilters,
        updateFilteredLibrary } = useViewStore();

//Reference Constants
const referenceStore = useReferenceStore();
const { categoryMap, 
        viewMap,
        invCategoryMap, 
        colourMapFiltered,
        scales,
        filterMap,
        zoomLevel } = storeToRefs(referenceStore)
const { updateScales } = useReferenceStore();

//Article Store
const articleStore = useArticleStore();
const { allArticles } = storeToRefs(articleStore)
const { cloneLibrary,
    cloneReferences,
    _cloneLibrary,
    _cloneReferences,
    parseReferences } = useArticleStore();

//Utility Functions
const { handleObjectProperty,
        contrastHandler,
        checkObjectPath } = useUtils();

const articleViewSet = ref(referenceStore.viewRouteQueries[route.params.articlePage])
const dataCheck = ref([])
setDataChecks(articleViewSet.value)

async function cloneStores(articleViewSet, i){
    const articleName = articleViewSet.name
    const articleSection = articleViewSet.sections[i]
    const articleItemType = articleViewSet.sectionViews[i].view.itemType

    const useFilter = articleViewSet.sectionViews[i].articleFilter.useFilter
    const filterItemType = articleViewSet.sectionViews[i].articleFilter.itemType
    const filterCategory = articleViewSet.sectionViews[i].articleFilter.category
    const filterOption = articleViewSet.sectionViews[i].articleFilter.option

    Object.assign(viewStore.libraryDisplay.view, articleViewSet.sectionViews[i].view)
    Object.assign(viewStore.libraryDisplay.viewType, articleViewSet.sectionViews[i].viewType)
    Object.assign(viewStore.libraryDisplay.pageText, articleViewSet.sectionViews[i].pageText)
    parseDatabase(libraryStore[articleItemType])


    referenceStore.zoomLevel = articleViewSet.sectionViews[i].zoom.zoomLevel
    updateScales()
    updateView()
    getAllFilters()
    if(useFilter){
        // console.log('filter section number', useFilter, i)
        filterActiveToggle(viewStore.filterObject.get(filterItemType)[filterCategory][filterOption], filterCategory, filterItemType)
        updateFilteredLibrary()
    }
     cloneLibrary(viewStore.libraryData,'libraryData', articleName, articleSection)
    //  console.log('viewStore.libraryData',viewStore.libraryData)
     cloneLibrary(viewStore.libraryDisplay,'libraryDisplay', articleName, articleSection )
     cloneLibrary(viewStore.domainIndex, 'domainIndex', articleName, articleSection )
     cloneLibrary(viewStore.heightCategory, 'heightCategory', articleName, articleSection )
    //  cloneLibrary(viewStore, articleName, articleSection )
     _cloneReferences(referenceStore.libraryItemBundle, 'libraryItemBundle', articleName, articleSection)
     cloneReferences(referenceStore.zoomLevel, 'zoomLevel', articleName, articleSection)
     cloneReferences(referenceStore.scales, 'scales', articleName, articleSection)
    //  console.log('viewStore.filterLibrary',viewStore.filterLibrary)
     _cloneLibrary(viewStore.filterLibrary, 'filterLibrary', articleName, articleSection)
    // await cloneLibrary(viewStore, articleName, articleSection )
    // await cloneReferences(referenceStore, articleName, articleSection)
    if(useFilter){
        // console.log('filter section number', useFilter, i)
        filterActiveToggle(viewStore.filterObject.get(filterItemType)[filterCategory][filterOption], filterCategory, filterItemType)
        updateFilteredLibrary()
    }
    // articleStore.allArticles[articleName][articleSection].library.itemC = formatColour()
    // articleStore.allArticles[articleName][articleSection].library.itemH = formatHeight()
    dataCheck.value[i] = true
    // console.log('dataCheck', dataCheck.value[i])
}

function setDataChecks(articleViewSet){
    articleViewSet.sections.forEach((elm,i)=>{
        dataCheck.value[i] = false
    })
}
async function cloneAllStores(){
    await cloneStores(articleViewSet.value, 0)
    await cloneStores(articleViewSet.value, 1)
}

watch([libraryStore.complete],()=>{
    if(libraryStore.complete.agent && libraryStore.complete.mark && libraryStore.complete.book) {
        cloneAllStores()
    }
},{immediate:true, deep:true})

    // To Top Button
    const { x, y } = useWindowScroll() // To replace below
    const useX = ref(x)
    const useY = ref(y)
    const toExploreButton = ref();
    const toTopButton = ref();

    const heroImageClass = ref('graffitiHero')
    const stdImageClass = ref('stdImage')
    const titleImageClass = ref('articleTitle')


</script>

<style lang="scss" scoped>

.stdImage{
    position: relative;
    width: 60vw
    // height: 325px;
}

.articleTitle{
    position: relative;
    clip-path: polygon(43.00% 10.00%,90% 10%,90% 90%,43.00% 90.00%);
    height: 20vh;
}

.article-hero{
    display: flex;
    align-items: center;
    justify-content: center;
}
.article-std-image{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem 0 0;
    margin: 0;
}

span{
    font-weight: 650;
    // color: black;
}
.index-list-main{
    padding: 1rem 2rem 1rem 2rem;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    // width: 24vw;
}


.index-list-main h3{
    // padding: 2rem 0 0 0;
    margin: 0 0 0 0.75rem;
	color: black;
	font-family: 'Source Sans 3', sans-serif;
	font-size: 1.65rem;
	font-weight:350;
	letter-spacing: 0.425rem;
  }

  .index-list-main h3.activePage {

	color: white;

  }



    .nav-div{
        z-index: 10;
        position: sticky;
        top: 0;
        background-color: rgba(255,255,255,1);
        // width: 100%;
        // height: 100%;
        // opacity: 100%;

    }

    .nav-bottom-div{
        z-index: 15;
        position: sticky;
        bottom: -1px;
        background-color: rgba(255,255,255,1);
        // width: 100%;
        // height: 100%;
        // opacity: 100%;

    }

</style>
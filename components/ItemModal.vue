<template>
    <div class="item-modal-container">
        <div class="item-modal-header">
            <h2>{{itemDetails.BookID}}</h2>
            <h3 v-if="imageFound" >            {{ bookSlides.image[0].name }}</h3>
                

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
                :visible-slides="bookSlides.image.length <= 4? bookSlides.image.length: 4"
                slide-multiple
                :slide-ratio="1 / 4"
                :gap="1"
                :arrows-outside="false"
                :bullets="false"
                prevent-y-scroll 
                lazy 
                lazy-load-on-drag>
                    <vueper-slide
                        v-for="book in bookSlides.image"
                        :key="book"
                        :image="`https://hmgugjmjfcvjtmrrafjm.supabase.co/storage/v1/object/public/book-images/${itemDetails.BookID}/${book.name}`"
                        />
                </vueper-slides>
          
                
             
            </div>
        </div>
        <div class="item-modal-details">
            <!-- <div  v-for="book in bookTest">
                        <NuxtImg   
                        loading="lazy"
                        height="50"
                        quality="50"
                        :src="`https://hmgugjmjfcvjtmrrafjm.supabase.co/storage/v1/object/public/book-images/${itemDetails.BookID}/${book.name}`" />
                    </div> -->
        </div>
        <div class="item-modal-associated">

        </div>
    </div>
</template>

<script setup>
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
const {itemDetails} = defineProps(['itemDetails']);
const supabase = useSupabaseClient()

const imageFound = ref(false);
const bookSlides = ref(
    { 
        image: "",
        title: "my title",
        content: "my content",
    }
)

async function bookImages(item){
    imageFound.value = false
    console.log('item', item)
    const { data, error } = await supabase
    .storage
    // .listBuckets()
    .from('book-images')
    // .list('10')
    .list(`${item.BookID}`, {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' },
    })
    if(error) {
            console.log(error)
    }

    if(data){
        imageFound.value = true
        bookSlides.value.image = data

        console.log('bookData', data[0].name)
        return data
    }
}

watch(itemDetails.BookID,()=>{
    bookSlides.value.image = null
    bookImages(itemDetails)    
    console.log('fired')    
}, { immediate: true })


</script>

<style lang="scss" scoped>
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
    max-height: 25rem;
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
}
</style>
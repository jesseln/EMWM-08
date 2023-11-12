<template>
    <div class="site-wrapper">
      
    <header class="site-header">
    <NuxtLink to="/">
        <div class="site-header-title-wrapper">
          <h1 class="site-header-title">Early Modern Women's Marginalia</h1>
          <p class="site-header-subtitle">The Library of Libraries</p>
        </div>
    </NuxtLink>
    </header>
      <div class="main-navbar">
        <NuxtLink to="/" activeClass="nav-active">
            <div class="dropdown">
                <h2 class="main-navbar-link dropbtn" >Home</h2>
            </div>   
          </NuxtLink>
            <div class="dropdown" ref="dropdownExploreLibraryRef" @mouseover="showModal('ExploreLibrary')" @mouseleave="hideModal('ExploreLibrary')">
            <h2 class="main-navbar-link dropbtn">Explore the Collection</h2>
                <div class="dropdown-content" ref="dropdownExploreLibraryRefContent" >
                    <DropdownExploreLibrary @modalClicked="hideModalClicked('ExploreLibrary')" />
                </div>
            </div>
            <div class="dropdown" ref="dropdownYourCollectionsRef" @mouseover="showModal('YourCollections')" @mouseleave="hideModal('YourCollections')">
            <h2 class="main-navbar-link dropbtn">View Your Collections</h2>
                <div class="dropdown-content" ref="dropdownYourCollectionsRefContent" >
                    <DropdownYourCollections @modalClicked="hideModalClicked('YourCollections')" />
                </div>
            </div>
          <!-- <NuxtLink to="/yourcollection/collection01" activeClass="nav-active">
            <div class="dropdown">
                <h2 class="main-navbar-link dropbtn" >View Your Collections</h2>
            </div>   
          </NuxtLink> -->
          <NuxtLink to="/about" activeClass="nav-active">
            <div class="dropdown">
                <h2 class="main-navbar-link dropbtn" >Read About the Collection</h2>
            </div>   
          </NuxtLink>
      </div>
      <div class="library-slot">
        <slot />
      </div>
    </div>
  </template>
  
  <script setup>
  //libraryStore call is placed in this layout file as this will initially update the store state from the database for all pages.
  const libraryStore = useLibraryStore();

  libraryStore.getAgents();
  libraryStore.getBooks();
  libraryStore.getMarks();

  const dropdownExploreLibraryRef = ref(null)
  const dropdownExploreLibraryRefContent = ref(null)
  const dropdownYourCollectionsRef = ref(null)
  const dropdownYourCollectionsRefContent = ref(null)

  useHead({
  title: "The Library of Early Modern Women's Marginalia",
  meta: [
    { name: 'description', content: "The Library of Early Modern Women's Marginalia."}
  ],
//   bodyAttrs: {
//     class: 'test'
//   },
//   script: [ { innerHTML: 'console.log(\'Hello world\')' } ]
})
         
  const showModal = (callRef)=>{
    if(callRef === 'ExploreLibrary'){
        dropdownExploreLibraryRefContent.value.style.transitionDelay = '.1s'
        dropdownExploreLibraryRefContent.value.style.visibility = 'visible'
    }
    if(callRef === 'YourCollections') {
        dropdownYourCollectionsRefContent.value.style.transitionDelay = '.1s'
        dropdownYourCollectionsRefContent.value.style.visibility = 'visible'
    }

  }

  const hideModal = (callRef)=>{
    if(callRef === 'ExploreLibrary'){
        dropdownExploreLibraryRefContent.value.style.transitionDelay = '.1s'
        dropdownExploreLibraryRefContent.value.style.visibility = 'hidden'
    }
    if(callRef === 'YourCollections') {
        dropdownYourCollectionsRefContent.value.style.transitionDelay = '.1s'
        dropdownYourCollectionsRefContent.value.style.visibility = 'hidden'
    }
  }

  const hideModalClicked = (callRef)=> {
    if(callRef === 'ExploreLibrary'){
        dropdownExploreLibraryRefContent.value.style.transitionDelay = '.1s'
        dropdownExploreLibraryRefContent.value.style.visibility = 'hidden'
    }
    if(callRef === 'YourCollections') {
        dropdownYourCollectionsRefContent.value.style.transitionDelay = '.1s'
        dropdownYourCollectionsRefContent.value.style.visibility = 'hidden'
    }
}



  </script>
  
  <style scoped>

    .badge{
      position: relative;
      left: -15px;
    }
  </style>
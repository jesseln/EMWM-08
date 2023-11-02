import * as d3 from "d3";
import { storeToRefs } from "pinia";

export const useViewStore = defineStore('view', ()=>{
    const referenceStore = useReferenceStore();
    const { viewMap, filterMap, colourMapFiltered, scales } =  storeToRefs(referenceStore);
    const { alphabetically,
            handleNumeric,
            handleObjectPath,
            handleObjectProperty,
            handleFilterValue,
            handleValue,
            handleArray,
            handleColourValue,
            isNumber,
            isString,
            isArray,
            containsNumber,
            processDomain } = useUtils();

    // LIBRARY STATE OBJECT//
    const libraryData = ref({})

    const heightCategory = {
        logarithmic: ['Number of marks', 'Number of book images', 'Size'],
        year: ['Date of publication', 'Female agent date']

    }

    // LIBRARY VIEW OBJECT//
    const libraryDisplay = reactive({
        //sub items in view and viewType are called the 'viewMode'.
        view: {
            itemType: "Book",
            id: 'BookID',
            shelf: 'Repository', //Primary sort
            bookend: 'Date of publication', //Secondary sort
            shelfOrderMethod: 'A', //Primary sort
            bookendOrderMethod: 'A', //Secondary sort
            height: 'Date of publication',
            colour: 'Genre/Identity',
            label: 'Title',
            agentLabel: 'Female agent name',
            bookLabel: 'BookID',
            markLabel: 'MargID',
            agentCollectionProp1: 'Mark type (Mark of?)',
            agentCollectionProp2: 'Genre/Identity',
            bookCollectionProp1: 'Female agent name',
            bookCollectionProp2: 'Number of marks',
            markCollectionProp1: 'Female agent name',
            markCollectionProp2: 'Title',
        },
        viewType: {
            id: 'Book',
            shelf: 'Book',
            bookend: 'Book',
            height: 'Book',
            colour: 'Book',
            label: 'Book',
            agentLabel: 'Agent',
            bookLabel: 'Book',
            markLabel: 'Mark',
            agentCollectionProp1: 'Mark',
            agentCollectionProp2: 'Book',
            bookCollectionProp1: 'Agent',
            bookCollectionProp2: 'Book',
            markCollectionProp1: 'Agent',
            markCollectionProp2: 'Book',
        },
        pageText: {
            queryType: 'Agents ',
            queryBreadcrumb: '/ How many agents are in the collection ?',
            libraryTypeTitle: 'The Agents',
            libraryTypeSubtitle: 'of the libraries',
        }
    })

    // LIBRARY DATA //
    const itemLibrary = ref([]);
    const formattedItemLibrary = ref([]);
    const formattedLibrary = ref([]);
    const itemHeight = ref();
    const itemColour = ref();
    const colourSet = ref();
    const ordinalColourMap = ref([]);
    const colourScale = ref();
    const colourScaleConverter = ref();
    const domainIndex = ref();
    const viewHeightBounds = ref();
    const domainColourIndex = ref();
    const viewColourBounds = ref();
    const filterLibrary = ref();


    watch([libraryData, libraryDisplay],() => {
        if(libraryData.value.length !== undefined){
        formattedLibrary.value =  formatLibrary(libraryData.value); //Reactive when not testing

        domainIndex.value = getDomainIndex('height');
        viewHeightBounds.value = getIndexItems('height');

        domainColourIndex.value = getDomainIndex('colour');
        viewColourBounds.value = getIndexItems('colour');

        //Item Height - Returns d3 Scale Function
        itemHeight.value = formatHeight();
        //Item Colour - Returns d3 Scale Function
        itemColour.value = formatColour();
        //Colour Categories
        colourSet.value = getColourSet.value //Included here to prevent computed from firing before library.data is returned

        colourScale.value = colourBandscale();

        colourScaleConverter.value =  colourFunction();

        ordinalColourMap.value = getOrdinalColourMap();
        }
    })

    watch([itemLibrary],() => {
        if(itemLibrary.value.length !== undefined){
            formattedItemLibrary.value = formatItemLibrary();
        }
    })

    watch([libraryData],() => {
        filterObject.set('Agent', getFilterObject(referenceStore.filterMap.get('Agent'), libraryData.value, 'Agent'))
        filterObject.set('Book', getFilterObject(referenceStore.filterMap.get('Book'), libraryData.value, 'Book'))
        filterObject.set('Mark', getFilterObject(referenceStore.filterMap.get('Mark'), libraryData.value, 'Mark'))
    })

    //Get item height bounds
    function getDomainIndex(viewMode) {
        return {min: d3.minIndex(libraryData.value, d => getIDP(d, viewMode)), 
                max: d3.maxIndex(libraryData.value, d => getIDP(d, viewMode))}
    }

    function getIndexItems(viewMode) {
        if(viewMode === 'height'){
            return [libraryData.value[domainIndex.value.min],
                    libraryData.value[domainIndex.value.max]]
        }
        if(viewMode === 'colour'){
            return [libraryData.value[domainColourIndex.value.min],
                    libraryData.value[domainColourIndex.value.max]]
        }
    }

    //Get unique values in colour set
    const getColourSet = computed (() => {
        return processColourSet(libraryData.value)
    })

    //Currently applies to Arrays only
    const viewColourSet = computed (() => {
        return processColourItems(libraryData.value, getColourSet.value)
    })

    // INTERNAL FUNCTIONS //
    // ITEM LIBRARY //
    function formatItemLibrary(){
        let libraryFormat;
        libraryFormat = d3.flatGroup(d3.sort(itemLibrary.value,(a, b) => alphabetically(true)(itemTypeCheck(a), itemTypeCheck(b))), d => itemTypeCheck(d)); 
        return [['Item Collection' ,libraryFormat]]
    }

    // FORMAT LIBRARY //
    //Set Shelves
    function formatShelf(data, viewMode){
        return d3.flatGroup(d3.sort(data,(a, b) => alphabetically(true)(getISP(a, viewMode), getISP(b, viewMode))), d => getIDP(d, viewMode)); 
    }
    function formatNullShelf(data, viewMode){
        return d3.flatGroup(d3.sort(data,(a, b) => alphabetically(true)(getISP(a, viewMode), getISP(b, viewMode))), d => 'All Items'); 
    }
    //Set Bookends
    function formatBookend(data, viewMode){
        return data
        .map(d => [d[0],d3.flatGroup(d3.sort(d[1], (a, b) => alphabetically(true)(getISP(a, viewMode), getISP(b, viewMode))), d=> getIDP(d, viewMode))]);  
    }
    function formatNullBookend(data, viewMode){
        return data
        .map(d => [d[0],d3.flatGroup(d3.sort(d[1], (a, b) => alphabetically(true)(getISP(a, viewMode), getISP(b, viewMode))), d=> 'All Items')]);  
    }
    //Combine Shelves & Bookend
    function formatLibrary(data) {
        //Shelves - Sort & Group Items by Shelf Category
        const shelfFormatData = libraryDisplay.view.shelf !== "Not Selected"
        ? formatShelf(data, 'shelf') 
        : formatNullShelf(data, 'id'); //Default
        //Bookends - Further Sort & Group Items by Bookend Category
        const shelfBookendFormatData = libraryDisplay.view.bookend !== "Not Selected"
        ? formatBookend(shelfFormatData, 'bookend') 
        : formatNullBookend(shelfFormatData, 'id'); //Default
        return shelfBookendFormatData
    }

    // HANDLE HEIGHT //
    function formatHeight() {
        const viewSelection = libraryDisplay.view.height
        if(viewSelection !== "Not Selected") {
            //Returns a function which takes the log scale of the input then invokes the d3 scale function (IIFE)
            if(heightCategory.logarithmic.includes(viewSelection)){
                return (value)=>{ 
                    return (d3.scaleLinear()
                                .domain(chooseHeightDomain(libraryData.value).map(d => Math.log(d))) 
                                .unknown(referenceStore.scales.maxItemHeight) //Set all non-numeric values to max height
                                .range([referenceStore.scales.minItemHeight, referenceStore.scales.maxItemHeight])
                                .clamp(true)
                            )(Math.log(value)); 
                }
            }else{
                return d3.scaleLinear()
                            .domain(chooseHeightDomain(libraryData.value)) 
                            .unknown(referenceStore.scales.maxItemHeight) //Set all non-numeric values to max height
                            .range([referenceStore.scales.minItemHeight, referenceStore.scales.maxItemHeight])
                            .clamp(true);     
            }
        }else{
            return (_)=> {return referenceStore.scales.maxItemHeight}
        }
    }
    
    function chooseHeightDomain(data){   
            const viewSelection = libraryDisplay.view.height
            if(heightCategory.year.includes(viewSelection)) {
                return [1450, 1750] //was - clamp(1450, longestNumber, 1750)
            }else{
                return [getIDP(data[domainIndex.value.min], 'height'), getIDP(data[domainIndex.value.max], 'height')]
            }
    }

    function colourFunction() {
        const viewMode = 'colour'
        const viewSelection = libraryDisplay.view[viewMode]
        const viewModeType = libraryDisplay.viewType[viewMode]
        const colourFunction = referenceStore.viewMap.get(viewModeType)[viewSelection].func
        const colourScheme = referenceStore.viewMap.get(viewModeType)[viewSelection].scheme
        return d3[colourFunction](d3[colourScheme]) //Applies colour functions and schemes from Object. Domain defaults to [0,1]
    }
   
    // HANDLE COLOUR //
    function formatColour(){
        if(libraryDisplay.view.colour !== "Not Selected"){
            return (
                    (colourByValue) => colourScaleConverter.value(colourScale.value(colourByValue)) //Returns nested scale function after applying band function (IIFE)
                )   
        }else{
            return (_)=> {return '#fff281'}
        }    
    }

    function getOrdinalColourMap(){
        const ordinalMap = Array.from(getColourSet.value).map((category)=>{
            return {'colour': itemColour.value(category), 'category': category}
        })
        return  d3.flatGroup(ordinalMap, d => d.colour)
    }

    //Returns bandscale for colour values
    function colourBandscale(){
        return d3.scaleBand().domain(Array.from(getColourSet.value)) //Range defaults to [0,1]
    }

    function processColourSet(data){
       return new Set(data.flatMap(d=> getIDP(d, 'colour')).sort((a,b)=>alphabetically(true)(handleFilterValue(a), handleFilterValue(b))))
    }

    function processColourItems(data, colourSet){
        let tempColourSet = colourSet;
        let uniqueColours = data.filter((d) => {
            const value = getIDP(d, 'colour')
            if(tempColourSet.has(value)){
                return tempColourSet.delete(value) //Returns true if deletion successful
            }else{
                return false
            }
        })
        return  new Set(uniqueColours.sort((a, b) => alphabetically(true)(getISP(a, 'colour'), getISP(b, 'colour')))) //Sort uses separate path access function getISP()
    }

    // EXTERNAL FUNCTIONS //
    //Parse Data Object from Supabase
    async function parseDatabase(tableData) {
            libraryData.value = await JSON.parse(JSON.stringify(tableData))
            // unformattedData.value =  await JSON.parse(JSON.stringify(libraryData.value))
            // formattedLibrary.value =  formatLibrary(libraryData.value, libraryDisplay);
    }

    //Update View Object from user input
    function handleViewSelection(viewMode, viewSelection, itemType){
        console.log('handleViewSelection', viewMode, viewSelection, itemType)

        if(itemType === 'NotSelected') {
            libraryDisplay.view[viewMode] = 'Not Selected'
            libraryDisplay.viewType[viewMode] = 'NotSelected'
        }else{
            if(viewMode === 'shelf'){
                libraryDisplay.view.shelfOrderMethod =  referenceStore.viewMap.get(itemType)[viewSelection].sortMethod
            }
            if(viewMode === 'bookend'){
                libraryDisplay.view.bookendOrderMethod =  referenceStore.viewMap.get(itemType)[viewSelection].sortMethod
            }
            libraryDisplay.view[viewMode] = viewSelection; //Future addition - updateView below (in database)
            libraryDisplay.viewType[viewMode] = itemType; //Future addition - updateViewType below (in database)
        }
    }

    //Dynamic Path
    //Returns the desintation value by selecting the correct path using the itemType (via the ID name) to the itemType of the viewMode (via viewType LookUp)
    //getIDP - getItemDisplayPath - Condensed for frequent use.
    function getIDP(item, viewMode) {
        if(viewMode === 'Not Selected') return 'Not Selected'
        const viewSelection = libraryDisplay.view[viewMode]
        const viewModeType = libraryDisplay.viewType[viewMode]
        return itemPath(viewModeType, item, viewMode, viewSelection)
    }

    //Dynamic Path
    //Returns the desintation value by selecting the correct path using the itemType (via the ID name) and the viewModeType
    //getIFP - getItemFilterPath - Condensed for frequent use.
    function getIFP(item, viewSelection, viewModeType, viewMethod) {
        return itemPath(viewModeType, item, viewMethod, viewSelection)
    }
    
    //Dynamic Path
    //Returns the desintation value by selecting the correct path using the itemType (via the ID name) to the itemType of the viewMode (via viewType LookUp)
    //getISP - getItemSortPath - Condensed for frequent use.
    function getISP(item, viewMode) {
        let viewMethod = 'filter'
        if(viewMode === 'Not Selected') return 'Not Selected'
        const viewSelection = libraryDisplay.view[viewMode]
        const viewModeType = libraryDisplay.viewType[viewMode]
        return itemPath(viewModeType, item, viewMethod, viewSelection)
    }

    function itemPath(viewModeType, item, viewMode, viewSelection){
        if(!item) return null;
        const itemType = itemTypeCheck(item)
        let value;
        if(itemType === 'Agent'){
            //Agent Item paths
            if(viewModeType === 'Agent') value = handleObjectPath(item, viewMode, viewSelection)
            if(viewModeType === 'Mark') value = handleObjectPath(item, viewMode, 'Marks', 0, viewSelection)
            if(viewModeType === 'Book') value = handleObjectPath(item, viewMode, 'Marks', 0, 'Books', viewSelection)
        }else if(itemType === 'Book'){
            //Book Item paths                 
            if(viewModeType === 'Book') value = handleObjectPath(item, viewMode, viewSelection)
            if(viewModeType === 'Mark') value = handleObjectPath(item, viewMode,'Marks',0,viewSelection)
            if(viewModeType === 'Agent') value = handleObjectPath(item, viewMode, 'Marks', 0, 'Agents', viewSelection)
        }else if(itemType === 'Mark'){
            //Mark Item paths
            if(viewModeType === 'Mark') value = handleObjectPath(item, viewMode, viewSelection)
            if(viewModeType === 'Agent') value = handleObjectPath(item, viewMode, 'Agents', viewSelection) 
            if(viewModeType === 'Book') value = handleObjectPath(item, viewMode, 'Books', viewSelection)
        }
            return value ? value : "no data"
    }

    function getItemLibrary(item){
        if(!item) return null;
        const itemType = itemTypeCheck(item)
        let library;
        if(itemType === 'Agent'){
            //Agent Item paths
            library = [
                item, 
                getUnique(item['Marks'], 'MargID').sort((a, b) => alphabetically(true)(a['MargID'],b['MargID'])), 
                getUnique(item['Marks'].map(d => d['Books']).sort((a, b) => alphabetically(true)(a['BookID'],b['BookID'])), 
                'BookID')
            ].flat()
        }else if(itemType === 'Book'){
            //Book Item paths                 
            library = [item, 
                        getUnique(item['Marks'], 'MargID').sort((a, b) => alphabetically(true)(a['MargID'],b['MargID'])), 
                        getUnique(item['Marks'].map(d => d['Agents']), 'FemaleAgentID').sort((a, b) => alphabetically(true)(a['FemaleAgentID'],b['FemaleAgentID']))
                    ].flat()
        }else if(itemType === 'Mark'){
            //Mark Item paths
            library = [
                    item, 
                    item['Agents'], 
                    item['Books']
                ]
        }

        library ? itemLibrary.value = library : "no data"
    }

    function getItemLibraryCount(item){
        if(!item) return null;
        const itemType = itemTypeCheck(item)
        let library;
        if(itemType === 'Agent'){
            //Agent Item paths
            library = [ 
                        1, 
                        getUnique(item['Marks'].map(d => d['Books']), 'BookID').length, 
                        item['Marks'].length 
                    ].flat()
        }else if(itemType === 'Book'){
            //Book Item paths                 
            library = [ 
                        getUnique(item['Marks'].map(d => d['Agents']), 'FemaleAgentID').length, 
                        1, 
                        item['Marks'].length
                    ].flat()
        }else if(itemType === 'Mark'){
            //Mark Item paths
            library = [
                        1, 
                        1,
                        1
                    ]
        }

        return library ? library : ["no data", "no data", "no data"]
    }

    function getUnique(arrayOfObjects, checkProperty){
        
        return arrayOfObjects.filter((value, index, self) =>
            index === self.findIndex((t) => (
                t[checkProperty] === value[checkProperty]
            ))
        )
    }

    function itemTypeCheck(item){
        return  item['FemaleAgentID'] ? 'Agent' :
                item['BookID'] ? 'Book' :
                item['MargID'] ? 'Mark' : ''
    }

    // FILTER HANDLING //
    const activeFilters = ref([])
    const filterObject = reactive(new Map())
    const dataSize = ref(0);

    function getFilterObject(targetFormat, sourceObject, viewModeType){
        let filterObject = {};
        for (let i = 0, formatKeys = Object.keys(targetFormat); i < formatKeys.length; i++) {
                filterObject[formatKeys[i]] = []
            }
        
        for (let i = 0, sourceKeys = Object.keys(sourceObject); i < sourceKeys.length; i++) {
            for (let j = 0, targetKeys = Object.keys(filterObject); j < targetKeys.length; j++) {
                let value = getIFP(sourceObject[i], targetKeys[j], viewModeType, 'display name')
                if(isArray(value)) {filterObject[targetKeys[j]].push(...value) }
                else {filterObject[targetKeys[j]].push(value) }
            }
        }
        for (let i = 0, targetKeys = Object.keys(filterObject); i < targetKeys.length; i++) {
            filterObject[targetKeys[i]] = new Set(filterObject[targetKeys[i]]);
            filterObject[targetKeys[i]] = Array.from(filterObject[targetKeys[i]]).sort((a,b)=>alphabetically(true)(handleFilterValue(a), handleFilterValue(b)))
            filterObject[targetKeys[i]] = filterObject[targetKeys[i]].reduce((object, value) => ({ ...object, [value] : {name : value, active: false}}),{})
        }
        return filterObject
    }

    function filterActiveToggle(filterValue, category, itemType){
        filterObject.get(itemType)[category][filterValue.name].active = 
        !filterObject.get(itemType)[category][filterValue.name].active

        filterUpdate(filterValue, category, itemType)
    }

    function filterUpdate(filterValue, category, itemType){
        if(filterObject.get(itemType)[category][filterValue.name].active){
            activeFilters.value.push({'name': filterValue.name, 'category': category, 'itemType': itemType})
        }
        else{
            activeFilters.value = activeFilters.value.filter((value)=> value.name !== filterValue.name )
        }
    } 

    const getActiveFilters = computed(()=>{
        return activeFilters.value
    })

    function getFilterLibrary(){
        return formattedLibrary.value
            .reduce((library, shelf) => {
                let shelfContent = shelf[1]
                .reduce((shelf, bookend) => {
                    let bookendContent = bookend[1]
                    .filter((item) => {
                        return itemFilterCheck(item)
                    })
                    if(bookendContent.length > 0){
                        shelf.push([bookend[0], bookendContent])
                    }
                    return shelf
                }, [])
                if(shelfContent.length > 0){
                    library.push([shelf[0], shelfContent])
                }
                return library
            }, [])
        }

    function itemFilterCheck(item){
        return activeFilters.value.every((filterValue)=>{
            const itemValue = getIFP(item, filterValue.category, filterValue.itemType, 'display name')
            if(isArray(itemValue)) { 
                return itemValue.includes(filterValue.name) }
            else {
                return filterValue.name === itemValue }
        })
    }


    watch([filterLibrary],() => {
        dataSize.value =  filterLibrary.value.length?   filterLibrary.value.map(d => d[1].map(D => D[1]))[0][0].length : 0
    })

    // watch([formattedLibrary, libraryDisplay],() => {
    //     filterLibrary.value = getFilterLibrary()
    // })

    watchEffect(() => {
        filterLibrary.value = getFilterLibrary()
    })


      return {  libraryData,
                itemLibrary, 
                dataSize,
                libraryDisplay,
                formattedLibrary,
                formattedItemLibrary,
                filterLibrary, 
                heightCategory,
                itemHeight,
                itemColour,
                colourScale,
                colourScaleConverter,
                colourSet, 
                ordinalColourMap,
                viewColourSet,
                domainIndex,
                viewHeightBounds,
                domainColourIndex,
                viewColourBounds,
                activeFilters,
                filterObject,
                getActiveFilters,
                filterLibrary,
                getItemLibrary,
                getFilterObject,
                filterActiveToggle,
                parseDatabase,
                handleViewSelection,
                getIDP,
                getIFP,
                itemTypeCheck,
                getItemLibraryCount  }
  })



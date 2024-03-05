import { storeToRefs } from "pinia";

export const useReferenceStore = defineStore('reference', ()=>{
    const { invertObject } = useUtils();
    //Your Collection State
    const yourCollectionStore = useYourCollectionStore();
    const { yourCollection }  = storeToRefs(yourCollectionStore)
    const { addToCollection, 
            removeFromCollection } = useYourCollectionStore();

    const { width, height } = useWindowSize()

    const windowWidth = computed(()=>{
        return width.value
    })
    const windowHeight = computed(()=>{
        return height.value
    })

    const topViews = ref({
        ['Women agents']: {},
        ['Ownership']: {},
        ['Reading']: {},
        ['Recording']: {},
        ['Graffiti']: {},
        ['Attribution']: {},
        ['Types of book']: {},
        ['Locations']: {},
        ['Repositories']: {}
    })

    const topViewList = ref([
        'Women agents',
        'Ownership',
        'Reading',
        'Recording',
        'Graffiti',
        'Attribution',
        'Types of book',
        'Locations',
        'Repositories'
    ])

    ///////////////////////
    // LABEL CONVERSIONS //
    ///////////////////////
    const itemModalMap = reactive(new Map());
    itemModalMap
    .set('NotSelected', {
        ['Not Selected']: 'Not Selected',
    })
    itemModalMap
    .set('Book', {
            ['BookID']: 'Book ID',
            ['Repository']: 'Repository', 
            ['Date of publication']: 'Year Published', 
            ['Genre/Identity']: 'Book Genre',
            ['Title']: 'Book Title',
            ['Author']: 'Author',
            ['Place of publication']: 'Place of publication',
            ['Size']: 'Book Size',
            ['Book Notes']:'Book Notes',
            ['Print or manuscript']: 'Format',
            ['STC or Wing']: 'STC or Wing',
            ['Shelfmark']: 'Shelfmark',
            ['Number of marks']: 'Number of marks in book',
            ['Number of book images']: 'Number of book images',
    })
    itemModalMap
    .set('Agent', {
            ['FemaleAgentID']: 'Agent ID',
            ['Female agent name']: 'Agent name', 
            ['Female agent date']: 'Agent date', 
            ['Female agent bio']: 'Agent bio',
            ['Number of marks']: 'Number of marks by agent',
    })
    itemModalMap
    .set('Mark', {
            ['MargID']: 'Mark ID',
            ['Ownership type']: 'Ownership type',
            ['Distribution']: 'Distribution of marks',
            ['Female agent status']: 'Confidence in female authorship',
            ['Annotation type']: 'Annotation type',
            ['Location sig. ; p. ; pp.']: 'Location',
            ['Recording type']: 'Recording type',
            ['Transcription']: 'Transcription',
            ['Mark type (Mark of?)']: 'Type of mark',
            ['Class']: 'Class',
            ['Position on page']: 'Position on page',
            ['Location other']: 'Location detail',
            ['Added text type']: 'Type of added text',
            ['Drawing type']: 'Type of drawing',
            ['Graffiti type']: 'Type of Graffiti',
            ['Agent role']: 'Agent role',
    })

    const categoryMap = reactive(new Map());
    categoryMap
    .set('NotSelected', {
        ['Not Selected']: 'Not Selected',
    })
    categoryMap
    .set('Book', {
            ['BookID']: 'Book ID',
            ['Repository']: 'Repository', 
            ['Date of publication']: 'Year Published', 
            ['Genre/Identity']: 'Book Genre',
            ['Title']: 'Book Title',
            ['Author']: 'Author',
            ['Place of publication']: 'Place of publication',
            ['Size']: 'Book Size',
            ['Book Notes']:'Book Notes',
            ['Print or manuscript']: 'Format',
            ['STC or Wing']: 'STC or Wing',
            ['Shelfmark']: 'Shelfmark',
            ['Marginal Marks']: 'Marginal marks',
            ['Book image/s']: 'Images',
            ['Number of marks']: 'Number of marks in book',
            ['Number of book images']: 'Number of book images',
    })
    categoryMap
    .set('Agent', {
            ['FemaleAgentID']: 'Agent ID',
            ['Female agent name']: 'Agent name', 
            ['Female agent date']: 'Agent date', 
            ['Female agent bio']: 'Agent bio',
            ['Number of marks']: 'Number of marks by agent',
    })
    categoryMap
    .set('Mark', {
            ['MargID']: 'Mark ID',
            ['Notes']: 'Notes',
            ['Ownership type']: 'Ownership type',
            ['Distribution']: 'Distribution of marks',
            ['Female agent status']: 'Confidence in female authorship',
            ['Annotation type']: 'Annotation type',
            ['Location sig. ; p. ; pp.']: 'Location',
            ['Recording type']: 'Recording type',
            ['Transcription']: 'Transcription',
            ['Mark type (Mark of?)']: 'Type of mark',
            ['Images of marginal mark']: 'Images',
            ['Class']: 'Class',
            ['Position on page']: 'Position on page',
            ['Location other']: 'Location detail',
            ['Added text type']: 'Type of added text',
            ['Drawing type']: 'Type of drawing',
            ['Graffiti type']: 'Type of Graffiti',
            ['Agent role']: 'Agent role',
            ['Other notes']: 'Other notes',
    })

    //Inverse Map - Created to reverse conversion as needed in one place only
    const invCategoryMap = reactive(new Map());
    invCategoryMap
    .set('NotSelected', invertObject(categoryMap.get('NotSelected')))
    invCategoryMap
    .set('Book', invertObject(categoryMap.get('Book')))
    invCategoryMap
    .set('Agent', invertObject(categoryMap.get('Agent')))
    invCategoryMap
    .set('Mark', invertObject(categoryMap.get('Mark')))

    ////////////
    // SCALES //
    ////////////

    const zoomLevel = ref("0");
    const zoomFactor = reactive({
        0: {height: 1.5*0.25, width: 2*0.25},
        50: {height: 1.5*1, width: 2*1},
        100: {height: 1.5*2, width: 1.4*5},
    })

    const scales = reactive({
        maxItemHeight: 100 * zoomFactor[zoomLevel.value].height,
        maxShelfHeight: 110 * zoomFactor[zoomLevel.value].height,
        minItemHeight: 50 * zoomFactor[zoomLevel.value].height,
        minItemWidth: 16 * zoomFactor[zoomLevel.value].width     
    })

    const scalesStandard = reactive({
        maxItemHeight: 100 * zoomFactor[50].height,
        maxShelfHeight: 110 * zoomFactor[50].height,
        minItemHeight: 50 * zoomFactor[50].height,
        minItemWidth: 16 * zoomFactor[50].width     
    })


    watchEffect(()=>{
        scales.maxItemHeight = 100 * zoomFactor[zoomLevel.value].height;
        scales.maxShelfHeight = 110 * zoomFactor[zoomLevel.value].height;
        scales.minItemHeight = 50 * zoomFactor[zoomLevel.value].height;
        scales.minItemWidth = 16 * zoomFactor[zoomLevel.value].width;
    })

    const viewMap = reactive(new Map());
    viewMap
    .set('NotSelected', {
        ['Not Selected']: {category: 'Not Selected', useColour: true, useSection: true, useOrder: true, useHeight: true},
    })
    viewMap
    .set('Book', {
            ['BookID']: {sortMethod: '1', category: 'BookID', func: 'scaleSequential', scheme: 'interpolateYlGnBu', useColour: true, useSection: false, useOrder: true, useHeight: false},
            ['Repository']: {sortMethod: 'A', category: 'Repository', useColour: false, useSection: true, useOrder: true, useHeight: false}, 
            ['Date of publication']: {sortMethod: '1', category: 'Date of publication', func: 'scaleSequential', scheme: 'interpolateRdYlBu', useColour: true, useSection: false, useOrder: true, useHeight: false},
            ['Genre/Identity']: {sortMethod: 'A', category: 'Genre/Identity', func: 'scaleOrdinal', scheme: 'schemeSet3',useColour: true, useSection: true, useOrder: true, useHeight: false},
            ['Title']: {sortMethod: 'A', category: 'Title', useColour: false, useSection: false, useOrder: false, useHeight: false},
            ['Author']: {sortMethod: 'A', category: 'Author', useColour: false, useSection: false, useOrder: false, useHeight: false},
            ['Place of publication']: {sortMethod: 'A', category: 'Place of publication', func: 'scaleOrdinal', scheme: 'schemePaired',useColour: true, useSection: true, useOrder: true, useHeight: false},
            ['Size']: {sortMethod: '1', category: 'Size', func: 'scaleOrdinal', scheme: 'schemePaired',useColour: true, useSection: true, useOrder: true, useHeight: true},
            ['Book Notes']: {sortMethod: 'A', category: 'Book Notes', useColour: false, useSection: false, useOrder: false, useHeight: false},
            ['Print or manuscript']: {sortMethod: 'A', category: 'Print or manuscript', func: 'scaleOrdinal', scheme: 'schemeDark2', useColour: false, useSection: false, useOrder: false, useHeight: false},
            ['STC or Wing']: {sortMethod: 'A', category: 'STC or Wing', func: 'scaleOrdinal', scheme: 'schemeDark2', useColour: false, useSection: false, useOrder: false, useHeight: false},
            ['Shelfmark']: {sortMethod: 'A', category: 'Shelfmark', useColour: false},
            ['Marginal Marks']: {sortMethod: 'A', category: 'Marginal Marks', useColour: false, useSection: false, useOrder: false, useHeight: false},
            ['Book image/s']: {sortMethod: 'A', category: 'Book image/s', useColour: false, useSection: false, useOrder: false, useHeight: false},
            ['Number of marks']:  {sortMethod: '1', category: 'Number of marks', func: 'scaleSequential', scheme: 'interpolatePlasma', useColour: true, useSection: true, useOrder: true, useHeight: true},
            ['Number of book images']: {sortMethod: '1', category: 'Number of book images', func: 'scaleSequential', scheme: 'interpolateCool', useColour: true, useSection: true, useOrder: true, useHeight: true},
    })
    viewMap
    .set('Agent', {
            ['FemaleAgentID']: {sortMethod: '1', category: 'FemaleAgentID', func: 'scaleSequential', scheme: 'interpolatePuRd', useColour: true, useSection: false, useOrder: true, useHeight: false},
            ['Female agent name']: {sortMethod: 'A', category: 'Female agent name', useColour: false, useSection: false, useOrder: true, useHeight: false}, 
            ['Female agent date']: {sortMethod: '1', category: 'Female agent date', func: 'scaleSequential', scheme: 'interpolateSpectral', useColour: true, useSection: false, useOrder: true, useHeight: false},
            ['Female agent bio']: {sortMethod: 'A', category: 'Female agent bio', useColour: false, useSection: false, useOrder: false, useHeight: false},
            ['Number of marks']: {sortMethod: '1', category: 'Number of marks', func: 'scaleSequential', scheme: 'interpolateBuPu', useColour: true, useSection: true, useOrder: true, useHeight: true},
    })
    viewMap
    .set('Mark', {
            ['MargID']: {sortMethod: '1', category: 'MargID', func: 'scaleSequential', scheme: 'interpolateRdPu', useColour: true, useSection: false, useOrder: true, useHeight: false},
            ['Notes']: {sortMethod: 'A', category: 'Notes', useColour: false, useSection: false, useOrder: false, useHeight: false},
            ['Ownership type']: {sortMethod: 'A', category: 'Ownership type', func: 'scaleOrdinal', scheme: 'schemeSet1', useColour: true, useSection: true, useOrder: true, useHeight: false},
            ['Distribution']: {sortMethod: 'A', category: 'Distribution', func: 'scaleOrdinal', scheme: 'schemePastel1', useColour: true, useSection: false, useOrder: false, useHeight: false},
            ['Female agent status']: {sortMethod: 'A', category: 'Female agent status', func: 'scaleOrdinal', scheme: 'schemeSet1', useColour: true, useSection: true, useOrder: true, useHeight: false},
            ['Annotation type']: {sortMethod: 'A', category: 'Annotation type', func: 'scaleOrdinal', scheme: 'schemeSet2', useColour: true, useSection: false, useOrder: true, useHeight: false},
            ['Location sig. ; p. ; pp.']: {sortMethod: 'A', category: 'Location sig. ; p. ; pp.', useColour: false, useSection: false, useOrder: false, useHeight: false},
            ['Recording type']: {sortMethod: 'A', category: 'Recording type', func: 'scaleOrdinal', scheme: 'schemeSet2', useColour: true, useSection: false, useOrder: true, useHeight: false},
            ['Transcription']: {sortMethod: 'A', category: 'Transcription', useColour: false, useSection: false, useOrder: false, useHeight: false},
            ['Mark type (Mark of?)']: {sortMethod: 'A', category: 'Mark type (Mark of?)', func: 'scaleOrdinal', scheme: 'schemeTableau10', useColour: true, useSection: true, useOrder: true, useHeight: false},
            ['Images of marginal mark']: {sortMethod: 'A', category: 'Images of marginal mark', useColour: false, useSection: false, useOrder: false, useHeight: false},
            ['Class']: {sortMethod: 'A', category: 'Class', func: 'scaleOrdinal', scheme: 'schemeAccent',useColour: false , useSection: false, useOrder: false, useHeight: false},
            ['Position on page']: {sortMethod: 'A', category: 'Position on page', func: 'scaleOrdinal', scheme: 'schemeSet3',useColour: true, useSection: false, useOrder: true, useHeight: false},
            ['Location other']: {sortMethod: 'A', category: 'Location other', func: 'scaleOrdinal', scheme: 'schemeSet3',useColour: true, useSection: false, useOrder: false, useHeight: false},
            ['Added text type']: {sortMethod: 'A', category: 'Added text type', func: 'scaleOrdinal', scheme: 'schemeAccent',useColour: true, useSection: false, useOrder: true, useHeight: false},
            ['Drawing type']: {sortMethod: 'A', category: 'Drawing type', func: 'scaleOrdinal', scheme: 'schemeDark2', useColour: true, useSection: false, useOrder: true, useHeight: false},
            ['Graffiti type']: {sortMethod: 'A', category: 'Graffiti type', func: 'scaleOrdinal', scheme: 'schemeDark2', useColour: true, useSection: false, useOrder: true, useHeight: false},
            ['Agent role']: {sortMethod: 'A', category: 'Agent role', func: 'scaleOrdinal', scheme: 'schemeAccent',useColour: true},
            ['Other notes']: {sortMethod: 'A', category: 'Other notes', useColour: false, useSection: false, useOrder: false, useHeight: false},
    })

    const filterMap = reactive(new Map());
    filterMap
  .set('Book', {
        //   ['BookID']: [],
          ['Repository']: [], 
          ['Date of publication']: [], 
          ['Genre/Identity']: [],
          ['Title']: [],
          ['Author']: [],
          ['Place of publication']: [],
          ['Size']: [],
        //   ['Book Notes']:[],
        //   ['Print or manuscript']: [],
        //   ['STC or Wing']: [],
          ['Shelfmark']: [],
        //   ['Marginal Marks']: [],
        //   ['Book image/s']: [],
          ['Number of marks']: [],
          ['Number of book images']: [],
  })
  filterMap
  .set('Agent', {
        //   ['FemaleAgentID']: [],
          ['Female agent name']: [], 
          ['Female agent date']: [], 
        //   ['Female agent bio']: [],
          ['Number of marks']: [],
  })
  filterMap
  .set('Mark', {
        //   ['MargID']: [],
        //   ['Notes']: [],
          ['Ownership type']: [],
          ['Distribution']: [],
          ['Female agent status']: [],
          ['Annotation type']: [],
          ['Location sig. ; p. ; pp.']: [],
          ['Recording type']: [],
          ['Transcription']: [],
          ['Mark type (Mark of?)']: [],
        //   ['Images of marginal mark']: [],
        //   ['Class']: [],
          ['Position on page']: [],
          ['Location other']: [],
          ['Added text type']: [],
          ['Drawing type']: [],
          ['Graffiti type']: [],
          ['Agent role']: [],
        //   ['Other notes']: [],
  })


    // FILTERED MAP ADJUSTMENTS //
    // TO be deleted - Believe ViewDesigner is the only component relying on this.
    const colourMapFiltered = reactive(new Map());
    const colourMapTemp = new Map(categoryMap)

    const bookColour = viewMap.get('Book')
    const agentColour = viewMap.get('Agent')
    const markColour = viewMap.get('Mark')

    const bookFilter = JSON.parse(JSON.stringify(colourMapTemp.get('Book')))
    const agentFilter = JSON.parse(JSON.stringify(colourMapTemp.get('Agent')))
    const markFilter = JSON.parse(JSON.stringify(colourMapTemp.get('Mark')))

        Object.keys(bookFilter)
        .forEach(key => { if (!bookColour[key].useColour) delete bookFilter[key] })
        Object.keys(agentFilter)
        .forEach(key => { if (!agentColour[key].useColour) delete agentFilter[key] })
        Object.keys(markFilter)
        .forEach(key => { if (!markColour[key].useColour) delete markFilter[key] })


    colourMapFiltered.set('Book', bookFilter)
    colourMapFiltered.set('Agent', agentFilter)
    colourMapFiltered.set('Mark', markFilter)

    // Standard Views //
    const agentsView = ({
        //Query - How Many Agents In Collection?
        view: {
            itemType: "Agent",
            id: 'FemaleAgentID',
            shelf: 'Not Selected', //Primary sort
            bookend: 'Not Selected', //Secondary sort
            height: 'Not Selected',
            colour: 'Number of marks',
        },
        viewType: {
            id: 'Agent',
            shelf: 'NotSelected',
            bookend: 'NotSelected',
            height: 'NotSelected',
            colour: 'Agent',
        },
        pageText: {
            queryType: 'Agents ',
            queryBreadcrumb: '',
            libraryTypeTitle: 'The Agents',
            libraryTypeSubtitle: 'in the libraries',
        }
    })

    const booksView = ({
        //Query - How Many Agents In Collection?
        view: {
            itemType: "Book",
            id: 'BookID',
            shelf: 'Not Selected', //Primary sort
            bookend: 'Not Selected', //Secondary sort
            height: 'Not Selected',
            colour: 'Number of marks',
        },
        viewType: {
            id: 'Book',
            shelf: 'NotSelected',
            bookend: 'NotSelected',
            height: 'NotSelected',
            colour: 'Book',
        },
        pageText: {
            queryType: 'Books ',
            queryBreadcrumb: '',
            libraryTypeTitle: 'The Books',
            libraryTypeSubtitle: 'in the libraries',
        }
    })
    const exploreView = ({
        //Query - How Many Agents In Collection?
        view: {
            itemType: "Book",
            id: 'BookID',
            shelf: 'Not Selected', //Primary sort
            bookend: 'Not Selected', //Secondary sort
            height: 'Not Selected',
            colour: 'Number of marks',
        },
        viewType: {
            id: 'Book',
            shelf: 'NotSelected',
            bookend: 'NotSelected',
            height: 'NotSelected',
            colour: 'Book',
        },
        pageText: {
            queryType: 'Books ',
            queryBreadcrumb: '',
            libraryTypeTitle: 'The Books',
            libraryTypeSubtitle: 'in the libraries',
        }
    })

    const marksView = ({
        //Query - How Many Agents In Collection?
        view: {
            itemType: "Mark",
            id: 'MargID',
            shelf: 'Not Selected', //Primary sort
            bookend: 'Not Selected', //Secondary sort
            height: 'Not Selected',
            colour: 'Mark type (Mark of?)',
        },
        viewType: {
            id: 'Mark',
            shelf: 'NotSelected',
            bookend: 'NotSelected',
            height: 'NotSelected',
            colour: 'Mark',
        },
        pageText: {
            queryType: 'Mark ',
            queryBreadcrumb: '',
            libraryTypeTitle: 'The Marks',
            libraryTypeSubtitle: 'in the libraries',
        }
    })

    
    //View Query Configurations //
    
    // How many agents are in the collection? 
    const agentsInCollection = ({
        //Query - How Many Agents In Collection?
        view: {
            itemType: "Agent",
            id: 'FemaleAgentID',
            shelf: 'Not Selected', //Primary sort
            bookend: 'Not Selected', //Secondary sort
            height: 'Not Selected',
            colour: 'Female agent status',
        },
        viewType: {
            id: 'Agent',
            shelf: 'NotSelected',
            bookend: 'NotSelected',
            height: 'NotSelected',
            colour: 'Mark',
        },
        pageText: {
            queryType: 'Agents ',
            queryBreadcrumb: 'How many agents are in the collection ?',
            libraryTypeTitle: 'The Agents',
            libraryTypeSubtitle: 'in the libraries',
        }
    })
    const agentsYearsMade = ({
        //Query - What years did each agent make their marks?
        view: {
            itemType: "Agent",
            id: 'FemaleAgentID',
            shelf: 'Not Selected', //Primary sort
            bookend: 'Not Selected', //Secondary sort
            height: 'Not Selected',
            colour: 'Female agent status',
        },
        viewType: {
            id: 'Agent',
            shelf: 'NotSelected',
            bookend: 'NotSelected',
            height: 'NotSelected',
            colour: 'Mark',
        },
        pageText: {
            queryType: 'Agents ',
            queryBreadcrumb: 'How many agents are in the collection ?',
            libraryTypeTitle: 'The Agents',
            libraryTypeSubtitle: 'in the libraries',
        }
    })

    const booksTheyRead = ({
        //Query - What Kinds of Books did people read?
        view: {
            itemType: "Book",
            id: 'BookID',
            shelf: 'Not Selected', //Primary sort
            bookend: 'Genre/Identity', //Secondary sort
            height: 'Size',
            colour: 'Size',
        },
        viewType: {
            id: 'Book',
            shelf: 'NotSelected',
            bookend: 'Book',
            height: 'Book',
            colour: 'Book',
        },
        pageText: {
            queryType: 'Books ',
            queryBreadcrumb: 'What kinds of books did people read ?',
            libraryTypeTitle: 'The Books',
            libraryTypeSubtitle: 'in the libraries',
        }
    })

    const booksLibraryofLibraries = ({
        //Query - Where can you find the books today?
        view: {
            itemType: "Book",
            id: 'BookID',
            shelf: 'Repository', //Primary sort
            bookend: 'Date of publication', //Secondary sort
            height: 'Number of marks',
            colour: 'Mark type (Mark of?)',
        },
        viewType: {
            id: 'Book',
            shelf: 'Book',
            bookend: 'Book',
            height: 'Book',
            colour: 'Mark',
        },
        pageText: {
            queryType: 'Books ',
            queryBreadcrumb: 'Where can you find the books today ?',
            libraryTypeTitle: 'The Books',
            libraryTypeSubtitle: 'in the libraries',
        }
    })

    const booksYearsPublished = ({
        //Query - What years were the books published?
        view: {
            itemType: "Book",
            id: 'BookID',
            shelf: 'Not Selected', //Primary sort
            bookend: 'Genre/Identity', //Secondary sort
            height: 'Size',
            colour: 'Size',
        },
        viewType: {
            id: 'Book',
            shelf: 'NotSelected',
            bookend: 'Book',
            height: 'Book',
            colour: 'Book',
        },
        pageText: {
            queryType: 'Books ',
            queryBreadcrumb: 'What kinds of books did people read ?',
            libraryTypeTitle: 'The Books',
            libraryTypeSubtitle: 'in the libraries',
        }
    })

    const marksTheyMade = ({
        //Query - What Kinds of Books did people read?
        view: {
            itemType: "Mark",
            id: 'MargID',
            shelf: 'Not Selected', //Primary sort
            bookend: 'Not Selected', //Secondary sort
            height: 'Number of marks',
            colour: 'Mark type (Mark of?)',
        },
        viewType: {
            id: 'Mark',
            shelf: 'NotSelected',
            bookend: 'NotSelected',
            height: 'Book',
            colour: 'Mark',
        },
        pageText: {
            queryType: 'Marks ',
            queryBreadcrumb: 'What types of marks did each agent make ?',
            libraryTypeTitle: 'The Marks',
            libraryTypeSubtitle: 'in the libraries',
        }
    })

    const marksHowMany = ({
        //Query - How many marks did each agent make?
        view: {
            itemType: "Mark",
            id: 'MargID',
            shelf: 'Not Selected', //Primary sort
            bookend: 'Not Selected', //Secondary sort
            height: 'Number of marks',
            colour: 'Mark type (Mark of?)',
        },
        viewType: {
            id: 'Mark',
            shelf: 'NotSelected',
            bookend: 'NotSelected',
            height: 'Book',
            colour: 'Mark',
        },
        pageText: {
            queryType: 'Marks ',
            queryBreadcrumb: 'What types of marks did each agent make ?',
            libraryTypeTitle: 'The Marks',
            libraryTypeSubtitle: 'in the libraries',
        }
    })


    const viewRouteQueries = reactive({
        agents: agentsView,
        books: booksView,
        marks: marksView,
        searchView: exploreView,
        agent01: agentsInCollection,
        agent02: agentsYearsMade,
        book01: booksTheyRead,
        book02: booksLibraryofLibraries,
        book03: booksYearsPublished,
        mark01: marksTheyMade,
        mark02: marksHowMany,
    })

    //Objects passed to Components 
    const libraryItemBundle = computed (() => {
        return {
            Agent: {
                labelViewMode: 'agentLabel',
                menuHeader: 'Agent No.',
                menuSubheader: 'Female agent name',
                ownProp1: 'FemaleAgentID',
                ownProp2: 'Female agent bio',
                ownProp3: 'Number of marks',
                collectionProp1: 'agentCollectionProp1',
                collectionProp2:'agentCollectionProp2',
                viewProp1: 'height',
                viewProp2: 'colour',
                viewProp3: 'shelf',
                viewProp4: 'bookend',
                itemType: 'Agent',
                yourCollectionFunction(item) { return addToCollection(item)}, //Method property shorthand
                yourCollectionText: 'Add to Collection',
            },
            Book: {
                labelViewMode: 'bookLabel',
                menuHeader: 'Book No.',
                menuSubheader: 'Shelfmark',
                ownProp1: 'BookID',
                ownProp2: 'Author',
                ownProp3: 'Date of publication',
                collectionProp1: 'bookCollectionProp1',
                collectionProp2:'bookCollectionProp2',
                viewProp1: 'height',
                viewProp2: 'colour',
                viewProp3: 'shelf',
                viewProp4: 'bookend',
                itemType: 'Book',
                yourCollectionFunction(item) { return addToCollection(item)}, //Method property shorthand
                yourCollectionText: 'Add to Collection',
            },
            Mark: {
                labelViewMode: 'markLabel',
                menuHeader: 'Mark No.',
                menuSubheader: 'Transcription',
                ownProp1: 'MargID',
                ownProp2: 'Distribution',
                ownProp3: 'Female agent status',
                collectionProp1: 'markCollectionProp1',
                collectionProp2:'markCollectionProp2',
                viewProp1: 'height',
                viewProp2: 'colour',
                viewProp3: 'shelf',
                viewProp4: 'bookend',
                itemType: 'Mark',
                yourCollectionFunction(item) { return addToCollection(item)}, //Method property shorthand
                yourCollectionText: 'Add to Collection',
            }
        }
    })


    let colourBundle = JSON.parse(JSON.stringify(libraryItemBundle.value))
    Object.keys(colourBundle).forEach((key) =>{
        colourBundle[key].labelViewMode = 'colour';
        colourBundle[key].yourCollectionFunction = addToCollection; //Re-assignment required after object is stringified.
    })

    //Bundle Object passed to Components
    const viewColourItemBundle = computed (() => {
        return colourBundle;
    })

    const viewEditItemBundle = computed (() => {
        return libraryItemBundle.value
    })


    
    let shelfBundle = JSON.parse(JSON.stringify(libraryItemBundle.value))
    Object.keys(shelfBundle).forEach((key) =>{
        shelfBundle[key].yourCollectionFunction = removeFromCollection; //Method assignment expression
        shelfBundle[key].yourCollectionText = 'Remove from Collection';
    })
    
    //Bundle Object passed to Components
    const yourCollectionItemBundle = computed (() => {
        return shelfBundle;
    })



    console.log(yourCollectionItemBundle)
    // console.log(categoryMap)
    // console.log(colourMap)

      return {  
                zoomFactor,
                zoomLevel,
                categoryMap, 
                invCategoryMap, 
                viewMap, 
                filterMap,
                colourMapFiltered, 
                scales, 
                scalesStandard,
                viewRouteQueries,
                libraryItemBundle, 
                yourCollectionItemBundle,
                viewEditItemBundle,
                viewColourItemBundle,
                itemModalMap,
                windowHeight,
                windowWidth,
                topViews,
                topViewList
            }
  })


// Template

//   colourMap
//   .set('Book', {
//           ['BookID']: '',
//           ['Repository']: '', 
//           ['Date of publication']: '', 
//           ['Genre/Identity']: '',
//           ['Title']: '',
//           ['Author']: '',
//           ['Place of publication']: '',
//           ['Size']: 'schemePaired',
//           ['Book Notes']:'',
//           ['Print or manuscript']: '',
//           ['STC or Wing']: '',
//           ['Shelfmark']: '',
//           ['Marginal Marks']: '',
//           ['Book image/s']: '',
//           ['Number of marks']: '',
//           ['Number of book images']: '',
//   })
//   colourMap
//   .set('Agent', {
//           ['FemaleAgentID']: '',
//           ['Female agent name']: '', 
//           ['Female agent date']: '', 
//           ['Female agent bio']: '',
//           ['Number of marks']: '',
//   })
//   colourMap
//   .set('Mark', {
//           ['MargID']: '',
//           ['Notes']: '',
//           ['Ownership type']: '',
//           ['Distribution']: '',
//           ['Female agent status']: '',
//           ['Annotation type']: '',
//           ['Location sig. ; p. ; pp.']: '',
//           ['Recording type']: '',
//           ['Transcription']: '',
//           ['Mark type (Mark of?)']: '',
//           ['Images of marginal mark']: '',
//           ['Class']: 'Class',
//           ['Position on page']: '',
//           ['Location other']: '',
//           ['Added text type']: '',
//           ['Drawing type']: '',
//           ['Graffiti type']: '',
//           ['Agent role']: '',
//           ['Other notes']: '',
//   })
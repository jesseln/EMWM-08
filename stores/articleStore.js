// import { defineStore } from 'pinia'

export const useArticleStore = defineStore('article', ()=>{

    
    const allArticles = ref({}); //Genereric Getting in case single table is required only


    //Generic Getter - Returns single table as specified by tableName and orderColumn
    async function cloneLibrary(library, articleName, articleSection) {
        allArticles.value[articleName] = allArticles.value[articleName] || {}
        allArticles.value[articleName][articleSection] = allArticles.value[articleName][articleSection] || {}
        allArticles.value[articleName][articleSection].library = await JSON.parse(JSON.stringify(library))
        return true
    }
    async function cloneReferences(references, articleName, articleSection) {
        allArticles.value[articleName] = allArticles.value[articleName] || {}
        allArticles.value[articleName][articleSection] = allArticles.value[articleName][articleSection] || {}
        allArticles.value[articleName][articleSection].references = await JSON.parse(JSON.stringify(references))
        return true
    }

      return {allArticles, cloneLibrary, cloneReferences}
  })
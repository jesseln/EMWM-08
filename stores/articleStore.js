// import { defineStore } from 'pinia'

export const useArticleStore = defineStore('article', ()=>{

    
    const allArticles = ref({}); //Genereric Getting in case single table is required only


    //Generic Getter - Returns single table as specified by tableName and orderColumn
    async function cloneLibrary(library, articleName, articleSection) {
        allArticles.value[articleName] = allArticles.value[articleName] || {}
        allArticles.value[articleName][articleSection] = allArticles.value[articleName][articleSection] || {}
        allArticles.value[articleName][articleSection].library = await JSON.parse(stringify(library))
        return true
    }
    async function cloneReferences(references, articleName, articleSection) {
        allArticles.value[articleName] = allArticles.value[articleName] || {}
        allArticles.value[articleName][articleSection] = allArticles.value[articleName][articleSection] || {}
        allArticles.value[articleName][articleSection].references = await JSON.parse(stringify(references))
        return true
    }

    function stringify(obj) {
        let cache = [];
        let str = JSON.stringify(obj, function(key, value) {
          if (typeof value === "object" && value !== null) {
            if (cache.indexOf(value) !== -1) {
              // Circular reference found, discard key
              return;
            }
            // Store value in our collection
            cache.push(value);
          }
          return value;
        });
        cache = null; // reset the cache
        return str;
      }

      return {allArticles, cloneLibrary, cloneReferences}
  })
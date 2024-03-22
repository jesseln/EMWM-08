// import { defineStore } from 'pinia'

export const useArticleStore = defineStore('article', ()=>{

    
    const allArticles = ref({}); //Genereric Getting in case single table is required only


    //Generic Getter - Returns single table as specified by tableName and orderColumn
    async function cloneLibrary(data, dataName, articleName, articleSection) {
        allArticles.value[articleName] = allArticles.value[articleName] || {}
        allArticles.value[articleName][articleSection] = allArticles.value[articleName][articleSection] || {}
        allArticles.value[articleName][articleSection]['library'] = allArticles.value[articleName][articleSection]['library'] || {}
        allArticles.value[articleName][articleSection]['library'][dataName] = await JSON.parse(stringify(data))
        return true
    }
    
    async function cloneReferences(data, dataName , articleName, articleSection) {
        allArticles.value[articleName] = allArticles.value[articleName] || {}
        allArticles.value[articleName][articleSection] = allArticles.value[articleName][articleSection] || {}
        allArticles.value[articleName][articleSection]['references'] = allArticles.value[articleName][articleSection]['references'] || {}
        allArticles.value[articleName][articleSection]['references'][dataName] = await JSON.parse(stringify(data))
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
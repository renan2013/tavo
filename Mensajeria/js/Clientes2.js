<template>
  <div>
    <p>Current page: {{ currentPage }}</p>
    <v-pagination v-model="currentPage"
                  :page-count="totalPages"
                  :classes="bootstrapPaginationClasses"
                  :labels="paginationAnchorTexts"></v-pagination>
  </div>
</template>

 
import vPagination from 'vue-plain-pagination'

export default {
  components: { vPagination },
  data() {
    return {
      currentPage: 1,
      totalPages: 30,
      bootstrapPaginationClasses: {
        ul: 'pagination',
        li: 'page-item',
        liActive: 'active',
        liDisable: 'disabled',
        button: 'page-link'  
      },
      paginationAnchorTexts: {
        first: 'First',
        prev: 'Previous',
        next: 'Next',
        last: 'Last'
      }
    }
  }
} 
<!-- 元件化 -->
<script>
export default {
  props: ["pages", "getProducts"],
}
</script>
<template>
<nav aria-label="Page navigation example">
  <!-- {{pages}} -->
  <ul class="pagination">
    <li class="page-item bg-primary"
     :class="{ disabled: !pages.has_pre}"
    >
      <a class="page-link" href="#" aria-label="Previous" @click.prevent="getProducts(pages.current_page-1)">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li class="page-item"
        :class="{ active: page === pages.current_page }"
        v-for="page in pages.total_pages" :key="page + 'page'"   
    > 
        <a class="page-link" href="#" @click.prevent="getProducts(page)">{{ page }}</a>
    </li>
    <li class="page-item"
     :class="{ disabled: !pages.has_next}"
    >
      <a class="page-link" href="#" aria-label="Next" @click.prevent="getProducts(pages.current_page+1)">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
</template>
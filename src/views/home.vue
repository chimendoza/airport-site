<template>


  <div class="search-area">
    <div class="container">

      <div clas="search-bar">

        <SearchBox/>

      </div>
    </div>


    <div class="container">

      <div class="preloader">
        <div class="spinner"></div>
    </div>



    </div>


</div>

</template>
  <script>

    import SearchBox  from '@/components/SearchBox.vue';
    


    export default{


      components:{

        SearchBox,
        
      }

    }
  
  </script>

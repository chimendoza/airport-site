<template>


  <div class="search-area">
    <div class="container">

      <div clas="search-bar">

        <SearchBox @searching="onSearchingStatus" @results="onResults" @seats="onSeatsChange"/>

      </div>
    </div>


    <div class="container">

      <div class="preloader" v-if="searching">
        <div class="spinner"></div>
      </div>





    </div>


</div>



<div class="container">


  <h4 v-if="noresults">No hay resultados</h4>
  <div class="results" v-else>

    <h4>Vuelos encontrados</h4>



    <template v-for="(result,index) in results" :key="index">

    <div class="result" v-if="result.available_seats>=this.seats">


      <div class="row" >
          <div class="col-md-4">
              <h4>Mérida - {{ result.destination }}<small>{{ result.airline }} - {{ result.aircraft }}</small></h4>
          </div>
          <div class="col-md-3">
              <h5><p>Salida</p>{{ $date.format(result.departure_time,true,true) }}</h5>
          </div>
          <div class="col-md-3">
              <h5><p>Llegada</p>{{ $date.format(result.arrival_time,true,true) }}</h5>
          </div>
          <div class="col-md-2">
              {{ result.flight_class }}
              ${{ $number.format(result.flight_price) }}
              <p>{{ result.available_seats }} asientos disponibles</p>
              <a @click="logged()?openBookingDialog(result.id,result.seatclass_id):openRegisterDialog()" class="btn btn-primary">Reservar</a>
          </div>

      </div>


    </div>
  </template>


  </div>

  

</div>
<MagicDialog v-model="dialog">

  <template v-slot:content>


    <form @submit.prevent="bookFlight">
      <h4>Mérida {{ flight.destination }}</h4>

      <br>
      <h5>Elige tus asientos</h5>
      <div class="seats">

          <div v-for="(seat,index) in flight.seats" :key="index">

              <label><input type="checkbox" @click="(e)=>updateAmount(e,seat.price)" v-model="booking.seats[index]" :value="seat.id"> {{ seat.seat_number }} - {{ getPosition(seat.position) }} ${{ $number.format(seat.price)}}</label>


          </div>


      </div>





      <button class="btn btn-primary">Reservar</button>

</form>




  </template>


</MagicDialog>




<MagicDialog v-model="register">

<template v-slot:content>

    <h4>Regístrate para reservar</h4>

    <form @submit.prevent="createAccount">
        <div class="form-group">

            <label>Nombre</label>
            <input type="text" required v-model="customer.name" class="form-control"/>

        </div>
        <div class="form-group">

          <label>Correo</label>
          <input type="email" required v-model="customer.email" class="form-control"/>

        </div>

        <div class="form-group">

            <label>Teléfono</label>
            <input type="tel" required v-model="customer.phone_number" class="form-control"/>

        </div>

        <button class="btn btn-primary">Registrarme</button>

    </form>


</template>


</MagicDialog>


</template>
  <script>

    import SearchBox  from '@/components/SearchBox.vue';
    import MagicDialog  from '@/components/MagicDialog.vue';
    


    export default{


      components:{

        SearchBox,
        MagicDialog
        
      },

      data(){


        return {
          results:[],
          searching:false,
          noresults:false,
          dialog:false,
          seats:0,
          flight:{},
          register:false,
          customer:{},
          booking:{seats:[]}

        }

      },
      methods:{



          getPosition(v){


            switch(v){

              case "aisle":
                return "Pasillo";
              break;
              case "window":
                return "Ventanilla";
              break;
              case "middle":
                return "Medio";
              break;

            }

            


          },

          onSeatsChange(val){

            console.log(val);
            this.seats=val;


          },
          onResults(results){

            if(results.data.length>0){
              this.results=results.data;
              this.noresults=false;
            }else{
              
              this.noresults=true;
            }

          },
          onSearchingStatus(status){

            this.searching=status;


          },





          openBookingDialog(id,seat_id){

            this.dialog=true;


            this.$api.get('/site/getflight?id='+id+'&seat_id='+seat_id).then(r=>{


              this.flight=r.data;



            });



          },



          saveCredentials(customer){

            
            localStorage.setItem('customer',customer);

          },


          logged(){

            return localStorage.getItem('customer')?true:false;
          },
          openRegisterDialog(){


            this.register=true;

          },

          createAccount(){


            
            this.searching=true;

            this.$api.post('/site/register',this.customer).then(r=>{

              this.searching=false;


              if(r.data.done){

                this.saveCredentials(r.data.customer);
                this.register=false;
                this.dialog=true;
              }else{
                alert('Hubo un problema registrando tu cuenta, por favor verifica tu información en intenta de nuevo');
              }

            });


          },


          updateAmount(){


          

          },


          bookFlight(){

              

          }




      }




    }
  
  </script>

<style scoped>



.results{padding:50px 0}
.result{border:1px solid #ccc;padding:20px;margin:20px 0}
.result small{color:#aaa;display:block;}



</style>
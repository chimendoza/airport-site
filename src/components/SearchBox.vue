<template>


<form @submit.prevent="searchFlights">
<div class="row">

    <div class="col-md-3">

        <div class="form-group">

            <label>Selecciona un destino</label>

            <input type="text" placeholder="Escribe para buscar" class="form-control" required v-model="destination" @input="onDestinationChange"/>

            <div class="suggestions" v-if="destinations">

                <div class="destination" v-for="(destination,index) in destinations" :key="index">
                   <a @click="setDestination(destination.id,destination.name)" href="javascript:"> {{ destination.name }}</a>
                </div>

            </div>
            

        </div>
    </div>

    <div class="col-md-3">

        <div class="form-group">

            <label>Pasajeros</label>
            <input type="text" :type="'number'" v-model="passengers" class="form-control"/>
        </div>
    </div>


    <div class="col-md-3">

    <div class="form-group">

        <label>Salida</label>
        <br>

        <DatePicker v-model="departure_time" language="es"/>
        

    </div>
    </div>
    <div class="col-md-3">

        <div class="form-group">
            <br>
            <button class="btn btn-primary">Buscar vuelos</button>

        </div>
    </div>


</div>

</form>



</template>

<script>


    import DatePicker from 'vuejs3-datepicker'
    

    export default{

        name:'SearchBox',
        components:{

            DatePicker
            
        },
        emits:['results','searching','seats'],
        data(){

            return {

                passengers:2,
                airlines:[],
                destinations:[],
                searching:false,
                destination_id:0,
                departure_time:new Date(),
                destination:''


            }
            
        },

        methods:{


            searchFlights(){


                this.$emit('searching',true);


                const data={departure_time:this.departure_time,
                            destination_id:this.destination_id,
                            passengers:this.passengers

                }
                
                this.$api.post('/site/searchflights',data).then(r=>{
                    
                    
                    
                    this.$emit('searching',false);
                    this.$emit('results',r);


                });


            },

            onDestinationChange(e){


                const key=e.target.value;


                
                if(key.length>=3 && !this.searching){

                    this.searching=true;

                    this.$api.get('/site/searchdestinations?key='+key).then(r=>{


                        this.destinations=r.data;
                        this.searching=false;

                    })

                }


            },


            setDestination(id,name){


                this.destination_id=id;
                this.destination=name;
                this.destinations=[];

                
                this.searchFlights();
                


            }

        },
        
        mounted(){


            this.$emit('seats',this.passengers);
            this.$api.get('/site/catalogs').then(r=>{

                
                this.airlines=r.data.airlines;

            });

        },

        watch:{

            'passengers':{
                handler:function(val){

                    this.$emit('seats',val);
                }

            }


        }



    }


</script>

<style scoped>

.suggestions{background:#fff;}
.suggestions .destination{padding:3px;}
.suggestions .destination a{color:#000;text-decoration: none;padding:3px;display:block}

</style>
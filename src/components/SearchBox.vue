<template>


<div class="row">

    <div class="col-md-3">

        <div class="form-group">

            <label>Selecciona un destino</label>

            <input type="text" class="form-control" v-model="destination" @input="onDestinationChange"/>

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
            <!--
            <select class="form-control" v-model="airline">
                
                <option v-for="(airline,index) in airlines" :key="index">
                    {{airline.name}}</option>
                    
                    
                </select>
                
            -->
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



</template>

<script>


    import DatePicker from 'vuejs3-datepicker'
    

    export default{

        name:'SearchBox',
        components:{

            DatePicker
            
        },
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


            }

        },
        
        mounted(){

            this.$api.get('/site/catalogs').then(r=>{

                
                this.airlines=r.data.airlines;

            });

        }



    }


</script>
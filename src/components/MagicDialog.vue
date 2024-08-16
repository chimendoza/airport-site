<template>
    <div class="magic-dialog" v-if="modelValue">

        <div class="magic-dialog-content" :class="size">
            <div class="magic-dialog-inner">
                <a @click="closeme()">x</a>
                <div class="magic-scroll">
                    <slot name="content"></slot>
                </div>
            </div>
        </div>


    </div>
</template>


<script>

    export default{
        name:"MagicDialog",

        props:{
            modelValue:{
                    type:Boolean,
                    default:false

                },

            size:{
                type:String,
                default:'md'
            }


        },

        data(){

            return {

                showme:false

            }
        },

        methods:{
            closeme(){

                this.$emit('update:modelValue',false);

            }

        },


    }

</script>

<style scoped>

    .magic-dialog{

        position:fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        z-index:999999;
        background:rgba(255,255,255,.75);

        .magic-dialog-content{
            position: fixed;
            background: #fff;
            width: 50%;
            height: auto;
            left: 25%;
            top: 25%;
            box-shadow: 0px 0px 40px #ddd;
            border-radius: 7px;
            padding: 47px;

            &.md{
                width:70%;
                left:15%;
            }


            @media(max-width:768px){
                width:90% !important;
                left:5% !important;
                top:5% !important;
                height:90%;
                padding:0;

                a{top:-15px !important;right:-15px !important}
                
            }

            .magic-dialog-inner{
                
                position:relative;
                height:100%;
                .magic-dialog-scroll{

                    overflow: auto;
                }


                a{position:absolute;top:-60px;font-size:20px;right:-60px;cursor:pointer}
            
            }
            

            
        }


    }


</style>
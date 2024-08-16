const format=function(val){
  
  val = val.replace(/[^0-9,.]/g,'');
  
  if(val != "") {
    let valArr = val.split('.');
    
    valArr[0] = (parseInt(valArr[0].replaceAll(',',''))).toLocaleString();
    
    val = valArr.join('.');
  }

  return val;


}



const nl2br={

  mounted(el, binding) {


    
    if(binding.value){
      el.innerHTML = binding.value.replace(/\n/g, '<br>');
    }

  },
  updated(el,binding){

    if(binding.value){

      el.innerHTML = binding.value.replace(/\n/g, '<br>');
    }

  }
}

const numberFormat={
    bind: function (el) {
      
        el.oninput = function () {    
          let val=format(el.value);
          if (el.value !== val) {
            el.value = val;
            el.dispatchEvent(new Event('input'));
          }          
        };      
      },

      /*
      update:function(el) {

        let val=format(el.value);         
        if (el.value !== val) {
          el.value = val;
          el.dispatchEvent(new Event('update'));
        }
        
        
      }
      
      */
  }


  const inputType={
    mounted(el, binding) {


      
      
        if(binding.value=='tel'){

          el.oninput = function () {    
            let val = el.value.replace(/[^0-9]/g,'').substr(0,10);


            if (el.value !== val) {
                el.value = val;                
              el.dispatchEvent(new Event('input'));
            }          
          };      
          
        } else if(binding.value=='number'){

            el.oninput = function () {    
              let val = el.value.replace(/[^0-9.]/g,'');


              if (el.value !== val) {
                  el.value = val;                
                el.dispatchEvent(new Event('input'));
              }          
            };      


        }

        
      
      },

      /*
      update:function(el) {

        let val=format(el.value);         
        if (el.value !== val) {
          el.value = val;
          el.dispatchEvent(new Event('update'));
        }
        
        
      }
      
      */
  }  



  const maxChar={

    mounted(el, binding) {

      let maxChars = binding.value;
      let handler = function(e) {
        if (e.target.value.length > maxChars) {
          e.target.value = e.target.value.substr(0, maxChars);
          vnode.elm.dispatchEvent(new CustomEvent('input')); // added this
        }
      }
      el.addEventListener('input', handler);

    }


  }


  

  export {numberFormat,maxChar,inputType,nl2br};
  
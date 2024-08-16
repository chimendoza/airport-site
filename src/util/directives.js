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


  

const date={

  format:function(date,short,time){



      if(date){
          let sh=short || true;


          let d=date.split(" ");

          const t=d[1].split(":");

          let parts=d[0].split("-");

          const months=['Enero',
                      'Febrero',
                      'Marzo',
                      'Abril',
                      'Mayo',
                      'Junio',
                      'Julio',
                      'Agosto',
                      'Septiembre',
                      'Octubre',
                      'Noviembre',
                      'Diciembre'];

          let month_name=months[parseInt(parts[1])-1];

          let result=parts[2]+' '+(sh?month_name.substring(0,3):month_name)+' '+parts[0];
          if(time){
            result+=' '+t[0]+':'+t[1];
          }

          return result;

      }

      return '';

  },

  now:function(){

      
          const now = new Date();
      
          const year = now.getFullYear();
          const month = String(now.getMonth() + 1).padStart(2, '0'); // Meses van de 0 a 11
          const day = String(now.getDate()).padStart(2, '0');
      
          const hours = String(now.getHours()).padStart(2, '0');
          const minutes = String(now.getMinutes()).padStart(2, '0');
          const seconds = String(now.getSeconds()).padStart(2, '0');
      
          return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      

  },

  dbformat:function(date,t){


      if(date){
              let time=true;
              if(t===false){
                  time=false;
              }
              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses van de 0 a 11
              const day = String(date.getDate()).padStart(2, '0');
          
              const hours = String(date.getHours()).padStart(2, '0');
              const minutes = String(date.getMinutes()).padStart(2, '0');
              const seconds = String(date.getSeconds()).padStart(2, '0');
          

              if(time){

                  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
              }else{
                  return `${year}-${month}-${day}`;
              }
      return '';
      
      }

}





}




const number={

  format:function(value){

  

  let valStr=value;    
  if(typeof(value)=='number'){
      valStr= value.toString();
  }

  if(value==undefined || value==null){
      valStr='0';

  }
  
  
  valStr = valStr.replace(/[^0-9.,]/g, '');

  if (valStr.indexOf(',') > valStr.indexOf('.')) {
      valStr = valStr.replace(/,/g, '');
  } else {
      valStr = valStr.replace(/,/g, '.');
  }

  let num = parseFloat(valStr);

  if (isNaN(num)) {
      return '';
  }

  let parts = valStr.split('.');
  let integerPart = parts[0];
  let decimalPart = parts[1] ? parts[1] : '';

  let withCommas = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  if (decimalPart.length > 0) {
      decimalPart = decimalPart.length > 2 ? decimalPart.substring(0, 2) : decimalPart;
      decimalPart = decimalPart.padEnd(2, '0');
      return withCommas + '.' + decimalPart;
  } else {
      return withCommas;
  }

  }
}





  export {numberFormat,maxChar,inputType,nl2br,date,number};
  
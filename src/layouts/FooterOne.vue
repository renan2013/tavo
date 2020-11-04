<template>
   <footer>
        	<div id="footer2">
            
		        <div class="container">
            
		        	<div class="row">
		        		<div class="col-md-4 col-lg-4 footer-about wow fadeInUp">
		        			<img
            src="@/assets/images/logo/logo_tavo_horizontal2.png"
            width="205"
            height="40"
          />
          <br>
          <br>
		        			<p>
		        				"Somos el aliado que necesita. nuestros servicios se orientan a que sus envios lleguen a tiempo y seguros. Somos Tavo Mensajería"
		        			</p>
                  <br>
                  
                  Developed by grupodivisoft <br>San José, Costa Rica, {{year}}
                  <br><br>
		        			
	                    </div>
		        		<div class="col-md-4 col-lg-4 offset-lg-1 footer-contact wow fadeInDown">
		        			<h3>Contacto</h3>
                  <br>
		                	<p><i class="fas fa-map-marker-alt"></i>&nbsp; Detrás de la terminal de buses COMTRASULI</p>
		                	<p><i class="fas fa-phone"></i>&nbsp; Phone: (506) 2256 0105  -  8879 0449</p>
		                	<p><i class="fas fa-envelope"></i>&nbsp; Email: info@tavocr.com</a></p>
                      <p><i class="fas fa-phone"></i>&nbsp; Phone: (506) 2256 0105  -  8879 0449</p>
		                	
                      <hr/>
                      
                      <img
                        src="@/assets/images/logo/logo_divisoft_azul.png"
                        width="160"
                        height="45"
                       />
          <br>
          <br>
                     
		                
	                    </div>
	                    <div class="col-md-4 col-lg-3 footer-social wow fadeInUp">
	                    	<h3>Menu</h3>
                        <br>
	                    <p><router-link to="/acercade">QUIENES SOMOS</router-link></p>
		                	<p><router-link to="/oficinas">OFICINAS</router-link></p>
		                	<p><router-link to="/servicios">SERVICIOS</router-link></p>
	                    </div>
		            </div>
		        </div>
	        </div>
	      
        </footer>
</template>
<script>
export default {
  name: "app-footer",
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>


<style >
* {
  padding: 0;
  margin: 0;
}

html {
  background-color: #eaf0f2;
}

#footer2{
  
  padding-top:20px;
  background-color:black;
  color:white;
}

h3{
  color:red;
}

hr {
  height: 0px;
  background-color: white;
}




</style>
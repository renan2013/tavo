/*function previewFile() {
  var preview = document.querySelector('.pdf_search');
  file    = document.querySelector('input[type=file]').files[0];
  var reader  = new FileReader();

  reader.onloadend = function () {
     //alert(Entidad);
     console.log(file);
     $("#mainRow").css("display","block"); 
       fileBase64 = reader.result;
       fileBase64 = fileBase64.substring(fileBase64.indexOf(",") + 1);
       fileQueque.push({
           "id" : fileQueque.length,
           "file" : file,
           "base64": fileBase64
       });     
              //fileBase64.replace("data:image/png;base64,","");
	if(file.type.split("/")[0] === "image"){
	//if(file.)
              // alert();
		var img = document.querySelector('img');
		img.src = reader.result;
               // console.log($("#imgPreview"));
                $("#imgPreview").css("display","block");
                $("#pdf_search_id").css("display","none");
	}else{
           $("#imgPreview").css("display","none");
           $("#pdf_search_id").css("display","block");
	   preview.src = reader.result;
       }
  }
  

  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.src = "";
  }
}

function adjuntarDocumento(){
   
}

function deleteDoc(){
    $("#mainRow").css("display","none");
    $("#upload").remove();
    $("#uploadWrap").html('<input id="upload" type="file" onchange="previewFile()"><br>');
    
}*/


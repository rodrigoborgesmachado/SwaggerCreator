function topo(){
	parent.scroll(0,0);
}

$(document).ready(function () {
    // Add smooth scrolling to all links in navbar + footer link
    $(".navbar a, footer a[href='#ClinicaJonasGabriela']").on('click', function (event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 900, function () {

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });

    $(window).scroll(function () {
        $(".slideanim").each(function () {
            var pos = $(this).offset().top;

            var winTop = $(window).scrollTop();
            if (pos < winTop + 600) {
                $(this).addClass("slide");
            }
        });
    });
})
function getDataURLResposta(number) {
    var feito = false;
    var reader = new FileReader();
    openLoader();

    reader.onload = function () {
        anexo = reader.result;
        removeLoader();
    };
    reader.onerror = function (error) {
        alert('Error: ', error);
        removeLoader();
    };

    var files = document.getElementById('fileAnexo').files;
    reader.readAsDataURL(files[files.length-1]);
    
}

function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
}

function Enviar(){
    openLoader();

    var xhr = new XMLHttpRequest();
    var file = anexo;        
    var dados = JSON.stringify({file});
    console.log(dados);

    xhr.open("POST", "http://swaggercreator.sunsalesystem.com.br/PHP/GetSwaggerFile.php");
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.addEventListener("load", function() {
        if (xhr.status == 200) {
            if(JSON.parse(xhr.response).Sucesso){
                downloadURI(JSON.parse(xhr.response).Swagger.Arquivo, 'index.html');
            }
            else{
                alerta(JSON.parse(xhr.response).Mensagem);
            }
        } else {
            alerta('Não foi possível inserir');
        }
        removeLoader();
        location.reload();
    }
    );

    xhr.send(dados);
}

function alerta(mensagem) {
    AbrirModal("Alerta", mensagem);
}

function informa(mensagem) {
    AbrirModal("Informação", mensagem);
}

function AbrirModal(tituloModal, textoModal) {
    var titulo = document.querySelector('#tituloModal');
    var texto = document.querySelector('#textoModal');

    titulo.innerHTML = '';
    titulo.innerHTML = tituloModal;
    texto.innerHTML = '';
    texto.innerHTML = '<p>' + textoModal + '</p>';

    $("#myModal").modal();
}

function removeLoader(){
    $( "#loading" ).fadeOut(500, function() {
        document.getElementById('loading').hidden = true;
    });  
}

function openLoader(){
    document.getElementById('loading').style["display"] = "";
    pollVisibility();
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
async function pollVisibility() {
    try {
        if (document.getElementById("loading").style.display == '') {
            return null;
        } else {
            return await delay(100).then(pollVisibility);
        }
    } catch (e) {
        console.log(e)
    }
}
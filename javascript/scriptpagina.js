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

function CriarPalavras(){
    var lista = new Array();
    
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://soletrando.sunsalesystem.com.br/PHP/GetPalavras.php", false);
    xhr.send(null);

    if(xhr.status === 200){
        var json = JSON.parse(xhr.responseText);
        for(var i=0; i < json.lista.length;i++)
        {
            lista.push(json.lista[i].Palavra);
        }
    }
    else{
        lista = new Array();
    }
    
    return lista;
};

function DizerPalavra(palavra){
    let speech = new SpeechSynthesisUtterance();
    speech.lang = "pt";
    speech.voice = window.speechSynthesis.getVoices()[15];
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    speech.text = palavra;
    window.speechSynthesis.speak(speech);
}

function EnviarRequisicaoPOST(nome, numeroAcertos){
    var xhr = new XMLHttpRequest();

    var dados = JSON.stringify({nome, numeroAcertos});

    xhr.open("POST", "http://soletrando.sunsalesystem.com.br/PHP/InsereRanking.php");
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.addEventListener("load", function() {
        var erroAjax = document.querySelector("#erro-ajax");
        if (xhr.status == 200) {
            //sucesso!
        } else {
            alert('Não foi possível inserir seu jogo :(! Ele não será apresentado no ranking');
            //erro!
        }
    }
    );

    xhr.send(dados);
}

function BuscaLista(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://soletrando.sunsalesystem.com.br/PHP/GetRanking.php", false);
    xhr.send(null);

    if(xhr.status === 200){
        return JSON.parse(xhr.responseText);
    }
    else{
        return null;
    }
}

//teste

const listaImagens = ['images/1.jpeg',
                      'images/2.jpeg',
                      'images/3.jpeg',
                      'images/4.jpeg',
                      'images/5.jpeg',
                      'images/6.jpeg',
                      'images/7.jpeg',
                      'images/8.jpeg',
                      'images/9.jpeg',
                      'images/10.jpeg',
                      'images/11.jpeg',
                      'images/12.jpeg',
                      'images/13.jpeg',
                      'images/14.jpeg',
                      'images/15.jpeg',
                      'images/16.jpeg',
                      'images/17.jpeg',
                      'images/18.jpeg',
                      'images/19.jpeg',
                      'images/20.jpeg',
                      'images/21.jpeg',
                      'images/22.jpeg',
                      'images/23.jpeg',
                      'images/24.jpeg',
                      'images/25.jpeg',
                      'images/26.jpeg',
                      'images/27.jpeg',
                      'images/28.jpeg',
                      'images/29.jpeg',
                      'images/30.jpeg',
                    ];
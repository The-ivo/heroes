class Hero {
    constructor(name, intelligence, strength, speed, durability, power, combat, image) {
        this.name = name;
        this.intelligence = intelligence;
        this.strength = strength;
        this.speed = speed;
        this.durability = durability;
        this.power = power;
        this.combat = combat;
        this.image = image;
    }
}
class Desafiante {
    constructor(id, intelligence) {
        this.id = id;
        this.intelligence = intelligence;
    }
}


let BASE_URL = "https://superheroapi.com/api.php/";
let API_KEY = "1611505948999710";
/*faz a chamada na API*/
function getJSON(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        var status = xhr.status;
        if (status === 200) {
            callback(status, xhr.response);
        } else {
            console.log('Deu erro!' + status);
        }

    }
    xhr.send();
}

/* função que cria objeto do tipo hero de acordo com o id gerado aleatoriamente */

function getHero(id) {
    let url = BASE_URL + API_KEY + "/" + id;
    getJSON(url, function (status, data) {


        var hero1 = new Hero(data.name,
            data.powerstats.intelligence,
            data.powerstats.strength,
            data.powerstats.speed,
            data.powerstats.durability,
            data.powerstats.power,
            data.powerstats.combat,
            data.image.url)

        creatHeroCard(hero1, id);
    });
    /*função que cria o card do herói, enquanto a tela carrega cria o card na section "heroes", após o usuario selecionar seu herói ela passará a criar os cards na section "batalha". */
    function creatHeroCard(hero, idHero) {
        /*função que será concatenada ao HTML*/
        function htmlconstructor() {
            return `<article id="${idHero}">
                <img src="${hero.image}" onClick="keepHero(${idHero})"/> 
                <h1>"${hero.name}"</h1> 
                <p>Inteligência:</p> <div id="intelligence${idHero}" style='width:${hero.intelligence}%; background-color:#ff8059;'></div> 
                <p>Força:</p> <div style='width:${hero.strength}%; background-color:#452359'></div>
                <p>Velocidade:</p> <div style='width:${hero.speed}%; background-color:#25ff33'></div>
                <p>Resistência:</p> <div style='width:${hero.durability}%; background-color:#f267ff'></div>
                <p>Poder:</p> <div style='width:${hero.power}%; background-color:#504820'></div>
                <p>Combate:</p> <div style='width:${hero.combat}%; background-color:#ff1526'></div>
                </article>`
        }

        /*verifica se algum atributo é igual a null, se for, ele executa a função novamente até encontrar um heroi onde nenhum atributo é null*/
        if (hero.intelligence == "null" || hero.strength == "null" || hero.speed == "null" || hero.durability == "null" || hero.power == "null" || hero.combat == "null") {
            getHero(getRandom(1, 731));

        } else {

            if (document.getElementById("heroes")) {
                document.getElementById("heroes").innerHTML += htmlconstructor()
            } else {
                document.getElementById("batalha").innerHTML += htmlconstructor()

            }
        }
    }




}


window.onload = function () {
    for (let i = 0; i < 3; i++) {
        getHero(getRandom(1, 731));

    }

}

function getRandom(min, max) {

    var num = Math.floor(Math.random() * max) + min;
    return num;

}

/*funcão que apaga os heróis não selecionados e cria um id para o heroi desafiante*/
function keepHero(id) {
    if (document.getElementById("heroes")) {
        document.getElementById("heroes").remove();
    }


    idd2 = getRandom(1, 731);
    number = getdesafiante(idd2);

    function getdesafiante(id1) {
        var url = BASE_URL + API_KEY + "/" + id1;
        getJSON(url, function (status, data) {
            var desaf = new Desafiante(data.id, data.powerstats.intelligence);
            console.log(desaf);
            nullDesafiante(desaf)
        })

        function nullDesafiante(hero) {
            if (hero.intelligence == "null") {
                getdesafiante(getRandom(1, 731));
            } else {
                execbattle(id, id1);

                function execbattle(id, number) {
                    getHeroArray(id, number);
                }
            }
        }
    }


};



/*Função que cria os objetos da classe Hero, do usuario e do desafiante*/
function getHeroArray(id1, id2) {
    var url = BASE_URL + API_KEY + "/" + id1;
    getJSON(url, function (status, data) {
        var heroi1 = new Hero(data.name,
            data.powerstats.intelligence,
            data.powerstats.strength,
            data.powerstats.speed,
            data.powerstats.durability,
            data.powerstats.power,
            data.powerstats.combat,
            data.image.url);



        var url = BASE_URL + API_KEY + "/" + id2;
        getJSON(url, function (status, data) {
            var heroi2 = new Hero(data.name,
                data.powerstats.intelligence,
                data.powerstats.strength,
                data.powerstats.speed,
                data.powerstats.durability,
                data.powerstats.power,
                data.powerstats.combat,
                data.image.url);
            console.log(heroi2);

            creatHeroCard2(heroi1, id1, heroi2, id2);
        })
    })
}







/*Função que cria os cards do usuário e do desafiante */
function creatHeroCard2(heroA, idHeroA, heroB, idHeroB) {
    /*função que será concatenada ao HTML*/
    function htmlconstructor(heroo, idHero) {
        return `<article id="${idHero}">
                    <img src="${heroo.image}"/> 
                    <h1>"${heroo.name}"</h1> 
                    <p>Inteligência:</p> <div id="intelligence${idHero}" style='width:${heroo.intelligence}%; background-color:#ff8059;'></div> 
                    <p>Força:</p> <div style='width:${heroo.strength}%; background-color:#452359'></div>
                    <p>Velocidade:</p> <div style='width:${heroo.speed}%; background-color:#25ff33'></div>
                    <p>Resistência:</p> <div style='width:${heroo.durability}%; background-color:#f267ff'></div>
                    <p>Poder:</p> <div style='width:${heroo.power}%; background-color:#504820'></div>
                    <p>Combate:</p> <div style='width:${heroo.combat}%; background-color:#ff1526'></div>
                </article>`
    }
    document.getElementById("batalha").innerHTML += htmlconstructor(heroA, idHeroA);
    document.getElementById("batalha").innerHTML += htmlconstructor(heroB, idHeroB);
    duelo(heroA, heroB);



}
/*função que compara os cards*/
function duelo(herA, herB) {
    var h1 = 0;
    var h2 = 0;
    /*------------------------------------------------------------*/
    if (Number(herA.intelligence) == Number(herB.intelligence)) {
        h1+0;
    }
    else if (Number(herA.intelligence) > Number(herB.intelligence)) {
        h1++;
    } else {
        h2++;
    }
    console.log("intelligence h1=", herA.intelligence, " intelligence h2=", herB.intelligence, " placar:", h1, h2)
    /*------------------------------------------------------------*/
    if (Number(herA.strength) == Number(herB.strength)) {
        h1+0;
    }
    else if (Number(herA.strength) > Number(herB.strength)) {
        h1++;
    } else {
        h2++;
    }
    console.log("strength h1=", herA.strength, " strength h2=", herB.strength, " placar:", h1, h2)
    /*------------------------------------------------------------*/
    if (Number(herA.speed) == Number(herB.speed)) {
        h1+0;
    }
    else if (Number(herA.speed) > Number(herB.speed)) {
        h1++;
    } else {
        h2++
    }
    console.log("speed h1=", herA.speed, " speed h2=", herB.speed, " placar:", h1, h2)
    /*------------------------------------------------------------*/
    if (Number(herA.durability) == Number(herB.durability)) {
        h1+0;
    }
    else if (Number(herA.durability) > Number(herB.durability)) {
        h1++;
    } else {
        h2++
    }
    console.log("durability h1=", herA.durability, " durability h2=", herB.durability, " placar:", h1, h2)
    /*------------------------------------------------------------*/
    if (Number(herA.power) == Number(herB.power)) {
        h1+0;
    }
    else if (Number(herA.power) > Number(herB.power)) {
        h1++;
    } else {
        h2++
    }
    console.log("power h1=", herA.power, " power h2=", herB.power, " placar:", h1, h2)
    /*------------------------------------------------------------*/
    if (Number(herA.combat) == Number(herB.combat)) {
        h1+0;
    }
    else if (Number(herA.combat) > Number(herB.combat)) {
        h1++;
    } else {
        h2++
    }
    console.log("combat h1=", herA.combat, " combat h2=", herB.combat, " placar:", h1, h2)

    winner(h1, h2);
}



/*função que pega o resustado e printa quem foi o vencedor*/
function winner(player, desafiante) {
    if (player > desafiante) {
        console.log("win")

    } else if (player == desafiante) {

        console.log("draw")
    } else {

        console.log("lost")
    }
}

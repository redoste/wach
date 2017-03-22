//Deffinition des variable globale
var CHStatus = null;
var CHBackup = null;
var CHTESource = null;
var CHTEPointAcc = null;
var CHTEPointOld = null;
var CHTEPointOldColor = null;
var CHIESource = null;
var CHType = null;

//La version
const CHVER = "WACH_BETA_0.7";

//Fonction d'initialisation
//0 Parametre
//Pas de return
function CHInit(){
    CHStatus = 0;
    //Definis le satatus de WACH
    //0 -> Classique
    //1 -> En atente de œ
    //2 -> En atente de TextEdit
    //3 -> En atente de Image Edit
    
    CHType = CHGType()
    //Definis le type de jeu
    
    CHTEPointOld = document.body
    CHTEPointOldColor = document.body.style['background-color']
    //Definis les variable globale de l'aide au pointage de text edit
    
    CHPWait()
    //Cree le bloc d'attete en bas de page
    
    CHBackup = CHGAns()
    //Sauvegarde les reponse
    
    document.onkeydown = CHRKey
    document.onclick   = CHRClick
    document.onmousemove = CHRMove
    //Definis l'écoute des touche du document vers CHRKey
    //Definis l'écoute des clicks du document vers CHRClick
    //Definis l'écoute de déplacement du document ver CHRMove
}

//Lis une réponse
//1 Parametres
//id -> id de la réponse a lire
//return -> la reponse
function CHGAn(id, sid = 0){
    if (CHType == 0) return I[id][1][0][0]
    if (CHType == 1) return I[id][3][0][0]
    if (CHType == 2) return CHGStrTBool(I[id][3][sid][1])
    if (CHType == 3) return L[id][sid]
}

//Lis toute les réponse
//0 Parametre
//return -> un tableau de string -> chaque réponse
function CHGAns(){
    //tableau de sortie
    var ret = [];
    //Pour les Quizz et TAT
    if (CHType == 0 || CHType == 1){
        //Pour chaque réponse (Entrée dans I)
        for (var i=0; i<I.length; i++){
            //On utilise CHGAn et écris dans ret
            ret[i] = CHGAn(i);
        }
    }
    //Pour les QCM
    if (CHType == 2){
        //Pour chaque question
        for (var i=0; i < I.length; i++){
            //On fait le bloc que Question
            var QBloc = [];
            //On for les response
            for (var j=0; j < I[i][3].length; j++){
                QBloc[j] = CHGAn(i, j);
            }
            //on save
            ret[i] = QBloc;
        }
    }
    //Pour les MotsCroisé
    if (CHType == 3){
        //On s'embete Pas!
        //ret = L;
        //Non! Réecriture complete pour eviter le LINK
        for (var i = 0; i<L.length; i++){
            ret[i] = []
            for(var j = 0; j<L[i].length; j++){
                ret[i][j] = L[i][j]
            }
        }
    }
    return ret;
}

//Affiche un message avec toute les réponse
//0 Parametre
//return -> un Div du contenu de la fenetre affichié
function CHPAns(){
    //On récupere les réponse dans un tableau
    var ans = CHGAns();
    
    //Creé un DIV id=CHPAns_div qui contiendra le tout
    var mainDiv = document.createElement('div');
    mainDiv.id = 'CHPAns_div';
    
    //En QCM on ajoute un texte d'aide
    if (CHType == 2){
        mainDiv.appendChild(document.createTextNode('true -> vrai false -> faux'))
        mainDiv.appendChild(document.createElement('br'))
    }
    
    var boucle = true
    
    //En mot croisé on utilise la fonction spétiale
    if (CHType == 3){
        mainDiv.appendChild(CHPAnsMC(ans));
        boucle = false;
    }
    
    //Pour chaque réponse
    if (boucle) {for (var i=0; i<ans.length; i++){
        //On affiche le numéro de la réponse
        mainDiv.appendChild(document.createTextNode('Rep N'))
        mainDiv.appendChild(document.createTextNode(i))
        mainDiv.appendChild(document.createTextNode(': '))
        //Si on est dans un quizz ou un QCM on affiche la question
        if (CHType == 1 || CHType == 2) mainDiv.innerHTML += "<button onClick=\"alert('"+html_encode(CHGQuizQuestion(i))+"')\">Q</button>"
        //Et son contenu
        //En mode Quizz / TAT
        if (CHType == 1 || CHType == 0) mainDiv.appendChild(document.createTextNode(ans[i]))
        //QCM
        if (CHType == 2){
            for (var j = 0; j < ans[i].length; j++){
                mainDiv.appendChild(document.createTextNode(ans[i][j] + " "))
            }
        }
        //+ A la ligne
        mainDiv.appendChild(document.createElement('br'))
    }}
    
    //On affiche le tout avec ShowMessage de la library de WebAllemend
    ShowMessage(mainDiv.innerHTML)
    
    return mainDiv
}

//Lis la touche appuyer
//1 Parametre
//e -> objet event fournis par le navigateur
function CHRKey(e){
    //Le œ en mode Classique
    if (e.keyCode == 0 && CHStatus == 0){
        //On passe en mode wait + affiche le message de wait
        CHStatus = 1;
        document.getElementById('CHPWait').style = 'display: inline'
    }
    //Le S en mode Wait
    if (e.keyCode == 83 && CHStatus == 1){
        //On passe en mode classique + suprime le message de wait
        CHStatus = 0;
        document.getElementById('CHPWait').style = 'display: none'
        
        //Et on affiche les réponse
        CHPAns()
    }
    //Le E en mode Wait
    if (e.keyCode == 69 && CHStatus == 1){
        //On passe en mode classique + suprime le message de wait
        CHStatus = 0;
        document.getElementById('CHPWait').style = 'display: none'
        
        //Et on affiche le formulaire
        CHPEditForm()
    }
    //Le T en mode Wait
    if (e.keyCode == 84 && CHStatus == 1){
        //On passe en mode Text edit + suprime le message de wait
        CHStatus = 2;
        document.getElementById('CHPWait').style = 'display: none'
    }
    //Le I en mode Wait
    if (e.keyCode == 73 && CHStatus == 1){
        //On passe en mode Image Wait
        CHStatus = 3;
        //On masque le message de wait
        document.getElementById('CHPWait').style = 'display: none'
        //Et on met le message de Image Edit Wait
        document.getElementById('CHPWaitIe').style = 'display: inline'
    }
}

//Crée le bloc du message de wait
//0 Parametre
function CHPWait(){
    //On ecrit notreCHType String
    var TStr = "ERROR CHType not valid";
    if (CHType == 1) var TStr = "Quizz";
    if (CHType == 0) var TStr = "Texte a trous";
    if (CHType == 2) var TStr = "QCM";
    if (CHType == 3) var TStr = "Mots Croise";
    
    //On cree notre DIV id=CHPWait
    var mainDiv = document.createElement('div');
    mainDiv.id = 'CHPWait'
    
    //On ne l'affiche pas
    mainDiv.style = 'display: none'
    
    //Et on entre notre texte
    mainDiv.appendChild(document.createTextNode('Attend Touche œ / VERSION: ' + CHVER + ' / ' + TStr))
    
    //On merge le tout a la fin du body
    document.body.appendChild(mainDiv)
    
    //La meme chause avec le Image Edit Wait Text
    var ieDiv = document.createElement('div');
    ieDiv.id = 'CHPWaitIe'
    ieDiv.style = 'display: none'
    ieDiv.appendChild(document.createTextNode('Attend Image Edit / VERSION: ' + CHVER + ' / ' + TStr))
    document.body.appendChild(ieDiv)
}

//Sauvegarde les nouvelle réponse dans I
//1 Parametre
//NAns -> Tableau de string -> Chaque réponse
function CHPEditSave(NAns){
    //En mode TAT
    if (CHType == 0){
        //Pour chaque entrée de NAns
        for (var i=0; i<NAns.length; i++){
            //On s'écrit dans I
            I[i][1][0][0] = NAns[i]
        }
    }if (CHType == 1){
            //Pour chaque entrée de NAns
        for (var i=0; i<NAns.length; i++){
            //On s'écrit dans I
            I[i][3][0][0] = NAns[i]
        }
    }if (CHType == 2){
        //Pour chaque question
        for (var i=0; i<NAns.length; i++){
            //On parse
            var parsed = CHGParseBool(NAns[i]);
            //Pour chaque reponse
            for (var j=0; j<I[i][3].length; j++){
                //Vrai
                if(parsed[j]){
                    //On met les cofig de calcul
                    I[i][3][j][2] = 1;
                    I[i][3][j][3] = 100;
                    I[i][3][j][4] = 1;
                    //Et de texte
                    I[i][3][j][1] = DefaultRight;
                }//faux
                else{
                    //On met les cofig de calcul
                    I[i][3][j][2] = 0;
                    I[i][3][j][3] = 0;
                    I[i][3][j][4] = 1;
                    //Et de texte
                    I[i][3][j][1] = DefaultWrong;
                }
            }
        }
    }if(CHType == 3){
        //Pour les MC
        //Pour chaque ligne
        for (var i=0; i<NAns.length; i++){
            //Pour chaque collone
            for (var j=0; j<NAns[i].length; j++){
                //On Save
                L[i][j] = NAns[i][j]
            }
        }
    }
}

//Affiche le formulaire d'édition de Réponse
//0 Parametre
//return -> Un div du contenu de la fenetre affiché
function CHPEditForm(){
    //On crée notre DIV id=CHPEditForm
    var mainDiv = document.createElement('div')
    mainDiv.id = 'CHPEditForm'
    
    //On récupère les question
    var ans = CHGAns()
    
    //En MC
    if (CHType == 3){
        //On affiche le formulaire en bas de page
        document.body.innerHTML += CHPEditMC(ans).outerHTML
        //Et on met une fenetre d'avertissement
        ShowMessage("Pour Manque de place l'edition se fait en bas de page")
        //Et voila!
        return null;
    }
    
    //Pour chaque question
    for (var i = 0; i < ans.length; i++){
        //On marque l'ancienne réponse
        mainDiv.appendChild(document.createTextNode(ans[i] + "->"))
        
        //Si on est dans un quizz / QCM on met la question
        if (CHType == 1 || CHType == 2) mainDiv.innerHTML += "<button onClick=\"alert('"+html_encode(CHGQuizQuestion(i))+"')\">Q</button>"
        
        //On met le champ de texte avec value=L'anciienne réponse et ID=CHPEditForm_Q + l'id de la question
        mainDiv.innerHTML += '<input type="text" value="' + ans[i] + '" id="CHPEditForm_Q'+ i +'"\>'
        
        //On ajoute un boutton de reset -> CHPEditReset avec en Parametre l'id de la question actuelle
        mainDiv.innerHTML += '<button onClick="CHPEditReset(' + i + ')">R</button>'
        
        //Et on saute la ligne
        mainDiv.appendChild(document.createElement('br'))
    }
    
    //On fait un boutton de SAVE
    //Fait un CHPEditSave de CHPEditGet
    //+Ferme la fenetre avec HideFeedback de la library de web allemend
    mainDiv.innerHTML += '<button onclick="CHPEditSave(CHPEditGet()); HideFeedback()">SAVE</button>'
    
    //Affiche le message avec la library de web allemend
    ShowMessage(mainDiv.innerHTML)
    
    return mainDiv
}

//Récupère les réponse d'un CHPEditForm
//0 Parametre
//return -> array de string -> reponse
function CHPEditGet(){
    //Tableau de sortie
    var ret = []
    
    //Pour les MC
    if(CHType == 3){
        //Pour chaque ligne (d'après L)
        for (var i=0; i<L.length; i++){
            //Pour chaque collone
            ret[i] = []
            for (var j=0; j<L[i].length; j++){
                //On recupere le text
                ret[i][j] = document.getElementById("CHPEditMCQ_" + i + "_" + j).value
            }
    }
    }else{
        //Pour chaque réponse (d'après le length de I)
        for (var i=0; i<I.length; i++){
            //On récupère la value de CHPEditForm_Q + i et le stoque dans ret[i]
            ret[i] = document.getElementById("CHPEditForm_Q" + i).value
        }
    }
    
    return ret
}

//Réinitialise les réponse d'un champs d'un CHPEditForm
//1 Parametre
//id -> l'id de la réponse a reset
function CHPEditReset(id){
    //Dans un MC
    if (CHType == 3){
        //Pour chaque collone de la ligne
        for (var i = 0; i<L[id].length; i++){
            //On reset la cellule
            document.getElementById("CHPEditMCQ_"+id+"_"+i).value = CHBackup[id][i]
        }
    }else{
        //On récupère dans le CHBackup à l'id et on stoque dans la value de CHPEditForm_Q + id
        document.getElementById("CHPEditForm_Q" + id).value = CHBackup[id]

    }
}

//Quand la souris Clique
//1 parametre
//e -> Objet d'event du navigateur
function CHRClick(e){
    //Si le mode de Text Edit est actié
    if (CHStatus == 2){
        //On Ouvrre le formulaire de TextEdit
        CHPTeForm(e.target)
        //Et on passe en mode classique
        CHStatus = 0;
    }
    //Si le mode Image Edit est activé
    if (CHStatus == 3){
        //On ouvre le formulaire de ImageEdit
        CHPIeForm(e.target)
        //Et on passe en mode classique
        CHStatus = 0;
        //Et on retire le le message de wait
        document.getElementById('CHPWaitIe').style = 'display: none'
        
    }
}

//Ouvre le formulaire de textedit
//1 Parametre
//source -> la ou l'utilisateur a clique
//return -> le div de base du form
function CHPTeForm(source){
    //On sauvegarde la source
    CHTESource = source;
    
    //On cree notre div de base id=CHPTeForm
    var div = document.createElement('div')
    div.id = "CHPTeForm"
    
    //Pour chaque enfant
    for (var i=0; i<source.childNodes.length; i++){
        //Si c'est du texte
        if (source.childNodes[i].nodeName == "#text"){
            //On ajoute une entrée pour lui du formulaire
            //Un Input de type text
            var txtIn = document.createElement('input')
            txtIn.setAttribute('type', 'text')
            
            //Avec en id CHPTeForm_I + i
            txtIn.setAttribute('id', 'CHPTeForm_I' + i)
            
            //Et en pré value le texte de base
            txtIn.setAttribute('value', source.childNodes[i].textContent)
            
            //On merge
            div.appendChild(txtIn)
            
            //+ saut de ligne
            div.appendChild(document.createElement('br'))
        }
    }
    
    //On ajoute le boutton de save
    var btn = document.createElement('button')
    btn.innerText = "SAVE"
    //Au click on Savegarde avec le contenu du form, on vide la source de backup,
    //et on simule la fermeture du form avec HideFeedback de l'API de WA
    btn.setAttribute('onclick', "CHPTeSave(CHPTeGet()); CHTESource = null; HideFeedback()")
    
    //Merge
    div.appendChild(btn)
    
    //On affiche le tout avec ShowMessage de l'api de WA
    ShowMessage(div.innerHTML)
    
    return div;
    
}

//Recupere les entrée de CHPTeForm
//0 Parametre
//return -> Tableau -> [ID, TEXT, ID, TEXT]
function CHPTeGet(){
    //Variable de sortie
    var ret = [];
    
    //Pour chaque enfant de la source
    for (var i=0; i<CHTESource.childNodes.length; i++){
        //On regarde si un champ pour lui existe
        if (document.getElementById('CHPTeForm_I' + i) != undefined){
            //On save tout
            ret[ret.length] = i;
            ret[ret.length] = document.getElementById('CHPTeForm_I' + i).value;
        }
    }
    
    return ret;
}

//Sauvegarde les entree de CHPTeForm
//1 Parametre
//entry -> Tableau -> [ID, TEXT, ID, TEXT]
function CHPTeSave(entry){
    //Pour chaque entrée Paire (les id)
    for (var i=0; i < entry.length; i = i + 2){
        //On stoque le tout dans la source
        CHTESource.childNodes[entry[i]].textContent = entry[i+1]
    }
}

//Lis le movement de la souris
//1 Parametre
//e -> objet event envoyer par le navigateur
function CHRMove(e){
    //Si le mode Text Edit est activé on met un repère de pointage
    if(CHStatus == 2){
        //Definis en tant que actuelle le pointé
        CHTEPointAcc = e.target;
        
        //On restaure la couleur de l'ancien
        CHTEPointOld.style["background-color"] = CHTEPointOldColor
        
        //Met l'actuelle en ancien et backup sa couleur
        CHTEPointOld = CHTEPointAcc;
        CHTEPointOldColor = CHTEPointAcc.style["background-color"]
        
        //On finit par le metre en gris
        CHTEPointAcc.style["background-color"] = "grey"
    }
    //Si le mode Text Edit est déactivée et que Old n'est pas égale a sa variable offciele
    else if(CHStatus != 2 && CHTEPointOld != document.body){
        //On restaure la couleur de l'ancien
        CHTEPointOld.style["background-color"] = CHTEPointOldColor
        
        //Et on reinit toute les variable
        CHTEPointOld = document.body
        CHTEPointOldColor = document.body.style['background-color']
        CHTEPointAcc = null;
    }
}

//Detecte le type de jeu
//0 parametre
//return -> le type de jeu
//  0 -> Texte a trous
//  1 -> Quiz
//  2 -> QCM
//  3 -> Mot Croisé
function CHGType(){
    if (typeof L === 'undefined'){
        if (typeof I[0][1] == "string"){
            if(I[0][3].length == 1) return 1
            else return 2
        }else{
            return 0
        }
    }else return 3
}

//Recupere la question d'un quizz a partir de l'id (Aussi le QCM en fait...)
//1 parametre
//return -> la question
//id -> id de la question
function CHGQuizQuestion(id){
    if (CHType == 1 || CHType == 2) return document.getElementById("Q_"+id).children[0].innerText
}

//Ouvre le formulaire d'edition d'image
//1 Parametre
//source -> l'image de base
//return -> le div de base du form
function CHPIeForm(source){
    //On sauvegarde la source
    CHIESource = source;
    
    //DIv de base
    var maindiv = document.createElement('div');
    maindiv.id = "CHPIeForm"
    
    //Texte label de URL
    maindiv.appendChild(document.createTextNode('URL: '))
    
    //champ de l'url
    var urlZone = document.createElement('input')
    urlZone.setAttribute('type', 'text')
    //ID CHPIeForm_url VALUE l'ancienne SRC
    urlZone.setAttribute('id', 'CHPIeForm_url')
    urlZone.setAttribute('value', source.src);
    //MERGE
    maindiv.appendChild(urlZone);
    
    maindiv.appendChild(document.createElement('br'));
    
    //Boutton de sauvegarde
    var btnSav = document.createElement('button')
    btnSav.appendChild(document.createTextNode("SAVE"))
    //On savegarde et utilise HideFeedback de l'api de WabAllemend
    btnSav.setAttribute('onClick', 'CHPIeSave();HideFeedback()')
    maindiv.appendChild(btnSav)
    
    maindiv.appendChild(document.createElement('br'));
    maindiv.appendChild(document.createElement('br'));
    
    //Label du champ Google
    maindiv.appendChild(document.createTextNode('GOOGLE: '))
    
    //Champ Google
    var gooZone = document.createElement('input')
    gooZone.setAttribute('type', 'text')
    //ID CHPIeForm_google
    gooZone.setAttribute('id', 'CHPIeForm_google')
    maindiv.appendChild(gooZone);
    
    maindiv.appendChild(document.createElement('br'));
    
    //BOutton de recherche
    var btnGoo = document.createElement('button')
    btnGoo.appendChild(document.createTextNode("RECHERCHER"))
    //On lance une recherche depuis le champ
    btnGoo.setAttribute('onClick', 'CHGISearch(document.getElementById("CHPIeForm_google").value)')
    maindiv.appendChild(btnGoo)
    
    maindiv.appendChild(document.createElement('br'));
    maindiv.appendChild(document.createElement('br'));
    //Texte d'aide
    maindiv.appendChild(document.createTextNode('Pour utliser google: faites la recherche <CLIC DROIT / Copier L\'addresse de l\'image> et coller dans URL'))
    
    //On affiche le tout avec l'api de Web Allemend
    ShowMessage(maindiv.innerHTML)
    return maindiv;
}

//Recherche sur google images
//1 parametre
//src -> le terme a rechercher
function CHGISearch(src){
    window.open("https://www.google.fr/search?safe=active&tbm=isch&q=" + encodeURIComponent(src));
}

//Sauvgarde les info de CHPIeForm
//0 Parametre
function CHPIeSave(){
    CHIESource.src = document.getElementById("CHPIeForm_url").value;
}

//Return true si c'est le texte d'une réponse juste
//return -> true juste
//       -> false faut
function CHGStrTBool(string){
    if (string == DefaultRight) return true
    else return false
}

//Parse de l'html <source http://codes-sources.commentcamarche.net/source/54146-parser-les-caracteres-html-d-une-string >
//Mrc a eux!
function html_encode(txt) {
    var reg = /^[\w-\/()\[\]?!*%:;.,'\s]+$/i;
    var s = "";
    var l = txt.length;
    for (var i = 0; i < l; i++) {
        var tn = txt[i];
        //EDIT Ajout du '
        if (tn == "'"){
            s+= "\\'"
        }
        else if (!reg.test(tn)) {
            s += "&#" + tn.charCodeAt(0) + ";";
        } else {
            s += tn;
        }
    }
    return s;
}

//Parse du texte de l'edit mode QCM en aurray
//1 Parametre
// inp -> string d'entree
// return -> tabbleau de bool
function CHGParseBool (inp){
    //Retour et split par ,
    var ret = []
    var splited = inp.split(',')
    
    //on for
    for (var i=0; i<splited.length; i++){
        if (splited[i] == "true") ret[i] = true;
        if (splited[i] == "false") ret[i] = false;
    }
    return ret
}

//Affiche les reponse pour les MC
//1 parametre -> ans tableu de reponse
//return -> DOM Table
function CHPAnsMC(ans){
    var table = document.createElement('table');
    //Pour chaque ligne
    for (var i=0; i<ans.length; i++){
        ///On cree la ligne
        var tr = document.createElement('tr');
        //Pour chaque collone
        for (var j=0; j<ans[i].length; j++){
            //On cree la colone
            var td = document.createElement('td')
            //On met le texte
            td.innerText = ans[i][j]
            //On merge
            tr.appendChild(td);
        }
        //On merge
        table.appendChild(tr)
    }
    return table;
}

//Affchie le formulaire d'édition pour les MC
//1 parametre -> ans tableau
//return -> DOM Table
function CHPEditMC(ans){
    var table = document.createElement('table');
    table.id = "CHPEditMC_TABLE"
    //On fait la ligne du boutton SAVE
    var tr = document.createElement('tr')
    var td = document.createElement('td')
    var btn = document.createElement('button')
    btn.innerText = 'SAVE'
    btn.setAttribute('onClick', "CHPEditSave(CHPEditGet());document.getElementById('CHPEditMC_TABLE').remove()");
    //Merge
    td.appendChild(btn)
    td.setAttribute('colspan', ans[0].length)
    tr.appendChild(td)
    table.appendChild(tr)
    //Pour chaque ligne
    for (var i=0; i<ans.length; i++){
        ///On cree la ligne
        var tr = document.createElement('tr');
        //Pour chaque collone
        for (var j=0; j<ans[i].length; j++){
            //On cree la colone
            var td = document.createElement('td')
            //On cree le champ de texte
            var input = document.createElement('input')
            input.setAttribute('type', 'text')
            //On met le texte
            input.setAttribute('value', ans[i][j])
            //On retrecit les Input
            input.style['width'] = '10px'
            //on lui met un id
            input.id = "CHPEditMCQ_" + i + "_" + j;
            //On merge
            td.appendChild(input);
            tr.appendChild(td);
        }
        //On met un boutton RESET
        var td = document.createElement('td')
        var btn = document.createElement("button")
        btn .innerText = "R"
        //+ le onClick
        btn.setAttribute('onClick', "CHPEditReset(" + i + ")");
        td.appendChild(btn)
        tr.appendChild(td)
        //On merge
        table.appendChild(tr)
    }
    return table;
}

//INIT
CHInit()

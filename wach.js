//Deffinition des variable globale
var CHStatus = null;
var CHBackup = null;

//Fonction d'initialisation
//0 Parametre
//Pas de return
function CHInit(){
    CHStatus = 0;
    //Definis le satatus de WACH
    //0 -> Classique
    //1 -> En atente de œ
    
    CHPWait()
    //Cree le bloc d'attete en bas de page
    
    CHBackup = CHGAns()
    //Sauvegarde les reponse
    
    document.onkeydown = CHRKey
    //Definis l'écoute des touche du document vers CHRKey
}

//Lis une réponse
//1 Parametres
//id -> id de la réponse a lire
//return -> la reponse
function CHGAn(id){
    return I[id][1][0][0]
}

//Lis toute les réponse
//0 Parametre
//return -> un tableau de string -> chaque réponse
function CHGAns(){
    //tableau de sortie
    var ret = [];
    //Pour chaque réponse (Entrée dans I)
    for (var i=0; i<I.length; i++){
        //On utilise CHGAn et écris dans ret
        ret[i] = CHGAn(i);
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
    
    //Pour chaque réponse
    for (var i=0; i<ans.length; i++){
        //On affiche le numéro de la réponse
        mainDiv.appendChild(document.createTextNode('Rep N'))
        mainDiv.appendChild(document.createTextNode(i))
        mainDiv.appendChild(document.createTextNode(': '))
        //Et son contenu
        mainDiv.appendChild(document.createTextNode(ans[i]))
        //+ A la ligne
        mainDiv.appendChild(document.createElement('br'))
    }
    
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
}

//Crée le bloc du message de wait
//0 Parametre
function CHPWait(){
    //On cree notre DIV id=CHPWait
    var mainDiv = document.createElement('div');
    mainDiv.id = 'CHPWait'
    
    //On ne l'affiche pas
    mainDiv.style = 'display: none'
    
    //Et on entre notre texte
    mainDiv.appendChild(document.createTextNode('Attend Touche œ'))
    
    //On merge le tout a la fin du body
    document.body.appendChild(mainDiv)
}

//Sauvegarde les nouvelle réponse dans I
//1 Parametre
//NAns -> Tableau de string -> Chaque réponse
function CHPEditSave(NAns){
    //Pour chaque entrée de NAns
    for (var i=0; i<NAns.length; i++){
        //On s'écrit dans I
        I[i][1][0][0] = NAns[i]
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
    
    //Pour chaque question
    for (var i = 0; i < ans.length; i++){
        //On marque l'ancienne réponse
        mainDiv.appendChild(document.createTextNode(ans[i] + "->"))
        
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
    
    //Pour chaque réponse (d'après le length de I)
    for (var i=0; i<I.length; i++){
        //On récupère la value de CHPEditForm_Q + i et le stoque dans ret[i]
        ret[i] = document.getElementById("CHPEditForm_Q" + i).value
    }
    
    return ret
}

//Réinitialise les réponse d'un champs d'un CHPEditForm
//1 Parametre
//id -> l'id de la réponse a reset
function CHPEditReset(id){
    //On récupère dans le CHBackup à l'id et on stoque dans la value de CHPEditForm_Q + id
    document.getElementById("CHPEditForm_Q" + id).value = CHBackup[id]
}

//INIT
CHInit()

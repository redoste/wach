/*============================================================================
           _____   ____   _____ _
          |  __ \ / __ \ / ____| |
  _ __ ___| |  | | |  | | (___ | |_ ___
 | '__/ _ \ |  | | |  | |\___ \| __/ _ \
 | | |  __/ |__| | |__| |____) | ||  __/
 |_|  \___|_____/ \____/|_____/ \__\___|

===============================================================================
WACH WebAllemendCHeat: a cheat tool for WebAllemend
  -> http://redoste.fr.nf                       WEBSITE
  -> http://redoste.byethost7.com/0ch/wa        Offcial Program page
  -> http://steph.raymond.free.fr/              WebAllemend
  -> https://www.gnu.org/licenses/gpl-3.0.txt   Liscence

Copyright (C) 2017 reDOSte

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
*/

//=====Si il n'y a pas déjà WACH=====
if (typeof WACHInstance === 'undefined'){

//=====Init de départ=====
var WACHInstance, WACHUtil = null;

//=====CONSTANCE=====

//Welcome Texte
const welcomeText=decodeURIComponent("%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%0A%20%20%20%20%20%20%20%20%20%20%20_____%20%20%20____%20%20%20_____%20_%0A%20%20%20%20%20%20%20%20%20%20%7C%20%20__%20%5C%20%2F%20__%20%5C%20%2F%20____%7C%20%7C%0A%20%20_%20__%20___%7C%20%7C%20%20%7C%20%7C%20%7C%20%20%7C%20%7C%20(___%20%7C%20%7C_%20___%0A%20%7C%20%27__%2F%20_%20%5C%20%7C%20%20%7C%20%7C%20%7C%20%20%7C%20%7C%5C___%20%5C%7C%20__%2F%20_%20%5C%0A%20%7C%20%7C%20%7C%20%20__%2F%20%7C__%7C%20%7C%20%7C__%7C%20%7C____)%20%7C%20%7C%7C%20%20__%2F%0A%20%7C_%7C%20%20%5C___%7C_____%2F%20%5C____%2F%7C_____%2F%20%5C__%5C___%7C%0A%0A%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%0AWACH%20WebAllemendCHeat%3A%20a%20cheat%20tool%20for%20WebAllemend%0A%20%20-%3E%20http%3A%2F%2Fredoste.fr.nf%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20WEBSITE%0A%20%20-%3E%20http%3A%2F%2Fredoste.byethost7.com%2F0ch%2Fwa%20%20%20%20%20%20%20%20Offcial%20Program%20page%0A%20%20-%3E%20http%3A%2F%2Fsteph.raymond.free.fr%2F%20%20%20%20%20%20%20%20%20%20%20%20%20%20WebAllemend%0A%20%20-%3E%20https%3A%2F%2Fwww.gnu.org%2Flicenses%2Fgpl-3.0.txt%20%20%20Liscence%0A%0ACopyright%20(C)%202017%20reDOSte%0A%0AThis%20program%20is%20free%20software%3B%20you%20can%20redistribute%20it%20and%2For%0Amodify%20it%20under%20the%20terms%20of%20the%20GNU%20General%20Public%20License%0Aas%20published%20by%20the%20Free%20Software%20Foundation%3B%20either%20version%202%0Aof%20the%20License%2C%20or%20(at%20your%20option)%20any%20later%20version.%0A%0AThis%20program%20is%20distributed%20in%20the%20hope%20that%20it%20will%20be%20useful%2C%0Abut%20WITHOUT%20ANY%20WARRANTY%3B%20without%20even%20the%20implied%20warranty%20of%0AMERCHANTABILITY%20or%20FITNESS%20FOR%20A%20PARTICULAR%20PURPOSE.%20%20See%20the%0AGNU%20General%20Public%20License%20for%20more%20details.%0A%0AYou%20should%20have%20received%20a%20copy%20of%20the%20GNU%20General%20Public%20License%0Aalong%20with%20this%20program%3B%20if%20not%2C%20write%20to%20the%20Free%20Software%0AFoundation%2C%20Inc.%2C%2051%20Franklin%20Street%2C%20Fifth%20Floor%2C%20Boston%2C%20MA%20%2002110-1301%2C%20USA.");

//Version de WACH
const WACH_VERSION = "WACH_STABLE_1.0";

//Type de jeu
const TYPE_TAT = 0; 	//Texte a trous
const TYPE_QUIZ = 1;	//Quiz
const TYPE_QCM = 2;		//QCM
const TYPE_MC = 3;		//Mot croisé

//status
const STATUS_N = 0;					//Normal
const STATUS_WAIT = 1;			//Attente de œ
const STATUS_TE_WAIT = 2;		//Attente de Text edit
const STATUS_IE_WAIT = 3;		//Attente de Image Edit

//=====FIN CONSTANCE=====

//=====CLASSE: WACH Object=====
//Classe principale

//Constructeur
function WACH(){
		//Attribut
		//Statut
		this.status = null;
		//Type de jeu
		this.gameType = -1;
		//Objet a la'aide au pointage
		this.point = null;
		//Backup des reponses
		this.backup = null;

		//initialisation du type
		this.GetType();
		//Creation du status
		this.status = new WACHStatus(this.GetType());
		//Init des event
		this.event = new WACHEvent();
		//Init des fenetre
		this.windows = new WACHWindows();
}

//Methode

/*GetType: retourne le type ou le definis si celui ci est a -1
	@return=(int) type
*/
WACH.prototype.GetType = function(){
	//Si le type est déja défini
	if (this.gameType != -1)
		return this.gameType;

	//Sinon:
	//Detection des type
	if (typeof L === 'undefined'){
			if (typeof I[0][1] == "string"){
					if(I[0][3].length == 1)
						return this.gameType = TYPE_QUIZ
					else
						return this.gameType = TYPE_QCM
			}else{
					return this.gameType = TYPE_TAT
			}
	}
	else
		return this.gameType = TYPE_MC
}

/*GetAwnser: retourne la reponse a partir de l'id (ou l'id + le sub-id)
	@settings(id)=(int) id de la reponse
	@settings(sid)=(int) sub-id de la reponse
	@return=(string) la reponse
*/
WACH.prototype.GetAwnser = function (id, sid=0) {
	if (this.gameType == TYPE_TAT) return I[id][1][0][0]
	if (this.gameType == TYPE_QUIZ) return I[id][3][0][0]
	if (this.gameType == TYPE_QCM)
	  return WACHUtil.awnserParseBool(I[id][3][sid][1])
	if (this.gameType == TYPE_MC) return L[id][sid]
};

/*GetQuestion: retourne la question pour les type a question
	@settings(id)=(int) ID de la question
	@return=(string) question
*/
WACH.prototype.GetQuestion = function (id) {
	//Check du type
	if(this.GetType() == TYPE_QUIZ || this.GetType() == TYPE_QCM)
		return document.getElementById("Q_" + id).children[0].innerText
	return "WACH::GetQuestion(Wrong Type Call)";
};

/*GetAwnserLabel: retourne le contenu de la réponse pour les QCM
	@settings(id)=(int) Id de la question
	@settings(sid)=(int) SId de la question
	@return=(string)Contenu de la réponse
*/
WACH.prototype.GetAwnserLabel = function (id, sid) {
	//return I[id][3][sid][0];
	//On prefere la methode a recuperer dans l'HTML pour si l'utilisateur a modifier
	//le libélé via TextEdit

	//On prend l'élément suivant le boutton pour ne pas avoir le ? du boutton
	return document.getElementById("Q_" + id + "_" + sid + "_Btn").nextSibling.textContent
};

/*EditAwnser: modifie une reponse
	@settings(id)=(int) id de la reponse
	@settings(ans)=(string) reponse
	@settings(sid)=(int) sid de la reponse
*/
WACH.prototype.EditAwnser = function (id, ans, sid = 0) {
	if(this.GetType() == TYPE_TAT)	I[id][1][0][0] = ans;
	if(this.GetType() == TYPE_QUIZ)	I[id][3][0][0] = ans;
	if(this.GetType() == TYPE_QCM){
		//Vrai
		if(ans){
			//Config
			I[id][3][sid][2] = 1;
			I[id][3][sid][3] = 100;
			I[id][3][sid][4] = 1;
			I[id][3][sid][1] = DefaultRight;
		}
		//Faux
		else{
			//Config
			I[id][3][sid][2] = 0;
			I[id][3][sid][3] = 0;
			I[id][3][sid][4] = 1;
			I[id][3][sid][1] = DefaultWrong;
		}
	}
	if(this.GetType() == TYPE_MC){
		L[id][sid] = ans
	}

};

/*EditAllAwnsers: modifie toute les reponse
	@settings(nans)=(array 1D :: string) reponse
	@return=(void)
*/
WACH.prototype.EditAllAwnsers = function (NAns) {
	//Pour les types TAT et Quizz
	if(this.GetType() == TYPE_TAT || this.GetType() == TYPE_QUIZ){
		//On for et EditAwnser
		for (var i = 0; i < NAns.length; i++)
			this.EditAwnser(i, NAns[i]);
	}
	else if (this.GetType() == TYPE_QCM){
		//QCM
		//On for
		for (var i = 0; i < NAns.length; i++){
			//On parse
			var parsed = WACHUtil.stringListToBoolList(NAns[i]);
			//Re for
			for (var j = 0; j < parsed.length; j++)
				this.EditAwnser(i, parsed[j], j)
		}
	}
	else if (this.GetType() == TYPE_MC){
		//MC
		//DOuble for
		for (var i = 0; i < NAns.length; i++){
			for (var j = 0; j < NAns[i].length; j++)
				this.EditAwnser(i, NAns[i][j], j);
		}
	}

};

/*GetAllAwnsers: retourne toute les reponse dans un tableau
	@return=(array 1D :: string) reponse
	OR
	@return=(array 2D :: string) reponse
*/
WACH.prototype.GetAllAwnsers = function () {
		//Tableu de sortie
		var retour = [];

		//Pour les TAT
		var tatmethod = function(){
				//Pour chaque entree de I
				for (var i = 0; i<I.length; i++)
					retour[i] = WACHInstance.GetAwnser(i);
				return retour;
		}

		//Pour les Quizz
		var quizzmethod = tatmethod;

		//Pour les QCM
		var qcmmethod = function(){
				//Pour chaque question
				for (var i = 0; i < I.length; i++){
					//Tableu 2D
					var QBloc = [];
					for (var j = 0; j < I[i][3].length; j++)
						QBloc[j] = WACHInstance.GetAwnser(i, j);
					retour[i] = QBloc
				}
				return retour;
		}

		//Pour les MC
		var mcmethod = function(){
				//Clone de L
				for (var i = 0; i<L.length; i++){
					retour[i] = [];
					for (var j = 0; j<L[i].length; j++)
						retour[i][j] = L[i][j]
				}
				return retour
		}

		//execution
		switch (this.GetType()) {
			case TYPE_TAT:
				return tatmethod();
				break;
			case TYPE_QUIZ:
				return quizzmethod();
				break;
			case TYPE_QCM:
				return qcmmethod();
				break;
			case TYPE_MC:
				return mcmethod();
				break;
			default:
				alert("WACH::ERROR::WACHInstance.GetAllAwnsers (INVALID TYPE)");
				return retour;
		}
};

//=====FIN CLASSE=====

//=====CLASSE STATUS=====
//Classe du status de WACH

//Constrcuteur
function WACHStatus(newGameType){
		//Definis le status à zero
		this.status = STATUS_N;
		//Definis le game type
		this.gameType = newGameType;
		//Definis le WAIT block
		this.waitBlock = null;
		//Et initialize le status texte
		this.CreateBlock();
}

//Méthode

/*GetStatus: retourne le status
	@return=(int) status
*/
WACHStatus.prototype.GetStatus = function(){
		return this.status;
}

/*CreateBlock: Cree le bloc d'attente de status
	@return=(void)
*/
WACHStatus.prototype.CreateBlock = function () {

	//Le type de jeu
	var TStr = "ERROR wach.gameType not valid";
  if (this.gameType == TYPE_QUIZ) var TStr = "Quizz";
  if (this.gameType == TYPE_TAT) var TStr = "Texte a trous";
  if (this.gameType == TYPE_QCM) var TStr = "QCM";
  if (this.gameType == TYPE_MC) var TStr = "Mots Croise";

	//Le div
	var divBlock = document.createElement('div');
	divBlock.id = 'wach_status.CreateBlock'

	//Pas affiché
	divBlock.style.display = 'none';

	//Texte
	divBlock.appendChild(
		document.createTextNode("Attend touche œ / VERSION: '" +
		WACH_VERSION +
		 "'	" + TStr)
	);

	//Ajout au body
	document.body.appendChild(divBlock);

	//On ecrit dans this.waitBlock
	this.waitBlock = document.getElementById('wach_status.CreateBlock');

};

/*SetStatus: definis le SetStatus
	@settings(status)=(int) Le nouveau status
*/
WACHStatus.prototype.SetStatus = function (status) {
	if (this.GetStatus() == status) return status;
	//Mode Normal
	if(status == STATUS_N){
		//On masque le block
		this.waitBlock.style.display = 'none';
		//On save
		this.status = status;
	}

	//Mode wait
	if (status == STATUS_WAIT){
		//On affiche le block
		this.waitBlock.style.display = 'inline';
		//On Save
		this.status = status;
	}
};

//=====FIN CLASSE=====

//====CLASSE UTIL=====
//Fonction utilitaire

//Constructeur
function WACHUtilClass(){
	//requiert rien
};

/*awnserParseBool: parse la reponse pour les QCM
	@settings(input)=(string) entrée
	@return=(bool) true si vraie; false si faux
*/
WACHUtilClass.prototype.awnserParseBool = function (input) {
	if (input == DefaultRight) return true;
	return false;
};

/*htmlEncode: parse le texte pour les carractere htmlEncode
	@settins(txt)=(string) entrée
	@return=(string) sortie
*/
//Code par http://codes-sources.commentcamarche.net/source/54146-parser-les-caracteres-html-d-une-string
//Merci a eux!
WACHUtilClass.prototype.htmlEncode = function (txt) {
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
};

/*stringListToBoolList: transforme une string -> "true,false,true"
  en tableau [true, false, true]
	@settings(input)=(bool) entrée
	@return=(string) sorite
*/
WACHUtilClass.prototype.stringListToBoolList = function (input) {
	//retour + split
	var ret = [];
	var splited = input.split(',');

	//Le for
	for (var i = 0; i<splited.length; i++){
		if(splited[i] == "true") ret[i] = true;
		if(splited[i] == "false") ret[i] = false;
	}

	return ret;
};

//=====FIN CLASS=====

//=====CLASSE WACH WINDOWS=====
//Differente fenetre de wach

//Constructeur
function WACHWindows(){
	//requiert rien
}

//Methode
/*AwnserWindow: affiche la fenetre des reponse
	@return=(object::dom) DIV de la fenetre
*/
WACHWindows.prototype.AwnserWindow = function () {
		//Recuperation des reponse
		var ans = WACHInstance.GetAllAwnsers();

		//Creation du div
		var mainDiv = document.createElement('div');
		mainDiv.id = 'WACHWindows.AwnserWindow';

		//Texte d'aide (true / false) en QCM
		if(WACHInstance.GetType() == TYPE_QCM){
			mainDiv.appendChild(document.createTextNode('true -> vrai false -> faux'));
			mainDiv.appendChild(document.createElement('br'));
		}

		//Fonction mot croisé
		var mcmethod = function(){
			//Le Tableau
			var table = document.createElement('table');
			//Pour chaque ligne...
			for (var i = 0; i < ans.length; i++){
				//On cree la ligne
				var tr = document.createElement('tr');
				//... et colonne
				for (var j = 0; j < ans[i].length; j++){
					//On cree la cellule
					var td = document.createElement('td');
					//on y met l'ans.
					td.innerText = ans[i][j]
					//On merge
					tr.appendChild(td);
				}
				//On merge
				table.appendChild(tr);
			}
			mainDiv.appendChild(table);
			return mainDiv
		}

		//Fonction autre
		var othermethod = function(){
			//Boucle principale
			for (var i = 0; i<ans.length; i++){
				//Numero de la question
				mainDiv.appendChild(document.createTextNode('Rep N' + i + ': '));

				//On get la question
				var question = WACHUtil.htmlEncode(WACHInstance.GetQuestion(i));
				//Question pour les type a question
				if(WACHInstance.GetType() == TYPE_QCM || WACHInstance.GetType() ==  TYPE_QUIZ)
					mainDiv.innerHTML += '<button onClick="alert(\'' +  question + '\')">Q</button>';

				//Pour les QCM
				if(WACHInstance.GetType() == TYPE_QCM){
					//Plusieure reponse
					for (var j = 0; j< ans[i].length ; j++)
						mainDiv.appendChild(
							document.createTextNode(WACHInstance.GetAwnserLabel(i,j) + ": "
							 + ans[i][j] + " | ")
						 );
				}
				//Autre type "clasique"
				else
						mainDiv.appendChild(document.createTextNode(ans[i]));

				//A la ligne
				mainDiv.appendChild(document.createElement('br'));
			}
			return mainDiv;
		}

		if (WACHInstance.GetType() == TYPE_MC) mcmethod();
		else othermethod();

		ShowMessage(mainDiv.outerHTML);
		return mainDiv;
};

WACHWindows.prototype.EditWindow = function () {
	//=====Ctrl + C / Ctrl + V d'en haut
	var ans = WACHInstance.GetAllAwnsers();

	var mainDiv = document.createElement('div');
	mainDiv.id = 'WACHWindows.EditWindow';

	if(WACHInstance.GetType() == TYPE_QCM){
		mainDiv.appendChild(document.createTextNode('true -> vrai false -> faux'));
		mainDiv.appendChild(document.createElement('br'));
	}

	var othermethod = function(){
		//On for
		for (var i = 0; i < ans.length; i++){
			//Ancienne réponse
			//En QCM on affiche aussi les libélé de réponse
			if(WACHInstance.GetType() == TYPE_QCM){
				for(var j = 0; j < ans[i].length; j++){
					var label = WACHInstance.GetAwnserLabel(i, j);
					mainDiv.appendChild(document.createTextNode(
						label + ": " + ans[i][j] + "|"
					))
				}
			}else{
				mainDiv.appendChild(document.createTextNode(ans[i] + "->"))
			}

			//Question pour les type a question
			var question = WACHUtil.htmlEncode(WACHInstance.GetQuestion(i));
			if(WACHInstance.GetType() == TYPE_QCM || WACHInstance.GetType() ==  TYPE_QUIZ)
				mainDiv.innerHTML += '<button onClick="alert(\'' +  question + '\')">Q</button>';

			//Champs de saise
			var champs = document.createElement('input');
			champs.setAttribute('type', 'text');
			champs.setAttribute('value', ans[i]);
			champs.setAttribute('id', 'WACHWindows.EditWindow.Q' + i)
			mainDiv.appendChild(champs)

			//Boutton de reset
			var resetBtn = document.createElement('button');
			resetBtn.setAttribute("onclick", "//");
			resetBtn.appendChild(document.createTextNode("R"));
			mainDiv.appendChild(resetBtn);

			//Br+Hr
			mainDiv.appendChild(document.createElement('br'));
			mainDiv.appendChild(document.createElement('hr'));
		}

		//Boutton de save
		var saveBtn = document.createElement('button');
		saveBtn.setAttribute("onclick", "//");
		saveBtn.appendChild(document.createTextNode("SAVE"));
		mainDiv.appendChild(saveBtn);

		//On affiche
		ShowMessage(mainDiv.outerHTML);
	}

	var mcmethod = function(){
		//Table de base + btn save
		var table = document.createElement('table')
		table.id = "WACHWindows.EditWindow.mcmethod"

		var savetr = document.createElement('tr');
		var savetd = document.createElement('td');
		var savebtn = document.createElement('button');
		savebtn.innerText = 'SAVE';
		savebtn.setAttribute('onclick', '//');

		savetd.appendChild(savebtn);
		savetd.setAttribute('colspan', ans[0].length)

		savetr.appendChild(savetd);
		table.appendChild(savetr);

		//On double for
		for(var i = 0; i < ans.length; i++){
			var tr = document.createElement('tr');
			for(var j = 0; j < ans[i].length; j++){
				var td = document.createElement('td');

				//Champs de Texte
				var input = document.createElement('input')
				input.setAttribute('type', 'text');
				input.setAttribute('value', ans[i][j]);
				input.style.width = '10px';
				input.id = 'WACHWindows.EditWindow.mcmethod.Q' + i + "_" + j;

				td.appendChild(input);
				tr.appendChild(td);
			}
			//Btn de reset
			var resetTd = document.createElement('td');
			var resetBtn = document.createElement('button');
			resetBtn.innerText = "R";
			resetBtn.setAttribute('onclick', '//');
			resetTd.appendChild(resetBtn);
			tr.appendChild(resetTd);

			table.appendChild(tr);
		}

		document.body.appendChild(table);

		mainDiv.appendChild(document.createTextNode
			("Pour manque de place, l'édition se fait en bas de page.")
		);
		ShowMessage(mainDiv.outerHTML);
	}

	if(WACHInstance.GetType() == TYPE_MC)	mcmethod();
	else 																	othermethod();
};

//=====FIN CLASSE=====

//====CLASSE EVENT=====
//Classe s'occupant des event

//Constructeur
function WACHEvent(){
	//Definition des event
	document.onkeydown = this.onKey;
}

/* onKey: Appelé lors de l'appui d'une touche
	settings(e) = (object::event) Evenement detecté par le naviagteur
*/
WACHEvent.prototype.onKey = function (e) {
	//Le œ en classique
	if (e.keyCode == 0 && WACHInstance.status.GetStatus() == STATUS_N)
		WACHInstance.status.SetStatus(STATUS_WAIT);
	//Le S en wait
	if(e.keyCode == 83 && WACHInstance.status.GetStatus() == STATUS_WAIT){
		WACHInstance.status.SetStatus(STATUS_N);
		WACHInstance.windows.AwnserWindow();
	}
};

//====FIN CLASSE=====

//Instance de wach
WACHUtil = new WACHUtilClass();
WACHInstance = new WACH();
console.log("%c" + welcomeText + "%c\n\nWACH Inited!", "background: none; color: red; font-weight: bold;", "background: yellow; color: blue");

}

//====Sinon=====
else{
	alert("ERREUR: Double instance de WACH");
	console.log("%cE:WACH DOUBLE Instance%c", "background: red; color: yellow; font-weight: bold")
}

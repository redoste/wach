/*============================================================================
           _____   ____   _____ _
          |  __ \ / __ \ / ____| |
  _ __ ___| |  | | |  | | (___ | |_ ___
 | '__/ _ \ |  | | |  | |\___ \| __/ _ \
 | | |  __/ |__| | |__| |____) | ||  __/
 |_|  \___|_____/ \____/|_____/ \__\___|

===============================================================================
WACH WebAllemendCHeat: a cheat tool for WebAllemend
Tetris edition
  -> http://redoste.fr.nf                       WEBSITE
  -> http://redoste.byethost7.com/0ch/wa        Offcial Program page
  -> http://steph.raymond.free.fr/              WebAllemend
  -> https://www.gnu.org/licenses/gpl-3.0.txt   Liscence

Copyright © 2017 reDOSte

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

function WACHTetrisClass(){

	this.DownloadXML = function(){
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "data/tetris.xml", true);

		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)){
				WACHTetrisInstance.xmlTree = xhr.responseXML;
				WACHTetrisInstance.getAwnser();
			}
		}

		xhr.send(null);
	}

	this.getAwnser = function(){
		var btn = document.createElement('button');
		btn.innerText = "Show/Hide";
		btn.onclick = function(){
			var div = document.getElementById("WACHTetris.getAwnser.mainDiv");
			if(div.style.display == "none")
				div.style.display = "inline";
			else
				div.style.display = "none";
		}

		var mainDiv = document.createElement('table');
		mainDiv.id = "WACHTetris.getAwnser.mainDiv";
		mainDiv.border = "1px";
		mainDiv.style.display = "none";
		var quests = this.xmlTree.getElementsByTagName("quiz");
		var answers = this.xmlTree.getElementsByTagName("ans");

		for(var i = 0; i < quests.length; i++){
			var tr = document.createElement('tr');

			var td1 = document.createElement('td')
			td1.innerText = quests[i].textContent;

			var td2 = document.createElement('td');
			td2.innerText = answers[i].textContent;

			var td3 = document.createElement('td');
			var img = document.createElement('img');
			img.setAttribute("src", quests[i].textContent);
			td3.appendChild(img);

			tr.appendChild(td1);
			tr.appendChild(td2);
			tr.appendChild(td3);
			mainDiv.appendChild(tr);
		}
		document.body.appendChild(btn);
		document.body.appendChild(mainDiv);
		return mainDiv;
	}

	this.xmlTree = null;

	this.DownloadXML();
}

var WACHTetrisInstance = new WACHTetrisClass();

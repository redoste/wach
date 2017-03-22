var CHStatus = 0;
//0 = Classique
//1 = Wait keys
CHPWait()

function CHGAn(id){
    return I[id][1][0][0]
}

function CHGAns(){
    var ret = [];
    for (var i=0; i<I.length; i++){
        ret[i] = CHGAn(i);
    }
    return ret;
}

function CHPAns(){
    var ans = CHGAns();
    
    var mainDiv = document.createElement('div');
    mainDiv.id = 'CHPAns_div';
    
    for (var i=0; i<ans.length; i++){
        mainDiv.appendChild(document.createTextNode('Rep N'))
        mainDiv.appendChild(document.createTextNode(i))
        mainDiv.appendChild(document.createTextNode(': '))
        mainDiv.appendChild(document.createTextNode(ans[i]))
        mainDiv.appendChild(document.createElement('br'))
    }
    
    ShowMessage(mainDiv.innerHTML)
    
    return mainDiv
}

function CHRKey(e){
    //Le œ en mode Classique
    if (e.keyCode == 0 && CHStatus == 0){
        CHStatus = 1;
        document.getElementById('CHPWait').style = 'display: inline'
    }
    //Le S en mode Wait
    if (e.keyCode == 83 && CHStatus == 1){
        CHStatus = 0;
        document.getElementById('CHPWait').style = 'display: none'
        CHPAns()
    }
    //Le E en mode Wait
    if (e.keyCode == 69 && CHStatus == 1){
        CHStatus = 0;
        document.getElementById('CHPWait').style = 'display: none'
        CHPEditForm()
    }
    //ESC en mode Wait
    /*if (e.keyCode == 27 && CHStatus == 1){
        window.location = "http://steph.raymond.free.fr/"
    }*/
}

function CHPWait(){
    var mainDiv = document.createElement('div');
    mainDiv.id = 'CHPWait'
    mainDiv.style = 'display: none'
    mainDiv.appendChild(document.createTextNode('Attend Touche œ'))
    
    document.body.appendChild(mainDiv)
}

function CHPEditSave(NAns){
    for (var i=0; i<NAns.length; i++){
        I[i][1][0][0] = NAns[i]
    }
}

function CHPEditForm(){
    var mainDiv = document.createElement('div')
    mainDiv.id = 'CHPEditForm'
    
    var ans = CHGAns()
    
    for (var i = 0; i < ans.length; i++){
        mainDiv.appendChild(document.createTextNode(ans[i] + "->"))
        
        /*var txtZone = document.createElement('input')
        txtZone.value = ans[i]
        txtZone.type = "text"
        txtZone.id = "CHPEditForm_Q" + i*/
        mainDiv.innerHTML += '<input type="text" value="' + ans[i] + '" id="CHPEditForm_Q'+ i +'"\>'
        
        mainDiv.innerHTML += '<button onClick="CHPEditReset(' + i + ')">R</button>'
        
        //mainDiv.appendChild(txtZone)
        mainDiv.appendChild(document.createElement('br'))
    }
    
    /*var btn = document.createElement('button')
    btn.innerText = 'SAVE'
    btn.onClick = 'CHPEditSave(CHPEditGet()); HideFeedback()'
    mainDiv.appendChild(btn)*/
    mainDiv.innerHTML += '<button onclick="CHPEditSave(CHPEditGet()); HideFeedback()">SAVE</button>'
    
    
    ShowMessage(mainDiv.innerHTML)
    
    return mainDiv
}

function CHPEditGet(){
    var ret = []
    
    for (var i=0; i<I.length; i++){
        ret[i] = document.getElementById("CHPEditForm_Q" + i).value
    }
    
    return ret
}

function CHPEditReset(id){
    document.getElementById("CHPEditForm_Q" + id).value = CHBackup[id]
}

document.onkeydown = CHRKey
var CHBackup = CHGAns()

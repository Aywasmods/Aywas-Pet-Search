function findpet(avar){
 if(document.getElementById('pet_id') && document.getElementById('petsearch')){
   petlist=document.getElementById('pet_id');
   searchterm=document.getElementById('petsearch');
   searchterm=searchterm.value;
   if(avar)searchterm=avar;
   if(searchterm==" ")searchterm="";
   foundpet=false;
   petsfound=[];
   idsfound=[];
   for(x=0;x<petlist.length && !foundpet && searchterm!="";x++){
     if(petlist.options[x].value==searchterm){
     petlist.options[x].selected=true;
     foundpet=true;
     }
     if(petlist.options[x].innerHTML.toLowerCase().indexOf(searchterm.toLowerCase())!=-1){
     idsfound[idsfound.length]=petlist.options[x].value;
     petsfound[petsfound.length]=petlist.options[x].innerHTML;
     }
   }
   for(x=-1;document.getElementById('result'+x);x++){
     document.getElementById('result'+x).parentNode.removeChild(document.getElementById('result'+x))
   }
   if(!foundpet && petsfound.length>1 && searchterm!=""){
     resultbox=document.getElementById('searchbox');
     row=document.createElement("TR")
     td1=document.createElement("TH")
     td1.appendChild(document.createTextNode(petsfound.length+" pets found."));
     td1.colSpan=2;
     td2=document.createElement("TH")
     text=document.createElement("A")
     text.href="javascript:findpet(' ');";
     text.className="a-button small";
     text.appendChild(document.createTextNode("X"));
     td2.appendChild(text);
     row.className="highlight";
     row.id="result-1";
     row.appendChild(td1);
     row.appendChild(td2);
     resultbox.appendChild(row);
     for(x=0;x<petsfound.length;x++){
       row=document.createElement("TR")
       td1=document.createElement("TD")
       text=document.createElement("A")
       text.href="javascript:findpet('"+idsfound[x]+"');";
       text.appendChild(document.createTextNode(petsfound[x]));
       td1.appendChild(text);
       td1.colSpan=2;
       td2=document.createElement("TD")
       text=document.createElement("A")
       text.href="http://www.aywas.com/pp/view/"+idsfound[x]+"/";
       text.target="_blank";
       text.appendChild(document.createTextNode("View"));
       td2.appendChild(text);
       if(x/2!=Math.round(x/2))row.className="row-even";
       if(x/2==Math.round(x/2))row.className="row-odd";
       row.id="result"+x;
       row.appendChild(td1);
       row.appendChild(td2);
       resultbox.appendChild(row);
     }
   }
   if(!foundpet && idsfound.length==1){
     for(x=0;x<petlist.length;x++){
       if(petlist.options[x].value==idsfound[0])petlist.options[x].selected=true;
     }
   }
   petsfound=[];
   idsfound=[];
 }
}
function findpetfocus(avar){
 searchterm=document.getElementById('petsearch');
 if(avar=='out')searchterm.focused=false;
 if(avar=='in')searchterm.focused=true;
 if(!avar && searchterm.focused){
   setTimeout("findpet(false)",42);
   return false;
 }
 if(!avar && !searchterm.focused)return true;
}
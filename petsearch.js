if(document.getElementById('pet_id')){
  findit=document.getElementById('pet_id');
  while(findit.parentNode && findit.tagName!="FORM"){
    if(findit.parentNode.tagName=="FORM")findit.parentNode.setAttribute("onSubmit", "return findpetfocus(false);");
    findit=findit.parentNode;
  }
  findit=document.getElementById('pet_id');
  table=document.createElement("TABLE");
  table.border=0;
  table.cellpadding=2;
  table.cellspacing=2;
  table.className="y-tables center";
  table.id="searchbox";
  findit.parentNode.insertBefore(table,findit);
  row=document.createElement("TR");
  td=document.createElement("TD");
  row.appendChild(td);
  td.appendChild(findit);
  td=document.createElement("TD");
  inp=document.createElement("INPUT");
  inp.id="petsearch";
  inp.size=10;
  inp.type="text";
  inp.setAttribute("onFocus", "findpetfocus('in');");
  inp.setAttribute("onBlur", "findpetfocus('out');");
  td.appendChild(inp);
  row.appendChild(td);
  td=document.createElement("TD");
  inp=document.createElement("INPUT");
  inp.className="a-button small";
  inp.type="button";
  inp.value="Search";
  inp.setAttribute("onClick", "findpet(false);");
  td.appendChild(inp);
  row.appendChild(td);
  table.appendChild(row);
} else {
  alert("Code executed but no pet dropdown was found, This must be used on a page including a dropdown of all of your pets. Another possible cause for this is that the page has been updated but this code has not.");
}
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
       if(idsfound[x]!=0){
         text=document.createElement("A")
         text.href="http://www.aywas.com/pp/view/"+idsfound[x]+"/";
         text.target="_blank";
         text.appendChild(document.createTextNode("View"));
         td2.appendChild(text);
       }
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
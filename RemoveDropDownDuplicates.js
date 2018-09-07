NWF.FormFiller.Events.RegisterAfterReady(function(){
	NWF$('.duplicates').each(function(){Update(this.id);});
});
function Update(control){
	var usednames={};
	NWF$("select[id="+control+"]>option").each(function(){
		if(usednames[this.text]){NWF$(this).remove();}
		else{usednames[this.text]=this.value;}
	});
}

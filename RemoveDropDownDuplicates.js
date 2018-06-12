NWF.FormFiller.Events.RegisterAfterReady(function(){
	$('.duplicates').each(function(){Update(this.id);});
});
function Update(control){
	var usednames={};
	$("select[id="+control+"]>option").each(function(){
		if(usednames[this.text]){$(this).remove();}            
		else{usednames[this.text]=this.value;}   
	});
}

NWF.FormFiller.Events.RegisterAfterReady(function(){
	/* For each object with the 'duplicates' class, run the Update function with object ID */
	$('.duplicates').each(function(){Update(this.id);});
});

function Update(control){
	var usednames={};
	
	/* For each option object with a select object parent with an ID equal to the 'control' ID */
	$("select[id="+control+"]>option").each(function(){

		/* If current object's text value exists as key in 'usednames' array, remove current object */
		if(usednames[this.text]){$(this).remove();}
		
		/* Else, add current object's text and value as key:value into 'usednames' array variable */
		else{usednames[this.text]=this.value;}
	});
}

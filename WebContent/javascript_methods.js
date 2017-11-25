/**
 * JS methods that I need to add into the SchoolRest-HTML files
 */
$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + 
    		'=([^&#]*)').exec(window.location.href);
    if (results == null){
       return null;
    }
    else{
       return results[1] || 0;
    }
}  
// Names might be wrong here, but these are generally 
// correct, including what file they should go in...
// Compare with older versions to see what the names of the methods these go in should be
// To ADD a student with POST
    $.ajax( { 
    	url:"http://localhost/SchoolRest/rest/studentservice/students/",
    	type: "POST",
    	dataType: "json",
    	contentType: "application/json",
    	data: '{'+  
    		'"idNumber" : "'+idNumber+'",'+
    		'"firstName" :"'+ firstName+'",'+
    		'"lastName" : "'+lastName+'",'+
    		'"city" : "'+city+'",'+
    		'"state" : "'+state+'",'+
    		'"zip" : "'+zip+'",'+
    		'"email" : "'+email+'",'+
    		'"classification" : "'+classification+'",'+
    		'"gender" : "'+gender+'"'+
    		"}",
    	success : function(data) {
    		 console.log("Add success ");
    		 window.location.assign("http://localhost/StudentRest-HTML/student-list.html");
    		 console.log("Add after change href");			 
    		 },
    	fail : function(jqXHR, textStatus, errorThrown) {
    	  	  console.log("error " + textStatus);
    	  	  console.log("incoming Text " + jqXHR.responseText);
    	  	   }
    });
    
    // GET request for a single student
    $.getJSON( "http://localhost/SchoolRest/rest/studentservice/students/"+$.urlParam("id"))
	.done(function( response ) {
		$('#id').val(response.idNumber);
		$('#firstName').val(response.firstName);
		$('#lastName').val(response.lastName);
		$('#city').val(response.city);
		$('#state').val(response.state);
		$('#zip').val(response.zip); 
		$('#email').val(response.email);
		$("#"+response.classification).prop('checked', true);
		$("#"+response.gender).prop('checked', true);
		})
	.fail(function(jqXHR, textStatus, errorThrown) {
	    console.log("error " + textStatus);
	    console.log("incoming Text " + jqXHR.responseText);
   });
    
    // update a student method GET
    $("#studentForm").submit(function (e){
		e.preventDefault;
		var idNumber =$('#id').val();
		var firstName = $('#firstName').val();
		var lastName = $('#lastName').val();
		var city= $('#city').val();
		var state = $('#state').val();
		var zip = $('#zip').val(); 
		var email = $('#email').val();
		var classification = $("input[name='classification']:checked").val();
		if (classification == null) classification ="";
		var gender = $("input[name='gender']:checked").val();
		if (gender == null) gender =""; // Slides are weird...
    });

    // update a student with PUT
    $.ajax( { 
		url:"http://localhost/SchoolRest/rest/studentservice/students/"+$.urlParam("id"),
		type: "PUT",
		dataType: "json",
		contentType: "application/json",
		data: '{'+  
			'"id" : "'+$.urlParam("id")+'",'+
			'"idNumber" : "'+idNumber+'",'+
			'"firstName" :"'+ firstName+'",'+
			'"lastName" : "'+lastName+'",'+
			'"city" : "'+city+'",'+
			'"state" : "'+state+'",'+
			'"zip" : "'+zip+'",'+
			'"email" : "'+email+'",'+
			'"classification" : "'+classification+'",'+
			'"gender" : "'+gender+'"'+
		"}", // Slides were weird here too 
		success : function(data) {
				  console.log("Add success ");
				  window.location.assign("http://localhost/StudentRest-HTML/student-list.html");
				  console.log("Add after change href");			  },
			fail : function(jqXHR, textStatus, errorThrown) {
	  	        console.log("error " + textStatus);
	  	        console.log("incoming Text " + jqXHR.responseText);
	  	      }
});
    
// DELETE a student request
    $("#deletebtn").click(function (e){
    	console.log("delete function");
    	$('#deleteMessage').html("Deleting record ... Wait");
    	$('#deletebtn').attr("disabled", true);
    	$.ajax({ 
    		url:"http://localhost/SchoolRest/rest/studentservice/students/"+$.urlParam("id"),
    		type: "DELETE",
    	    success: (function(data) {
    		  console.log("Delete success ");
    		  window.location.assign("http://localhost/StudentRest-HTML/student-list.html");
    		  console.log("Delete after change href");
    	  }),
    	  fail: (function(jqXHR, textStatus, errorThrown) {
     	      console.log("Delete error " + textStatus);
     	      console.log("incoming Text " + jqXHR.responseText);
    	  })
      	 });
    });
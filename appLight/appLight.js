document.getElementById("body").style.backgroundColor = "white";

// If the user clicks in the window, set the background color to black
function myFunction() {
	var checkstatus = document.getElementById("body").style.backgroundColor;	
	
	if (checkstatus == "white"){
		document.getElementById("body").style.backgroundColor = "black";
		document.getElementById("toggleswitch").style.cssFloat = "left"; 
		document.getElementById("toggleswitch").innerHTML = "OFF";
	}
    else if(checkstatus == "black"){
		document.getElementById("body").style.backgroundColor = "white";
		document.getElementById("toggleswitch").style.cssFloat = "right";
		document.getElementById("toggleswitch").innerHTML = "ON";
		document.getElementById("toggleswitch").style.color = "red";
		
	}
	
}


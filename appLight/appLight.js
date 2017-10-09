
window.onclick = myFunction;

// If the user clicks in the window, set the background color of <body> to black
function myFunction() {
    document.getElementsByTagName("BODY")[0].style.backgroundColor = "black";
}

$(function(){
    $('.toggle').on('click', function(event){
      event.preventDefault();
      $(this).toggleClass('active');
    });
  });
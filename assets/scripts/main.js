$(document).ready(function(){

  // Listen for the user to click on the data submit button.
  // When clicked, run the analyzeIt function using the text
  // in the text entry field.
  $("#btn1").click(function(){
    event.preventDefault();
    var sendText = $("#exemplar").val();
    //analyzeIt(sendText);  //Function that will hit Watson API.
    //$("#exemplar").val("");  //To clear the textarea.
  })
});

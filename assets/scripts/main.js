$(document).ready(function(){

  // Listen for the user to click on the data submit button.
  // When clicked, run the analyzeIt function using the text
  // in the text entry field.
  $("#btn1").click(function(){
    event.preventDefault();
    var sendText = $("#exemplar").val();
    analyzeIt(sendText);  //Function that will hit Watson API.
    //$("#exemplar").val("");  //To clear the textarea.
  })

  //  The AnalzyeIt function receives the text from the text entry
  //  and analzes it using the IBM Watson API via an ajax call.
  //  The ajax call returns a JSON Object containing analysis data.
  function analyzeIt(text) {
    localStorage.clear();
    let unAnalyzedText = text;
    var urlBase = "http://gateway-a.watsonplatform.net/calls/text/TextGetEmotion?";
    var apiKey = "e98c199b53f78a115c910b132833e89d9cd9ecd5";
    urlBase = urlBase+"apikey="+apiKey+"&text="+encodeURIComponent(unAnalyzedText)+"&outputMode=json";
    //console.log(urlBase);
    $.ajax({
      url: urlBase,
      type: 'POST',
      success: function(data){
        var emoObj = data.docEmotions;
        for (emotion in emoObj) {
          console.log(emotion, emoObj[emotion]);
          localStorage.setItem(emotion, emoObj[emotion]);
        }
      }
    })
  }
});

$(document).ready(function(){

  // Listen for the user to click on the data submit button.
  // When clicked, run the analyzeIt function using the text
  // in the text entry field.
  $("#btn1").click(function(){
    event.preventDefault();
    var sendText = $("#exemplar").val();
    $(".chart").html('');
    analyzeIt(sendText);  //Function that will hit Watson API.
    //$("#exemplar").val("");  //To clear the textarea.
  })

  //  The graphIt function utilizes the D3 framework to add a bar graph
  //  to the page using DOM manipulation and pulling bar graph values from
  //  local storage values created after the API call.
  function graphIt() {
    var emotions = ["anger", "disgust", "fear", "joy", "sadness"];
    var colors = ["red", "green", "purple", "yellow", "blue"];
    var data = [];
    for (var i = 0; i < emotions.length; i++) {
      data[i] = Number.parseFloat(localStorage.getItem(emotions[i]));
    }

    var x = d3.scaleLinear()
        .domain([0, d3.max(data)])
        .range([0, 40]);
    var colorIndex = 0;
    d3.select(".chart")
      .selectAll("div")
        .data(data)
      .enter().append("div")
        .style("width", function(d) { return x(d) + "em"; })
        .style("background-color", function(d) { return colors[colorIndex++]})
        .text(function(d) { return d; });
    for (var i = 0; i < 5; i++) {
      var $bar = $(".chart")[0].childNodes[i];
      var barText = $bar.innerHTML;
      barText = emotions[i] + ": " + barText; //Add name of emotion to bar text.
      $bar.innerHTML = barText;
    }
  }

  //  The AnalzyeIt function receives the text from the text entry
  //  and analzes it using the IBM Watson API via an ajax call.
  //  The ajax call returns a JSON Object containing analysis data.
  function analyzeIt(text) {
    localStorage.clear();
    let unAnalyzedText = text;
    var urlBase = "https://gateway-a.watsonplatform.net/calls/text/TextGetEmotion?";
    var apiKey = "a504c631c72bbdd8359bbe888ebc2687c48a16f5";
    //a504c631c72bbdd8359bbe888ebc2687c48a16f5
    //e98c199b53f78a115c910b132833e89d9cd9ecd5
    urlBase = urlBase+"apikey="+apiKey+"&text="+encodeURIComponent(unAnalyzedText)+"&outputMode=json";
    //console.log(urlBase);
    $.ajax({
      url: urlBase,
      type: 'POST',
      success: function(data){
        console.log(data);
        var emoObj = data.docEmotions;
        for (emotion in emoObj) {
          console.log(emotion, emoObj[emotion]);
          localStorage.setItem(emotion, emoObj[emotion]);
        }
        graphIt();
      }
    })
  }
});

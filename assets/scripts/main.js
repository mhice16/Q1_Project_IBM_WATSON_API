$(document).ready(function(){
  $('select').material_select();

  // Listen for the user to select a news source.
  // When selected, run the getNews function using the
  // option value as source to pass to the function.
  $("#select1").change(function(){
    event.preventDefault();
    var source=$("select option:selected").val();
    getNews(source);  //Function that get the news article info.
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

  //  The getNews function is triggered when a news source is selected.
  //  It hits the newsapi and receive an object of top news articles (max 10);
  function getNews(source) {
    localStorage.clear();
    var urlBase="https://newsapi.org/v1/articles?source="
    urlBase += source + "&sortBy=top&apiKey=b9e8f0369e2343549280be54e86a74f9";

    $.get(urlBase, function(artObj) {
        localStorage.setItem("articles", artObj);
        addArticles(artObj);
    }).fail(function() {
        displayError();
    });
  }

  function addArticles(obj) {
  }

  function displayError() {
  }

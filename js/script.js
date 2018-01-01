
function fLUpp(a){
  var b = a.toLowerCase();
  var c = b.split("");
  c[0]=c[0].toUpperCase();
  var d = c.join("");
  return d;
}

function loadData() {
  var $body = $('body');
  var $wikiElem = $('#wikipedia-links');
  var $wikiHeaderElem = $('#wikipedia-header');
  var $nytHeaderElem = $('#nytimes-header');
  var $nytElem = $('#nytimes-articles');
  var $greeting = $('#greeting');
    
  $wikiElem.text("");
  $nytElem.text("");

  var street = $("#street").val();
  var city = $("#city").val();
  var streetviewUrl =street + ', ' + city;

  $body.append('<img class="bgimg" src="https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + streetviewUrl + '">');
  $greeting.text(streetviewUrl.toUpperCase() + "!");
  $nytHeaderElem.text("New York Times Articles About " + fLUpp(city) + "!");
  $wikiHeaderElem.text("Relevant Wikipedia Links About " + fLUpp(city) + "!");

  var ny = "https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=glocations:(" + city.toUpperCase() + ")&sort=newest&api-key=ab60487e0c3f4fdeb5b8e5f44682d9d8";
  $.getJSON(ny, function(data){
    var articles = data.response.docs;
    for(var i=0; i<articles.length;i++){
      $nytElem.append('<li class="article"><a href="' + articles[i].web_url +'" target="_blank">' + articles[i].headline.main +'</a><p>' + articles[i].snippet + '</p></li>');
    }
  });

  var wikiUrl = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + city + "&format=json&callback=wikiCallback";

  $.ajax({
    url: wikiUrl,
    dataType: "jsonp",
    success: function(data){
      var wikiArticles = data[3];
      var titles = data[1];
      for(var i=0; i<wikiArticles.length;i++){
        $wikiElem.append('<li class="article"><a href="' + wikiArticles[i] +'" target="_blank">' + titles[i] +'</a></li>');
      }
    }
  });

  return false;
};

$('#form-container').submit(loadData);

function visibility(item){
  if (item.text() === "Show"){
       item.text("Hide");
  } 
  else {
      item.text("Show");
  }
}


$('#submit-btn2').click(function(){
  $('#nytimes-articles').toggle();
  visibility($('#submit-btn2'));
});

$('#submit-btn3').click(function(){
  $('#wikipedia-links').toggle();
  visibility($('#submit-btn3'));
});


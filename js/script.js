
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var $city = $('#city').val();
    var $streetViewURL = "http://maps.googleapis.com/maps/api/streetview?size=640x500&location= "+$city;
    console.log($streetViewURL);


    $('.imgContainer').html('<img class="bgimg" src="' +$streetViewURL + '" >');


    //NYTimes API
    var $newYTAPI = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + $city + "&sort=newest&api-key=9c8b4733d797436ea08fb3777c4653af";
    $nytHeaderElem.text('New York Times Articles for ' + $city);
    $.getJSON( $newYTAPI, function( data ) {

        var article = data.response.docs;
        for (var i = 0; i < article.length; i++) {
            $nytElem.append('<li>' + '<h2><a href="' + article[i].web_url + '" target="_blank" >' + article[i].headline.main + '</a>' + '</h2>' + '<br>' + article[i].snippet + '</li>');
        }


    }).error(function(e) {
        $nytHeaderElem.text('New YorK Times Articles Could Not Be Loaded');
    })

    var $wikiArticlesAPI = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + $city + '&limit=10&namespace=0&format=json';
    console.log($wikiArticlesAPI);

    $.ajax({
        url: $wikiArticlesAPI,
        dataType: "jsonp",
        success: function( response ) {
            var wikiArticle = response
            console.log(wikiArticle);

            for (var i = 1; i < wikiArticle[2].length; i++) {
                $wikiElem.append('<a href="' + wikiArticle[3][i] + '"> <li>' + wikiArticle[2][i] + '</li> </a>');

            }
        }

    })

    // YOUR CODE GOES HERE!

    return false;
};

$('#form-container').submit(loadData);

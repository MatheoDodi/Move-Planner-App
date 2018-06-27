
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
    var $street = $('#street').val();
    var $city = $('#city').val();
    var $streetViewURL = "http://maps.googleapis.com/maps/api/streetview?size=640x500&location= "+$street+", "+$city;
    console.log($streetViewURL);

    $body.append('<img class="bgimg" src="' +$streetViewURL + '" >');

    //NYTimes API
    var $newYTAPI = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + $city + "&sort=newest&api-key=9c8b4733d797436ea08fb3777c4653af";

    $.getJSON( $newYTAPI, function( data ) {
        var article = data.response.docs;

        $nytHeaderElem.text('New York Times Articles for ' + $street + ", " + $city);
        for (var i = 0; i < article.length; i++) {
            $nytElem.append('<li>' + '<h2><a href="' + article[i].web_url + '" target="_blank" >' + article[i].headline.main + '</a>' + '</h2>' + '<br>' + article[i].snippet + '</li>');
        }


    })

    // YOUR CODE GOES HERE!

    return false;
};

$('#form-container').submit(loadData);

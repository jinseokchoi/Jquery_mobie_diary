//diary list detail view
function displayDiary(index){
    var len, i, date="", day="", weather="", title="", content="", location="", photo="";

//diary list detail setting
var diary_record = recordSet.rows.item(index);
varPosition = index;

//title
if(diary_record.title != null){
    title = '<div class="ui-bar ui-bar-b"><h3>' + diary_record.title + '</h3></div>';
} 
else{
    title = '<p>title : no info</p>';
}

//date
if(diary_record.date != null){
    date = '<p>date : ' +diary_record.date+ '</p>';
} 
else{
    date = '<p>date : no info</p>';
}

//day
if(diary_record.day != null){
    day = '<p>day : ' +diary_record.day+ '</p>';
}
else{
    day = '<p>day : no info</p>';
}

//weather
if(diary_record.weather != null){
    weather = '<p>weather : ' +diary_record.weather+ '</p>';
}
else{
    weather = '<p>weather : no info</p>';
}

//content
if(diary_record.content != null){
    content = '<p>content : ' +diary_record.content+ '</p>';
}
else{
    content = '<p>content : no info</p>';
}

//location
if(diary_record.location != null){
    location = '<p>location : ' +diary_record.location+ '</p>';
}
else{
    location = '<p>location : no info</p>';
}

//photo
if(diary_record.photo != null){
    photo = '<p>photo : ' +diary_record.photo+ '</p>';
}
else{
    photo = '<p>photo : no info</p>';
}

$('#detail_view_list').html(title + date + day + weather + content + location + photo);
$.mobile.changePage("#detail_view_diary", "slide", false, true);
}

//diary photo view
function getDiaryPhoto(){
  var title = recordSet.rows.item(varPosition).title;
  var photo = recordSet.rows.item(varPosition).photo;
  $('#photo_name').text(title);
  $('#photo_area').attr('src', photo);
  $.mobile.changePage("#dshow_photo", "pop", false, true);
}

//diary map view
function getDiaryMap(){
  $.mobile.changePage("#dshow_map", "pop", false, true);
  var geocoder = new google.maps.Geocoder();
  var addr = recordSet.rows.item(varPosition).location;
  geocoder.geocode({'location' : addr}, function(results, status){
    if(status == google.maps.GeocoderStatus.OK){
      var latlng = results[0].geometry.location;
      $('#map_addr').text(addr);
      $('#map_area').gmap('destroy');
      $('#map_area').gmap({'center' : latlng, 'zoom' : 15});
      $('#map_area').gmap('addMarker', {'position' : latlng}).click(function(){
        $('#map_area').gmap('openInfoWindow', {'content' : results[0].formatted_location + 'location'}, this);
      });
    }else {
      alert('fail : ' +status);
    }
  });
}

function getDiaryRouteMap(){
  var location = recordSet.rows.item(varPosition).location;
  $('#route_name').text(location);
  $.mobile.changePage("#dshow_route", "pop", false, true);
  $('#route_area').gmap('destroy');
  navigator.geolocation.getCurrentPosition(
    function(Position){
      var lat = Position.coords.latitude;
      var lng = Position.coords.longitude;
      
      var start = new google.maps.LatLng(lat, lng);
      var end = recordSet.rows.item(varPosition).location;
      var mode = 'TRANSIT'
      var request = {
        origin : start,
        destination : end,
        travelMode : eval('google.maps.DirectionsTravelMode.' +mode)
      };
      $('#route_area').gmap('displayDirections', request, function(result, status){
        if(status === 'OK'){
          alert('Success');
        }
        else{
          alert('Fail : ' +status);
        }
      });
    },
    function(posError){
      alert('Error Code : ' +posError.code+ '/Error Message : ' +posError.message);
    }, 
    {maximumAge : 3000, timeout : 100000, enableHighAccuracy : true}
  );
}


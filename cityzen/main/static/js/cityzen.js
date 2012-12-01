$(function () {

  addPointToMap = function (address) {
    window.geocoder.geocode(
      {
        'address': address
      },
      function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          new google.maps.Marker({
            position: results[0].geometry.location,
            map: map
          });
          window.map.setCenter(results[0].geometry.location);
        }
        else {
          // Google couldn't geocode this request. Handle appropriately.
        }
      }
    );
  };

  window.map = new google.maps.Map(document.getElementById('map'), {
    mapTypeId: google.maps.MapTypeId.TERRAIN,
    zoom: 12,
    panControl: false,
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    overviewMapControl: false
  });

  window.geocoder = new google.maps.Geocoder();

  addPointToMap('Via del revi, Roma, Italy');
  addPointToMap('Via del cossovaro, Roma, Italy');
});
$(function () {
  window.marker = [];

   addPointToMap = function (address, category, myStatus) {
     geocoder.geocode(
       {
         'address': address
       },
       function (results, status) {
         if (status == google.maps.GeocoderStatus.OK) {
           var image;

           if (category === 0) // barriere
             if (myStatus === 0)
               image = 'http://www.gettyicons.com/free-icons/218/mixed/png/32/blue_pin_32.png';
             else image = 'http://www.gettyicons.com/free-icons/218/mixed/png/32/green_pin_32.png'
           else if (category === 1)
             if (myStatus === 0)
               image = 'http://www.gettyicons.com/free-icons/218/mixed/png/32/red_pin_32.png';
             else image = 'http://www.gettyicons.com/free-icons/218/mixed/png/32/black_pin_32.png'

           window.marker.push(new google.maps.Marker({
             position: results[0].geometry.location,
             map: map,
             icon: new google.maps.MarkerImage(
               image,
               new google.maps.Size(32, 32),
               new google.maps.Point(0, 0),
               new google.maps.Point(0, 32)
             )
           }));
           map.setCenter(results[0].geometry.location);
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

   geocoder = new google.maps.Geocoder();

});

ymaps.ready(init);

function init () {
    var myMap = new ymaps.Map("map", {
            center: [55.814499, 37.571124],
            zoom: 16
        }),

        


        myPlacemark1 = new ymaps.Placemark([55.814499, 37.571124], {
            hintContent: ''
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'assets/img/map-marker.png',
            iconImageSize: [36, 49],
            iconImageOffset: [-3, -42]
        });
        myPlacemark2 = new ymaps.Placemark([55.814186, 37.572390], {
            hintContent: ''
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'assets/img/map-marker2.png',
            iconImageSize: [36, 49],
            iconImageOffset: [-3, -42]
        });
    myMap.behaviors.disable('scrollZoom'); 
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        //... отключаем перетаскивание карты
        myMap.behaviors.disable('drag');
    }
    myMap.geoObjects
        .add(myPlacemark1)
        .add(myPlacemark2);
        
    var ctrlKey = false;
    var ctrlMessVisible = false;
    var timer;
    
    // Отслеживаем скролл мыши на карте, чтобы показывать уведомление
    myMap.events.add(['wheel', 'mousedown'], function(e) {
        if (e.get('type') == 'wheel') {
            if (!ctrlKey) { // Ctrl не нажат, показываем уведомление
                $('#ymap_ctrl_display').fadeIn(300);
                ctrlMessVisible = true;
                clearTimeout(timer); // Очищаем таймер, чтобы продолжать показывать уведомление
                timer = setTimeout(function() {
                    $('#ymap_ctrl_display').fadeOut(300);
                    ctrlMessVisible = false;
                }, 1500);
            }
            else { // Ctrl нажат, скрываем сообщение
                $('#ymap_ctrl_display').fadeOut(100);
            }
        }
        if (e.get('type') == 'mousedown' && ctrlMessVisible) { // Скрываем уведомление при клике на карте
            $('#ymap_ctrl_display').fadeOut(100);
        }
    });
    
    // Обрабатываем нажатие на Ctrl
    $(document).keydown(function(e) {
        if (e.which === 17 && !ctrlKey) { // Ctrl нажат: включаем масштабирование мышью
            ctrlKey = true;
            myMap.behaviors.enable('scrollZoom');
        }
    });
    $(document).keyup(function(e) { // Ctrl не нажат: выключаем масштабирование мышью
        if (e.which === 17) {
            ctrlKey = false;
            myMap.behaviors.disable('scrollZoom');
        }
    });
}




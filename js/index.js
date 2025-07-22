//slideChange

// alert('연결!')

var pageCount = 0;
var total;

var stat = 0;

$(document).ready(function () {

    total = $('.page').length;
    console.log('총 페이지 갯수: ' + total);

    $(document).on('mousewheel DOMMouseScroll', function () {

        if (stat === 1) return false;
        stat = 1;

        var evt = window.event;
        console.log(evt);

        var delta = evt.wheelDelta ? evt.wheelDelta : evt.detail;
        console.log('마우스휠 델타값: ' + delta);

        if (/FireFox/i.test(navigator.userAgent)) {
            delta = -evt.detail;
            console.log('파이어폭스 detail: ' + delta);
        }

        if (delta < 0) {
            pageCount++;
            if (pageCount === total) pageCount = total - 1;
        } else {
            pageCount--;
            if (pageCount === -1) pageCount = 0;
        }

        console.log('현재 페이지번호: ' + pageCount);

        var pageTop = $('.page').eq(pageCount).offset().top;
        console.log('페이지 offset: ' + pageTop);

        $('html, body').animate({
            scrollTop: pageTop + 'px'
        }, 800, function () {
            stat = 0;

            menuChg();
        });
        
    });

    $('.gnb a, .side-pager a').on('click', function (e) {
            e.preventDefault();

            var idx = $(this).parent().index();
            console.log('클릭된 a의 부모(li) index값: ' + idx);

            pageCount = idx;
            console.log('변경된 page번호: ' + pageCount);
            

            var pageTop = $('.page').eq(pageCount).offset().top;
            

            $('html, body').animate({
                scrollTop: pageTop
            }, 800);

            menuChg();
        });
});

$(document).ready(function(){

    /*   
    
    mousewheel 이벤트
    1. 총 페이지 갯수 읽어오기
    2. 휠 이벤트 핸들러 제어하기 - 입장확인
    3. 브라우저 구분하기 - 발생한 이벤트 객체확인
    4. wheelDelta 값 구하기 - 브라우저별로 구분해서 값 반환하기
    5. 파이어폭스 브라우저를 위한 처리
    6. 마우스휠 이벤트로 페이지 이동하기
    7. 이동한 페이지 위치 확인 -> 스크롤의 위칫값으로 확인
    8. 페이지 이동
    9. 함수 호출

    click 이벤트

    1. a의 기본기능 막기
    2. 클릭된 메뉴와 현재 페이지 번호 일치시키기
    3. 스크롤 이동거리 구하기
    4. 페이지 이동
    5. 함수 호출

    */
    
});


function menuChg (){
    $('.gnb li').eq(pageCount).addClass('on').siblings().removeClass('on');
    $('.side-pager li').eq(pageCount).addClass('on').siblings().removeClass('on');
}
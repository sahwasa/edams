$(function(){
  /*calendar*/
  $.datepicker.setDefaults({
    buttonImageOnly: true,
    showOn: "both",
    buttonImage: "../images/btn_calendar.png",
    changeMonth: true,
    changeYear: true,
    numberOfMonths: 1,
    regional : ["ko"],
    dateFormat : "yy-mm-dd"
  });
  $( "[dataformat='datepic']" ).datepicker({
    buttonText: "날짜를 선택해주세요."
  });
  var from = $( "[dataformat='from']" ).datepicker({
    buttonText: "시작날짜를 선택해주세요.",
    onClose: function( selectedDate ) {
      var getName=$(this).attr('name');
      $("input[name='"+ getName +"'].to").datepicker( "option", "minDate", selectedDate );
    }  
  });
  var to = $( "[dataformat='to']" ).datepicker({
    buttonText: "종료날짜를 선택해주세요.",
    onClose: function( selectedDate ) {
      var getName=$(this).attr('name');
      $("input[name='"+ getName +"'].from").datepicker( "option", "maxDate", selectedDate );
    }
  });

  // tab
  var tabBtn = $('[tabBtn] li'),
    tabBtnFirst = $('[tabBtn]').find('li:first'),
    tab_conts = $('[tabConts]');
  
  function tabInit(){
    tabBtnFirst.addClass('on');
    tab_conts.children('[tabCont]').hide();
    tab_conts.children('[tabCont]:first').show();
    jqgridInit();
  }
  tabBtn.on('click',function(e){
    e.preventDefault();
    var cur = $(this).index(),
        thisBtns = $(this).parents('[tabBtn]');
        thisCont =  thisBtns.next('[tabConts]').children('[tabCont]');
    thisBtns.find('li').removeClass('on');
    $(this).addClass('on');
    thisCont.hide();
    thisCont.eq(cur).show();
    jqgridInit();
  });    
  tabInit();

  // pop
  var popBtn = $('[openpop]');
  popBtn.on('click',function(){
    var target = $(this).attr('openpop');
    $('#'+target).show();
  })
  var closePop = $('[closePop]');
  closePop.on('click',function(){
    $(this).parents('.pop_overlay').hide();
  })

  // accordion
  $('[role="acc"] > div').accordion({
    header : "h4",
    collapsible: true,
    heightStyle: "content",
    icons: {
      "header": "ui-icon-caret-1-e",
      "activeHeader": "ui-icon-caret-1-s"
    },
    // active: true
  });
  
});
function jqgridInit(){
  $('.jq-grid').each(function(){
    $(this).setGridWidth($(this).parents('.tbl_wrap').width() - 2);
  });
}
$(window).on('resize', function() {
  jqgridInit();
});

function tblBtn(cellValue, options, rowdata, action) {
  var html, txt = "";
  switch (cellValue) {
    case "edit":
      txt = "edit";
      break;
    case "del":
      txt = "del";
      break;
    case "dtl":
      txt = "dtl";
      break;
    case "down":
      txt = "down";
      break;
    case "file":
      txt = "file";
      break;
    default:
      txt = "none";
  }
  html = '<button type="button" class="axi btn_' + txt + '"></button>';
  return html;
}

function tagAxi(cellValue, options, rowdata, action) {
  var html, txt = "";
  switch (cellValue) {
    case "ok":
      txt = "ok";
      break;
    case "add":
      txt = "add";
      break;
    case "del":
      txt = "del";
      break;
    case "reject":
      txt = "reject";
      break;
    case "help":
      txt = "help";
      break;
    case "cancel":
      txt = "cancel";
      break;
    default:
      txt = "none";
  }
  html = '<button type="button" class="axi btn_' + txt + '"></button>'; 
  return html;
}

function evtDivision(cellValue, options, rowdata, action) {
  var html, txt = "";
  switch (cellValue) {
    case "i_safe":
      txt = "안전";
      break;
    case "i_needcheck":
      txt = "점검필요";
      break;
    case "i_ing":
      txt = "수행중";
      break;
    case "i_unperformed":
      txt = "미수행";
      break;
    case "evt5":
      html = '<button type="button" class="btn btn_s btn_redline">실행</button>';
      break;
    default:
      txt = cellValue;
  }
  if(cellValue != "evt5") html = '<span class="i_status ' + cellValue + '">' + txt + '</span>';
  
  return html;
}

function evtDivision2(cellValue) {
  var html, txt = "";
  switch (cellValue) {
    case "i_safe":
      txt = "안전";
      break;
    case "i_needcheck":
      txt = "점검필요";
      break;
    case "i_waiting":
      html = '평가 대기중</p>'+'<button type="button" class="btn btn_s btn_redline">취소</button>';
      break;
    case "i_ing":
      html = '<p>평가중</p>';
      break;
    default:
      txt = cellValue;
  }
  if(cellValue != "i_ing") html = '<span class="btn_s i_status ' + cellValue + '">' + txt + '</span>';
  
  return html;
}

function useBtn(cellValue){
  var html = "";
  if(cellValue == "checked"){
    html = `<div class="toggle_switch">
    <input type="checkbox" id="chkTog"` + cellValue + `>
    <label for="chkTog">
      <span class="toggle_track"></span>
    </label>
  </div>`;
  }else{
    html = `<div class="toggle_switch">
    <input type="checkbox" id="chkTog">
    <label for="chkTog">
      <span class="toggle_track"></span>
    </label>
  </div>`
  }
  return html;
}

function useBtn(cellValue) {
  var html, txt = "";
  switch (cellValue) {
    case "case1":
      txt = "case1";
      break;
    case "case2":
      txt = "case2";
      break;
    default:
      txt = "none";
  }
  html = '<button class="alignC usage ' + txt + '"></button>'; 
  return html;
}
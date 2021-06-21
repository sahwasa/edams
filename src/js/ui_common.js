$(function(){

  // slectlist evt
  var selList = $('[role="checklist"]'),
      selBtn = selList.find('input'),
      allBtn = $('[role="all"]');    
  selBtn.each(function(){
    if($(this).prop('checked')) $(this).parent('label').addClass('on');
  });
  selBtn.on('change', function(){
    var sel = $(this),
        selP = sel.parents('ul');
      addOn(sel);
      allEvt(selP);
  });
  allBtn.on('change',function(){
    var all = $(this);
    addOn(all);
  })
  function addOn(sel){
    if(sel[0].type === 'radio'){
      sel.parents('ul').find('label').removeClass('on');
    }
    (sel.prop('checked')) ?
      sel.parents('label').addClass('on') :
      sel.parents('label').removeClass('on');
  }
  function allEvt(selP){
    var checkLeng = selP.find(':checkbox:checked').length,
        allLeng = selP.find(':checkbox').length,
        thisAll = selP.prev('label').find('[role="all"]');       
    (checkLeng === allLeng) ?
    thisAll.prop('checked',true).parents('label').addClass('on') :
    thisAll.prop('checked',false).parents('label').removeClass('on');
  }
  allBtn.on('change',function(){
    var sel = $(this),
        selUl = $(this).parent('label').next('ul'),
        selTxt = $(this).next('.txt');
    if(sel.prop('checked')){
      selUl.find(':checkbox').prop('checked',true);
      selUl.find('label').addClass('on');
      selTxt.text('ON')
    }else{
      selUl.find(':checkbox').prop('checked',false);
      selUl.find('label').removeClass('on');
      selTxt.text('OFF')
    }
  });

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

  // pop_open
  var popBtn = $('[openpop]');
  popBtn.on('click',function(){
    var target = $(this).attr('openpop');
    $('#'+target).show();
  })

  var closePop = $('[closePop]');
  closePop.on('click',function(){
    $(this).parents('.pop_overlay').hide();
  })

  $('.btn_toggle').on('click',function(e){
    e.preventDefault();
    var cur = $(this).attr('datavalue');
    if($(this).attr('disabled') == 'disabled') return false;
    if(cur == 'on'){
      $(this).attr('datavalue','off');
    }else{
        $(this).attr('datavalue','on');
    }
  })

  // var modal= $(".pop_wrap");
  // modal.draggable({
  //   handle: ".pop_tit",
  //   containment: "parent",
  //   scroll:false,
  //   cursor:'move'
  //  });
  
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

    /* fileDeco */
  $('[role="fileAdd"]').change(function(){
    var fileAdd = $(this);
    fileAdd.parent('span').prev('[role="filePath"]').val(fileAdd.val());
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

var firsttime=0;
var nc=-1;
var trnd=[[0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0]];
var arrold=[0,0,0,0,0,0,0,0,0,0,0,0];
var arrnew=[0,0,0,0,0,0,0,0,0,0,0,0];
var direcs=['Const','Const','Const','Const','Const','Const','Const','Const','Const','Const','Const','Const'];
load();
function load() {
jQuery.get('mes.txt',function (data) {
var spans = document.getElementsByTagName('span');
  var arr=data.split("\n");
  if (nc==2) {
    var x0=new Date(trnd[0][12]).getTime()/1000;
    var x1=new Date(trnd[1][12]).getTime()/1000-x0;x1=x1/3600;
    var x2=new Date(trnd[2][12]).getTime()/1000-x0;x2=x2/3600;
    var x=[0,x1,x2];
    var y=[trnd[0][0],trnd[1][0],trnd[2][0]];
    var dm_lreg=linearRegression(x,y);
    document.getElementById('dm_d').textContent=parseFloat(dm_lreg.slope).toFixed(4);
    nc=-1;
    trnd=[[0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0]];
  }
  nc=nc+1;
  for(var i = 0; i <= 12; i++){
    arrnew[i]=arr[i].split('=')[1];
    trnd[nc][i]=arrnew[i];
  }
  if (firsttime==1) {get_span_values(arrold,spans);}
  set_arrow_dir(firsttime,arrold,arrnew,spans,direcs);
  set_span_values(arrnew,spans);
  if (firsttime==0) {firsttime=1;}
},'text');
setTimeout(load, 60000);
}

function set_arrow_dir(ft,arrold,arrnew,spans,direcs) {
  for(var i = 0, l = spans.length; i < l; i++){
    if (spans[i].textContent=='Tin') {spans[i].id='tin';}
    if (spans[i].textContent=='Twb') {spans[i].id='twb';}
    if (spans[i].textContent=='Tdp') {spans[i].id='tdp';}
    if (spans[i].textContent=='RH') {spans[i].id='rh';}
    if (spans[i].textContent=='Xw') {spans[i].id='xw';}
    if (spans[i].textContent=='Hw') {spans[i].id='hw';}
    if (spans[i].textContent=='Tout') {spans[i].id='tout';}
    if (spans[i].textContent=='DQ') {spans[i].id='dq';}
    if (spans[i].textContent=='DM') {spans[i].id='dm';}
    if (spans[i].textContent=='Battery') {spans[i].id='battery';}
    if (spans[i].textContent=='Signal') {spans[i].id='signal';}
    if (spans[i].textContent=='Undf2') {spans[i].id='undf2';}
    if (spans[i].textContent=='Undf') {spans[i].id='undf';}
    if (spans[i].textContent=='time') {spans[i].id='time';}

    if (spans[i].textContent=='a') {spans[i].id='tin_d';}
    if (spans[i].textContent=='b') {spans[i].id='twb_d';}
    if (spans[i].textContent=='c') {spans[i].id='tdp_d';}
    if (spans[i].textContent=='d') {spans[i].id='rh_d';}
    if (spans[i].textContent=='e') {spans[i].id='xw_d';}
    if (spans[i].textContent=='f') {spans[i].id='hw_d';}
    if (spans[i].textContent=='g') {spans[i].id='tout_d';}
    if (spans[i].textContent=='h') {spans[i].id='dq_d';}
    if (spans[i].textContent=='i') {spans[i].id='dm_d';}
    if (spans[i].textContent=='j') {spans[i].id='battery_d';}
    if (spans[i].textContent=='k') {spans[i].id='signal_d';}
  }
  if (ft==1) {
    for(var i = 0; i <= 11; i++){
      if (i!=11) {
        if (arrold[i]<arrnew[i]) {direcs[i]='Up';}
        if (arrold[i]>arrnew[i]) {direcs[i]='Down';}
        if (arrold[i]==arrnew[i]) {direcs[i]='Const';}
      }
      if ((i==11)) {direcs[i]='Const';}
    }
  }
  document.getElementById('tin_d').textContent=direcs[0];//3-Tin-9
  document.getElementById('twb_d').textContent=direcs[1];//5-Twb-10
  document.getElementById('tdp_d').textContent=direcs[2];//7-Tdp-11
  document.getElementById('rh_d').textContent=direcs[3];//15-RH-21
  document.getElementById('xw_d').textContent=direcs[4];//17-Xw-22
  document.getElementById('hw_d').textContent=direcs[5];//19-Hw-23
  document.getElementById('tout_d').textContent=direcs[6];//27-Tout-34
  document.getElementById('dq_d').textContent=direcs[7];//29-DQ-35
  //document.getElementById('dm_d').textContent=direcs[8];//32-DM-36
  document.getElementById('battery_d').textContent=direcs[9];//40-Battery-47
  document.getElementById('signal_d').textContent=direcs[10];//42-Signal-48
}

function get_span_values(arrold,spans) {
    arrold[0]=document.getElementById('tin').textContent;//3-Tin-9
    arrold[1]=document.getElementById('twb').textContent;//5-Twb-10
    arrold[2]=document.getElementById('tdp').textContent;//7-Tdp-11
    arrold[3]=document.getElementById('rh').textContent;//15-RH-21
    arrold[4]=document.getElementById('xw').textContent;//17-Xw-22
    arrold[5]=document.getElementById('hw').textContent;//19-Hw-23
    arrold[6]=document.getElementById('tout').textContent;//27-Tout-34
    arrold[7]=document.getElementById('dq').textContent;//29-DQ-35
    arrold[8]=document.getElementById('dm').textContent;//32-DM-36
    arrold[9]=document.getElementById('battery').textContent;//40-Battery-47
    arrold[10]=document.getElementById('signal').textContent;//42-Signal-47
}

function set_span_values(arrnew,spans) {
  document.getElementById('tin').textContent=parseFloat(arrnew[0]).toFixed(1);
  document.getElementById('twb').textContent=parseFloat(arrnew[1]).toFixed(1);
  document.getElementById('tdp').textContent=parseFloat(arrnew[2]).toFixed(1);
  document.getElementById('rh').textContent=parseFloat(arrnew[3]).toFixed(1);
  document.getElementById('xw').textContent=parseFloat(arrnew[4]).toFixed(1);
  document.getElementById('hw').textContent=parseFloat(arrnew[5]).toFixed(1);
  document.getElementById('tout').textContent=parseFloat(arrnew[6]).toFixed(1);
  document.getElementById('dq').textContent=parseFloat(arrnew[7]).toFixed(1);
  document.getElementById('dm').textContent=parseFloat(arrnew[8]*200).toFixed(0);
  document.getElementById('battery').textContent=parseFloat(arrnew[9]).toFixed(1);
  document.getElementById('signal').textContent=parseFloat(arrnew[10]).toFixed(1);
  document.getElementById('undf2').textContent=parseFloat(arrnew[8]/(10000/860)*0.71*200).toFixed(0);
  document.getElementById('undf').textContent=parseFloat(arrnew[8]*0.1762*200).toFixed(0);
  document.getElementById('time').textContent="Last shot at "+arrnew[12];
}

function linearRegression(functionValuesX, functionValuesY){
  var regression = {};
  var x = functionValuesX;
  var y = functionValuesY;
  var n = y.length;
  var sum_x = 0;
  var sum_y = 0;
  var sum_xy = 0;
  var sum_xx = 0;
  var sum_yy = 0;
  for (var i = 0; i < y.length; i++) {
    sum_x += 1*x[i];
    sum_y += 1*y[i];
    sum_xy += (x[i]*y[i]);
    sum_xx += (x[i]*x[i]);
    sum_yy += (y[i]*y[i]);
  }
  regression.slope = (n * sum_xy - sum_x * sum_y) / (n*sum_xx - sum_x * sum_x);
  regression.intercept = (sum_y - regression.slope * sum_x)/n;
  regression.rSquared = Math.pow((n*sum_xy - sum_x*sum_y)/Math.sqrt((n*sum_xx-sum_x*sum_x)*(n*sum_yy-sum_y*sum_y)),2);
  //document.getElementById('dm_d').textContent='n='+n+' sum_xy='+sum_xy+' sum_xx='+sum_xx+' sum_x='+sum_x+' sum_y='+sum_y;
  return regression;
}

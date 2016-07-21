
    $(document).ready(function(){
    	
    	  $('body').attr('id', 'body_test');
    	$("#pageLoader").show(); 
    	$("#form_id").hide(); 
    	$("#link_id").hide(); 
    document.addEventListener("deviceready",onDeviceReady,false);       
});
     
		
		    var device1;			

function success(uuid)		
{		
     device1 = {uuid:uuid,device_model:"",device_platform:"",device_version:""};
     check_in_summary_page();
};		

function onResume() {
	 restartApplication();
	 }

function fail(uuid)		
{		};	
    
    
		function onDeviceReady() {
                       window.plugins.uniqueDeviceID.get(success, fail);
                       document.addEventListener("resume", onResume, false);
    }
    function check_in_summary_page(){
    document.addEventListener("backbutton", onBackKeyDown, false);
   	var element = document.getElementById('deviceProperties');
	
       var device_uuid = device1.uuid;
       var networkState = navigator.connection.type;
    if (networkState == Connection.NONE)
    {
      window.location='./first_screen.html';
               return false;
    }
     else
    {
    	
		var sch_uuid = getURLParameters('sch_uuid');
	
	
   $.ajax({
          url:"http://183.82.96.212:8095/services/session/token",
          type:"get",
          dataType:"text",
          timeout:20000,
           crossDomain: true,
          error:function (jqXHR, textStatus, errorThrown) {
        	  if(textStatus==="timeout") {
				  bootbox.dialog({
					  closeButton: false,
        			  message: "Problem connecting with server. Please try after sometime.",
        			  title: "Alert",
        			  buttons: {
        			    success: {
        			      label: "OK",
        			      className: "btn-danger",
        			      callback: function() {
        			    	  
        			    	  window.location='./server_not_available.html';
        			      }
        			    
        			    }
        			    
        			    
        			  }
        			});
					
					}
          },
          success: function (token) {   
   	var device_uuid = device1.uuid;
	var d = document.getElementById("device_uuid");
	var token =token;
	var header = "X-CSRF-TOKEN";
    $(document).ajaxSend(function(e, xhr, options) {
        xhr.setRequestHeader(header, token);
    });
	
            $.ajax({
              url: 'http://183.82.96.212:8095/m_service/m_resources/get_check_in_summary_details',
              type: "POST",
	  		  //data: 'device_uuid='+'8dc6cf319947e729',
      		  data: {sch_uuid:sch_uuid},
              dataType: "json",
              timeout:20000,
              crossDomain: true,
              
			  error: function (jqXHR, textStatus, errorThrown) {
				 
	bootbox.dialog({
		closeButton: false,
		  message: "Problem connecting with server. Please try after sometime.",
		  title: "Alert",
		  buttons: {
		    success: {
		      label: "OK",
		      className: "btn-danger",
		      callback: function() {
		  
		     }
		    }
		  }
		});
              },
              success: function (data) {
            	  $("#pageLoader").hide(); 
            	  $('body').attr('id', '');
            	  $("#form_id").show(); 
            	  $("#link_id").show(); 
 patient_name=data.checkin_data[0].patient_name;
 visit_type=data.checkin_data[0].visit_type;
 scheduled_time=data.checkin_data[0].sch_start_timestamp+' - '+data.checkin_data[0].sch_end_timestamp;
 checked_in_time=data.checkin_data[0].checked_in_time;
 checked_in_duration=data.checkin_data[0].checked_in_duration;
 check_in_timestamp=data.checkin_data[0].check_in_timestamp;
 server_time=data.server_time;
 
 
 
 
 
 /*alert("Custom Alerts");
 alert("Check in timestamp"+check_in_timestamp);
 alert("Server time"+server_time);
 */

 
 
 /* 
 var diff_times=check_in_timestamp.getDate()-server_time.getDate();
 if(diff_times>10)
	 {
	 alert("Greater than 10");
	 }
 
 */
 
 
 $("#exampleInputpatientname1").html(patient_name);
 $("#exampleInputvisittype1").html(visit_type);
 $("#exampleInputscheduledtime1").html(scheduled_time);
 $("#checked_in_time_temp").html(checked_in_time);
// alert("checked in"+checked_in_duration);
 $("#checked_in_time_dur").html(checked_in_duration);
 $("#checked_in_time_dur").val(checked_in_duration);
 $("#check_in_timestamp").val(check_in_timestamp);
 $("#server_time").val(server_time);
 
 
 
 
 var json = data;
 /*
 var patient_name = json.checkin_data[0].patient_name;
 var visit_type = json.checkin_data[0].visit_type;
 var scheduled_time = json.checkin_data[0].sch_start_timestamp+' - '+json.patientdata[0].sch_end_timestamp;
*/
  //$("#checked_in_time").val(json.checkin_data[0].checked_in_time);
	
 
  	devicesec=deviceMobileTime();
 
 var  server_time= $('#server_time').val();
 
// alert("Devicesec"+devicesec);
// alert("server time"+server_time);
 
 var devicesec=hmsToSecondsOnly(devicesec);
 
 var server_time=hmsToSecondsOnly(server_time);
 
			// alert("devicesec after converting"+devicesec);
			// alert("server_time after converting"+server_time);
			 
 if(devicesec-server_time > 1800 || devicesec-server_time < -2)
	{
	//alert("inside condition");
	  $('#hidden_timecheck').val('1');
	   $('#duration_time_temp').html('Improper Time');
	   $('#time1').html('Improper Time'); 
	$("#proceed_to_check_out").prop('disabled', true);
		  
	}
}

});
			
		}
		});
		}
		}
		window.onload = function(){date()}, setInterval(function(){date()}, 1000);


		 function onBackKeyDown(e) {
			 
			 e.preventDefault();
		 
		}
	 
		
		 function timezoneDetect(timezone)
		 {
			   var date = new Date();
				//alert("time zones"+date.toTimeString());
				var removev=date.toTimeString();
				var v=removev.replace(/\s/g, '');
				var zonetiming = v.substr(0,v.indexOf('G'));
				zone=v.match(/\((.*?)\)/)[1];
				
			 if(timezone=='Asia/Calcutta')
				{
				 mobiletimezone='IST';
				}
			 else if(timezone=='America/New_York')
				 {
				 mobiletimezone='EST';
				 }
			 
			 if(zone==mobiletimezone)
				 {
				 zonedetection='true';
				 }
			 else
				{
				 zonedetection='false';
				} 
			 
			 
			 return zonedetection;
			 
		 }
		
		function date() {
			

			 var devicesec=deviceMobileTime();
			 
			 var  server_time= $('#server_time').val();
			 
			 var devicesec=hmsToSecondsOnly(devicesec);
			 
			 var server_time=hmsToSecondsOnly(server_time);
			 
			 if(devicesec-server_time==-6.666)
				{
				 
				  $('#hidden_timecheck').val('1');
				  $('#duration_time_temp').html('Improper Time'); 
				  $('#time1').html('Improper Time'); 
				  $("#proceed_to_check_out").prop('disabled', true);
				  
				}
				else{
					var  check= $('#hidden_timecheck').val();
					 if(check!=1)
				{
						 
					
					
					//$("#proceed_to_check_out").prop('disabled', false);
			
			
			
    var time = new Date();
    var hours = addZero(time.getHours());
    var minutes = addZero(time.getMinutes());
   
    var current_time = hours + ":" + minutes;
   
    //now = now.getHours()+':'+now.getMinutes()+':'+now.getSeconds();
   
    //$('#time').html(now);
    $('#time1').html(current_time);
   var  checked_in_time_temp= $('#checked_in_time_dur').val();
    if(checked_in_time_temp!='')
     {

	
var d1 = moment(checked_in_time_temp,"YYYY-MM-DD HH:mm");
var d3 = moment();
 var a=d3.diff(d1);

  //Time difference in milli seconds
 // document.write("Your Operation took  " + (d2.getTime() - d1.getTime()) + " milliseconds");
   checkintimediff=msToTime(a);
   
   $('#duration_time_temp').html(checkintimediff);
   var  check_in_timestamp= $('#check_in_timestamp').val();
   //alert("check in timestamp"+ check_in_timestamp);
  var zone=timezoneDetect(check_in_timestamp);
  //alert("zone detect"+zone);
   if(zone=='false')
    {
	   
	   $('#duration_time_temp').html('Improper Timezone');
    }
  
     }
	 }
	 }
	 
	 
   
}
		function addZero(i) {
		    if (i < 10) {
		        i = "0" + i;
		    }
		    return i;
		}
function msToTime(duration) {
    var milliseconds = parseInt((duration%1000)/100)
        , seconds = parseInt((duration/1000)%60)
        , minutes = parseInt((duration/(1000*60))%60)
        , hours = parseInt((duration/(1000*60*60))%24);

    var hours = addZero(hours);
    var minutes = addZero(minutes);
    return hours + ":" + minutes;
}



function deviceMobileTime() {
    var d = new Date();
  
    var h = addZero(d.getHours());
    var m = addZero(d.getMinutes());
    var s = addZero(d.getSeconds());
    device_time = h + ":" + m + ":" + s;
    return device_time;
}

function hmsToSecondsOnly(str) {
    var p = str.split(':'),
        s = 0, m = 1;

    while (p.length > 0) {
        s += m * parseInt(p.pop(), 10);
        m *= 60;
    }

    return s;
}


function timezoneDetect(timezone)
{
	   var date = new Date();
		//alert("time zones"+date.toTimeString());
		var removev=date.toTimeString();
		var v=removev.replace(/\s/g, '');
		var zonetiming = v.substr(0,v.indexOf('G'));
		zone=v.match(/\((.*?)\)/)[1];
		
	 if(timezone=='Asia/Calcutta')
		{
		 mobiletimezone='IST';
		}
	 else if(timezone=='America/New_York')
		 {
		 mobiletimezone='EST';
		 }
	 
	 if(zone==mobiletimezone)
		 {
		 zonedetection='true';
		 }
	 else
		{
		 zonedetection='false';
		} 
	 
	 
	 return zonedetection;
	 
}





function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function deviceMobileTime() {
    var d = new Date();
  
    var h = addZero(d.getHours());
    var m = addZero(d.getMinutes());
    var s = addZero(d.getSeconds());
    device_time = h + ":" + m + ":" + s;
    return device_time;
}

function hmsToSecondsOnly(str) {
    var p = str.split(':'),
        s = 0, m = 1;

    while (p.length > 0) {
        s += m * parseInt(p.pop(), 10);
        m *= 60;
    }

    return s;
}





			function getURLParameters(paramName)
{
    var sURL = window.document.URL.toString();
    if (sURL.indexOf("?") > 0)
    {
        var arrParams = sURL.split("?");
        var arrURLParams = arrParams[1].split("&");
        var arrParamNames = new Array(arrURLParams.length);
        var arrParamValues = new Array(arrURLParams.length);

        var i = 0;
        for (i = 0; i<arrURLParams.length; i++)
        {
            var sParam =  arrURLParams[i].split("=");
            arrParamNames[i] = sParam[0];
            if (sParam[1] != "")
                arrParamValues[i] = unescape(sParam[1]);
            else
                arrParamValues[i] = "No Value";
        }

        for (i=0; i<arrURLParams.length; i++)
        {
            if (arrParamNames[i] == paramName)
            {
                //alert("Parameter:" + arrParamValues[i]);
                return arrParamValues[i];
            }
        }
        return "No Parameters Found";
    }
}
			
				
			
var start = document.getElementById("checked_in_time").value;
var end = document.getElementById("time").value;

function diff(checked_in_time, time) {
    checked_in_time = checked_in_time.split(":");
    time = time.split(":");
    var checked_in_timeDate = new Date(0, 0, 0, start[0], start[1], 0);
    var timeDate = new Date(0, 0, 0, end[0], end[1], 0);
    var diff = timeDate.getTime() - checked_in_timeDate.getTime();
    var hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    var minutes = Math.floor(diff / 1000 / 60);
    
    return (hours < 9 ? "0" : "") + hours + ":" + (minutes < 9 ? "0" : "") + minutes;
}

document.getElementById("diff").value = diff(start, end);
								


function exitFromApp()
{
	$(".proceed_to_check_out_button").prop('disabled', true);

	$(".show_schedules_button").prop('disabled', true);
	$(".exit_app").prop('disabled', true);

    window.location='./logout.html';
}




function goToCheckOut()
{
	
	//var sch_uuid = getURLParameters('sch_uuid');
	
	//window.location.href="check_out.html?sch_uuid="+sch_uuid;
	$(".proceed_to_check_out_button").prop('disabled', true);
	 $('#hidden_timecheck').val('1');
	  //document.getElementsByClassName("show_schedules_button").disabled = true;
	
	$(".show_schedules_button").prop('disabled', true);
	$(".exit_app").prop('disabled', true);

  			var options =  { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true };
			navigator.geolocation.getCurrentPosition(ShowPosition, ShowError, options);
	
}


function ShowPosition(position) {

var sch_uuid = getURLParameters('sch_uuid');
	
	window.location.href="check_out.html?sch_uuid="+sch_uuid;

    //window.location= "check_out.html?sch_uuid="+sch_uuid+'&visit_uuid='+visit_uuid+'&visit_type_id='+visit_type_id+'&patient_uuid='+patient_uuid+'&visit_date='+obj.visit_date+'&employee_uuid='+obj.employee_uuid+'&business_uuid='+obj.business_uuid+'&user_id='+user_id;

}
function ShowError(error) {
	
		 bootbox.dialog({
	closeButton: false,
	  message: "Location is not enabled. Kindly turn it on by going to Settings-->Privacy-->Location Services-->On.",
	  title: "Need access to Location",
	  buttons: {
	    success: {
	      label: "Settings",
	      className: "btn-primary",
	      callback: function() {
	    	   cordova.plugins.diagnostic.switchToSettings(successCallback, errorCallback);
	      }
	    },
	    danger: {
	      label: "Cancel",
	      className: "btn-warning",
	      callback: function() {
	        
	      }
	    }
	    
	  }
	});
		 
	
	
	$(".proceed_to_check_out_button").prop('disabled', false);
	$(".show_schedules_button").prop('disabled', false);
	$(".exit_app").prop('disabled', false);
	 
//window.MainActivity.showSettingsAlert();

}

 function successCallback()
		 {
		 
		 }
		 
		 function errorCallback()
		 {
		 
		 }


function go_to_show_schedules()
{
	$(".proceed_to_check_out_button").prop('disabled', true);
	$(".show_schedules_button").prop('disabled', true);
	$(".exit_app").prop('disabled', true);
	window.location = 'show_other_schedules.html';
}

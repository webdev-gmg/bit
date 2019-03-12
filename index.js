
var statsDate="2019-03-12"
var caloriesLeft = ""
var goalsCaloriesOut=""
var activityCalorie = ""
var token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMkRLR1ciLCJzdWIiOiI1V1RYUTciLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyc29jIHJhY3QgcnNldCBybG9jIHJ3ZWkgcmhyIHJudXQgcnBybyByc2xlIiwiZXhwIjoxNTUyNDUyODM4LCJpYXQiOjE1NTI0MjQwMzh9.61sjy9Sxmd0rBTMLAZbwgKADc0l7_ojcW9bsfAJc1l4"
setInterval(activityStepsWeek(), 3000);
setTimeout(runStats(statsDate),3000)
//$('#runStats').on('click',runStats)
$('#searchdate').on('change',function(){
    statsDate = $('#searchdate').val();
    runStats(statsDate)
})

function runStats(statsDate){
    $('#dispDate').text(statsDate)
    if(statsDate != "2019-03-12")
    {
    statsDate = $('#searchdate').val();
    }
    //event.preventDefault()
var settings = {
    "url": `https://api.fitbit.com/1/user/-/activities/date/${statsDate}.json`,
    "method": "GET",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": token,
    }

  }
  
  $.ajax(settings).done(function (response) {
    console.log(response);


   activityCalorie = response.summary.caloriesOut
   goalsCaloriesOut = response.goals.caloriesOut
    $('#caloriesOut').text(activityCalorie)
    $('#goalsCaloriesOut').text("/" + goalsCaloriesOut)
    foodLogs(response.summary.caloriesOut);
    goalsCaloriesOut = response.goals.caloriesOut
    if(goalsCaloriesOut > activityCalorie)
    {
    $('#caloriesOut').css( "color", "red" );
    }

    else{
        $('#caloriesOut').css( "color", "green" );
    }

  });
 

}

$( document ).ready(function() {
    $("#progress").width(100)
  });



function foodLogs(activityCalorie){
var settings = {
    "url": `https://api.fitbit.com/1/user/-/foods/log/date/${statsDate}.json`,
    "method": "GET",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": token,
    }
  }
 
  $.ajax(settings).done(function (response) {
    //console.log(response);
    $('#foodCalories').text(response.summary.calories)
   
    caloriesLeft =  activityCalorie-response.summary.calories
    $('#remainingCalories').text(caloriesLeft)
    console.log(caloriesLeft)
  });}



  var url = `https://api.fitbit.com/1/user/-/foods/log/date/${statsDate}.json`;
  axios.get(url)
  .then(data =>console.log(data))
  .catch(err => console.log())


  

function activitySteps(){
    var label =[];
var dateTime = [];
  var settings = {
    "url": "https://api.fitbit.com/1/user/-/activities/steps/date/today/1w.json",
    "method": "GET",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": token
    }
  }
 
  $.ajax(settings).done(function (response) {
    
  //console.log(response[0][1][0].dateTime)
 const entries = Object.entries(response)
// console.log(entries[0][1])
 var a = entries[0][1]

 for(i=0;i<a.length;i++)
 {
   label.push(parseInt(a[i].value)) 
   dateTime.push(a[i].dateTime)
 //  console.log(a[i].value)  
 //console.log(label)
 }
 //console.log(label)
 //console.log(dateTime)
 var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: dateTime,
        datasets: [{
           label:"Steps",
           backgroundColor : getRandomColor(),
            // backgroundColor:["rgba(255, 99, 132, 0.2)","rgba(255, 159, 64, 0.2)","rgba(255, 205, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(54, 162, 235, 0.2)","rgba(153, 102, 255, 0.2)","rgba(201, 203, 207, 0.2)"],
            borderColor:getRandomColor(),
            data: label,
            beginAtZero:true,
            borderWidth: 1
        }]
    },

    // Configuration options go here
    options: {responsive: false,scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true
            }
        }]
    }}
});
  });

}
//activitySteps()
//setInterval(activitySteps, 7000);


function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 6)];
    }
    return color;
}



function best(){
    var settings = {
        "url": `https://api.fitbit.com/1/user/-/activities.json`,
        "method": "GET",
        "headers": {
          "Content-Type": "application/json",
          "Authorization": token,
        }
      }
     
      $.ajax(settings).done(function (response) {
        //console.log(response);
       
        console.log(response.best)
        $('#totalDistanceDate').text(response.best.total.distance.date)
        $('#totalDistanceValue').text(Math.round(response.best.total.distance.value)+"miles")
        $('#totalStepsDate').text(response.best.total.steps.date)
        $('#totalStepsValue').text(response.best.total.steps.value)

        $('#lifetimeDistanceValue').text(response.lifetime.total.distance + "miles")
        $('#lifetimeStepsValue').text(response.lifetime.total.steps)
      });}
    best();







//Weekly
    function activityStepsWeek(){
        var label =[];
    var dateTime = [];
      var settings = {
        "url": "https://api.fitbit.com/1/user/-/activities/steps/date/today/1w.json",
        "method": "GET",
        "headers": {
          "Content-Type": "application/json",
          "Authorization": token
        }
      }
     
      $.ajax(settings).done(function (response) {
        
      //console.log(response[0][1][0].dateTime)
     const entries = Object.entries(response)
    // console.log(entries[0][1])
     var a = entries[0][1]
    
     for(i=0;i<a.length;i++)
     {
       label.push(parseInt(a[i].value)) 
       dateTime.push(a[i].dateTime)
     //  console.log(a[i].value)  
     //console.log(label)
     }
     //console.log(label)
     //console.log(dateTime)
     var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',
    
        // The data for our dataset
        data: {
            labels: dateTime,
            datasets: [{
               label:"Steps",
               backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(54, 163, 235, 0.2)'
                
            ],
                // backgroundColor:["rgba(255, 99, 132, 0.2)","rgba(255, 159, 64, 0.2)","rgba(255, 205, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(54, 162, 235, 0.2)","rgba(153, 102, 255, 0.2)","rgba(201, 203, 207, 0.2)"],
                borderColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(54, 163, 235, 0.2)'
                    
                ],
                data: label,
                beginAtZero:true,
                borderWidth: 2
            }]
        },
    
        // Configuration options go here
        options: {responsive: false,scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }}
    });
      });
    
    }
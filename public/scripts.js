var map = new Datamap({
    
    element: document.getElementById('mapCanvas'),
    scope: 'usa',


    done: function(datamap) {
        datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {

            document.getElementById('state').innerHTML = geography.properties.name;
        });
    }

});


function appendDate(date){
if (date <= 9){return ("0" + date)}
return date;

}


function getDateString(month, day, year){
    month = month + 1;
    month = appendDate(month);
    day = appendDate(day);

    return (month + "-" + day + "-" + year + ".csv")

}

function createDataObj(data){
    var DataObj = new Object();
    for (var i = 0; i < 18; i++){
        DataObj[data[i]] = "";
    }
    return DataObj;
}


function mapStateObj(dataArray, currentIndex, indexes, currentObj){
    for (var i = 0; i < 18; i++){
        currentObj[indexes[i]] = dataArray[currentIndex + i]
    }
    return currentObj;
}


function indexArray(dataArray){
    var indexList = new Array();
    for (var i = 0; i < 18; i++){
        indexList.push(dataArray[i])
    }
    return indexList;
}




function ajaxCallback(data){

    

    var dataArray = data.split(/[\n,]/);
    var indexes = indexArray(dataArray);
    console.log(indexes);

    var stateLists = new Array();

    // 18 is the difference between states
    for (var i = 18; i < dataArray.length; i = i + 18){
        var currentObj = createDataObj(dataArray);
        currentObj = mapStateObj(dataArray, i, indexes, currentObj);
        stateLists.push(currentObj);
        console.log(currentObj);
    }

    var totalDeaths = 0;
    for (var i = 0; i < stateLists.length - 1; i++){
        totalDeaths += parseInt(stateLists[i].Deaths);


    }
    console.log(totalDeaths);
    




}

function AJAXRequest(callback, date){
    var siteURL = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports_us/";
    $.ajax({
        url: siteURL + date,
        type: 'GET',
        dataType: 'text',
        
        success: function(data){
            callback(data);

        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest + " " + textStatus + " " + errorThrown);
         }
    });

}


$(document).ready(function(){
console.log("Jquery Loaded")

});




// var FOO = (function() {
//     var my_var = 10; //shared variable available only inside your module

//     function bar() { // this function not available outside your module
//         alert(my_var); // this function can access my_var
//     }

//     return {
//         a_func: function() {
//             alert(my_var); // this function can access my_var
//         },
//         b_func: function() {
//             alert(my_var); // this function can also access my_var
//         }
//     };

// })();








var newFunc = (function(){
    var item = 10;
    function bar(){
        return 1;
    }
    return {
        item1: function(){



        },
        item2: function(){



        }
    };






})();




















var date = new Date();

var year = date.getFullYear();
var month = date.getMonth();
var day = date.getDate();
day = day - 1;
var dateString = getDateString(month, day, year);

console.log(dateString);

AJAXRequest(ajaxCallback, dateString);


google-spreadsheet-util
=======================

Javascript utility class for working with data from published Google Spreadsheets.

Provide a URL in CSV format:
```javascript
var sample_url = "https://docs.google.com/spreadsheet/pub?key=0AsMGn_2Fl4CEdG1sQ1VtemtnZHRDT3pna1RzR0R6Q3c&output=csv";

var success = function(){
  console.log(googleSpreadsheet);

  var iterator = googleSpreadsheet.getIterator();
  do{
    console.log(iterator.getRow(true));
  } while (iterator.next());
};

var fail = function(){
  console.log("fail");
};

var googleSpreadsheet = new GoogleSpreadsheet(sample_url, success, fail);
```
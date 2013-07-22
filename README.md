google-spreadsheet-util
=======================

Javascript utility class for working with data from published Google Spreadsheets.

Row 1 of the spreadsheet should be the column headers.

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

Specific rows can be found by calling findRow on the GoogleSpreadsheet instance, passing the header and value to be matched against. Returns null if there are no matches, otherwise returns the row as an array. Currently doesn't support matching multiple rows.

Data from the spreadsheet can be read row-by-row using the iterator object returned by calling getIterator on the GoogleSpreadsheet instance. The iterator supports the following operations:

* getRow - read data from current row index as an array. Pass true to get the data as an object using row 1 column headers as property names.
* next - advance the row index by 1. Returns false if at the last row.
* prev - reduce the row index by 1. Returns false if at the first row.
* first - reset the row index to 0.
* last - set the row index to the last row value.
/**
* Wrapper for parsing Google spreadsheet data
*/

GoogleSpreadsheet = (function($){

	/**
	* Constructor.
	*
	* @param url Link to CSV version of published Google Spreadsheet
	*/
	var GoogleSpreadsheet = function(url, success, failure){
		this.headers;
		this.rows;
		this.status = 'loading';

		function ajaxSuccess(){
			var instance = this;
			return function(data){
				processData.call(instance, data);
				success();
			}
		};

		function ajaxFailure(){
			var instance = this;
			return function(){
				showFeedError.call(instance);
				failure();
			}
		};

		$.ajax({url:url,
			dataType: "text",
			success: ajaxSuccess.call(this),
			error: ajaxFailure.call(this),
			timeout: 1000
		});
	}

	GoogleSpreadsheet.prototype.getIterator = function() {
		return new GoogleSpreadsheetIterator(this);
	};

	GoogleSpreadsheet.prototype.findRow = function(header, value) {
		var headerIndex = this.headers.indexOf(header);
		if (headerIndex < 0){
			return null;
		}

		for (var i = 0, l = this.rows.length; i < l; i++){
			var row = this.rows[i];
			if (row[headerIndex] == value){
				return row;
			}
		}
		return null;
	};

	
	var GoogleSpreadsheetIterator = function(spreadsheet){
		this.spreadsheet = spreadsheet;
		this.index = 0;
	}

	GoogleSpreadsheetIterator.prototype.getRow = function(asObject) {
		var row = this.spreadsheet.rows[this.index];
		if (asObject){
			var rowData = {},
				headers = this.spreadsheet.headers;
			for (var i=0, l= headers.length; i < l; i++){
				rowData[headers[i]] = row[i];
			}
			row = rowData;
		}
		return row;
	};

	GoogleSpreadsheetIterator.prototype.next = function() {
		if (this.index < this.spreadsheet.rows.length -1){
			this.index++;
			return true;
		}
		return false;
	};

	GoogleSpreadsheetIterator.prototype.prev = function(){
		if (this.index > 0){
			this.index--;
			return true;
		}
		return false;
	}

	GoogleSpreadsheetIterator.prototype.first = function() {
		this.index = 0;
	};

	GoogleSpreadsheetIterator.prototype.last = function() {
		this.index = this.spreadsheet.rows.length - 1;
	};


	/* Private */

	function processData(data){
		this.status = 'processing';

		// Convert csv data to json
		var lines = data.split('\n');
		var headers = lines[0].split(',');
		var rows = [];
		for (var i=1; i < lines.length; i++){
			var row = lines[i].split(',');
			rows.push(row);
		}

		this.headers = headers;
		this.rows = rows;
		this.status = 'ready';
	}

	function showFeedError(){
		this.status = 'error';
		console.log('Error');
	}

	/* Export */

	return GoogleSpreadsheet;
	
})(jQuery)

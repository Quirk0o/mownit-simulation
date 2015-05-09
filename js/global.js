
$(function () {

  var papaConfig = {
    delimiter: '',
    newline: '',
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    complete: function (res) {
      loadChart(res.data, res.meta.fields);
    },
    error: function (err) {
      console.error(err);
    }
  };

  function parseFile(file) {
    Papa.parse(file, papaConfig);
  }

  $('#file').change(function () {
    var file = this.files[0];
    parseFile(file);
  });

  $('#drop').on('dragenter', function (e) {
    e.stopPropagation();
    e.preventDefault();
  });

  $('#drop').on('dragover', function (e) {
    e.stopPropagation();
    e.preventDefault();
  });

  $('#drop').on('drop', function (e) {
    e.preventDefault();
    var file = e.originalEvent.dataTransfer.files[0];

    parseFile(file);
  });

  function loadChart(data, headers) {
    
    var series = [];
    headers.forEach(function (header) {
      var sdata = [];
      data.forEach(function (val) {
        sdata.push(val[header]);
      });
      series.push({
        name: header,
        data: sdata
      })
    });

    console.log(series);
    $('#chart').highcharts({
      chart: {
        type: 'scatter'
      },
      title: {
        text: 'Simulation Results'
      },
      xAxis: {
        title: {
          text: 'Input data'
        }
      },
      yAxis: {
        title: {
          text: 'Output data'
        }
      },
      series: series
    });
  }
});

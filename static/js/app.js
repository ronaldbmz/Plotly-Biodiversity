d3.json("samples.json").then((importedData) => {
  
  console.log(importedData);

  //*****************getting names for dropdown*****************
  var names = importedData.names;
  console.log(names);
  
  //building logic for dropdown values
  var html = "";
  for (var i = 0; i < names.length; i++) {
	html+="<option value=" + names[i] + ">" + names[i] + "</option>";
    }
  console.log(html)
  d3.select(".well>select").html(html);

  //*****************filter data based on selected dropdown value*****************
  function filterData(data, inputValue) {
		
	  var dropdownMenu = d3.select("#selDataset");
	  // Assign the value of the dropdown menu option to a variable
	  var subject_id = dropdownMenu.property("value");
	  
	  if (subject_id === ""){subject_id = "940"}
	
	  return data.id === subject_id;
    }
  
    function filterMetaData(data, inputValue) {
		
        var dropdownMenu = d3.select("#selDataset");
        // Assign the value of the dropdown menu option to a variable
        var subject_id = dropdownMenu.property("value");
        
        if (subject_id === ""){subject_id = "940"}
      
        return data.id === parseInt(subject_id);
      }
  
    //*******************************The below code is to show the charts without interacting with dropdown*************/
  samples = importedData.samples
  console.log("samples")
  console.log(samples)
  var rows = samples.filter(filterData);
  console.log(rows)

  var otu_ids = rows[0].otu_ids.slice(0, 10);

  console.log(otu_ids)
  var sample_values = rows[0].sample_values.slice(0, 10);
  console.log(sample_values)
  var otu_labels = rows[0].otu_labels.slice(0, 10);
  
  var otu_ids_text = [];
  for (var i = 0; i < otu_ids.length; i++) {
	temp = 'OTU ' + otu_ids[i].toString()
	otu_ids_text.push(temp)
	}
  console.log(otu_ids_text)
  console.log(otu_labels)
  
  updatePlotlyBar(otu_ids_text.reverse(), sample_values.reverse(), otu_labels.reverse());
  updatePlotlyBubble(rows[0].otu_ids, rows[0].sample_values, rows[0].otu_labels);

  //Demographic info - Metadata
  metadata = importedData.metadata
  console.log("metadata")
  console.log(metadata)
  
  var filtered_metadata = metadata.filter(filterMetaData);
  console.log(filtered_metadata)
  
  //building logic for metadata html
  d3.select("#id").html("<p> &nbsp &nbsp id:&nbsp"+filtered_metadata[0].id+"</p>");
  d3.select("#ethnicity").html("<p> &nbsp &nbsp ethnicity:&nbsp"+filtered_metadata[0].ethnicity+"</p>");
  d3.select("#gender").html("<p> &nbsp &nbsp gender:&nbsp"+filtered_metadata[0].gender+"</p>");
  d3.select("#age").html("<p> &nbsp &nbsp age:&nbsp"+filtered_metadata[0].age+"</p>");
  d3.select("#location").html("<p> &nbsp &nbsp location:&nbsp"+filtered_metadata[0].location+"</p>");
  d3.select("#bbtype").html("<p> &nbsp &nbsp bbtype:&nbsp"+filtered_metadata[0].bbtype+"</p>");
  d3.select("#wfreq").html("<p> &nbsp &nbsp wfreq:&nbsp"+filtered_metadata[0].wfreq+"</p>");

  //calling Guage chart function
  updateGauge(parseInt(filtered_metadata[0].wfreq));


  //*********************************************The below code is when user selects any values through dropdown */
    // Call getData() when a change takes place to the DOM
    d3.selectAll("#selDataset").on("change", getData);
    
    // Function called by DOM changes
    function getData() {
        // filter the data for the selected subject id
        rows = samples.filter(filterData);
        console.log(rows)

        //getting required values for building bar chart
        var otu_ids = rows[0].otu_ids.slice(0, 10);
        console.log(otu_ids)
        var sample_values = rows[0].sample_values.slice(0, 10);
        console.log(sample_values)
        var otu_labels = rows[0].otu_labels.slice(0, 10);

        var otu_ids_text = [];
        for (var i = 0; i < otu_ids.length; i++) {
          temp = 'OTU ' + otu_ids[i].toString()
          otu_ids_text.push(temp)
          }
        console.log(otu_ids_text)
        console.log(otu_labels)
        
        updatePlotlyBar(otu_ids_text.reverse(), sample_values.reverse(), otu_labels.reverse());
        updatePlotlyBubble(rows[0].otu_ids, rows[0].sample_values, rows[0].otu_labels);

          //Demographic info - Metadata
            metadata = importedData.metadata // the scope of variable 'metadata' is within this getData function only, outside of it this variable is not defined.
            console.log("metadata")
            console.log(metadata)
            
            var filtered_metadata = metadata.filter(filterMetaData);
            console.log(filtered_metadata)
            
            //building logic for metadata html
            d3.select("#id").html("<p> &nbsp &nbsp id:&nbsp"+filtered_metadata[0].id+"</p>");
            d3.select("#ethnicity").html("<p> &nbsp &nbsp ethnicity:&nbsp"+filtered_metadata[0].ethnicity+"</p>");
            d3.select("#gender").html("<p> &nbsp &nbsp gender:&nbsp"+filtered_metadata[0].gender+"</p>");
            d3.select("#age").html("<p> &nbsp &nbsp age:&nbsp"+filtered_metadata[0].age+"</p>");
            d3.select("#location").html("<p> &nbsp &nbsp location:&nbsp"+filtered_metadata[0].location+"</p>");
            d3.select("#bbtype").html("<p> &nbsp &nbsp bbtype:&nbsp"+filtered_metadata[0].bbtype+"</p>");
            d3.select("#wfreq").html("<p> &nbsp &nbsp wfreq:&nbsp"+filtered_metadata[0].wfreq+"</p>");

    }


// Building bar chart
function updatePlotlyBar(x, y, hover_text) {
		
    var trace = {
      x: y,
      y: x,
      text: hover_text,
      type: "bar",
      orientation: 'h'
    };
    
    var Data = [trace];
    
    var layout = {
          xaxis: { title: "Values"},
          yaxis: { title: "OTU IDs"},
          margin: {
                l: 100,
                r: 20,
                t: 0,
                b: 70
              },
          width: 500,
          height: 400,
        };
    
    Plotly.newPlot("bar", Data, layout);
}

// Building bubble chart
function updatePlotlyBubble(x, y, hover_text) {
		
    var trace = {
          x: x,
          y: y,
          text: hover_text,
          mode: 'markers',
          marker: {
            color: x,
            colorscale: 'Earth',
            size: y
          }
        };

        var data = [trace];

        var layout = {
          showlegend: false,
          xaxis: { title: "OTU IDs"},
          margin: {
                l: 20,
                r: 20,
                t: 20,
                b: 20
              },
          height: 350,
          width: 1000
        };

        Plotly.newPlot('bubble', data, layout);
}

function updateGauge(level) {

	// Trig to calc meter point
	function gaugePointer(value){
		
		var degrees = 180 - value,
		 radius = .5;
		var radians = degrees * Math.PI / 180;
		var x = radius * Math.cos(radians);
		var y = radius * Math.sin(radians);

		// Path: may have to change to create a better triangle
		var mainPath = 'M -.0 -0.035 L .0 0.035 L ',
			 pathX = String(x),
			 space = ' ',
			 pathY = String(y),
			 pathEnd = ' Z';
		var path = mainPath.concat(pathX,space,pathY,pathEnd);
			
			return path;

		}

		var data = [{ type: 'scatter',
			x: [0], y:[0],
			marker: {size: 18, color:'850000'},
			showlegend: false,
			name: 'scrubs/<br>week',
			text: level,
			hoverinfo: 'text+name'},
		  { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
		  rotation: 90,
		  text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2',  '0-1', ''],
		  textinfo: 'text',
		  textposition:'inside',	  
		  marker: {colors:['rgba(128,181,134,255)', 'rgba(133,188,139,255)',
								 'rgba(135,192,128,255)', 'rgba(183,205,139,255)',
								 'rgba(213,229,149,255)', 'rgba(229,233,177,255)','rgba(233,231,201,255)','rgba(243,240,229,255)','rgba(247,242,236,255)',
								 'rgba(255, 255, 255, 0)']
								 },
		  labels: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2',  '0-1', ''],
		  hoverinfo: 'label',
		  hole: .5,
		  type: 'pie',
		  showlegend: false
		}];

		var layout = {
		  shapes:[{
			  type: 'path',
			  path: gaugePointer(level*20), //multiplying with 20 as each segment is of 20 degree and there are 9 segments i.e. 180/9 = 20 degree.
			  fillcolor: '850000',
			  line: {
				color: '850000'
			  },
			}],
          autosize:true,
          hovermode:'closest',
		  xaxis: {zeroline:false, showticklabels:false,
					 showgrid: false, range: [-1, 1]},
		  yaxis: {zeroline:false, showticklabels:false,
					 showgrid: false, range: [-1, 1]},
		   margin: {
				l: 0,
				r: 0,
				t: 20,
				b: 20
			  },
		  width: 500,
		  height: 400
		};

		Plotly.newPlot('gauge', data, layout);
	}


})


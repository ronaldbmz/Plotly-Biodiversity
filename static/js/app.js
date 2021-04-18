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

})


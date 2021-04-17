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


})


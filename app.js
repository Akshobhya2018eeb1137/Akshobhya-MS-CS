d3.csv("movies.csv").then(function (data) {
  // console.log(data);

  var movies = data;

  var button = d3.select("#img");

  var form = d3.select("#form");

  // var input = document.getElementById("user-input")

  var input = document.getElementById("user-input");

  // Add an event listener for the "keydown" event
  input.addEventListener("keydown", function(event) {
    // Check if the key pressed is the Enter key (key code 13)
    if (event.keyCode === 13) {
      // The Enter key was pressed
      runEnter();
    }
  });


  button.on("click", runEnter);
  form.on("submit", runEnter);
//   input.addEventListener("keydown", function (e) {
//     e.preventDefault();

//     if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
//         runEnter();
//     }
// });

function min(a, b){
  if(b < a)
  return b;
return a;
}
  // form.on("submit", runEnter);

  function runEnter() {
    d3.select("tbody").html("")
    d3.selectAll("p").classed('noresults', true).html("")
    // d3.event.preventDefault();
    var inputElement = d3.select("#user-input");
    var inputValue = inputElement.property("value").toLowerCase().trim();

    if (inputValue.length < 6){
      d3.select("p").classed('noresults2', true).html("<center><strong>Please try using more than 5 characters to avoid too many results!</strong>")
      inputValue = "Something to give no results"
    }
    var filteredData = movies.filter(movies => movies.College.toLowerCase().trim().includes(inputValue));
    // console.log(filteredData.length)
    if (filteredData.length === 0 && inputValue !== "Something to give no results"){
      d3.select("p").classed('noresults', true).html("<center><strong>No results. Please check your spelling!</strong>")
    }
 
    output = _.sortBy(filteredData, 'Year').reverse()
    console.log(filteredData)
  
    for (var i = 0; i < min(filteredData.length, 1000); i++) {
      // console.log(output[i]['original_title'])
      // console.log(output[i]['avg_vote'])
      // d3.select("tbody>tr>td").text(output[i]['original_title']);
      gre_score = ""
      gre_score += (output[i]['GRE Verbal'] == "" ? "" : output[i]['GRE Verbal'] + "V ");
      gre_score += (output[i]['GRE Quants'] == "" ? "" : output[i]['GRE Quants'] + "Q ");
      gre_score += (output[i]['GRE AWA'] == "" ? "" : output[i]['GRE AWA'] + "AWA");

      year = "";
      year = String(output[i]['Year']);
      year = year.substring(0, year.length - 2);
      // console.log(year);
      // console.log(typeof(year))
      var status = output[i]['Status']
      var tag = "";
      if(status == "Accepted")tag = "delivered"
      else if(status == "Rejected")tag = "cancelled"
      else if(status == "Waitlisted"){
        tag = "pending"
        status = "Waitlisted"
      }else if(status == "Wait"){
        tag = "pending"
        status = "Waitlisted"
      }
      else {
        tag = "shipped"
        status = "Pending"
      }
      d3.select("tbody").insert("tr").html(
        "<td>"+[i+1]+"</td>"
        +"<td>"+(output[i]['College'])+"</td>" 
        +"<td>" +(output[i]['Program'])+"</td>" 
        +"<td>" +(output[i]['Degree'])+"</td>"  
        +"<td>" +(year)+"</td>"
        +"<td>" +(output[i]['Season'])+"</td>"
        +"<td>" +(output[i]['GPA'])+"</td>"
        +"<td>" + gre_score+"</td>"
        +'<td> <p class = "status ' +  tag + '"> ' + (status) + ' </p></td>'
        
        ) }
        
  };
  window.resizeTo(screen.width,screen.height)


});
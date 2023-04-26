// Modal For DropDown

    // Get the modal
    var modal3 = document.getElementById("myModal3");

    // Get the button that opens the modal
    var btn4 = document.getElementById("start-test");

    // When the user clicks on the button, open the modal
    function dropdown() {
      btn4.onclick = function () {
        modal3.style.display = "block";
      };

      window.onclick = function (event) {
        if (event.target == modal3) {
          modal3.style.display = "none";
        }
      };
    }

var data = {}
    // Exam Script
    
    // Fetch JSON data
    function fatchdata(){
      // fetch("data")
      fetch("GATE15P1.json")
      .then(response => response.json())
      .then(d => { data = d;
      dataHtml(0);
      document.querySelector("#total").innerHTML = data.length;
      // var l = data.length;
      var l = 65;
      for(let i=0; i < l; i++ ) {
        var s = `<div class="badge-item" id="badge-item">
        <span class="badge text-bg-warning" id=b-${i+1}>${i+1}</span>
      </div>`
      document.querySelector("#con-Badge").innerHTML += s; 
      }
    })
      .catch(error => {
        console.log('Error fetching data:', error);
      });
    }
    
    // access the properties of the first object
    
  function dataHtml(i2){
    var i = parseInt(i2);
    document.querySelector("#qno").innerHTML = i+1;
    document.querySelector("#question").innerHTML = data[i].Question;
    document.querySelector("#OptionA").innerHTML = data[i].OptionA;
    document.querySelector("#OptionB").innerHTML = data[i].OptionB;
    document.querySelector("#OptionC").innerHTML = data[i].OptionC;
    document.querySelector("#OptionD").innerHTML = data[i].OptionD;
    document.querySelector("#qid").innerHTML = i;
    const option = document.getElementById("opt");
    if(data[i].ImageName!=""){
        imgs.style.display = "block";
        str = "Images/"+data[i].ImageName+".png";
        document.querySelector("#imgs>img").setAttribute("src",str);
        option.style.marginTop = "70px";

    }
    else{
      imgs.style.display = "none";
      option.style.marginTop = "300px";
    }
  }
  function nxtque() {
    var n = document.getElementById("qid").innerHTML;
    var n2 = parseInt(n)+1;

    document.querySelector("#b-"+n2+"").classList.remove("text-bg-warning");
    document.querySelector("#b-"+n2+"").classList.add("text-bg-success");
    dataHtml(n2);
  }

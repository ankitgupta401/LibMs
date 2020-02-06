function toDo(){
  sideBar();
  changeClass();
}
function sideBar() {
    var x = document.getElementById("sideMenu");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
}
function changeClass(){
  document.getElementsById("workDiv").classList.toggle("col-lg-12");

}



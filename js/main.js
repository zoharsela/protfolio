'use stricrt';

function initPage(){
    renderProj();
}

function renderProj(){
var strHtml = '';
var projs = getProj();
projs.map(function (proj) {
strHtml += `
<div class="col-md-4 col-sm-6 portfolio-item">
<a class="portfolio-link" onclick="renderModal('${proj.id}')">
  <div class="portfolio-hover">
    <div class="portfolio-hover-content">
      <i class="fa fa-plus fa-3x"></i>
    </div>
  </div>
  <img class="img-fluid" src="img/portfolio/${proj.id}.png" alt="">
</a>
<div class="portfolio-caption">
  <h4>${proj.name}</h4>
  <p class="text-muted">${proj.title}</p>
</div>
</div>
`
})
document.querySelector('.item-list').innerHTML = strHtml;
}


function renderModal(projId){
var proj = getProjById(projId);
var elProj = document.querySelector(".modal-body");
    elProj.innerHTML = `
    <h2>${proj.name}</h2>
    <p class="item-intro text-muted">${proj.title}</p>
    <img class="img-fluid d-block mx-auto" src="img/portfolio/${proj.id}.png" alt="MinesSweeper">
    <button class="btn btn-primary" type="button">
    <a href="./proj/${proj.id}/index.html" target="_blank" class="btn-game">
      <i class="fa fa-times"></i>
      Check it Out!
      </a>
      </button>
    <p>${proj.desc}</p>
    <ul class="list-inline">
    <li>Date: ${proj.publishedAt}</li>
    <li>Client: Mines Sweeper</li>
    <li>Category: Game</li>
  </ul>
  <button class="btn btn-primary" data-dismiss="modal" type="button">
      <i class="fa fa-times"></i>
      Close Project</button>
    `
    $("#portfolioModal1").modal();
}

function onSubmit(){
window.open("https://mail.google.com/mail/?view=cm&fs=1&to=zohar10692@gmail.com&su=SUBJECT&body=BODY", "_blank");
}

// function onGame(id){
//   var proj = getProjById(id);
//   window.open(`"./proj/${proj.id}/index.html"`, "_blank");
// }


                
               
                
                
                  
                
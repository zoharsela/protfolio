'use strict'

var gProjs = [{
    id: "minessweeper",
    name: "Mines Sweeper",
    title: "Better find a number",
    desc: "Do not reveal a mine",
    url: "projs/minessweeper",
    publishedAt: getDate(),
    labels: ["Mines", "keyboard events"],
},
{
    id: "touchnums",
    name: "Touch Nums", title: "Better touch faster",
    desc: "Touch the numbers by order",
    url: "projs/touchnums",
    publishedAt: getDate(),
    labels: ["Touch Nums", "keyboard events"],
},
{
    id: "pacman",
    name: "Pacman", title: "Better run faster",
    desc: "Run away from the police",
    url: "projs/pacman",
    publishedAt: getDate(),
    labels: ["Pacman", "keyboard events"],
}, 
{
    id: "guessme",
    name: "Guessme", title: "Better guess right",
    desc: "Think before you click",
    url: "projs/guessme",
    publishedAt: getDate(),
    labels: ["Guessme", "keyboard events"],
}, 
]

function getProj(){
    return gProjs;
}

function getProjById(id){
var proj = gProjs.find(function (proj) {
    return proj.id === id;
})
return proj;
}

function getDate(){
const o_date = new Intl.DateTimeFormat;
const f_date = (m_ca, m_it) => Object({...m_ca, [m_it.type]: m_it.value});
const m_date = o_date.formatToParts().reduce(f_date, {});
return m_date.day + '-' + m_date.month + '-' + m_date.year;
}

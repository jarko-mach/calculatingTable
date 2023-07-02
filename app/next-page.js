
let wys = document.querySelector(".myTable")
// console.log("wysokość div class=myTable:", Math.round(wys.getBoundingClientRect().height / 3, 779))
// 1 mm to 3,779 px
let info = document.querySelectorAll("span")
info[0].innerText = Math.round(wys.getBoundingClientRect().width / 3.779)
info[1].innerText = Math.round(wys.getBoundingClientRect().height / 3.779)
console.log(Math.round(wys.getBoundingClientRect().height / 3.779))
if (Math.round(wys.getBoundingClientRect().height / 3.779) > 290) {
    // zanim dodam nową linię to sprawdzam, czy cała strona ma więcej niż np. 290 mm
    // wtedy dodaję <tr> o wysokości np. 30 mm (trzeba ustalić górny i dolny margines)
    // i jadymy dalej
}

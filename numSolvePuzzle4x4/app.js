let con = document.getElementById('con')
let XYposition = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16]
];
let sorted = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, NaN]
let usersorte = []
let btn1 = ''
let btn2 = ''
let tempNum = 0
let tempData = ''
let aEmpty = 0
let randNumArr = []
let btnId = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
let startBtn = document.getElementById('startBtn')
let h2Title = document.getElementById('title')
h2Title.innerHTML = 'دەست بکە بە ڕێکخستن😁'


window.onload = (genInsideBtn())
startBtn.addEventListener('click', function () {
    reset()
    genInsideBtn()
})

function genRandNum() {
    while (randNumArr.length < 16) {
        let tempNum = Math.floor(1 + Math.random() * 16)
        if (!randNumArr.includes(tempNum)) {
            randNumArr.push(tempNum)
        }
    }
}

//generate value inside btn
function genInsideBtn() {
    genRandNum()
    for (let i = 0; i < 16; i++) {
        if (randNumArr[i] === 16) {
            con.innerHTML += `<button id=btn${btnId[i]} onclick="give(${btnId[i]})"></button>`
            tempEmptyId = btnId[i]
        } else {
            con.innerHTML += `<button id=btn${btnId[i]} onclick="give(${btnId[i]})">${randNumArr[i]}</button>`
        }
    }
}

// check if clicked btn is around empty btn
function isAround(XYposition, aEmpty, aBtn) {
    for (let i = 0; i < XYposition.length; i++) {
        let row = XYposition[i];
        let emptyIndex = row.indexOf(aEmpty);
        if (emptyIndex !== -1) {
            // found the row where aEmpty is located
            let left = row[emptyIndex - 1];
            let right = row[emptyIndex + 1];
            if (left === aBtn || right === aBtn) {
                return true;
            }
            // check the row above
            if (i > 0 && XYposition[i - 1][emptyIndex] === aBtn) {
                return true;
            }
            // check the row below
            if (i < XYposition.length - 1 && XYposition[i + 1][emptyIndex] === aBtn) {
                return true;
            }
            return false;
        }
    }
    return false;
}


function findEmpty() {
    for (let i = 1; i <= 16; i++) {
        let a = document.getElementById(`btn${i}`)
        if (a.innerHTML === '') {
            aEmpty = i
            console.log(aEmpty)
            break
        }
    }
}

function give(n) {
    findEmpty()
    if (isAround(XYposition, aEmpty, n)) {
        btn1 = document.getElementById(`btn${n}`)
        btn2 = document.getElementById(`btn${aEmpty}`)

        tempNum = n
        n = aEmpty
        aEmpty = tempNum

        tempData = btn1.innerHTML
        btn1.innerHTML = btn2.innerHTML
        btn2.innerHTML = tempData
    }
    youWin()
}

function youWin() {
    for (let i = 1; i <= 16; i++) {
        let tempValue = document.getElementById(`btn${i}`)
        tempValue = parseInt(tempValue.innerHTML)
        usersorte.push(tempValue)
    }
    let j = 0
    for (let i = 0; i < 16; i++) {
        if (sorted[i] === usersorte[i])
            j += 1
        // console.log(usersorte.sort())
    }
    if (j === 15) {
        h2Title.innerHTML = '😎 ئافەرم شێرە'
        console.log("win")

        j = 0
    }
    console.log('j :' + j)

}

function reset() {
    for (let i = 0; i < 16; i++) {
        randNumArr.pop()
        usersorte.pop()
    }

    con.innerHTML = ''
    h2Title.innerHTML = '😁 دەست بکە بە ڕێکخستن'

}
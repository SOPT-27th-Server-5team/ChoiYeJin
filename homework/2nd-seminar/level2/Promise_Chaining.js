const members = require('../members')

function getFemale(members) {
    return new Promise(function (resolve, reject) {
        setTimeout(function(){
            const female =members.filter(m => m.gender === '여')
            resolve(female);
        }, 500);
    })
}

function getYB(members) {
    return new Promise(function (resolve, reject) {
        setTimeout(function(){
            const YB = members.filter(m => m.status === 'YB')
            resolve(YB);
        }, 500);
    })
}

function getiOS(members) {
    return new Promise(function (resolve, reject) {
        setTimeout(function(){
            const iOS = members.filter(m => m.part === 'iOS')
            resolve(iOS);
        }, 500);
    })
}

getFemale(members) //
  .then(members => getYB(members))
  .then(members => getiOS(members))
  .then(members => console.log(members))
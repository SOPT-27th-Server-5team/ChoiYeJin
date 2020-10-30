const members = require('./members')

//OB, YB 분리하기
const OB = members.filter(m => m.status === 'OB')
const YB = members.filter(m => m.status === 'YB')

//랜덤으로 순서 섞기
const shuffleArray = array => {
    for (let i = 0; i < array.length; i++) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

//입력받은 팀 개수로 맴버 나누기
const division = (num, members) => { 
    const shuffle_members = shuffleArray(members);
    shuffle_members.forEach(function(element, index){
        element.group = (index%num)+1;
    })
    return shuffle_members
    
}

//최종 그룹 생성 및 출력 함수
const makeGroups = (num) => {
    const OB_group = division(num,shuffleArray(OB));
    const YB_group = division(num,shuffleArray(YB));
    const teams = []
    for (let i=1; i<=num; i++){
        const final_OB = OB_group.filter(m => m.group === i)
        const final_YB = YB_group.filter(m => m.group === i)
        const team = [...final_OB, ...final_YB]
        console.log(`그룹 ${i}\n`, team);
        teams.push(team);
    }
    return teams;
}

//출력
makeGroups(6);

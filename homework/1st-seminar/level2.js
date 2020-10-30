var team_5 = [{
        name: "최정균",
        address: '경기도 군포시',
        age: 25,
        hobby: "웨이트"
    },

    {
        name: "이진호",
        address: '경기도 안산',
        age: 27,
        hobby: "당구"
    },

    {
        name: "김수현",
        address: '서울',
        age: 24,
        hobby: '좋은 음악 찾기'
    },

    {
        name: "최다인",
        address: '서울',
        age: 24,
        hobby: "갬성카페 가기"
    },

    {
        name: "최예진",
        address: '서울',
        age: 23,
        hobby: "드라마 보기"
    },

    {
        name : "윤가영",
        address : "한성대입구",
        age : 21,
        hobby : "유튭보기"
      },

];

function introduction(team) {
    console.log('서버 5조의 멤버를 소개합니다!')
    for (var member in team) {
        console.log(`<${Number(member)+1}번째 멤버>`)
        console.log(`이름: ${team[member].name}`);
        console.log(`주소: ${team[member].address}`); 
        console.log(`나이: ${team[member].age}`); 
        console.log(`취미: ${team[member].hobby}\n`);   
    }
}

introduction(team_5);
let tabBtn = document.querySelectorAll('.tab-button');
let tabContent = document.querySelectorAll('.tab-content');

for (let i = 0; i < 3; i++) {
  console.log(i);
}

for (let i = 0; i < tabBtn.length; i++) {
  tabBtn[i].addEventListener('click', function (e) {
    tabBtn[i].classList.remove('orange');
  });
}

// 버튼0을 누르면
// tabBtn[0].addEventListener('click', function () {
//   // 모든 버튼에 있는 orange 클래스명 제거 후
//   tabBtn[0].classList.remove('orange');
//   tabBtn[1].classList.remove('orange');
//   tabBtn[2].classList.remove('orange');

//   // 버튼0에 orange 클래스명 추가
//   tabBtn[0].classList.add('orange');

//   // 모든 div에 있는 show 클래스명 제거 후
//   tabContent[0].classList.remove('show');
//   tabContent[1].classList.remove('show');
//   tabContent[2].classList.remove('show');

//   // div0에 show 클래스명 추가
//   tabContent[0].classList.add('show');
// });

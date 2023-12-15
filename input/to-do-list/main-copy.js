console.log('to do list page');

// HTML 생성1
/*
  var a = document.createElement('p');
  a.innerHTML = '안녕';
  a.classList.add('test-p');
  document.querySelector('#test').appendChild(a);
*/

// HTML 생성2
// insertAdjacentHTML - 문자형 HTML을 추가해주는 함수
// 추가 말고 다 갈고 싶으면 innerHTML
// insertAdjacentHTML('넣을 위치', '넣을 HTML');
// beforeend - 안쪽 맨 끝
/*
  var temp = `<p>Hello</p>`;
  document.querySelector('#test').insertAdjacentHTML('beforeend', temp);
*/

// jQuery ver.
// $('#test').append(temp);

// localStorage
/*
  - key:value 형식으로 저장
  - 문자 데이터만 저장 가능함
  - 사이트에 재접속을 해도 값이 유지됨

  [ 사용법 ]

  1. 저장
  - localStorage.setItem('key', 'value');
  
  2. 출력
  - localStorage.getItem('key');

  3. 삭제
  - localStorage.removeItem('key');

  
  [ object, array 저장법 ]

  1. array, object -> JSON으로 변환
  - JSON.stringify(자료);

  3. JSON -> array, object로 변환
  - JSON.parse(자료);

  
  [ 수정법 ]

  1. getItem -> 수정 -> setItem
*/

let i = 0;
let newTodo = '';

let todoTxt = document.querySelector('#input-txt');
let plusBtn = document.querySelector('.plus-btn');
let ul = document.querySelector('.list-wrap > ul');

let blankChk = document.querySelector('#blank-chk');
let closeBtn = document.querySelector('#close-btn');

// 새로고침 후에도 데이터 유지 시키기
if (localStorage.getItem('todo') !== null) {
  let todoGet = JSON.parse(localStorage.getItem('todo'));
  for (let i = 0; i < todoGet.length; i++) {
    let hcode = `
      <li class="list-item flex">
        <div class="chk-box">
          <input type="checkbox" name="${todoGet[i]['num']}" id="${todoGet[i]['num']}" value="${todoGet[i]['txt']}" />
          <label class="chk-label" for="${todoGet[i]['num']}">${todoGet[i]['txt']}</label>
        </div>
        <div class="del-box">
          <button class="del-btn" type="button">
            <div></div>
          </button>
        </div>
      </li>
    `;
    ul.innerHTML += hcode;
  }
}

// plus button - 할 일 추가
plusBtn.addEventListener('click', function () {
  // 공백 체크 - input 공백일 떄
  if (todoTxt.value == '') {
    blankChk.classList.add('show-modal');

    // 닫기 버튼 누를 때 - 모달창 닫기
    closeBtn.addEventListener('click', function () {
      blankChk.classList.remove('show-modal');
    });

    // 검정 배경 누를 때 - 모달창 닫기
    blankChk.addEventListener('click', function () {
      blankChk.classList.remove('show-modal');
    });
  }

  // 공백 체크 - input 공백 아닐 때
  else {
    // li 추가
    i++;
    newTodo = todoTxt.value;

    let li = `
    <li class="list-item flex">
      <div class="chk-box">
        <input type="checkbox" name="chk${i}" id="chk${i}" value="${newTodo}" />
        <label class="chk-label" for="chk${i}">${newTodo}</label>
      </div>
      <div class="del-box">
        <button class="del-btn" type="button">
          <div></div>
        </button>
      </div>
    </li>
  `;

    ul.innerHTML += li;
    todoTxt.value = '';

    let todoLocal = [];

    // localStorage 추가
    if (localStorage.getItem('todo') == null) {
      console.log(i);
      todoLocal.push({ txt: `${newTodo}`, num: `${i}` });
      let localSet = JSON.stringify(todoLocal);
      localStorage.setItem('todo', localSet);
    } else {
      let localGet = JSON.parse(localStorage.getItem('todo'));

      localGet.push({ txt: `${newTodo}`, num: `${i}` });
      localStorage.setItem('todo', JSON.stringify(localGet));
    }

    let delChk = document.querySelector('#del-chk');
    let yesBtn = document.querySelector('#yes-btn');
    let noBtn = document.querySelector('#no-btn');
    let delBtn = document.querySelectorAll('.del-btn');
    let delLi = document.querySelectorAll('.list-item');

    // delete button
    // 삭제 여부 물어보기
    delBtn.forEach((a, i) => {
      a.addEventListener('click', function () {
        delChk.classList.add('show-modal');

        // 아니오 - 모달창 닫기
        noBtn.addEventListener('click', function () {
          delChk.classList.remove('show-modal');
        });

        // 네 - 할 일 삭제
        yesBtn.addEventListener('click', function (e) {
          delChk.classList.remove('show-modal');
          console.log(i);

          setTimeout(() => {
            delLi[i].remove();
            // i--;
          }, 300);
        });
      });
    });

    console.log(i);
  }
});

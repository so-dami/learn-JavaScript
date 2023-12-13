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
let i = 0;
let newTodo = '';

let todoTxt = document.querySelector('#input-txt');
let plusBtn = document.querySelector('.plus-btn');
let ul = document.querySelector('.list-wrap > ul');

let blankChk = document.querySelector('#blank-chk');
let delChk = document.querySelector('#del-chk');
let closeBtn = document.querySelector('#close-btn');
let yesBtn = document.querySelector('#yes-btn');
let noBtn = document.querySelector('#no-btn');

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

    let delBtn = document.querySelectorAll('.del-btn');
    li = document.querySelectorAll('.list-item');

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

          setTimeout(() => {
            li[i].remove();
          }, 300);
        });
      });
    });
  }
});

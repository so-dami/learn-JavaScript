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

let todoTxt = document.querySelector('#input-txt');
let plusBtn = document.querySelector('.plus-btn');
let todoList = ['목살 굽기', '집안일(설거지 빨래)'];
let newTxt = '';

// plus button - 할 일 추가
plusBtn.addEventListener('click', function () {
  newTxt = todoTxt.value;
  console.log(newTxt);
});

// HTML에 li 추가
for (let i = 0; i < todoList.length; i++) {
  console.log(todoList.length);
  let ul = document.querySelector('.list-wrap > ul');
  let li = `
    <li class="list-item flex">
      <div class="chk-box">
        <input type="checkbox" name="chk${i}" id="chk${i}" value="${todoList[i]}" />
        <label class="chk-label" for="chk${i}">${todoList[i]}</label>
      </div>
      <div class="del-box">
        <button class="del-btn" type="button">
          <div></div>
        </button>
      </div>
    </li>
  `;

  ul.innerHTML += li;
}

let delBtn = document.querySelectorAll('.del-btn');
let modal = document.querySelector('.black-bg');
let yesBtn = document.querySelector('#yes-btn');
let noBtn = document.querySelector('#no-btn');

// delete button
// 삭제 여부 물어보기
for (let i = 0; i < delBtn.length; i++) {
  delBtn[i].addEventListener('click', function () {
    modal.classList.add('show-modal');
  });
}

// 아니오 - 모달창 닫기
noBtn.addEventListener('click', function () {
  modal.classList.remove('show-modal');
});

// 네 - 할 일 삭제

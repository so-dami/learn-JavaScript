// 오늘의 할 일에 새로 입력된 값을 넣을 변수
let newTodo = '';

// 오늘의 할 일 input 값
let todoTxt = document.querySelector('#input-txt');

// + 버튼
let plusBtn = document.querySelector('.plus-btn');

let ul = document.querySelector('.list-wrap > ul');

// 공백 체크 모달창
let blankChk = document.querySelector('#blank-chk');

// 공백 체크 모달창 닫기 버튼
let closeBtn = document.querySelector('#close-btn');

// 새로고침 후에도 데이터, checked 유지 시키기
if (localStorage.getItem('todo') !== null) {
  let todoGet = JSON.parse(localStorage.getItem('todo'));

  for (let i = 0; i < todoGet.length; i++) {
    let hcode = `
      <li class="list-item flex">
        <div class="chk-box">
          <input type="checkbox" name="${todoGet[i]['txt']}" id="${todoGet[i]['txt']}" value="${todoGet[i]['txt']}" ${
      todoGet[i]['checked'] == true ? 'checked' : null
    } />
          <label class="chk-label" for="${todoGet[i]['txt']}">${todoGet[i]['txt']}</label>
        </div>
        <div class="del-box">
          <button class="del-btn" type="button">
            <div></div>
          </button>
        </div>
      </li>
    `;
    ul.innerHTML += hcode;
  } // for //
} // if //

// plus button 클릭 시 - li 추가
plusBtn.addEventListener('click', function () {
  // 공백 체크 - input 값이 공백일 때
  if (todoTxt.value == '') {
    blankChk.classList.add('show-modal');

    // 닫기 버튼 클릭 시 - 모달창 닫기
    closeBtn.addEventListener('click', function () {
      blankChk.classList.remove('show-modal');
    });

    // 검정 배경 클릭 시 - 모달창 닫기
    blankChk.addEventListener('click', function () {
      blankChk.classList.remove('show-modal');
    });
  } // if //

  // 공백 체크 - input 값이 공백이 아닐 때
  else {
    let todoLocal = [];
    let localGet = JSON.parse(localStorage.getItem('todo'));

    // 오늘의 할 일 input 값 변수에 넣기
    newTodo = { txt: todoTxt.value, checked: false };

    // localStorage 추가
    if (localStorage.getItem('todo') == null || localStorage.getItem('todo') == '[]') {
      todoLocal.push(newTodo);
      localStorage.setItem('todo', JSON.stringify(todoLocal));
    } else {
      localGet.push(newTodo);
      localStorage.setItem('todo', JSON.stringify(localGet));
    } // else //

    // li 추가
    let li = `
      <li class="list-item flex">
        <div class="chk-box">
          <input type="checkbox" name="${newTodo['txt']}" id="${newTodo['txt']}" value="${newTodo['txt']}" />
          <label class="chk-label" for="${newTodo['txt']}">${newTodo['txt']}</label>
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

    // localStorage의 checked 값 변경하기
    document.querySelectorAll('input[type="checkbox"]').forEach((a, i) => {
      a.addEventListener('click', function () {
        if (a.checked == true) {
          localGet[i]['checked'] = true;
          localStorage.setItem('todo', JSON.stringify(localGet));
        } else {
          localGet[i]['checked'] = false;
          localStorage.setItem('todo', JSON.stringify(localGet));
        } // else //
      }); // click //
    }); // forEach //
  } // else //
}); // plus-btn click //

// 삭제
function listDelete() {
  // '-' 버튼
  let delBtn = document.querySelectorAll('.del-btn');

  // 삭제 여부 묻는 모달창
  let delChk = document.querySelector('#del-chk');

  // '예' 버튼
  let yesBtn = document.querySelector('#yes-btn');

  // '아니오' 버튼
  let noBtn = document.querySelector('#no-btn');

  // 삭제할 li
  let delList = document.querySelectorAll('.list-item');

  // delete button 클릭 시
  delBtn.forEach((a, i) => {
    a.addEventListener('click', function () {
      // let delList = a.parentElement.parentElement;

      // 삭제 여부 물어보기
      delChk.classList.add('show-modal');

      // 아니오 클릭 시
      noBtn.addEventListener('click', function () {
        // 모달창 닫기
        delChk.classList.remove('show-modal');
      });

      // 검정 배경 클릭 시
      delChk.addEventListener('click', function () {
        // 모달창 닫기
        delChk.classList.remove('show-modal');
      });

      // 예 클릭 시
      yesBtn.addEventListener('click', function () {
        // 모달창 닫기
        delChk.classList.remove('show-modal');

        // localStorage에서 해당 데이터 삭제
        let local = JSON.parse(localStorage.getItem('todo'));

        local.splice(i, 1);
        localStorage.setItem('todo', JSON.stringify(local));

        console.log(delList[i]);

        // 해당 li 삭제
        delList[i].remove();
      });
    });
  });
}

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

// checked 유지는 어떻게...?
// 새로고침 후에도 데이터 유지 시키기
if (localStorage.getItem('todo') !== null) {
  let todoGet = JSON.parse(localStorage.getItem('todo'));
  for (let i = 0; i < todoGet.length; i++) {
    let hcode = `
      <li class="list-item flex">
        <div class="chk-box">
          <input type="checkbox" name="chkbox${todoGet[i]}" id="chkbox${todoGet[i]}" value="${todoGet[i]}" />
          <label class="chk-label" for="chkbox${todoGet[i]}">${todoGet[i]}</label>
        </div>
        <div class="del-box">
          <button class="del-btn" type="button">
            <div></div>
          </button>
        </div>
      </li>
    `;
    ul.innerHTML += hcode;
    listDelete();
  }
}

// plus button 클릭 시 - 할 일 추가
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
  }

  // 공백 체크 - input 값이 공백이 아닐 때
  else {
    let todoLocal = [];

    // 오늘의 할 일 input 값 변수에 넣기
    newTodo = todoTxt.value;

    // localStorage 추가
    if (localStorage.getItem('todo') == null || localStorage.getItem('todo') == '[]') {
      todoLocal.push(newTodo);
      localStorage.setItem('todo', JSON.stringify(todoLocal));
    } else {
      let localGet = JSON.parse(localStorage.getItem('todo'));

      localGet.push(newTodo);
      localStorage.setItem('todo', JSON.stringify(localGet));
    }

    // li 추가
    let li = `
      <li class="list-item flex">
        <div class="chk-box">
          <input type="checkbox" name="${newTodo}" id="${newTodo}" value="${newTodo}" />
          <label class="chk-label" for="${newTodo}">${newTodo}</label>
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
  }
  listDelete();
});

// 삭제
function listDelete() {
  let delBtn = document.querySelectorAll('.del-btn');
  let delChk = document.querySelector('#del-chk');
  let yesBtn = document.querySelector('#yes-btn');
  let noBtn = document.querySelector('#no-btn');

  // delete button 클릭 시
  delBtn.forEach((a) => {
    a.addEventListener('click', function (e) {
      // 삭제할 li
      let delList = a.parentElement.parentElement;

      // 삭제할 input 값
      let delTodo = a.parentElement.previousElementSibling.firstElementChild.value;

      // 삭제 여부 물어보기
      delChk.classList.add('show-modal');

      // 아니오 - 모달창 닫기
      noBtn.addEventListener('click', function () {
        // 모달창 닫기
        delChk.classList.remove('show-modal');
      });

      // 검정 배경 클릭 시 - 모달창 닫기
      delChk.addEventListener('click', function () {
        delChk.classList.remove('show-modal');
      });

      // 예 - 삭제
      yesBtn.addEventListener('click', function () {
        // 모달창 닫기
        delChk.classList.remove('show-modal');

        // localStorage에서 해당 데이터 삭제
        let local = JSON.parse(localStorage.getItem('todo'));
        let idx = local.indexOf(delTodo);
        console.log(idx);

        local.splice(idx, 1);
        console.log(local);
        localStorage.setItem('todo', JSON.stringify(local));


        // 해당 li 삭제
        setTimeout(() => {
          delList.remove();
        }, 300);
      });
    });
  });
}

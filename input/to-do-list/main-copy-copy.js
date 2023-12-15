let newTodo = '';

let todoTxt = document.querySelector('#input-txt');
let plusBtn = document.querySelector('.plus-btn');
let ul = document.querySelector('.list-wrap > ul');

let blankChk = document.querySelector('#blank-chk');
let closeBtn = document.querySelector('#close-btn');

// 새로고침 후에도 데이터 유지 시키기
// checked 유지는 어떻게...?
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
    let todoLocal = [];

    // li 추가
    newTodo = todoTxt.value;

    // localStorage 추가
    if (localStorage.getItem('todo') == null) {
      todoLocal.push(newTodo);
      let localSet = JSON.stringify(todoLocal);
      localStorage.setItem('todo', localSet);
    } else {
      let localGet = JSON.parse(localStorage.getItem('todo'));

      localGet.push(newTodo);
      localStorage.setItem('todo', JSON.stringify(localGet));
    }

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

listDelete();

// 삭제
function listDelete() {
  let delBtn = document.querySelectorAll('.del-btn');
  let delChk = document.querySelector('#del-chk');
  let yesBtn = document.querySelector('#yes-btn');
  let noBtn = document.querySelector('#no-btn');

  // delete button
  // 삭제 여부 물어보기
  delBtn.forEach((a) => {
    a.addEventListener('click', function (e) {
      let delList = a.parentElement.parentElement;
      let delTodo = a.parentElement.previousElementSibling.firstElementChild.value;

      delChk.classList.add('show-modal');

      // 아니오
      noBtn.addEventListener('click', function () {
        // 모달창 닫기
        delChk.classList.remove('show-modal');
      });

      // 예
      yesBtn.addEventListener('click', function (e) {
        // 모달창 닫기
        delChk.classList.remove('show-modal');

        // localStorage에서 해당 데이터 삭제
        let local = JSON.parse(localStorage.getItem('todo'));
        let idx = local.indexOf(delTodo);

        local.splice(idx, 1);
        localStorage.setItem('todo', JSON.stringify(local));

        // 해당 li 삭제
        setTimeout(() => {
          delList.remove();
        }, 300);
      });
    });
  });
}

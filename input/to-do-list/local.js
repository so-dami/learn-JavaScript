let test = [];
let i = 0;

document.querySelector('.test-btn').addEventListener('click', function () {
  if (localStorage.getItem('test') == null) {
    test.push('제목1');
    localStorage.setItem('test', JSON.stringify(test));
  } else {
    let get = JSON.parse(localStorage.getItem('test'));
    get.push('제목2');
    localStorage.setItem('test', JSON.stringify(get));
  }

  let get = JSON.parse(localStorage.getItem('test'));

  let hcode = `<h1>${get[i]}</h1>`;

  i++;

  document.querySelector('.test').insertAdjacentHTML('beforeend', hcode);
});

// document.querySelector('test')

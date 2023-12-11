let submitBtn = document.querySelector('#submit-btn');

let number = document.querySelector('#number');
let title = document.querySelector('#name');
let price = document.querySelector('#price');
let vat = document.querySelector('#vat');
let total = document.querySelector('#total');

let numberVal = document.querySelector('.number-val');
let titleVal = document.querySelector('.name-val');
let priceVal = document.querySelector('.price-val');
let vatVal = document.querySelector('.vat-val');
let totalVal = document.querySelector('.total-val');
let chargeVal = document.querySelector('.charge-val');
let today = document.querySelector('.today');

submitBtn.addEventListener('click', function (e) {
  document.querySelectorAll('.bg')[0].classList.remove('show');
  document.querySelectorAll('.bg')[1].classList.remove('show');
  document.querySelectorAll('.bg')[1].classList.add('show');
  e.preventDefault();

  submit(numberVal, number.value);
  submit(titleVal, title.value);
  submit(priceVal, price.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원');
  submit(vatVal, vat.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원');
  submit(totalVal, total.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원');
  getCheckboxValue();

  today.innerHTML = date();
});

price.addEventListener('input', function () {
  vat.value = Number(price.value) * 0.1;
  total.value = Number(price.value) + Number(vat.value);
});

function submit(key, value) {
  key.innerHTML = value;
}

function getCheckboxValue() {
  // 선택된 목록 가져오기
  const query = 'input[name="charge"]:checked';
  const selectedEls = document.querySelectorAll(query);

  // 선택된 목록에서 value 찾기
  let result = '';
  selectedEls.forEach((el) => {
    result += el.value + ' ';
  });

  // 출력
  chargeVal.innerText = result;
}

function date() {
  var today = new Date();

  var month = today.getUTCMonth() + 1; //months from 1-12
  var day = today.getUTCDate();
  var year = today.getUTCFullYear();

  return (today = year + '-' + month + '-' + day);
}

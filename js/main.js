'use strict';
{
  // 要素を取得する
  const settingList = document.querySelectorAll('select#settingList');
  const settingNumber = document.getElementById('settingNumber')
  const resultContent = document.getElementById('resultContent')
  const settingHaveNumber = document.querySelectorAll('select#settingHaveNumber');

  // デフォルトをunorderedに
  let type = '- ';

  // ページを表示した際に、デフォルトの状態で結果を反映させる
  showResult();

  // List Typeが選ばれた時の挙動
  settingList.forEach(element => {
    element.addEventListener('input', () => {

      // それぞれのタイプが選ばれた時に、マークダウンの記述を設定
      switch (element.value) {
        case 'unordered':
          type = '- '
          resetTaskOption();
          showResult();
          inputDisabled();
        break;
        case 'ordered':
          type = '. ';
          resetTaskOption();
          showResult();
          inputDisabled();
        break;
        case 'task':
          type = '- [ ]';
          document.getElementById('settingHaveNumber').removeAttribute('disabled');
          showResult();
        break;
      }

    })
  });

  
  // 数字を増減した時に関数を動かす
  settingNumber.addEventListener('input', () => {
    showResult();
  })
  
  // TaskListで数字あるなしを選択した時に、文字有無で判別されてappendChild
  settingHaveNumber.forEach(settingHaveElement => {
    settingHaveElement.addEventListener('input', () => {
      showResult2();
    })
  })
  

  // settingHaveNumberをdisabledにする関数
  function inputDisabled() {
    document.getElementById('settingHaveNumber').setAttribute('disabled', 'disabled');
  }

  // ListTypeとNumerofListの値を取得して、出力させる関数
  function showResult() {
    if (settingNumber.value <= 0) {
      resultContent.textContent = 'Markdown List'
    } else if (settingNumber.value >= 1) {
      resultContent.textContent =  "";
    } else {

    }

    for (let num = 0; num < parseFloat(settingNumber.value); num++) {
      const item = document.createElement('div');
      settingList.forEach(e => {
        if (e.value === 'ordered') {
          item.textContent = `${num + 1}${type}`
          resultContent.appendChild(item);
        } else if (e.value === 'task') {
          showResult2(); // showResult2を使って、数字のあるなしを見極めてappendChild
        } else if (e.value === 'unordered') {
          item.textContent = `${type}`
          resultContent.appendChild(item);
        } else {

        }
      })

    }
  }

  // Taskが選択されていて、haveNumberのYes、Noで結果を出力する関数
  function showResult2() {
    settingHaveNumber.forEach(settingHaveElement => {
        resultContent.textContent = "";
        for (let num = 0; num < parseFloat(settingNumber.value); num++) {
          const item = document.createElement('div');
          settingList.forEach(e => {
            if (e.value === 'task') {
              const numPad = String(num + 1).padStart(2, '0');
              switch (settingHaveElement.value) {
                case 'yes':
                  item.textContent = `${type} ${numPad}`
                  resultContent.appendChild(item);
                  break;
                case 'no':
                  item.textContent = `${type}`
                  resultContent.appendChild(item);
                  break;
              }
            } else {
            }

          })
        }
    })
  }


  // ListTypeがTask以外に選択された時、HaveNumberの値をYesにリセット
  function resetTaskOption() {
    settingHaveNumber.forEach(e => {
      e.selectedIndex = 0;
    })
    console.log(resultContent);
  }


  // resultContentの内容をコピーする挙動
  const copyButton = document.getElementById('copyButton');
  const copyIcon = document.getElementById('copyIcon');
  const copyText = document.getElementById('copyText');

  copyButton.addEventListener('click', () => {
    navigator.clipboard.writeText(resultContent.innerText);
    copyButton.classList.add('appear');
    copyIcon.textContent = 'done';
    copyText.textContent = 'COPIED !';
    function timeout() {
      copyButton.classList.remove('appear');
      copyIcon.textContent = 'content_copy';
      copyText.textContent = 'COPY';
    }
    setTimeout(() => timeout(), 800)
  })

}
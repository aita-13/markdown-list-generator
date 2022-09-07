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

  // settingListの入力があった時、結果を出力
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

  
  // setttingNumberの入力があった時、結果を出力
  settingNumber.addEventListener('input', () => {
    showResult();
  })
  
  // settingHaveNumberの入力があった時、結果を出力
  settingHaveNumber.forEach(settingHaveElement => {
    settingHaveElement.addEventListener('input', () => {
      showResult();
    })
  })
  

  // settingHaveNumberをdisabledにする関数
  function inputDisabled() {
    document.getElementById('settingHaveNumber').setAttribute('disabled', 'disabled');
  }

  // ListTypeとNumberofListの値を取得して、出力させる関数
  function showResult() {
    // NumberofListの数字が0の時、Markdwon Listと表示する
    if (settingNumber.value <= 0) {
      resultContent.textContent = 'Markdown List'
    } else if (settingNumber.value >= 1) {
      resultContent.textContent =  "";
    } else {

    }

    // settingNumberに入力された数、ListTypeの条件に合ったマークダウンの記述が書き出される
    for (let num = 0; num < parseFloat(settingNumber.value); num++) {
      const item = document.createElement('div');
      settingList.forEach(e => {
        if (e.value === 'ordered') {
          item.textContent = `${num + 1}${type}`
          resultContent.appendChild(item);
        } else if (e.value === 'task') {
          settingHaveNumber.forEach(settingHaveElement => {
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
          })
        } else if (e.value === 'unordered') {
          item.textContent = `${type}`
          resultContent.appendChild(item);
        } else {

        }
      })

    }
  }

  // ListTypeがTask以外に選択された時、HaveNumberの値をYesにリセット
  function resetTaskOption() {
    settingHaveNumber.forEach(e => {
      e.selectedIndex = 0;
    })
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
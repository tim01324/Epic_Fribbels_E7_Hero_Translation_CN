// ==UserScript==
// @name         Epic Fribbels E7 Hero Table 中文翻譯
// @namespace    https://github.com/tim01324/Epic_Fribbels_E7_Hero_Translation_CN
// @version      1.1
// @description  將 Epic Fribbels E7 Hero 網站表格標題與神器名稱翻譯成中文
// @author       tim01324
// @match        https://fribbels.github.io/e7/*
// @require      ./artifac.js
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const lists = {
    "#": "編號",
    "sets": "套裝",
    "gs": "總分",
    "bs": "基值",
    "atk": "攻擊",
    "def": "防禦",
    "hp": "生命",
    "spd": "速度",
    "cc": "爆率",
    "cd": "爆傷",
    "eff": "命中",
    "res": "抵抗",
    "ehp": "肉度",
    "hps": "回秒",
    "ehps": "肉秒",
    "dmg": "傷害",
    "dmgs": "傷秒",
    "mcd": "爆傷", // Note: mcd and cd are both 爆傷, keeping both for now
    "mcds": "爆秒",
    "dmgh": "治爆",
    "dmgd": "輸傷",
    // "arti": "神器", // Removed as it's handled by artifacts object now
    "date": "日期",
  };

  // first time page load
  const obsever = new MutationObserver((mutations, observe) => {
    mutations.forEach((mutation) => {
      // check which node is added
      // console.log(mutation);
      mutation.addedNodes.forEach((node) => {
        // go through all the nodes and find the one with the class name
        // after the website render the desired class name
        if (node.className === "ag-theme-balham-dark") {
          translate();
          observe.disconnect();
          afterDataRead();
          dataInsideTable();
        }
      });
    });
  })
  // Select this node for obsever
  const targetNode = document.querySelector(".bodyClass");
  const config = {
    childList: true,
  }
  obsever.observe(targetNode, config);

  // after the data readed
  const afterDataRead = () => {
    const obsever = new MutationObserver((mutations, observe) => {
      mutations.forEach((mutation) => {
        // check which node is added
        // console.log(mutation);
        // go through all the nodes and find the one with the class name
        // after the website render the desired class name
        mutation.addedNodes.forEach((node) => {
          if (node.className === "statPreviewRow artifactComboRow") {
            translate();
            observe.disconnect();
          } else {
            // console.log("NO READ DATA");
          }
        });
      });
    })
    // Select this node for obsever
    const targetNode = document.querySelector(".artifactCombos");
    const config = {
      childList: true,
    }
    obsever.observe(targetNode, config);
  };

  // check the data inside the table
  const dataInsideTable = () => {
    const obsever = new MutationObserver((mutations, observe) => {
      mutations.forEach((mutation) => {
        // check which node is added
        console.log(mutation);
        // go through all the nodes and find the one with the class name
        // after the website render the desired class name
        // row
        if (mutation.target.className === "ag-row-odd ag-row-no-focus") {
          console.log(1);
          translate();
        }

        if (mutation.type === "attributes") {
          console.log(2);
          translate();
        }

        // mutation.addedNodes.forEach((node) => {
        //   if (node.attributes === "role") {
        //     translate();
        //     observe.disconnect();
        //   } else {
        //     // console.log("NO READ DATA");
        //   }
        // });
      });
    })

    // Select this node for obsever
    // this is the table that we want to observe
    const targetNode = document.querySelector(".ag-center-cols-container");
    const config = {
      childList: true,
      attributes: true,
    }
    obsever.observe(targetNode, config);
  };

  function translate() {
    //  grab all the headers
    const headers = document.querySelectorAll('.ag-header-cell-text');
    //  replace header
    headers.forEach((text) => {
      // remove all the spaces
      var removeSpaceText = text.outerText.replace(/\s/g, "")
      //  match the text and replace it
      Object.keys(lists).forEach((key) => {
        if (removeSpaceText === key) {
          text.innerHTML = lists[key];
        }
      });
      // Also translate the "arti" header specifically if found
      if (removeSpaceText === "arti") {
          text.innerHTML = "神器";
      }
    });

    // grab all the artifact names in the rows
    const artsInTheRows = document.querySelectorAll('[col-id="artifactName"]');
    artsInTheRows.forEach((text) => {
      const originalArtifactName = text.outerText.trim(); // Get original artifact name
      if (artifacts[originalArtifactName]) { // Check if translation exists in artifacts object
        text.innerHTML = artifacts[originalArtifactName]; // Use translation from artifacts object
      }
    });

    // grab all the artifact names in the character infos
    const arts = document.querySelectorAll('.setArtifactRowRight');
    arts.forEach((text) => {
      const originalArtifactName = text.outerText.trim(); // Get original artifact name
      if (artifacts[originalArtifactName]) { // Check if translation exists in artifacts object
        text.innerHTML = artifacts[originalArtifactName]; // Use translation from artifacts object
      }
    });
  };

}());
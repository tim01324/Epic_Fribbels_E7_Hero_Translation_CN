
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
  "mcd": "爆傷",
  "mcds": "爆秒",
  "dmgh": "治爆",
  "dmgd": "輸傷",
  "arti": "神器",
  "date": "日期",
  "Magaraha's_Tome": "魔法書",
  "Rod_of_Amaryllis": "孤挺花之杖",
  "Aurius": "亞烏利斯",
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
  });

  // grab all the artifact names in the rows
  const artsInTheRows = document.querySelectorAll('[col-id="artifactName"]');
  artsInTheRows.forEach((text) => {
    // remove all spaces
    var removeSpaceText = text.outerText.replace(/\s/g, "_")
    //  match the text and replace it
    Object.keys(lists).forEach((key) => {
      if (removeSpaceText == key) {
        if (removeSpaceText === lists[key]) {
        }
        text.innerHTML = lists[key];
      }
    });
  });

  // grab all the artifact names in the character infos
  const arts = document.querySelectorAll('.setArtifactRowRight');
  arts.forEach((text) => {
    // remove all spaces
    var removeSpaceText = text.outerText.replace(/\s/g, "_")
    //  match the text and replace it
    Object.keys(lists).forEach((key) => {
      if (removeSpaceText == key) {
        if (removeSpaceText === lists[key]) {
        }
        text.innerHTML = lists[key];
      }
    });
  });
};

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

window.onload = async () => {

    const startWords = ["りんご","りく","りかい","りとますし","りょうり","りこう","りす","りけい","りか","りもーと"];
    const max = startWords.length;
    const num = getRandomInt(max);
    await fetch("/shiritori", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nextWord: startWords[num] }),
    });
    const response = await fetch("/shiritori");
    const previousWord = await response.text();
    const para = document.querySelector("#previousWord");
    para.innerText = `前の単語：${previousWord}`;
};

document.querySelector("#nextWordSendButton").onclick = async () => {
    const nextWord = document.querySelector("#nextWordInput").value;
    const response = await fetch("/shiritori", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nextWord })
    });
    if (response.status / 100 !== 2) { 
      alert(await response.text());
      return;
    }
    const previousWord = await response.text();
    const para = document.querySelector("#previousWord");
    para.innerText = `前の単語：${previousWord}`;
};
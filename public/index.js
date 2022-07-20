window.onload = async () => {
    await fetch("/shiritori", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nextWord: "りんご" })
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
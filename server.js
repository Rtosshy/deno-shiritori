import { serve } from "https://deno.land/std@0.138.0/http/server.ts";

import { serveDir } from "https://deno.land/std@0.138.0/http/file_server.ts";

import * as fn from "./functions.js";

let previousWord = "しりとり";
const previousWords = ["しりとり"];
console.log("Listening on http://localhost:8000");

serve(async (req) => {
  
  const pathname = new URL(req.url).pathname;
  
  console.log(pathname);
  
  
  if (req.method === "GET" && pathname === "/shiritori") {
    
    return new Response(previousWord);
    
  }
  
  if (req.method === "POST" && pathname === "/shiritori") {
    
    const requestJson = await req.json();

    const nextWord = requestJson.nextWord;

    if (fn.isHiragana(nextWord)) {
      return new Response("ひらがなを使ってください。", { status: 400 });
    }
    if (fn.isContinuing(previousWord, nextWord)) {
      return new Response("前の単語に続いていません。", { status: 400 });
    }
    if (fn.isUsed(previousWords, nextWord)) {
      return new Response("既に使われた単語です。", { status: 400});
    }
    if (fn.isGameOver(nextWord)) {
      // window.location.href = "./public/result.html";
      return new Response("んがついたので負けです。", { status: 400 });
    }

    previousWords.push(nextWord);
    console.log(previousWords);
    previousWord = nextWord;

    return new Response(previousWord);

  }


  return serveDir(req, {

    fsRoot: "public",

    urlRoot: "",

    showDirListing: true,

    enableCors: true,

  });

});
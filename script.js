(function(){
  document.querySelectorAll(".pcard .thumbs").forEach(function(t){t.addEventListener("click",function(e){var b=e.target.closest(".th");if(!b)return;var m=t.parentNode.querySelectorAll(".pimg");m.forEach(function(x,i){x.classList.toggle("hide",i!=+b.dataset.src)});t.querySelectorAll(".th").forEach(function(x){x.classList.toggle("on",x===b)})})});

  var mb=document.querySelectorAll(".mat-btn");
  function showCat(c){var n=0;mb.forEach(function(x){var on=x.dataset.cat===c;x.classList.toggle("on",on);x.setAttribute("aria-pressed",on)});
    document.querySelectorAll(".gal [data-cat], .feature[data-cat]").forEach(function(el){var on=el.dataset.cat===c;el.classList.toggle("off",!on);if(on&&el.tagName==="FIGURE")n++});
    var fe=document.querySelector(".feature[data-cat]");if(fe&&!fe.classList.contains("off"))n+=1;
    var mc=document.getElementById("matcount");if(mc)mc.textContent=n+(n===1?" Arbeit":" Arbeiten");}
  if(mb.length){mb.forEach(function(x){x.addEventListener("click",function(){showCat(x.dataset.cat);try{history.replaceState(null,"","#"+x.dataset.cat)}catch(e){}})});
    var h=location.hash.slice(1);showCat(["lehm","naturofloor","novacolor","weitere"].indexOf(h)>=0?h:"lehm");}
  var sel=document.getElementById("produkt");
  function opts(){return sel?Array.prototype.map.call(sel.options,function(o){return o.text}):[]}
  var NAMES=["Oberflächengestaltung","Servierbrett","Stirnholzbrett","Flaschenöffner","Lasergravur","3D-Relief","Untersetzer","Kugelschreiber-Box","Anderes Einzelstück","Bader Digital"];
  document.querySelectorAll("[data-pick],[data-pick-link]").forEach(function(b){b.addEventListener("click",function(e){
    var v=b.dataset.pick||b.dataset.pickLink;var i=NAMES.indexOf(v);
    if(sel){e.preventDefault();sel.value=v;var w=document.getElementById("wunsch");if(w)w.focus();return}
    e.preventDefault();location.href="kontakt.html"+(i>=0?"#t"+i:"");
  })});
  if(sel){var m=/^#t(\d+)$/.exec(location.hash);if(m&&NAMES[+m[1]])sel.value=NAMES[+m[1]];}
  var f=document.getElementById("f");
  if(f){var out=document.getElementById("out"),msg=document.getElementById("msg"),st=document.getElementById("status");
  f.addEventListener("submit",function(e){
    e.preventDefault();
    var n=document.getElementById("name").value.trim();
    if(!n){st.textContent="Bitte gib deinen Namen ein.";document.getElementById("name").focus();return}
    var o=document.getElementById("ort").value.trim(),mm=document.getElementById("menge").value||"1",w=document.getElementById("wunsch").value.trim();
    var text="Hallo David, ich interessiere mich für: "+sel.value+(sel.value==="Bader Digital"||sel.value==="Oberflächengestaltung"?"":" ("+mm+" Stück)")+".\n"+(w?"Nachricht: "+w+"\n":"")+"Name: "+n+(o?", "+o:"");
    msg.textContent=text;document.getElementById("wa").href="https://wa.me/41798898946?text="+encodeURIComponent(text);
    out.classList.add("on");st.textContent="Fertig! Schick sie per WhatsApp oder kopier den Text.";
  });
  document.getElementById("copy").addEventListener("click",function(){
    function fb(){var r=document.createRange();r.selectNodeContents(msg);var s=getSelection();s.removeAllRanges();s.addRange(r);st.textContent="Text markiert. Bitte manuell kopieren."}
    try{navigator.clipboard.writeText(msg.textContent).then(function(){st.textContent="Text kopiert."},fb)}catch(x){fb()}
  });}
  if(document.getElementById("d-days")){
  // ---- App-Demo ----
  (function(){
    var E=[{d:"Mo",b:"Neubau Seestrasse",h:8.5},{d:"Di",b:"Neubau Seestrasse",h:8.5},{d:"Mi",b:"Regie · Fam. Keller",h:7}];
    var $=function(i){return document.getElementById(i)};
    var fmt=function(n){return n.toLocaleString("de-CH",{minimumFractionDigits:2,maximumFractionDigits:2})};
    var esc=function(t){return String(t).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})};
    var ORDER=["Mo","Di","Mi","Do","Fr"];
    function rap(){
      E.sort(function(a,b){return ORDER.indexOf(a.d)-ORDER.indexOf(b.d)});
      $("d-days").innerHTML=E.map(function(e,i){return '<div class="day"><i>'+e.d+'</i><span>'+esc(e.b)+'</span><em>'+e.h.toFixed(1)+' h</em><button class="x" type="button" data-i="'+i+'" aria-label="Eintrag löschen">×</button></div>'}).join("")||'<p class="kh">Noch keine Einträge diese Woche.</p>';
      var t=E.reduce(function(a,e){return a+e.h},0);$("d-tot").textContent=t.toFixed(1)+" h";
      var s=t-42.5;$("d-sal").textContent=(s>0?"+":"")+s.toFixed(1)+" h";
    }
    $("d-days").addEventListener("click",function(e){var b=e.target.closest("button.x");if(b){E.splice(+b.dataset.i,1);rap()}});
    $("d-add").addEventListener("click",function(){var h=parseFloat($("d-h").value);if(!(h>0))return;E.push({d:$("d-day").value,b:$("d-bs").value.trim()||"Baustelle",h:Math.min(h,14)});var n=ORDER.indexOf($("d-day").value);$("d-day").value=ORDER[Math.min(n+1,4)];rap()});
    var C={f:2,t:1};
    function v(i){var x=parseFloat($(i).value);return x>0?x:0}
    var A={wn:0,de:0};
    function aus(){
      var l=v("a-l"),b=v("a-b"),h=v("a-hh");var wb=2*(l+b)*h;var ab=Math.min(wb,C.f*1.44+C.t*2.1);
      A.wn=Math.round((wb-ab)*100)/100;A.de=$("a-dk").checked?Math.round(l*b*100)/100:0;
      $("a-f").textContent=C.f;$("a-t").textContent=C.t;
      $("a-wb").textContent=fmt(wb)+" m²";$("a-ab").textContent="−"+fmt(ab)+" m²";$("a-wn").textContent=fmt(A.wn)+" m²";$("a-de").textContent=fmt(A.de)+" m²";
    }
    document.querySelectorAll(".cnt button").forEach(function(b){b.addEventListener("click",function(){var k=b.dataset.c;C[k]=Math.max(0,Math.min(9,C[k]+(+b.dataset.d)));aus();kal()})});
    ["a-l","a-b","a-hh","a-dk"].forEach(function(i){$(i).addEventListener("input",function(){aus();kal()})});
    function r05(x){return Math.round(x*20)/20}
    function kal(){
      var P=[["Boden abdecken, abkleben",A.de||Math.round(v("a-l")*v("a-b")*100)/100,"m²",4.5],["Wände Dispersion matt, 2 Anstriche",A.wn,"m²",13.5]];
      if(A.de)P.push(["Decke Dispersion matt, 2 Anstriche",A.de,"m²",15.5]);
      if(C.t)P.push(["Türe beidseitig inkl. Rahmen lackieren",C.t,"Stk",295]);
      var net=0;$("k-pos").innerHTML=P.map(function(p){var s=Math.round(p[1]*p[3]*100)/100;net+=s;return '<div class="prow"><span>'+p[0]+'</span><div><span>'+fmt(p[1])+' '+p[2]+' × '+fmt(p[3])+'</span><b>'+fmt(s)+'</b></div></div>'}).join("");
      var mw=$("k-mw").checked?Math.round(net*8.1)/100:0;$("k-mwr").hidden=!$("k-mw").checked;
      $("k-net").textContent=fmt(net);$("k-mws").textContent=fmt(mw);$("k-tot").textContent=fmt(r05(net+mw));
    }
    $("k-mw").addEventListener("change",kal);
    var T={rap:["Wochenrapport","KW 44 · 26.–30. Okt."],aus:["Ausmass","Wohnzimmer · Beispiel"],kal:["Offerte","Familie Muster · Beispiel"]};
    function show(k){document.querySelectorAll(".dtabs button").forEach(function(b){var on=b.dataset.v===k;b.setAttribute("aria-selected",on);$("v-"+b.dataset.v).hidden=!on});$("d-title").textContent=T[k][0];$("d-sub").textContent=T[k][1]}
    document.querySelectorAll(".dtabs button").forEach(function(b){b.addEventListener("click",function(){show(b.dataset.v)})});
    $("a-go").addEventListener("click",function(){kal();show("kal")});
    rap();aus();kal();
  })();

  }
})();

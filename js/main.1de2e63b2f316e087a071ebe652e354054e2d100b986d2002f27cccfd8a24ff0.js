(()=>{$(document).ready(function(){let o,l=[],f={shouldSort:!0,includeMatches:!0,includeScore:!0,tokenize:!0,isCaseSensitive:!1,location:0,distance:100,minMatchCharLength:1,keys:[{name:"title",weight:.9},{name:"contents",weight:.35},{name:"tags",weight:.1},{name:"categories",weight:.05}]};fetch("/index.json").then(s=>s.json()).then(s=>{o=new Fuse(s,f);function r(e){let h=$("<ul class='search-result-list'>");for(let a=0;a<Math.min(l.length,8);a++){let t=l[a].item,c=$("<li>"),u=$("<a class='search-result-title'>"),g=t.title,w=t.permalink;u.attr("href",w).text(g);let p=$("<p class='search-result'>"),i=t.contents.toLowerCase().indexOf(e.toLowerCase());if(i!==-1){let d=Math.max(0,i-50),m=Math.min(i+e.length+50,t.contents.length),n=t.contents.substring(d,m);d>0&&(n="..."+n),m<t.contents.length&&(n+="..."),n=n.replace(new RegExp(e,"gi"),x=>`<em class="search-keyword">${x}</em>`),p.html(n),c.append(u),c.append(p),h.append(c)}}$("#local-search-result").empty(),$("#local-search-result").append(h)}$("#local-search-input").on("input",function(){let e=$(this).val().trim();l=o.search(e),console.log(l),e===""?$("#local-search-result").empty():r(e)}),r("")}).catch(s=>{console.error("Fetch search db failed."+s)})});})();

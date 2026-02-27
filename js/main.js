(() => {
  // <stdin>
  $(document).ready(function() {
    let fuse;
    let result = [];
    const fuseOptions = {
      shouldSort: true,
      includeMatches: true,
      includeScore: true,
      tokenize: true,
      isCaseSensitive: false,
      location: 0,
      distance: 100,
      minMatchCharLength: 1,
      keys: [
        { name: "title", weight: 0.9 },
        { name: "contents", weight: 0.35 },
        { name: "tags", weight: 0.1 },
        { name: "categories", weight: 0.05 }
      ]
    };
    fetch("/index.json").then((resp) => resp.json()).then((index) => {
      fuse = new Fuse(index, fuseOptions);
      function displaySearchResults(searchTerm) {
        const ul = $("<ul class='search-result-list'>");
        for (let i = 0; i < Math.min(result.length, 8); i++) {
          const item = result[i].item;
          const li = $("<li>");
          const a = $("<a class='search-result-title'>");
          const title = item.title;
          const link = item["permalink"];
          a.attr("href", link).text(title);
          const p = $("<p class='search-result'>");
          const index2 = item.contents.toLowerCase().indexOf(searchTerm.toLowerCase());
          if (index2 !== -1) {
            let startIndex = Math.max(0, index2 - 50);
            let endIndex = Math.min(index2 + searchTerm.length + 50, item.contents.length);
            let snippet = item.contents.substring(startIndex, endIndex);
            if (startIndex > 0) {
              snippet = "..." + snippet;
            }
            if (endIndex < item.contents.length) {
              snippet += "...";
            }
            snippet = snippet.replace(new RegExp(searchTerm, "gi"), (match) => `<em class="search-keyword">${match}</em>`);
            p.html(snippet);
            li.append(a);
            li.append(p);
            ul.append(li);
          }
        }
        $("#local-search-result").empty();
        $("#local-search-result").append(ul);
      }
      $("#local-search-input").on("input", function() {
        const searchTerm = $(this).val().trim();
        result = fuse.search(searchTerm);
        if (searchTerm === "") {
          $("#local-search-result").empty();
        } else {
          displaySearchResults(searchTerm);
        }
      });
      displaySearchResults("");
    }).catch((e) => {
      console.error("Fetch search db failed." + e);
    });
    console.log("Waline Stats URL config:", window.WALINE_SERVER_URL);
    if (window.WALINE_SERVER_URL) {
      const uvKey = "WALINE_USER_VISITED";
      let isNewVisitor = false;
      if (!localStorage.getItem(uvKey)) {
        isNewVisitor = true;
        localStorage.setItem(uvKey, "true");
      }
      const statsApiUrl = `${window.WALINE_SERVER_URL}/api/site-info?is_new=${isNewVisitor}`;
      fetch(statsApiUrl).then((response) => {
        if (!response.ok) throw new Error("Waline API responded with an error");
        return response.json();
      }).then((data) => {
        const pvElement = document.getElementById("waline_site_pv");
        const uvElement = document.getElementById("waline_site_uv");
        if (pvElement && data.site_pv !== void 0) pvElement.innerText = data.site_pv;
        if (uvElement && data.site_uv !== void 0) uvElement.innerText = data.site_uv;
      }).catch((error) => {
        console.error("service unavailable:", error);
        const pvElement = document.getElementById("waline_site_pv");
        const uvElement = document.getElementById("waline_site_uv");
        if (pvElement) pvElement.innerText = "-";
        if (uvElement) uvElement.innerText = "-";
      });
    } else {
      console.warn("\u672A\u627E\u5230 window.WALINE_SERVER_URL\uFF0C\u8DF3\u8FC7\u7EDF\u8BA1\u8BF7\u6C42\u3002");
    }
  });
})();

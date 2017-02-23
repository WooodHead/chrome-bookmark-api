document.addEventListener("DOMContentLoaded", function() {
    var el = document.getElementById("bookmarks");
    var ul = document.createElement("ul");
    var tree;
    var rootNode;

    chrome.bookmarks.getTree(function(t) {
        tree = t;
        rootNode = tree[0];
        var nodeList = getList(rootNode);
        var titleList = getList(rootNode, "title");
        var urlList = getList(rootNode, "url");

        console.dir(nodeList)
        console.dir(titleList)
        console.dir(urlList)
        nodeList.forEach(function(node) {
            var li = document.createElement("li");
            li.innerHTML = "<li><a href='" + node.url + "'>" + node.title + "</a></li>";
            li.onclick = function() {
                chrome.tabs.create({
                    url: node.url
                });
            };

            ul.appendChild(li);
        });

        el.append(ul);
    });

    function getList(node, prop) {
        var children = node.children;
        var ret = [];
        var tmp;
        if (prop) {
            ret.push(node[prop]);
        } else {
            ret.push(node);
        }

        if (children) {
            children.forEach(function(c) {
                tmp = getList(c, prop);
                ret = ret.concat(tmp);
            });
        }

        return ret;
    }

});

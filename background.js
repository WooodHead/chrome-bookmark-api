chrome.browserAction.onClicked.addListener(function(tab) {



    chrome.bookmarks.getTree(function(tree) {

        var rootNode = tree[0];
        sortFolder(rootNode);
    });

    function sortFolder(parent) {
        var children = parent.children;
        if (children) {

            children.forEach(function(c) {
                sortFolder(c);
            });

            children = children.sort(function(a, b) {
                var atitle = a.title;
                var btitle = b.title;
                var aIsFolder = a.children ? true : false;
                var bIsFolder = b.children ? true : false;

                if (aIsFolder && !bIsFolder) {
                    return -1;
                }
                if (!aIsFolder && bIsFolder) {
                    return 1;
                }
                if (atitle < btitle) {
                    return -1;
                }
                if (atitle > btitle) {
                    return 1;
                }

                return 0;
            });

            if (parent.id > 0) {
                children.forEach(function(ch, index) {
                    // console.log(ch.id, index);
                    chrome.bookmarks.move(ch.id, { 'index': index });
                });
            }

        }
    }

});

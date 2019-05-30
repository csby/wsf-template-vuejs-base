function getUrl() {
    const head = document.head;
    if(head) {
        const children = head.children
        if(children) {
            const childCount = children.length;
            for (let childIndex = 0; childIndex< childCount; childIndex++) {
                let child = children.item(childIndex)
                if(child) {
                    if(child.localName === "meta") {
                        let attrCount = child.attributes.length;
                        for (let attrIndex = 0; attrIndex < attrCount; attrIndex++) {
                            let attr = child.attributes.item(attrIndex)
                            if(attr) {
                                if(attr.localName === "api") {
                                    return attr.value;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    return "";
}

function getHost(url) {
    let host = "";
    if(url) {
        let start = url.indexOf("//");
        if(start !== -1) {
            let from = start + 2;
            let end = url.indexOf("/", from);
            if(end !== -1) {
                host = url.substring(start + 2, end);
            }
            else {
                host = url.substring(start + 2);
            }
        }
    }

    return host;
}

export default {
    getUrl,
    getHost
}
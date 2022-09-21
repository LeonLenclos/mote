
function getFile(url) {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", url, false);
  xhttp.send(null);
  return xhttp.responseText;
  // return he.decode(xhttp.responseText)
}

function getDOM(url){
  const parser = new DOMParser();
  const input = getFile(url);
  const doc = parser.parseFromString(input, "text/html");
  return doc;
}

function formatString (str, values) {
    for (let key in values) {
        str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), values[key]);
    }
    return str;
}

function exportStandAlone(data, title){
  const doc = getDOM('template.html')
  let sources = {}
  doc.querySelectorAll('script[src]').forEach(e=>{
    const src = e.getAttribute('src')
    const el = document.createElement("script");
    el.innerHTML = '{'+src+'}';
    sources[src] = getFile(src);
    e.parentNode.replaceChild(el, e);
  })
  doc.querySelectorAll('link[rel=stylesheet]').forEach(e=>{
    const src = e.getAttribute('href')
    const el = document.createElement("style");
    el.innerHTML = '{'+src+'}';
    sources[src] = getFile(src);
    e.parentNode.replaceChild(el, e);
  })
  const serializer = new XMLSerializer();
  let output = serializer.serializeToString(doc)
  output = formatString(output, sources)
  output = formatString(output, {title:'TYPO !', gamedata:data})
  download(output, title, 'html');
  return doc
}


function exportXML(data, title){
  download(data, title, 'xml');

}


function download(data, filename, type) {
  filename = filename.replace(/[\/|\\:*?"<>]/g, '');
  filename = filename.replace(' ', '_');
  filename = filename + '.' + type;
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}

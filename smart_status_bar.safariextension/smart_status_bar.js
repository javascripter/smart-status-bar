(function () {

var status_bar;
var onmessage;

if (window.top == window.self) {
  status_bar = document.createElement("span");
  status_bar.id = "smart_status_bar";
  status_bar.setAttribute("data-state", "on");
  document.body.appendChild(status_bar);
  onmessage = function (event) {
    var data = event.data;
    if ("text" in data) {
      status_bar.textContent = data.text;
    }
    status_bar.setAttribute("data-state", data.state);
  };
  window.addEventListener("message", onmessage, false);
}

var onmouseover = function (event) {
  if (!event.target.webkitMatchesSelector("a[href], a[href] *")) {
    return;
  }
  var anchor;
  for (anchor = event.target; !anchor.webkitMatchesSelector("a[href]"); anchor = anchor.parentNode) {
    continue;
  }
  anchor.addEventListener("mouseout", onmouseout, false);
  window.top.postMessage({
    text: decodeURIComponent(anchor.href),
    state: "on"
  }, "*");
};

var onmouseout = function (event) {
  window.top.postMessage({
    state: "off"
  }, "*");
  this.removeEventListener("mouseout", onmouseout, false);
};

document.addEventListener("mouseover", onmouseover, false);

})();
function init(cfg) {}

 function home(filter) {
     var classes = [
         {"type_name":"中文字幕","type_id":"dm265/cn/chinese-subtitle"},
         {"type_name":"最近更新","type_id":"dm513/cn/new"},
         {"type_name":"新作上市","type_id":"dm509/cn/release"}
     ];
     return JSON.stringify({
         "class": classes
     });
 }

 function category(tid, pg, filter, extend) {
     return JSON.stringify({"list": []});
 }

 function detail(id) {
     return JSON.stringify({"list": []});
 }

 function search(wd, quick) {
     return JSON.stringify({"list": []});
 }

 function play(flag, id, flags) {
     return JSON.stringify({"url": id});
 }

// 使用老式 var 声明，不使用 async/await
var pd = {};

function init(cfg) {
    // 初始化逻辑
}

function home(filter) {
    // 强制返回 JSON 字符串
    var result = {
        "class": [
            {"type_name": "✅ 路径完全正确", "type_id": "1"},
            {"type_name": "🚀 引擎支持正常", "type_id": "2"},
            {"type_name": "📡 MissAV测试", "type_id": "3"}
        ]
    };
    return JSON.stringify(result);
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
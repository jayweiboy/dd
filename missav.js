var rule = {
    title: 'MissAV',
    host: 'https://missav.ai',
    url: '/fyclass?page=fypage',
    searchUrl: '/cn/search/**?page=fypage',
    searchable: 1,
    quickSearch: 1,
    class_name: '中文字幕&最近更新&新作上市&今日热门&本週热门',
    class_url: 'dm265/cn/chinese-subtitle&dm513/cn/new&dm509/cn/release&dm242/cn/today-hot&dm168/cn/weekly-hot',
    
    // 首页逻辑
    home: function (filter) {
        var classes = [
            {"type_name":"中文字幕","type_id":"dm265/cn/chinese-subtitle"},
            {"type_name":"最近更新","type_id":"dm513/cn/new"},
            {"type_name":"新作上市","type_id":"dm509/cn/release"}
        ];
        return JSON.stringify({"class": classes});
    },

    // 分类页
    category: function (tid, pg, filter, extend) {
        var url = this.host + '/' + tid + '?page=' + pg;
        var html = req(url, {headers: {'User-Agent': 'Mozilla/5.0'}}).content;
        var $ = pdfh(html);
        var list = pdfa(html, '.thumbnail');
        var videos = [];
        list.forEach(function(it) {
            videos.push({
                vod_id: pdfh(it, '.text-secondary&&href'),
                vod_name: pdfh(it, '.text-secondary&&Text'),
                vod_pic: pdfh(it, 'img&&data-src'),
                vod_remarks: pdfh(it, '.left-1&&Text')
            });
        });
        return JSON.stringify({page: pg, list: videos});
    },

    // 详情、搜索、播放（保持空函数先测标签）
    detail: function (id) { return JSON.stringify({list: []}); },
    search: function (wd, quick) { return JSON.stringify({list: []}); },
    play: function (flag, id, flags) { return JSON.stringify({url: id}); }
};

// 兼容部分引擎的调用
function home(f) { return rule.home(f); }
function category(t, p, f, e) { return rule.category(t, p, f, e); }
function detail(i) { return rule.detail(i); }
function search(w, q) { return rule.search(w, q); }
function play(fl, i, fs) { return rule.play(fl, i, fs); }

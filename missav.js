var pd = typeof createCheerio !== 'undefined' ? createCheerio() : {};
var UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
var SITE_URL = 'https://missav.ai';

function init(cfg) {}

function home(filter) {
    var classes = [
        {"type_name":"中文字幕","type_id":"dm265/cn/chinese-subtitle"},
        {"type_name":"最近更新","type_id":"dm513/cn/new"},
        {"type_name":"新作上市","type_id":"dm509/cn/release"},
        {"type_name":"今日热门","type_id":"dm242/cn/today-hot"},
        {"type_name":"本週热门","type_id":"dm168/cn/weekly-hot"},
        {"type_name":"一本道","type_id":"dm58345/cn/1pondo"},
        {"type_name":"东京热","type_id":"dm29/cn/tokyohot"}
    ];
    return JSON.stringify({ "class": classes });
}

function category(tid, pg, filter, extend) {
    var page = pg || 1;
    var url = SITE_URL + '/' + tid + '?page=' + page;
    var res = req(url, { headers: { 'User-Agent': UA, 'Referer': SITE_URL } });
    var html = res.content;
    if (!html) return JSON.stringify({"list": []});
    var $ = pd.load(html);
    var videos = [];
    $('.thumbnail').each(function() {
        var $el = $(this);
        var a = $el.find('.text-secondary');
        videos.push({
            "vod_id": a.attr('href'),
            "vod_name": a.text().trim(),
            "vod_pic": $el.find('.w-full').attr('data-src'),
            "vod_remarks": $el.find('.left-1').text().trim()
        });
    });
    return JSON.stringify({ "page": page, "list": videos });
}

function detail(id) {
    var res = req(id, { headers: { 'User-Agent': UA, 'Referer': SITE_URL } });
    var html = res.content;
    var $ = pd.load(html);
    var playUrls = [];
    var match = html.match(/nineyu\.com\\\/(.+)\\\/seek\\\/_0\.jpg/);
    if (match && match[1]) {
        var uuid = match[1];
        playUrls.push('播放$' + 'https://surrit.com/' + uuid + '/playlist.m3u8');
    }
    var vod = {
        "vod_id": id,
        "vod_name": $('h1').text().trim(),
        "vod_play_from": 'MissAV',
        "vod_play_url": playUrls.join('#')
    };
    return JSON.stringify({ "list": [vod] });
}

function search(wd, quick) {
    var url = SITE_URL + '/cn/search/' + encodeURIComponent(wd);
    var res = req(url, { headers: { 'User-Agent': UA, 'Referer': SITE_URL } });
    var $ = pd.load(res.content);
    var videos = [];
    $('.thumbnail').each(function() {
        var $el = $(this);
        var a = $el.find('.text-secondary');
        videos.push({
            "vod_id": a.attr('href'),
            "vod_name": a.text().trim(),
            "vod_pic": $el.find('.w-full').attr('data-src'),
            "vod_remarks": $el.find('.left-1').text().trim()
        });
    });
    return JSON.stringify({ "list": videos });
}

function play(flag, id, flags) {
    return JSON.stringify({
        "parse": 0,
        "url": id,
        "header": { "User-Agent": UA, "Referer": SITE_URL }
    });
}

var rule = {
    title: '次元城动漫[漫]',
    host: 'https://www.cycanime.com',
    url: 'https://www.cycanime.com/api.php/provide/vod?&ac=detail&t=fyclass&pg=fypage&f=',
    class_name: 'TV动画&剧场版&4K专区',
    class_url: '20&21&26',
    homeUrl: 'https://www.cycanime.com/api.php/provide/vod?ac=detail',
    searchUrl: 'https://www.cycanime.com/api.php/provide/vod?ac=detail&wd=**&pg=fypage',
    detailUrl: 'https://www.cycanime.com/api.php/provide/vod?ac=detail&ids=fyid',
    searchable: 2,
    quickSearch: 0,
    play_parse: true,
    parse_url: 'https://player.cycanime.com/?url=',
    lazy: $js.toString(() => {
        if(/\\.(m3u8|mp4)/.test(input)){
            input = {parse:0,url:input}
        }else{
        if(rule.parse_url.startsWith('json:')){
            let purl = rule.parse_url.replace('json:','')+input;
            let html = request(purl);
            input = {parse:0,url:JSON.parse(html).url}
        }else{
        input= rule.parse_url+input;
        }
        }
        }),
    multi: 1,
    limit: 20,
    推荐: 'json:list;vod_name;vod_pic;vod_remarks;vod_id',
    一级: 'json:list;vod_name;vod_pic;vod_remarks;vod_id',
    二级: $js.toString(() => {
        let html = request(input);
        let list = JSON.parse(html).list;
        if(list.length===1){
        VOD = list[0];
        VOD.vod_play_from = '次元城播放器',
        VOD.vod_blurb = VOD.vod_blurb.replace(/　/g, '').replace(/<[^>]*>/g, '');
        VOD.vod_content = VOD.vod_content.replace(/　/g, '').replace(/<[^>]*>/g, '');
        }
    }),
    搜索: 'json:list;vod_name;vod_pic;vod_remarks;vod_id',

}
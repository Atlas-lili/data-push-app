export var listMap = [{
    key: 'first',
    title: '天气中心',
    icon: 'el-icon-umbrella',
    list: [{
        index: 'weather-air-now',
        txt: '天气/空气质量概览'
    }, {
        index: 'weather-history',
        txt: '近日天气'
    }]
}, {
    key: 'second',
    title: '疫情中心',
    icon: 'el-icon-data-analysis',
    list: [{
        index: 'epidemic-total',
        txt: '疫情概览'
    }, {
        index: 'epidemic-now',
        txt: '各省（市）确诊人数图'
    }, {
        index: 'epidemic-patient-relation',
        txt: '各市（县）患者转化图'
    }, {
        index: 'epidemic-city-relation',
        txt: '各省（市）地缘-确诊关系'
    }]
}, {
    key: '3th',
    title: '设置',
    icon: 'el-icon-setting',
    list: [{
        index: 'default-city',
        txt: '更改默认展示城市'
    }, {
        index: 'conf-sub',
        txt: '定制订阅'
    }]
}]

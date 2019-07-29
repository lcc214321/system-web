const env = process.env.NODE_ENV;

let conf = {
    sysId: "system",
    sysName: "平台系统管理中心",
    expiredays: 1000 * 60 * 60 * 24
};

let devConf = {baseUrl: 'http://localhost:10000'};

let testConf = {};

let prodConf = {};

if (env == 'development') {
    Object.assign(conf, devConf);
} else if (env == 'test') {
    Object.assign(conf, testConf);
} else if (env == 'production') {
    Object.assign(conf, prodConf);
}

export default conf;
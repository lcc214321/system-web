import router from '@/router';
import SystemApi from '@/api/SystemApi';

/**
 * 系统业务类
 */
class System {

    /**
     * 初始化系统服务
     * 
     * @param sysId 系统编号
     * @param callback 认证成功回调函数
     */
    constructor(sysId, callback) {
        if (!sysId) {
            throw new Error('系统名称不能为空！');
        }
        if (!cache) {
            throw new Error('系统缓存不能为空！');
        }
        this.sysId = sysId;
        SystemApi.isAuthen().then(isAuthen => {
            if (isAuthen) {
                this.loadInfo(callback);
            } else {
                router.push('/login');
            }
        });
    }

    /**
     * 加载登录用户信息
     * 
     * @param callback 加载成功回调函数
     */
    loadInfo(callback) {
        SystemApi.info().then(info => {
            cache.info = info;
            if (callback) {
                callback(info);
            } else {
                this.loadData(info);
            }
        });
    }

    /**
     * 加载系统缓存数据
     * 
     * @param info 用户信息
     */
    loadData(info) {
        this.loadMenu(info.roles);
        !cache.has('dict') && this.loadDict();
    }

    /**
     * 加载菜单
     * 
     * @param roles 角色列表
     */
    loadMenu(roles) {
        SystemApi.menu(this.sysId, roles).then(menu => cache.menu = menu);
    }

    /**
     * 加载字典
     */
    loadDict() {
        SystemApi.dict().then(dict => {
            cache.dict = dict;
            let dictList = {};
            let dictMap = {};
            dict.forEach(({code, children}) => {
                dictList[code] = [];
                dictMap[code] = {};
                if (children && children.length) {
                    dictList[code] = children.map(({code, name}) => ({label: name, value: code}));
                    let dm = {};
                    children.forEach(({code, name}) => dm[code] = name);
                    dictMap[code] = dm;
                }
            });
            cache.dictList = dictList;
            cache.dictMap = dictMap;
        });
    }

    /**
     * 清除用户缓存数据
     */
    clearData() {
        cache.has('info') && cache.del('info');
        cache.has('menu') && cache.del('menu');
    }

    /**
     * 递归查询树状列表数据
     * 
     * @param id
     *            查询编号
     * @param list
     *            查询列表
     * @param idField
     *            编号字段名
     * @param listField
     *            列表字段名
     * @return 查询结果
     */
    recursiveQuery(id, list, idField = "id", listField = "children") {
        if (!id || !list || !list.length) {
            return null;
        }
        for (let item of list) {
            if (!item) {
                continue;
            }
            if (item[idField] == id) {
                return item;
            }
            let result = recursiveQuery(id, item[listField], idField, listField);
            if (result) {
                return result;
            }
        }
        return null;
    }

    /**
     * 根据菜单编号获取菜单
     * 
     * @param menuId
     *            菜单编号
     * @return 菜单
     */
    getMenu(menuId) {
        if (!menuId) {
            return null;
        }
        let menu = this.recursiveQuery(menuId, cache.menu, "funcId");
        if (menu) {
            return menu;
        }
        return null;
    }

    /**
     * 根据地区代码获取地区
     * 
     * @param areaId
     *            地区编号
     * @return 地区
     */
    getArea(areaId) {
        if (!areaId || Number(areaId) <= 100000) {
            return cache.area;
        }
        let area = this.recursiveQuery(areaId, cache.area, "areaId");
        if (area) {
            return area;
        }
        return null;
    }

    /**
     * 根据地区代码获取地区名称
     * 
     * @param areaId
     *            地区编号
     * @return 地区名称
     */
    getAreaName(areaId) {
        let area = this.getArea(areaId);
        return area ? area.name : '';
    }

    /**
     * 根据上级字典编码获取字典
     * 
     * @param parentCode
     *            上级代码
     * @return 字典
     */
    getDictMap(parentCode) {
        if (cache.dictMap) {
            return cache.dictMap[parentCode];
        }
        return null;
    }

    /**
     * 根据上级字典编码获取字典
     * 
     * @param parentCode
     *            上级代码
     * @return 字典列表
     */
    getDictList(parentCode) {
        if (cache.dictList) {
            return cache.dictList[parentCode];
        }
        return null;
    }

    /**
     * 根据上级字典编码和子级字典编码获取字典名称
     * 
     * @param parentCode
     *            上级代码
     * @param code
     *            字典代码
     * @return 字典名称
     */
    getDictName(parentCode, code) {
        if (cache.dictMap && cache.dictMap[parentCode]) {
            return cache.dictMap[parentCode][code];
        }
        return null;
    }

    /**
     * 判断是否拥有权限
     * 
     * @param auth
     *            权限标识
     * @return 是否拥有权限
     */
    isAuth(auth) {
        if (auth && cache.info && cache.info.auths && cache.info.auths.length) {
            return cache.info.auths.includes(auth);
        }
        return false;
    }

}

export default System;
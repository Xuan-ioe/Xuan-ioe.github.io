// idb-util.js - IndexedDB工具类
export const UserDB = {
    dbName: 'UserDatabase',
    storeName: 'users',
    version: 1,
    db: null,

    // 初始化数据库
    init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.version);

            // 数据库版本升级或首次创建
            request.onupgradeneeded = (event) => {
                this.db = event.target.result;
                // 如果users仓库不存在则创建
                if (!this.db.objectStoreNames.contains(this.storeName)) {
                    const store = this.db.createObjectStore(this.storeName, {
                        keyPath: 'username' // 以用户名为主键
                    });
                    // 创建索引以便快速查询
                    store.createIndex('byPhone', 'phone', { unique: true });
                }
            };

            request.onsuccess = (event) => {
                this.db = event.target.result;
                resolve(this.db);
            };

            request.onerror = (event) => {
                console.error('IndexedDB打开失败:', event.target.error);
                reject(event.target.error);
            };
        });
    },

    // 获取所有用户
    getAllUsers() {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('数据库未初始化'));
                return;
            }

            const transaction = this.db.transaction(this.storeName, 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.getAll();

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    },

    // 获取用户
    getUser(username) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('数据库未初始化'));
                return;
            }

            const transaction = this.db.transaction(this.storeName, 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.get(username);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    },

    // 删除用户
    deleteUser(username) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('数据库未初始化'));
                return;
            }

            const transaction = this.db.transaction(this.storeName, 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.delete(username);

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    },

    // 保存用户（注册或更新状态时使用）
    saveUser(user) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('数据库未初始化'));
                return;
            }

            const transaction = this.db.transaction(this.storeName, 'readwrite');
            const store = transaction.objectStore(this.storeName);
            // 确保包含登录状态字段
            const userData = { ...user, isLoggedIn: user.isLoggedIn || false };
            const request = store.put(userData);

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }
};
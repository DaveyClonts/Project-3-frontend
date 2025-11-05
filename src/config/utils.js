export default class Utils {
    static setStore(name, content) {
        if (!name) return;

        if (typeof content !== "string") content = JSON.stringify(content);

        return window.localStorage.setItem(name, content);
    }

    static getStore(name) {
        if (!name) return;

        return JSON.parse(window.localStorage.getItem(name));
    }

    static removeItem(name) {
        if (!name) return;

        return window.localStorage.removeItem(name);
    }

    static isValidEmail(email) {
        return email &&
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,64}$/i.test(value)
            ? false
            : true;
    }
}

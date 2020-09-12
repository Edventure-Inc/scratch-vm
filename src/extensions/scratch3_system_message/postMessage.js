const postMessage = function (type, msg) {
    if (parent) {
        parent.postMessage({
            type: type,
            msg: msg
        }, '*');
    }
};
module.exports = postMessage;

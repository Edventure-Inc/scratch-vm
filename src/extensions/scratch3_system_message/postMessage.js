const postMessage = function (type, msg) {
    // console.log('send', {
    //     type: type,
    //     msg: msg
    // });
    if (parent) {
        parent.postMessage({
            type: type,
            msg: msg
        }, '*');
    }
};
module.exports = postMessage;

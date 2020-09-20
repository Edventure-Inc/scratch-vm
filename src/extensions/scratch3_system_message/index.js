/* eslint-disable no-console */
const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const formatMessage = require('format-message');
const MessageType = require('./message_type');
const postMessage = require('./postMessage');

class Message {
    constructor (runtime) {
        this.runtime = runtime;
        this.value = {
            audioFinished: '',
            audioStarted: '',
            continue: false
        };
        window.addEventListener('message', this.getMessageFromClient.bind(this));
    }
    getMessageFromClient (event) {
        if (event.data) {
            const {value, type} = event.data;
            switch (type) {
            case 'FINISH_AUDIO':
                this.value.audioFinished = value;
                break;
            case 'START_AUDIO':
                this.value.audioStarted = value;
                break;
            case 'CONTINUE':
                this.value.continue = true;
            }
        }
    }
}
class MessageBlocks {
    constructor (runtime) {
        this.runtime = runtime;
        this.getMessage = new Message(this.runtime);
    }
    _buildMenu (info) {
        return info.map((entry, index) => {
            const obj = {};
            obj.text = entry.name;
            obj.value = String(index + 1);
            return obj;
        });
    }
    get COLOR_INFO () {
        return [
            {
                name: formatMessage({
                    id: 'systemMessage.red',
                    default: '红色',
                    description: '状态条的颜色'
                })
            },
            {
                name: formatMessage({
                    id: 'systemMessage.yellow',
                    default: '黄色',
                    description: '状态条的颜色'
                })
            },
            {
                name: formatMessage({
                    id: 'systemMessage.green',
                    default: '绿色',
                    description: '状态条的颜色'
                })
            }
        ];
    }
    getInfo () {
        return {
            id: 'systemMessage',
            name: 'Message Blocks',
            iconURI: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAFCAAAAACyOJm3AAAAFklEQVQYV2P4DwMMEMgAI/+DE' +
      'UIMBgAEWB7i7uidhAAAAABJRU5ErkJggg==',
            blocks: [
                {
                    opcode: 'link-tip',
                    blockType: BlockType.COMMAND,
                    text: '环节提示 [TEXT]',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: '提示文本'
                        }
                    },
                    func: 'linkTip'
                },
                {
                    opcode: 'step-tip',
                    blockType: BlockType.COMMAND,
                    text: '步骤提示 [TEXT]',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: '提示文本'
                        }
                    },
                    func: 'stepTip'
                },
                {
                    opcode: 'operation-tip',
                    blockType: BlockType.COMMAND,
                    text: '操作提示 [TEXT]',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: '提示文本'
                        }
                    },
                    func: 'operationTip'
                },
                {
                    opcode: 'output-tip',
                    blockType: BlockType.COMMAND,
                    text: '输出提示 [TEXT]',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: '提示文本'
                        }
                    },
                    func: 'outputTip'
                },
                {
                    opcode: 'backlog-tip',
                    blockType: BlockType.COMMAND,
                    text: '待办提示 [TEXT]',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: '提示文本'
                        }
                    },
                    func: 'backlogTip'
                },
                {
                    opcode: 'other-tip',
                    blockType: BlockType.COMMAND,
                    text: '其他提示 [TEXT]',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: '提示文本'
                        }
                    },
                    func: 'otherTip'
                },
                {
                    opcode: 'status-bar-text',
                    blockType: BlockType.COMMAND,
                    text: '状态条文本 [TEXT]',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: '状态条文本'
                        }
                    },
                    func: 'statusBarText'
                },
                {
                    opcode: 'status-bar-percent',
                    blockType: BlockType.COMMAND,
                    text: '状态条百分比 [TEXT]%',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        }
                    },
                    func: 'statusBarPercent'
                },
                {
                    opcode: 'status-bar-color',
                    blockType: BlockType.COMMAND,
                    text: '状态条颜色 [COLOR]',
                    arguments: {
                        COLOR: {
                            type: ArgumentType.NUMBER,
                            menu: 'COLOR',
                            defaultValue: 1
                        }
                    },
                    func: 'statusBarColor'
                },
                {
                    opcode: 'status-bar-timer',
                    blockType: BlockType.COMMAND,
                    text: '状态条计时重置',
                    func: 'statusBarTimer'
                },
                {
                    opcode: 'load-file',
                    blockType: BlockType.COMMAND,
                    text: '加载课件 [TEXT]',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: '课件名称'
                        }
                    },
                    func: 'loadFile'
                },
                {
                    opcode: 'load-next-file',
                    blockType: BlockType.COMMAND,
                    text: '加载下个课件',
                    func: 'loadNextFile'
                },
                {
                    opcode: 'wait-audio-finish',
                    text: '播放[TEXT]完成',
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        }
                    },
                    func: 'waitAudioFinish'
                },
                {
                    opcode: 'wait-audio-start',
                    text: '播放[TEXT]',
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        }
                    },
                    func: 'waitAudioStart'
                },
                {
                    opcode: 'continue',
                    text: '等待老师继续',
                    blockType: BlockType.BOOLEAN,
                    func: 'teacherContinue'
                }
            ],
            menus: {
                COLOR: {
                    items: this._buildMenu(this.COLOR_INFO)
                }
            }
        };
    }
    linkTip (args) {
        postMessage(MessageType.linkTip, {
            msg: args.TEXT
        });
    }
    stepTip (args) {
        postMessage(MessageType.stepTip, {
            msg: args.TEXT
        });
    }
    operationTip (args) {
        postMessage(MessageType.operationTip, {
            msg: args.TEXT
        });
    }
    outputTip (args) {
        postMessage(MessageType.outputTip, {
            msg: args.TEXT
        });
    }
    backlogTip (args) {
        postMessage(MessageType.backlogTip, {
            msg: args.TEXT
        });
    }
    otherTip (args) {
        postMessage(MessageType.otherTip, {
            msg: args.TEXT
        });
    }
    statusBarText (args) {
        postMessage(MessageType.statusBarText, {
            msg: args.TEXT
        });
    }
    statusBarPercent (args) {
        postMessage(MessageType.statusBarPercent, {
            msg: args.TEXT
        });
    }
    statusBarColor (args) {
        const _colorMap = ['red', 'yellow', 'green'];
        postMessage(MessageType.statusBarColor, {
            msg: _colorMap[args.COLOR + 1]
        });
    }
    statusBarTimer () {
        postMessage(MessageType.statusBarTimer, {});
    }
    loadFile (args) {
        postMessage(MessageType.loadFile, {
            msg: args.TEXT
        });
    }
    loadNextFile () {
        postMessage(MessageType.loadNextFile, {});
    }
    waitAudioFinish (res) {
        const rs = res.TEXT === this.getMessage.value.audioFinished;
        // 获取当前值以后 再设置回默认值 下面同样
        this.getMessage.value.audioFinished = '';
        return rs;
    }
    waitAudioStart (res) {
        const rs = res.TEXT === this.getMessage.value.audioStarted;
        this.getMessage.value.audioStarted = '';
        return rs;
    }
    teacherContinue () {
        const res = this.getMessage.value.continue;
        this.getMessage.value.continue = false;
        return res;
    }
}

module.exports = MessageBlocks;

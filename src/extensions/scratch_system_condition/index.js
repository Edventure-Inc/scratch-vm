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
            audio: ''
        };
        window.addEventListener(
            'message',
            this.getMessageFromClient.bind(this)
        );
    }
    getMessageFromClient (event) {
        // TODO: 根据积木类型具体处理
        this.value.audio = event.data.value;
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
            iconURI:
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAFCAAAAACyOJm3AAAAFklEQVQYV2P4DwMMEMgAI/+DE' +
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
                    text: '播放 [TEXT] 完成',
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            default: '语音id'
                        }
                    },
                    func: 'waitAudioFinish'
                }
            ],
            menus: {
                COLOR: {
                    items: this._buildMenu(this.COLOR_INFO)
                }
            },
            // Optional: translations
            translation_map: {
                cn: {
                    'extensionName': 'Einige Blöcke',
                    'myReporter': 'Buchstabe [LETTER_NUM] von [TEXT]',
                    'myReporter.TEXT_default': 'Text',
                    'menuA_item1': 'Artikel eins',
                    // Dynamic menus can be translated too
                    'menuB_example': 'Beispiel',
                    // This message contains ICU placeholders (see `myReporter()` below)
                    'myReporter.result':
                        'Buchstabe {LETTER_NUM} von {TEXT} ist {LETTER}.'
                }
            },
            // Optional: list new target type(s) provided by this extension.
            targetTypes: [
                'wedo2',
                'speech' // automatically transformed to 'someBlocks.speech'
            ]
        };
    }
    linkTip (args) {
        postMessage(MessageType.linkTip, {
            msg: args.TEXT
        });
        console.log('linkTip', args);
    }
    stepTip (args) {
        postMessage(MessageType.stepTip, {
            msg: args.TEXT
        });
        console.log('stepTip', args);
    }
    operationTip (args) {
        postMessage(MessageType.operationTip, {
            msg: args.TEXT
        });
        console.log('operationTip', args);
    }
    outputTip (args) {
        postMessage(MessageType.outputTip, {
            msg: args.TEXT
        });
        console.log('outputTip', args);
    }
    backlogTip (args) {
        postMessage(MessageType.backlogTip, {
            msg: args.TEXT
        });
        console.log('backlogTip', args);
    }
    otherTip (args) {
        postMessage(MessageType.otherTip, {
            msg: args.TEXT
        });
        console.log('otherTip', args);
    }
    statusBarText (args) {
        postMessage(MessageType.statusBarText, {
            msg: args.TEXT
        });
        console.log('statusBarText', args);
    }
    statusBarPercent (args) {
        postMessage(MessageType.statusBarPercent, {
            msg: args.TEXT
        });
        console.log('statusBarPercent', args);
    }
    statusBarColor (args) {
        const _colorMap = ['red', 'yellow', 'green'];
        postMessage(MessageType.statusBarColor, {
            msg: _colorMap[args.COLOR + 1]
        });
        console.log('statusBarColor', args);
    }
    statusBarTimer () {
        postMessage(MessageType.statusBarTimer, {});
        console.log('statusBarTimer');
    }
    loadFile (args) {
        postMessage(MessageType.loadFile, {
            msg: args.TEXT
        });
        console.log('loadFile', args);
    }
    loadNextFile () {
        postMessage(MessageType.loadNextFile, {});
        console.log('loadNextFile');
    }
    waitAudioFinish (res) {
        return res.TEXT === this.getMessage.value.audio;
    }
}

module.exports = MessageBlocks;

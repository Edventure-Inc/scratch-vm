/* eslint-disable no-console */
const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const formatMessage = require('format-message');
const MessageType = require('./message_type');
const postMessage = require('./postMessage');

const handleImageStr = text => text === '预览图片' ? '' : text;
class Message {
    constructor (runtime) {
        this.runtime = runtime;
        this.value = {
            audioFinished: {},
            teacherContinue: {},
            audioStart: {}
        };
        window.addEventListener('message', this.getMessageFromClient.bind(this));
    }
    getMessageFromClient (event) {
        if (event.data) {
            const {value, type} = event.data;
            switch (type) {
            case 'WAIT_AUDIO_FINISH':
                this.value.audioFinished[value] = true;
                break;
            case 'WAIT_AUDIO_START':
                this.value.audioStarted[value] = true;
                break;
            case 'WAIT_TEACHER_CONTINUE':
                this.value.teacherContinue[value] = true;
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
            },
            {
                name: formatMessage({
                    id: 'systemMessage.red',
                    default: '红色',
                    description: '状态条的颜色'
                })
            },
            {
                name: formatMessage({
                    id: 'systemMessage.orange',
                    default: '橙色',
                    description: '状态条的颜色'
                })
            },
            {
                name: formatMessage({
                    id: 'systemMessage.blue',
                    default: '蓝色',
                    description: '状态条的颜色'
                })
            },
            {
                name: formatMessage({
                    id: 'systemMessage.purple',
                    default: '紫色',
                    description: '状态条的颜色'
                })
            },
            {
                name: formatMessage({
                    id: 'systemMessage.black',
                    default: '黑色',
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
                    text: '环节提示 [TEXT] [IMAGE]',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: '提示文本'
                        },
                        IMAGE: {
                            type: ArgumentType.STRING,
                            defaultValue: '预览图片'
                        }
                    },
                    func: 'linkTip'
                },
                {
                    opcode: 'step-tip',
                    blockType: BlockType.COMMAND,
                    text: '步骤提示 [TEXT] [IMAGE]',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: '提示文本'
                        },
                        IMAGE: {
                            type: ArgumentType.STRING,
                            defaultValue: '预览图片'
                        }
                    },
                    func: 'stepTip'
                },
                {
                    opcode: 'operation-tip',
                    blockType: BlockType.COMMAND,
                    text: '操作提示 [TEXT] [IMAGE]',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: '提示文本'
                        },
                        IMAGE: {
                            type: ArgumentType.STRING,
                            defaultValue: '预览图片'
                        }
                    },
                    func: 'operationTip'
                },
                {
                    opcode: 'output-tip',
                    blockType: BlockType.COMMAND,
                    text: '输出提示 [TEXT] [IMAGE]',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: '提示文本'
                        },
                        IMAGE: {
                            type: ArgumentType.STRING,
                            defaultValue: '预览图片'
                        }
                    },
                    func: 'outputTip'
                },
                {
                    opcode: 'backlog-tip',
                    blockType: BlockType.COMMAND,
                    text: '待办提示 [TEXT] [IMAGE]',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: '提示文本'
                        },
                        IMAGE: {
                            type: ArgumentType.STRING,
                            defaultValue: '预览图片'
                        }
                    },
                    func: 'backlogTip'
                },
                {
                    opcode: 'other-tip',
                    blockType: BlockType.COMMAND,
                    text: '其他提示 [TEXT] [IMAGE]',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: '提示文本'
                        },
                        IMAGE: {
                            type: ArgumentType.STRING,
                            defaultValue: '预览图片'
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
                    opcode: 'enter-step',
                    blockType: BlockType.COMMAND,
                    text: '进入步骤 [TEXT]',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: '步骤ID'
                        }
                    },
                    func: 'enterStep'
                },
                {
                    opcode: 'send-audio',
                    blockType: BlockType.COMMAND,
                    text: '发送预置语音 [TEXT]',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: '语音名称/ID'
                        }
                    },
                    func: 'sendAudio'
                },
                {
                    opcode: 'wait-audio-start',
                    blockType: BlockType.BOOLEAN,
                    text: '预置语音 [TEXT]开始播放',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: '语音名称/ID'
                        }
                    },
                    func: 'waitAudioStart'
                },
                {
                    opcode: 'wait-audio-finish',
                    text: '播放[TEXT]完成',
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: '语音名称/ID'
                        }
                    },
                    func: 'waitAudioFinish'
                },
                {
                    opcode: 'process-break',
                    blockType: BlockType.COMMAND,
                    text: '阻断流程 [TEXT]',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: 'ID'
                        }
                    },
                    func: 'processBreak'
                },
                {
                    opcode: 'wait-teacher-continue',
                    text: '等待老师继续 [TEXT]',
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: 'ID'
                        }
                    },
                    func: 'waitTeacherContinue'
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
            msg: args.TEXT,
            image: handleImageStr(args.IMAGE)
        });
    }
    stepTip (args) {
        postMessage(MessageType.stepTip, {
            msg: args.TEXT,
            image: handleImageStr(args.IMAGE)
        });
    }
    operationTip (args) {
        postMessage(MessageType.operationTip, {
            msg: args.TEXT,
            image: handleImageStr(args.IMAGE)
        });
    }
    outputTip (args) {
        postMessage(MessageType.outputTip, {
            msg: args.TEXT,
            image: handleImageStr(args.IMAGE)
        });
    }
    backlogTip (args) {
        postMessage(MessageType.backlogTip, {
            msg: args.TEXT,
            image: handleImageStr(args.IMAGE)
        });
    }
    otherTip (args) {
        postMessage(MessageType.otherTip, {
            msg: args.TEXT,
            image: handleImageStr(args.IMAGE)
        });
    }
    statusBarText (args) {
        postMessage(MessageType.statusBarText, {
            msg: args.TEXT,
            image: handleImageStr(args.IMAGE)
        });
    }
    statusBarPercent (args) {
        postMessage(MessageType.statusBarPercent, {
            msg: args.TEXT
        });
    }
    statusBarColor (args) {
        const _colorMap = ['yellow', 'green', 'red', 'orange', 'blue', 'purple', 'black'];
        postMessage(MessageType.statusBarColor, {
            msg: _colorMap[Number(args.COLOR) - 1]
        });
    }
    statusBarTimer () {
        postMessage(MessageType.statusBarTimer, {});
    }
    enterStep (args) {
        postMessage(MessageType.enterStep, {
            msg: args.TEXT
        });
    }
    waitAudioFinish (res) {
        const rs = this.getMessage.value.audioFinished[res.TEXT];
        // 获取当前值以后 再设置回默认值 避免异常
        if (rs) {
            delete this.getMessage.value.audioFinished[res.TEXT];
        }
        return rs;
    }
    sendAudio (args) {
        postMessage(MessageType.sendAudio, {
            audio: args.TEXT
        });
    }
    waitAudioStart (res) {
        const rs = this.getMessage.value.audioStart[res.TEXT];
        // 获取当前值以后 再设置回默认值 避免异常
        if (rs) {
            delete this.getMessage.value.audioStart[res.TEXT];
        }
        return rs;
    }
    processBreak (res) {
        postMessage(MessageType.processBreak, {
            operation: res.TEXT
        });
    }
    waitTeacherContinue (res) {
        const rs = this.getMessage.value.teacherContinue[res.TEXT];
        if (rs) {
            delete this.getMessage.value.teacherContinue[res.TEXT];
        }
        return rs;
    }
}

module.exports = MessageBlocks;

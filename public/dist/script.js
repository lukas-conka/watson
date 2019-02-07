"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var textInput = document.getElementById('textInput');
//@ts-ignore
var chat = document.getElementById('chat');
var context = {};
var templateChatMessage = function (message, from) { return "\n    <div class=\"from-" + from + "\">\n        <div class=\"message-inner\">\n            <p>" + message + "</p>\n        </div>\n    </div>\n"; };
var InsertTemplateInChat = function (template) {
    var div = document.createElement('div');
    div.innerHTML = template;
    //@ts-ignore
    chat.appendChild(div);
};
var getWatsonMessageAndInsertTemplate = function (text) {
    if (text === void 0) { text = ''; }
    return __awaiter(_this, void 0, void 0, function () {
        var uri, response, template;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    uri = 'http://localhost:3000/conversation/';
                    return [4 /*yield*/, fetch(uri, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                text: text,
                                context: context,
                            }),
                        })];
                case 1: return [4 /*yield*/, (_a.sent()).json()];
                case 2:
                    response = _a.sent();
                    context = response.context;
                    template = templateChatMessage(response.output.text, 'watson');
                    InsertTemplateInChat(template);
                    return [2 /*return*/];
            }
        });
    });
};
//@ts-ignore
textInput.addEventListener('keydown', function (event) {
    //@ts-ignore
    if (event.keyCode === 13 && textInput.value) {
        //@ts-ignore
        getWatsonMessageAndInsertTemplate(textInput.value);
        //@ts-ignore
        var template = templateChatMessage(textInput.value, 'user');
        InsertTemplateInChat(template);
        //@ts-ignore
        textInput.value = '';
    }
});
getWatsonMessageAndInsertTemplate();

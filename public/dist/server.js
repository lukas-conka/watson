"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var v1_1 = __importDefault(require("watson-developer-cloud/assistant/v1"));
var server = express_1.default();
server.use(body_parser_1.default.json());
server.use(express_1.default.static('./public'));
var assistant = new v1_1.default({
    version: '2019-02-05',
    iam_apikey: '-m9gvPH4QNc7g1RtYODTE9yMgAxFATP_gi0w8epzz4nz',
    url: 'https://gateway.watsonplatform.net/assistant/api'
});
/*server.get('/conversation/:text*?', (req, res) =>{
    const {text} = req.params;

    res.json(text);
});
*/
server.post('/conversation/', function (req, res) {
    //@ts-ignore    
    var _a = req.body, text = _a.text, _b = _a.context, context = _b === void 0 ? {} : _b;
    var params = {
        input: { text: text },
        workspace_id: '2a9bbefd-5113-427e-965d-de2e6ce926d2',
        context: context
    };
    assistant.message(params, function (err, response) {
        if (err) {
            console.error(err);
            res.status(500).json(err);
        }
        else {
            res.json(response);
        }
    });
});
server.get("/", function (_, res) {
    res.send("Hello world");
});
exports.default = server;

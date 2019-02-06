import express from "express";
import bodyParser from "body-parser";
import AssistantV1 from "watson-developer-cloud/assistant/v1";

const server = express();
server.use(bodyParser.json());
server.use(express.static('./public'));

const assistant = new AssistantV1({
        version: '2019-02-05',
        iam_apikey: '-m9gvPH4QNc7g1RtYODTE9yMgAxFATP_gi0w8epzz4nz',
        url: 'https://gateway.watsonplatform.net/assistant/api'
});

/*server.get('/conversation/:text*?', (req, res) =>{
    const {text} = req.params;

    res.json(text);
});
*/

server.post('/conversation/', (req, res) =>{
    //@ts-ignore    
    const { text, context = {} } = req.body;

    const params = {
        input: { text },
        workspace_id: '2a9bbefd-5113-427e-965d-de2e6ce926d2',
        context
    };

    assistant.message(params, (err, response) =>{

        if(err){
            console.error(err); 
            res.status(500).json(err);
        }else{
            res.json(response);
        }
    });
});

server.get("/", (_, res) =>{
    res.send("Hello mundo");
});

export default server;
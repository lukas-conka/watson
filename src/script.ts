const textInput =document.getElementById('textInput');
 //@ts-ignore
 const chat = document.getElementById('chat');
let context = {};

const templateChatMessage = (message: string, from: string) => `
    <div class="from-${from}">
        <div class="message-inner">
            <p>${message}</p>
        </div>
    </div>
`;

const InsertTemplateInChat = (template: any) => {

    const div = document.createElement('div');
    div.innerHTML = template;
//@ts-ignore
   chat.appendChild(div);

};

const getWatsonMessageAndInsertTemplate = async(text = '') => {

    const uri = 'http://localhost:3000/conversation/';

    const response = await (await fetch(uri, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            text,
            context,
        }),
    })).json();

    context = response.context;

    const template = templateChatMessage(response.output.text, 'watson');

    InsertTemplateInChat(template);
};

//@ts-ignore
textInput.addEventListener('keydown', (event:any) => {
    //@ts-ignore
    if(event.keyCode === 13 && textInput.value){
        //@ts-ignore
        getWatsonMessageAndInsertTemplate(textInput.value);
//@ts-ignore
        const template = templateChatMessage(textInput.value, 'user');
        InsertTemplateInChat(template);
//@ts-ignore
        textInput.value = '';
    }    
});

getWatsonMessageAndInsertTemplate();
'use strict';
import io from 'socket.io-client';
import $ from 'jquery';

const socket = io('http://localhost:3000');
const chatTable = $('#chat-table');
const textArea = $('#text-area');
const submitButton = $('#submit-button');
let messages = [];
const timer = setInterval(function(){reWriteAllMessages(messages)}, 1000);

submitButton.click(() => {
    const sendMessage = textArea.val();
    const escapedSendMessage = $('<p/>').text(textArea.val()).html();
    console.log(escapedSendMessage);
    textArea.val('');
    if (escapedSendMessage.length === 0) return;

    socket.emit('message was submitted', { message: escapedSendMessage });
});

socket.on('coming message', (gotMessages) => {
    messages = gotMessages;
    reWriteAllMessages(messages);
    chatTable.scrollTop(chatTable[0].scrollHeight);
});

socket.on('new message', (newMessageObj) => {
    messages.push(newMessageObj);
    reWriteAllMessages(messages);
});

function reWriteAllMessages(messages) {
    let chatText = '';
    messages.map((messageObj) => {
        chatText += createChatHtml(messageObj);
    });
    chatTable.html(chatText);
}

function createChatHtml(messageObj) {
    let chatText = '';
    const timeFormated = timeFormatter(messageObj.time);

    chatText += `<p>`;
    chatText += `<span class="chat-passed-time">${timeFormated}</span><br>`;
    chatText += `<span class="chat-message">${messageObj.message}</span>`;
    chatText += `</p>`;

    return chatText;
}

function timeFormatter(time) {
    const passedTime = new Date().getTime() - time;

    const passedDay     = Math.floor(passedTime / 1000 / 60 / 60 /24);
    const passedHour    = Math.floor(passedTime / 1000 / 60 / 60);
    const passedMinutes = Math.floor(passedTime / 1000 / 60);
    const passedSeconds = Math.floor(passedTime / 1000);

    if (passedDay > 0) {
        return `${passedDay}日前`;
    }

    if (passedHour > 0) {
        return `${passedHour}時間前`;
    }

    if (passedMinutes > 0) {
        return `${passedMinutes}分前`;
    }

    if (passedSeconds > 0) {
        return `${passedSeconds}秒前`;
    }

    return `たった今`;
}
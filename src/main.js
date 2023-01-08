import './index.css';
import { setupCounter } from './counter.js';
import Peer from 'simple-peer/simplepeer.min.js';
import freeice from 'freeice';

const connect = document.getElementById('connect');
const yourID = document.getElementById('yourID');
const otherID = document.getElementById('otherID');
const yourMessage = document.getElementById('yourMessage');
const messages = document.getElementById('messages');
const send = document.getElementById('send');

const peer = new Peer({
  initiator: location.hash === '#init',
  trickle: false,
  config: { iceServers: freeice() },
});
// const peer2 = new Peer()
peer.on('error', (err) => console.log('error', err));
peer.on('signal', function (data) {
  yourID.value = JSON.stringify(data);
});

connect.addEventListener('click', () => {
  peer.signal(otherID.value);
});

send.addEventListener('click', () => {
  peer.send(yourMessage.value);
});

peer.on('data', (data) => {
  messages.textContent += data + '\n';
});

setupCounter(document.querySelector('#counter'));

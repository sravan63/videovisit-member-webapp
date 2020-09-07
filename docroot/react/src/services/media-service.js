import React from 'react';
import Axios from 'axios-observable';
import DeviceService from './device-peripheral-service.js';
import Utilities from './utilities-service.js';
import { MessageService } from './message-service';
import GlobalConfig from './global.config';
import { range } from 'rxjs';
import { map, filter } from 'rxjs/operators';

class MediaService extends React.Component {

    constructor() {
        super();
        this.state = { mediaData: {}, selectedConstrain : {} };
        this.mediaData = {};
        this.drawNewCanvas = true;
        this.cameraAllowed = false;
        this.micAllowed = false;
    }
    
    // Initiates the device load
    loadDeviceMediaData(){
      var browserInfo = Utilities.getBrowserInformation();
      var isSetup = sessionStorage.getItem('isSetupPage');
      if(!browserInfo.isIE){
        if(browserInfo.isSafari || browserInfo.isFireFox) {
            if (!Utilities.isMobileDevice()) {
                MessageService.sendMessage(GlobalConfig.MEDIA_PERMISSION, 'prompt');
            }
            if (isSetup =='true') {
                navigator.mediaDevices.getUserMedia({audio: true, video: false}).then((stream) => {
                    console.log('Stream1 started with success');
                    window.localStream = stream;
                    this.setDevice();
                }).catch((error) => {
                    this.handleError(error);
                    console.log('Failed to start stream1');
                });
            } else {
                navigator.mediaDevices.getUserMedia({audio: true, video: true}).then((stream) => {
                    console.log('Stream1 started with success');
                    window.localStream = stream;
                    this.setDevice();
                }).catch((error) => {
                    this.handleError(error);
                    console.log('Failed to start stream1');
                });
            }
        } else {
          navigator.mediaDevices.enumerateDevices().then((list)=>{
              this.gotDevicesList(list);
          }).catch((error)=>{
              this.handleError(error);
          });
        }
      
      // Registers the devie change handler.
      navigator.mediaDevices.ondevicechange = this.onDeviceChange;
      }
    }

    setDevice(){
    MessageService.sendMessage(GlobalConfig.CLOSE_MODAL_AUTOMATICALLY, null);
    MessageService.sendMessage(GlobalConfig.RENDER_VIDEO_DOM, true);
     navigator.mediaDevices.enumerateDevices().then((list)=>{
       this.gotDevicesList(list.slice(0));
     }).catch((error)=>{
       this.handleError(error)
     });
    }

    stopAudio(){
      if(window.localStream) {
          localStream.getTracks().forEach((track) => {
              track.stop();
          });
      }
    }

    // Gets the list of devices on load.
    gotDevicesList(devices){
        this.sergigateMediaByKind(devices);
        devices.map(mData => {
            const media = {};
            if( mData.label == '' ){
              var dummy = mData.kind == 'videoinput' ? 'Camera ' : mData.kind == 'audioinput' ? 'Microphone ' : 'Speaker ';
              dummy += this.mediaData[mData.kind].length + 1;
              media['label'] = dummy;
            } else {
              media['label'] = mData.label;
            }
            media['deviceId'] = mData.deviceId;
            media['kind'] = mData.kind;
            this.mediaData[media.kind].push(media);
        });


        let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
        let isSetup = sessionStorage.getItem('isSetupPage');
        if(isChrome && !Utilities.isMobileDevice() && !isSetup) {
            setTimeout(()=>{
                this.cameraPermissions();
                this.micPermissions();
            },1600);
        }
        console.log('Media Service - List Of Media Devices :: ' + this.mediaData);
        MessageService.sendMessage(GlobalConfig.MEDIA_DATA_READY, this.mediaData);
    }
  
  // Error call back.
    handleError(error){
        var ErrorMsg = error.message,
            browserInfo = Utilities.getBrowserInformation();
        if(ErrorMsg =='Failed starting capture of a audio track'){
          alert("Unable to join: Looks like you're on a phone call, hangup and refresh page to join.");
        }
        if(browserInfo.isSafari || browserInfo.isFireFox) {
            let isSetup = sessionStorage.getItem('isSetupPage');
            if (!Utilities.isMobileDevice() && !isSetup){
                if (error.name == 'NotAllowedError') {
                    MessageService.sendMessage(GlobalConfig.MEDIA_PERMISSION, 'denied');
                }
            }
        }
        console.log('Media Service - Error Occured :: '+error);
    }

    // Segregates the media by type.
    sergigateMediaByKind(devices){
        devices.map(media => {
            this.mediaData[media.kind] = [];
        });
    }

    // Returns the list of media devices.
    getMediaList(){
        return this.mediaData;
    }

    // Triggers when a device is plugged in or plugged out.
    onDeviceChange(event){
      if(browserInfo.OSName.toLowerCase() !== "windows"){
        console.log("DEVICE CHANGE EVENT TRIGGERED");
        navigator.mediaDevices.enumerateDevices();
        this.start(this.state.selectedConstrain);
      }
    }

    // Chages the microphone on dropdown change.
    changeAudioDestination(speaker, dom='preview') {
      var audioDestination = speaker.deviceId;
      var videoElement = document.getElementById(dom);
      DeviceService.helperRingtoneStop();
      this.attachSinkId(videoElement, audioDestination);
    }

    // Attach audio output device to video element using device/sink ID.
    attachSinkId(element, sinkId) {
      if (typeof element.sinkId !== 'undefined') {
        element.setSinkId(sinkId)
        .then(function() {
          console.log('Success, audio output device attached: ' + sinkId);
        })
        .catch(function(error) {
          var errorMessage = error;
          if (error.name === 'SecurityError') {
            errorMessage = 'You need to use HTTPS for selecting audio output ' +
                'device: ' + error;
          }
          console.error(errorMessage);
        });
      } else {
        console.warn('Browser does not support output device selection.');
      }
    }

    // Starts the vide, audio and microphone stream.
    start(constrains) {
      if (window.stream) {
        window.stream.getTracks().forEach(function(track) {
          track.stop();
        });
      }
      this.state.selectedConstrain = constrains;
      var constraints = {
        audio: {deviceId: constrains.audioSource ? {exact: constrains.audioSource.deviceId} : undefined},
        video: {deviceId: constrains.videoSource ? {exact: constrains.videoSource.deviceId} : undefined}
      };
      navigator.mediaDevices.getUserMedia(constraints).then((stream)=>{
            this.gotStream(stream);
        }).catch((error)=>{
            this.handleError(error);
        });
    }

    // Stream success callback.
    gotStream(stream) {
      var videoElement = document.querySelector('video');
      window.stream = stream; // make stream available to console
      videoElement.srcObject = stream;
      videoElement.volume = 0;
      // Start audio block
      if(this.drawNewCanvas){
        DeviceService.addCanvas();
        this.drawNewCanvas = false;
      }
      DeviceService.micTest();
      // Refresh button list in case labels have become available
      return navigator.mediaDevices.enumerateDevices();
    }
    // Force stop of the stream
    stop(){
      if (window.stream) {
        window.stream.getTracks().forEach(function(track) {
          track.stop();
          DeviceService.helperRingtoneStop();
        });
      }
    }

    // Playback related code
    toggleMusic(canPlay){
      if(canPlay){
        DeviceService.helperRingtonePlay();
      } else {
        DeviceService.helperRingtoneStop();
      }
    }
     cameraPermissions(){
        navigator.permissions.query(
            { name: 'camera' }
        ).then(function(permissionStatus){
            console.log(permissionStatus.state); // granted, denied, prompt

            if(permissionStatus.state == 'granted'){
                this.cameraAllowed = true;
                if(this.micAllowed==true) {
                    MessageService.sendMessage(GlobalConfig.RENDER_VIDEO_DOM, true);
                }
            } else  if(permissionStatus.state == 'denied'){
                MessageService.sendMessage(GlobalConfig.MEDIA_PERMISSION, 'denied');
            }
            else {
                MessageService.sendMessage(GlobalConfig.MEDIA_PERMISSION, 'prompt');
            }

            permissionStatus.onchange = function(){
                console.log("Permission changed to " + this.state);
                if(this.state == 'denied'){
                    MessageService.sendMessage(GlobalConfig.MEDIA_PERMISSION, 'denied');
                } else if(this.state == 'granted'){
                    var deniedError  = document.getElementsByClassName('selectIcon').length;
                    if(deniedError == 0){
                        MessageService.sendMessage(GlobalConfig.CLOSE_MODAL_AUTOMATICALLY, null);
                        MessageService.sendMessage(GlobalConfig.RENDER_VIDEO_DOM, true);
                    }

                    //MessageService.sendMessage(GlobalConfig.CLOSE_MODAL_AUTOMATICALLY, null);
                    //MessageService.sendMessage(GlobalConfig.RENDER_VIDEO_DOM, true);
                }
            }
        });
    }

     micPermissions(){
        navigator.permissions.query(
            { name: 'microphone' }
        ).then(function(permissionStatus){
            console.log(permissionStatus.state); // granted, denied, prompt

            if(permissionStatus.state === 'granted') {
                this.micAllowed=true;
                if(this.cameraAllowed==true) {
                    MessageService.sendMessage(GlobalConfig.RENDER_VIDEO_DOM, true);
                }
            }
            else  if(permissionStatus.state == 'denied'){
                MessageService.sendMessage(GlobalConfig.MEDIA_PERMISSION, 'denied');
            }
            else {
                MessageService.sendMessage(GlobalConfig.MEDIA_PERMISSION, 'prompt');
            }

            permissionStatus.onchange = function(){
                console.log("Permission changed to " + this.state);
                if(this.state == 'denied'){
                    MessageService.sendMessage(GlobalConfig.MEDIA_PERMISSION, 'denied');
                } else if(this.state == 'granted'){
                    var deniedError  = document.getElementsByClassName('selectIcon').length;
                    if(deniedError == 0){
                        MessageService.sendMessage(GlobalConfig.CLOSE_MODAL_AUTOMATICALLY, null);
                        MessageService.sendMessage(GlobalConfig.RENDER_VIDEO_DOM, true);
                    }
                    //MessageService.sendMessage(GlobalConfig.CLOSE_MODAL_AUTOMATICALLY, null);
                    //MessageService.sendMessage(GlobalConfig.RENDER_VIDEO_DOM, true);
                }
            }
        });
    }

}
export default new MediaService();

const fs = require('fs');
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const textToSpeech = new TextToSpeechV1({
  authenticator: new IamAuthenticator({
    apikey: 'hwpd8mSLGIWXXbYCCh5rvhq15plRCoPFBW385oHZQRGY',
  }),
  url: 'https://api.us-south.text-to-speech.watson.cloud.ibm.com/instances/6e976b59-9052-4eff-82c7-ec7dcbfb4225',
});

const synthesizeParams = {  
  text: 'Teste da conversão de texto para o audio',
  accept: 'audio/wav',
  voice: 'pt-BR_IsabelaVoice',
};

textToSpeech.synthesize(synthesizeParams)
  .then(response => {
    // only necessary for wav formats,
    // otherwise `response.result` can be directly piped to a file
    return textToSpeech.repairWavHeaderStream(response.result);
  })
  .then(buffer => {
    fs.writeFileSync('audio.ogg', buffer);
  })
  .catch(err => {
    console.log('error:', err);
  });
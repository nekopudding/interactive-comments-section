import juliusomo from 'images/avatars/image-juliusomo.png'
import amyrobson from 'images/avatars/image-amyrobson.png'
import maxblagun from 'images/avatars/image-maxblagun.png'
import ramsesmiron from 'images/avatars/image-ramsesmiron.png'

export default function selectAvatar(username) {
  switch (username){
    case "amyrobson": return amyrobson;
    case "juliusomo": return juliusomo;
    case "maxblagun": return maxblagun;
    case "ramsesmiron": return ramsesmiron;
    default: return;
  }
}
const connection = new connectToWebRTC('stun:stun.l.google.com:19302');
class connectToWebRTC {

    constructor(stunServerUrl){
        this.device = new RTCPeerConnection({
            iceServers:[{
                urls: stunServerUrl
            }]
        }) 
        this.localSDP = null
    }

    establishConnectionRemote(){
        const value =  document.getElementById("remote-string").value
        this.device.setRemoteDescription(value)

    }
    async establishConnectionLocal(){
        this.offer = await this.device.createOffer()
        await this.device.setLocalDescription(this.offer)

        await new Promise((resolve)=>{
            this.device.onicecandidate = (event) => {
                // this needs to fire when all candidates are completed 
                // because then the final ice candidate is null which
                // ticks off the if condition
                if(!event.candidate){
                    resolve()
                }
            }
        })

        this.localSDP = this.device.localDescription.sdp
        console.log("SDP String: "+ this.localSDP)
        return 
    }
}

function createOffer() {
    connection.establishConnectionLocal();
    document.getElementById('offer-out').value = sdp;
}